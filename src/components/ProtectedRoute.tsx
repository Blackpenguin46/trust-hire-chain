
import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { UserRole } from '@/lib/supabase'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/auth'
    }
  }, [user, loading])

  useEffect(() => {
    if (!loading && user && profile && requiredRole && profile.user_role !== requiredRole) {
      // Redirect to appropriate dashboard based on user role
      const redirectPath = profile.user_role === 'job_seeker' ? '/dashboard/seeker' : '/dashboard/employer'
      window.location.href = redirectPath
    }
  }, [user, profile, loading, requiredRole])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  if (requiredRole && profile.user_role !== requiredRole) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
