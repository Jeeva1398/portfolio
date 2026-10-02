import salesDashboard from '../assets/projects/sales-dashboard.webp'
import salesAirflowDag from '../assets/projects/sales-airflow-dag.webp'
import salesMetabase from '../assets/projects/sales-metabase.webp'
import eventaCard from '../assets/projects/eventa-card.webp'
import eventaExplain from '../assets/projects/eventa-explain.webp'
import eventaReview from '../assets/projects/eventa-review.webp'

export const profile = {
  name: 'Jeevaananthan M',
  shortName: 'Jeeva',
  role: 'MERN Stack Developer',
  headline: 'MERN Full-Stack & Backend Developer | Building in Data Engineering',
  positioning: 'Backend Developer - building toward Data Engineering & DevOps',
  location: 'Chennai / Coimbatore, Tamil Nadu, India',
  email: 'jeevamp0799@gmail.com',
  phone: '+91 94888 16066',
  linkedin: 'https://www.linkedin.com/in/jeevaananthan-m/',
  github: 'https://github.com/Jeeva1398',
  resumeFile: 'Jeevaananthan-M-Resume.pdf',
  pitch:
    "I'm a backend-leaning full-stack developer with about 3 years of experience building and shipping production MERN applications across healthcare, CRM, and e-commerce. I design RESTful APIs, model MongoDB schemas for scale, and I'm now extending that foundation into DevOps (Docker, CI/CD, AWS) and data engineering (ETL, warehousing, orchestration).",
  currentlyBuildingTeaser:
    'Now live: ZenithDesk, a multi-tenant support SaaS with an AI chatbot, and an e-commerce sales data pipeline with a daily-refreshed dashboard.',
  coreStack: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'REST APIs'],
  domainExperience: ['Healthcare (EMR/Telehealth)', 'CRM', 'E-commerce'],
}

export const about = {
  summary:
    "I'm a full-stack developer working primarily in the MERN stack, with close to 3 years split across two product teams in Chennai. Most of that work has been backend-leaning: designing REST APIs, shaping MongoDB schemas, and getting features from local development through to a deployed server.",
  domainParagraph:
    "That work has landed me in three different domains - a healthcare EMR/telehealth platform, a CRM with role-based lead management, and an e-commerce platform with an admin panel - so I've had to adapt to different data models and compliance/business constraints rather than build the same CRUD app three times.",
  direction:
    "I'm now building toward two related but distinct tracks: DevOps (Docker, CI/CD, AWS) as the deployment layer on top of my backend work, and data engineering (ETL, warehousing, orchestration) as a data layer on top of the applications I already build. ZenithDesk, now live in production, is where both of those show up in practice, and the e-commerce sales data pipeline - MySQL into a dbt star schema, scheduled with Airflow locally and GitHub Actions in the cloud - is my first dedicated data engineering build.",
  pivotNote:
    "Before engineering, I spent 2020–2021 as a Medical Billing Specialist at KMCH, Coimbatore - hands-on exposure to healthcare operations and insurance workflows that now shapes how I think about the EMR/telehealth systems I build as a developer.",
  currently:
    'MERN Stack Developer at Pentabay Softwares, Chennai - designing REST APIs, Express middleware, and MongoDB schemas, and owning deployment for production releases.',
  education: {
    institution: 'Hindustan College of Arts and Science, Coimbatore',
    degree: 'Bachelor of Commerce (Corporate Secretaryship)',
    years: '2015 – 2018',
  },
}

// track: 'app' (application stack), 'data' (data stack), or 'tools'
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
      'Apache Airflow',
      'dbt',
      'ETL / ELT Pipelines',
      'Data Warehousing',
      'SQL for Analytics',
      'Docker',
    ],
    // listed, but not used in a project yet - shown with their own "learning" tag
    learning: ['Apache Spark', 'PySpark', 'Hadoop', 'HDFS', 'Hive'],
  },
  {
    title: 'DevOps & Cloud',
    track: 'app',
    status: 'building',
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
    // GitHub Actions sits here, not under DevOps (building): it runs CI for ZenithDesk and the sales pipeline's schedule
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

// kind: 'professional' (client/employer work) or 'personal' (own portfolio projects)
// track: 'app' or 'data' - drives the Projects filter and accent colour
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
    domain: 'SaaS · Portfolio project',
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
    links: { repo: 'https://github.com/Jeeva1398/zenithDesk', demo: 'https://portal.zenithdesk.site/' },
  },
  {
    slug: 'zenithdesk-chatbot',
    kind: 'personal',
    track: 'app',
    status: 'Live',
    name: 'ZenithDesk Chatbot Widget',
    tagline: 'Multi-org AI support widget - answers from the knowledge base, raises tickets and enquiries, and lets customers track tickets',
    domain: 'AI · Portfolio project',
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
        text: 'Deployed to production at chat.zenithdesk.site and embedded on this portfolio. The chat bubble on this page is the live widget.',
      },
    ],
    links: { repo: 'https://github.com/Jeeva1398/zenithDesk-chat', demo: null },
  },
  {
    slug: 'eventa',
    kind: 'personal',
    track: 'app',
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
        text: 'Released as an open-source portfolio project (npm @jeeva1398/eventa). It is newly published, so there is no user base yet.',
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
      demo: null,
      extra: [
        { label: 'npm package', href: 'https://www.npmjs.com/package/@jeeva1398/eventa' },
        { label: 'Model on Hugging Face', href: 'https://huggingface.co/jeeva1398/eventa-1.5b-gguf' },
      ],
    },
  },
  {
    slug: 'ecommerce-sales-pipeline',
    kind: 'personal',
    track: 'data',
    status: 'Live',
    name: 'E-commerce Sales Data Pipeline',
    tagline: 'Batch ELT pipeline from an operational MySQL database into a dbt star schema, refreshed daily and served on a live dashboard',
    domain: 'Data Engineering · Portfolio project',
    stack: ['MySQL', 'Python', 'Apache Airflow', 'dbt', 'PostgreSQL', 'Docker', 'Metabase', 'GitHub Actions', 'Supabase', 'Streamlit'],
    pipeline: ['MySQL', 'Python', 'Airflow', 'dbt', 'Postgres', 'Dashboard'],
    highlights: [
      'dbt star schema with key and relationship tests',
      'Airflow DAG locally, GitHub Actions in the cloud',
      'Live dashboard refreshed daily',
    ],
    details: [
      {
        heading: 'Flow',
        list: [
          'Source - normalised OLTP schema in MySQL (categories, customers, products, orders, order items), seeded with Faker',
          'Extract & load - Python streams each table with a server-side cursor and COPYs it into a raw schema in Postgres, all in one transaction so a failed run leaves the previous load intact',
          'Transform - dbt staging views, an intermediate order-lines model, and a star schema: fact_orders at order-line grain plus customer, product, and date dimensions',
          'Quality - dbt tests on keys and referential integrity run after every load',
          'Dashboard - revenue and order trends, top products, and customer lifetime value',
        ],
      },
      {
        heading: 'Local stack',
        text: 'The full version runs in Docker Compose: MySQL, a Postgres warehouse, Apache Airflow (LocalExecutor with its own metadata database) running one DAG - extract, dbt run, dbt test - with retries and failure callbacks, and Metabase with its dashboard provisioned from a script through the Metabase API.',
      },
      {
        heading: 'Cloud deployment',
        text: 'A free-tier cloud version runs the same extraction and dbt code. A daily GitHub Actions workflow seeds a throwaway MySQL service container, loads the Supabase Postgres warehouse, and runs dbt build and tests. The dashboard is rebuilt in Streamlit on Streamlit Community Cloud, reading only the mart tables.',
      },
      {
        heading: 'Status',
        text: 'A portfolio project running on generated sample data (about 2,000 customers, 300 products, and 8,000 orders) - there are no real users or production traffic behind it.',
      },
    ],
    image: { src: salesDashboard, alt: 'Streamlit dashboard: revenue, orders, customers and average order value tiles above revenue and order volume by month' },
    // extra screenshots, shown in the details view only
    gallery: [
      {
        src: salesAirflowDag,
        width: 670,
        height: 100,
        alt: 'Airflow graph view of the ecom_pipeline DAG: extract_to_raw, dbt_run and dbt_test, each marked success',
        caption: 'Local stack - the Airflow DAG: extract, dbt run, dbt test',
      },
      {
        src: salesMetabase,
        width: 1080,
        height: 690,
        alt: 'Metabase dashboard: revenue and order volume by month, top 10 products by revenue, and a customer lifetime value table',
        caption: 'Local stack - the Metabase dashboard, provisioned from a script',
      },
    ],
    links: { repo: 'https://github.com/Jeeva1398/E-Commerce-Sales', demo: 'https://jeeva-ecom-sales.streamlit.app/' },
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
        what: 'Operational data where it is created - ZenithDesk ticket data in its MySQL OLTP schema, and sales data in MySQL.',
        usedIn: ['ZenithDesk', 'E-commerce Sales Data Pipeline'],
      },
      {
        id: 'extract',
        label: 'Extract & Load',
        tech: 'Python · Node.js · SQL',
        what: 'Jobs pull data out of the source database and land it in the warehouse - incrementally from a watermark in ZenithDesk (Node + SQL), and with Python streaming into Postgres via COPY in the sales pipeline.',
        usedIn: ['ZenithDesk', 'E-commerce Sales Data Pipeline'],
      },
      {
        id: 'orchestrate',
        label: 'Orchestration',
        tech: 'Apache Airflow · GitHub Actions · node-cron',
        what: 'Scheduled, repeatable runs - a node-cron ETL schedule with overlap protection in ZenithDesk, and in the sales pipeline an Airflow DAG locally and a scheduled GitHub Actions workflow in the cloud.',
        usedIn: ['ZenithDesk', 'E-commerce Sales Data Pipeline'],
      },
      {
        id: 'warehouse',
        label: 'Warehouse',
        tech: 'MySQL star schema · PostgreSQL · Supabase · Docker',
        what: 'Analytics storage kept apart from operational tables - a MySQL star schema (dimensions + fact_ticket_daily) in ZenithDesk, and a PostgreSQL warehouse for the sales pipeline - in Docker locally, on Supabase in the cloud.',
        usedIn: ['ZenithDesk', 'E-commerce Sales Data Pipeline'],
      },
      {
        id: 'transform',
        label: 'Transform',
        tech: 'dbt · SQL',
        what: 'dbt models turn raw loaded tables into clean, analytics-ready tables using version-controlled SQL - staging views, then a fact table and dimensions, with tests on keys and relationships.',
        usedIn: ['E-commerce Sales Data Pipeline'],
      },
      {
        id: 'bi',
        label: 'BI Dashboard',
        tech: 'Metabase · Streamlit · React dashboard',
        what: 'Dashboards on top of the modelled tables - the part a business user actually looks at. ZenithDesk’s analytics dashboard reads from its warehouse; the sales pipeline uses Metabase locally and a live Streamlit dashboard in the cloud.',
        usedIn: ['ZenithDesk', 'E-commerce Sales Data Pipeline'],
      },
    ],
  },
}
