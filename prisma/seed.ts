import { PrismaClient } from '@prisma/client'
import argon2 from 'argon2'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await argon2.hash('admin123')

  const admin = await prisma.user.upsert({
    where: { email: 'admin@afroqueens.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@afroqueens.com',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
    },
  })

  const season1 = await prisma.season.upsert({
    where: { number: 1 },
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
    where: { number: 2 },
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
  ])

  await prisma.siteSettings.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      siteName: 'Afroqueens',
      siteDescription: 'Amplifying African female voices in music',
      contactEmail: 'info@afroqueens.com',
      primaryColor: '#DC2626',
      secondaryColor: '#000000',
      accentColor: '#FFFFFF',
      enableComments: true,
      enableNewsletter: true,
    },
  })

  console.log('Database seeded successfully!')
  console.log('Admin credentials:')
  console.log('Email: admin@afroqueens.com')
  console.log('Password: admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


