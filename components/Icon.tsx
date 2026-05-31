type IconName =
  | "sun"
  | "moon"
  | "arrow"
  | "arrow-up-right"
  | "mail"
  | "github"
  | "linkedin"
  | "x";

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const s = {
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "sun":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.5M12 19v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12H5M19 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
        </svg>
      );
    case "moon":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.3 6.3 0 0 0 10.5 10.5Z" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" {...s}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3.5 7 8.5 6 8.5-6" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="currentColor">
          <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.6.69.49A10.04 10.04 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="currentColor">
          <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9.75h4V21H3V9.75ZM10 9.75h3.83v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14V21h-4v-4.99c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.91 1.3-1.91 2.64V21h-4V9.75Z" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" style={{ width: size, height: size }} fill="currentColor">
          <path d="M17.53 3h3.04l-6.64 7.59L21.75 21h-5.99l-4.69-6.13L5.7 21H2.66l7.1-8.12L2.25 3h6.14l4.24 5.6L17.53 3Zm-1.07 16.2h1.68L7.62 4.7H5.82l10.64 14.5Z" />
        </svg>
      );
    default:
      return null;
  }
}

export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span className="logo-mark" aria-hidden="true">
      <svg className="logo-svg" viewBox="0 0 40 40" width={size} height={size}>
        <circle className="logo-ring" cx="20" cy="20" r="18.4" />
        <text className="logo-letters" x="20" y="20.4">SO</text>
        <circle className="logo-dot" cx="30.6" cy="28.1" r="2.1" />
      </svg>
    </span>
  );
}
