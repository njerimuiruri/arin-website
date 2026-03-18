import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Stay up to date with ARIN's upcoming and past events — workshops, seminars, webinars, and community engagement sessions driving evidence-based development across Africa.",
  openGraph: {
    title: "Events | ARIN Africa",
    description:
      "Discover upcoming ARIN workshops, seminars, and webinars on research, policy, and sustainable development across Africa.",
    url: "https://arin-africa.org/convening-platforms/events",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
