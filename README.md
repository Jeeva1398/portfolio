# Portfolio - Jeevaananthan M

Developer portfolio site. Content architecture and reasoning behind the structure live in
[`portfolio-context-architecture.md`](./portfolio-context-architecture.md).

## Stack

- **Site:** React (Vite) + Tailwind CSS - `client/`, built to static files.
- **Contact form and chat:** [ZenithDesk](https://zenithdesk.site). The form files each message as a
  ZenithDesk enquiry (Enquiries page + alert email), and the ZenithDesk chat widget runs on the page.
  There is no server of our own.

## Getting started

```bash
npm run install:all
cp client/.env.example client/.env.local   # add the widget key
npm run dev                                # http://localhost:5173
```

For local development, add `http://localhost:5173` to the widget's allowed sites in ZenithDesk
(Settings → Chat widget), or leave the key empty to run without the form and chat.

## Deploy

```bash
cp client/.env.example client/.env.production.local   # widget key, once
npm run build                                         # writes client/dist
```

Upload the **contents** of `client/dist` to the web root (`/var/www/html/portfolio/client`), served by
nginx as static files. In ZenithDesk, add `https://iamjeeva.in` to the widget's allowed sites and turn
on **Take enquiries** in Settings → Chatbot.

## Content

All site copy lives in `client/src/data/content.js` - profile, about, skills, experience, projects,
and the ZenithDesk deep-dive. Edit that file to update content without touching components.

**Still TODO** (see `portfolio-context-architecture.md` §5):
- Real headshot (currently a placeholder avatar)
- ZenithDesk repo/demo links, once available
