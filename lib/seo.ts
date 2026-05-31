import { PROFILE } from "./content";

/**
 * Canonical site URL. Override with NEXT_PUBLIC_SITE_URL (no trailing slash).
 * Default points at the production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://saheedoladele.com"
).replace(/\/$/, "");

export const SITE = {
  name: PROFILE.name,
  shortName: "Saheed Oladele",
  tagline: PROFILE.positioning,
  description:
    "Senior software engineer, writer, and lecturer. Building at Scalable Capital, writing on engineering and Agent Experience (AX), and teaching Frontend Programming at the University of Europe for Applied Sciences.",
  locale: "en_US",
  /**
   * Default Open Graph / Twitter image. Resolved against metadataBase, so a
   * leading "/" makes it absolute.
   */
  defaultOgImage: "/og-default.png",
  twitterHandle: "@TheSaheedO",
  author: PROFILE.name,
  /** ISO language code */
  language: "en",
  /** Used in JSON-LD Person.knowsAbout */
  expertise: [
    "Software engineering",
    "Frontend engineering",
    "React",
    "TypeScript",
    "Next.js",
    "GraphQL",
    "Kotlin",
    "Spring Boot",
    "PostgreSQL",
    "AWS",
    "Terraform",
    "Agent Experience (AX)",
  ],
  /** Used in JSON-LD Person.sameAs */
  sameAs: PROFILE.socials.map((s) => s.href).filter((h) => !h.startsWith("mailto:")),
  jobTitle: "Senior Software Engineer",
  employer: { name: "Scalable Capital", url: "https://de.scalable.capital/en" },
  teachingAt: {
    name: "University of Europe for Applied Sciences",
    url: "https://www.ue-germany.com/",
  },
};

/**
 * Build an absolute URL against SITE_URL.
 */
export function url(path: string): string {
  if (!path.startsWith("/")) path = "/" + path;
  return SITE_URL + path;
}
