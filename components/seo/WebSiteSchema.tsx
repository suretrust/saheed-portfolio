import { JsonLd } from "./JsonLd";
import { SITE, SITE_URL, url } from "@/lib/seo";

export function WebSiteSchema() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": url("/#website"),
      url: SITE_URL,
      name: SITE.shortName,
      description: SITE.description,
      inLanguage: SITE.language,
      publisher: { "@id": url("/#person") },
      // No site-search yet; potentialAction omitted on purpose.
    },
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "@id": url("/#profilepage"),
      url: SITE_URL,
      name: `${SITE.name} · ${SITE.jobTitle}, Writer, Lecturer`,
      mainEntity: { "@id": url("/#person") },
      isPartOf: { "@id": url("/#website") },
    },
  ];
  return <JsonLd data={data} />;
}
