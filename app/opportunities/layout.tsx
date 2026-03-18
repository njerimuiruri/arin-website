import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Opportunities",
  description:
    "Explore career vacancies, fellowships, and corporate social responsibility (CSR) opportunities with the Africa Research & Impact Network (ARIN). Join us in driving evidence-based change across Africa.",
  keywords: [
    "ARIN Vacancies",
    "Africa Research Jobs",
    "CSR Opportunities Africa",
    "ARIN Fellowship",
    "African Development Careers",
    "Research Jobs Africa",
    "ARIN Opportunities",
  ],
  openGraph: {
    title: "Opportunities | ARIN Africa",
    description:
      "Find vacancies, fellowships, and CSR opportunities at ARIN and contribute to sustainable development research across Africa.",
    url: "https://arin-africa.org/opportunities",
  },
};

export default function OpportunitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
