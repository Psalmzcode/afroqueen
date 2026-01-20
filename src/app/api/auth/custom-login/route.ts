import { NextResponse } from 'next/server'
import { verifyPassword, hashPassword } from '@/lib/auth/password'
import { prisma } from '@/lib/prisma'
import { signIn } from '@/lib/auth'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' }, 
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      select: {
        id: true,
        email: true,
        password: true,
        isActive: true,
        role: true,
      }
    })
    
    // Timing attack mitigation
    if (!user || !user.password || !user.isActive) {
      await verifyPassword(
        "$argon2id$v=19$m=65536,t=3,p=4$dummy$dummy", 
        "dummy"
      ).catch(() => {})
      
      return NextResponse.json(
        { error: 'Invalid email or password' }, 
        { status: 401 }
      )
    }
    
    const isValid = await verifyPassword(user.password, password)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' }, 
        { status: 401 }
      )
    }
    
    // Migrate bcrypt to argon2 if needed
    if (user.password.startsWith('$2')) {
      await prisma.user.update({
        where: { id: user.id },
        data: { password: await hashPassword(password) }
      }).catch(() => {})
    }
    
    // Create verification token
    const token = crypto.randomUUID()
    const expires = new Date(Date.now() + 10 * 60 * 1000)
    
    await prisma.verificationToken.deleteMany({
      where: { identifier: user.email }
    })
    
    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token,
        expires,
      }
    })
    
    // Sign in using email provider (creates database session)
    await signIn('email', {
      email: user.email,
      token,
      redirect: false,
    })
    
    return NextResponse.json({ 
      success: true,
      redirectTo: '/admin/dashboard'
    })
    
  } catch (error) {
    console.error('Custom login error:', error)
    return NextResponse.json(
      { error: 'An error occurred during login' }, 
      { status: 500 }
    )
  }
}