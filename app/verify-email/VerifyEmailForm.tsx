"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

const resendVerificationSchema = z.object({
  email: z.string().email("Invalid email address"),
})

type ResendVerificationFormData = z.infer<typeof resendVerificationSchema>

export default function VerifyEmailForm({ initialVerificationResult }: { initialVerificationResult: string | null }) {
  const [verificationResult, setVerificationResult] = useState(initialVerificationResult)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendVerificationFormData>({
    resolver: zodResolver(resendVerificationSchema),
  })

  const onSubmit = async (data: ResendVerificationFormData) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setVerificationResult("New verification email sent. Please check your inbox.")
        toast.success("New verification email sent. Please check your inbox.")
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to send verification email")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    }
    setIsLoading(false)
  }

  if (verificationResult) {
    return (
      <div className="text-center mt-8 space-y-4">
        <p>{verificationResult}</p>
        {verificationResult.includes("expired") && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Request a new verification email</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" autoComplete="email" {...register("email")} />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Sending..." : "Resend Verification Email"}
              </Button>
            </form>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="text-center mt-8">
      <p>No verification token provided. Please check your email for the verification link or request a new one.</p>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" autoComplete="email" {...register("email")} />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Verification Email"}
        </Button>
      </form>
    </div>
  )
}

