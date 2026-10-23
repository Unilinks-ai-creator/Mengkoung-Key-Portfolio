import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = "siteConfig";

export type AboutData = {
  name: string;
  role: string;
  location: string;
  tagline: string;
  bio: string;
  currentlyBuilding: string;
  avatarUrl: string;
};

export type ContactData = {
  email: string;
  linkedin: string;
  x: string;
  github: string;
  calendar: string;
};

export const DEFAULT_ABOUT: AboutData = {
  name: "Mengkoung Key",
  role: "Product Builder & Entrepreneur",
  location: "Barcelona",
  tagline: "Building products across education, technology and digital experiences.",
  bio: "",
  currentlyBuilding: "",
  avatarUrl: "",
};

export const DEFAULT_CONTACT: ContactData = {
  email: "info@unilinks.co",
  linkedin: "",
  x: "",
  github: "",
  calendar: "",
};

export async function getAbout(): Promise<AboutData> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, "about"));
    if (snap.exists()) return { ...DEFAULT_ABOUT, ...(snap.data() as Partial<AboutData>) };
  } catch {
    /* fall through */
  }
  return DEFAULT_ABOUT;
}

export async function saveAbout(data: AboutData) {
  await setDoc(doc(db, COLLECTION, "about"), data);
}

export async function getContact(): Promise<ContactData> {
  try {
    const snap = await getDoc(doc(db, COLLECTION, "contact"));
    if (snap.exists()) return { ...DEFAULT_CONTACT, ...(snap.data() as Partial<ContactData>) };
  } catch {
    /* fall through */
  }
  return DEFAULT_CONTACT;
}

export async function saveContact(data: ContactData) {
  await setDoc(doc(db, COLLECTION, "contact"), data);
}
