import type { Metadata } from "next"
import RegisterForm from "./RegisterForm"

export const metadata: Metadata = {
  title: "Register | My Blog",
  description: "Create a new account to access our services and features.",
}

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

