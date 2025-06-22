
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Web3Navigation from '@/components/Web3Navigation';
import { supabaseAuthService } from '../services/supabaseAuth';

const UserProfile = () => {
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isEmployer, setIsEmployer] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await supabaseAuthService.getUserProfile();
      setFullName(profile.username || '');
      setBio(''); // Bio field doesn't exist in current schema, you may want to add it
      setCompanyName(profile.companyName || '');
      setIsEmployer(profile.userType === 'employer');
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await supabaseAuthService.updateProfile({
        username: fullName,
        companyName: isEmployer ? companyName : undefined
      });
      
      toast({
        title: 'Success',
        description: 'Profile updated successfully!',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile.',
        variant: 'destructive',
      });
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[--color-background] text-[--color-text-primary]">
      <Web3Navigation />
      <div className="container mx-auto px-4 py-8">
        <Card className="professional-card">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={5} />
                </div>
                {isEmployer && (
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                  </div>
                )}
                <Button type="submit" className="primary-button">Save Profile</Button>
              </form>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
