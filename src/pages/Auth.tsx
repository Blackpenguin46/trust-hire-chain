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
      const { error } = await signIn(data.email, data.password);
      if (error) throw error;
      
      // Redirect will happen automatically via AuthContext
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
      const userData = {
        full_name: data.full_name,
        user_role: userType,
        ...(userType === 'employer' && data.company_name && { company_name: data.company_name }),
      };

      const { error } = await signUp(data.email, data.password, userData);
      if (error) throw error;

      setError('Check your email for a confirmation link!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-30"></div>
      </div>

      <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="relative mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
            <CardTitle className="relative text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TrustHire Chain
            </CardTitle>
          </div>
          <CardDescription className="text-gray-300 text-lg">
            Blockchain-powered hiring platform
          </CardDescription>
          <Badge className="mx-auto bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30 backdrop-blur-sm animate-pulse">
            <Shield className="w-3 h-3 mr-1" />
            Decentralized Identity Powered
          </Badge>
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
                    <p className="text-red-400 text-xs">{signInForm.formState.errors.email.message}</p>
                  )}
                  {!isLogin && signUpForm.formState.errors.email && (
                    <p className="text-red-400 text-xs">{signUpForm.formState.errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20"
                    {...(isLogin ? signInForm.register('password') : signUpForm.register('password'))}
                  />
                  {isLogin && signInForm.formState.errors.password && (
                    <p className="text-red-400 text-xs">{signInForm.formState.errors.password.message}</p>
                  )}
                  {!isLogin && signUpForm.formState.errors.password && (
                    <p className="text-red-400 text-xs">{signUpForm.formState.errors.password.message}</p>
                  )}
                </div>
                {!isLogin && (
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                    <Input 
                      id="fullName" 
                      placeholder="John Doe" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                      {...signUpForm.register('full_name')}
                    />
                    {signUpForm.formState.errors.full_name && (
                      <p className="text-red-400 text-xs">{signUpForm.formState.errors.full_name.message}</p>
                    )}
                  </div>
                )}
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                >
                  {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="employer" className="space-y-4 mt-6">
              <form onSubmit={isLogin ? signInForm.handleSubmit(handleSignIn) : signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyEmail" className="text-gray-300">Company Email</Label>
                  <Input 
                    id="companyEmail" 
                    type="email" 
                    placeholder="hr@company.com" 
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                    {...(isLogin ? signInForm.register('email') : signUpForm.register('email'))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyPassword" className="text-gray-300">Password</Label>
                  <Input 
                    id="companyPassword" 
                    type="password" 
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-green-400 focus:ring-green-400/20"
                    {...(isLogin ? signInForm.register('password') : signUpForm.register('password'))}
                  />
                </div>
                {!isLogin && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-gray-300">Company Name</Label>
                      <Input 
                        id="companyName" 
                        placeholder="Tech Corp Inc." 
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                        {...signUpForm.register('company_name')}
                      />
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm p-4 rounded-lg text-sm border border-blue-400/30">
                      <p className="text-blue-300 flex items-center">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Company verification required for full access
                      </p>
                    </div>
                  </>
                )}
                <Button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                >
                  {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Register Company')}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Button 
              variant="link" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
