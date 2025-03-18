"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/lib/store/auth-store"

export function useRequireAuth() {
  const router = useRouter()
  const user = useAuthStore((state) => state.user)
  const isLoading = useAuthStore((state) => state.isLoading)

  useEffect(() => {
    // Jika sudah selesai loading dan tidak ada user, redirect ke login
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  return { user, isLoading }
}

