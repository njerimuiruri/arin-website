import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal Articles",
  description:
    "Peer-reviewed journal articles from ARIN researchers covering climate change, sustainable development, agriculture, health, and more across the African continent.",
  openGraph: {
    title: "Journal Articles | ARIN Press",
    description:
      "Access peer-reviewed journal articles on Africa's most pressing development and environmental challenges.",
    url: "https://arin-africa.org/press/journal-articles",
  },
};

export default function JournalArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
