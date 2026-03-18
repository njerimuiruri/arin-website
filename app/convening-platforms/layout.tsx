import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convening Platforms",
  description:
    "ARIN's convening platforms bring together researchers, policymakers, and communities through conferences, policy dialogues, events, and COP engagements to advance evidence-based decision-making in Africa.",
  keywords: [
    "ARIN Conferences",
    "Africa Policy Dialogues",
    "African Research Events",
    "COP Africa",
    "ARIN Convening",
    "Africa Climate Conference",
    "Research Policy Events Africa",
  ],
  openGraph: {
    title: "Convening Platforms | ARIN Africa",
    description:
      "Join ARIN's conferences, policy dialogues, and events that connect Africa's research and policy communities.",
    url: "https://arin-africa.org/convening-platforms",
  },
};

export default function ConveningPlatformsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
