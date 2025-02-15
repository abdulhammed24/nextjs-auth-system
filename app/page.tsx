import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Welcome to My Blog",
  description: "Explore our latest blog posts and join the conversation on various topics.",
}

export default function HomePage() {
  return (
    <div className="container mx-auto py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Blog</h1>
      <p className="text-xl mb-8">Explore our latest blog posts and join the conversation.</p>
      <Link href="/blogs">
        <Button size="lg">View Blog Posts</Button>
      </Link>
    </div>
  )
}

