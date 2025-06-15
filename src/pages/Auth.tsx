
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Sparkles, Shield } from 'lucide-react';

const Auth = () => {
  const [userType, setUserType] = useState<'seeker' | 'employer'>('seeker');
  const [isLogin, setIsLogin] = useState(true);

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
          <Tabs value={userType} onValueChange={(value) => setUserType(value as 'seeker' | 'employer')}>
            <TabsList className="grid w-full grid-cols-2 bg-white/10 backdrop-blur-sm border border-white/20">
              <TabsTrigger 
                value="seeker" 
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
            
            <TabsContent value="seeker" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                  <Input 
                    id="fullName" 
                    placeholder="John Doe" 
                    className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>
              )}
              <Button 
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                onClick={() => window.location.href = '/dashboard/seeker'}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </TabsContent>

            <TabsContent value="employer" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="companyEmail" className="text-gray-300">Company Email</Label>
                <Input 
                  id="companyEmail" 
                  type="email" 
                  placeholder="hr@company.com" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white placeholder:text-gray-400 focus:border-green-400 focus:ring-green-400/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPassword" className="text-gray-300">Password</Label>
                <Input 
                  id="companyPassword" 
                  type="password" 
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white focus:border-green-400 focus:ring-green-400/20"
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
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                onClick={() => window.location.href = '/dashboard/employer'}
              >
                {isLogin ? 'Sign In' : 'Register Company'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
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
