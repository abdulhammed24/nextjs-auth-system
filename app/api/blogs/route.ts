import { NextResponse } from "next/server"
import { getBlogs } from "@/lib/blogs"

export async function GET() {
  try {
    const blogs = await getBlogs()
    return NextResponse.json(blogs)
  } catch (error) {
    console.error("Error fetching blogs:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

