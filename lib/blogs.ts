import dbConnect from "@/lib/db"
import Blog from "@/models/Blog"

export async function getBlogs() {
  await dbConnect()
  const blogs = await Blog.find().sort({ createdAt: -1 }).limit(10).populate("author", "name")
  return JSON.parse(JSON.stringify(blogs))
}

export async function getBlogById(id: string) {
  await dbConnect()
  const blog = await Blog.findById(id).populate("author", "name")
  return JSON.parse(JSON.stringify(blog))
}

