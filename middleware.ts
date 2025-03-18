import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Ambil sesi dari Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Dapatkan URL saat ini
  const url = req.nextUrl.clone()
  const isAuthPage =
    url.pathname === "/login" ||
    url.pathname === "/register" ||
    url.pathname === "/forgot-password" ||
    url.pathname === "/reset-password"

  const isDashboardPage = url.pathname.startsWith("/dashboard")

  // Jika pengguna tidak login dan mencoba mengakses rute yang dilindungi
  if (!session && isDashboardPage) {
    // Simpan URL yang dicoba diakses untuk redirect kembali setelah login
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/login"
    redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // Jika pengguna sudah login dan mencoba mengakses halaman auth
  if (session && isAuthPage) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = "/dashboard"
    return NextResponse.redirect(redirectUrl)
  }

  // Tambahkan header untuk mencegah caching halaman yang memerlukan autentikasi
  if (isDashboardPage) {
    res.headers.set("Cache-Control", "no-store, max-age=0")
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/forgot-password", "/reset-password"],
}

