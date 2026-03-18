import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Capacity Building",
  description:
    "ARIN's capacity-building programs equip African researchers, policymakers, and practitioners with the skills and tools to generate and use evidence for sustainable development decisions.",
  openGraph: {
    title: "Capacity Building | ARIN Africa",
    description:
      "Empowering Africa's research and policy community through targeted training, workshops, and capacity-building programs.",
    url: "https://arin-africa.org/programs/capacity-building",
  },
};

export default function CapacityBuildingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
