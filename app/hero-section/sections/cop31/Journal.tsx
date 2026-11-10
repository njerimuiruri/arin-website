"use client";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cop31Days, cop31Events } from "@/data/cop31";
import { dayNumber, fmtDate } from "./lib";
import { useModal } from "./UseModal";

const HASH_PREFIX = "#day-";

// Staff photographs, grouped by day. A day only appears once it has at least
// one photo, so there are never empty placeholders for quiet days.
export default function Journal() {
    const days = useMemo(
        () =>
            cop31Days
                .filter((d) => d.photos.length > 0)
                .sort((a, b) => (a.date < b.date ? -1 : 1)),
        []
    );

    const [activeDate, setActiveDate] = useState(days.length ? days[days.length - 1].date : "");
    const [index, setIndex] = useState(0);
    const { ref, open, show, hide } = useModal();
    const sectionRef = useRef<HTMLElement>(null);
    const touchX = useRef<number | null>(null);

    // Deep links: /#day-2026-11-11 opens the journal on that day.
    useEffect(() => {
        const fromHash = () => {
            const hash = window.location.hash;
            if (!hash.startsWith(HASH_PREFIX)) return;
            const date = hash.slice(HASH_PREFIX.length);
            if (days.some((d) => d.date === date)) {
                setActiveDate(date);
                sectionRef.current?.scrollIntoView();
            }
        };
        fromHash();
        window.addEventListener("hashchange", fromHash);
        return () => window.removeEventListener("hashchange", fromHash);
    }, [days]);

    const day = days.find((d) => d.date === activeDate);
    const photos = day?.photos ?? [];

    const selectDay = useCallback((date: string) => {
        setActiveDate(date);
        // replaceState keeps the address shareable without jumping the page.
        window.history.replaceState(null, "", `${HASH_PREFIX}${date}`);
    }, []);

    const onTabKey = (e: React.KeyboardEvent, i: number) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        e.preventDefault();
        const next = days[(i + (e.key === "ArrowRight" ? 1 : -1) + days.length) % days.length];
        selectDay(next.date);
        document.getElementById(`c31-tab-${next.date}`)?.focus();
    };

    const openAt = (i: number) => {
        setIndex(i);
        show();
    };
    const step = useCallback(
        (dir: 1 | -1) => setIndex((i) => (i + dir + photos.length) % photos.length),
        [photos.length]
    );

    const onDialogKey = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
    };

    if (!day) return null;

    const photo = photos[Math.min(index, photos.length - 1)];
    const shown = photos.slice(0, 4);
    const hidden = photos.length - shown.length;
    const events = (day.eventIds ?? []).map((id) => cop31Events.find((e) => e.id === id)).filter(Boolean);
    const people = Array.from(new Set(photos.flatMap((p) => p.people ?? [])));

    return (
        <section ref={sectionRef} id="journal" className="c31-journal" aria-labelledby="c31-journal-title">
            <div className="c31-section-head">
                <div>
                    <p className="c31-eyebrow">Journal</p>
                    <h2 id="c31-journal-title" className="c31-h2 c31-serif">
                        Antalya, day by day
                    </h2>
                    <p className="c31-intro">Photographs of the ARIN team and our sessions, added as the conference unfolds.</p>
                </div>
            </div>

            <div className="c31-tabs" role="tablist" aria-label="Days at COP31">
                {days.map((d, i) => (
                    <button
                        key={d.date}
                        id={`c31-tab-${d.date}`}
                        type="button"
                        role="tab"
                        className="c31-tab"
                        aria-selected={d.date === activeDate}
                        aria-controls="c31-day-panel"
                        tabIndex={d.date === activeDate ? 0 : -1}
                        onClick={() => selectDay(d.date)}
                        onKeyDown={(e) => onTabKey(e, i)}
                    >
                        <span className="c31-tab-k">Day {dayNumber(d.date)}</span>
                        <span className="c31-tab-v c31-serif">{fmtDate(d.date, { day: "numeric", month: "short" })}</span>
                    </button>
                ))}
            </div>

            <div key={day.date} id="c31-day-panel" role="tabpanel" aria-labelledby={`c31-tab-${day.date}`} className="c31-day">
                <div>
                    <p className="c31-eyebrow">{fmtDate(day.date, { weekday: "long", day: "numeric", month: "long" })}</p>
                    <h3 className="c31-day-title c31-serif">{day.title}</h3>
                    {day.summary && <p className="c31-day-summary">{day.summary}</p>}

                    <dl className="c31-day-meta">
                        {events.length > 0 && (
                            <div>
                                <dt>{events.length > 1 ? "Sessions" : "Session"}</dt>
                                {events.map((e) => (
                                    <dd key={e!.id}>
                                        <a href="#programme">
                                            {e!.organiser}: {e!.title}
                                        </a>
                                    </dd>
                                ))}
                            </div>
                        )}
                        {people.length > 0 && (
                            <div>
                                <dt>Pictured</dt>
                                <dd>{people.join(", ")}</dd>
                            </div>
                        )}
                        <div>
                            <dt>Photographs</dt>
                            <dd>{photos.length}</dd>
                        </div>
                    </dl>
                </div>

                <ul className="c31-mosaic" data-count={shown.length}>
                    {shown.map((p, i) => (
                        <li key={p.src}>
                            <button
                                type="button"
                                className="c31-tile"
                                onClick={() => openAt(i)}
                                aria-label={i === shown.length - 1 && hidden > 0 ? `View all ${photos.length} photographs` : `View photograph ${i + 1} of ${photos.length}`}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={p.srcSmall ?? p.src} width={p.width} height={p.height} alt={p.alt} loading="lazy" decoding="async" />
                                {i === shown.length - 1 && hidden > 0 && <span className="c31-tile-more">+{hidden} more</span>}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <dialog ref={ref} className="c31-dialog" aria-label={`Photographs from day ${dayNumber(day.date)}`} onClose={hide} onKeyDown={onDialogKey}>
                {open && photo && (
                    <div className="c31-dialog-inner">
                        <div className="c31-dialog-bar">
                            <span>
                                Day {dayNumber(day.date)} · {fmtDate(day.date, { day: "numeric", month: "short" })} · {index + 1} / {photos.length}
                            </span>
                            <div className="c31-dialog-actions">
                                <button type="button" className="c31-icon-btn" onClick={hide} aria-label="Close">
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <div
                            className={`c31-dialog-stage${photos.length > 1 ? " has-nav" : ""}`}
                            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
                            onTouchEnd={(e) => {
                                if (touchX.current === null || photos.length < 2) return;
                                const dx = e.changedTouches[0].clientX - touchX.current;
                                touchX.current = null;
                                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
                            }}
                        >
                            {photos.length > 1 && (
                                <button type="button" className="c31-icon-btn c31-nav prev" onClick={() => step(-1)} aria-label="Previous photograph">
                                    <ChevronLeft size={20} />
                                </button>
                            )}
                            {/* key restarts the soft fade whenever the photo changes */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img key={photo.src} src={photo.src} width={photo.width} height={photo.height} alt={photo.alt} />
                            {photos.length > 1 && (
                                <button type="button" className="c31-icon-btn c31-nav next" onClick={() => step(1)} aria-label="Next photograph">
                                    <ChevronRight size={20} />
                                </button>
                            )}
                        </div>

                        <div className="c31-dialog-foot">
                            <div>
                                {photo.caption && <p className="c31-dialog-caption">{photo.caption}</p>}
                                {photo.people && photo.people.length > 0 && <p className="c31-dialog-people">{photo.people.join(", ")}</p>}
                            </div>
                            {photos.length > 1 && (
                                <div className="c31-dialog-mnav">
                                    <button type="button" className="c31-icon-btn" onClick={() => step(-1)} aria-label="Previous photograph">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button type="button" className="c31-icon-btn" onClick={() => step(1)} aria-label="Next photograph">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </dialog>
        </section>
    );
}