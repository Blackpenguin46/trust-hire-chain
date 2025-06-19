
import React, { createContext, useContext, useEffect, useState } from 'react'
import { initializeParse, signUpUser, loginUser, logoutUser, getCurrentUser } from '@/services/back4app'

interface AuthContextType {
  user: any | null
  loading: boolean
  initialized: boolean
  signUp: (username: string, password: string, email: string, userType?: string, companyName?: string) => Promise<any>
  signIn: (username: string, password: string) => Promise<any>
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
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize Parse first
        const parseInitialized = initializeParse()
        setInitialized(parseInitialized)
        
        if (parseInitialized) {
          // Check for current user only after Parse is initialized
          const currentUser = getCurrentUser()
          setUser(currentUser)
          console.log('Auth initialization complete. Current user:', currentUser ? 'Found' : 'None')
        } else {
          console.warn('Parse initialization failed - app will work with limited functionality')
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
    password: string,
    email: string,
    userType?: string,
    companyName?: string
  ) => {
    setLoading(true)
    try {
      const user = await signUpUser(username, password, email)
      if (userType) {
        user.set('userType', userType)
      }
      if (companyName) {
        user.set('companyName', companyName)
      }
      await user.save()
      setUser(user)
      return { user, error: null }
    } catch (error: any) {
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (username: string, password: string) => {
    setLoading(true)
    try {
      const user = await loginUser(username, password)
      setUser(user)
      return { user, error: null }
    } catch (error: any) {
      return { user: null, error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    try {
      await logoutUser()
      setUser(null)
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
