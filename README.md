# Netflixify My Life

Transform your life story into a cinematic Netflix-style series experience.

## Features

- **Premium Netflix-inspired UI** — Dark, cinematic design with elegant animations
- **10-question onboarding** — Conversational, one question at a time
- **AI-powered generation** — OpenAI GPT-4o creates your complete series
- **Poster generation** — DALL-E 3 cinematic poster matching your story
- **Netflix title page** — Hero banner, synopsis, episodes, character arc, reviews
- **Shareability** — Share, export image, download poster, copy link

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS 4
- ShadCN UI (Radix primitives)
- Framer Motion
- OpenAI API
- Supabase
- Vercel-ready

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required:
- `OPENAI_API_KEY` — Your OpenAI API key

Optional (for persistent share links):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_APP_URL` — e.g. `http://localhost:3000`

### 3. Set up Supabase (optional)

Run `supabase/schema.sql` in your Supabase SQL editor to create the `series` table.

Without Supabase, series are stored in memory (works for local dev, not persistent across restarts).

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Set `NEXT_PUBLIC_APP_URL` to your production URL for share links.

## Project Structure

```
src/
├── app/
│   ├── api/generate/     # AI generation endpoint
│   ├── api/series/[id]/  # Fetch series by ID
│   ├── create/           # Onboarding flow
│   ├── series/[id]/      # Result page
│   └── page.tsx          # Landing page
├── components/
│   ├── landing/          # Hero, demo posters, CTA
│   ├── layout/           # Header, logo
│   ├── series/           # Result page sections
│   └── ui/               # ShadCN primitives
├── lib/
│   ├── openai.ts         # AI generation
│   ├── supabase.ts       # Database client
│   └── constants.ts      # Questions, demo data
└── types/
    └── index.ts          # TypeScript types
```

## License

MIT
