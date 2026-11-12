// Policy briefs featured as static files on the website (in addition to the
// briefs managed through the dashboard). Used on the Policy Briefs page and on
// the relevant focus-area page.

export type FeaturedBrief = {
    title: string;
    series: string;
    year: number;
    summary: string;
    priorities: string[];
    partners: string;
    pdf: string;
    cover: string;
    coverWidth: number;
    coverHeight: number;
};

export const lancetKenya2026: FeaturedBrief = {
    title: "2026 Climate and Health Policy Priorities for Kenya",
    series: "Lancet Countdown",
    year: 2026,
    summary:
        "Key priority areas for Kenya, supported by evidence from indicators in the 2026 Report of the Lancet Countdown on health and climate change.",
    priorities: [
        "Strengthen heat-health protection in affordable housing and informal-settlement upgrading",
        "Finance affordable access to renewable and zero-emission household energy",
        "Integrate county-level climate and health information into health planning and emergency preparedness",
    ],
    partners:
        "Developed by the Lancet Countdown, the Africa Research and Impact Network (ARIN) and the Pan-African Environment, Climate Change and Health Action Network (PECHAN).",
    pdf: "/documents/Lancet-Countdown-2026-Kenya-Climate-Health-Policy-Priorities.pdf",
    cover: "/img/briefs/lancet-countdown-kenya-2026.jpg",
    coverWidth: 720,
    coverHeight: 1018,
};
