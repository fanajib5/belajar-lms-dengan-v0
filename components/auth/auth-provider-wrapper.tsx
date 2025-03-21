"use client"

import type React from "react"
import { AuthProvider } from "@/components/auth/auth-provider"

export function AuthProviderWrapper({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>
}

