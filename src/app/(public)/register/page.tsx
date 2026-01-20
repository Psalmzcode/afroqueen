
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    setPasswordStrength(strength)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    }

    // Client-side validation
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      setError('All fields are required')
      setLoading(false)
      return
    }

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Use uppercase, numbers, and symbols.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      setSuccess('Account created successfully! Redirecting to login...')
      
      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin/login?registered=true')
      }, 2000)
      
    } catch (error: any) {
      console.error('Registration error:', error)
      setError(error.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStrengthColor = (strength: number) => {
    switch (strength) {
      case 0: case 1: return 'bg-red-500'
      case 2: return 'bg-yellow-500'
      case 3: return 'bg-blue-500'
      case 4: return 'bg-green-500'
      default: return 'bg-gray-300'
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Join Afroqueens</h1>
          <p className="text-gray-300">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              disabled={loading}
              onChange={(e) => checkPasswordStrength(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Create a strong password"
            />
            
            {passwordStrength > 0 && (
              <div className="mt-2">
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-all ${
                        i <= passwordStrength 
                          ? getStrengthColor(passwordStrength) 
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {passwordStrength === 1 && 'Very weak'}
                  {passwordStrength === 2 && 'Weak'}
                  {passwordStrength === 3 && 'Good'}
                  {passwordStrength === 4 && 'Strong'}
                </div>
              </div>
            )}
            
            <ul className="text-xs text-gray-400 mt-2 space-y-1">
              <li>• At least 8 characters</li>
              <li>• One uppercase letter</li>
              <li>• One number</li>
              <li>• One special character</li>
            </ul>
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Confirm your password"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-300 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-500/20 border border-green-500/50 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                <p className="text-green-300 text-sm">{success}</p>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating Account...
              </div>
            ) : 'Create Account'}
          </button>

          <div className="text-center">
            <p className="text-gray-400">
              Already have an account?{' '}
              <Link href="/admin/login" className="text-red-400 hover:underline hover:text-red-300">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}