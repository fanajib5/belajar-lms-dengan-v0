"use client"
import { useRequireAuth } from "@/hooks/use-require-auth"
import DashboardLayout from "@/components/dashboard/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Award, Loader2 } from "lucide-react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

export default function CoursesPage() {
  const { isLoading } = useRequireAuth()

  const activeCourses = [
    {
      id: 1,
      title: "Dasar Merangkai Bunga",
      description: "Pelajari teknik dasar merangkai bunga untuk pemula",
      image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2070&auto=format&fit=crop",
      progress: 100,
      modules: 8,
      completedModules: 8,
      level: "Pemula",
      duration: "3 jam",
      isPremium: false,
    },
    {
      id: 2,
      title: "Hiasan Dinding Kreatif",
      description: "Buat hiasan dinding unik dengan bahan alami",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop",
      progress: 45,
      modules: 12,
      completedModules: 5,
      level: "Menengah",
      duration: "5 jam",
      isPremium: true,
    },
    {
      id: 3,
      title: "Seni Origami Modern",
      description: "Teknik origami kontemporer untuk dekorasi rumah",
      image: "https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=1973&auto=format&fit=crop",
      progress: 10,
      modules: 10,
      completedModules: 1,
      level: "Semua Level",
      duration: "4 jam",
      isPremium: true,
    },
  ]

  const availableCourses = [
    {
      id: 4,
      title: "Teknik Makrame Modern",
      description: "Belajar teknik makrame untuk dekorasi rumah",
      image: "https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?q=80&w=500&auto=format&fit=crop",
      level: "Menengah",
      duration: "6 jam",
      isPremium: true,
    },
    {
      id: 5,
      title: "Kerajinan Kertas 3D",
      description: "Membuat kerajinan kertas tiga dimensi yang menakjubkan",
      image: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=500&auto=format&fit=crop",
      level: "Pemula",
      duration: "4 jam",
      isPremium: false,
    },
    {
      id: 6,
      title: "Seni Kaligrafi Modern",
      description: "Pelajari teknik kaligrafi modern untuk berbagai keperluan",
      image: "https://images.unsplash.com/photo-1559310278-18a9192d909f?q=80&w=500&auto=format&fit=crop",
      level: "Menengah",
      duration: "5 jam",
      isPremium: true,
    },
  ]

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
        <h1 className="text-2xl font-bold tracking-tight">Kursus Saya</h1>
        <p className="text-muted-foreground">Kelola dan jelajahi kursus Anda</p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Kursus Aktif</TabsTrigger>
          <TabsTrigger value="available">Kursus Tersedia</TabsTrigger>
          <TabsTrigger value="completed">Kursus Selesai</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  {course.isPremium && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Premium
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {course.completedModules}/{course.modules} modul
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div>{course.level}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Progres</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Lanjutkan Belajar</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
                  {course.isPremium && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Premium
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{course.duration}</span>
                    </div>
                    <div>{course.level}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">{course.isPremium ? "Beli Kursus" : "Mulai Belajar"}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card key={1} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2070&auto=format&fit=crop"
                  alt="Dasar Merangkai Bunga"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">Selesai</div>
              </div>
              <CardHeader>
                <CardTitle>Dasar Merangkai Bunga</CardTitle>
                <CardDescription>Pelajari teknik dasar merangkai bunga untuk pemula</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>8/8 modul</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>3 jam</span>
                  </div>
                  <div>Pemula</div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <span className="text-sm font-medium">Sertifikat Diperoleh</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Lihat Sertifikat
                </Button>
                <Button className="flex-1">Ulang Kursus</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}

