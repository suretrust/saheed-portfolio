import { ImageResponse } from "next/og";
import { ARTICLES } from "@/lib/content";
import { SITE_URL } from "@/lib/seo";
import { OG_SIZE, brandDomain, loadOgFonts } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Article — Saheed Oladele";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const a = ARTICLES.find((x) => x.slug === params.slug);
  return [
    {
      id: "main",
      size,
      contentType,
      alt: a ? `${a.title} — Saheed Oladele` : alt,
    },
  ];
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const a = ARTICLES.find((x) => x.slug === params.slug);
  const fonts = await loadOgFonts();

  const title = a?.title || "Writing";
  const publisher = a?.publisher || "";
  const date = a?.dateLabel || "";
  const readTime = a?.read ? `${a.read} min read` : "";
  const dek = a?.dek || "";
  const topics = (a?.topics || []).slice(0, 4).join(" · ");

  // Dark variant for articles — matches og-writing.png treatment.
  const bg = "#1f1c14";
  const ink = "#f5efe1";
  const inkSoft = "#a89e89";
  const inkFaint = "#7f7867";
  const accent = "#d39575";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          display: "flex",
          flexDirection: "column",
          padding: "80px",
          fontFamily: "Newsreader",
          color: ink,
        }}
      >
        {/* Header — monogram + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Monogram color={ink} accent={accent} />
          <div
            style={{
              fontFamily: "Newsreader",
              fontSize: 30,
              fontWeight: 500,
              color: ink,
            }}
          >
            Saheed Oladele
          </div>
        </div>

        {/* Meta strip — publisher · date · read */}
        <div
          style={{
            marginTop: 56,
            display: "flex",
            fontFamily: "JetBrainsMono",
            fontSize: 20,
            color: accent,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          {[publisher, date, readTime].filter(Boolean).join(" · ")}
        </div>

        {/* Title */}
        <div
          style={{
            marginTop: 16,
            fontFamily: "Newsreader",
            fontSize: title.length > 50 ? 56 : title.length > 30 ? 68 : 80,
            fontWeight: 500,
            lineHeight: 1.08,
            letterSpacing: "-0.015em",
            color: ink,
            display: "flex",
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        {/* Dek */}
        <div
          style={{
            marginTop: 28,
            fontFamily: "Newsreader",
            fontSize: 26,
            fontWeight: 400,
            lineHeight: 1.4,
            color: inkSoft,
            maxWidth: 980,
            display: "flex",
            fontStyle: "italic",
          }}
        >
          {truncate(dek, 200)}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Accent rule */}
        <div
          style={{
            width: 160,
            height: 3,
            background: accent,
            marginBottom: 24,
          }}
        />

        {/* Footer: topics + domain */}
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
          <div style={{ color: inkSoft, display: "flex" }}>{topics}</div>
          <div style={{ color: inkFaint, display: "flex" }}>
            {brandDomain(SITE_URL)}/WRITING
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
