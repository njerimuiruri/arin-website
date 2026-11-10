"use client";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Cop31Poster } from "@/data/cop31";
import PosterButton from "./Posterbutton";

export type ProgrammeItem = {
    id: string;
    status: "upcoming" | "today" | "live" | "concluded" | "tbc";
    statusLabel: string;
    /** Day of month, or null while the date is to be confirmed */
    day: number | null;
    month: string;
    weekday: string;
    time: string;
    organiser: string;
    title: string;
    venue: string;
    poster?: Cop31Poster;
};

export default function ProgrammeStrip({ items }: { items: ProgrammeItem[] }) {
    const listRef = useRef<HTMLUListElement>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const update = useCallback(() => {
        const el = listRef.current;
        if (!el) return;
        setCanPrev(el.scrollLeft > 4);
        setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        const el = listRef.current;
        if (!el) return;

        // Open on today's card (or the live one) rather than always on the first.
        const current = el.querySelector<HTMLElement>('[data-status="live"], [data-status="today"]');
        if (current) {
            const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
            const offset = current.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft - pad;
            if (offset > 0) el.scrollLeft = offset;
        }

        update();
        el.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [update]);

    const scrollBy = (dir: 1 | -1) => {
        const el = listRef.current;
        if (!el) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <section id="programme" className="c31-programme" aria-labelledby="c31-programme-title" style={{ scrollMarginTop: 96 }}>
            <div className="c31-section-head">
                <div>
                    <p className="c31-eyebrow">Programme</p>
                    <h2 id="c31-programme-title" className="c31-h2 c31-serif">
                        Where to find ARIN
                    </h2>
                </div>
                <div className="c31-head-aside">
                    <span>All times are Türkiye time (UTC+3)</span>
                    <div className="c31-arrows">
                        <button type="button" className="c31-arrow" onClick={() => scrollBy(-1)} disabled={!canPrev} aria-label="Earlier events">
                            <ChevronLeft size={18} />
                        </button>
                        <button type="button" className="c31-arrow" onClick={() => scrollBy(1)} disabled={!canNext} aria-label="Later events">
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <ul ref={listRef} className="c31-strip" tabIndex={0} aria-label="ARIN events at COP31">
                {items.map((e) => (
                    <li key={e.id} className="c31-card" data-status={e.status}>
                        <div className="c31-card-status">
                            {(e.status === "today" || e.status === "live") && <span className="c31-dot" data-live={e.status === "live"} aria-hidden="true" />}
                            {e.statusLabel}
                        </div>

                        <div className="c31-card-date c31-serif">
                            {e.day === null ? (
                                <span className="c31-card-day is-tbc">To be confirmed</span>
                            ) : (
                                <>
                                    <span className="c31-card-day">{e.day}</span>
                                    <span className="c31-card-month">
                                        {e.month}
                                        <br />
                                        {e.weekday}
                                    </span>
                                </>
                            )}
                        </div>

                        <p className="c31-card-time c31-mono">{e.time}</p>
                        <p className="c31-card-org">{e.organiser}</p>
                        <h3 className="c31-card-title">{e.title}</h3>
                        <p className="c31-card-venue">{e.venue}</p>

                        <div className="c31-card-foot">
                            {e.poster && (
                                <>
                                    <PosterButton
                                        poster={e.poster}
                                        title={`${e.organiser} · side event poster`}
                                        label={`View the ${e.organiser} side event poster full size`}
                                        className="c31-card-poster"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={e.poster.src} width={e.poster.width} height={e.poster.height} alt="" loading="lazy" decoding="async" />
                                        <span className="c31-card-poster-hint" aria-hidden="true">
                                            <Maximize2 size={11} />
                                            View full size
                                        </span>
                                    </PosterButton>
                                    <span className="c31-card-poster-label">Official side-event poster</span>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}