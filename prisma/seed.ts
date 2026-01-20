// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import * as argon2 from 'argon2'

const prisma = new PrismaClient({
  log: ['error', 'warn'],
})

async function main() {
  console.log('🌱 Starting database seed...')

  // ============================================
  // CREATE ADMIN USER
  // ============================================
  console.log('👤 Creating admin user...')
  const hashedPassword = await argon2.hash('admin123')

  const admin = await prisma.user.upsert({
    where: { email: 'admin@afroqueens.com' },
    update: {
      password: hashedPassword, // Update password if user exists
      role: 'SUPER_ADMIN',
      isActive: true,
    },
    create: {
      name: 'Super Admin',
      email: 'admin@afroqueens.com',
      emailVerified: new Date(), // Mark as verified
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  })

  // ============================================
  // CREATE ADDITIONAL USERS (Optional)
  // ============================================
  console.log('👥 Creating additional users...')
  
  const editor = await prisma.user.upsert({
    where: { email: 'editor@afroqueens.com' },
    update: {},
    create: {
      name: 'Content Editor',
      email: 'editor@afroqueens.com',
      emailVerified: new Date(),
      password: await argon2.hash('editor123'),
      role: 'EDITOR',
      isActive: true,
    },
  })

  const viewer = await prisma.user.upsert({
    where: { email: 'viewer@afroqueens.com' },
    update: {},
    create: {
      name: 'Guest Viewer',
      email: 'viewer@afroqueens.com',
      emailVerified: new Date(),
      password: await argon2.hash('viewer123'),
      role: 'VIEWER',
      isActive: true,
    },
  })

  // ============================================
  // CREATE SEASONS
  // ============================================
  console.log('📅 Creating seasons...')
  
  const season1 = await prisma.season.upsert({
    where: { slug: 'season-1' }, // Changed from number to slug
    update: {},
    create: {
      name: 'Season 1',
      slug: 'season-1',
      number: 1,
      description: 'The inaugural season of Afroqueens',
      themeColor: '#DC2626',
      startDate: new Date('2024-01-01'),
      isActive: true,
    },
  })

  const season2 = await prisma.season.upsert({
    where: { slug: 'season-2' }, // Changed from number to slug
    update: {},
    create: {
      name: 'Season 2',
      slug: 'season-2',
      number: 2,
      description: 'The second season featuring more artists',
      themeColor: '#7C3AED',
      startDate: new Date('2024-06-01'),
      isActive: true,
    },
  })

  // ============================================
  // CREATE CATEGORIES
  // ============================================
  console.log('📂 Creating categories...')
  
  await Promise.all([
    prisma.category.upsert({
      where: { slug: 'artist-spotlights' },
      update: {},
      create: {
        name: 'Artist Spotlights',
        slug: 'artist-spotlights',
        description: 'In-depth features on our talented artists',
        color: '#DC2626',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'industry-insights' },
      update: {},
      create: {
        name: 'Industry Insights',
        slug: 'industry-insights',
        description: 'Analysis and trends in the music industry',
        color: '#059669',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'behind-the-scenes' },
      update: {},
      create: {
        name: 'Behind the Scenes',
        slug: 'behind-the-scenes',
        description: 'Exclusive looks at our production process',
        color: '#7C3AED',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'news' },
      update: {},
      create: {
        name: 'News',
        slug: 'news',
        description: 'Latest updates and announcements',
        color: '#2563EB',
      },
    }),
  ])

  // ============================================
  // CREATE TAGS
  // ============================================
  console.log('🏷️  Creating tags...')
  
  await Promise.all([
    prisma.tag.upsert({
      where: { slug: 'afrobeats' },
      update: {},
      create: { name: 'Afrobeats', slug: 'afrobeats' },
    }),
    prisma.tag.upsert({
      where: { slug: 'highlife' },
      update: {},
      create: { name: 'Highlife', slug: 'highlife' },
    }),
    prisma.tag.upsert({
      where: { slug: 'hip-hop' },
      update: {},
      create: { name: 'Hip Hop', slug: 'hip-hop' },
    }),
    prisma.tag.upsert({
      where: { slug: 'featured' },
      update: {},
      create: { name: 'Featured', slug: 'featured' },
    }),
  ])

  // ============================================
  // CREATE SITE SETTINGS
  // ============================================
  console.log('⚙️  Creating site settings...')
  
  await prisma.siteSettings.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      siteName: 'Afroqueens',
      siteDescription: 'Amplifying African female voices in music',
      contactEmail: 'info@afroqueens.com',
      supportEmail: 'support@afroqueens.com',
      primaryColor: '#DC2626',
      secondaryColor: '#000000',
      accentColor: '#FFFFFF',
      enableComments: true,
      enableNewsletter: true,
      enableUserRegistration: false,
    },
  })

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n✅ Database seeded successfully!\n')
  console.log('═══════════════════════════════════════')
  console.log('📧 LOGIN CREDENTIALS')
  console.log('═══════════════════════════════════════')
  console.log('\n🔐 SUPER ADMIN:')
  console.log('   Email:    admin@afroqueens.com')
  console.log('   Password: admin123')
  console.log('\n✏️  EDITOR:')
  console.log('   Email:    editor@afroqueens.com')
  console.log('   Password: editor123')
  console.log('\n👁️  VIEWER:')
  console.log('   Email:    viewer@afroqueens.com')
  console.log('   Password: viewer123')
  console.log('\n═══════════════════════════════════════\n')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


