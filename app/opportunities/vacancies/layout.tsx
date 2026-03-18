import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vacancies",
  description:
    "Explore open positions at the Africa Research & Impact Network (ARIN). Join a passionate team driving research, policy, and impact across the African continent.",
  openGraph: {
    title: "Vacancies | ARIN Africa",
    description:
      "Find open positions at ARIN and become part of a team shaping Africa's research and development landscape.",
    url: "https://arin-africa.org/opportunities/vacancies",
  },
};

export default function VacanciesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
