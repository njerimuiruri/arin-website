import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARIN Press",
  description:
    "Access ARIN's full library of publications — peer-reviewed journal articles, working papers, technical reports, books, policy briefs, impact stories, news briefs, and newsletters covering Africa's development landscape.",
  keywords: [
    "ARIN Press",
    "Africa Research Publications",
    "African Journal Articles",
    "Policy Briefs Africa",
    "Technical Reports Africa",
    "Working Papers Africa",
    "Impact Stories Africa",
    "African Development Books",
    "ARIN Newsletter",
  ],
  openGraph: {
    title: "ARIN Press | Publications & Research",
    description:
      "Browse ARIN's library of journal articles, working papers, technical reports, impact stories, and more from across Africa.",
    url: "https://arin-africa.org/press",
  },
};

export default function PressLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
