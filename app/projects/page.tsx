import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/content";
import { SITE, url } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";

const description =
  "Projects by Saheed Oladele: Chowpool (a group-buying platform for Nigerian groceries) and the UE Frontend Programming course portal.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    title: `Projects · ${SITE.shortName}`,
    description,
    url: url("/projects"),
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Projects · ${SITE.shortName}`,
    description,
  },
};

export default function ProjectsPage() {
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url("/projects#collection"),
    url: url("/projects"),
    name: `Projects · ${SITE.shortName}`,
    description,
    inLanguage: SITE.language,
    isPartOf: { "@id": url("/#website") },
    author: { "@id": url("/#person") },
    hasPart: PROJECTS.map((p) => ({
      "@type": "CreativeWork",
      name: p.name,
      description: p.blurb,
      url: p.liveUrl || url(`/projects/${p.slug}`),
      keywords: p.stack.join(", "),
    })),
  };

  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />
      <JsonLd data={collection} />
      <section className="about-hero wrap">
        <div className="content">
          <div
            className="meta section-kicker"
            style={{ color: "var(--accent-ink)" }}
          >
            Projects
          </div>
          <h1 className="detail-title" style={{ maxWidth: "20ch" }}>
            Things I&apos;ve built, in code and beyond it.
          </h1>
          <p className="detail-dek">
            A working list of the projects I&apos;m happiest to show. Different
            surfaces, same instinct: make something dense legible to more
            people.
          </p>
        </div>
      </section>

      <section className="page-pad wrap" data-reveal>
        <div className="proj-grid" data-reveal-stagger>
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </>
  );
}
