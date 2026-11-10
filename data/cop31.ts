// ARIN at COP31 (Antalya, Türkiye · 9–20 November 2026)
//
// Single source of truth for the COP31 homepage experience. Three kinds of
// content live here and are deliberately kept apart on the page:
//
//   1. mainPoster     – the official ARIN at COP31 programme poster (hero identity)
//   2. cop31Events    – the programme itself; an event may carry its own
//                       official side-event poster
//   3. cop31Days      – the journal: real photographs of ARIN staff and
//                       activities, grouped by day
//
// ── Adding a day's photographs ────────────────────────────────────────────
//   1. Put the original photos in  scripts/cop31-incoming/<YYYY-MM-DD>/
//   2. Run                          npm run cop31:photos
//      This writes web-sized copies to public/img/cop/days/<date>/ and prints
//      a ready-to-paste entry with the correct widths and heights.
//   3. Paste the entry into cop31Days below, then add the alt text, captions
//      and the names of the ARIN staff pictured.
//
// A day only appears on the site once it has at least one photo, so there is
// never an empty placeholder for days without activities.
//
// All dates and times are Türkiye time (UTC+3).

export type Cop31Poster = {
    src: string;
    width: number;
    height: number;
    alt: string;
};

export type Cop31Event = {
    id: string;
    /** YYYY-MM-DD, or null while the date is still to be confirmed */
    date: string | null;
    /** "HH:MM", or null while the time is still to be confirmed */
    start: string | null;
    end?: string | null;
    organiser: string;
    title: string;
    venue: string | null;
    poster?: Cop31Poster;
};

export type Cop31Photo = {
    /** Large version, roughly 2000px on the long edge */
    src: string;
    /** Small version, roughly 900px on the long edge, used in the grid */
    srcSmall?: string;
    width: number;
    height: number;
    /** Describe what is happening in the photo, for screen readers */
    alt: string;
    caption?: string;
    /** ARIN staff and guests pictured, left to right */
    people?: string[];
};

export type Cop31Day = {
    /** YYYY-MM-DD */
    date: string;
    /** A short headline for the day, e.g. "Opening our programme with CARE International" */
    title: string;
    summary?: string;
    /** Programme events this day's photos relate to */
    eventIds?: string[];
    photos: Cop31Photo[];
};

export const COP31_START = "2026-11-09";
export const COP31_END = "2026-11-20";

/** The homepage shows the COP31 experience from a few days before the
 *  conference until shortly after it, then returns to the standard hero. */
export const COP31_SHOW_FROM = "2026-11-05";
export const COP31_SHOW_UNTIL = "2026-11-23";

export const mainPoster: Cop31Poster = {
    src: "/img/cop/pic1.jpeg",
    width: 1067,
    height: 1600,
    alt: "ARIN at COP31: events and engagements poster, November 2026. The full programme is also listed as text on this page.",
};

const bioCam4Poster: Cop31Poster = {
    src: "/img/cop/pic2.jpeg",
    width: 800,
    height: 1000,
    alt: "Side event poster: High-Integrity Climate Action for Climate, Nature and People, 11 November 2026, Room 2 Dalyan, with eight speakers including Joanes Atela of ARIN.",
};

const ipamPoster: Cop31Poster = {
    src: "/img/cop/pic4.jpeg",
    width: 794,
    height: 1123,
    alt: "Save the date poster: International Platform on Adaptation Metrics side event, Thursday 12 November 2026, 15:30 to 17:00, Moroccan Pavilion, Blue Zone.",
};

export const cop31Events: Cop31Event[] = [
    {
        id: "care-international",
        date: "2026-11-10",
        start: "18:30",
        end: "20:00",
        organiser: "CARE International",
        title: "Adaptation cannot wait: Financing climate resilience and just transition for vulnerable communities",
        venue: "Side Event Room 1, Gordiyon",
    },
    {
        id: "biocam4",
        date: "2026-11-11",
        start: "15:00",
        end: "16:30",
        organiser: "BioCAM4",
        title: "High-Integrity Climate Action for Climate, Nature & People: From Local Action to Global Impact",
        venue: "Side Event Room 2, Dalyan",
        poster: bioCam4Poster,
    },
    {
        id: "ipam",
        date: "2026-11-12",
        // The ARIN programme poster lists 16:30; IPAM's own poster lists
        // 15:30–17:00. Using IPAM's official time — confirm with the team.
        start: "15:30",
        end: "17:00",
        organiser: "IPAM",
        title: "Advancing the Global Adaptation Metrics Agenda",
        venue: "Moroccan Pavilion, Blue Zone",
        poster: ipamPoster,
    },
    {
        id: "globe-parliament",
        date: "2026-11-14",
        start: "11:00",
        organiser: "Globe Parliament",
        title: "Research and Policy Linkages",
        venue: "Globe Parliament Meeting Room",
    },
    {
        id: "bcrup-high-level",
        date: "2026-11-14",
        start: null,
        organiser: "BCRUP",
        title: "High-Level Event: BCRUP Implementation Pathway through Climate Finance: Translating Global Ambitions into Local Actions",
        venue: null,
    },
    {
        id: "bcrup-urban",
        date: "2026-11-16",
        start: null,
        organiser: "BCRUP",
        title: "Scaling Urban Resilience and Bankable Infrastructure Pipelines for Africa's Urban Poor",
        venue: null,
    },
    {
        id: "unfccc-technical",
        date: "2026-11-18",
        start: null,
        organiser: "UNFCCC",
        title: "Technical Sessions",
        venue: null,
    },
    {
        id: "bcrup-boad",
        date: "2026-11-19",
        start: "11:30",
        end: "13:00",
        organiser: "BCRUP",
        title: "From Belém to Local Action: BCRUP and BOAD Financing Resilience for Vulnerable Communities",
        venue: "Side Event Room 5, Hattuşa",
    },
    {
        id: "resilience-hub",
        date: null,
        start: null,
        organiser: "Resilience Hub",
        title: "Locally Led Adaptation at the Resilience Hub Pavilion",
        venue: "Resilience Hub Pavilion, Blue Zone",
    },
];

// The journal. Newest entries can go anywhere — the page sorts by date.
export const cop31Days: Cop31Day[] = [
    // Example:
    // {
    //     date: "2026-11-10",
    //     title: "Opening our programme with CARE International",
    //     summary: "ARIN joined CARE International to make the case for adaptation finance that reaches vulnerable communities first.",
    //     eventIds: ["care-international"],
    //     photos: [
    //         {
    //             src: "/img/cop/days/2026-11-10/panel-2000.webp",
    //             srcSmall: "/img/cop/days/2026-11-10/panel-900.webp",
    //             width: 2000,
    //             height: 1333,
    //             alt: "Panellists seated on stage in Side Event Room 1 as an ARIN researcher speaks",
    //             caption: "Panel discussion in Side Event Room 1, Gordiyon",
    //             people: ["Prof. Joanes Atela"],
    //         },
    //     ],
    // },
];
