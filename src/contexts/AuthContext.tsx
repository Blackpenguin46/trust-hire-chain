
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabaseAuthService } from '@/services/supabaseAuth'
import type { UserProfile } from '@/services/supabaseAuth'

interface AuthContextType {
  user: UserProfile | null
  loading: boolean
  initialized: boolean
  signUp: (username: string, email: string, password: string, userType: 'job_seeker' | 'employer', companyName?: string) => Promise<{ user: UserProfile | null; error: any }>
  signIn: (email: string, password: string) => Promise<{ user: UserProfile | null; error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize Supabase auth service
        const isInitialized = await supabaseAuthService.initialize()
        setInitialized(isInitialized)
        
        if (isInitialized) {
          // Check for current user
          try {
            const currentUser = await supabaseAuthService.getCurrentUser()
            if (currentUser) {
              const profile = await supabaseAuthService.getUserProfile()
              setUser(profile)
              console.log('Auth initialization complete. Current user:', profile.username)
            }
          } catch (error) {
            console.log('No current user found')
            setUser(null)
          }
        } else {
          console.warn('Supabase initialization failed')
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setInitialized(false)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const signUp = async (
    username: string,
    email: string,
    password: string,
    userType: 'job_seeker' | 'employer',
    companyName?: string
  ) => {
    setLoading(true)
    try {
      console.log('Starting sign up process for:', email)
      const profile = await supabaseAuthService.signUp(username, email, password, userType)
      
      // Update profile with company name if provided
      if (companyName && userType === 'employer') {
        await supabaseAuthService.updateProfile({ companyName })
      }
      
      setUser(profile)
      return { user: profile, error: null }
    } catch (error: any) {
      console.error('Sign up failed:', error)
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const profile = await supabaseAuthService.login(email, password)
      setUser(profile)
      return { user: profile, error: null }
    } catch (error: any) {
      console.error('Sign in failed:', error)
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await supabaseAuthService.logout()
      setUser(null)
    } catch (error) {
      console.error('Sign out failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    initialized,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
