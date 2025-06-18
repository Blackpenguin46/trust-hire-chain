
import { createClient } from '@supabase/supabase-js'

// These will be configured through Supabase integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create the client if we have valid environment variables
let supabase: any = null

if (supabaseUrl && supabaseKey && supabaseUrl !== 'your-project-url' && supabaseKey !== 'your-anon-key') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey)
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error)
  }
}

// If Supabase is not configured, provide a mock client to prevent errors
if (!supabase) {
  supabase = {
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } })
        })
      })
    })
  }
}

export { supabase }

export type UserRole = 'job_seeker' | 'employer'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  user_role: UserRole
  company_name?: string
  created_at: string
  updated_at: string
}
