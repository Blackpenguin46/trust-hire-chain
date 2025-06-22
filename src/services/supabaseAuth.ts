
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  userType: 'job_seeker' | 'employer';
  companyName?: string;
  did?: string;
  walletAddress?: string;
  reputationScore?: number;
}

class SupabaseAuthService {
  async signUp(
    username: string, 
    email: string, 
    password: string, 
    userType: 'job_seeker' | 'employer'
  ): Promise<UserProfile> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            user_type: userType
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('User creation failed');

      // The profile will be created automatically via the trigger
      return this.getUserProfile();
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw new Error(error.message || 'Failed to sign up');
    }
  }

  async login(email: string, password: string): Promise<UserProfile> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.user) throw new Error('Login failed');

      return this.getUserProfile();
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw new Error(error.message || 'Failed to log in');
    }
  }

  async logout(): Promise<void> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      console.error('Error logging out:', error);
      throw new Error(error.message || 'Failed to log out');
    }
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user logged in');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: updates.username,
          company_name: updates.companyName,
          wallet_address: updates.walletAddress,
          did: updates.did
        })
        .eq('id', user.id);

      if (error) throw error;

      return this.getUserProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }

  async getUserProfile(): Promise<UserProfile> {
    const user = await this.getCurrentUser();
    if (!user) throw new Error('No user logged in');

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    if (!profile) throw new Error('Profile not found');

    return {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      userType: profile.user_type as 'job_seeker' | 'employer',
      companyName: profile.company_name || undefined,
      did: profile.did || undefined,
      walletAddress: profile.wallet_address || undefined,
      reputationScore: profile.reputation_score || undefined
    };
  }

  async initialize(): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return !!user;
    } catch (error) {
      console.error('Error initializing auth service:', error);
      return false;
    }
  }

  isAuthenticated(): boolean {
    return !!supabase.auth.getUser();
  }

  async getUserType(): Promise<'job_seeker' | 'employer' | null> {
    try {
      const profile = await this.getUserProfile();
      return profile.userType;
    } catch {
      return null;
    }
  }
}

export const supabaseAuthService = new SupabaseAuthService();
