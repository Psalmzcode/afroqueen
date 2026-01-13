# AfroQueens

A Next.js platform for amplifying African female voices in music.

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Set up your environment variables:

```bash
cp .env.example .env.local
```

Fill in your `.env.local` with:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - A random secret
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for local)

Generate Prisma client and run migrations:

```bash
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **NextAuth.js** - Authentication
- **Tailwind CSS** - Styling
- **Radix UI** - UI components

## Project Structure

- `src/app/` - Next.js app directory
  - `(public)/` - Public-facing pages
  - `admin/` - Admin dashboard
  - `api/` - API routes
- `src/components/` - React components
- `prisma/` - Database schema and migrations

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

Make sure to add your environment variables in Vercel project settings.
