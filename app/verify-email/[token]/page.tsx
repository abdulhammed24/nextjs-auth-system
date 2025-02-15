"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

export default function VerifyEmailPage({ params }: { params: { token: string } }) {
  const router = useRouter()
  const [isVerifying, setIsVerifying] = useState(true)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: params.token }),
        })

        if (response.ok) {
          toast.success("Email verified successfully. You can now log in.")
          router.push("/login")
        } else {
          const errorData = await response.json()
          if (errorData.message.includes("expired")) {
            setIsExpired(true)
          } else {
            toast.error(errorData.message || "Failed to verify email")
          }
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.")
      } finally {
        setIsVerifying(false)
      }
    }

    verifyEmail()
  }, [params.token, router])

  if (isVerifying) {
    return <div className="text-center mt-8">Verifying your email...</div>
  }

  if (isExpired) {
    return (
      <div className="text-center mt-8 space-y-4">
        <p>Your verification link has expired.</p>
        <Button asChild>
          <Link href="/resend-verification">Request a new verification email</Link>
        </Button>
      </div>
    )
  }

  return null
}

