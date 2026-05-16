import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "./components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://arin-africa.org";
const SITE_NAME = "ARIN Africa";
const DEFAULT_DESCRIPTION =
  "Africa Research & Impact Network (ARIN) bridges the gap between research and policy across Africa. Connecting researchers, policymakers, and communities for evidence-based decision-making and sustainable development.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARIN | Africa Research & Impact Network",
    template: "%s | ARIN Africa",
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Africa Research",
    "Impact Network",
    "Policy Research Africa",
    "African Development",
    "Climate Change Africa",
    "Research Projects Africa",
    "Evidence-Based Policy",
    "ARIN Africa",
    "Capacity Building Africa",
    "Sustainable Development Africa",
    "Africa Conferences",
    "Research Publications Africa",
  ],
  authors: [{ name: "ARIN Africa", url: SITE_URL }],
  creator: "ARIN Africa",
  publisher: "Africa Research & Impact Network",
  category: "Research & Development",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "ARIN | Africa Research & Impact Network",
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ARIN Africa – Africa Research & Impact Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARIN | Africa Research & Impact Network",
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.png"],
    creator: "@ARINafrica",
    site: "@ARINafrica",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "UblP7FXr77fz_8lU9oQl0mVVNtb-9UKzkEWEOl4AQf8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}