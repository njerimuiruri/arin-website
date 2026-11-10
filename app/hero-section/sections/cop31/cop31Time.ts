// Date logic for the COP31 experience. Everything is resolved on the server in
// Türkiye time (UTC+3, no daylight saving — the same offset as Kenya), then
// handed to client components as plain strings so there is never a hydration
// mismatch or a flash of the wrong "today".
import {
    cop31Days,
    cop31Events,
    COP31_SHOW_FROM,
    COP31_SHOW_UNTIL,
    COP31_START,
    type Cop31Day,
    type Cop31Event,
} from "@/data/cop31";

const TR_OFFSET_MS = 3 * 60 * 60 * 1000;

export type Cop31Now = { date: string; minutes: number };

export function nowInTurkey(): Cop31Now {
    const d = new Date(Date.now() + TR_OFFSET_MS);
    return { date: d.toISOString().slice(0, 10), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() };
}

export function isCop31Window(now: Cop31Now = nowInTurkey()) {
    return now.date >= COP31_SHOW_FROM && now.date <= COP31_SHOW_UNTIL;
}

const toMinutes = (hhmm: string) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
};

const asUTC = (date: string) => new Date(`${date}T00:00:00Z`);
const fmt = (date: string, opts: Intl.DateTimeFormatOptions) =>
    asUTC(date).toLocaleDateString("en-GB", { ...opts, timeZone: "UTC" });

/** 1-based conference day, e.g. 10 Nov → Day 2 */
export const conferenceDay = (date: string) =>
    Math.round((asUTC(date).getTime() - asUTC(COP31_START).getTime()) / 86_400_000) + 1;

export type EventStatus = "live" | "today" | "upcoming" | "concluded" | "tbc";

export type Cop31EventView = Cop31Event & {
    status: EventStatus;
    dayNumber: string | null; // "10"
    monthLabel: string | null; // "Nov"
    weekdayLabel: string | null; // "Tue"
    longDate: string; // "Tuesday 10 November" or "Date to be confirmed"
    timeLabel: string; // "18:30 – 20:00" or "Time to be confirmed"
    hasJournal: boolean;
};

export type Cop31DayView = Cop31Day & {
    longDate: string;
    shortDate: string;
    weekday: string;
    dayLabel: string;
    events: { id: string; organiser: string; title: string }[];
};

function statusOf(e: Cop31Event, now: Cop31Now): EventStatus {
    if (!e.date) return "tbc";
    if (e.date < now.date) return "concluded";
    if (e.date > now.date) return "upcoming";
    if (e.start && e.end) {
        const s = toMinutes(e.start), en = toMinutes(e.end);
        if (now.minutes >= s && now.minutes < en) return "live";
        if (now.minutes >= en) return "concluded";
    }
    return "today";
}

export function buildCop31View(now: Cop31Now = nowInTurkey()) {
    const journalDays = cop31Days
        .filter((d) => d.photos.length > 0)
        .sort((a, b) => a.date.localeCompare(b.date));
    const journalDates = new Set(journalDays.map((d) => d.date));

    const events: Cop31EventView[] = [...cop31Events]
        .sort((a, b) => {
            if (!a.date) return 1;
            if (!b.date) return -1;
            if (a.date !== b.date) return a.date.localeCompare(b.date);
            if (!a.start) return 1;
            if (!b.start) return -1;
            return a.start.localeCompare(b.start);
        })
        .map((e) => ({
            ...e,
            status: statusOf(e, now),
            dayNumber: e.date ? fmt(e.date, { day: "numeric" }) : null,
            monthLabel: e.date ? fmt(e.date, { month: "short" }) : null,
            weekdayLabel: e.date ? fmt(e.date, { weekday: "short" }) : null,
            longDate: e.date ? fmt(e.date, { weekday: "long", day: "numeric", month: "long" }) : "Date to be confirmed",
            timeLabel: e.start ? (e.end ? `${e.start} – ${e.end}` : e.start) : "Time to be confirmed",
            hasJournal: !!e.date && journalDates.has(e.date),
        }));

    const days: Cop31DayView[] = journalDays.map((d) => ({
        ...d,
        longDate: fmt(d.date, { weekday: "long", day: "numeric", month: "long" }),
        shortDate: fmt(d.date, { day: "numeric", month: "short" }),
        weekday: fmt(d.date, { weekday: "short" }),
        dayLabel: `Day ${conferenceDay(d.date)}`,
        events: cop31Events
            .filter((e) => d.eventIds?.includes(e.id) || (!d.eventIds && e.date === d.date))
            .map(({ id, organiser, title }) => ({ id, organiser, title })),
    }));

    // What the hero's status line talks about: today's events, else the next ones.
    const todays = events.filter((e) => e.date === now.date);
    const nextDate = events.find((e) => e.date && e.date > now.date)?.date ?? null;
    const remainingToday = todays.filter((e) => e.status !== "concluded");

    let focus: { mode: "today" | "next" | "concluded"; label: string; events: Cop31EventView[] };
    if (remainingToday.length) {
        focus = { mode: "today", label: `Today · ${remainingToday[0].longDate}`, events: remainingToday };
    } else if (nextDate) {
        const next = events.filter((e) => e.date === nextDate);
        focus = { mode: "next", label: `Next · ${next[0].longDate}`, events: next };
    } else {
        focus = { mode: "concluded", label: "Programme concluded", events: [] };
    }

    // The programme strip opens on the first event that is still relevant.
    const anchorId = events.find((e) => e.status !== "concluded")?.id ?? events[events.length - 1]?.id;

    return { now, events, days, focus, anchorId, conferenceDay: conferenceDay(now.date) };
}
