import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function RecentActivities() {
  const activities = [
    {
      id: 1,
      description: 'Menyelesaikan modul "Teknik Dasar Merangkai"',
      course: "Dasar Merangkai Bunga",
      time: "2 jam yang lalu",
    },
    {
      id: 2,
      description: "Mulai kursus baru",
      course: "Seni Origami Modern",
      time: "1 hari yang lalu",
    },
    {
      id: 3,
      description: "Mendapatkan sertifikat",
      course: "Dasar Merangkai Bunga",
      time: "3 hari yang lalu",
    },
    {
      id: 4,
      description: 'Menyelesaikan modul "Hiasan Dinding Alami"',
      course: "Hiasan Dinding Kreatif",
      time: "5 hari yang lalu",
    },
  ]

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
        <CardDescription>Aktivitas belajar Anda dalam 7 hari terakhir</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex flex-col space-y-1 border-b pb-3 last:border-0">
              <div className="font-medium">{activity.description}</div>
              <div className="text-sm text-muted-foreground">{activity.course}</div>
              <div className="text-xs text-muted-foreground">{activity.time}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

