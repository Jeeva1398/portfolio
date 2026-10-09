import zenithdeskDashboard from '../assets/projects/zenithdesk-dashboard.webp'
import zenithdeskTickets from '../assets/projects/zenithdesk-tickets.webp'
import chatbotEmbedded from '../assets/projects/chatbot-embedded.webp'
import chatbotWidget from '../assets/projects/chatbot-widget.webp'
import eventaCard from '../assets/projects/eventa-card.webp'
import eventaExplain from '../assets/projects/eventa-explain.webp'
import eventaReview from '../assets/projects/eventa-review.webp'

export const profile = {
  name: 'Jeevaananthan M',
  shortName: 'Jeeva',
  role: 'Full-Stack Engineer',
  headline: 'Full-Stack Engineer | AI Applications & Data Engineering',
  positioning: 'Full-Stack Engineer - AI applications & data engineering',
  location: 'Chennai / Coimbatore, Tamil Nadu, India',
  email: 'jeevamp0799@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jeevaananthan-m/',
  github: 'https://github.com/Jeeva1398',
  resumeFile: 'Jeevaananthan-M-Resume.pdf',
  pitch:
    "I'm a full-stack engineer with about 3 years of experience building and shipping production MERN applications across healthcare, CRM, and e-commerce. On that backend foundation I build AI features - a multi-org support chatbot and Eventa, an offline AI developer tool with its own fine-tuned model - and data pipelines with Python, Airflow, and dbt.",
  currentlyBuildingTeaser:
    'Now live: ZenithDesk with its AI chatbot, and Eventa on npm.',
  coreStack: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'REST APIs'],
  domainExperience: ['Healthcare (EMR/Telehealth)', 'CRM', 'E-commerce'],
}

export const about = {
  summary:
    "I'm a full-stack developer working primarily in the MERN stack, with close to 3 years split across two product teams in Chennai. Most of that work has been backend-leaning: designing REST APIs, shaping MongoDB schemas, and getting features from local development through to a deployed server.",
  domainParagraph:
    "That work has landed me in three different domains - a healthcare EMR/telehealth platform, a CRM with role-based lead management, and an e-commerce platform with an admin panel - so I've had to adapt to different data models and compliance/business constraints rather than build the same CRUD app three times.",
  direction:
    "I'm now building toward two related but distinct tracks: DevOps (Docker, CI/CD, AWS) as the deployment layer on top of my backend work, and data engineering (ETL, warehousing, orchestration) as a data layer on top of the applications I already build. ZenithDesk, now live in production, is where both of those show up in practice.",
  pivotNote:
    "Before engineering, I spent 2020-2021 as a Medical Billing Specialist at KMCH, Coimbatore - hands-on exposure to healthcare operations and insurance workflows that now shapes how I think about the EMR/telehealth systems I build as a developer.",
  currently:
    'MERN Stack Developer at Pentabay Softwares, Chennai - designing REST APIs, Express middleware, and MongoDB schemas, and owning deployment for production releases.',
  education: {
    institution: 'Hindustan College of Arts and Science, Coimbatore',
    degree: 'Bachelor of Commerce (Corporate Secretaryship)',
    years: '2015-2018',
  },
}

// Copy for the two audiences the site speaks to: recruiters ('hiring') and freelance clients ('client').
export const audiences = {
  hiring: {
    label: 'Hiring for a role',
    short: 'Hiring',
    availability: 'Open to full-time full-stack, AI, and data engineering roles',
    pitch: profile.pitch,
    contactIntro: 'Open to full-stack, AI, and data engineering roles. Reach out directly or use the form.',
    // hero line: kept under 20 words so the hero fits one screen
    intro: 'About 3 years shipping MERN products in healthcare, CRM and e-commerce. Now building AI features and data pipelines on top.',
  },
  client: {
    label: 'Have a project',
    short: 'Project',
    availability: 'Taking on freelance projects · remote, IST (UTC+5:30)',
    pitch:
      'I build web apps, APIs, AI chatbots, and data dashboards for teams that need them to work in production - not just in a demo. About 3 years of shipping MERN products in healthcare, CRM, and e-commerce, plus my own live SaaS, AI chatbot, and open-source AI tool you can try right now.',
    contactIntro:
      "Tell me what you want to build, who it is for, and when you need it. I'll reply with questions or a clear next step.",
    intro: 'Web apps, APIs, AI chatbots and data dashboards, built to run in production. Three live products you can open today.',
  },
}

// The three units of the hero rack, top to bottom. Each line only names skills listed in skillGroups.
// The hero hub scene: one card per layer, and `tools` become logo tiles wired into the core.
// Tool names must have a logo in `three/toolIcons.js` (Simple Icons); dbt has none, so it is not a tile.
export const stackUnits = [
  {
    id: 'app',
    label: 'Application',
    detail: 'React, Node.js, Express, MongoDB, MySQL',
    tools: ['React', 'Node.js', 'Express', 'TypeScript', 'MongoDB', 'MySQL'],
  },
  {
    id: 'ai',
    label: 'AI',
    detail: 'LLM features, a fine-tuned code model, local inference',
    tools: ['Ollama', 'Hugging Face'],
  },
  {
    id: 'data',
    label: 'Data',
    detail: 'Python, SQL, dbt, Spark, warehousing',
    tools: ['Python', 'Apache Spark', 'Databricks', 'Docker'],
  },
]

// Freelance services. `proof` names project slugs from `projects` below, so every claim links to real work.
export const services = [
  {
    id: 'webapps',
    track: 'app',
    title: 'Full-stack web apps & SaaS',
    summary: 'From an idea or a spec to a deployed React + Node product with accounts, roles, and an admin panel.',
    deliverables: [
      'React front-end, Express API, and database design',
      'Sign-in, user roles, and admin / back-office screens',
      'Multi-tenant SaaS foundations (one app, many customer orgs)',
      'Deployed to your server or cloud, with environment setup',
    ],
    stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'MySQL'],
    proof: ['zenithdesk', 'emr-telehealth', 'ecommerce'],
  },
  {
    id: 'backend',
    track: 'app',
    title: 'Backend & REST APIs',
    summary: 'APIs that a front-end or mobile team can build on: validated, secured, documented by tests.',
    deliverables: [
      'REST API design and implementation',
      'JWT auth, refresh tokens, and role-based access control',
      'Schema design, indexing, and slow-query fixes',
      'Automated end-to-end tests run in GitHub Actions CI',
    ],
    stack: ['Node.js', 'TypeScript', 'Express.js', 'JWT', 'Playwright'],
    proof: ['zenithdesk', 'crm'],
  },
  {
    id: 'ai',
    track: 'ai',
    title: 'AI chatbots & LLM features',
    summary: 'Assistants that answer from your own content and hand off to real workflows - tickets, leads, and status checks.',
    deliverables: [
      'Embeddable chat widget for any website (one script tag)',
      'Answers grounded in your knowledge base, with sources',
      'Structured extraction into your systems (tickets, enquiries)',
      'Hosted LLMs (Groq) or fully local / offline models',
    ],
    stack: ['React', 'Express.js', 'Groq', 'Ollama', 'Zod'],
    proof: ['zenithdesk-chatbot', 'eventa'],
  },
  {
    id: 'data',
    track: 'data',
    title: 'Data pipelines & dashboards',
    summary: 'Get reporting off your live database: scheduled ETL into a warehouse, and dashboards that read from it.',
    deliverables: [
      'Extract and load jobs from your app database',
      'Star-schema warehouse (dimension and fact tables)',
      'Scheduled, incremental loads',
      'Analytics dashboards on top of the modelled data',
    ],
    stack: ['Python', 'SQL', 'dbt', 'MySQL'],
    proof: ['zenithdesk'],
  },
]

// How a freelance engagement runs, step by step.
export const engagement = [
  { step: 'Discuss', text: 'A short call or email thread about the problem, users, and deadline.' },
  { step: 'Scope', text: 'A written scope with milestones, so you know what ships when.' },
  { step: 'Build', text: 'Work in milestones with a working demo at each one - not a big reveal at the end.' },
  { step: 'Launch', text: 'Deployment, handover of code and credentials, and a walkthrough of how it runs.' },
]

// Reasons to hire, each backed by something verifiable on this site.
export const proofPoints = [
  { value: '~3 yrs', label: 'shipping production MERN apps for two product teams' },
  { value: '3', label: 'live products you can open today - SaaS, AI chatbot, AI CLI' },
  { value: '~155', label: 'automated end-to-end tests in CI on ZenithDesk' },
  { value: '3', label: 'domains: healthcare, CRM, and e-commerce' },
]

// track: 'app' (application stack), 'data' (data stack), 'ai' (AI stack), or 'tools'
export const skillGroups = [
  {
    title: 'Backend',
    track: 'app',
    status: 'proven',
    items: [
      'Node.js',
      'TypeScript',
      'Express.js',
      'RESTful API Design',
      'Middleware Development',
      'JWT & OAuth-based Authentication',
      'Role-Based Access Control (RBAC)',
    ],
  },
  {
    title: 'Databases',
    track: 'app',
    status: 'proven',
    items: ['MongoDB', 'MySQL', 'SQL Query Writing', 'Schema Design', 'Query & Indexing Optimization'],
  },
  {
    title: 'Frontend',
    track: 'app',
    status: 'proven',
    items: ['HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'React.js'],
  },
  {
    title: 'Data Engineering',
    track: 'data',
    status: 'building',
    items: [
      'Python',
      'Apache Spark',
      'PySpark',
      'Databricks',
      'Azure Data Factory (ADF)',
      'Azure Data Engineering',
      'Azure Data Lake Storage Gen2 (ADLS)',
      'Azure Synapse Analytics',
      'dbt',
      'ETL / ELT Pipelines',
      'Data Warehousing',
      'SQL for Analytics',
      'Docker',
      'Hadoop',
      'HDFS',
      'Hive',
    ],
  },
  {
    title: 'AI Engineering',
    track: 'ai',
    status: 'building',
    // each item is used in the chatbot or Eventa
    items: [
      'LLM Integration (Groq, Ollama)',
      'LLM Fine-tuning (QLoRA, Unsloth)',
      'Prompt Design',
      'Structured Output (Zod)',
      'Knowledge-Base Retrieval (BM25)',
      'Local Inference (llama.cpp, GGUF)',
      'Model Evaluation',
      'Hugging Face',
    ],
  },
  {
    title: 'DevOps & Cloud',
    track: 'app',
    status: 'proven',
    items: [
      'Docker',
      'AWS EC2',
      'AWS S3',
      'Azure',
      'Linux Server Administration',
      'Nginx',
      'Environment Configuration',
    ],
  },
  {
    title: 'Tools & Collaboration',
    track: 'tools',
    status: 'proven',
    // GitHub Actions sits here, not under DevOps (building): it runs CI for ZenithDesk
    items: ['Git', 'GitHub', 'GitHub Actions', 'VS Code', 'Postman', 'ClickUp', 'Slack'],
  },
]

export const experience = [
  {
    company: 'Pentabay Softwares',
    role: 'MERN Stack Developer',
    location: 'Chennai',
    start: 'May 2025',
    end: 'Present',
    bullets: [
      'Design and build RESTful APIs and Express middleware - request validation, error handling, and auth - powering production MERN applications.',
      'Model and optimize MongoDB schemas with Mongoose, adding indexing strategies to keep query performance stable as data grows.',
      'Build reusable, stateful React interfaces with hooks and the Context API, with React Router driving multi-view navigation.',
      'Own deployment: build processes, environment configuration, and server setup for production releases.',
    ],
  },
  {
    company: 'Faces Sync',
    role: 'MERN Stack Developer',
    location: 'Chennai',
    start: 'Oct 2023',
    end: 'May 2025',
    bullets: [
      'Delivered responsive, cross-browser React front-ends integrated against Node/Express REST APIs.',
      'Built and maintained CRUD APIs and middleware for request validation and error handling.',
      'Managed MongoDB data models via Mongoose - schema design, validation, and day-to-day data operations.',
      'Worked across the full release cycle, from local development through environment configuration and deployment.',
    ],
  },
]

// kind: 'professional' (client/employer work) or 'personal' (own products and open source)
// track: 'app', 'data' or 'ai' - drives the Projects filter and accent colour
// status: 'In progress' | 'Completed' | 'Live' | 'Planned' (personal projects only)
export const projects = [
  {
    slug: 'zenithdesk',
    kind: 'personal',
    track: 'app',
    status: 'Live',
    featured: true,
    // Also listed under the Data Engineering filter: it ships a real warehouse + ETL layer.
    alsoTrack: 'data',
    name: 'ZenithDesk',
    tagline: 'Multi-tenant customer support SaaS - agent portal, customer portal, knowledge base, and a warehouse-backed analytics dashboard',
    domain: 'SaaS product',
    stack: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MySQL', 'Knex', 'JWT', 'Playwright', 'GitHub Actions'],
    highlights: [
      'Tenancy guard on every query',
      'Star-schema warehouse + incremental ETL',
      'Chatbot customised per org from the portal',
    ],
    details: [
      {
        heading: 'Stack',
        text: 'React 19 + Vite + Tailwind client, Express 5 API, MySQL with Knex (22 migrations), JWT auth, Resend for transactional email, and a Playwright end-to-end suite run by GitHub Actions.',
      },
      {
        heading: 'Multi-tenancy',
        text: 'Shared-database, shared-schema multi-tenancy by org_id. All tenant queries go through a forOrg() scoping helper, and a fail-closed tenancy guard checks every SQL statement at the connection layer - hand-written org_id clauses in services went from 58 to 0.',
      },
      {
        heading: 'Auth & security',
        list: [
          'Typed JWTs (agent, customer, super-admin, service) so a token of one type can never act as another',
          'Short-lived access tokens with rotating refresh tokens, stored hashed, with reuse detection that revokes the whole family',
          'Customer sign-in by email + OTP (hashed, expiring, attempt-limited codes)',
          'Scoped service tokens for the chatbot, limited to ticket, attachment, knowledge-search, and enquiry routes',
          'Helmet, CORS allowlist, per-route rate limits keyed per end user, and startup config validation',
        ],
      },
      {
        heading: 'Product features',
        list: [
          'Tickets with comments, filters, pagination, and attachments (file type checked by signature)',
          'Saved views, macros (one-click bundles of ticket edits), and per-priority SLA targets with at-risk badges',
          'Global search across tickets and customers',
          'Customer self-service portal to raise and follow tickets',
          'Knowledge base with a custom per-org BM25 search that the chatbot answers from',
          'Enquiries (lead capture) from the chatbot, with email alerts',
          'Per-org chat widget settings - theme, home screen, allowed domains, bot purposes - with a live preview',
          'Org admins and agents, plus platform-level super-admin API endpoints across tenants',
        ],
      },
      {
        heading: 'Data layer',
        text: 'A separate MySQL warehouse schema in a star layout - dim_organization, dim_agent, dim_category, and a fact_ticket_daily table (tickets created/resolved, average first-response and resolution hours). A hand-written Node + SQL ETL loads it incrementally from a watermark, rebuilding only affected org-day partitions, on a node-cron schedule with overlap protection. The dashboard reads trends and breakdowns from the warehouse, not the operational tables.',
      },
      {
        heading: 'Testing & CI',
        text: 'About 155 Playwright tests (API and UI) covering auth boundaries, tenancy isolation, rate limits, SLAs, macros, search, the ETL scheduler, and chatbot integrations. Each run builds its own schema; GitHub Actions runs lint, client build, and the full suite against MySQL 8 on every push.',
      },
      {
        heading: 'Deployment',
        text: 'Deployed to production at portal.zenithdesk.site, with the API on api.zenithdesk.site and a landing page at zenithdesk.site.',
      },
    ],
    image: { src: zenithdeskDashboard, alt: 'ZenithDesk agent dashboard: tickets created and resolved, average first response and resolution time, a created-vs-resolved trend chart, and breakdowns by priority, category, and agent' },
    gallery: [
      {
        src: zenithdeskTickets,
        width: 1440,
        height: 900,
        alt: 'ZenithDesk tickets page: quick views, status totals, filters, and a ticket table with status, priority, SLA, and assignee',
        caption: 'Agent portal - tickets with status, priority, SLA badges, and assignees (seeded demo data)',
      },
    ],
    links: { repo: 'https://github.com/Jeeva1398/zenithDesk', demo: 'https://portal.zenithdesk.site/' },
  },
  {
    slug: 'zenithdesk-chatbot',
    kind: 'personal',
    track: 'ai',
    alsoTrack: 'app',
    status: 'Live',
    name: 'ZenithDesk Chatbot Widget',
    tagline: 'Multi-org AI support widget - answers from the knowledge base, raises tickets and enquiries, and lets customers track tickets',
    domain: 'AI · Part of the ZenithDesk SaaS',
    stack: ['React', 'Shadow DOM', 'Vite (library build)', 'Express.js', 'Groq', 'Ollama', 'Zod', 'SQLite'],
    highlights: ['GPT-OSS 20B & 120B on Groq, Qwen 2.5 fallback', 'Grounded knowledge-base answers', 'Ticket tracking via email + OTP'],
    details: [
      {
        heading: 'Widget',
        text: 'A separate repo from the main app. A React widget rendered inside a Shadow DOM so its styles never collide with the host page, built as a single Vite IIFE bundle and embedded with one script tag and a widget key. Theme, home screen, and topic chips come from each org’s settings in ZenithDesk. It supports quick replies, file attachments, per-message ratings, past conversations, and resumes the conversation after a reload.',
      },
      {
        heading: 'Multi-org',
        text: 'One chatbot deployment serves every org. The widget key identifies the org, the request origin must be on that org’s allowed-sites list, and each org chooses what its bot does - support tickets, enquiries, knowledge answers, and/or ticket status.',
      },
      {
        heading: 'Model layer',
        list: [
          'Provider abstraction: GPT-OSS 20B on Groq for intent and extraction, GPT-OSS 120B for knowledge-base answers, and a local Qwen 2.5 (1.5B) model on Ollama as the fallback (Groq is skipped while rate-limited)',
          'Intent routing (create ticket, check status, ask a question, enquiry) with a keyword pass first, validated with Zod',
          'Zod-validated structured ticket extraction - category, priority, summary, missing fields - with a retry and a rule-based fallback',
          'Knowledge-base answers grounded in the org’s articles: the answer must quote evidence, lists its sources, and escalates to a ticket if it does not help',
        ],
      },
      {
        heading: 'Ticket tracking',
        text: 'Customers verify with email + a 6-digit OTP through ZenithDesk’s customer-auth API, then list their tickets and open one by #id. The end user’s IP is forwarded so the main app rate-limits per person, not per chatbot server.',
      },
      {
        heading: 'Integration & security',
        text: 'Creates real tickets, enquiries, and attachments through the ZenithDesk API with a scoped service token. Conversations live in SQLite (WAL). The server has per-IP rate limits, helmet headers, a CORS allowlist, file-signature checks on uploads, and refuses to start on invalid config.',
      },
      {
        heading: 'Deployment',
        text: 'Deployed to production at chat.zenithdesk.site and embedded on zenithdesk.site and on this portfolio. The chat bubble on this page is the live widget.',
      },
    ],
    image: { src: chatbotEmbedded, alt: 'The ZenithDesk chat widget open on the zenithdesk.site landing page: a How can we help? home screen with a message box and a Make an enquiry option' },
    gallery: [
      {
        src: chatbotWidget,
        width: 394,
        height: 744,
        alt: 'Close-up of the ZenithDesk chat widget home screen with Home and Messages tabs',
        caption: 'The widget home screen - theme and options come from the org’s settings in ZenithDesk',
      },
    ],
    links: { repo: 'https://github.com/Jeeva1398/zenithDesk-chat', demo: 'https://zenithdesk.site/' },
  },
  {
    slug: 'eventa',
    kind: 'personal',
    track: 'ai',
    alsoTrack: 'app',
    status: 'Live',
    name: 'Eventa',
    tagline: 'Offline AI assistant for Node.js & TypeScript - explains crashes, reviews git diffs and pull requests, and audits npm dependencies with a fine-tuned 1 GB model',
    domain: 'AI developer tool · Open source',
    stack: ['TypeScript', 'Node.js', 'node-llama-cpp', 'Ollama', 'Qwen2.5-Coder', 'Unsloth QLoRA', 'Vitest', 'GitHub Actions'],
    highlights: [
      'Own fine-tuned model: 100% review precision vs 48% for the base model',
      'Runs fully offline, no API key',
      'Published on npm, Hugging Face, and as a GitHub Action',
    ],
    details: [
      {
        heading: 'What it does',
        list: [
          'explain - parses Node stack traces and TypeScript tsc errors, reads the failing lines from the project, and answers with cause, fix, and prevention (Node, Express, NestJS, and Prisma error codes)',
          'review - reviews the staged git diff file by file; deterministic static checks (missing await, SQL/command injection, sync fs, empty catch, disabled TLS, hard-coded secrets) guide the model, which confirms or dismisses them',
          'deps - runs npm audit and npm outdated and scans imports for unused or missing packages, then prints a deterministic action plan with exact fix commands and verified breaking-change notes',
        ],
      },
      {
        heading: 'The model',
        text: 'eventa-1.5b is a QLoRA fine-tune of Qwen2.5-Coder-1.5B-Instruct (Unsloth, trained on a free Kaggle T4 GPU), quantized to a 986 MB GGUF. The dataset (about 740 examples) is generated by a TypeScript builder from small programs that really crash, so training inputs go through the same stack-trace parser and prompts the CLI uses. Diffs are annotated before/after scenarios, half of them clean so the model learns to say "No issues found." Four training rounds.',
      },
      {
        heading: 'Evaluation',
        text: 'On 54 held-out examples from scenarios never seen in training, against the base model: review precision 100% vs 48%, clean diffs correctly passed 100% vs 0%, no invented versions in dependency advice 100% vs 93%, and about 2x faster answers on CPU (5.9 s vs 13.6 s). Explanations of error types it has never seen are slightly weaker than the base model, which is the focus of the next data round.',
      },
      {
        heading: 'Runtime & security',
        text: 'Uses Ollama when it is running; otherwise it installs node-llama-cpp from a pinned lockfile with install scripts disabled and downloads the model from a pinned Hugging Face commit with SHA-256 verification. File reads stay inside the project, and control characters are stripped from model output.',
      },
      {
        heading: 'GitHub Action',
        text: 'A composite action runs the review on each pull request on the GitHub runner itself, caches the model between runs, and posts one comment that it updates on every push. It runs at temperature 0 so re-runs give the same result, and can fail the check at a chosen severity.',
      },
      {
        heading: 'Release & CI',
        text: 'CI tests on Linux, Windows, and macOS across Node 20, 22, and 24. Pushing a version tag publishes to npm with provenance and builds standalone binaries with checksums. Actions are pinned to commit SHAs.',
      },
      {
        heading: 'Status',
        text: 'Released as an open-source project (npm @jeeva1398/eventa). It is newly published, so there is no user base yet.',
      },
    ],
    image: { src: eventaCard, alt: 'Eventa: offline AI assistant for Node.js and TypeScript, with a terminal showing eventa review flagging a missing await and a SQL injection' },
    gallery: [
      {
        src: eventaExplain,
        width: 1423,
        height: 654,
        alt: 'Terminal: eventa explain runs a crashing script and explains the TypeError with its cause, fix, and prevention',
        caption: 'eventa explain - a real crash explained from the project source',
      },
      {
        src: eventaReview,
        width: 1423,
        height: 654,
        alt: 'Terminal: eventa review lists static checks and AI findings for a diff - a missing await, SQL injection, and an empty catch',
        caption: 'eventa review - static checks, then the model confirms them with fixes',
      },
    ],
    links: {
      repo: 'https://github.com/Jeeva1398/eventa',
      demo: 'https://www.npmjs.com/package/@jeeva1398/eventa',
      demoLabel: 'npm',
      extra: [{ label: 'Model on Hugging Face', href: 'https://huggingface.co/jeeva1398/eventa-1.5b-gguf' }],
    },
  },
  {
    slug: 'emr-telehealth',
    kind: 'professional',
    track: 'app',
    name: 'EMR & Telehealth Platform',
    company: 'Pentabay Softwares',
    tagline: 'Patient care operations platform - appointments, EMR, and virtual consultations',
    domain: 'Healthcare',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    details: [
      {
        heading: 'Frontend integration',
        text: 'Collaborated with the frontend team to integrate backend APIs into a React-based interface for patients, clinicians, and administrators. Delivered responsive interfaces for appointment booking, patient check-in, EMR access, and telehealth session workflows.',
      },
      {
        heading: 'Backend development',
        text: 'Built and maintained RESTful APIs using Node.js and Express.js for patient management, appointments, EMR records, and teleconsultations. Designed and optimized MongoDB schemas for patients, providers, appointments, medical records, and audit logs. Implemented appointment scheduling, time-slot validation, clinical data management, and role-based access control.',
      },
      {
        heading: 'Key features',
        list: [
          'Patient self check-in and appointment management with real-time status updates',
          'EMR management with secure storage of patient demographics, clinical notes, and visit history',
          'Telehealth integration for virtual consultations between patients and providers',
          'Activity logging and audit trails for administrative and clinical actions',
        ],
      },
    ],
  },
  {
    slug: 'crm',
    kind: 'professional',
    track: 'app',
    name: 'Customer Relationship Management (CRM)',
    company: 'Faces Sync',
    tagline: 'Lead management system with role-based access and automated workflows',
    domain: 'CRM',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    details: [
      {
        heading: 'Frontend integration',
        text: 'Integrated APIs into a React front-end for seamless user interaction and data visualization, with dynamic role-based rendering of components and menus.',
      },
      {
        heading: 'Backend development',
        text: 'Designed and implemented RESTful APIs for user authentication, lead management, and role-based access control across four roles (Admin, Employee, Tele-counsellor, Super Admin). Automated email notifications via SMTP and cron jobs for lead follow-up reminders and inactive-status updates.',
      },
      {
        heading: 'Key features',
        list: [
          'Bulk data upload via CSV with validation for duplicates and missing entries',
          'Invoice number auto-generation and lead tracking with a detailed activity log',
          'Role-based lead filtering across four user roles',
          'Scheduled automation (cron jobs) for reminders and status updates',
        ],
      },
    ],
  },
  {
    slug: 'ecommerce',
    kind: 'professional',
    track: 'app',
    name: 'E-commerce Platform (Crackers) with Admin Panel',
    company: 'Faces Sync',
    tagline: 'Product catalog, order processing, and inventory management for an online store',
    domain: 'E-commerce',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    details: [
      {
        heading: 'Frontend integration',
        text: 'Integrated APIs into a React-based interface for customers and admins, with dynamic product listings, search filters, and category-based navigation.',
      },
      {
        heading: 'Backend development',
        text: 'Built RESTful APIs for product management, order processing, and authentication. Designed a MongoDB schema for products, categories, orders, and user data, with query optimization. Implemented discount calculation, inventory management, and refund processing.',
      },
      {
        heading: 'Key features',
        list: [
          'Dynamic product listings with category-based navigation and search filters',
          'Discount calculation on orders',
          'Inventory management',
          'Refund processing',
        ],
      },
    ],
  },
]

// Layers for the two Architecture views. `usedIn` only names real projects/roles above.
export const architecture = {
  app: {
    label: 'Application architecture',
    short: 'Application',
    layers: [
      {
        id: 'client',
        label: 'Client',
        tech: 'Browser · Embeddable widget',
        what: 'Where requests start - the web app in the browser, or the ZenithDesk chat widget embedded on a host site.',
        usedIn: ['ZenithDesk', 'ZenithDesk Chatbot Widget'],
      },
      {
        id: 'frontend',
        label: 'React Frontend',
        tech: 'React · Hooks · Context API · React Router',
        what: 'Reusable, stateful interfaces with role-based rendering of components and menus, integrated against REST APIs.',
        usedIn: ['EMR & Telehealth', 'CRM', 'E-commerce', 'ZenithDesk'],
      },
      {
        id: 'server',
        label: 'Node.js / Express',
        tech: 'Node.js · Express.js · Middleware',
        what: 'The application server: routing, middleware for request validation and error handling, and business logic such as scheduling, discounts, and refunds.',
        usedIn: ['EMR & Telehealth', 'CRM', 'E-commerce', 'ZenithDesk'],
      },
      {
        id: 'api',
        label: 'REST APIs',
        tech: 'RESTful API design',
        what: 'Resource-oriented endpoints for patients, appointments, leads, products, orders, and tickets - plus super-admin endpoints across tenants.',
        usedIn: ['EMR & Telehealth', 'CRM', 'E-commerce', 'ZenithDesk'],
      },
      {
        id: 'auth',
        label: 'Auth & Validation',
        tech: 'JWT & OAuth · RBAC · Zod',
        what: 'Authentication plus role-based access control (four roles in the CRM), request validation in middleware, and Zod-validated model output in the chatbot.',
        usedIn: ['CRM', 'EMR & Telehealth', 'ZenithDesk', 'ZenithDesk Chatbot Widget'],
      },
      {
        id: 'db',
        label: 'Databases',
        tech: 'MongoDB · MySQL',
        what: 'MongoDB schemas with indexing for the MERN products; MySQL with Knex and org_id-scoped multi-tenancy for ZenithDesk.',
        usedIn: ['EMR & Telehealth', 'CRM', 'E-commerce', 'ZenithDesk'],
      },
      {
        id: 'deploy',
        label: 'Cloud & Deployment',
        tech: 'Linux · Nginx · Docker · AWS EC2 · CI/CD',
        what: 'Build processes, environment configuration, and server setup for production releases. Docker, CI/CD, and cloud services are skills I am actively building.',
        usedIn: ['Pentabay Softwares (production releases)'],
      },
    ],
  },
  data: {
    label: 'Data pipeline architecture',
    short: 'Data pipeline',
    layers: [
      {
        id: 'source',
        label: 'Source Systems',
        tech: 'MySQL · Application DB',
        what: 'Operational data where it is created - ZenithDesk ticket data in its MySQL OLTP schema.',
        usedIn: ['ZenithDesk'],
      },
      {
        id: 'extract',
        label: 'Extract & Load',
        tech: 'Python · Node.js · SQL',
        what: 'Jobs pull data out of the source database and land it in the warehouse - incrementally from a watermark in ZenithDesk (Node + SQL).',
        usedIn: ['ZenithDesk'],
      },
      {
        id: 'orchestrate',
        label: 'Orchestration',
        tech: 'Apache Airflow · GitHub Actions · node-cron',
        what: 'Scheduled, repeatable runs - a node-cron ETL schedule with overlap protection in ZenithDesk, or an Airflow DAG / scheduled GitHub Actions workflow for batch pipelines.',
        usedIn: ['ZenithDesk'],
      },
      {
        id: 'warehouse',
        label: 'Warehouse',
        tech: 'MySQL star schema · Data Warehousing',
        what: 'Analytics storage kept apart from operational tables - a MySQL star schema (dimensions + fact_ticket_daily) in ZenithDesk.',
        usedIn: ['ZenithDesk'],
      },
      {
        id: 'transform',
        label: 'Transform',
        tech: 'dbt · SQL',
        what: 'dbt models turn raw loaded tables into clean, analytics-ready tables using version-controlled SQL - staging views, then a fact table and dimensions, with tests on keys and relationships.',
        usedIn: [],
      },
      {
        id: 'bi',
        label: 'BI Dashboard',
        tech: 'React dashboard',
        what: 'Dashboards on top of the modelled tables - the part a business user actually looks at. ZenithDesk’s analytics dashboard reads from its warehouse.',
        usedIn: ['ZenithDesk'],
      },
    ],
  },
}
