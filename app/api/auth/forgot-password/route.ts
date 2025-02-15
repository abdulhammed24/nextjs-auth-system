import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { sendPasswordResetEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    await dbConnect()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const resetToken = crypto.randomUUID()
    const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

    user.resetPasswordToken = resetToken
    user.resetPasswordExpires = resetTokenExpiry
    await user.save()

    await sendPasswordResetEmail(email, resetToken)

    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 })
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

