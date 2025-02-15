import dbConnect from "@/lib/db"
import User from "@/models/User"

export async function verifyEmail(token: string): Promise<string> {
  await dbConnect()

  const user = await User.findOne({
    verificationToken: token,
    verificationTokenExpires: { $gt: Date.now() },
  })

  if (!user) {
    return "Invalid or expired verification token. Please request a new one."
  }

  user.emailVerified = true
  user.verificationToken = undefined
  user.verificationTokenExpires = undefined
  await user.save()

  return "Email verified successfully. You can now log in."
}

