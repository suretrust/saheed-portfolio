import { JsonLd } from "./JsonLd";
import { SITE, url } from "@/lib/seo";
import type { Project } from "@/lib/content";

/**
 * Emits CreativeWork for any project, plus a Course override for the UE
 * frontend portal — that's a real Course, not just a CreativeWork.
 */
export function ProjectSchema({ project }: { project: Project }) {
  const slug = project.slug;
  const pageUrl = url(`/projects/${slug}`);
  const image = project.cover
    ? url(project.cover.src)
    : url(SITE.defaultOgImage);

  const base = {
    "@type": "CreativeWork",
    "@id": url(`/projects/${slug}#project`),
    name: project.name,
    headline: project.name,
    description: project.blurb,
    abstract: project.overview || project.blurb,
    creator: { "@id": url("/#person") },
    author: { "@id": url("/#person") },
    inLanguage: SITE.language,
    keywords: project.stack.join(", "),
    url: project.liveUrl || pageUrl,
    mainEntityOfPage: pageUrl,
    image,
    isAccessibleForFree: true,
    dateCreated: project.year.replace(/[^\d]/g, "").slice(0, 4),
  };

  // UE Frontend is a real course — add Course schema alongside CreativeWork.
  if (slug === "ue-frontend-2026") {
    const course = {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": url(`/projects/${slug}#course`),
      name: "Frontend Programming",
      description: project.blurb,
      provider: {
        "@type": "EducationalOrganization",
        name: SITE.teachingAt.name,
        url: SITE.teachingAt.url,
      },
      instructor: { "@id": url("/#person") },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "blended",
        courseSchedule: "Saturdays · 2026",
        instructor: { "@id": url("/#person") },
      },
      url: project.liveUrl || pageUrl,
      inLanguage: SITE.language,
    };
    return (
      <JsonLd
        data={[{ "@context": "https://schema.org", ...base }, course]}
      />
    );
  }

  // Chowpool ships as both CreativeWork and SoftwareApplication.
  if (slug === "chowpool") {
    const app = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": url(`/projects/${slug}#softwareapplication`),
      name: project.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: project.blurb,
      url: project.liveUrl,
      author: { "@id": url("/#person") },
      inLanguage: SITE.language,
      offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
    };
    return (
      <JsonLd
        data={[{ "@context": "https://schema.org", ...base }, app]}
      />
    );
  }

  return <JsonLd data={{ "@context": "https://schema.org", ...base }} />;
}
