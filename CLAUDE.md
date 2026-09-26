# Project Context: 3D Portfolio Redesign

## Goal
Redesign the existing personal developer portfolio into a modern, premium, interactive 3D portfolio that positions the owner as a **MERN Full-Stack / Backend Developer AND a Data Engineer**, suitable for recruiters and companies hiring for either track. Reimagine the whole UI/UX around the 3D concept. Do not just add a 3D background to the old site.

**Concept:** "A backend engineer's digital command center." Two control rooms in one: the **application stack** (MERN, APIs, auth, deployment) and the **data stack** (pipelines, warehouse, dashboards).
**Visual language:** 3D technology + backend architecture + data pipelines + cloud infrastructure + modern developer aesthetics. Professional first, flashy second.

Owner: Jeevaananthan M (goes by Jeeva)

**Headline positioning (use consistently in hero, meta tags, and resume section):**
`MERN Full-Stack & Backend Developer | Building in Data Engineering`
(Owner chose this honest version on 2026-09-24. Do not upgrade to "Data Engineer" until a data project is completed.)
Both tracks must be equally easy to find. A recruiter for either role should understand the fit within seconds.

## Decisions (owner-confirmed 2026-09-24)
- This file is the source of truth; it wins over `portfolio-context-architecture.md` when they disagree.
- Stay on **JavaScript (JSX)**, no TypeScript migration.
- **React Three Fiber + Drei** approved; they replaced the old plain-three `Scene3D.jsx`.
- Projects shown as **Live** (deployed to prod, owner-confirmed 2026-09-25): ZenithDesk (https://portal.zenithdesk.site/), ZenithDesk chatbot widget (embedded on this site via `chat.zenithdesk.site/widget.js` in `client/index.html`). **In progress**: E-commerce sales data pipeline. **DevPilot is not shown.**
- Confirmed skills added: Python, Apache Airflow, dbt, ETL/ELT, Docker, SQL, Azure, AWS EC2, AWS S3.
- Content lives in `client/src/data/content.js` (skills, projects, architecture layers). Edit data there, not in components.

## Commands
- `npm run install:all` then `npm run dev` from the repo root (Vite client on :5173). Needs `client/.env.local` with the ZenithDesk widget key for the contact form and chat.
- `npm run build --prefix client`, `npm run lint --prefix client` (oxlint).

---

## Step 0: Inspect the existing portfolio BEFORE changing anything
Produce an inventory and save it in the "Existing Portfolio Inventory" section below.

1. Pages and sections
2. Content (bio, about text, education)
3. Projects (name, description, tech, GitHub link, live link, screenshots)
4. Technologies and skills actually listed
5. Images and assets (photo, logos, screenshots, favicon, OG image)
6. All links (GitHub, LinkedIn, email, social)
7. Resume file and contact info (and whether a contact form exists)
8. Framework, build tool, dependencies, folder structure

**Reuse the existing structure if it is already React.** Only migrate or restructure where it is clearly worthwhile.

---

## Non-Negotiable Content Rules
1. Do NOT invent projects, companies, experience, skills, achievements, or personal info.
2. Preserve all factual content from the existing portfolio. Improve presentation only.
3. Only show technologies that exist in the current portfolio or in the "Owner-Confirmed Additions" list below.
4. Reuse existing images, resume, screenshots, and links.
5. Do not remove useful existing content just to simplify the design.
6. No placeholder text (no "Lorem ipsum"). Every button and link must work.
7. If something is missing (for example no live demo URL), omit that button rather than faking a link, and list it under "Open Questions".
8. **Data Engineering claims must match reality.** Label unfinished work honestly ("In progress" / "Planned") and never imply production traffic, real users, or metrics that do not exist. Portfolio/demo projects should be described as portfolio projects.

---

## Owner-Confirmed Additions (not necessarily in the old site; verify status with the owner before publishing)
These come from the owner's current work. Add them as projects/skills only with the status shown.

- **Domain experience:** healthcare (EMR/telehealth), CRM, e-commerce. Cross-check wording against the old portfolio's Experience section.
- **ZenithDesk** (MERN, portfolio project): multi-tenant support-ticket SaaS. Vite + React client, Express server, MySQL with Knex, JWT auth, agents/tickets/tags/views, super-admin endpoints, Zendesk-inspired agent dashboard, faker-seeded data. Multi-tenancy via `org_id` on tenant tables. Warehouse/ETL layer is built (verified in repo 2026-09-25): MySQL star schema (dim_organization/agent/category + fact_ticket_daily), incremental Node + SQL ETL on node-cron, dashboard reads from it. Also built: refresh tokens, tenancy guard, macros, SLAs, search, KB, enquiries, attachments, ~155 Playwright E2E tests in GitHub Actions CI. No Docker, no real-time. Repo: github.com/Jeeva1398/zenithDesk.
- **ZenithDesk chatbot** (companion repo): embeddable chat widget (React, Shadow DOM, Vite library build) with an Express backend, local LLM via Ollama, Zod-validated structured extraction with retry and rule-based fallback, and real ticket-API integration. Verified 2026-09-25: Groq primary + Ollama fallback, intent routing, KB-grounded answers, multi-org via widget key, enquiries, attachments, and ticket tracking via email + OTP are all built. No streaming, no tests. Repo: github.com/Jeeva1398/zenithDesk-chat.
- **E-commerce sales data pipeline** (Data Engineering): MySQL source, Python pipeline, Airflow orchestration, dbt models, local Postgres warehouse in Docker, Metabase dashboard. Show current build status honestly.
- **DevPilot** (planned): AI-powered backend engineering assistant (React, Node/Express, Python FastAPI, RAG). Show only as "Planned" if included at all.

**Data Engineering skill group (confirmed):** Python, Apache Airflow, dbt, ETL/ELT, SQL, Docker. Kept from the existing portfolio: Data Warehousing, PostgreSQL. Not listed as skills (unconfirmed): Metabase, dimensional modeling.

---

## Tech Stack (preferred)
- React + TypeScript (if appropriate)
- Three.js, React Three Fiber, Drei
- GSAP or Framer Motion
- Tailwind CSS

## Design Direction
Dark modern UI, glassmorphism, subtle gradients, neon/ambient lighting, depth and parallax, floating objects, smooth scrolling, micro-interactions, professional typography. Use 3D strategically; not every section should be 3D.
Suggested color language: one accent for the **application stack** (for example cyan/blue) and one for the **data stack** (for example violet/emerald), reused consistently across skills, projects, and architecture views so the two tracks read at a glance.

---

## Site Structure

**Navigation:** sticky, `Home | About | Skills | Experience | Projects | Architecture | Contact`, smooth scroll, becomes translucent/blurred on scroll.

### Hero
- Name, headline `MERN Full-Stack Developer | Backend Engineer | Data Engineer`, short intro (from existing content, extended to mention data work only if the owner confirms wording)
- CTAs: View Projects, Contact Me, Download Resume
- GitHub and LinkedIn links
- Interactive 3D element on the right that reacts subtly to mouse movement. Idea: a floating "system core" made of two linked clusters, an **app cluster** (API/server/DB nodes) and a **data cluster** (pipeline nodes flowing into a warehouse cube), with small data packets moving along the connecting lines.
- Optional role toggle ("Full-Stack" / "Data Engineering") that shifts the accent color and highlights the matching skills and projects. Default view shows both.

### About
3D cards, floating elements, scroll animations. Background, experience, interests, career focus, all from existing content. Include a short line on the move from application development toward data engineering only if it is supported by the owner's content.

### Skills
Animated 3D skill cards or a technology constellation (not a plain list). Groups (show only what exists in the portfolio or the confirmed list above):
- **Backend:** Node.js, Express.js, REST APIs, Authentication, API Development
- **Databases:** MongoDB, MySQL, PostgreSQL
- **Frontend:** React, JavaScript, HTML, CSS
- **Data Engineering:** see the confirmed list above
- **DevOps / Cloud:** Docker, AWS EC2, AWS S3, Azure, Linux, Nginx, GitHub Actions, CI/CD (confirmed)
- Also keep the existing TypeScript/Tailwind/Bootstrap (Frontend) and Tools & Collaboration items, and the Proven / Building status per group.

### Experience
Interactive timeline with company, position, duration, responsibilities, and technical contributions. Scroll-based animation, subtle 3D depth. Do not alter facts.

### Projects (main visual highlight)
Large interactive cards: name, description, technologies, GitHub link, live demo (if available), screenshots (if available). Add a filter: **All | MERN / Full-Stack | Data Engineering**, and a small status badge (Live / Completed / In progress / Planned).
Hover: slight tilt, image depth/parallax, subtle content animation, button micro-interactions. Keep effects restrained.
Data Engineering cards should show a mini pipeline strip (source, transform, warehouse, dashboard) instead of only a screenshot.

### Architecture (interactive 3D, two views with a toggle)
**View 1: Application architecture**
Client → React/Frontend → Node.js/Express → REST APIs → Authentication/Validation → MongoDB/PostgreSQL/MySQL → Cloud/Deployment.

**View 2: Data pipeline architecture**
Source systems (MySQL / app DB) → Extract (Python) → Orchestration (Airflow) → Staging in Postgres warehouse → Transformations (dbt) → Dimension and fact tables → BI dashboard (Metabase).

Nodes are interactive (hover/click shows what that layer does and which of the owner's projects uses it). Should show understanding of APIs, databases, auth, deployment, and data modeling/orchestration. Provide a static 2D diagram fallback for mobile and reduced motion.

### Resume
Download Resume button, experience summary, technical skills split into Application and Data tracks, education (only if available). Consider offering two resume downloads (Full-Stack and Data Engineering) only if the owner actually has both files; otherwise a single one.

### Contact
Email, LinkedIn, GitHub, contact form only if the existing portfolio has one. Subtle animated background.

### Global 3D Background
Lightweight and subtle: particles, grid, nodes with connecting lines, ambient light, parallax. Optional faint "data flow" pulses along the lines.

---

## Animation
Fade-in, slide-up, scale, parallax, 3D tilt, scroll-triggered, magnetic buttons, smooth page transitions. Subtle and professional; never at the cost of usability.

---

## Performance (critical)
- Lazy loading and code splitting (lazy-load the Canvas and 3D models)
- Optimized images (modern formats, correct sizes)
- Reduced particle count on mobile
- Intersection Observer for scroll animations; pause off-screen render loops
- GPU-friendly animations (transform/opacity); cap DPR, use `frameloop="demand"` where possible
- **Mobile / low-end fallback:** simplified 2D versions of expensive 3D sections (hero, architecture views, skills)
- Targets: fast initial load, excellent Lighthouse score, good Core Web Vitals, smooth ~60 FPS

## Responsive
Must work on desktop, laptop, tablet, and mobile. On mobile, simplify the 3D experience instead of shrinking large scenes.

## Accessibility, SEO, Quality
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), correct heading order
- Respect `prefers-reduced-motion` (disable or simplify motion and 3D animation)
- Keyboard navigable, visible focus states, good contrast, alt text, ARIA where needed
- SEO: title and meta description mentioning both MERN Full-Stack Developer and Data Engineer, Open Graph/Twitter tags, structured data (Person, with `knowsAbout` for both tracks), sitemap, robots, canonical URL
- Recruiter readability beats visual effects
- Avoid generic AI-template layouts; the site should feel custom-built

---

## Existing Portfolio Inventory (Step 0, done 2026-09-24)
- **Framework / deps:** Static site, `client/` only: React 19, Vite 8, Tailwind v4, Framer Motion, three + R3F + Drei, oxlint. No server of its own (removed 2026-09-25): the contact form posts to the ZenithDesk chat server's `POST /enquiries` (`client/src/lib/zenithdesk.js`), which files it as an enquiry, and the ZenithDesk chat widget is loaded on the page. Configured by `VITE_CHATBOT_URL` / `VITE_CHAT_WIDGET_KEY`.
- **Pages / sections:** single page. Old: Hero, About, Skills, Experience, Projects, Building (ZenithDesk). New: Hero, About, Skills, Experience, Projects, Architecture, Resume, Contact (Building merged into Projects).
- **Projects:** professional: EMR & Telehealth, CRM, E-commerce (Crackers) with Admin Panel (no public links). Personal: ZenithDesk, ZenithDesk chatbot, E-commerce sales data pipeline (all in progress).
- **Technologies listed:** see `skillGroups` in `client/src/data/content.js`.
- **Assets:** `client/public/Jeevaananthan-M-Resume.pdf`, `favicon.svg`. Photo is only `avatar-placeholder.svg` (not shown). No screenshots, no OG image.
- **Links:** GitHub github.com/Jeeva1398, LinkedIn linkedin.com/in/jeevaananthan-m, email jeevamp0799@gmail.com, phone +91 94888 16066. No live demo URLs.
- **Contact form present?:** yes (kept).
- **Education:** B.Com (Corporate Secretaryship), Hindustan College of Arts and Science, Coimbatore, 2015 – 2018.

## Open Questions / Missing Assets
- Profile photo (hero currently has none; the placeholder avatar was removed).
- Screenshots: ZenithDesk dashboard, chatbot widget, Metabase dashboard, Airflow DAG.
- Repo/demo for the pipeline (currently `null`, so buttons are hidden). ZenithDesk and chatbot repo links added 2026-09-25.
- Does the sales pipeline use data from the Crackers e-commerce project?
- Chatbot model wording: now "Groq-hosted models with a local Ollama fallback" (matches code). Confirm which provider production uses.
- PostgreSQL and Data Warehousing were kept from the old portfolio but not in the owner's confirmed list. Confirm or remove.
- Contact copy said "June/July 2026 cycle", which has passed; replaced with "Open to backend, full-stack, and data engineering roles". Confirm.
- Production domain + hosting (needed for canonical URL, og:url, og:image, sitemap.xml).
- Contact-form email delivery: handled by ZenithDesk's enquiry alert email (needs RESEND_API_KEY on the ZenithDesk main app and "Send new enquiries to" set in its Settings → Chatbot).
- Resume PDF: is it current? Is there a separate Data Engineering resume?

## Progress Log
- [x] Step 0: Inventory existing portfolio
- [x] Confirm Owner-Confirmed Additions and their status (DevPilot excluded)
- [x] Set up stack (R3F, Drei, Framer Motion, Tailwind, self-hosted fonts)
- [x] Layout, nav, global background
- [x] Hero (dual-track headline and 3D system core)
- [x] About, Skills (with Data Engineering group), Experience
- [x] Projects (with MERN / Data Engineering filter)
- [x] Architecture (application view and data pipeline view)
- [x] Resume, Contact
- [x] Mobile / reduced-motion fallbacks (2D hero + architecture; 3D only on capable desktops)
- [ ] Performance, accessibility, and SEO pass (Lighthouse). Head tags + JSON-LD + robots.txt done; canonical/sitemap/og:image wait on domain
- [ ] Add assets when provided (photo, screenshots, OG image), then wire contact email delivery
- [ ] Optional: role toggle ("Full-Stack" / "Data Engineering") in hero
