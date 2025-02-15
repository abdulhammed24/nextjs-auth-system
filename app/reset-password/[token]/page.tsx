import type { Metadata } from "next"
import ResetPasswordForm from "./ResetPasswordForm"

export const metadata: Metadata = {
  title: "Reset Password | My Blog",
  description: "Set a new password for your account to regain access.",
}

export default function ResetPasswordPage({ params }: { params: { token: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Password</h1>
        <ResetPasswordForm token={params.token} />
      </div>
    </div>
  )
}

