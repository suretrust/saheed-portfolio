import Link from "next/link";
import { Icon } from "@/components/Icon";

export const metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="page-pad wrap">
      <div className="content">
        <div
          className="meta section-kicker"
          style={{ color: "var(--accent-ink)" }}
        >
          404
        </div>
        <h1 className="detail-title" style={{ maxWidth: "22ch" }}>
          That page seems to have wandered off.
        </h1>
        <p className="detail-dek">
          The link might be stale, mistyped, or pointing at a piece of writing
          that&apos;s since moved. The places below all still work.
        </p>
        <nav className="hero-actions" aria-label="Recovery" style={{ marginTop: "2rem" }}>
          <Link href="/" className="btn btn-primary">
            Back to home <Icon name="arrow" size={15} />
          </Link>
          <Link href="/writing" className="btn">
            Writing
          </Link>
          <Link href="/projects" className="btn">
            Projects
          </Link>
          <Link href="/contact" className="btn">
            Contact
          </Link>
        </nav>
      </div>
    </section>
  );
}
