import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Working Papers",
  description:
    "Browse ARIN's working paper series — preliminary research and analysis on key development, climate, and policy issues facing Africa.",
  openGraph: {
    title: "Working Papers | ARIN Press",
    description:
      "Access ARIN's working paper series covering climate, development, and policy research across Africa.",
    url: "https://arin-africa.org/press/working-papers",
  },
};

export default function WorkingPapersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
