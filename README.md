# Task Manager

A full-stack Next.js 14 application demonstrating end-to-end type safety with TypeScript, Prisma ORM, and Zod validation.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database ORM**: Prisma
- **Validation**: Zod
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon/Vercel Postgres)

## Features

- ✅ Full CRUD operations (Create, Read, Update, Delete)
- ✅ End-to-end type safety
- ✅ Server Actions for mutations
- ✅ Zod schema validation
- ✅ Prisma ORM with auto-generated types
- ✅ Responsive UI

## Type Safety Flow

```
Prisma Schema → Generated Types → Zod Schemas → Server Actions → React Components
```

1. **Prisma** generates TypeScript types from the database schema
2. **Zod** schemas validate all inputs at runtime
3. **Server Actions** use typed inputs and return typed responses
4. **React Components** consume fully typed data

## Getting Started

### Prerequisites

- Node.js 18+
- A PostgreSQL database (Neon or Vercel Postgres recommended)

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file with your database URL:
   ```
   DATABASE_URL="your-postgresql-connection-string"
   ```

3. Push the schema to your database:
   ```bash
   npm run db:push
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

This app is ready to deploy on Vercel:

1. Push to GitHub
2. Import to Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy!

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   └── TaskList.tsx
├── lib/
│   ├── actions.ts      # Server actions (CRUD)
│   ├── db.ts           # Prisma client
│   └── validations.ts  # Zod schemas
prisma/
└── schema.prisma       # Database schema
```
