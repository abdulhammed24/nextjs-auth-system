import { Suspense } from "react"
import type { Metadata } from "next"
import { getBlogById } from "@/lib/blogs"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { SingleBlogSkeleton } from "@/components/SingleBlogSkeleton"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const blog = await getBlogById(params.id)
  return {
    title: blog ? `${blog.title} | My Blog` : "Blog Post",
    description: blog ? blog.content.substring(0, 160) : "Read this interesting blog post on our site.",
  }
}

async function BlogContent({ id }: { id: string }) {
  const blog = await getBlogById(id)

  if (!blog) {
    return <div>Blog post not found</div>
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        By {blog.author.name} on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">{blog.content}</div>
    </div>
  )
}

export default async function SingleBlogPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<SingleBlogSkeleton />}>
        <BlogContent id={params.id} />
      </Suspense>
    </div>
  )
}

