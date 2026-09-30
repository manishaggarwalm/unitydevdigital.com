# UnityDev Digital website

Marketing site for **UnityDev Digital**: AI & machine learning, cloud & DevOps, custom software and
dedicated development teams.

Built with Next.js 16, React 19, Tailwind CSS 4 and Motion. Deployed on Vercel.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional locally; needed for real email delivery
npm run dev
```

Open http://localhost:3000.

## Scripts

| Script           | What it does                           |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Start the dev server                   |
| `npm run build`  | Production build                       |
| `npm run start`  | Serve the production build             |
| `npm run check`  | Type-check, lint and verify formatting |
| `npm run format` | Format all files with Prettier         |

## Editing content

All page copy (services, engagement models, process, FAQs and so on) lives in
[`src/content/home.ts`](src/content/home.ts). Site-wide settings (name, URL, email, nav, social
links) live in [`src/config/site.ts`](src/config/site.ts).

## Contact form

Enquiries are sent by email through [Resend](https://resend.com). Set these variables in Vercel:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`: where enquiries are delivered
- `CONTACT_FROM_EMAIL`: a sender address on a domain verified in Resend
- `NEXT_PUBLIC_SITE_URL`: the production URL

Without `RESEND_API_KEY`, submissions are logged to the console in development. In production they
are rejected with a message asking the visitor to email you directly.

## Deploying

Import the repository into [Vercel](https://vercel.com/new), add the environment variables above,
and deploy. No extra configuration is required.

## Contributing

See [CLAUDE.md](CLAUDE.md) for architecture, conventions, animation guidelines and the checks every
change must pass.
