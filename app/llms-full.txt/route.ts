import { ARTICLES, CURRENTLY, PROFILE, PROJECTS, STACK } from "@/lib/content";
import { SITE, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * llms-full.txt — fuller markdown index for LLM consumption. Mirrors the
 * site's public content in a single, scannable document.
 */
export function GET() {
  const body = `# ${SITE.name}

${SITE.description}

URL: ${SITE_URL}
Job title: ${SITE.jobTitle}
Employer: ${SITE.employer.name} (${SITE.employer.url})
Teaches at: ${SITE.teachingAt.name} (${SITE.teachingAt.url})
Languages: English, German

## Contact

${PROFILE.socials.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

Preferred channel: LinkedIn.

## Currently

${CURRENTLY.map((c) => `- ${c.label}: ${c.text}`).join("\n")}

## Tools of the trade

${[
  ...STACK.primary,
  ...STACK.secondary,
  ...STACK.backend,
  ...STACK.infra,
].join(", ")}.

## About

I'm Saheed, a senior software engineer. I work across the full stack at Scalable Capital (${SITE.employer.url}): front to back, infrastructure included, wherever a problem leads. I also spend a lot of time on the quieter cross-service work: design systems, performance budgets, and developer experience.

I didn't start here. My first degree was in electrical engineering, communications track: signals, modulation, the physical layer of how information moves. Software was the side door I kept walking through until it became the whole house. The transition taught me that the hard part of engineering is rarely the syntax. It's reasoning clearly under constraints you didn't choose. That instinct transferred more cleanly than any specific skill.

At Scalable Capital I work across the entire stack. React and TypeScript on the front, with Node, Kotlin, and Spring Boot on the services behind them. GraphQL and PostgreSQL sit in the middle, and the infrastructure underneath is AWS shaped by Terraform and deployed through Docker. A lot of the job is the quieter work where systems meet: keeping several polyglot services coherent across the JavaScript and JVM worlds at once.

Teaching keeps me honest. You can't hand-wave a concept to a room of people who will use it on Monday. It's also where a lot of my writing starts.

I've published technical writing on freeCodeCamp and LeadDev, including a few pieces that still rank on Google years later. I also write on my own blog. Most recently I wrote for Babbel about Agent Experience (AX) after ViteConf 2025: what changes about how we build interfaces when the primary user reading and acting on them is a model, not a person.

> The web spent thirty years optimising for human attention. The next stretch is about being legible to something that doesn't have any.

## Writing

${ARTICLES.map(
  (a) => `### ${a.title}

Publisher: ${a.publisher}
Published: ${a.dateLabel}
Reading time: ~${a.read} min
Topics: ${a.topics.join(", ")}
URL: ${a.url}

${a.dek}`
).join("\n\n")}

## Projects

${PROJECTS.map(
  (p) => `### ${p.name}

Role: ${p.role}
Year: ${p.year}
Stack: ${p.stack.join(", ")}
URL: ${p.liveUrl || SITE_URL + "/projects/" + p.slug}

${p.blurb}

${p.overview || ""}

${p.roleNote ? "My role: " + p.roleNote : ""}`
).join("\n\n")}

## Credentials

B.Tech, Electrical Engineering (Communications).

## Open to

Speaking invitations, consulting, select freelance work, and principal-engineering conversations. LinkedIn is the fastest way to reach me.

---

Generated from ${SITE_URL}. See ${SITE_URL}/llms.txt for the short index.
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
