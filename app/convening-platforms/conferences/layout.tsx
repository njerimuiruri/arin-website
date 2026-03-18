import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conferences",
  description:
    "ARIN convenes high-level conferences that bring together Africa's leading researchers, policymakers, and practitioners to share evidence and shape policy for sustainable development.",
  openGraph: {
    title: "Conferences | ARIN Africa",
    description:
      "Explore ARIN's flagship conferences connecting Africa's research and policy leaders.",
    url: "https://arin-africa.org/convening-platforms/conferences",
  },
};

export default function ConferencesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
