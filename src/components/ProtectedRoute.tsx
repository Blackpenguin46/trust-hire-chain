import React, { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

type UserRole = 'job_seeker' | 'employer'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/auth'
    }
  }, [user, loading])

  useEffect(() => {
    if (!loading && user && requiredRole) {
      const userType = user.get('userType')
      const userRole = userType === 'seeker' ? 'job_seeker' : 'employer'
      
      if (userRole !== requiredRole) {
        // Redirect to appropriate dashboard based on user role
        const redirectPath = userRole === 'job_seeker' ? '/dashboard/seeker' : '/dashboard/employer'
        window.location.href = redirectPath
      }
    }
  }, [user, loading, requiredRole])

  console.log('ProtectedRoute', { loading, user, requiredRole });

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
    // Show a visible message instead of returning null
    return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>
      Not logged in. Please <a href="/auth">log in</a>.
    </div>
  }

  if (requiredRole) {
    const userType = user.get('userType')
    const userRole = userType === 'seeker' ? 'job_seeker' : 'employer'
    
    if (userRole !== requiredRole) {
      return <div style={{ color: 'red', textAlign: 'center', marginTop: '2rem' }}>
        You do not have permission to view this page.
      </div>
    }
  }

  return <>{children}</>
}

export default ProtectedRoute
