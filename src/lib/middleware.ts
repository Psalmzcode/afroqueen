// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { getToken } from 'next-auth/jwt'

// export async function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname

//   // Admin routes that require authentication
//   const adminRoutes = ['/admin', '/dashboard']
//   const isAdminRoute = adminRoutes.some(route => path.startsWith(route))

//   // Public routes (no auth required)
//   const publicRoutes = ['/', '/admin/login',  '/artists',
//     '/episodes',
//     '/blog',
//     '/gallery', '/register', '/api/auth']
//   const isPublicRoute = publicRoutes.some(route => 
//     path === route || path.startsWith(`${route}/`)
//   )

//   // Get the session token
//   const token = await getToken({ 
//     req: request,
//     secret: process.env.AUTH_SECRET,
//     cookieName: 'next-auth.session-token' // Remove production check for now
//   })

//   // If accessing admin route without auth, redirect to login
//   if (isAdminRoute && !token) {
//     const loginUrl = new URL('/admin/login', request.url)

//     // Only add callbackUrl if not already on login page
//     if (!path.includes('/login')) {
//       loginUrl.searchParams.set('callbackUrl', path)
//     }

//     return NextResponse.redirect(loginUrl)
//   }

//   // If already logged in and trying to access login/register, redirect to dashboard
//   if (token && (path === '/admin/login' || path === '/register')) {
//     return NextResponse.redirect(new URL('/admin/dashboard', request.url))
//   }

//   return NextResponse.next()
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
//   ],
// }

// middleware.ts - UPDATED FOR /login IN ROOT
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// ==================== CONFIGURATION ====================
const routeConfig = {
  // Public routes that anyone can access
  publicRoutes: [
    '/',
    '/login',                    // Login page (NOW in root!)
    '/about',
    '/artists',
    '/artists/[slug]',
    '/episodes',
    '/episodes/[slug]',
    '/gallery',
    '/gallery/[id]',
    '/blog',
    '/blog/[slug]',
    '/contact',
    '/privacy',
    '/terms',
  ],

  // Admin routes that require authentication
  adminRoutes: [
    '/admin/dashboard',
    '/admin/artists',
    '/admin/artists/new',
    '/admin/artists/[id]',
    '/admin/blog',
    '/admin/blog/new',
    '/admin/blog/[id]',
    '/admin/gallery',
    '/admin/gallery/new',
    '/admin/gallery/[id]',
    '/admin/episodes',
    '/admin/episodes/new',
    '/admin/episodes/[id]',
    '/admin/analytics',
    '/admin/settings',
    '/admin/users',
    '/admin/comments',
    '/admin/newsletter',
  ],

  // Auth routes (register, error pages, etc.)
  authRoutes: [
    '/register',
    '/auth/error',
    '/auth/verify-email',
    '/auth/reset-password',
    '/auth/forgot-password',
  ],

  // API routes that need protection
  protectedApiRoutes: [
    '/api/admin',
    '/api/artists',
    '/api/blog',
    '/api/gallery',
    '/api/episodes',
    '/api/users',
    '/api/upload',
  ],

  // Roles allowed to access admin area
  allowedAdminRoles: ['SUPER_ADMIN', 'ADMIN', 'EDITOR'],

  // Roles allowed to access super admin features
  allowedSuperAdminRoles: ['SUPER_ADMIN'],
}

// ==================== HELPER FUNCTIONS ====================
function isPublicRoute(pathname: string): boolean {
  // Check exact matches
  if (routeConfig.publicRoutes.includes(pathname)) return true

  // Check dynamic routes
  return routeConfig.publicRoutes.some(route => {
    if (route.includes('[')) {
      const pattern = route
        .replace(/\[.*?\]/g, '[^/]+')
        .replace(/\//g, '\\/')

      const regex = new RegExp(`^${pattern}$`)
      return regex.test(pathname)
    }
    return false
  })
}

function isAdminRoute(pathname: string): boolean {
  // Admin routes always start with /admin
  if (!pathname.startsWith('/admin')) return false

  // Check exact matches
  if (routeConfig.adminRoutes.includes(pathname)) return true

  // Check dynamic admin routes
  return routeConfig.adminRoutes.some(route => {
    if (route.includes('[')) {
      const pattern = route
        .replace(/\[.*?\]/g, '[^/]+')
        .replace(/\//g, '\\/')

      const regex = new RegExp(`^${pattern}$`)
      return regex.test(pathname)
    }
    return false
  })
}

function isAuthRoute(pathname: string): boolean {
  return routeConfig.authRoutes.includes(pathname)
}

function isProtectedApiRoute(pathname: string): boolean {
  return routeConfig.protectedApiRoutes.some(route =>
    pathname.startsWith(route)
  )
}

// ==================== MAIN MIDDLEWARE ====================
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const requestHeaders = new Headers(request.headers)

  // Add security headers
  requestHeaders.set('X-DNS-Prefetch-Control', 'on')
  requestHeaders.set('X-Frame-Options', 'DENY')
  requestHeaders.set('X-Content-Type-Options', 'nosniff')
  requestHeaders.set('Referrer-Policy', 'origin-when-cross-origin')

  // ========== LOGIN PAGE HANDLING ==========
  if (pathname === '/login') {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
    })

    // If already logged in, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }

    // Allow access to login page
    return NextResponse.next({
      request: { headers: requestHeaders }
    })
  }

  // ========== PUBLIC ROUTES ==========
  if (isPublicRoute(pathname)) {
    return NextResponse.next({
      request: { headers: requestHeaders }
    })
  }

  // ========== AUTH ROUTES (except login) ==========
  if (isAuthRoute(pathname)) {
    return NextResponse.next({
      request: { headers: requestHeaders }
    })
  }

  // ========== PROTECTED API ROUTES ==========
  if (isProtectedApiRoute(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
    })

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: requestHeaders }
      )
    }

    // Check admin permissions for admin API
    if (pathname.startsWith('/api/admin')) {
      const userRole = token.role as string
      if (!routeConfig.allowedAdminRoles.includes(userRole)) {
        return NextResponse.json(
          { error: 'Forbidden: Insufficient permissions' },
          { status: 403, headers: requestHeaders }
        )
      }
    }

    return NextResponse.next({
      request: { headers: requestHeaders }
    })
  }

  // ========== ADMIN ROUTES ==========
  if (isAdminRoute(pathname)) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET!,
    })

    // No token = not authenticated
    if (!token) {
      const loginUrl = new URL('/login', request.url) // ← CHANGED FROM /admin/login
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check admin permissions
    const userRole = token.role as string

    // Super admin only routes
    const superAdminOnlyRoutes = [
      '/admin/settings',
      '/admin/users',
    ]

    const isSuperAdminRoute = superAdminOnlyRoutes.some(route =>
      pathname.startsWith(route)
    )

    if (isSuperAdminRoute && !routeConfig.allowedSuperAdminRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    // Regular admin routes
    if (!routeConfig.allowedAdminRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }

    return NextResponse.next({
      request: { headers: requestHeaders }
    })
  }

  // ========== CATCH-ALL ==========
  // For any other route, allow access (404 will handle it)
  return NextResponse.next({
    request: { headers: requestHeaders }
  })
}

// ==================== MIDDLEWARE CONFIG ====================
export const config = {
  matcher: [
    // Match all routes except static files and NextAuth API
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public|sitemap.xml|robots.txt).*)',
  ],
}