import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import {
  Accent,
  SectionChrome,
  SectionHeader,
} from "@/components/section-chrome";
import { WorkSection } from "@/components/work-section";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work by Mengkoung Key — seven ventures across EdTech, immigration, real-estate, launch services and F&B. Designed, built and shipped end-to-end.",
};

export default function WorkPage() {
  return (
    <>
      <section className="container-wide pt-16 md:pt-24 pb-4 md:pb-8">
        <Reveal>
          <SectionChrome label="Work" />
        </Reveal>

        <Reveal delay={0.05}>
          <SectionHeader
            heading={
              <>
                Things I&apos;ve<br />
                shipped<Accent>.</Accent>
              </>
            }
            description="Eight ventures over seven years — each one designed, built and shipped end-to-end. Filter by category or scroll the full catalogue."
            headingMax="18ch"
          />
        </Reveal>
      </section>

      <WorkSection />
    </>
  );
}
