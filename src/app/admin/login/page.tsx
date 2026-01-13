"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Music, Lock, Mail, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useDesign } from '@/context/design-context'
import { cn } from '@/lib/utils'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { isDarkMode } = useDesign()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        router.push('/admin/dashboard')
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn(
      "min-h-screen flex items-center justify-center p-4 transition-colors",
      isDarkMode
        ? "bg-gradient-to-br from-black to-gray-950"
        : "bg-gradient-to-br from-gray-50 to-gray-100"
    )}>
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-800 mb-4">
            <Music className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold">
            <span className={isDarkMode ? "text-white" : "text-gray-900"}>Afro</span>
            <span className="text-red-600">Queens</span>
          </h1>
          <p className={cn(
            "mt-2",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>Admin Dashboard</p>
        </div>

        <Card className={cn(
          "border",
          isDarkMode ? "border-gray-800" : "border-gray-200"
        )}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Admin Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {error && (
                <div className={cn(
                  "flex items-center gap-2 p-3 rounded-lg",
                  isDarkMode
                    ? "bg-red-900/20 text-red-300"
                    : "bg-red-50 text-red-700"
                )}>
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  )} />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@afroqueens.com"
                    className={cn(
                      "pl-9",
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white"
                        : ""
                    )}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  )} />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={cn(
                      "pl-9",
                      isDarkMode
                        ? "bg-gray-900 border-gray-700 text-white"
                        : ""
                    )}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              
              <div className="text-center">
                <p className={cn(
                  "text-sm",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Default credentials:
                </p>
                <p className={cn(
                  "text-sm font-medium",
                  isDarkMode ? "text-white" : "text-gray-900"
                )}>
                  admin@afroqueens.com / admin123
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <p className={cn(
            "text-sm",
            isDarkMode ? "text-gray-400" : "text-gray-600"
          )}>
            Having trouble? Contact{' '}
            <a href="mailto:support@afroqueens.com" className="text-red-600 hover:underline">
              support@afroqueens.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

