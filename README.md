# Portfolio — Jeevaananthan M

Developer portfolio site (MERN stack). Content architecture and reasoning behind the structure live in
[`portfolio-context-architecture.md`](./portfolio-context-architecture.md).

## Stack

- **Client:** React (Vite) + React Router + Tailwind CSS — `client/`
- **Server:** Node.js + Express — `server/`

## Getting started

```bash
npm run install:all   # installs root, client, and server dependencies
cp server/.env.example server/.env
npm run dev            # runs client (Vite) and server (Express) together
```

- Client: http://localhost:5173
- API: http://localhost:5000 (proxied from the client under `/api`)

## Structure

```
client/   React app — pages, components, and site content (client/src/data/content.js)
server/   Express API — contact form endpoint, project data endpoint
```

## Content

All site copy lives in `client/src/data/content.js` — profile, about, skills, experience, projects,
and the ZenithDesk ("Currently Building") deep-dive. Edit that file to update content without
touching components.

**Still TODO** (see `portfolio-context-architecture.md` §5 for the original checklist):
- Real headshot (currently a placeholder avatar)
- ZenithDesk repo/demo links, once available
- Real email delivery for the contact form (submissions currently persist to `server/data/submissions.json`; wire up SMTP/nodemailer when credentials are available)
