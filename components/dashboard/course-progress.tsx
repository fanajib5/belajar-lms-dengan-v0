import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function CourseProgress() {
  const courses = [
    {
      id: 1,
      title: "Dasar Merangkai Bunga",
      progress: 100,
      modules: 8,
      completedModules: 8,
    },
    {
      id: 2,
      title: "Hiasan Dinding Kreatif",
      progress: 45,
      modules: 12,
      completedModules: 5,
    },
    {
      id: 3,
      title: "Seni Origami Modern",
      progress: 10,
      modules: 10,
      completedModules: 1,
    },
  ]

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Progres Kursus</CardTitle>
        <CardDescription>Pantau perkembangan belajar Anda</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {courses.map((course) => (
            <div key={course.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{course.title}</div>
                <div className="text-sm text-muted-foreground">
                  {course.completedModules}/{course.modules} modul
                </div>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

