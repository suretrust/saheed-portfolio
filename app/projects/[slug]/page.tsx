import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/lib/content";
import { SITE, url } from "@/lib/seo";
import { ProjectSchema } from "@/components/seo/ProjectSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) return {};

  const canonical = url(`/projects/${slug}`);
  // OG image comes from opengraph-image.tsx co-located in this route.
  return {
    title: p.name,
    description: p.blurb,
    keywords: p.stack,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${p.name} · ${SITE.shortName}`,
      description: p.blurb,
      url: canonical,
      tags: p.stack,
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} · ${SITE.shortName}`,
      description: p.blurb,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();

  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 2);
  const href = p.liveUrl || p.href || "#";
  const mobileShots = (p.gallery || []).filter((g) =>
    g.aspect?.startsWith("9 /")
  );
  const desktopShots = (p.gallery || []).filter(
    (g) => !g.aspect?.startsWith("9 /")
  );

  return (
    <>
      <ProjectSchema project={p} />
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: p.name, path: `/projects/${slug}` },
        ]}
      />
      <section className="detail-head wrap">
        <div className="content">
          <Link href="/projects" className="back-link">
            <span className="arw">
              <Icon name="arrow" size={15} />
            </span>{" "}
            Projects
          </Link>
          <div className="detail-meta meta">
            <span className="article-pub">{p.role}</span>
            <span className="dot">·</span>
            <span>{p.year}</span>
          </div>
          <h1 className="detail-title">{p.name}</h1>
          <p className="detail-dek">{p.blurb}</p>
          <div className="hero-actions" style={{ marginTop: "1.8rem" }}>
            <a
              href={href}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.link} <Icon name="arrow-up-right" size={14} />
            </a>
          </div>
        </div>
      </section>

      <section className="page-pad wrap">
        <div className="content">
          {p.cover ? (
            <div
              style={{
                position: "relative",
                aspectRatio: p.cover.aspect || "16 / 9",
                marginBottom: "3rem",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                overflow: "hidden",
                background: "var(--bg-sunken)",
              }}
            >
              <Image
                src={p.cover.src}
                alt={p.cover.alt}
                fill
                sizes="(max-width: 720px) 100vw, 864px"
                style={{ objectFit: "cover", objectPosition: "top" }}
                priority
              />
            </div>
          ) : (
            <div
              className="ph"
              style={{ aspectRatio: "16 / 8", marginBottom: "3rem" }}
            >
              <span className="ph-label">
                cover · {p.name.toLowerCase().replace(/[^a-z]+/g, "-")}.png
              </span>
            </div>
          )}

          <div className="about-grid" style={{ paddingTop: 0 }}>
            <div className="prose measure">
              <h3>Overview</h3>
              <p>{p.blurb}</p>
              {p.overview && <p>{p.overview}</p>}
              <h3>My role</h3>
              <p>
                {p.roleNote ||
                  "Sole author and maintainer. Design, implementation, docs, and the unglamorous work of keeping it alive after launch."}
              </p>
              {desktopShots.length > 0 ? (
                desktopShots.map((g) => (
                  <figure key={g.src}>
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: g.aspect || "16 / 10",
                        border: "1px solid var(--line)",
                        borderRadius: "var(--radius)",
                        overflow: "hidden",
                        background: "var(--bg-sunken)",
                      }}
                    >
                      <Image
                        src={g.src}
                        alt={g.alt}
                        fill
                        sizes="(max-width: 720px) 100vw, 640px"
                        style={{ objectFit: "cover", objectPosition: "top" }}
                      />
                    </div>
                    <figcaption>{g.alt}</figcaption>
                  </figure>
                ))
              ) : (
                <figure>
                  <div className="ph">
                    <span className="ph-label">screenshot · interface</span>
                  </div>
                </figure>
              )}
            </div>

            <aside className="about-aside">
              <div className="aside-block">
                <dl className="info-grid" style={{ gridTemplateColumns: "1fr" }}>
                  <div>
                    <div
                      className="meta aside-h"
                      style={{ marginBottom: "0.6rem" }}
                    >
                      Role
                    </div>
                    <div
                      className="proj-blurb"
                      style={{ fontSize: "1rem" }}
                    >
                      {p.role}
                    </div>
                  </div>
                </dl>
              </div>
              <div className="aside-block">
                <div className="meta aside-h">Stack &amp; tools</div>
                <div className="stack-tags">
                  {p.stack.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="aside-block">
                <div className="meta aside-h">Year</div>
                <div className="proj-blurb" style={{ fontSize: "1rem" }}>
                  {p.year}
                </div>
              </div>
              <div className="aside-block">
                <div className="meta aside-h">Link</div>
                <a
                  href={href}
                  className="arrow-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: "0.95rem" }}
                >
                  {p.link} <Icon name="arrow-up-right" size={14} />
                </a>
              </div>
              {mobileShots.length > 0 && (
                <div className="aside-block">
                  <div className="meta aside-h">On mobile</div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${mobileShots.length}, 1fr)`,
                      gap: "0.6rem",
                    }}
                  >
                    {mobileShots.map((g) => (
                      <div
                        key={g.src}
                        style={{
                          position: "relative",
                          aspectRatio: g.aspect || "9 / 19",
                          border: "1px solid var(--line)",
                          borderRadius: "var(--radius)",
                          overflow: "hidden",
                          background: "var(--bg-sunken)",
                        }}
                      >
                        <Image
                          src={g.src}
                          alt={g.alt}
                          fill
                          sizes="120px"
                          style={{
                            objectFit: "cover",
                            objectPosition: "top",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {others.length > 0 && (
            <div className="next-block">
              <div className="meta" style={{ marginBottom: "1.25rem" }}>
                Other projects
              </div>
              <div className="proj-grid">
                {others.map((o) => (
                  <ProjectCard key={o.slug} project={o} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
