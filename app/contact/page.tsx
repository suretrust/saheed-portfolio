import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PROFILE } from "@/lib/content";
import { SITE, url } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { JsonLd } from "@/components/seo/JsonLd";

const description =
  "Get in touch with Saheed Oladele. Open to speaking invitations, consulting, select freelance work, and principal-engineering conversations. LinkedIn is the fastest way to reach him.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    title: `Contact · ${SITE.shortName}`,
    description,
    url: url("/contact"),
    images: [{ url: SITE.defaultOgImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact · ${SITE.shortName}`,
    description,
  },
};

export default function ContactPage() {
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": url("/contact#contactpage"),
    url: url("/contact"),
    name: `Contact · ${SITE.shortName}`,
    description,
    isPartOf: { "@id": url("/#website") },
    mainEntity: { "@id": url("/#person") },
  };
  return (
    <>
      <BreadcrumbSchema
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <JsonLd data={contactPage} />
      <section className="contact-hero wrap">
        <div className="content">
          <div
            className="meta section-kicker"
            style={{ color: "var(--accent-ink)" }}
          >
            Contact
          </div>
          <h1 className="contact-lead">Let&apos;s talk.</h1>
          <p className="contact-sub">
            I&apos;m open to speaking invitations, consulting, select
            freelance work, and principal-engineering conversations. If
            it&apos;s interesting and you think I&apos;d be a good fit,
            I&apos;d like to hear about it. LinkedIn is the fastest way to
            reach me.
          </p>
          <div className="avail">
            <span className="avail-dot"></span>
            Available for new conversations
          </div>
        </div>
      </section>

      <section
        className="page-pad wrap"
        style={{ paddingTop: "1rem" }}
        aria-labelledby="contact-channels-heading"
      >
        <h2 id="contact-channels-heading" className="sr-only">
          Contact channels
        </h2>
        <ul className="contact-list" role="list" data-reveal-stagger>
          {PROFILE.socials.map((s) => {
            const accessibleName = `${s.label}, ${s.short}, opens in a new tab`;
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="contact-item"
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={accessibleName}
                >
                  <span className="contact-ico" aria-hidden="true">
                    <Icon name={s.icon} size={20} />
                  </span>
                  <span aria-hidden="true">
                    <span className="contact-label">{s.label}</span>
                    <span
                      className="contact-value"
                      style={{ display: "block" }}
                    >
                      {s.short}
                    </span>
                  </span>
                  <span className="contact-arw" aria-hidden="true">
                    <Icon name="arrow-up-right" size={16} />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <p
          className="proj-blurb"
          style={{
            maxWidth: "44ch",
            marginTop: "2.5rem",
            color: "var(--ink-mute)",
          }}
        >
          A LinkedIn message reaches me quickest. I read everything, and I
          reply to most of it. For speaking, a date and a sentence on the
          audience is plenty to start.
        </p>
      </section>
    </>
  );
}
