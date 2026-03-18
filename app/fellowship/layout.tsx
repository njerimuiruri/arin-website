import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ARIN Fellowship",
  description:
    "The ARIN Fellowship Program supports emerging African researchers and policymakers with mentorship, funding, and networking opportunities to advance evidence-based decision-making.",
  keywords: [
    "ARIN Fellowship",
    "Africa Research Fellowship",
    "African Researcher Funding",
    "Policy Fellowship Africa",
  ],
  openGraph: {
    title: "Fellowship | ARIN Africa",
    description:
      "Apply for the ARIN Fellowship and join a network of emerging African researchers and policymakers driving change.",
    url: "https://arin-africa.org/fellowship",
  },
};

export default function FellowshipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
