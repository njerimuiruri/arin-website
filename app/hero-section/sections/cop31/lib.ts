import { COP31_START, cop31Events, type Cop31Event } from "@/data/cop31";

// Türkiye (Antalya) and Kenya are both UTC+3 with no daylight saving, so one
// fixed offset covers the programme times and our own server clock.
const OFFSET_MS = 3 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export type Cop31Status = "upcoming" | "today" | "live" | "concluded" | "tbc";

export type Cop31Now = { date: string; minutes: number };

export function turkeyNow(now: number = Date.now()): Cop31Now {
    const d = new Date(now + OFFSET_MS);
    return {
        date: d.toISOString().slice(0, 10),
        minutes: d.getUTCHours() * 60 + d.getUTCMinutes(),
    };
}

const toMinutes = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
};

export function eventStatus(e: Cop31Event, now: Cop31Now): Cop31Status {
    if (!e.date) return "tbc";
    if (e.date > now.date) return "upcoming";
    if (e.date < now.date) return "concluded";
    // Today
    if (!e.start) return "today";
    const start = toMinutes(e.start);
    const end = e.end ? toMinutes(e.end) : start + 90;
    if (now.minutes < start) return "today";
    if (now.minutes < end) return "live";
    return "concluded";
}

/** Parse YYYY-MM-DD as a UTC date so formatting never shifts by time zone. */
export const utcDate = (iso: string) => new Date(`${iso}T00:00:00Z`);

export function fmtDate(iso: string, opts: Intl.DateTimeFormatOptions) {
    return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", ...opts }).format(utcDate(iso));
}

/** Day 1 is the opening day of the conference. */
export function dayNumber(iso: string) {
    return Math.round((utcDate(iso).getTime() - utcDate(COP31_START).getTime()) / DAY_MS) + 1;
}

/** Programme in date order; undated entries go last. */
export function sortedEvents(): Cop31Event[] {
    return [...cop31Events].sort((a, b) => {
        if (!a.date && !b.date) return 0;
        if (!a.date) return 1;
        if (!b.date) return -1;
        if (a.date !== b.date) return a.date < b.date ? -1 : 1;
        if (!a.start && !b.start) return 0;
        if (!a.start) return 1;
        if (!b.start) return -1;
        return a.start < b.start ? -1 : 1;
    });
}

export function timeLabel(e: Cop31Event) {
    if (!e.start) return e.date ? "Time to be confirmed" : "Date and time to be confirmed";
    return e.end ? `${e.start}\u2013${e.end}` : e.start;
}