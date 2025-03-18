"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HandIcon, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { signInWithPasswordAction, signInWithOtpAction, verifyOtpAction } from "@/lib/actions/auth-actions"

enum OTPStep {
  EMAIL_INPUT = 0,
  OTP_VERIFICATION = 1,
}

export default function LoginForm() {
  const router = useRouter()

  // Password login state
  const [passwordEmail, setPasswordEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // OTP login state
  const [otpEmail, setOtpEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [otpStep, setOtpStep] = useState<OTPStep>(OTPStep.EMAIL_INPUT)

  // Shared state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Buat FormData untuk server action
      const formData = new FormData()
      formData.append("email", passwordEmail)
      formData.append("password", password)

      const result = await signInWithPasswordAction(formData)

      if (!result.success) {
        setError(result.error || "Login gagal. Periksa email dan password Anda.")
        setLoading(false)
        return
      }

      setSuccess("Login berhasil!")

      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error: any) {
      setError(error.message || "Login gagal. Periksa email dan password Anda.")
      setLoading(false)
    }
  }

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Buat FormData untuk server action
      const formData = new FormData()
      formData.append("email", otpEmail)

      const result = await signInWithOtpAction(formData)

      if (!result.success) {
        setError(result.error || "Gagal mengirim kode OTP. Silakan coba lagi.")
        setLoading(false)
        return
      }

      setSuccess(result.message || "Kode OTP telah dikirim ke email Anda.")
      setOtpStep(OTPStep.OTP_VERIFICATION)
    } catch (error: any) {
      setError(error.message || "Gagal mengirim kode OTP. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Buat FormData untuk server action
      const formData = new FormData()
      formData.append("email", otpEmail)
      formData.append("token", otp)

      const result = await verifyOtpAction(formData)

      if (!result.success) {
        setError(result.error || "Kode OTP tidak valid atau telah kedaluwarsa. Silakan coba lagi.")
        setLoading(false)
        return
      }

      setSuccess("Login berhasil!")

      // Redirect to dashboard after successful login
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    } catch (error: any) {
      setError(error.message || "Kode OTP tidak valid atau telah kedaluwarsa. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      // Buat FormData untuk server action
      const formData = new FormData()
      formData.append("email", otpEmail)

      const result = await signInWithOtpAction(formData)

      if (!result.success) {
        setError(result.error || "Gagal mengirim ulang kode OTP. Silakan coba lagi.")
        setLoading(false)
        return
      }

      setSuccess(result.message || "Kode OTP baru telah dikirim ke email Anda.")
    } catch (error: any) {
      setError(error.message || "Gagal mengirim ulang kode OTP. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const toggleShowPassword = () => setShowPassword(!showPassword)

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <HandIcon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Login ke KraftLMS</CardTitle>
        <CardDescription className="text-center">Pilih metode login yang Anda inginkan</CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4 bg-primary/10 text-primary border-primary/20">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="password" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="otp">Kode OTP</TabsTrigger>
          </TabsList>

          <TabsContent value="password">
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="passwordEmail" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="passwordEmail"
                  type="email"
                  placeholder="nama@email.com"
                  value={passwordEmail}
                  onChange={(e) => setPasswordEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Lupa password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={toggleShowPassword}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Login...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="otp">
            {otpStep === OTPStep.EMAIL_INPUT ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="otpEmail" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="otpEmail"
                    type="email"
                    placeholder="nama@email.com"
                    value={otpEmail}
                    onChange={(e) => setOtpEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Kode OTP"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-medium">
                    Kode OTP
                  </label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Masukkan kode 6 digit"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    disabled={loading}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                  <p className="text-sm text-muted-foreground">
                    Kode dikirim ke <span className="font-medium">{otpEmail}</span>
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Memverifikasi...
                    </>
                  ) : (
                    "Verifikasi"
                  )}
                </Button>
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm"
                    type="button"
                  >
                    Tidak menerima kode? Kirim ulang
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setOtpStep(OTPStep.EMAIL_INPUT)}
                    disabled={loading}
                    className="text-sm"
                    type="button"
                  >
                    Gunakan email lain
                  </Button>
                </div>
              </form>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Daftar
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

