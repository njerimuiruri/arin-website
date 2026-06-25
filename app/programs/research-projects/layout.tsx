import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Projects",
  description:
    "Explore ARIN's active and completed research projects addressing Africa's critical challenges  from climate change adaptation to sustainable agriculture, urban resilience, and health.",
  keywords: [
    "ARIN Research Projects",
    "Africa Climate Research",
    "Sustainable Agriculture Africa",
    "Urban Resilience Research",
    "African Development Research",
  ],
  openGraph: {
    title: "Research Projects | ARIN Africa",
    description:
      "Discover ARIN's portfolio of research projects tackling Africa's most pressing development and environmental challenges.",
    url: "https://arin-africa.org/programs/research-projects",
  },
};

export default function ResearchProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
