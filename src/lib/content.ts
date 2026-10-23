export type ProjectCategory =
  | "Product"
  | "EdTech"
  | "Consumer"
  | "E-commerce"
  | "F&B"
  | "Design";

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  categories: ProjectCategory[];
  description: string;
  tags: string[];
  years: string;
  role: string;
  href?: string;
  hasCaseStudy?: boolean;
  device?: "desktop" | "mobile";
};

export const projects: Project[] = [
  {
    slug: "unilinks",
    index: "01",
    title: "Unilinks",
    category: "Global Education Platform",
    categories: ["Product", "EdTech"],
    description:
      "A technology-enabled platform connecting international students with universities and scholarships. Grew from 0 to 150+ enrolled students; launched Unilinks 2.0 in 2026.",
    tags: ["Product", "Platform", "SaaS", "Founding team"],
    years: "2023 — Present",
    role: "Co-founder & COO",
    hasCaseStudy: true,
    device: "desktop",
  },
  {
    slug: "linky",
    index: "02",
    title: "Linky",
    category: "Student Community App",
    categories: ["Product", "Design"],
    description:
      "A community platform connecting international students to people, events and opportunities beyond academics.",
    tags: ["Community", "Mobile App", "Product Design"],
    years: "2023 — Present",
    role: "Product Manager",
    hasCaseStudy: true,
    device: "mobile",
  },
  {
    slug: "tenh-te",
    index: "03",
    title: "Tenh.Te",
    category: "E-commerce Application",
    categories: ["Product", "E-commerce", "Consumer"],
    description:
      "A one-stop shopping application in Thailand — leading operations, sales and marketing as founding leader.",
    tags: ["E-commerce", "Consumer", "Growth"],
    years: "2021 — Present",
    role: "Founding Lead",
    device: "mobile",
  },
  {
    slug: "classora",
    index: "04",
    title: "Classora",
    category: "Classroom Management Platform",
    categories: ["Product", "EdTech"],
    description:
      "A modern classroom management platform born from the frustration of using five separate tools for assignments, grades, chat and announcements at Harbour.Space.",
    tags: ["EdTech", "Web App", "Founder"],
    years: "2025 — Present",
    role: "Founder & Developer",
    device: "desktop",
  },
  {
    slug: "kokoro",
    index: "05",
    title: "Kokoro Izakaya",
    category: "Japanese Restaurant & Bar",
    categories: ["F&B", "Consumer"],
    description:
      "Owned and operated a Japanese restaurant in Bangkok — running supply chain and full digital marketing during the pandemic.",
    tags: ["F&B", "Operations", "Digital Marketing"],
    years: "2020 — 2021",
    role: "Owner & Marketing Manager",
    device: "desktop",
  },
];

export type FeaturedSlide = {
  name: string;
  image?: string;
};

export type FeaturedWork = {
  slug: string;
  index: string;
  title: string;
  category: string;
  years: string;
  role: string;
  /** one-sentence pitch — what the product is */
  lede: string;
  /** 1-2 sentences — what I built and my role */
  body: string;
  /** optional small-caps line for stats / scope */
  traction?: string;
  href: string;
  external?: boolean;
  slides: FeaturedSlide[];
  /** short chips shown on the card footer */
  tags?: string[];
};

// featuredWork now lives in Firestore. See src/lib/projects.ts for the seed data
// and the read/write helpers. Edit via /admin.

export type LogoItem = {
  name: string;
  logo: string;
  note?: string;
  /** wrap in a dark chip — for logos designed for dark backgrounds */
  dark?: boolean;
  /** render in natural colors (skip the mono invert) — for self-contained badge logos */
  natural?: boolean;
  /** for icon-only marks: render this text next to the icon so the brand name is visible */
  wordmark?: string;
};

export const experience: LogoItem[] = [
  {
    name: "Unilinks.co",
    logo: "/logos/unilinks.png",
    wordmark: "Unilinks.co",
    note: "Co-founder & COO — 2023 to present",
  },
  {
    name: "Classora",
    logo: "/logos/classora.png",
    wordmark: "Classora",
    note: "Founder — 2025 to present",
  },
  {
    name: "Norea City",
    logo: "/logos/norea.png",
    note: "Product builder for OCIC · Canadia Bank — 2026",
  },
  {
    name: "Unimate",
    logo: "/logos/unimate.png",
    note: "Founder — 2025 to present",
  },
  {
    name: "Startupack",
    logo: "/logos/startupack.png",
    note: "Full-stack builder — 2025",
  },
  {
    name: "KPMG",
    logo: "/logos/kpmg.svg",
    note: "Top 10 · business research competition, 2019",
  },
  {
    name: "Chamni's Eye",
    logo: "/logos/chamnis-eye.svg",
    note: "Graphic design internship, Bangkok",
  },
  {
    name: "Production House Asia",
    logo: "/logos/production-house-asia.png",
    note: "Digital marketing internship, Bangkok",
  },
  {
    name: "AustCham Thailand",
    logo: "/logos/austcham.png",
    note: "Sustainability & SDGs program with Newcastle Australia, 2021",
  },
  {
    name: "Canadia Bank",
    logo: "/logos/canadia-bank.png",
  },
];

export const education: LogoItem[] = [
  {
    name: "Harbour.Space University",
    logo: "/logos/harbour-space.png",
    note: "Master's, Digital Marketing — Barcelona / Bangkok",
  },
  {
    name: "UTCC",
    logo: "/logos/utcc.png",
    note: "Bachelor's, Entrepreneurship & Innovation — Bangkok",
  },
  {
    name: "Shih Chien University",
    logo: "/logos/shih-chien.png",
    note: "Asia Summer University — Taiwan, 2019",
  },
  {
    name: "HdWM Mannheim",
    logo: "/logos/hdwm.png",
    note: "European Business Cultures — Germany, 2019",
  },
  {
    name: "VŠFS Prague",
    logo: "/logos/vsfs.png",
    note: "Business Management & Corporate Finance — Czechia, 2018",
  },
  {
    name: "University of Newcastle Australia",
    logo: "/logos/newcastle.png",
    note: "Sustainability & SDGs program, 2021",
  },
];

export type TimelineItem = {
  year: string;
  title: string;
  body: string;
};

export const timeline: TimelineItem[] = [
  {
    year: "2019",
    title: "International exposure",
    body: "Top 10 in the KPMG business research competition. Training programs in Prague, Germany and Taiwan on business, entrepreneurship and design thinking.",
  },
  {
    year: "2020",
    title: "F&B and marketing",
    body: "Opened Kokoro Izakaya, a Japanese restaurant in Bangkok, running supply chain and digital marketing through the pandemic.",
  },
  {
    year: "2021",
    title: "E-commerce",
    body: "Founded Tenh.Te, a one-stop shopping app in Thailand — leading operations, sales and marketing.",
  },
  {
    year: "2022",
    title: "Graduation",
    body: "Finished my Bachelor's in Entrepreneurship & Innovation at UTCC, Bangkok — Second Class Honors, GPA 3.3.",
  },
  {
    year: "2023",
    title: "Unilinks",
    body: "Co-founded Unilinks Global Education with Aung Kaung Pyae, Ngu Wah Aung and Angela — a platform helping international students study abroad.",
  },
  {
    year: "2024",
    title: "Master's in Digital Marketing",
    body: "Graduated from the Harbour.Space × UTCC dual Master's program in Digital Marketing (GPA 3.48).",
  },
  {
    year: "2025",
    title: "Classora",
    body: "Founded Classora — a classroom management platform, built from the fragmentation I felt as a student.",
  },
  {
    year: "2026",
    title: "Barcelona",
    body: "Studying Product Management at Harbour.Space Barcelona. Unilinks 2.0 launched. Exploring AI × Product.",
  },
];

export const drivers = [
  {
    title: "Building products",
    body: "Turn complex problems into simple, shipped solutions.",
  },
  {
    title: "Learning by shipping",
    body: "Every venture teaches me something the last one couldn't.",
  },
  {
    title: "Creating opportunity",
    body: "Education, business and technology as levers for people who don't have them.",
  },
  {
    title: "Cambodia",
    body: "Contributing to my country's development is the long-term why.",
  },
];

export const values = [
  "Curiosity",
  "Ownership",
  "Craft",
  "Systems thinking",
  "Impact",
  "Learning",
  "Building",
];

export const diamondQuote = {
  text: "Whatever we failed at, we learned from it, and we fought through it.",
  attribution: "Harbour.Space Graduating Class 2024",
};

export const missionQuote = {
  text: "I am a Cambodian committed to developing Cambodia into a developed country within 10 years.",
  attribution: "Personal mission",
};

export type SkillGroup = {
  title: string;
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Product & Strategy",
    description:
      "Turning ambiguous problems into shipped products across five ventures — and now formally as a PM at Harbour.Space Barcelona.",
    skills: [
      "Product Strategy",
      "Product Management",
      "Discovery & Research",
      "Roadmapping",
      "MVP Definition",
      "Systems Thinking",
      "Product Analytics",
    ],
  },
  {
    title: "Marketing & Growth",
    description:
      "Master's in Digital Marketing (Harbour.Space × UTCC). Ran growth for e-commerce, F&B and education ventures.",
    skills: [
      "Digital Marketing Strategy",
      "Sales",
      "Marketing Automation",
      "Content & Social Media",
      "Lead Generation",
      "Brand Building",
      "GA4 & Data Collection",
    ],
  },
  {
    title: "Design",
    description:
      "Comfortable moving from Figma to Illustrator — designing product interfaces, brand systems and campaign artwork.",
    skills: [
      "Product Design",
      "UX / UI",
      "Brand Design",
      "Graphic Design",
      "Adobe Illustrator",
      "Figma",
    ],
  },
  {
    title: "Business & Operations",
    description:
      "Six years of running things end-to-end — logistics, supply chain, partnerships and team leadership.",
    skills: [
      "Business Negotiation",
      "Operations",
      "Supply Chain & Logistics",
      "Partnerships",
      "Team Leadership",
      "Fundraising Readiness",
    ],
  },
  {
    title: "Tools",
    description: "Day-to-day toolkit across product, marketing and design.",
    skills: [
      "Figma",
      "Notion",
      "Linear",
      "GA4",
      "Meta Ads",
      "Adobe Illustrator",
      "Airtable",
      "Webflow",
    ],
  },
];

export const languages = [
  { name: "Khmer", level: "Native" },
  { name: "Chinese", level: "Business communication" },
  { name: "English", level: "Professional (IELTS 6)" },
  { name: "Thai", level: "Conversational" },
  { name: "Spanish", level: "Learning" },
];
