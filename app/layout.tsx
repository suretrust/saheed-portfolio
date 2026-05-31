import type { Metadata, Viewport } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { PersonSchema } from "@/components/seo/PersonSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";
import { SITE, SITE_URL } from "@/lib/seo";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} · Senior Software Engineer, Writer, Lecturer`,
    template: `%s · ${SITE.shortName}`,
  },
  description: SITE.description,
  applicationName: SITE.shortName,
  authors: [{ name: SITE.author, url: SITE_URL }],
  creator: SITE.author,
  publisher: SITE.author,
  generator: "Next.js",
  keywords: [
    "Saheed Oladele",
    "senior software engineer",
    "frontend engineer",
    "React",
    "TypeScript",
    "Next.js",
    "GraphQL",
    "Kotlin",
    "Spring Boot",
    "Agent Experience",
    "AX",
    "Scalable Capital",
    "University of Europe for Applied Sciences",
    "Microverse",
    "Babbel",
    "LeadDev",
    "freeCodeCamp",
    "technical writing",
  ],
  category: "Technology",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/writing/feed.xml", title: `${SITE.shortName} — Writing` },
      ],
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE.shortName,
    title: `${SITE.name} · Senior Software Engineer, Writer, Lecturer`,
    description: SITE.description,
    url: SITE_URL,
    locale: SITE.locale,
    images: [
      {
        url: SITE.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Senior Software Engineer, Writer, Lecturer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} · Senior Software Engineer, Writer, Lecturer`,
    description: SITE.description,
    images: [SITE.defaultOgImage],
    creator: SITE.twitterHandle,
    site: SITE.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f4ec" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1c14" },
  ],
};

const themeInit = `
(function(){try{
  var t=localStorage.getItem("so-theme");
  if(!t){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";}
  document.documentElement.setAttribute("data-theme",t);
}catch(e){}})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontClass = `${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`;
  return (
    <html
      lang="en"
      data-theme="light"
      className={fontClass}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <PersonSchema />
        <WebSiteSchema />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div
          id="progress"
          role="progressbar"
          aria-label="Reading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
          aria-hidden="true"
        ></div>
        <div id="root">
          <Nav />
          <main id="main" className="page reveal" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>
        <RevealObserver />
      </body>
    </html>
  );
}
