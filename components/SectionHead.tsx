import Link from "next/link";
import { Icon } from "./Icon";

export function SectionHead({
  kicker,
  title,
  titleId,
  action,
  actionPath,
}: {
  kicker?: string;
  title: string;
  titleId?: string;
  action?: string;
  actionPath?: string;
}) {
  return (
    <div className="section-head">
      <div>
        {kicker && (
          <p className="meta section-kicker" aria-hidden="true">
            {kicker}
          </p>
        )}
        <h2 id={titleId} className="section-title">
          {kicker ? <span className="sr-only">{kicker}: </span> : null}
          {title}
        </h2>
      </div>
      {action && actionPath && (
        <Link
          href={actionPath}
          className="arrow-link section-action"
          aria-label={`${action}: ${title}`}
        >
          <span aria-hidden="true">{action}</span>
          <Icon name="arrow" size={16} />
        </Link>
      )}
    </div>
  );
}
