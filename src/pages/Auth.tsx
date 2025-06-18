import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { signUpUser, loginUser } from '@/services/back4app';

const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signUpSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  company_name: z.string().optional(),
});

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;

const Auth = () => {
  const [userType, setUserType] = useState<'job_seeker' | 'employer'>('job_seeker');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn, signUp } = useAuth();

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  const handleSignIn = async (data: SignInData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Try Supabase first
      const { error: supabaseError } = await signIn(data.email, data.password);
      if (supabaseError) {
        // If Supabase fails, try Back4App
        const user = await loginUser(data.email, data.password);
        if (user) {
          // Redirect based on user type
          const type = user.get('userType');
          if (type === 'seeker') {
            window.location.href = '/dashboard/seeker';
          } else if (type === 'employer') {
            window.location.href = '/dashboard/employer';
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Try Supabase first
      const { error: supabaseError } = await signUp(
        data.email,
        data.password,
        data.email,
        userType === 'job_seeker' ? 'seeker' : 'employer',
        userType === 'employer' ? data.company_name : undefined
      );
      if (supabaseError) {
        // If Supabase fails, try Back4App
        const user = await signUpUser(data.email, data.password, data.email);
        if (user) {
          user.set('userType', userType === 'job_seeker' ? 'seeker' : 'employer');
          if (userType === 'employer' && data.company_name) {
            user.set('companyName', data.company_name);
          }
          await user.save();
          setError('Account created successfully! Please sign in.');
        }
      } else {
        setError('Check your email for a confirmation link!');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <Card className="w-full max-w-md professional-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[--color-text-primary]">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </CardTitle>
            <div className="space-y-2">
              <CardDescription className="text-gray-300 text-lg">
                Blockchain-powered hiring platform
              </CardDescription>
              <Badge className="mx-auto bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm animate-pulse">
                <Shield className="w-3 h-3 mr-1" />
                Decentralized Identity Powered
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <span className="text-red-300 text-sm">{error}</span>
              </div>
            )}

            <Tabs value={userType} onValueChange={(value) => setUserType(value as 'job_seeker' | 'employer')}>
              <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20">
                <TabsTrigger 
                  value="job_seeker" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-300"
                >
                  Job Seeker
                </TabsTrigger>
                <TabsTrigger 
                  value="employer"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white text-gray-300"
                >
                  Employer
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="job_seeker" className="space-y-4 mt-6">
                <form onSubmit={isLogin ? signInForm.handleSubmit(handleSignIn) : signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                      {...(isLogin ? signInForm.register('email') : signUpForm.register('email'))}
                    />
                    {isLogin && signInForm.formState.errors.email && (
                      <p className="text-red-400 text-sm">{signInForm.formState.errors.email.message}</p>
                    )}
                    {!isLogin && signUpForm.formState.errors.email && (
                      <p className="text-red-400 text-sm">{signUpForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                      {...(isLogin ? signInForm.register('password') : signUpForm.register('password'))}
                    />
                    {isLogin && signInForm.formState.errors.password && (
                      <p className="text-red-400 text-sm">{signInForm.formState.errors.password.message}</p>
                    )}
                    {!isLogin && signUpForm.formState.errors.password && (
                      <p className="text-red-400 text-sm">{signUpForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-gray-300">Full Name</Label>
                      <Input 
                        id="full_name" 
                        type="text" 
                        placeholder="John Doe" 
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                        {...signUpForm.register('full_name')}
                      />
                      {signUpForm.formState.errors.full_name && (
                        <p className="text-red-400 text-sm">{signUpForm.formState.errors.full_name.message}</p>
                      )}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {isLogin ? 'Signing in...' : 'Creating account...'}
                      </div>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="employer" className="space-y-4 mt-6">
                <form onSubmit={isLogin ? signInForm.handleSubmit(handleSignIn) : signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@company.com" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                      {...(isLogin ? signInForm.register('email') : signUpForm.register('email'))}
                    />
                    {isLogin && signInForm.formState.errors.email && (
                      <p className="text-red-400 text-sm">{signInForm.formState.errors.email.message}</p>
                    )}
                    {!isLogin && signUpForm.formState.errors.email && (
                      <p className="text-red-400 text-sm">{signUpForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                      {...(isLogin ? signInForm.register('password') : signUpForm.register('password'))}
                    />
                    {isLogin && signInForm.formState.errors.password && (
                      <p className="text-red-400 text-sm">{signInForm.formState.errors.password.message}</p>
                    )}
                    {!isLogin && signUpForm.formState.errors.password && (
                      <p className="text-red-400 text-sm">{signUpForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="full_name" className="text-gray-300">Full Name</Label>
                        <Input 
                          id="full_name" 
                          type="text" 
                          placeholder="John Doe" 
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                          {...signUpForm.register('full_name')}
                        />
                        {signUpForm.formState.errors.full_name && (
                          <p className="text-red-400 text-sm">{signUpForm.formState.errors.full_name.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company_name" className="text-gray-300">Company Name</Label>
                        <Input 
                          id="company_name" 
                          type="text" 
                          placeholder="Your Company Ltd." 
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                          {...signUpForm.register('company_name')}
                        />
                      </div>
                    </>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        {isLogin ? 'Signing in...' : 'Creating account...'}
                      </div>
                    ) : (
                      <>
                        {isLogin ? 'Sign In' : 'Create Account'}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;


