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

export default function ResendVerificationPage() {
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

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Resend Verification Email</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" type="email" autoComplete="email" {...register("email")} />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Resend Verification Email"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

