# Xicmo landing page

The frontend of the Xicmo marketing homepage, extracted as a standalone
Next.js app so it can be worked on without the main application.

**This repo contains the `/` route and nothing else.** No backend, no database,
no authentication, no API keys, no other marketing pages.

## Running it

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. No environment variables are required.

```bash
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Layout

The directory structure mirrors the main Xicmo repo exactly, so every file
sits at the same path it does there and every `@/...` import is unchanged.
That is deliberate: edits made here can be copied straight back without
rewriting a single import.

```
src/
  app/
    layout.tsx                  root layout (see "Differences" below)
    globals.css                 design tokens, light and dark
    theme-provider.tsx
    (marketing)/
      layout.tsx                header, footer, JSON-LD
      page.tsx                  the page itself: 5 sections in order
    api/public/site-audit/      MOCK ONLY, see below
  frontend/
    components/
      marketing/                every section component
      ui/                       shadcn primitives used by them
      brand-logos.tsx
    data/marketing-data.ts      all page copy: agents, cost table, FAQs
  shared/                       site constants, pricing, helpers
```

### The page

`src/app/(marketing)/page.tsx` is five components in order:

| Component | File |
| --- | --- |
| Hero, with the site-audit form | `marketing/hero.tsx` |
| Agent grid | `marketing/agent-grid.tsx` |
| Cost comparison table | `marketing/cost-table.tsx` |
| FAQ accordion | `marketing/faq.tsx` |
| Closing call to action | `marketing/cta.tsx` |

Header and footer live in `(marketing)/layout.tsx`.

### Copy lives in one file

Agent descriptions, the cost comparison rows and every FAQ are data, not
markup: `src/frontend/data/marketing-data.ts`. Change wording there rather
than in the components.

### Styling

Tailwind, with the design tokens as CSS variables in `src/app/globals.css`.
Both light and dark themes are defined there.

**Dark mode is not optional.** The site respects the visitor's system setting
and there is a toggle in the header. Anything new needs to work in both, which
in practice means using the semantic tokens (`bg-background`, `text-muted-foreground`,
`border`) rather than fixed colours. If you do need a literal colour, give it a
`dark:` variant.

## Differences from the main app

Three files differ from their originals. Everything else is byte-identical.

1. **`src/app/layout.tsx`** is trimmed. The original also mounts the auth
   session provider, analytics and the cookie consent banner, all of which
   import from the application backend. None of it affects how the page looks.

2. **`src/app/(marketing)/layout.tsx`** reads `process.env.NEXT_PUBLIC_APP_URL`
   directly. The original goes through a validated env module that pulls in the
   whole server-side environment schema.

3. **`src/app/api/public/site-audit/route.ts`** is a **mock**. The hero form
   posts to this endpoint; in production it runs a real crawl, and that code
   is not in this repo. The mock returns fixed, obviously-fake results after a
   short delay so the form's loading and success states can be styled.

   **Do not merge that file back into the main app.** It would overwrite the
   real endpoint.

## Working on this

- Please keep changes to the files under `src/`. Config changes are fine if
  something genuinely needs them, but flag them.
- Do not add environment variables that hold anything secret. This repo is
  frontend only and should stay that way.
- The page is statically prerendered. Anything that needs a server request at
  page load will change that, so mention it if you add one.
