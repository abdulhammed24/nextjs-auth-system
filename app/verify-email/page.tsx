import { Suspense } from "react"
import type { Metadata } from "next"
import VerifyEmailForm from "./VerifyEmailForm"
import { verifyEmail } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Verify Email | My Blog",
  description: "Verify your email address to complete your registration and access all features.",
}

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  const token = searchParams.token
  let verificationResult = null

  if (token) {
    verificationResult = await verifyEmail(token)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Verify Email</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyEmailForm initialVerificationResult={verificationResult} />
      </Suspense>
    </div>
  )
}

