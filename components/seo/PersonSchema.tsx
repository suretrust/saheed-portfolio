import { JsonLd } from "./JsonLd";
import { SITE, SITE_URL, url } from "@/lib/seo";

/**
 * Person schema describing Saheed. Emitted globally so every page can be
 * traced back to the same Person entity via @id.
 */
export function PersonSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": url("/#person"),
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE_URL,
    image: url(SITE.defaultOgImage),
    jobTitle: SITE.jobTitle,
    description: SITE.tagline,
    sameAs: SITE.sameAs,
    knowsAbout: SITE.expertise,
    worksFor: {
      "@type": "Organization",
      name: SITE.employer.name,
      url: SITE.employer.url,
    },
    affiliation: {
      "@type": "EducationalOrganization",
      name: SITE.teachingAt.name,
      url: SITE.teachingAt.url,
    },
    knowsLanguage: ["en", "de"],
  };
  return <JsonLd data={data} />;
}
