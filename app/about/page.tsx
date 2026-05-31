import Link from "next/link";
import type { Metadata } from "next";
import { PROFILE, STACK } from "@/lib/content";
import { SITE, url } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";

const SCALABLE_URL = "https://de.scalable.capital/en";

const description =
  "Saheed Oladele is a senior software engineer, writer, and lecturer. Working full-stack at Scalable Capital across React, TypeScript, Kotlin, and Spring Boot, with infrastructure on AWS shaped by Terraform.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    title: `About · ${SITE.shortName}`,
    description,
    url: url("/about"),
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
    firstName: "Saheed",
    lastName: "Oladele",
    username: "TheSaheedO",
  },
  twitter: {
    card: "summary_large_image",
    title: `About · ${SITE.shortName}`,
    description,
  },
};

export default function AboutPage() {
  const now = new Date().toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <section className="about-hero wrap">
        <div className="content">
          <div
            className="meta section-kicker"
            style={{ color: "var(--accent-ink)" }}
          >
            About
          </div>
          <h1 className="detail-title" style={{ maxWidth: "20ch" }}>
            An engineer who took the long way in.
          </h1>
        </div>
      </section>

      <section className="wrap">
        <div className="about-grid">
          <div className="prose measure">
            <p className="lead">
              I&apos;m Saheed, a senior software engineer. I work across the
              full stack at{" "}
              <a href={SCALABLE_URL} target="_blank" rel="noopener noreferrer">
                Scalable Capital
              </a>
              : front to back, infrastructure included, wherever a problem
              leads. I also spend a lot of time on the quieter cross-service
              work: design systems, performance budgets, and developer
              experience.
            </p>
            <p>
              I didn&apos;t start here. My first degree was in electrical
              engineering, communications track: signals, modulation, the
              physical layer of how information moves. Software was the side
              door I kept walking through until
              it became the whole house. The transition taught me that the
              hard part of engineering is rarely the syntax. It&apos;s
              reasoning clearly under constraints you didn&apos;t choose. That
              instinct transferred more cleanly than any specific skill.
            </p>
            <h2>Building</h2>
            <p>
              At Scalable Capital I work across the entire stack. React and
              TypeScript on the front, with <code>Node</code>,{" "}
              <code>Kotlin</code>, and{" "}
              <code>Spring Boot</code> on the services behind them.{" "}
              <code>GraphQL</code> and <code>PostgreSQL</code> sit in the
              middle, and the infrastructure underneath is <code>AWS</code>{" "}
              shaped by <code>Terraform</code> and deployed through{" "}
              <code>Docker</code>. A lot of the job is the quieter work where
              systems meet: keeping several polyglot services coherent across
              the JavaScript and JVM worlds at once.
            </p>
            <h2>Teaching</h2>
            <p>
              I lecture on frontend programming at the University of Europe
              for Applied Sciences. Teaching keeps me honest. You can&apos;t
              hand-wave a concept to a room of people who will use it on
              Monday. It&apos;s also where a lot of my writing starts.
            </p>
            <h2>Writing</h2>
            <p>
              I&apos;ve published technical writing on{" "}
              <Link href="/writing">freeCodeCamp</Link> and{" "}
              <Link href="/writing">LeadDev</Link>, including a few pieces
              that still rank on Google years later. I also write on my own
              blog. Most recently I wrote for{" "}
              <Link href="/writing">Babbel</Link> about{" "}
              <em>Agent Experience</em> (AX) after ViteConf 2025: what
              changes about how we build interfaces when the primary user
              reading and acting on them is a model, not a person.
            </p>
            <blockquote>
              The web spent thirty years optimising for human attention. The
              next stretch is about being legible to something that
              doesn&apos;t have any.
            </blockquote>
          </div>

          <aside className="about-aside" aria-label="At a glance">
            <div className="aside-block">
              <h2 className="meta aside-h">Now</h2>
              <p className="proj-blurb" style={{ fontSize: "1.0rem" }}>
                {PROFILE.location ? `${PROFILE.location} · ${now}` : now}
              </p>
            </div>

            <div className="aside-block">
              <h2 className="meta aside-h" id="aside-toolkit">
                Tools of the trade
              </h2>
              <ul
                className="stack-tags"
                aria-labelledby="aside-toolkit"
                data-reveal-stagger
              >
                {[
                  ...STACK.primary,
                  ...STACK.secondary,
                  ...STACK.backend,
                  ...STACK.infra,
                  ...STACK.data,
                ].map((s) => (
                  <li className="tag" key={s}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="aside-block">
              <h2 className="meta aside-h">Credentials</h2>
              <p className="proj-blurb" style={{ fontSize: "1.0rem" }}>
                B.Tech, Electrical Engineering (Communications).
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
