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
      "Chasing a degree abroad is a twenty-tool obstacle course. Unilinks collapses it into five connected products — scaled to 1,000+ students and 59 university partners by a lean team on an AI-native workflow.",
    tags: ["EdTech", "SaaS", "Full-Stack", "Co-founder"],
    years: "Sep 2023 — Present",
    role: "Chief Product Officer & Co-founder",
    href: "https://unilinks.co",
    hasCaseStudy: true,
    device: "desktop",
  },
  {
    slug: "classora",
    index: "02",
    title: "Classora",
    category: "Classroom Management Platform",
    categories: ["Product", "EdTech"],
    description:
      "Four classroom tools replaced by one connected system. Student, Teacher, Institution and Platform Admin portals, all sharing one data model. 500+ classes since Beta — built solo from discovery to production.",
    tags: ["EdTech", "Product Management", "Full-Stack", "Founder"],
    years: "2025 — Present",
    role: "Founder & Product Lead",
    href: "https://classora.co",
    hasCaseStudy: true,
    device: "desktop",
  },
  {
    slug: "norea-city",
    index: "03",
    title: "Norea City",
    category: "Riverside Real-Estate Flagship",
    categories: ["Product", "Design"],
    description:
      "The first proper web presence for OCIC × Canadia Bank's 125-hectare riverside flagship in Phnom Penh. Discovery workshops, information architecture, design, engineering and deployment — shipped solo on an AI-assisted timeline.",
    tags: ["Real Estate", "Product Design", "Full-Stack", "Branding"],
    years: "May 2026 — Present",
    role: "Product Consultant & Builder",
    href: "https://norea.city",
    hasCaseStudy: true,
    device: "desktop",
  },
  {
    slug: "startupack",
    index: "04",
    title: "Startupack",
    category: "Productised Launch Studio",
    categories: ["Product", "Design", "Consumer"],
    description:
      "Branding, cold-email, ads and lead-gen packaged into three fixed-price tiers — €599 / €1,999 / €4,999. Self-serve from pricing page to shipped campaign, built end-to-end for a Lisbon studio.",
    tags: ["SaaS", "Product Design", "Full-Stack", "Freelance"],
    years: "2025 — Present",
    role: "Full-Stack Product Builder",
    href: "https://startupack.biz",
    hasCaseStudy: true,
    device: "desktop",
  },
  {
    slug: "unimate",
    index: "05",
    title: "Unimate",
    category: "Immigration & Residency Companion",
    categories: ["Product", "Consumer"],
    description:
      "Three tiers of help for international students landing in Barcelona — free guides (Compass), 1:1 chat (Companion), in-person support (Concierge). Built from six months of my own paperwork.",
    tags: ["Community", "Product Design", "Full-Stack", "Founder"],
    years: "2025 — Present",
    role: "Founder & Product Lead",
    href: "https://unimate.im",
    hasCaseStudy: true,
    device: "mobile",
  },
  {
    slug: "tenh-te",
    index: "06",
    title: "Tenh.Te",
    category: "One-Stop Shopping App",
    categories: ["Product", "E-commerce", "Consumer"],
    description:
      "A one-stop shopping app for Thailand — founded with a small team, led operations, sales and marketing. Where I first learned growth, logistics and the gap between a nice idea and a user who actually shows up.",
    tags: ["E-commerce", "Consumer", "Growth", "Founding Team"],
    years: "2021 — 2023",
    role: "Founding Lead",
    device: "mobile",
  },
  {
    slug: "chamnis-eye",
    index: "07",
    title: "Chamni's Eye",
    category: "Commercial Design Work",
    categories: ["Design"],
    description:
      "Commercial posters, campaign artwork and social collateral for Thai brand clients. Adobe Illustrator, deadline-driven, print-ready — my first paid design work in Bangkok.",
    tags: ["Graphic Design", "Illustrator", "Brand", "Freelance"],
    years: "2023 — 2024",
    role: "Graphic Designer",
    device: "desktop",
  },
  {
    slug: "kokoro",
    index: "08",
    title: "Kokoro Izakaya",
    category: "Japanese Restaurant & Bar",
    categories: ["F&B", "Consumer"],
    description:
      "Opened a Japanese izakaya in Bangkok at 20 — through the pandemic. Marketing, supply chain and operations end-to-end. Six months taught me more about running things than any class ever did.",
    tags: ["F&B", "Operations", "Digital Marketing", "Owner"],
    years: "2020 — 2021",
    role: "Owner & Marketing Manager",
    device: "desktop",
  },
];

export type FeaturedSlide = {
  name: string;
  image?: string;
};

export type FeaturedBrand = {
  /** panel background color (CSS color string) */
  bg: string;
  /** "light" = light bg + dark text; "dark" = dark bg + light text */
  mode: "light" | "dark";
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
  /** brand palette for the featured-work slide */
  brand?: FeaturedBrand;
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
    year: "2018",
    title: "Arrived in Bangkok",
    body: "Left Cambodia at 18 with a D grade and zero English. Got lost at Suvarnabhumi for three hours. Started a Bachelor's in Entrepreneurship at UTCC on a 50% scholarship.",
  },
  {
    year: "2019",
    title: "International exposure",
    body: "Training programs in Prague (VŠFS), Germany (HdWM Mannheim) and Taiwan (Shih Chien) on business, entrepreneurship and design thinking. First time I saw the world was bigger than I thought.",
  },
  {
    year: "2019",
    title: "KPMG & UTCCiSM awards",
    body: "Top 10 in the KPMG Business Research Competition. Top 4 Most Distinguished Wolf of UTCCiSM. Best Performance in Principles of Marketing.",
  },
  {
    year: "2020",
    title: "Kokoro Izakaya",
    body: "Opened a Japanese restaurant in Bangkok as Owner & Marketing Manager — through a pandemic. Learned operations, supply chain and user feedback the hard way.",
  },
  {
    year: "2021",
    title: "Leadership transformation",
    body: "Completed Dr. Jakarin Srimoon's leadership course — Harvard Business School's Erhard–Jensen ontological model. Changed how I show up in the world.",
  },
  {
    year: "2021",
    title: "Newcastle × AustCham",
    body: "Earned the Professionalism Under Pressure, Sustainability & SDGs certificate from Newcastle Australia × AustCham Thailand.",
  },
  {
    year: "2022",
    title: "Bachelor's graduation",
    body: "Finished my BBA in Entrepreneurship & Innovation at UTCC, Bangkok — Second Class Honours, GPA 3.30.",
  },
  {
    year: "2023",
    title: "Co-founded Unilinks",
    body: "Started Unilinks Global Education with Aung Kaung Pyae, Ngu Wah Aung and Nyi Myat — the right team, finally. Took the COO seat.",
  },
  {
    year: "2023",
    title: "Harbour.Space Bangkok",
    body: "Won a 70% scholarship into Harbour.Space × UTCC's Master's in Digital Marketing. Co-founded YOUGO on the side with ฿100,000 from Bgrim.",
  },
  {
    year: "2024",
    title: "Master's in Digital Marketing",
    body: "Graduated the Harbour.Space × UTCC dual Master's (GPA 3.48). Shut YOUGO down cleanly — returned every baht to Bgrim and Harbour.Space.",
  },
  {
    year: "2025",
    title: "Barcelona, new ventures",
    body: "100% scholarship from Harbour.Space Barcelona for a Master's in Product Management. Founded Classora and Unimate. Started as freelance Full-Stack Builder for Startupack (Lisbon).",
  },
  {
    year: "2026",
    title: "Highest GPA & Norea City",
    body: "Graduated Harbour.Space Barcelona with the Highest GPA (3.98) in the Batch of 2026. Started as Product Consultant for Norea City — OCIC × Canadia Bank. Scaled Unilinks 2.0 to 1,000+ students and 59 university partners.",
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
  attribution: "Mengkoung Key · Co-founder, Unilinks & Classora",
};

export const missionQuote = {
  text: "I'm an AI product builder — carrying one craft wherever a hard problem is worth solving.",
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
    title: "AI & Engineering",
    description:
      "Full-stack with an AI-native workflow — turning months of build time into days by pairing Claude Code with modern web stacks on real projects.",
    skills: [
      "Claude Code",
      "Anthropic & OpenAI APIs",
      "Prompt Engineering",
      "LLM-Native UX",
      "Next.js & React",
      "TypeScript",
      "Firebase & REST APIs",
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
