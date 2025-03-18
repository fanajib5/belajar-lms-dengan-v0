"use client"

import { createBrowserClient } from "@supabase/ssr"

// Client-side Supabase client (aman untuk client)
// Kita hanya menggunakan URL publik, autentikasi akan ditangani oleh server actions
export const createBrowserSupabaseClient = () => {
  // Kita hanya menggunakan URL publik di sini
  // Autentikasi akan ditangani oleh server actions
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

