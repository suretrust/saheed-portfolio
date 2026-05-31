"use client";

import { useId, useState } from "react";
import { ArticleRow } from "@/components/ArticleRow";
import { ARTICLES, TOPICS } from "@/lib/content";

export function WritingList() {
  const [filter, setFilter] = useState("All");
  const list =
    filter === "All"
      ? ARTICLES
      : ARTICLES.filter((a) => a.topics.includes(filter));
  const listId = useId();

  return (
    <>
      <div
        className="filter-bar"
        role="toolbar"
        aria-label="Filter writing by topic"
        aria-controls={listId}
      >
        {TOPICS.map((t) => {
          const isOn = filter === t;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={isOn}
              className={"filter-chip" + (isOn ? " is-on" : "")}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          );
        })}
      </div>
      <div
        id={listId}
        key={filter}
        className="reveal"
        aria-live="polite"
        aria-busy="false"
        data-reveal-stagger
      >
        <p className="sr-only">
          Showing {list.length} {list.length === 1 ? "article" : "articles"}
          {filter !== "All" ? ` filed under ${filter}` : ""}.
        </p>
        {list.map((a) => (
          <ArticleRow key={a.slug} article={a} />
        ))}
        {list.length === 0 && (
          <p className="article-dek" style={{ padding: "2rem 0" }}>
            Nothing under that topic yet.
          </p>
        )}
      </div>
    </>
  );
}
