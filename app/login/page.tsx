import type { Metadata } from "next"
import LoginForm from "./LoginForm"

export const metadata: Metadata = {
  title: "Login | My Blog",
  description: "Log in to your account to access your personalized dashboard and features.",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h1>
        <LoginForm />
      </div>
    </div>
  )
}

