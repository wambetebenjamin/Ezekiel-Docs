# Ezekiel Docs

Your legal documents, done right.

Ezekiel Docs is a legal document automation platform for Kenyan SMEs,
freelancers, and startups. Users answer plain-language questions and download
lawyer-reviewed, Kenyan-law-compliant PDF documents in minutes.

## Tech stack

- Next.js 16 (App Router, Turbopack) and React 19
- TypeScript in strict mode
- Tailwind CSS v4 with a token-based design system defined in `app/globals.css`
- Framer Motion and GSAP for purposeful motion, Lenis for smooth scrolling
- jsPDF and QRCode for document generation
- Zod for validation, React Hook Form for the generator wizard
- Nodemailer for transactional email
- Vercel Blob for optional PDF storage
- NextAuth and Vercel KV are pinned in `package.json` for the authentication
  and rate-limiting phases of the product roadmap

## Getting started

```bash
nvm use
npm install
cp .env.example .env.local
npm run dev
```

The application runs without external service credentials in local
development. reCAPTCHA, email, and Vercel Blob features activate automatically
when their environment variables are configured. Without a reCAPTCHA secret
key, verification passes through locally so the document and enquiry flows
stay testable.

## Routes

- `/` home page
- `/documents` catalogue with category filters and pagination
- `/generate/[slug]` three-step document wizard with review and PDF download
- `/pricing` plans and comparison table
- `/about` mission, team, and values
- `/contact` enquiry form wired to `/api/send-enquiry`, with WhatsApp fallback
- `/legal/privacy-policy`, `/legal/terms`, `/legal/cookie-policy`
- `not-found` and `error` boundaries, plus `robots.txt` and `sitemap.xml`
- API routes: `/api/generate-document` and `/api/send-enquiry`

## Project structure

- `app/` routes, including pages, legal content, and API routes
- `components/` layout, UI primitives, and feature components
- `lib/` document catalogue, validation, PDF generation, email, and helpers
- `public/images/` Pexels photographs, see `image-credits.md`
- `public/fonts/` Inter variable fonts

## Environment variables

See `.env.example` for the full list, including reCAPTCHA, SMTP, Vercel Blob,
and Vercel KV configuration.

## Verification

The following checks must all pass:

```bash
npm run typecheck        # tsc --noEmit
npm run build            # next build, runs TypeScript and static generation
npm audit --audit-level=high
```

## Security and dependency notes

The original dependency pin list was adjusted where advisories required it so
that `npm audit --audit-level=high` reports zero vulnerabilities:

- `zod` upgraded from 3.x to 4.6.7 (GHSA-mrhx-c7xc-m3w5). The schema API used
  here (`object`, `enum`, `string`, `trim`, `email`, `safeParse`, `flatten`)
  is supported in Zod 4.
- `nodemailer` upgraded from 6.10.1 to 10.2.1 to clear multiple SMTP injection,
  address parsing, and TLS advisories. `@types/nodemailer` is pinned to 8.0.2.
- `@vercel/blob` upgraded from 0.27.3 to 2.8.2 to clear undici and
  `@fastify/busboy` advisories.
- `jspdf` upgraded from 3.0.1 to 4.2.1 to clear denial of service, path
  traversal, and PDF injection advisories. The core jsPDF API used by
  `lib/pdf.ts` is unchanged.
- `overrides` in `package.json` pin `motion-dom` to 12.17.3, the version
  framer-motion 12.18.0 was published against (newer 12.x releases removed an
  export it imports), and force every nested `zod` copy to 4.6.7.
- `.npmrc` sets `legacy-peer-deps=true` because the next-auth beta declares an
  optional nodemailer peer range that does not include nodemailer 10, and that
  optional peer integration is not used.

## Scripts

- `npm run dev` start the development server
- `npm run build` production build
- `npm run start` serve the production build
- `npm run typecheck` run the TypeScript compiler without emitting
