import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    await dbConnect()

    const user = await User.findOne({ email, emailVerified: false })

    if (!user) {
      return NextResponse.json({ message: "User not found or already verified" }, { status: 400 })
    }

    // Create new verification token
    const verificationToken = crypto.randomUUID()
    const verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now

    user.verificationToken = verificationToken
    user.verificationTokenExpires = verificationTokenExpires
    await user.save()

    // Send new verification email
    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({ message: "New verification email sent" }, { status: 200 })
  } catch (error) {
    console.error("Resend verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

