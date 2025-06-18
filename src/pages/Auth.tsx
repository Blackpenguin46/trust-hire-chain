import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Web3Navigation from '@/components/Web3Navigation';
import { useToast } from '@/components/ui/use-toast';

// Import authentication functions from your Back4app service
import { signUpUser, loginUser, getCurrentUser } from '@/services/back4app';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'seeker' | 'employer'>('seeker'); // State for user type
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if a user is already logged in when the component mounts
    const checkCurrentUser = async () => {
      const currentUser = getCurrentUser();
      if (currentUser) {
        // Redirect based on user type if already logged in
        const type = currentUser.get('userType');
        if (type === 'seeker') {
          navigate('/dashboard/seeker');
        } else if (type === 'employer') {
          navigate('/dashboard/employer');
        }
      }
    };
    checkCurrentUser();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // Handle Login
        const user = await loginUser(username, password);
        toast({
          title: 'Login Successful!',
          description: `Welcome back, ${user.get('username')}.`,
        });
        // Redirect based on user type after successful login
        const type = user.get('userType');
        if (type === 'seeker') {
          navigate('/dashboard/seeker');
        } else if (type === 'employer') {
          navigate('/dashboard/employer');
        }
      } else {
        // Handle Sign Up
        const user = await signUpUser(username, password, email);
        // Set user type after successful sign up
        user.set('userType', userType); 
        await user.save(); // Save the user object with the new userType

        toast({
          title: 'Sign Up Successful!',
          description: `Welcome to Trust Hire Chain, ${user.get('username')}.`,
        });
        // Redirect based on user type after successful sign up
        if (userType === 'seeker') {
          navigate('/dashboard/seeker');
        } else if (userType === 'employer') {
          navigate('/dashboard/employer');
        }
      }
    } catch (error: any) {
      toast({
        title: 'Authentication Failed',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      });
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
        <Card className="w-full max-w-md professional-card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[--color-text-primary]">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </CardTitle>
            <CardDescription className="text-[--color-text-secondary]/70">
              {isLogin ? 'Enter your credentials to access your account' : 'Create your account to get started'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="yourusername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div>
                  <Label>Account Type</Label>
                  <div className="flex space-x-4 mt-2">
                    <Button
                      type="button"
                      variant={userType === 'seeker' ? 'default' : 'outline'}
                      onClick={() => setUserType('seeker')}
                      className="flex-1"
                    >
                      Job Seeker
                    </Button>
                    <Button
                      type="button"
                      variant={userType === 'employer' ? 'default' : 'outline'}
                      onClick={() => setUserType('employer')}
                      className="flex-1"
                    >
                      Employer
                    </Button>
                  </div>
                </div>
              )}
              <Button type="submit" className="w-full primary-button">
                {isLogin ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-[--color-text-secondary]/70">
              {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[--color-primary] p-0 h-auto"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;


