
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Shield, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [userType, setUserType] = useState<'job_seeker' | 'employer'>('job_seeker');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    companyName: ''
  });
  
  const { signIn, signUp, initialized } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Show initialization status
  if (!initialized) {
    return (
      <div className="min-h-screen bg-[--color-background] text-[--color-text-primary] flex items-center justify-center">
        <Card className="w-full max-w-md professional-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-red-400">
              Backend Connection Issue
            </CardTitle>
            <CardDescription className="text-gray-300">
              Unable to connect to Supabase backend. Please check your configuration.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { user, error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Sign in failed',
          variant: 'destructive',
        });
      } else if (user) {
        toast({
          title: 'Success',
          description: 'Signed in successfully!',
        });
        // Redirect based on user type
        if (user.userType === 'employer') {
          navigate('/dashboard/employer');
        } else {
          navigate('/dashboard/seeker');
        }
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { user, error } = await signUp(
        formData.username,
        formData.email,
        formData.password,
        userType,
        userType === 'employer' ? formData.companyName : undefined
      );
      
      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'Sign up failed',
          variant: 'destructive',
        });
      } else if (user) {
        toast({
          title: 'Success',
          description: 'Account created successfully! Please check your email to verify your account.',
        });
        setIsLogin(true); // Switch to login view
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: err.message || 'An unexpected error occurred',
        variant: 'destructive',
      });
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
              <Badge className="mx-auto bg-green-500/20 text-green-300 border border-green-400/30">
                Supabase Connected ✓
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
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
                <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="your@email.com" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-gray-300">Full Name</Label>
                      <Input 
                        id="username" 
                        name="username"
                        type="text" 
                        placeholder="John Doe" 
                        className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
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
                <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="your@company.com" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-gray-300">Password</Label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {!isLogin && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="username" className="text-gray-300">Full Name</Label>
                        <Input 
                          id="username" 
                          name="username"
                          type="text" 
                          placeholder="John Doe" 
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                          value={formData.username}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="companyName" className="text-gray-300">Company Name</Label>
                        <Input 
                          id="companyName" 
                          name="companyName"
                          type="text" 
                          placeholder="Your Company Ltd." 
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                          value={formData.companyName}
                          onChange={handleInputChange}
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
