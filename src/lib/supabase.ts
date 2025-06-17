
import { createClient } from '@supabase/supabase-js'

// These will be configured through Supabase integration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'your-project-url'
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

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
