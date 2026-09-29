import HeroOriginalSection from "./HeroOriginalSection";
import HeroPanelSection from "./HeroPanelSection";
import HeroCleanSection from "./HeroCleanSection";

// The homepage hero rotates daily through these designs, in this order.
// Chosen on the server from the date, so every visitor sees the same design
// on a given day and there is no flash of a different design on load.
const designs = [HeroOriginalSection, HeroPanelSection, HeroCleanSection];

// The day rolls over at midnight Kenya time (EAT, UTC+3, no daylight saving).
const EAT_OFFSET_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

// 29 Sep 2026 (EAT) shows the first design; each following day moves to the next.
const START_DAY = Date.UTC(2026, 8, 29) / DAY_MS;

export default function DailyHero() {
    const today = Math.floor((Date.now() + EAT_OFFSET_MS) / DAY_MS);
    const index = (((today - START_DAY) % designs.length) + designs.length) % designs.length;
    const Hero = designs[index];
    return <Hero />;
}
