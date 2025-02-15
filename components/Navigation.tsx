"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const { data: session } = useSession()

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          My Blog
        </Link>
        <div className="space-x-4">
          <Link href="/blogs" className="hover:text-gray-300">
            Blogs
          </Link>
          {session ? (
            <>
             
              <Button onClick={() => signOut()} variant="ghost">
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link href="/register" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

