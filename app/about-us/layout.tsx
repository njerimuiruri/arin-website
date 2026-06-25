import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ARIN",
  description:
    "Learn about the Africa Research & Impact Network (ARIN)  our mission, secretariat, focus areas, and the team driving evidence-based policy across Africa.",
  keywords: [
    "About ARIN",
    "ARIN Mission",
    "Africa Research Network",
    "ARIN Secretariat",
    "African Research Institution",
    "ARIN Focus Areas",
  ],
  openGraph: {
    title: "About ARIN | Africa Research & Impact Network",
    description:
      "Discover ARIN's mission to bridge research and policy in Africa  meet our secretariat and explore our focus areas.",
    url: "https://arin-africa.org/about-us",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
