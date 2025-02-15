import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/db"
import User from "@/models/User"
import { sendVerificationEmail } from "@/lib/email"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    await dbConnect()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create verification token
    const verificationToken = crypto.randomUUID()
    const verificationTokenExpires = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
    })

    await newUser.save()

    // Send verification email
    await sendVerificationEmail(email, verificationToken)

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

