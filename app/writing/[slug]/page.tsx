import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { ArticleSchema } from "@/components/seo/ArticleSchema";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { ARTICLES } from "@/lib/content";
import { SITE, url } from "@/lib/seo";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) return {};

  const canonical = a.external ? a.url : url(`/writing/${slug}`);
  return {
    title: a.title,
    description: a.dek,
    keywords: a.topics,
    authors: [{ name: SITE.author, url: url("/about") }],
    alternates: { canonical },
    // OG image comes from opengraph-image.tsx co-located in this route.
    openGraph: {
      type: "article",
      title: a.title,
      description: a.dek,
      url: canonical,
      publishedTime: a.date,
      authors: [SITE.author],
      section: a.topics[0],
      tags: a.topics,
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.dek,
      creator: SITE.twitterHandle,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();

  const idx = ARTICLES.findIndex((x) => x.slug === slug);
  const next =
    ARTICLES.slice(idx + 1).find((x) => !x.external) ||
    ARTICLES.find((x) => !x.external && x.slug !== slug);

  return (
    <>
      <ArticleSchema article={a} />
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Writing", path: "/writing" },
          { name: a.title, path: `/writing/${slug}` },
        ]}
      />
      <section className="detail-head wrap">
        <div className="content">
          <Link href="/writing" className="back-link">
            <span className="arw">
              <Icon name="arrow" size={15} />
            </span>{" "}
            Writing
          </Link>
          <div className="detail-meta meta">
            <span className="article-pub">{a.publisher}</span>
            <span className="dot">·</span>
            <span>{a.dateLabel}</span>
            <span className="dot">·</span>
            <span>{a.read} min read</span>
          </div>
          <h1 className="detail-title">{a.title}</h1>
          <p className="detail-dek">{a.dek}</p>
          <div className="article-tags" style={{ marginTop: "1.5rem" }}>
            {a.topics.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
          {a.external && (
            <div className="hero-actions" style={{ marginTop: "1.6rem" }}>
              <a
                href={a.url}
                className="btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read the original on {a.publisher}{" "}
                <Icon name="arrow-up-right" size={14} />
              </a>
            </div>
          )}
        </div>
      </section>

      <section className="page-pad wrap">
        <div className="article-layout no-toc">
          <div className="prose measure">
            <p className="lead">{a.dek}</p>
            <p>
              This piece is published with <strong>{a.publisher}</strong>.
            </p>
            <p>
              <a href={a.url} target="_blank" rel="noopener noreferrer">
                Read the full article on {a.publisher} →
              </a>
            </p>
          </div>
        </div>

        {next && (
          <div className="content">
            <div className="next-block">
              <div className="meta" style={{ marginBottom: "0.75rem" }}>
                Read next
              </div>
              <Link href={"/writing/" + next.slug} className="article-link">
                <h3 className="article-title" style={{ fontSize: "1.5rem" }}>
                  {next.title}
                </h3>
                <p className="article-dek">{next.dek}</p>
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
