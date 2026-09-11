# Portfolio — Context & Architecture

This document defines the content architecture and information structure for Jeevaananthan M's ("Jeeva") developer portfolio. It's meant to be the single source of truth to hand to an AI tool, a designer, or yourself when actually building the site — so all the "what goes where and why" thinking is done up front.

---

## 1. Who this is for (audience & goal)

- **Primary audience:** Hiring managers / recruiters at MNC and product companies evaluating a mid-level backend/full-stack developer.
- **Secondary audience:** Recruiters evaluating readiness for **backend + DevOps** roles AND recruiters evaluating readiness for **data engineering** roles — the portfolio needs to speak to both without reading as unfocused.
- **Primary goal:** Land interviews for the June/July 2026 cycle, salary band ₹8–12 LPA.
- **Tone:** Credible, execution-focused, not flashy. Show real production experience (healthcare/CRM/e-commerce) plus visible momentum toward backend/DevOps *and* data engineering skills.

> Positioning note: backend/DevOps and data engineering are related but distinct tracks. Rather than picking one, the recommended framing is **"Backend Developer building toward Data Engineering"** — your Node/MongoDB/API foundation is the base, DevOps (Docker, CI/CD, AWS) is the deployment layer, and the ETL/warehouse/orchestration work on your SaaS projects is the data layer on top. This lets one portfolio serve applications to either kind of role instead of needing two.

> Assumption to confirm: is this portfolio meant to go live before the interview cycle starts, or is it a living document you'll keep updating as ZenithDesk progresses? This affects whether "in progress" projects are shown.

---

## 2. Identity block (Hero / About)

| Field | Value |
|---|---|
| Name | Jeevaananthan M ("Jeeva") |
| Title | MERN Stack Developer *(consider: "Backend Developer \| Building toward Data Engineering & DevOps" to signal the transition)* |
| Experience | ~3 years |
| Location | Chennai / Coimbatore, Tamil Nadu, India |
| Core stack | Node.js, Express.js, React.js, MongoDB, REST APIs |
| Domain experience | Healthcare (EMR/telehealth), CRM, E-commerce |

**Placeholders you'll need to supply:** professional email, phone/LinkedIn/GitHub URLs, a headshot, and a 2–3 line personal summary/pitch.

---

## 3. Site sections (information architecture)

```
Home / Hero
 ├─ Name, title, one-line pitch
 ├─ CTA: View Projects / Download Resume / Contact
 └─ Short "currently learning/building" line (backend + DevOps signal)

About
 ├─ Background summary (2.5 yrs MERN, Pentabay)
 ├─ Domain exposure: healthcare, CRM, e-commerce
 └─ Career direction: backend developer building toward data engineering, with DevOps as the deployment layer connecting the two

Skills
 ├─ Core (proven): Node.js, Express.js, React.js, MongoDB, REST APIs
 ├─ DevOps (gap-closing): Docker, GitHub Actions, AWS EC2, CI/CD
 ├─ Data Engineering (gap-closing): ETL pipelines, data warehousing, orchestration, PostgreSQL, SQL
 ├─ Also in progress: TypeScript, JWT/OAuth, GraphQL
 └─ Optional: group as "Languages / Backend / Data Engineering / DevOps / Databases" rather than one flat list — separating tracks makes the dual positioning legible at a glance

Experience
 └─ Pentabay Softwares — role, dates, responsibilities, notable outcomes
     (needs: exact title, dates, 2–3 bullet achievements)

Projects  ← this is the section that will do the most work
 ├─ ZenithDesk (flagship, in-progress)
 ├─ Any completed client/work projects from Pentabay (healthcare/CRM/e-commerce)
 └─ Smaller SaaS builds if completed (invoice tracker, subscription tracker, etc.)

Contact
 └─ Email, LinkedIn, GitHub, optional resume download
```

---

## 4. Featured project deep-dive: ZenithDesk

This is your strongest differentiator right now — a real, in-progress, architected SaaS build. Worth its own detailed project page, not just a card.

**Suggested project page structure:**

1. **Problem/pitch** — customer support ticketing SaaS with an AI chatbot widget for ticket creation
2. **Architecture highlights** (things you've already decided — great portfolio material):
   - Shared-database, shared-schema multi-tenancy (`org_id` scoping)
   - Role model: org-level admins (direct agent creation, no invite flow) + platform-level Super Admin across all tenants
   - Chatbot widget built as a **separate** project/repo from the main app (SLM-based, ticket creation via chat)
   - Stack: React + Node + MySQL
   - **Data layer (this is the section that speaks to data engineering recruiters):** if/when you add the ETL/warehouse/orchestration layer on top of ZenithDesk's operational data (e.g. ticket volume trends, SLA reporting, agent performance dashboards), document it explicitly as its own subsection — this is the single most convincing artifact you can show a data engineering recruiter, since it's a real pipeline built on real application data rather than a toy dataset
3. **Development process note** — built in explicit phases (setup → schema → API → …) with a commit per phase; worth mentioning as evidence of disciplined engineering practice, not just "vibe coded"
4. **Status** — be honest that it's in progress; recruiters respond well to "here's the architecture and current build state" over a fake "done" badge
5. **Links** — repo(s), live demo if deployed, domain if public

> Note: since this project isn't finished, decide whether it appears under "Projects" or a separate "Currently Building" section — the latter is often more credible than quietly listing an unfinished project as complete.

---

## 5. Content gaps to fill before building

These are things this file can't infer from what's known so far — you'll need to supply them:

- [ ] Contact details (email, phone, LinkedIn, GitHub links)
- [ ] Exact job title and dates at Pentabay
- [ ] 2–3 concrete achievement bullets per role (metrics if possible: e.g. "reduced X by Y%")
- [ ] Any completed/deployable projects besides ZenithDesk (even client work, anonymized if needed)
- [ ] Resume file (PDF) to link/download
- [ ] Headshot or avatar image
- [ ] Decision: single-page scroll vs multi-page site

---

## 6. Build notes (tech choices for the portfolio site itself)

- Natural fit given your stack: **React** frontend, optionally static-only (no backend needed for a portfolio) or a lightweight Node/Express backend if you want a working contact form or dynamic project data.
- If you want the portfolio itself to double as a DevOps skill signal: deploy it via GitHub Actions → a cloud host (ties into your Oracle Cloud Free Tier / AWS EC2 learning) rather than just Vercel/Netlify — small thing, but consistent with the backend/DevOps narrative you're building.
