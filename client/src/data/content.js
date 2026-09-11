export const profile = {
  name: 'Jeevaananthan M',
  shortName: 'Jeeva',
  role: 'MERN Stack Developer',
  positioning: 'Backend Developer — building toward Data Engineering & DevOps',
  location: 'Chennai / Coimbatore, Tamil Nadu, India',
  email: 'jeevamp0799@gmail.com',
  phone: '+91 94888 16066',
  linkedin: 'https://www.linkedin.com/in/jeevaananthan-m/',
  github: 'https://github.com/Jeeva1398',
  resumeFile: 'Jeevaananthan-M-Resume.pdf',
  pitch:
    "I'm a backend-leaning full-stack developer with about 3 years of experience building and shipping production MERN applications across healthcare, CRM, and e-commerce. I design RESTful APIs, model MongoDB schemas for scale, and I'm now extending that foundation into DevOps (Docker, CI/CD, AWS) and data engineering (ETL, warehousing, orchestration).",
  currentlyBuildingTeaser:
    'Currently building ZenithDesk — a multi-tenant support ticketing SaaS with an AI chatbot widget.',
  coreStack: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'REST APIs'],
  domainExperience: ['Healthcare (EMR/Telehealth)', 'CRM', 'E-commerce'],
}

export const about = {
  summary:
    "I'm a full-stack developer working primarily in the MERN stack, with close to 3 years split across two product teams in Chennai. Most of that work has been backend-leaning: designing REST APIs, shaping MongoDB schemas, and getting features from local development through to a deployed server.",
  domainParagraph:
    "That work has landed me in three different domains — a healthcare EMR/telehealth platform, a CRM with role-based lead management, and an e-commerce platform with an admin panel — so I've had to adapt to different data models and compliance/business constraints rather than build the same CRUD app three times.",
  direction:
    "I'm now building toward two related but distinct tracks: DevOps (Docker, CI/CD, AWS) as the deployment layer on top of my backend work, and data engineering (ETL, warehousing, orchestration) as a data layer on top of the applications I already build. ZenithDesk, my current project, is where both of those show up in practice.",
  pivotNote:
    "Before engineering, I spent 2020–2021 as a Medical Billing Specialist at KMCH, Coimbatore — hands-on exposure to healthcare operations and insurance workflows that now shapes how I think about the EMR/telehealth systems I build as a developer.",
  education: {
    institution: 'Hindustan College of Arts and Science, Coimbatore',
    degree: 'Bachelor of Commerce (Corporate Secretaryship)',
    years: '2015 – 2018',
  },
}

export const skillGroups = [
  {
    title: 'Frontend',
    status: 'proven',
    items: ['HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'React.js'],
  },
  {
    title: 'Backend',
    status: 'proven',
    items: [
      'Node.js',
      'Express.js',
      'RESTful API Design',
      'Middleware Development',
      'JWT & OAuth-based Authentication',
      'Role-Based Access Control (RBAC)',
    ],
  },
  {
    title: 'Databases',
    status: 'proven',
    items: ['MongoDB', 'MySQL', 'SQL Query Writing', 'Schema Design', 'Query & Indexing Optimization'],
  },
  {
    title: 'DevOps',
    status: 'building',
    items: ['Docker', 'AWS EC2', 'Linux Server Administration', 'Nginx', 'Environment Configuration', 'GitHub Actions', 'CI/CD'],
  },
  {
    title: 'Data Engineering',
    status: 'building',
    items: ['ETL Pipelines', 'Data Warehousing', 'Orchestration', 'PostgreSQL', 'SQL for Analytics'],
  },
  {
    title: 'Tools & Collaboration',
    status: 'proven',
    items: ['Git', 'GitHub', 'VS Code', 'Postman', 'ClickUp', 'Slack'],
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
      'Design and build RESTful APIs and Express middleware — request validation, error handling, and auth — powering production MERN applications.',
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
      'Managed MongoDB data models via Mongoose — schema design, validation, and day-to-day data operations.',
      'Worked across the full release cycle, from local development through environment configuration and deployment.',
    ],
  },
]

export const projects = [
  {
    slug: 'emr-telehealth',
    name: 'EMR & Telehealth Platform',
    tagline: 'Patient care operations platform — appointments, EMR, and virtual consultations',
    domain: 'Healthcare',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    frontend:
      'Collaborated with the frontend team to integrate backend APIs into a React-based interface for patients, clinicians, and administrators. Delivered responsive interfaces for appointment booking, patient check-in, EMR access, and telehealth session workflows.',
    backend:
      'Built and maintained RESTful APIs using Node.js and Express.js for patient management, appointments, EMR records, and teleconsultations. Designed and optimized MongoDB schemas for patients, providers, appointments, medical records, and audit logs. Implemented appointment scheduling, time-slot validation, clinical data management, and role-based access control.',
    keyFeatures: [
      'Patient self check-in and appointment management with real-time status updates',
      'EMR management with secure storage of patient demographics, clinical notes, and visit history',
      'Telehealth integration for virtual consultations between patients and providers',
      'Activity logging and audit trails for administrative and clinical actions',
    ],
  },
  {
    slug: 'crm',
    name: 'Customer Relationship Management (CRM)',
    tagline: 'Lead management system with role-based access and automated workflows',
    domain: 'CRM',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    frontend:
      'Integrated APIs into a React front-end for seamless user interaction and data visualization, with dynamic role-based rendering of components and menus.',
    backend:
      'Designed and implemented RESTful APIs for user authentication, lead management, and role-based access control across four roles (Admin, Employee, Tele-counsellor, Super Admin). Automated email notifications via SMTP and cron jobs for lead follow-up reminders and inactive-status updates.',
    keyFeatures: [
      'Bulk data upload via CSV with validation for duplicates and missing entries',
      'Invoice number auto-generation and lead tracking with a detailed activity log',
      'Role-based lead filtering across four user roles',
      'Scheduled automation (cron jobs) for reminders and status updates',
    ],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce Platform (Crackers) with Admin Panel',
    tagline: 'Product catalog, order processing, and inventory management for an online store',
    domain: 'E-commerce',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    frontend:
      'Integrated APIs into a React-based interface for customers and admins, with dynamic product listings, search filters, and category-based navigation.',
    backend:
      'Built RESTful APIs for product management, order processing, and authentication. Designed a MongoDB schema for products, categories, orders, and user data, with query optimization. Implemented discount calculation, inventory management, and refund processing.',
    keyFeatures: [
      'Bulk data upload via CSV with validation for duplicates and missing entries',
      'Invoice number auto-generation and order tracking with a detailed activity log',
      'Category-based navigation and search filters',
      'Inventory and refund management',
    ],
  },
]

export const zenithDesk = {
  name: 'ZenithDesk',
  tagline: 'Customer support ticketing SaaS with an AI chatbot widget for ticket creation',
  status: 'In progress',
  stack: ['React', 'Node.js', 'MySQL'],
  architecture: [
    {
      title: 'Multi-tenancy',
      detail: 'Shared-database, shared-schema multi-tenancy, scoped by org_id.',
    },
    {
      title: 'Role model',
      detail:
        'Org-level admins create agents directly, with no invite flow, plus a platform-level Super Admin with visibility across all tenants.',
    },
    {
      title: 'Chatbot widget',
      detail:
        'An AI chatbot widget for ticket creation, built as a separate project/repo from the main app — SLM-based, handles ticket creation via chat.',
    },
    {
      title: 'Stack',
      detail: 'React + Node + MySQL.',
    },
    {
      title: 'Data layer (planned)',
      detail:
        "An ETL/warehouse/orchestration layer on top of ZenithDesk's operational data — ticket volume trends, SLA reporting, agent performance dashboards. This is the piece aimed most directly at data engineering recruiters: a real pipeline over real application data, not a toy dataset.",
    },
  ],
  devProcess:
    'Built in explicit phases — setup, schema, API, and onward — with a commit per phase, as evidence of a disciplined build process rather than ad-hoc development.',
  links: {
    repo: null,
    demo: null,
  },
}
