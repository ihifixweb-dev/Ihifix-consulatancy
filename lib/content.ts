export type Service = {
  slug: string
  title: string
  short: string
  outcome: string
  headline: string
  problem: string
  included: string[]
  deliverables: string[]
  tech: string[]
  faqs: { q: string; a: string }[]
  relatedCases: string[]
}

export const services: Service[] = [
  {
    slug: 'software-development',
    title: 'Software Development',
    short: 'Custom web and mobile apps, enterprise systems, APIs.',
    outcome: 'Systems your teams and citizens actually use, built to run on real-world connectivity.',
    headline: 'Software that works in African realities',
    problem:
      'Off-the-shelf tools rarely fit local workflows, low-bandwidth conditions or public-sector procurement rules. Teams end up with fragmented spreadsheets and systems nobody trusts.',
    included: [
      'Custom web applications and portals',
      'Native and cross-platform mobile apps',
      'Enterprise systems and workflow automation',
      'API design, integration and documentation',
    ],
    deliverables: [
      'Technical specification and architecture',
      'Production-ready, tested codebase',
      'Deployment pipeline and environments',
      'Admin training and handover documentation',
    ],
    tech: ['TypeScript', 'React / Next.js', 'Node.js', 'Python', 'Flutter', 'PostgreSQL', 'REST & GraphQL'],
    faqs: [
      {
        q: 'Do you build for low-bandwidth users?',
        a: 'Yes. We design offline-first where needed, keep payloads small and test on throttled mobile networks common across Nigeria.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do. Source code, credentials and documentation are handed over at the end of the engagement.',
      },
    ],
    relatedCases: ['citizens-demand-platform', 'kaduna-eyes-and-ears'],
  },
  {
    slug: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    short: 'Predictive analytics, NLP, computer vision, automation.',
    outcome: 'Turn the data you already collect into decisions you can defend.',
    headline: 'Practical AI, responsibly deployed',
    problem:
      'Organisations sit on survey data, citizen feedback and transaction records but lack the capacity to analyse them at speed, or worry about bias and data protection.',
    included: [
      'Predictive analytics and forecasting',
      'Natural language processing, including local-language text',
      'Computer vision for monitoring and verification',
      'Process automation and intelligent assistants',
    ],
    deliverables: [
      'Data readiness assessment',
      'Validated model with evaluation report',
      'Integrated AI feature or dashboard',
      'Responsible-AI and data-protection documentation',
    ],
    tech: ['Python', 'PyTorch', 'scikit-learn', 'LLM APIs', 'Vector search', 'Airflow'],
    faqs: [
      {
        q: 'How do you handle personal data?',
        a: 'We follow the Nigeria Data Protection Act 2023: data minimisation, lawful basis, anonymisation where possible and human review of high-impact outputs.',
      },
      {
        q: 'Do we need a lot of data to start?',
        a: 'Not always. A short discovery sprint tells you what is possible with what you have today.',
      },
    ],
    relatedCases: ['citizens-demand-platform', 'meepeeya'],
  },
  {
    slug: 'digital-products',
    title: 'Digital Products',
    short: 'MVP development, SaaS platforms, digital transformation.',
    outcome: 'Go from idea to launched product without wasting a funding round.',
    headline: 'From idea to launched product',
    problem:
      'Founders and programme teams burn time and budget building features nobody needs, or digitise broken processes instead of redesigning them.',
    included: [
      'MVP scoping and rapid build',
      'SaaS platform architecture',
      'Digital transformation roadmaps',
      'Product analytics and iteration',
    ],
    deliverables: ['Product roadmap', 'Clickable prototype', 'Launched MVP', 'Growth and iteration plan'],
    tech: ['Next.js', 'Supabase / Postgres', 'Stripe & Paystack', 'Figma', 'Analytics'],
    faqs: [
      {
        q: 'How fast can you ship an MVP?',
        a: 'It depends on scope. We agree a fixed scope in discovery and ship in short, demoable increments.',
      },
    ],
    relatedCases: ['meepeeya', 'afriscale'],
  },
  {
    slug: 'branding-and-creative',
    title: 'Branding & Creative',
    short: 'Brand identity, visual design, marketing collateral.',
    outcome: 'A brand that earns trust from funders, officials and customers alike.',
    headline: 'Identity that earns trust',
    problem:
      'Inconsistent visuals and messaging weaken credibility in tenders, donor reports and campaigns.',
    included: ['Brand strategy and identity', 'Visual and UI design', 'Campaign and marketing collateral', 'Report and pitch design'],
    deliverables: ['Logo and brand guidelines', 'Design system', 'Templates and collateral', 'Campaign assets'],
    tech: ['Figma', 'Adobe Creative Cloud', 'Motion design'],
    faqs: [
      {
        q: 'Can you design donor reports?',
        a: 'Yes. We regularly produce impact reports and programme materials that meet funder branding rules.',
      },
    ],
    relatedCases: ['afriscale'],
  },
  {
    slug: 'it-infrastructure-and-cloud',
    title: 'IT Infrastructure & Cloud',
    short: 'Secure IT systems, cloud platforms, digital operations.',
    outcome: 'Infrastructure that stays up, stays secure and stays within budget.',
    headline: 'Secure, reliable digital operations',
    problem:
      'Ageing on-premise systems, unmanaged access and no backup strategy put critical public and business data at risk.',
    included: ['Cloud migration and architecture', 'Network and systems setup', 'Security hardening and access control', 'Managed operations and monitoring'],
    deliverables: ['Infrastructure assessment', 'Migration plan', 'Monitored environment', 'Backup and recovery runbooks'],
    tech: ['AWS', 'Azure', 'Google Cloud', 'Vercel', 'Docker', 'Terraform'],
    faqs: [
      {
        q: 'Do you offer ongoing support?',
        a: 'Yes, through retainer and managed-service engagements with agreed response times.',
      },
    ],
    relatedCases: ['kaduna-eyes-and-ears'],
  },
  {
    slug: 'research-and-development',
    title: 'Research & Development',
    short: 'Feasibility studies, user research, innovation sprints.',
    outcome: 'De-risk investment before a single line of code is written.',
    headline: 'Evidence before investment',
    problem:
      'Programmes and products fail when they are designed without the people who will use them.',
    included: ['Feasibility and market studies', 'User and field research', 'Innovation sprints', 'Prototype testing'],
    deliverables: ['Research report', 'Personas and journey maps', 'Validated prototype', 'Recommendations and roadmap'],
    tech: ['Field surveys', 'KoboToolbox', 'Figma', 'Usability testing'],
    faqs: [
      {
        q: 'Do you do field research outside Kaduna?',
        a: 'Yes. Our teams have run research across Northern Nigeria and partner networks elsewhere.',
      },
    ],
    relatedCases: ['macarthur-accountability', 'meepeeya'],
  },
]

export type CaseStudy = {
  slug: string
  title: string
  client: string
  year: string
  sector: string
  services: string[]
  image: string
  metric: string
  metricLabel: string
  summary: string
  challenge: string
  solution: string
  outcomes: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'citizens-demand-platform',
    title: 'Citizens Demand Platform',
    client: 'DFID PERL',
    year: '2022',
    sector: 'Government & Public Sector',
    services: ['Software Development', 'Research & Development'],
    image: '/images/summit-audience.jpg',
    metric: '2023',
    metricLabel: 'Kaduna State budget directly informed by citizen input',
    summary: 'A participatory platform that put community priorities in front of budget planners.',
    challenge:
      'Citizen priorities were collected on paper and rarely reached the officials preparing the state budget.',
    solution:
      'We designed and built a platform for collecting, aggregating and presenting community demands to ministries in a format planners could act on.',
    outcomes: [
      'Community demands fed directly into the 2023 Kaduna State budget',
      'A repeatable channel between citizens and planners',
      'Data that CSOs could use to track government commitments',
    ],
  },
  {
    slug: 'meepeeya',
    title: 'Meepeeya Citizen Feedback',
    client: 'USAID State2State',
    year: '2022',
    sector: 'Development & Civil Society',
    services: ['Digital Products', 'Software Development'],
    image: '/images/team-feedback.jpg',
    metric: '24/7',
    metricLabel: 'Citizen feedback channel on public services',
    summary: 'A citizen feedback platform that gives residents a direct line to service providers.',
    challenge: 'Residents had no reliable way to report on the quality of public services.',
    solution:
      'A mobile-friendly feedback platform with structured reporting, moderation tools and dashboards for officials.',
    outcomes: [
      'Structured, searchable citizen feedback',
      'Dashboards for officials and partners',
      'A platform model reusable in other states',
    ],
  },
  {
    slug: 'kaduna-eyes-and-ears',
    title: 'Kaduna "Eyes & Ears"',
    client: 'Kaduna State Government',
    year: '2017 – present',
    sector: 'Government & Public Sector',
    services: ['IT Infrastructure & Cloud', 'Software Development'],
    image: '/images/team-monitoring.jpg',
    metric: '2017',
    metricLabel: 'Monitoring infrastructure in continuous service since',
    summary: 'Citizen monitoring infrastructure for tracking government projects across the state.',
    challenge: 'The state needed independent, ground-level verification of project delivery.',
    solution:
      'Infrastructure and tools enabling trained citizen monitors to report on projects with evidence.',
    outcomes: [
      'Long-running, state-adopted monitoring system',
      'Evidence-based reporting on public projects',
      'Strengthened trust between citizens and government',
    ],
  },
  {
    slug: 'macarthur-accountability',
    title: 'Digital Accountability Platforms',
    client: 'MacArthur Foundation',
    year: '2021 – 2023',
    sector: 'Development & Civil Society',
    services: ['Software Development', 'Research & Development'],
    image: '/images/storytelling-workshop.jpg',
    metric: '2',
    metricLabel: 'States served: Borno and Zamfara',
    summary: 'Accountability platforms supporting transparency in conflict-affected states.',
    challenge: 'Fragile contexts with limited connectivity and high stakes for data protection.',
    solution: 'Lightweight, secure platforms built with local partners and designed for low connectivity.',
    outcomes: ['Platforms deployed in Borno and Zamfara', 'Local CSOs trained to operate them', 'Secure data handling by design'],
  },
  {
    slug: 'afriscale',
    title: 'Afriscale SME Summit',
    client: 'Ihifix & partners',
    year: '2023',
    sector: 'Financial Services & SMEs',
    services: ['Branding & Creative', 'Digital Products'],
    image: '/images/afriscale-conference.jpg',
    metric: 'Pan-African',
    metricLabel: 'SME scaling summit, brand and digital platform',
    summary: 'Brand, digital platform and delivery for a Pan-African SME scaling summit.',
    challenge: 'A new summit needed a credible identity and registration experience quickly.',
    solution: 'End-to-end brand identity, website and registration platform.',
    outcomes: ['Launched brand and platform', 'Smooth delegate registration', 'Reusable event toolkit'],
  },
  {
    slug: 'tetfund-neri-capacity',
    title: 'Digital Capacity Programmes',
    client: 'TETFund & USAID NERI',
    year: '2021 – 2023',
    sector: 'Education & Training',
    services: ['Research & Development', 'Digital Products'],
    image: '/images/academy-session.jpg',
    metric: 'Staff',
    metricLabel: 'Digital competency programmes for public institutions',
    summary: 'Staff capacity and digital competency programmes for public institutions.',
    challenge: 'Public staff needed practical digital skills to run new systems.',
    solution: 'Needs assessment, tailored curriculum and delivery supported by Ihifix Digital Academy.',
    outcomes: ['Assessed and trained institutional staff', 'Curricula tailored to real workflows', 'Ongoing talent pipeline'],
  },
]

export type PartnerLogo = {
  name: string
  src: string
  width: number
  height: number
  /** Display height in px, tuned so marks of different shapes carry similar visual weight. */
  size: number
  /** Shown beside seal-style marks that carry no readable name. */
  label?: string
}

export const partnerLogos = {
  google: { name: 'Google', src: '/images/partners/google.png', width: 365, height: 120, size: 30 },
  ukaid: { name: 'UK aid', src: '/images/partners/ukaid.png', width: 97, height: 120, size: 46 },
  usaid: { name: 'USAID', src: '/images/partners/usaid.png', width: 402, height: 120, size: 38 },
  ford: { name: 'Ford Foundation', src: '/images/partners/ford.png', width: 317, height: 120, size: 36 },
  macarthur: { name: 'MacArthur Foundation', src: '/images/partners/macarthur.png', width: 333, height: 120, size: 40 },
  tetfund: { name: 'TETFund', src: '/images/partners/tetfund.png', width: 440, height: 120, size: 34 },
  kaduna: {
    name: 'Kaduna State Government',
    src: '/images/partners/kaduna.png',
    width: 120,
    height: 120,
    size: 44,
    label: 'Kaduna State Government',
  },
} satisfies Record<string, PartnerLogo>

/** Order of the "Trusted by" strip on the home page. */
export const trustedBy: PartnerLogo[] = [
  partnerLogos.google,
  partnerLogos.ukaid,
  partnerLogos.usaid,
  partnerLogos.ford,
  partnerLogos.macarthur,
  partnerLogos.tetfund,
  partnerLogos.kaduna,
]

export const partners: {
  name: string
  period: string
  type: string
  impact: string
  logo: PartnerLogo
}[] = [
  { name: 'UKAID / DFID PERL', period: '2018 – 2022', type: 'Development partner', impact: 'Citizens Demand Platform informing the 2023 Kaduna budget', logo: partnerLogos.ukaid },
  { name: 'USAID State2State', period: '2022', type: 'Development partner', impact: 'Meepeeya citizen feedback platform', logo: partnerLogos.usaid },
  { name: 'USAID NERI', period: '2021 – 2023', type: 'Development partner', impact: 'Education capacity programmes', logo: partnerLogos.usaid },
  { name: 'MacArthur Foundation', period: '2021 – 2023', type: 'Foundation', impact: 'Accountability platforms in Borno and Zamfara', logo: partnerLogos.macarthur },
  { name: 'Ford Foundation', period: '2020 – 2022', type: 'Foundation', impact: 'Civic engagement and inclusion', logo: partnerLogos.ford },
  { name: 'Google', period: '2019 – present', type: 'Technology partner', impact: 'Digital Skills partnership', logo: partnerLogos.google },
  { name: 'TETFund', period: '2021 – 2023', type: 'Government', impact: 'Staff digital competency', logo: partnerLogos.tetfund },
  { name: 'Kaduna State Government', period: '2017 – present', type: 'Government', impact: '"Eyes & Ears" citizen monitoring', logo: partnerLogos.kaduna },
]

export const stats = [
  { value: '17+', label: 'Digital products deployed' },
  { value: '8+', label: 'Sectors served' },
  { value: '9+', label: 'Platforms built' },
  { value: '49', label: 'Countries reached' },
]

export const process = [
  { name: 'Discover', desc: 'Stakeholder interviews, field research and a clear problem statement.', artefact: 'Discovery report' },
  { name: 'Design', desc: 'Journeys, prototypes and architecture, tested with real users.', artefact: 'Prototype & spec' },
  { name: 'Build', desc: 'Short, demoable iterations with secure engineering practices.', artefact: 'Working software' },
  { name: 'Launch', desc: 'Deployment, training, documentation and handover.', artefact: 'Go-live & runbooks' },
  { name: 'Scale', desc: 'Monitoring, support and iteration as adoption grows.', artefact: 'Growth roadmap' },
]

export const industries = [
  {
    slug: 'government',
    title: 'Government & Public Sector',
    desc: 'Citizen engagement, monitoring and evaluation platforms, and staff digital competency.',
    refs: ['Kaduna State Eyes & Ears', 'TETFund', 'USAID NERI'],
  },
  {
    slug: 'civil-society',
    title: 'Development & Civil Society',
    desc: 'Civic tech, accountability and feedback platforms for donors, implementing partners and CSOs.',
    refs: ['Meepeeya', 'Citizens Demand', 'MacArthur platforms'],
  },
  {
    slug: 'education',
    title: 'Education & Training',
    desc: 'Learning platforms and capacity programmes backed by the Ihifix Digital Academy talent pipeline.',
    refs: ['TETFund', 'Google Digital Skills'],
  },
  {
    slug: 'finance-sme',
    title: 'Financial Services & SMEs',
    desc: 'Digital transformation, MVPs and growth platforms for businesses scaling across Africa.',
    refs: ['Afriscale'],
  },
]

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/work', label: 'Work' },
  { href: '/how-we-work', label: 'How We Work' },
  { href: '/about', label: 'About' },
]

export const contact = {
  email: 'info@ihifix.com',
  phone: '+234 916 131 1555',
  phoneHref: 'tel:+2349161311555',
  whatsapp: 'https://wa.me/2349161311555',
  address: 'No. 2 Ahman Pategi, off Alkali Road, Kaduna',
}
