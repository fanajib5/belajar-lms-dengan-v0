"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HandIcon, Home, BookOpen, User, Settings, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { LogoutButton } from "@/components/auth/logout-button"
import { createBrowserSupabaseClient } from "@/lib/supabase-browser"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch user and profile
  useEffect(() => {
    const fetchUserAndProfile = async () => {
      setIsLoading(true)
      const supabase = createBrowserSupabaseClient()

      // Get session
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/login")
        return
      }

      setUser(session.user)

      // Get profile
      if (session.user) {
        const { data } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

        if (data) {
          setProfile(data)
        }
      }

      setIsLoading(false)
    }

    fetchUserAndProfile()
  }, [router])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Kursus Saya", href: "/dashboard/courses", icon: BookOpen },
    { name: "Profil", href: "/dashboard/profile", icon: User },
    { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
  ]

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-muted/10">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={toggleSidebar} aria-hidden="true" />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <HandIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">KraftLMS</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="px-4 py-6">
          <div className="mb-8">
            <div className="mb-2 px-3 text-xs font-semibold text-muted-foreground">MENU</div>
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto">
            <LogoutButton
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:bg-muted/50"
              showIcon={true}
            />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navbar */}
        <div className="flex h-16 items-center justify-between border-b bg-white px-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <div className="font-medium">{profile?.full_name || user?.email}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {profile?.full_name ? profile.full_name[0].toUpperCase() : user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

