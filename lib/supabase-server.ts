import { createClient } from "@supabase/supabase-js"

// Gunakan variabel lingkungan server-side (tanpa NEXT_PUBLIC_)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Supabase URL or Service Key is missing. Please check your environment variables.")
}

// Server-side Supabase client (tidak terekspos ke client)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
})

export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  website: string | null
  updated_at: string | null
}

export type Course = {
  id: string
  title: string
  description: string
  image_url: string
  level: "beginner" | "intermediate" | "advanced"
  duration: number
  modules_count: number
  is_premium: boolean
}

