import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Stories",
  description:
    "Real stories of transformation and resilience from communities across Africa — discover how ARIN's research drives meaningful change on the ground.",
  openGraph: {
    title: "Impact Stories | ARIN Africa",
    description:
      "Read real stories of transformation and resilience from communities across Africa shaped by ARIN's evidence-based research.",
    url: "https://arin-africa.org/press/impact-stories",
  },
};

export default function ImpactStoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
