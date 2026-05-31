import Link from "next/link";
import Image from "next/image";
import { Icon } from "./Icon";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  const p = project;
  const accessibleName = `${p.name}. ${p.role}, ${p.year}. ${p.blurb}`;
  return (
    <Link
      className="proj-card"
      href={"/projects/" + p.slug}
      aria-label={accessibleName}
    >
      <div
        className={"proj-thumb" + (p.cover ? "" : " ph")}
        style={p.cover ? { position: "relative" } : undefined}
      >
        {p.cover ? (
          <Image
            src={p.cover.src}
            alt=""
            fill
            sizes="(max-width: 720px) 100vw, 540px"
            style={{ objectFit: "cover", objectPosition: "top" }}
            priority={false}
          />
        ) : (
          <span className="ph-label" aria-hidden="true">
            {p.accentNote}
          </span>
        )}
      </div>
      <div className="proj-body" aria-hidden="true">
        <div className="proj-top">
          <div className="proj-name">{p.name}</div>
          <div className="meta" style={{ color: "var(--ink-faint)" }}>
            {p.year}
          </div>
        </div>
        <div className="meta proj-role">{p.role}</div>
        <p className="proj-blurb">{p.blurb}</p>
        <div className="proj-foot">
          <ul className="proj-stack">
            {p.stack.slice(0, 2).map((s) => (
              <li className="tag" key={s}>
                {s}
              </li>
            ))}
            {p.stack.length > 2 && (
              <li className="tag">+{p.stack.length - 2}</li>
            )}
          </ul>
          <span className="proj-go" aria-hidden="true">
            <span className="arw">
              <Icon name="arrow-up-right" size={16} />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
