export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type CaseStudyStat = {
  value: string;
  label: string;
};

export type CaseStudyLesson = {
  title: string;
  body?: string;
};

export type CaseStudyFeature = {
  name: string;
  description: string;
};

export type CaseStudyMetaItem = {
  label: string;
  value: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  index: string;
  liveUrl?: string;
  liveLabel?: string;
  hero: CaseStudyImage;
  meta: CaseStudyMetaItem[];
  pitch: string;
  gallery?: CaseStudyImage[];
  stats?: {
    label?: string;
    items: CaseStudyStat[];
  };
  features?: {
    label?: string;
    items: CaseStudyFeature[];
  };
  lessons?: CaseStudyLesson[];
  next: string;
};

export const caseStudies: Record<string, CaseStudy> = {
  unilinks: {
    slug: "unilinks",
    title: "Unilinks",
    category: "Global Education Platform",
    tagline:
      "The entire study-abroad journey — discovery, application, visa, arrival — collapsed into one connected product.",
    index: "01 / 05",
    liveUrl: "https://unilinks.co",
    liveLabel: "Visit unilinks.co",
    hero: {
      src: "/work/unilinks/1.png",
      alt: "Unilinks platform overview",
    },
    meta: [
      { label: "Role", value: "Chief Product Officer & Co-founder" },
      { label: "Duration", value: "Sep 2023 — Present" },
      { label: "Team", value: "4 co-founders · growing" },
      { label: "Stack", value: "Next.js · Firebase · Claude Code" },
    ],
    pitch:
      "Chasing a degree abroad is a twenty-tool obstacle course — universities on one site, scholarships on another, visas in email, deadlines in a Notion nobody opens. Unilinks replaces that mess with five connected products sharing one data model: a public marketplace, a University CMS, an internal CRM, a Mentor Portal and a Student Portal. One account, one roadmap, one place every stakeholder operates from. In two years we scaled to 1,000+ students and 59 university partners — shipped by a lean team with Claude Code at the centre of the workflow.",
    gallery: [
      {
        src: "/work/unilinks/1.png",
        alt: "Unilinks student dashboard",
        caption:
          "Student dashboard — the full application pipeline, visible in one view.",
      },
    ],
    stats: {
      label: "Impact",
      items: [
        { value: "1,000+", label: "Students onboarded" },
        { value: "59", label: "University partners" },
        { value: "5", label: "Sub-products shipped" },
        { value: "AI-native", label: "Core workflow" },
      ],
    },
    features: {
      label: "Five sub-products, one platform",
      items: [
        {
          name: "Marketplace",
          description:
            "Students discover universities, programs and scholarships in one searchable surface.",
        },
        {
          name: "University CMS",
          description:
            "Universities self-serve their program catalogue, intake windows and inbound applications.",
        },
        {
          name: "Internal CRM",
          description:
            "Our ops team runs every student from first click to visa stamp — no leaked threads, no dropped balls.",
        },
        {
          name: "Mentor Portal",
          description:
            "Advisors manage a live pipeline of mentees across cohorts, countries and application stages.",
        },
        {
          name: "Student Portal",
          description:
            "Students see the full roadmap — documents, deadlines, statuses, next action — in a single view.",
        },
      ],
    },
    lessons: [
      {
        title: "A startup is a team problem first, a product problem second.",
        body: "YOUGO closed because the team didn't hold. Unilinks works because this one does. Right market, right product, wrong team — nothing ships.",
      },
      {
        title: "AI-native workflow isn't a feature — it's a staffing decision.",
        body: "Claude Code at the centre of the loop let a four-person team ship what used to need twelve. We stopped hiring for throughput and started hiring for taste.",
      },
      {
        title: "Trust is the only moat that compounds.",
        body: "Families are handing us their child's future. Every UI decision, every email, every onboarding step is either earning that trust or quietly spending it.",
      },
    ],
    next: "classora",
  },

  classora: {
    slug: "classora",
    title: "Classora",
    category: "Classroom Management Platform",
    tagline:
      "The five-tool classroom mess, replaced by one connected system — four portals, one data model.",
    index: "02 / 05",
    liveUrl: "https://classora.co",
    liveLabel: "Visit classora.co",
    hero: {
      src: "/work/classora/1.png",
      alt: "Classora dashboard",
    },
    meta: [
      { label: "Role", value: "Founder & Product Lead" },
      { label: "Duration", value: "2025 — Present" },
      { label: "Team", value: "Solo — discovery to release" },
      { label: "Stack", value: "Next.js · Firebase · Claude Code" },
    ],
    pitch:
      "At Harbour.Space I was juggling Google Classroom, Slack, Discord, Notion and email for one Master's program. Classora collapses that stack into four connected portals — Student, Teacher, Institution, Platform Admin — sharing one data model. Assignments, grades, chat and announcements live under the same roof, scoped to the right role, visible to the right people. Beta shipped March 2026; 500+ classes created since. Built solo, from discovery to production.",
    gallery: [
      {
        src: "/work/classora/1.png",
        alt: "Classora dashboard — one view per role",
        caption:
          "Four portals, one data model — the real craft is the wiring, not the UI.",
      },
    ],
    stats: {
      label: "Scale",
      items: [
        { value: "500+", label: "Classes created" },
        { value: "4", label: "Connected portals" },
        { value: "Mar 2026", label: "Beta launched" },
        { value: "Solo", label: "Discovery to release" },
      ],
    },
    features: {
      label: "Four connected portals",
      items: [
        {
          name: "Student Portal",
          description:
            "Submit work, chat with teachers, see grades, track every class in one feed.",
        },
        {
          name: "Teacher Portal",
          description:
            "Create classes, grade work, broadcast announcements — one toolkit scoped per teacher.",
        },
        {
          name: "Institution Portal",
          description:
            "Admin, enrolment, program setup and reporting — the whole operation on one surface.",
        },
        {
          name: "Platform Admin",
          description:
            "Operate Classora across institutions — tenants, billing, health, abuse controls.",
        },
      ],
    },
    lessons: [
      {
        title: "Build what you'd open tomorrow.",
        body: "The products that last are the ones the builder would miss if they disappeared. I wrote the Classora brief as a student, not a founder.",
      },
      {
        title: "The craft is the wiring, not the UI.",
        body: "Four portals is a data-model problem dressed up as a design problem. Get the shared source of truth right and the interfaces design themselves.",
      },
    ],
    next: "norea-city",
  },

  "norea-city": {
    slug: "norea-city",
    title: "Norea City",
    category: "Riverside Real-Estate Flagship",
    tagline:
      "The first proper digital home for OCIC × Canadia Bank's 125-hectare riverside flagship in Phnom Penh.",
    index: "03 / 05",
    liveUrl: "https://norea.city",
    liveLabel: "Visit norea.city",
    hero: {
      src: "/work/norea-city/1.png",
      alt: "Norea City website",
    },
    meta: [
      { label: "Role", value: "Product Consultant & Builder" },
      { label: "Duration", value: "May 2026 — Present" },
      { label: "Client", value: "OCIC × Canadia Bank" },
      { label: "Stack", value: "Next.js · Figma · Claude Code" },
    ],
    pitch:
      "Phnom Penh's largest mixed-use riverside development — Norea Square, The Ground Market, the townhouse collection, 4.2 km of Koh Norea Parkway — had no proper web presence for its sales and leasing teams. I ran discovery workshops across OCIC and Canadia Bank, defined the information architecture and content model, then shipped design, engineering and deployment solo on an AI-assisted timeline. The sales and leasing teams now operate from a single source of truth.",
    gallery: [
      {
        src: "/work/norea-city/1.png",
        alt: "Norea City landing",
        caption:
          "The 125-hectare flagship, legible in one scroll — stakeholder-aligned, sales-team-ready.",
      },
    ],
    stats: {
      label: "Scope",
      items: [
        { value: "125 ha", label: "Mixed-use flagship" },
        { value: "4", label: "Core destinations" },
        { value: "Solo", label: "End-to-end delivery" },
        { value: "AI-assisted", label: "Build timeline" },
      ],
    },
    features: {
      label: "Four destinations, one city",
      items: [
        {
          name: "Norea Square",
          description:
            "The commercial heart of the development — retail, F&B and flagship anchor stores.",
        },
        {
          name: "The Ground Market",
          description:
            "Open-air retail and food — the daily social anchor of the neighbourhood.",
        },
        {
          name: "Townhouse Collection",
          description:
            "Residential offering with riverfront access and curated amenities.",
        },
        {
          name: "Koh Norea Parkway",
          description:
            "The 4.2 km riverfront spine — the walkable centre of the entire flagship.",
        },
      ],
    },
    lessons: [
      {
        title: "Enterprise clients fall in love with lean teams that ship carefully.",
        body: "The pitch wasn't the deck. It was shipping the first live link in weeks and letting the artifact do the talking.",
      },
      {
        title: "Information architecture is the real design work.",
        body: "On a 125-hectare property with four distinct destinations, the whole project rose or fell on the sitemap. Get the map right, and the pages write themselves.",
      },
    ],
    next: "startupack",
  },

  startupack: {
    slug: "startupack",
    title: "Startupack",
    category: "Productised Launch Studio",
    tagline:
      "Branding, cold-email, ads and lead-gen packaged into three fixed-price tiers — self-serve from pricing to launch.",
    index: "04 / 05",
    liveUrl: "https://startupack.biz",
    liveLabel: "Visit startupack.biz",
    hero: {
      src: "/work/startupack/1.png",
      alt: "Startupack platform",
    },
    meta: [
      { label: "Role", value: "Full-Stack Product Builder (Freelance)" },
      { label: "Duration", value: "2025 — Present" },
      { label: "Client", value: "Lisbon studio founders" },
      { label: "Stack", value: "Next.js · Firebase · Stripe" },
    ],
    pitch:
      "A Lisbon team had a productised service model but no self-serve surface. I built Startupack end-to-end: three fixed-price tiers packaged into a real buying flow, and a delivery pipeline that moves a client from pricing page → onboarding → shipped campaign without a sales call. Pricing here isn't a page; it's the architecture of the product.",
    gallery: [
      {
        src: "/work/startupack/1.png",
        alt: "Startupack tiers",
        caption:
          "Three packaged bets — the pricing structure IS the user experience.",
      },
    ],
    stats: {
      label: "Offering",
      items: [
        { value: "€599", label: "Starter" },
        { value: "€1,999", label: "Growth" },
        { value: "€4,999", label: "Scale" },
        { value: "Self-serve", label: "End-to-end" },
      ],
    },
    features: {
      label: "Three tiers, one buying flow",
      items: [
        {
          name: "Starter — €599",
          description:
            "Brand kit, one-page site, cold-email starter. Enough to earn the first ten customers.",
        },
        {
          name: "Growth — €1,999",
          description:
            "Multi-page site, ad creatives, lead-gen funnel. The full launch stack.",
        },
        {
          name: "Scale — €4,999",
          description:
            "Full brand, product site and ongoing campaign operations. Hands-off growth.",
        },
      ],
    },
    lessons: [
      {
        title: "Pricing isn't a page — it's the product.",
        body: "The tier structure IS the user experience. Get the tiers right and the rest of the funnel designs itself.",
      },
      {
        title: "Productise the service before you platform it.",
        body: "The team's deliverables were already repeatable; my job was to wrap them in a buying flow that let the service scale without a founder in every sales call.",
      },
    ],
    next: "unimate",
  },

  unimate: {
    slug: "unimate",
    title: "Unimate",
    category: "Immigration & Residency Companion",
    tagline:
      "Three tiers of help for international students landing in Barcelona — guided by someone who did it himself.",
    index: "05 / 05",
    liveUrl: "https://unimate.im",
    liveLabel: "Visit unimate.im",
    hero: {
      src: "/work/unimate/1.png",
      alt: "Unimate landing",
    },
    meta: [
      { label: "Role", value: "Founder & Product Lead" },
      { label: "Duration", value: "2025 — Present" },
      { label: "Team", value: "Solo" },
      { label: "Stack", value: "Next.js · Firebase · Claude Code" },
    ],
    pitch:
      "Moving to Barcelona as an international student is a second job — Empadronamiento, TIE, bank account, SIM card, apartment viewings, appointments in Catalan. Unimate ladders that pain into three service tiers: free step-by-step guides (Compass), 1:1 chat and calls (Companion), and in-person support from airport pickup onwards (Concierge). Built from six months of my own customer discovery.",
    gallery: [
      {
        src: "/work/unimate/1.png",
        alt: "Unimate — three tiers",
        caption:
          "Compass → Companion → Concierge — one companion, three depths.",
      },
    ],
    stats: {
      label: "Offering",
      items: [
        { value: "Compass", label: "Free guides" },
        { value: "Companion", label: "1:1 chat & calls" },
        { value: "Concierge", label: "In-person support" },
        { value: "Barcelona", label: "City of focus" },
      ],
    },
    features: {
      label: "Three tiers of help",
      items: [
        {
          name: "Compass — Free",
          description:
            "Step-by-step guides for every piece of Barcelona paperwork, written by someone who did it.",
        },
        {
          name: "Companion — 1:1",
          description:
            "Chat and calls to walk you through blockers in real time — for when the guide isn't enough.",
        },
        {
          name: "Concierge — In-person",
          description:
            "Airport pickup, appointment accompaniment, apartment viewings — for when you'd rather not do it alone.",
        },
      ],
    },
    lessons: [
      {
        title: "The product you'd use first is often the one nobody built yet.",
        body: "Unimate exists because I needed it. The customer discovery was my own last six months — I just wrote it down and productised it.",
      },
    ],
    next: "unilinks",
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies[slug];
}

export function getAllCaseStudySlugs(): string[] {
  return Object.keys(caseStudies);
}
