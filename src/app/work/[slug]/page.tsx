import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  CaseStudyBack,
  CaseStudyFeatures,
  CaseStudyGallery,
  CaseStudyHero,
  CaseStudyLessons,
  CaseStudyNext,
  CaseStudyPitch,
  CaseStudySection,
  ImpactStats,
  MetaGrid,
} from "@/components/case-study";
import { caseStudies, getAllCaseStudySlugs } from "@/lib/case-studies";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) {
    return { title: "Case study not found" };
  }
  return {
    title: `${data.title} — ${data.category}`,
    description: data.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = caseStudies[slug];
  if (!data) notFound();

  const next = caseStudies[data.next];

  return (
    <>
      <CaseStudyBack />

      <CaseStudyHero
        index={data.index}
        title={data.title}
        category={data.category}
        tagline={data.tagline}
        liveUrl={data.liveUrl}
        liveLabel={data.liveLabel}
        hero={data.hero}
      />

      <section className="container-wide mt-12 md:mt-16">
        <MetaGrid items={data.meta} />
      </section>

      <CaseStudyPitch>{data.pitch}</CaseStudyPitch>

      {data.gallery && data.gallery.length > 0 && (
        <CaseStudyGallery images={data.gallery} />
      )}

      {data.features && data.features.items.length > 0 && (
        <CaseStudyFeatures
          label={data.features.label}
          items={data.features.items}
        />
      )}

      {data.stats && (
        <CaseStudySection label={data.stats.label ?? "Impact"}>
          <ImpactStats items={data.stats.items} />
        </CaseStudySection>
      )}

      {data.lessons && data.lessons.length > 0 && (
        <CaseStudyLessons items={data.lessons} />
      )}

      {next && (
        <CaseStudyNext
          slug={next.slug}
          title={next.title}
          category={next.category}
        />
      )}
    </>
  );
}
