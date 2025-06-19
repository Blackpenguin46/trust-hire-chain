
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'

type UserRole = 'job_seeker' | 'employer'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

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

  if (!user) {
    // Redirect to /auth, preserving the current location for after login
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  if (requiredRole && user) {
    const userType = user.get('userType')
    const userRole = userType === 'seeker' ? 'job_seeker' : 'employer'
    if (userRole !== requiredRole) {
      // Redirect to the correct dashboard
      const redirectPath = userRole === 'job_seeker' ? '/dashboard/seeker' : '/dashboard/employer'
      return <Navigate to={redirectPath} replace />
    }
  }

  return <>{children}</>
}

export default ProtectedRoute
