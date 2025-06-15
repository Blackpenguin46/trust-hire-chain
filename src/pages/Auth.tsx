
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const Auth = () => {
  const [userType, setUserType] = useState<'seeker' | 'employer'>('seeker');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            TrustHire Chain
          </CardTitle>
          <CardDescription>
            Blockchain-powered hiring platform
          </CardDescription>
          <Badge variant="secondary" className="mx-auto">
            🔗 Decentralized Identity Powered
          </Badge>
        </CardHeader>
        <CardContent>
          <Tabs value={userType} onValueChange={(value) => setUserType(value as 'seeker' | 'employer')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="seeker">Job Seeker</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>
            
            <TabsContent value="seeker" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="John Doe" />
                </div>
              )}
              <Button className="w-full" onClick={() => window.location.href = '/dashboard/seeker'}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </TabsContent>

            <TabsContent value="employer" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Company Email</Label>
                <Input id="companyEmail" type="email" placeholder="hr@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyPassword">Password</Label>
                <Input id="companyPassword" type="password" />
              </div>
              {!isLogin && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" placeholder="Tech Corp Inc." />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-sm">
                    <p className="text-blue-800">
                      📋 Company verification required for full access
                    </p>
                  </div>
                </>
              )}
              <Button className="w-full" onClick={() => window.location.href = '/dashboard/employer'}>
                {isLogin ? 'Sign In' : 'Register Company'}
              </Button>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center">
            <Button 
              variant="link" 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm"
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
