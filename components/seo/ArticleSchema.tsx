import { JsonLd } from "./JsonLd";
import { SITE, url } from "@/lib/seo";
import type { Article } from "@/lib/content";

export function ArticleSchema({ article }: { article: Article }) {
  const canonical = article.external
    ? article.url
    : url(`/writing/${article.slug}`);

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url(`/writing/${article.slug}#article`),
    headline: article.title,
    description: article.dek,
    inLanguage: SITE.language,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@id": url("/#person") },
    creator: { "@id": url("/#person") },
    publisher: article.publisher,
    isAccessibleForFree: true,
    keywords: article.topics.join(", "),
    url: canonical,
    mainEntityOfPage: canonical,
    timeRequired: `PT${article.read}M`,
    isPartOf: { "@id": url("/#website") },
    about: article.topics.map((t) => ({ "@type": "Thing", name: t })),
  };
  return <JsonLd data={data} />;
}
