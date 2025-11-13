"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { login } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const user = await login(email, password)
      if (user) {
        router.push("/anchor-master")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid-pattern"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                className="text-slate-300/30 dark:text-slate-700/30"
              />
            </pattern>
            <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EEF2FF" className="dark:stop-color-[#1E293B]" />
              <stop offset="100%" stopColor="#E0F2FE" className="dark:stop-color-[#0F172A]" />
            </linearGradient>
            <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="50" />
            </filter>
          </defs>
          <rect width="100%" height="100%" fill="url(#bg-gradient)" />
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          
          {/* Bold accent elements */}
          <circle cx="10%" cy="20%" r="15%" fill="#60A5FA" fillOpacity="0.4" filter="url(#blur-filter)" className="dark:fill-blue-900" />
          <circle cx="85%" cy="75%" r="20%" fill="#818CF8" fillOpacity="0.4" filter="url(#blur-filter)" className="dark:fill-indigo-900" />
          <circle cx="50%" cy="30%" r="10%" fill="#34D399" fillOpacity="0.2" filter="url(#blur-filter)" className="dark:fill-emerald-900" />
          
          {/* Abstract shapes */}
          <path d="M0,0 L100,0 L100,100 L0,100 L0,0 Z" fill="none" stroke="#60A5FA" strokeWidth="2" strokeOpacity="0.1" className="dark:stroke-blue-800" />
          <path d="M0,100 C30,90 70,110 100,100" fill="none" stroke="#818CF8" strokeWidth="3" strokeOpacity="0.15" className="dark:stroke-indigo-800" />
        </svg>
      </div>

      <Card className="mx-auto max-w-sm z-10 shadow-2xl border-opacity-40 backdrop-blur-sm bg-white/70 dark:bg-slate-900/70">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Early Warning Signal</CardTitle>
          <CardDescription className="text-center">Enter your credentials to sign in to your account</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="user@yesbnak.in" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="bg-white/90 dark:bg-slate-800/90"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/90 dark:bg-slate-800/90"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
} 