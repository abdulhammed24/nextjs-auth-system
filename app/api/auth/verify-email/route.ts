import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import User from "@/models/User"

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    await dbConnect()

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    })

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired verification token" }, { status: 400 })
    }

    user.emailVerified = true
    user.verificationToken = undefined
    user.verificationTokenExpires = undefined
    await user.save()

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

