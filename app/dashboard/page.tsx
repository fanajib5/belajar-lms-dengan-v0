"use client"

import DashboardLayout from "@/components/dashboard/dashboard-layout"
import DashboardStats from "@/components/dashboard/dashboard-stats"
import CourseProgress from "@/components/dashboard/course-progress"
import RecentActivities from "@/components/dashboard/recent-activities"
import RecommendedCourses from "@/components/dashboard/recommended-courses"
import { useAuthStore } from "@/lib/store/auth-store"
import { useRequireAuth } from "@/hooks/use-require-auth"
import { Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { isLoading } = useRequireAuth()
  const profile = useAuthStore((state) => state.profile)

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Selamat datang, {profile?.full_name || "Pengguna"}!</h1>
        <p className="text-muted-foreground">Berikut adalah ringkasan aktivitas belajar Anda.</p>
      </div>

      <div className="space-y-6">
        <DashboardStats />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CourseProgress />
          <RecentActivities />
          <RecommendedCourses />
        </div>
      </div>
    </DashboardLayout>
  )
}

