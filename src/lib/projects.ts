import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import type { FeaturedWork } from "./content";

const COLLECTION = "featuredWork";

export const SEED_PROJECTS: FeaturedWork[] = [
  {
    slug: "unilinks",
    index: "01",
    title: "Unilinks",
    category: "Global Education Ecosystem",
    years: "Since 2023",
    role: "Co-founder · Designed, architected & built end-to-end",
    lede: "A global education platform helping international students find and apply to universities across Asia and Europe.",
    body: "I co-founded Unilinks in 2023 and built the full stack — the marketplace, the University CMS, our internal CRM, and the Mentor and Student portals.",
    traction: "1,000+ students · 59 university partners · AI-native workflow",
    href: "https://unilinks.co",
    external: true,
    slides: [
      { name: "Unilinks.co", image: "/work/unilinks/1.png" },
      { name: "University CMS" },
      { name: "Unilinks CRM" },
      { name: "Mentor Portal" },
      { name: "Student Portal" },
    ],
    tags: ["Education", "Product Design", "Product Management", "Full-Stack", "Testing"],
    brand: { bg: "#B9EBD6", mode: "light" },
  },
  {
    slug: "startupack",
    index: "02",
    title: "Startupack",
    category: "Startup Launch Studio",
    years: "2025",
    role: "Freelance full-stack builder",
    lede: "A Lisbon studio that ships startup brand, website and go-to-market as fixed-price packages.",
    body: "Built by the teams behind sendXmail, ZOPPLY and HOTLeads. I was hired as their full-stack builder to turn their productized service into a real platform — from the marketing site to the delivery flow.",
    traction: "€599 Starter · €1,999 Growth · €4,999 Scale",
    href: "https://startupack.biz",
    external: true,
    slides: [
      { name: "Startupack.biz", image: "/work/startupack/1.png" },
      { name: "Growth" },
      { name: "Scale" },
    ],
    tags: ["SaaS", "Product Design", "Full-Stack", "Frontend", "Integrations"],
    brand: { bg: "#E63946", mode: "dark" },
  },
  {
    slug: "classora",
    index: "03",
    title: "Classora",
    category: "Classroom Management Platform",
    years: "Since 2025",
    role: "Founder · Designed, architected & built end-to-end",
    lede: "A classroom management platform that replaces the five separate tools most schools duct-tape together.",
    body: "I founded Classora in 2025 and built four connected portals — for students, teachers, institutions and platform admins — with auto-graded assignments, per-class chat and an AI study assistant.",
    traction: "500+ classes created · Beta launched March 2026",
    href: "https://classora.co",
    external: true,
    slides: [
      { name: "Classora.co", image: "/work/classora/1.png" },
      { name: "Student" },
      { name: "Teacher" },
      { name: "Institution" },
      { name: "Platform Admin" },
    ],
    tags: ["EdTech", "Product Design", "Product Management", "Full-Stack", "AI"],
    brand: { bg: "#DCE4FF", mode: "light" },
  },
  {
    slug: "unimate",
    index: "04",
    title: "Unimate",
    category: "Student Immigration Companion",
    years: "Since 2025",
    role: "Founder · Designed, architected & built end-to-end",
    lede: "A guide and support service for international students moving to Barcelona — Empadronamiento, TIE, residency renewals, return permits.",
    body: "I founded and built Unimate end-to-end in 2025, structured as three tiers: free step-by-step guides (Compass), 1:1 chat and calls (Companion), and in-person help from airport pickup onwards (Concierge).",
    traction: "Built by international students, for international students",
    href: "https://unimate.im",
    external: true,
    slides: [
      { name: "Unimate.im", image: "/work/unimate/1.png" },
      { name: "Compass" },
      { name: "Companion" },
      { name: "Concierge" },
    ],
    tags: ["Community", "Product Design", "Product Management", "Full-Stack", "Operations"],
    brand: { bg: "#F97316", mode: "dark" },
  },
  {
    slug: "norea-city",
    index: "05",
    title: "Norea City",
    category: "Digital Home for Phnom Penh's Riverside",
    years: "2026",
    role: "Product builder for OCIC · Canadia Bank",
    lede: "The digital home for a 125-hectare mixed-use riverside development in Phnom Penh.",
    body: "OCIC and Canadia Bank hired me in 2026 to design and build the marketing platform from scratch — giving their sales and leasing teams their first proper online presence for Norea Square, The Ground Market, the townhouses and the 4.2-km Koh Norea Parkway.",
    href: "https://norea.city",
    external: true,
    slides: [
      { name: "Norea.city", image: "/work/norea-city/1.png" },
      { name: "Norea Square" },
      { name: "The Ground Market" },
      { name: "Townhouse Collection" },
      { name: "Koh Norea Parkway" },
    ],
    tags: ["Real Estate", "Product Design", "Full-Stack", "Branding", "SEO"],
    brand: { bg: "#1F2E24", mode: "dark" },
  },
];

export type ProjectDoc = FeaturedWork & { order: number };

function toDoc(project: FeaturedWork, order: number): ProjectDoc {
  return { ...project, order };
}

function withSeedBrand(project: FeaturedWork): FeaturedWork {
  if (project.brand) return project;
  const seed = SEED_PROJECTS.find((p) => p.slug === project.slug);
  return seed?.brand ? { ...project, brand: seed.brand } : project;
}

export async function getFeaturedWork(): Promise<FeaturedWork[]> {
  try {
    const q = query(collection(db, COLLECTION), orderBy("order", "asc"));
    const snap = await getDocs(q);
    if (snap.empty) return SEED_PROJECTS;
    return snap.docs.map((d) => {
      const { order: _order, ...rest } = d.data() as ProjectDoc;
      return withSeedBrand(rest as FeaturedWork);
    });
  } catch {
    return SEED_PROJECTS;
  }
}

export async function getProjectBySlug(
  slug: string,
): Promise<FeaturedWork | null> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, slug));
    if (snap.exists()) {
      const { order: _order, ...rest } = snap.data() as ProjectDoc;
      return rest as FeaturedWork;
    }
  } catch {
    /* fall through to seed */
  }
  return SEED_PROJECTS.find((p) => p.slug === slug) ?? null;
}

export async function saveProject(project: FeaturedWork, order: number) {
  await setDoc(doc(db, COLLECTION, project.slug), toDoc(project, order));
}

export async function saveProjectOrder(slugs: string[]) {
  const batch = writeBatch(db);
  slugs.forEach((slug, order) => {
    batch.update(doc(db, COLLECTION, slug), { order });
  });
  await batch.commit();
}

export async function seedFromCode() {
  const batch = writeBatch(db);
  SEED_PROJECTS.forEach((p, i) => {
    batch.set(doc(db, COLLECTION, p.slug), toDoc(p, i));
  });
  await batch.commit();
}
