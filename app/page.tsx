import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, Flower, HandIcon, HeartIcon, Leaf, Sparkles, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <HandIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">KraftLMS</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Fitur
            </Link>
            <Link href="#courses" className="text-sm font-medium hover:text-primary">
              Kursus
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              Harga
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimoni
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Daftar Gratis</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Less Annoying LMS
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Belajar Merangkai Hiasan Tangan dengan Cara yang Menyenangkan
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Platform belajar yang sederhana, fokus pada konten, dan bebas dari fitur yang membingungkan. Mulai
                  perjalanan kreatif Anda sekarang.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Mulai Belajar Gratis
                    </Button>
                  </Link>
                  <Link href="#courses">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Lihat Kursus
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[450px] w-full overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1605627079912-97c3810a11a4?q=80&w=1200&auto=format&fit=crop"
                    alt="Belajar merangkai hiasan tangan"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Fitur Utama</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Belajar Tanpa Gangguan</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Platform kami dirancang untuk fokus pada pengalaman belajar, bukan pada fitur yang membingungkan.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Antarmuka Sederhana</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Desain yang bersih dan intuitif, memudahkan Anda fokus pada pembelajaran tanpa kebingungan.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Video Tutorial HD</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Pelajari setiap detail dengan video berkualitas tinggi yang dapat diakses kapan saja.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                    <HeartIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Komunitas Pendukung</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Bergabunglah dengan komunitas kreatif untuk berbagi ide dan mendapatkan inspirasi.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                    <Flower className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Proyek Praktis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Belajar dengan melakukan. Setiap kursus dilengkapi dengan proyek praktis yang dapat Anda ikuti.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Sertifikat Penyelesaian</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Dapatkan pengakuan atas keterampilan baru Anda dengan sertifikat setelah menyelesaikan kursus.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2 rounded-full bg-primary/10 p-2 w-10 h-10 flex items-center justify-center">
                    <HandIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Akses Offline</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unduh materi untuk belajar tanpa koneksi internet, kapan pun Anda inginkan.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="courses" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Kursus Populer
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Mulai Perjalanan Kreatif Anda</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Pilih dari berbagai kursus merangkai hiasan tangan yang dirancang untuk semua tingkat keahlian.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=2070&auto=format&fit=crop"
                    alt="Dasar Merangkai Bunga"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Gratis
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Dasar Merangkai Bunga</CardTitle>
                  <CardDescription>Pelajari teknik dasar merangkai bunga untuk pemula</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>8 Modul</span>
                    <span>•</span>
                    <span>3 Jam</span>
                    <span>•</span>
                    <span>Pemula</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Mulai Belajar</Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2070&auto=format&fit=crop"
                    alt="Hiasan Dinding Kreatif"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Premium
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Hiasan Dinding Kreatif</CardTitle>
                  <CardDescription>Buat hiasan dinding unik dengan bahan alami</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>12 Modul</span>
                    <span>•</span>
                    <span>5 Jam</span>
                    <span>•</span>
                    <span>Menengah</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Lihat Detail</Button>
                </CardFooter>
              </Card>
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1584727638096-042c45049ebe?q=80&w=1973&auto=format&fit=crop"
                    alt="Seni Origami Modern"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                    Premium
                  </div>
                </div>
                <CardHeader>
                  <CardTitle>Seni Origami Modern</CardTitle>
                  <CardDescription>Teknik origami kontemporer untuk dekorasi rumah</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>10 Modul</span>
                    <span>•</span>
                    <span>4 Jam</span>
                    <span>•</span>
                    <span>Semua Level</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Lihat Detail</Button>
                </CardFooter>
              </Card>
            </div>
            <div className="flex justify-center">
              <Link href="/courses">
                <Button variant="outline" size="lg">
                  Lihat Semua Kursus
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Harga Sederhana
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Pilih Paket yang Sesuai</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Kami menawarkan pilihan paket yang transparan tanpa biaya tersembunyi.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card className="border-2 border-muted">
                <CardHeader>
                  <CardTitle>Gratis</CardTitle>
                  <CardDescription>Untuk pemula yang ingin mencoba</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    Rp 0<span className="text-base font-normal text-muted-foreground">/bulan</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Akses ke 5 kursus dasar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Forum komunitas</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Materi pembelajaran dasar</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Sertifikat penyelesaian</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant="outline">
                    Daftar Sekarang
                  </Button>
                </CardFooter>
              </Card>
              <Card className="border-2 border-primary">
                <CardHeader>
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
                    Paling Populer
                  </div>
                  <CardTitle>Premium</CardTitle>
                  <CardDescription>Untuk yang serius mengembangkan keterampilan</CardDescription>
                  <div className="mt-4 text-4xl font-bold">
                    Rp 99.000<span className="text-base font-normal text-muted-foreground">/bulan</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Akses ke semua kursus (30+)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Download materi untuk akses offline</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Konsultasi langsung dengan instruktur</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Proyek eksklusif bulanan</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Sertifikat profesional</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-primary" />
                      <span>Akses ke webinar eksklusif</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Mulai 7 Hari Uji Coba</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimoni</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Apa Kata Mereka</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Dengarkan pengalaman dari para siswa yang telah bergabung dengan platform kami.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop"
                        alt="Siti Rahayu"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">Siti Rahayu</CardTitle>
                      <CardDescription>Ibu Rumah Tangga</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Platform ini sangat mudah digunakan. Saya yang awalnya tidak tahu apa-apa tentang kerajinan tangan,
                    sekarang bisa membuat hiasan rumah yang cantik."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
                        alt="Budi Santoso"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">Budi Santoso</CardTitle>
                      <CardDescription>Mahasiswa Seni</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Kursus di sini benar-benar fokus pada konten, tidak ada fitur yang membingungkan. Saya bisa belajar
                    dengan cepat dan langsung praktik."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </CardFooter>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1989&auto=format&fit=crop"
                        alt="Dewi Lestari"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-base">Dewi Lestari</CardTitle>
                      <CardDescription>Pengusaha Kerajinan</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    "Berkat kursus premium di platform ini, saya bisa mengembangkan hobi menjadi bisnis. Materi yang
                    diberikan sangat komprehensif dan praktis."
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Mulai Perjalanan Kreatif Anda Hari Ini
                </h2>
                <p className="max-w-[900px] md:text-xl">
                  Bergabunglah dengan ribuan siswa yang telah mengembangkan keterampilan merangkai hiasan tangan mereka.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register">
                  <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                    Daftar Gratis
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Lihat Paket Premium
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <HandIcon className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">KraftLMS</span>
          </div>
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} KraftLMS. Semua hak dilindungi.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
              Syarat & Ketentuan
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
              Kebijakan Privasi
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

