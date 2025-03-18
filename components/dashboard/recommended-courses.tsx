import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function RecommendedCourses() {
  const courses = [
    {
      id: 1,
      title: "Teknik Makrame Modern",
      description: "Belajar teknik makrame untuk dekorasi rumah",
      image: "https://images.unsplash.com/photo-1617713964959-d9a36bbc7b52?q=80&w=500&auto=format&fit=crop",
      level: "Menengah",
      duration: "6 jam",
    },
    {
      id: 2,
      title: "Kerajinan Kertas 3D",
      description: "Membuat kerajinan kertas tiga dimensi yang menakjubkan",
      image: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?q=80&w=500&auto=format&fit=crop",
      level: "Pemula",
      duration: "4 jam",
    },
  ]

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Rekomendasi Kursus</CardTitle>
        <CardDescription>Kursus yang mungkin Anda minati</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course.id} className="flex space-x-4">
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                <Image src={course.image || "/placeholder.svg"} alt={course.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-1">{course.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{course.level}</span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    Lihat
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

