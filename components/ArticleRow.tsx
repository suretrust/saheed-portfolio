import Link from "next/link";
import { Icon } from "./Icon";
import type { Article } from "@/lib/content";

export function ArticleRow({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  const a = article;
  const href = a.url ? a.url : "/writing/" + a.slug;
  const external = !!a.url;
  // Compose an accessible name so screen readers announce the article in one
  // breath instead of stepping through pub · date · read · title.
  const accessibleName = `${a.title}. Published on ${a.publisher}, ${a.dateLabel}. ${a.read} minute read.${external ? " Opens in a new tab." : ""}`;

  return (
    <article className="article-row" aria-labelledby={`article-${a.slug}-title`}>
      {external ? (
        <a
          className="article-link"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={accessibleName}
        >
          <ArticleHead a={a} />
          {!compact && <p className="article-dek">{a.dek}</p>}
        </a>
      ) : (
        <Link
          className="article-link"
          href={href}
          aria-label={accessibleName}
        >
          <ArticleHead a={a} />
          {!compact && <p className="article-dek">{a.dek}</p>}
        </Link>
      )}
      {!compact && (
        <ul className="article-tags" aria-label="Topics">
          {a.topics.map((t) => (
            <li className="tag" key={t}>
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function ArticleHead({ a }: { a: Article }) {
  return (
    <>
      <div className="article-meta meta" aria-hidden="true">
        <span className="article-pub">{a.publisher}</span>
        <span className="dot">·</span>
        <span>{a.dateLabel}</span>
        <span className="dot">·</span>
        <span>{a.read} min read</span>
        {a.external && (
          <span className="article-ext">
            <span className="dot">·</span> External{" "}
            <Icon name="arrow-up-right" size={12} />
          </span>
        )}
      </div>
      <h3 id={`article-${a.slug}-title`} className="article-title">
        {a.title}
      </h3>
    </>
  );
}
