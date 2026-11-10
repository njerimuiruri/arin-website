import { Newsreader } from "next/font/google";

// Editorial serif for COP31 display type only — headings, dates and numerals.
// Body and interface text stay in the site's Geist. Newsreader's optical-size
// axis keeps large headlines finely drawn and small dates sturdy.
export const cop31Serif = Newsreader({
    subsets: ["latin"],
    style: ["normal", "italic"],
    axes: ["opsz"],
    display: "swap",
    variable: "--font-c31-serif",
});
