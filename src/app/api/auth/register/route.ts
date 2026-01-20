// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, validatePasswordStrength } from '@/lib/auth/password'
import { UserRole } from '@prisma/client'

// Handle POST requests (user registration)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password, role = 'USER' } = body

    // Validate input
    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Check password strength
    const passwordValidation = validatePasswordStrength(password)
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { 
          error: 'Password does not meet requirements',
          details: passwordValidation.feedback 
        },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Determine role - prevent creating admin users via API
    let userRole: UserRole = 'USER'
    
    // Only allow certain roles to be assigned via API
    if (['EDITOR', 'ARTIST', 'VIEWER', 'USER'].includes(role)) {
      userRole = role as UserRole
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: userRole,
        emailVerified: new Date(), // Auto-verify for now
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    // Log the activity
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: 'USER_REGISTERED',
        entityType: 'USER',
        entityId: user.id,
        description: `New user registered: ${user.email}`,
        ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      }
    })

    return NextResponse.json(
      { 
        success: true,
        user,
        message: 'Account created successfully' 
      },
      { status: 201 }
    )

  } catch (error: any) {
    console.error('Registration error:', error)
    
    // Handle Prisma errors
    if (error.code === 'P2002') { // Unique constraint violation
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

// Handle GET requests (check if registration is enabled)
export async function GET() {
  try {
    const settings = await prisma.siteSettings.findFirst()
    
    return NextResponse.json({
      registrationEnabled: settings?.enableUserRegistration || false,
      message: settings?.enableUserRegistration 
        ? 'Registration is open' 
        : 'Registration is currently closed'
    })
  } catch (error) {
    console.error('GET registration error:', error)
    return NextResponse.json(
      { 
        registrationEnabled: false,
        message: 'Unable to check registration status'
      },
      { status: 200 }
    )
  }
}

// Handle OPTIONS requests (CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}