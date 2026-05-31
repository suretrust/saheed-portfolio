import { ImageResponse } from "next/og";
import { PROJECTS } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { OG_COLORS, OG_SIZE, brandDomain, loadOgFonts } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Project — Saheed Oladele";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  return [
    {
      id: "main",
      size,
      contentType,
      alt: p ? `${p.name} — Saheed Oladele` : alt,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  const fonts = await loadOgFonts();
  const c = OG_COLORS;

  const name = p?.name || "Project";
  const role = p?.role || "";
  const year = p?.year || "";
  const blurb = p?.blurb || "";
  const stack = p?.stack.slice(0, 5).join(" · ") || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: c.bg,
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "Newsreader",
          color: c.ink,
        }}
      >
        {/* Header — monogram + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Monogram color={c.ink} accent={c.accent} />
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 30,
              fontWeight: 500,
              color: c.ink,
            }}
          >
            Saheed Oladele
          </div>
        </div>

        {/* Meta strip */}
        <div
          style={{
            marginTop: 64,
            display: "flex",
            fontFamily: "JetBrainsMono",
            fontSize: 20,
            color: c.accent,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {[role, year].filter(Boolean).join(" · ")}
        </div>

        {/* Title */}
        <div
          style={{
            marginTop: 16,
            fontFamily: "Newsreader",
            fontSize: name.length > 24 ? 80 : 96,
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
            color: c.ink,
            display: "flex",
            maxWidth: 1000,
          }}
        >
          {name}
          <span style={{ color: c.accent }}>.</span>
        </div>

        {/* Blurb */}
        <div
          style={{
            marginTop: 32,
            fontFamily: "Newsreader",
            fontSize: 28,
            fontWeight: 400,
            lineHeight: 1.4,
            color: c.inkSoft,
            maxWidth: 900,
            display: "flex",
          }}
        >
          {truncate(blurb, 160)}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Accent rule */}
        <div
          style={{
            width: 160,
            height: 3,
            background: c.accent,
            marginBottom: 24,
          }}
        />

        {/* Footer: stack + domain */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "JetBrainsMono",
            fontSize: 18,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div style={{ color: c.inkSoft, display: "flex" }}>{stack}</div>
          <div style={{ color: c.inkFaint, display: "flex" }}>
            {brandDomain(SITE_URL)}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    }
  );
}

function Monogram({ color, accent }: { color: string; accent: string }) {
  return (
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 36,
        border: `3px solid ${color}`,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Newsreader",
        fontSize: 34,
        fontWeight: 500,
        letterSpacing: -2,
        color,
      }}
    >
      SO
      <div
        style={{
          position: "absolute",
          right: -4,
          bottom: 10,
          width: 10,
          height: 10,
          borderRadius: 5,
          background: accent,
        }}
      />
    </div>
  );
}

function truncate(s: string, n: number) {
  if (s.length <= n) return s;
  const cut = s.slice(0, n);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}
