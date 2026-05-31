import { Icon, Logo } from "./Icon";
import { PROFILE } from "@/lib/content";

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="wrap footer-inner">
        <div className="footer-col">
          <div className="footer-name">
            <Logo size={26} />
            <span>Saheed Oladele</span>
          </div>
          <p className="footer-tag">{PROFILE.positioning}</p>
        </div>
        <nav className="footer-links" aria-label="Social profiles">
          {PROFILE.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="footer-social link-quiet"
              target="_blank"
              rel="noopener noreferrer me"
              aria-label={`${s.label} (${s.short}) — opens in a new tab`}
            >
              <Icon name={s.icon} size={15} />
              <span aria-hidden="true">{s.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <div className="wrap footer-base">
        <span className="meta">© {new Date().getFullYear()} Saheed Oladele</span>
      </div>
    </footer>
  );
}
