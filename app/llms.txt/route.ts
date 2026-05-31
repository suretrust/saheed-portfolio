import { ARTICLES, PROFILE, PROJECTS, STACK } from "@/lib/content";
import { SITE, SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * llms.txt — discoverable index for LLM consumption.
 * See https://llmstxt.org for the spec.
 */
export function GET() {
  const body = `# ${SITE.name}

> ${SITE.description}

Saheed Oladele is a senior software engineer at Scalable Capital (https://de.scalable.capital/en), a lecturer of Frontend Programming at the University of Europe for Applied Sciences (https://www.ue-germany.com/), and a writer on engineering and Agent Experience (AX). He came to software from electrical engineering (communications track). He works across the full stack and the infrastructure underneath: React and TypeScript on the front, Node, Kotlin, and Spring Boot on services, with GraphQL and PostgreSQL in the middle, and AWS shaped by Terraform.

The fastest way to reach him is a LinkedIn message (${PROFILE.socials.find((s) => s.icon === "linkedin")?.href}).

## Site map

- [Home](${SITE_URL}/): overview, currently, recent writing, selected projects.
- [About](${SITE_URL}/about): background, stack, credentials.
- [Writing](${SITE_URL}/writing): essays and technical articles. RSS at ${SITE_URL}/writing/feed.xml.
- [Projects](${SITE_URL}/projects): chowpool + UE Frontend course portal.
- [Contact](${SITE_URL}/contact): LinkedIn and GitHub.

## Tools of the trade

${[
  ...STACK.primary,
  ...STACK.secondary,
  ...STACK.backend,
  ...STACK.infra,
].map((s) => `- ${s}`).join("\n")}

## Writing

${ARTICLES.map((a) => `- [${a.title}](${a.url}) — ${a.publisher}, ${a.dateLabel}. ${a.dek}`).join("\n")}

## Projects

${PROJECTS.map((p) => `- [${p.name}](${p.liveUrl || SITE_URL + "/projects/" + p.slug}) — ${p.role}, ${p.year}. ${p.blurb}`).join("\n")}

## Optional

- [Full content](${SITE_URL}/llms-full.txt): the same index with expanded copy.
- [Sitemap](${SITE_URL}/sitemap.xml)
- [RSS](${SITE_URL}/writing/feed.xml)
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
