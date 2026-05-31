import type { Metadata } from "next";
import { WritingList } from "./WritingList";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ARTICLES } from "@/lib/content";
import { SITE, url } from "@/lib/seo";

const description =
  "Essays and technical articles by Saheed Oladele across the stack: interfaces, services, infrastructure, and the engineering career that touches all of it. Published on Babbel, LeadDev, freeCodeCamp, Microverse, and Startup Grind.";

export const metadata: Metadata = {
  title: "Writing",
  description,
  alternates: {
    canonical: "/writing",
    types: {
      "application/rss+xml": [
        { url: "/writing/feed.xml", title: `${SITE.shortName} — Writing` },
      ],
    },
  },
  openGraph: {
    type: "website",
    title: `Writing · ${SITE.shortName}`,
    description,
    url: url("/writing"),
    images: [{ url: "/og-writing.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing · ${SITE.shortName}`,
    description,
    images: ["/og-writing.png"],
  },
};

export default function WritingPage() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url("/writing#collection"),
    url: url("/writing"),
    name: `Writing · ${SITE.shortName}`,
    description,
    inLanguage: SITE.language,
    isPartOf: { "@id": url("/#website") },
    author: { "@id": url("/#person") },
    hasPart: ARTICLES.map((a) => ({
      "@type": "Article",
      headline: a.title,
      url: a.external ? a.url : url(`/writing/${a.slug}`),
      datePublished: a.date,
      author: { "@id": url("/#person") },
      publisher: a.publisher,
      keywords: a.topics.join(", "),
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Writing", path: "/writing" },
        ]}
      />
      <JsonLd data={collection} />
      <section className="about-hero wrap">
        <div className="content">
          <div
            className="meta section-kicker"
            style={{ color: "var(--accent-ink)" }}
          >
            Writing
          </div>
          <h1 className="detail-title" style={{ maxWidth: "22ch" }}>
            Essays and technical articles.
          </h1>
          <p className="detail-dek">
            Notes from across the stack: interfaces, services, the
            infrastructure beneath them, the career that leads through them,
            and where software is going next. Published on Babbel, LeadDev,
            freeCodeCamp, Microverse, and Startup Grind.
          </p>
        </div>
      </section>

      <section className="page-pad wrap">
        <WritingList />
      </section>
    </>
  );
}
