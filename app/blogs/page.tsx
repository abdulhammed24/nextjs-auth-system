import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getBlogs } from "@/lib/blogs"
import { BlogListSkeleton } from "@/components/BlogListSkeleton"

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Read our latest blog posts on various topics and stay informed.",
}

async function BlogList() {
  const blogs = await getBlogs()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog: any) => (
        <Card key={blog._id}>
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-2">
              By {blog.author.name} on {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <p className="line-clamp-3">{blog.content}</p>
            <Link href={`/blogs/${blog._id}`} className="text-blue-600 hover:underline mt-2 inline-block">
              Read more
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default function BlogListPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList />
      </Suspense>
    </div>
  )
}

