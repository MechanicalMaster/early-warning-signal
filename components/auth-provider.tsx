"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const publicPaths = ["/login", "/"]; // Added root path
    // Skip auth check for login page and landing page
    if (publicPaths.includes(pathname)) {
      setIsLoading(false)
      return
    }

    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login")
    } else {
      setIsLoading(false)
    }
  }, [pathname, router])

  // Show nothing while checking authentication for protected routes
  const publicPathsForLoading = ["/login", "/"]; // Added root path
  if (isLoading && !publicPathsForLoading.includes(pathname)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return <>{children}</>
} 