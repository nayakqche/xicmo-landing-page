# XICMO Landing Page

Marketing website for XICMO, built with Next.js, React, TypeScript, and Tailwind CSS.

## Requirements

- Node.js 20.19+, 22.13+, or 24+
- npm

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Create `.env.local` from `.env.example` and set the public production URL:

```env
NEXT_PUBLIC_APP_URL=https://xicmo.com
```

## Validation

```bash
npm run typecheck
npm run build
```

## Project Structure

```text
src/app/                 Routes, layouts, metadata, and global styles
src/frontend/components  Marketing sections and reusable UI components
src/frontend/data        Landing-page content
src/shared               Shared constants and utilities
public                   Static images and icons
```

## Deployment

Import the repository into Vercel, set `NEXT_PUBLIC_APP_URL` to the deployed
domain, and deploy with the default Next.js settings.

The homepage audit form uses `src/app/api/public/site-audit/route.ts`. Connect
that route to the production audit service before accepting real customer
traffic.
