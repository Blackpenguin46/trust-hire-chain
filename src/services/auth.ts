import Parse from './back4app';
import { blockchainService } from './blockchain';
import { ethers } from 'ethers';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  userType: 'seeker' | 'employer';
  did?: string;
  walletAddress?: string;
  reputationScore?: number;
}

class AuthService {
  private currentUser: Parse.User | null = null;

  async initialize() {
    try {
      // Initialize blockchain service
      await blockchainService.initialize();
      
      // Check for existing session
      const user = Parse.User.current();
      if (user) {
        this.currentUser = user;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error initializing auth service:', error);
      return false;
    }
  }

  async signUp(username: string, email: string, password: string, userType: 'seeker' | 'employer'): Promise<UserProfile> {
    try {
      const user = new Parse.User();
      user.set('username', username);
      user.set('email', email);
      user.set('password', password);
      user.set('userType', userType);

      await user.signUp();
      this.currentUser = user;

      // Get wallet address if available
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        user.set('walletAddress', address);
        await user.save();
      }

      return this.getUserProfile();
    } catch (error: any) {
      console.error('Error signing up:', error);
      throw new Error(error.message || 'Failed to sign up');
    }
  }

  async login(username: string, password: string): Promise<UserProfile> {
    try {
      const user = await Parse.User.logIn(username, password);
      this.currentUser = user;

      // Initialize blockchain connection if wallet is available
      if (typeof window.ethereum !== 'undefined') {
        await blockchainService.initialize();
      }

      return this.getUserProfile();
    } catch (error: any) {
      console.error('Error logging in:', error);
      throw new Error(error.message || 'Failed to log in');
    }
  }

  async logout(): Promise<void> {
    try {
      await Parse.User.logOut();
      this.currentUser = null;
    } catch (error: any) {
      console.error('Error logging out:', error);
      throw new Error(error.message || 'Failed to log out');
    }
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    try {
      Object.entries(updates).forEach(([key, value]) => {
        this.currentUser!.set(key, value);
      });

      await this.currentUser.save();
      return this.getUserProfile();
    } catch (error: any) {
      console.error('Error updating profile:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  async getReputationScore(): Promise<number | null> {
    if (!this.currentUser) {
      return null;
    }

    const walletAddress = this.currentUser.get('walletAddress');
    if (!walletAddress) {
      return null;
    }

    try {
      return await blockchainService.getReputationScore(walletAddress);
    } catch (error) {
      console.error('Error getting reputation score:', error);
      return null;
    }
  }

  getUserProfile(): UserProfile {
    if (!this.currentUser) {
      throw new Error('No user logged in');
    }

    return {
      id: this.currentUser.id,
      username: this.currentUser.get('username'),
      email: this.currentUser.get('email'),
      userType: this.currentUser.get('userType'),
      did: this.currentUser.get('did'),
      walletAddress: this.currentUser.get('walletAddress'),
      reputationScore: this.currentUser.get('reputationScore')
    };
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  getUserType(): 'seeker' | 'employer' | null {
    return this.currentUser?.get('userType') || null;
  }
}

export const authService = new AuthService(); 