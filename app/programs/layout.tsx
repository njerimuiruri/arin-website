import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore ARIN's programs — from cutting-edge research projects addressing Africa's most pressing challenges to capacity-building initiatives that empower researchers, policymakers, and communities.",
  keywords: [
    "ARIN Programs",
    "Africa Research Projects",
    "Capacity Building Africa",
    "African Research Initiatives",
    "ARIN Research",
    "Development Programs Africa",
    "African Policy Research",
  ],
  openGraph: {
    title: "Programs | ARIN Africa",
    description:
      "Discover ARIN's research projects and capacity-building programs designed to drive evidence-based development across Africa.",
    url: "https://arin-africa.org/programs",
  },
};

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
