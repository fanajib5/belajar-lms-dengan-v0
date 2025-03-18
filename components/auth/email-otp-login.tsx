"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { HandIcon, Loader2 } from "lucide-react"
import Link from "next/link"

enum AuthStep {
  EMAIL_INPUT = 0,
  OTP_VERIFICATION = 1,
}

export default function EmailOTPLogin() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [step, setStep] = useState<AuthStep>(AuthStep.EMAIL_INPUT)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      setSuccess("Kode OTP telah dikirim ke email Anda.")
      setStep(AuthStep.OTP_VERIFICATION)
    } catch (error: any) {
      setError(error.message || "Gagal mengirim kode OTP. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      })

      if (error) {
        throw error
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
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      setSuccess("Kode OTP baru telah dikirim ke email Anda.")
    } catch (error: any) {
      setError(error.message || "Gagal mengirim ulang kode OTP. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <HandIcon className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">Login ke KraftLMS</CardTitle>
        <CardDescription className="text-center">
          {step === AuthStep.EMAIL_INPUT
            ? "Masukkan email Anda untuk menerima kode login"
            : "Masukkan kode OTP yang telah dikirim ke email Anda"}
        </CardDescription>
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

        {step === AuthStep.EMAIL_INPUT ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Kode dikirim ke <span className="font-medium">{email}</span>
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
          </form>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {step === AuthStep.OTP_VERIFICATION && (
          <Button variant="ghost" onClick={handleResendOTP} disabled={loading} className="text-sm" type="button">
            Tidak menerima kode? Kirim ulang
          </Button>
        )}
        {step === AuthStep.OTP_VERIFICATION && (
          <Button
            variant="outline"
            onClick={() => setStep(AuthStep.EMAIL_INPUT)}
            disabled={loading}
            className="text-sm"
            type="button"
          >
            Gunakan email lain
          </Button>
        )}
        <p className="text-sm text-muted-foreground text-center">
          Belum punya akun?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Daftar
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

