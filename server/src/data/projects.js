// Server-side copy of the project write-ups shown on the portfolio's Projects page.
// Kept in sync with client/src/data/content.js by hand, since client and server are separate packages.
export const projects = [
  {
    slug: 'emr-telehealth',
    name: 'EMR & Telehealth Platform',
    tagline: 'Patient care operations platform — appointments, EMR, and virtual consultations',
    domain: 'Healthcare',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  },
  {
    slug: 'crm',
    name: 'Customer Relationship Management (CRM)',
    tagline: 'Lead management system with role-based access and automated workflows',
    domain: 'CRM',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  },
  {
    slug: 'ecommerce',
    name: 'E-commerce Platform (Crackers) with Admin Panel',
    tagline: 'Product catalog, order processing, and inventory management for an online store',
    domain: 'E-commerce',
    stack: ['MongoDB', 'Express.js', 'React', 'Node.js'],
  },
]
