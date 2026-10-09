# Project Context: 3D Portfolio Redesign

## Goal
Redesign the existing personal developer portfolio into a modern, premium, interactive 3D portfolio that positions the owner as a **MERN Full-Stack / Backend Developer AND a Data Engineer**, suitable for recruiters and companies hiring for either track. Reimagine the whole UI/UX around the 3D concept. Do not just add a 3D background to the old site.

**Concept:** "A backend engineer's digital command center." Two control rooms in one: the **application stack** (MERN, APIs, auth, deployment) and the **data stack** (pipelines, warehouse, dashboards).
**Visual language:** 3D technology + backend architecture + data pipelines + cloud infrastructure + modern developer aesthetics. Professional first, flashy second.

Owner: Jeevaananthan M (goes by Jeeva)

**Headline positioning (use consistently in hero, meta tags, and resume section):**
`Full-Stack Engineer | AI Applications & Data Engineering`
(Owner changed it on 2026-10-02, after Eventa launched, from `MERN Full-Stack & Backend Developer | Building in Data Engineering`. Employer job titles in Experience stay "MERN Stack Developer". Do not change it unless the owner asks.)
Both tracks must be equally easy to find. A recruiter for either role should understand the fit within seconds.

## Decisions (owner-confirmed 2026-09-24)
- This file is the source of truth; it wins over `portfolio-context-architecture.md` when they disagree.
- Stay on **JavaScript (JSX)**, no TypeScript migration.
- **React Three Fiber + Drei** approved; they replaced the old plain-three `Scene3D.jsx`.
- Projects shown as **Live** (deployed to prod, owner-confirmed 2026-09-25): ZenithDesk (https://portal.zenithdesk.site/), ZenithDesk chatbot widget (embedded on this site via `chat.zenithdesk.site/widget.js` in `client/index.html`), E-commerce sales data pipeline (live dashboard https://jeeva-ecom-sales.streamlit.app/, repo github.com/Jeeva1398/E-Commerce-Sales; owner-confirmed 2026-09-30). **DevPilot is not shown.**
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
- **ZenithDesk** (MERN, presented as a **SaaS product**, owner request 2026-10-07; card domain 'SaaS product', no customer/user claims): multi-tenant support-ticket SaaS. Vite + React client, Express server, MySQL with Knex, JWT auth, agents/tickets/tags/views, super-admin endpoints, Zendesk-inspired agent dashboard, faker-seeded data. Multi-tenancy via `org_id` on tenant tables. Warehouse/ETL layer is built (verified in repo 2026-09-25): MySQL star schema (dim_organization/agent/category + fact_ticket_daily), incremental Node + SQL ETL on node-cron, dashboard reads from it. Also built: refresh tokens, tenancy guard, macros, SLAs, search, KB, enquiries, attachments, ~155 Playwright E2E tests in GitHub Actions CI. No Docker, no real-time. Repo: github.com/Jeeva1398/zenithDesk.
- **ZenithDesk chatbot** (companion repo, presented as part of the ZenithDesk SaaS, owner request 2026-10-07): embeddable chat widget (React, Shadow DOM, Vite library build) with an Express backend, local LLM via Ollama, Zod-validated structured extraction with retry and rule-based fallback, and real ticket-API integration. Verified 2026-09-25: Groq primary + Ollama fallback, intent routing, KB-grounded answers, multi-org via widget key, enquiries, attachments, and ticket tracking via email + OTP are all built. No streaming, no tests. Repo: github.com/Jeeva1398/zenithDesk-chat.
- **E-commerce sales data pipeline** (removed from the site by the owner on 2026-10-06; do not show it in Projects or Architecture) (Data Engineering, portfolio project, Live since 2026-09-30): MySQL source (Faker-seeded), Python extract via COPY into a Postgres raw schema, dbt staging/intermediate/marts star schema with tests. Local: Docker Compose with Airflow DAG + Metabase. Cloud: daily GitHub Actions workflow (throwaway MySQL service container) into Supabase Postgres, Streamlit dashboard on Streamlit Community Cloud, keep-awake job every 5h. Sample data only, no real users. Repo: github.com/Jeeva1398/E-Commerce-Sales.
- **Eventa** (open source, Live since 2026-10-02, owner-confirmed): offline AI CLI for Node.js/TypeScript (explain, review, deps) with its own QLoRA fine-tuned Qwen2.5-Coder-1.5B GGUF; published on npm (@jeeva1398/eventa), Hugging Face (jeeva1398/eventa-1.5b-gguf) and as a GitHub Action. Newly published, no user base. Repo: github.com/Jeeva1398/eventa.
- **TypeScript** added to the Backend skill group (owner-confirmed 2026-10-02; Eventa is written in TypeScript).
- **AI stack** (owner request 2026-10-02): third skill track `ai` (its pink accent was dropped in the 2026-10-09 redesign) with an AI Engineering group (status building; items are ones used in the chatbot or Eventa), an AI project filter, and chatbot + Eventa on track `ai` with alsoTrack `app`.
- **Phone number removed** from the portfolio (owner request 2026-10-02). Do not show it on the site.
- **Light/dark theme** (owner request 2026-10-02): `data-theme` on `<html>`, light mode swaps the colour tokens in `index.css`; hub materials per theme live in `three/HubScene.jsx`.
- **Freelance audience** (owner request 2026-10-06): the site speaks to recruiters AND freelance clients. Hero switch "Hiring for a role" / "Have a project" (`hooks/useAudience.js`, remembered per visitor, `?for=clients` opens the client view for freelance profiles) swaps hero pitch/CTAs, the nav button (Resume / Start a project), contact copy, and shows the service/timeline fields in the contact form (owner removed the Job/Freelance/Other topic picker 2026-10-06). New Services section (`services`, `engagement`, `proofPoints` in `content.js`); every service links to real projects. No rates, testimonials, or past freelance clients are shown, since none are confirmed.
- **DevPilot** (planned): AI-powered backend engineering assistant (React, Node/Express, Python FastAPI, RAG). Show only as "Planned" if included at all.

**Data Engineering skill group (confirmed):** Python, Apache Spark, PySpark (added 2026-09-28), dbt, ETL/ELT, SQL, Docker. Kept from the existing portfolio: Data Warehousing. PostgreSQL removed from the skill lists by the owner (2026-09-28). Apache Spark and PySpark are regular items (the "learning" tag was removed by the owner on 2026-10-06). Databricks, Azure Data Factory (ADF) and Azure Data Engineering added to the group (owner request 2026-10-06); ADLS Gen2 and Azure Synapse Analytics added and Apache Airflow removed from the skill lists, Services stack, JSON-LD and resume (owner request 2026-10-08). Hadoop, HDFS and Hive are regular items in the group (owner-confirmed 2026-10-02: already learned). Not listed as skills (unconfirmed): Metabase, dimensional modeling.

---

## Tech Stack (preferred)
- React + TypeScript (if appropriate)
- Three.js, React Three Fiber, Drei
- GSAP or Framer Motion
- Tailwind CSS

## Design Direction
**Redesigned 2026-10-09 (owner request: "looks AI generated, make it look man-made, keep 3D").** Follows the taste and redesign skills in `.claude/skills/`. Rules now in force:
- Geist + Geist Mono only. One neutral palette (tokens `bg / surface / raised / line / fg / muted / subtle` in `index.css`) and ONE accent, orange `--color-accent` (matches the LinkedIn banner). No per-track colours, gradients, glows, glassmorphism, particle/grid backgrounds, cursor spotlight, or marquees. Tracks are told apart by labels, not colour.
- No numbered/mono eyebrows above section headings, no em/en dashes in visible copy, no pill clouds; each section uses a different layout. Radius rule: controls 6px, panels 12px, images 8px. Icons: Phosphor only (`components/Icons.jsx`).
- 3D is used only where it explains something: hero = R3F isometric hub (`three/HubScene.jsx`, replaced the server rack 2026-10-09, modelled on Vedant Hegde's Dribbble shots "3D Animation Exploration" and "3D Animation For Finx.io"): a core puck with three plates lands with a bounce, the Application / AI / Data cards and real tech-logo tiles (Simple Icons, monochrome; `stackUnits.tools` in `content.js`, logo map + shared layout in `three/toolIcons.js`) pop in, cables grow out of the core, and an accent segment flows tools -> core -> active layer. Clay materials, soft VSM shadows, no bloom. CSS 3D fallback `three/HubFallback.jsx` (phones, low power, reduced motion, loading); Architecture = CSS 3D exploded isometric layer stack that spreads on scroll; project screenshots stand up from a tilt as they scroll in.
- (Superseded: the old glassmorphism / neon / cyan-violet-pink track colours.)
- Motion pass (owner request 2026-10-09: "looks like so much content only, add effects and motion"), helpers in `components/Motion.jsx`: headings rise word by word out of a mask (`RevealWords`, also used by `SectionHeading`), lists stagger in with self-drawing accent dashes (`Stagger` / `StaggerItem` / `Dash`), the Services process line draws down with step dots, the Experience timeline has an accent rail that fills on scroll, project screenshots drift inside their frame and zoom slightly on hover, and a 2px accent scroll-progress bar runs along the top. All transform/opacity only; `MotionConfig reducedMotion="user"` in `Layout.jsx` covers reduced motion.
- Depth pass (owner request 2026-10-09: "only content paragraphs, light mode looks wording-only, add 3D and motion"): elevation tokens `--shadow-panel` / `--shadow-lift` (tinted, per theme) on `.panel`; light palette deepened (bg `#f1f1f3`, darker rack aluminium, iso stage sits in a `raised` well). New helpers in `Motion.jsx`: `Tilt` (mouse-only pointer tilt, flat on touch / reduced motion) and `Rise3D` (cards stand up from a tilt on scroll-in). Hero copy and hub separate in depth on scroll-out; Services is a sticky 3D card stack (desktop only); Skills tracks are tilt panels with Phosphor icon tiles; About facts are raised tiles; project screenshots and the architecture stage tilt with the pointer; Experience, Resume and the contact form use `Rise3D`.

---

## Site Structure

**Navigation:** sticky, `About | Services | Skills | Experience | Projects | Architecture | Contact` (logo goes home), smooth scroll, becomes translucent/blurred on scroll.

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
- **DevOps / Cloud:** Docker, AWS EC2, AWS S3, Azure, Linux, Nginx, GitHub Actions (confirmed; CI/CD removed from skill lists by the owner 2026-09-28). Group status changed from Building to Proven by the owner 2026-10-06. GitHub Actions is shown under Tools & Collaboration (Proven) since 2026-09-30, because ZenithDesk CI and the sales pipeline both run on it
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
Removed in the 2026-10-09 redesign: the page background is a flat token colour with a faint film-grain overlay (`.grain`).

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
- **Projects:** professional: EMR & Telehealth (Pentabay Softwares), CRM and E-commerce (Crackers) with Admin Panel (both Faces Sync), owner-confirmed 2026-09-30; no public links. Card dates come from the matching `experience` entry. The E-commerce feature list no longer repeats the CRM's CSV-upload / invoice bullets (they were copied from the CRM). Personal: ZenithDesk, ZenithDesk chatbot, E-commerce sales data pipeline (all in progress).
- **Technologies listed:** see `skillGroups` in `client/src/data/content.js`.
- **Assets:** `client/public/Jeevaananthan-M-Resume.pdf`, `favicon.svg`, `og-image.jpg` (1200x630, from the hero). Profile photo `client/src/assets/profile.webp` (source `profile.png`, transparent background) shown in the hero and About. Screenshots: `client/src/assets/projects/sales-dashboard.webp` (live Streamlit dashboard, on the card), plus `sales-airflow-dag.webp` and `sales-metabase.webp` in the pipeline's `gallery` (details view only). Full-size originals live in the E-Commerce-Sales repo under `docs/screenshots/`. ZenithDesk shots `zenithdesk-dashboard.webp` / `zenithdesk-tickets.webp` are dark mode (2026-10-09), taken from a local ZenithDesk instance on a separate `zenithdesk_showcase` database seeded with ~900 demo tickets over 4 months for a fictional org (demo data, not real customers).
- **Links:** GitHub github.com/Jeeva1398, LinkedIn linkedin.com/in/jeevaananthan-m, email jeevamp0799@gmail.com, phone +91 94888 16066. Production domain: https://iamjeeva.in/ (canonical, og:url, sitemap.xml set).
- **Contact form present?:** yes (kept).
- **Education:** B.Com (Corporate Secretaryship), Hindustan College of Arts and Science, Coimbatore, 2015 – 2018.

## Open Questions / Missing Assets
- Screenshots still missing: ZenithDesk dashboard, chatbot widget (the sales pipeline has Streamlit, Airflow and Metabase).
- Pipeline repo + live demo links added 2026-09-30. ZenithDesk and chatbot repo links added 2026-09-25.
- Does the sales pipeline use data from the Crackers e-commerce project?
- Chatbot model wording: now "Groq-hosted models with a local Ollama fallback" (matches code). Confirm which provider production uses.
- PostgreSQL and Data Warehousing were kept from the old portfolio but not in the owner's confirmed list. Confirm or remove.
- Contact copy said "June/July 2026 cycle", which has passed; replaced with "Open to backend, full-stack, and data engineering roles". Confirm.
- Contact-form email delivery: handled by ZenithDesk's enquiry alert email (needs RESEND_API_KEY on the ZenithDesk main app and "Send new enquiries to" set in its Settings → Chatbot).
- Freelance: confirm the availability line ("Taking on freelance projects · remote, IST"), the 4-step engagement process, and whether to show rates, a booking link, or freelance platform profiles (Upwork etc.).
- Resume PDF: built from `~/Documents/resume-build.js` (docx package, converted to PDF with Word). Sales pipeline project and its summary mention removed 2026-10-06. Still open: Pentabay and Faces Sync have identical bullets, and the PDF still shows the phone number that was removed from the site.

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
- [ ] Performance, accessibility, and SEO pass (Lighthouse). Head tags, JSON-LD, robots.txt, canonical, sitemap and og:image done
- [ ] Add remaining screenshots when provided, then wire contact email delivery (photo, OG image and dashboard screenshot done 2026-09-30)
- [x] Redesign to a hand-made look (2026-10-09): Geist, single accent, rack hero, iso architecture
- [ ] Optional: role toggle ("Full-Stack" / "Data Engineering") in hero
