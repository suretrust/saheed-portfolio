import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { SectionHead } from "@/components/SectionHead";
import { ArticleRow } from "@/components/ArticleRow";
import { ProjectCard } from "@/components/ProjectCard";
import { ARTICLES, CURRENTLY, PROFILE, PROJECTS } from "@/lib/content";
import { SITE } from "@/lib/seo";

// Override the layout title default with a sharper home title.
export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name} · Senior Software Engineer, Writer, Lecturer`,
  },
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = ARTICLES.filter((a) => a.featured).slice(0, 3);
  const selectedProjects = PROJECTS.slice(0, 2);

  return (
    <>
      <section className="hero wrap">
        <div className="meta hero-eyebrow reveal reveal-d1">{PROFILE.role}</div>
        <h1 className="hero-lead reveal reveal-d1">
          <span className="hl">I build software,</span>
          <span className="hl">
            write about it, and teach it<span className="accent">.</span>
          </span>
        </h1>
        <p className="hero-sub reveal reveal-d2">
          Senior software engineer at{" "}
          <a
            className="link"
            href="https://de.scalable.capital/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Scalable Capital
          </a>
          . I came to software from electrical engineering. Now I work across
          the full stack and the infrastructure underneath: front to back,
          infra included, whatever the problem needs. I also spend time
          thinking about where the craft is heading, including what it means
          to design and build for{" "}
          <span className="em" style={{ fontStyle: "italic" }}>
            agents
          </span>
          , not just people.
        </p>
        <div className="hero-actions reveal reveal-d3">
          <Link href="/writing" className="btn btn-primary">
            Read the writing <Icon name="arrow" size={15} />
          </Link>
          <Link href="/projects" className="btn">
            See the work
          </Link>
          <Link href="/contact" className="btn">
            Get in touch
          </Link>
        </div>
      </section>

      <section
        className="home-section wrap"
        aria-labelledby="home-currently-title"
        data-reveal
      >
        <SectionHead
          kicker="Currently"
          title="What I'm focused on"
          titleId="home-currently-title"
        />
        <dl className="currently-grid" data-reveal-stagger>
          {CURRENTLY.map((c) => (
            <div className="currently-item" key={c.label}>
              <dt className="meta currently-label">{c.label}</dt>
              <dd className="currently-text">{c.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="home-section wrap"
        aria-labelledby="home-writing-title"
        data-reveal
      >
        <SectionHead
          kicker="Writing"
          title="Recent articles"
          titleId="home-writing-title"
          action="All writing"
          actionPath="/writing"
        />
        <div data-reveal-stagger>
          {featured.map((a) => (
            <ArticleRow key={a.slug} article={a} compact />
          ))}
        </div>
      </section>

      <section
        className="home-section wrap"
        aria-labelledby="home-projects-title"
        data-reveal
      >
        <SectionHead
          kicker="Projects"
          title="Selected ventures"
          titleId="home-projects-title"
          action="All projects"
          actionPath="/projects"
        />
        <div className="proj-grid" data-reveal-stagger>
          {selectedProjects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section className="home-section wrap home-cta" data-reveal>
        <div className="home-cta-text">
          <div
            className="meta section-kicker"
            style={{ color: "var(--accent-ink)" }}
          >
            Open to
          </div>
          <h2 className="section-title home-cta-title">
            Speaking, consulting, principal-engineering conversations, and
            select collaborations.
          </h2>
        </div>
        <div className="home-cta-aside">
          <p className="home-cta-blurb">
            If it&apos;s interesting and you think I&apos;d be a good fit,
            I&apos;d like to hear about it. LinkedIn is the fastest way to
            reach me.
          </p>
          <div className="home-cta-actions">
            <Link href="/contact" className="btn btn-primary">
              Start a conversation <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
