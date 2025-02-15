import type { Metadata } from "next"
import ForgotPasswordForm from "./ForgotPasswordForm"

export const metadata: Metadata = {
  title: "Forgot Password | My Blog",
  description: "Reset your password to regain access to your account.",
}

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h1>
        <ForgotPasswordForm />
      </div>
    </div>
  )
}

