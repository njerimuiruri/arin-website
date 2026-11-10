import { ArrowRight, Maximize2 } from "lucide-react";
import Link from "next/link";
import { cop31Days, mainPoster } from "@/data/cop31";
import "./Cop31.css";
import { cop31Serif } from "./fonts";
import Journal from "./Journal";
import PosterButton from "./Posterbutton";
import ProgrammeStrip, { type ProgrammeItem } from "./ProgrammeStrip";
import { eventStatus, fmtDate, sortedEvents, timeLabel, turkeyNow, type Cop31Status } from "./lib";

const STATUS_LABEL: Record<Cop31Status, string> = {
    upcoming: "Upcoming",
    today: "Today",
    live: "Live now",
    concluded: "Concluded",
    tbc: "Date to be confirmed",
};

// Rendered on the server from Türkiye time, so every visitor sees the same
// "today" and there is no flash of different content on load.
export default function Cop31Hero() {
    const now = turkeyNow();
    const events = sortedEvents();

    const todays = events.filter((e) => e.date === now.date);
    const next = events.find((e) => e.date && e.date > now.date);
    const focusEvents = todays.length > 0 ? todays : next ? events.filter((e) => e.date === next.date) : [];
    const focusDate = todays.length > 0 ? now.date : next?.date;
    const anyLive = todays.some((e) => eventStatus(e, now) === "live");
    const hasPhotos = cop31Days.some((d) => d.photos.length > 0);

    const items: ProgrammeItem[] = events.map((e) => {
        const status = eventStatus(e, now);
        return {
            id: e.id,
            status,
            statusLabel: STATUS_LABEL[status],
            day: e.date ? Number(e.date.slice(8)) : null,
            month: e.date ? fmtDate(e.date, { month: "short" }) : "",
            weekday: e.date ? fmtDate(e.date, { weekday: "short" }) : "",
            time: timeLabel(e),
            organiser: e.organiser,
            title: e.title,
            venue: e.venue ?? "Venue to be confirmed",
            poster: e.poster,
        };
    });

    return (
        <div className={`c31 ${cop31Serif.variable}`}>
            <section className="c31-hero" aria-labelledby="c31-title">
                <div className="c31-copy">
                    <p className="c31-eyebrow c31-meta c31-fade">
                        <span>
                            <strong>COP31</strong>
                        </span>
                        <span>Antalya, Türkiye</span>
                        <span>9–20 November 2026</span>
                    </p>

                    <h1 id="c31-title" className="c31-title c31-serif">
                        <span className="c31-line">
                            <span>ARIN at</span>
                        </span>
                        <span className="c31-line">
                            <span>
                                <em>COP31</em>
                            </span>
                        </span>
                    </h1>

                    <p className="c31-lede c31-fade c31-d1">Evidence from Africa, in the rooms where climate finance is decided.</p>

                    {focusEvents.length > 0 && focusDate && (
                        <div className="c31-focus c31-fade c31-d2">
                            <p className="c31-eyebrow c31-focus-label">
                                <span className="c31-dot" data-live={anyLive} aria-hidden="true" />
                                {todays.length > 0 ? (anyLive ? "Live now" : "Today") : "Next"} ·{" "}
                                {fmtDate(focusDate, { weekday: "short", day: "numeric", month: "short" })}
                            </p>
                            <ul className="c31-focus-list">
                                {focusEvents.map((e) => (
                                    <li key={e.id} className="c31-focus-item">
                                        <span className="c31-focus-time c31-mono">{e.start ?? "TBC"}</span>
                                        <div>
                                            <p className="c31-focus-org">{e.organiser}</p>
                                            <p className="c31-focus-title">{e.title}</p>
                                            <p className="c31-focus-venue">{e.venue ?? "Venue to be confirmed"}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="c31-actions c31-fade c31-d3">
                        <a href="#programme" className="c31-btn">
                            Full programme
                            <ArrowRight size={16} aria-hidden="true" />
                        </a>
                        {hasPhotos ? (
                            <a href="#journal" className="c31-link">
                                Photographs from Antalya
                            </a>
                        ) : (
                            <Link href="/contact" className="c31-link">
                                Contact ARIN
                            </Link>
                        )}
                    </div>
                </div>

                <div className="c31-stage">
                    <div className="c31-poster-wrap">
                        <PosterButton
                            poster={mainPoster}
                            title="ARIN at COP31 · Events and engagements"
                            label="View the ARIN at COP31 programme poster full size"
                            className="c31-poster"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={mainPoster.src} width={mainPoster.width} height={mainPoster.height} alt={mainPoster.alt} fetchPriority="high" decoding="async" />
                            <span className="c31-poster-hint" aria-hidden="true">
                                <Maximize2 size={12} />
                                View full size
                            </span>
                        </PosterButton>
                        <p className="c31-caption">
                            <span>
                                <b>Events and engagements</b>
                                November 2026
                            </span>
                            <span>Türkiye time</span>
                        </p>
                    </div>
                </div>
            </section>

            <ProgrammeStrip items={items} />
            <Journal />
        </div>
    );
}