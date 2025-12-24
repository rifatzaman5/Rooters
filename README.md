# Rooters Website

A modern Next.js 16+ website built with TypeScript, Shadcn UI, and Sanity CMS.

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **CMS**: Sanity CMS
- **Icons**: Lucide React

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles + Tailwind
├── components/
│   ├── ui/                # Raw Shadcn components (CLI-managed)
│   └── [molecules]/       # Reusable composed components
├── lib/
│   ├── utils.ts          # cn() helper + utilities
│   └── sanity/           # Sanity client, queries & image helper
│       ├── client.ts     # Production & preview clients
│       ├── image.ts      # urlFor() helper
│       └── queries.ts    # Type-safe GROQ queries (defineQuery)
├── sanity/
│   ├── schemas/           # Sanity schema definitions
│   ├── lib/
│   │   └── env.ts        # Sanity environment config
│   └── sanity.config.ts  # Sanity Studio config
├── types/                 # TypeScript type definitions
└── public/                # Static assets
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Copy `.env.example` to `.env.local` and fill in your Sanity credentials:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
   SANITY_API_READ_TOKEN=your_read_token
   SANITY_PREVIEW_SECRET=your_preview_secret
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Access Sanity Studio**:
   Navigate to `http://localhost:3000/studio` to access the Sanity Studio.

## Adding Shadcn Components

Use the Shadcn CLI to add components:

```bash
npx shadcn@latest add [component-name]
```

Components will be added to `components/ui/` directory.

## Project Rules

This project follows strict architectural patterns:

- **Single Source of Truth**: UI sections (Hero, Footer, FAQ) are single components with `variant` props
- **Sanity Schema First**: Define Sanity schemas before writing JSX
- **Server Components**: Default to Server Components, use `'use client'` only when needed
- **Type Safety**: Use `defineQuery` for type-safe GROQ queries
- **Icons**: Use `lucide-react` only

See `.cursor/rules/project-rules-for-ai/RULE.md` for complete guidelines.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
