import Link from "next/link";
import { ArrowRight, Clock, MapPin, Maximize2, Newspaper } from "lucide-react";
import { cop31Days, mainPoster } from "@/data/cop31";
import { fmtDate, sortedEvents, timeLabel } from "@/app/hero-section/sections/cop31/lib";

const NEWS_BRIEF_HREF = "/press/news-briefs";

// The latest COP: a compact hero band, the programme and photographs.
// Reads the same data as the homepage COP31 hero (data/cop31.ts), so the two
// never drift apart.
export default function Cop31Feature() {
    const events = sortedEvents();
    const photos = [...cop31Days]
        .sort((a, b) => (a.date < b.date ? -1 : 1))
        .flatMap((d) => d.photos.map((p) => ({ ...p, date: d.date, dayTitle: d.title, newsBrief: d.newsBrief })));

    return (
        <>
            {/* Hero band */}
            <section className="bg-white border-b border-gray-200" aria-labelledby="cop-title">
                <div className="max-w-6xl mx-auto px-6 py-8 lg:py-10 grid md:grid-cols-[1fr_auto] gap-8 items-center">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 mb-3">
                            Convening Platforms · Conference of the Parties
                        </p>
                        <h1 id="cop-title" className="text-3xl lg:text-5xl font-bold leading-tight text-gray-900 mb-3">
                            ARIN at COP31
                        </h1>
                        <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mb-4">
                            <span>Antalya, Türkiye</span>
                            <span aria-hidden="true">·</span>
                            <span>9–20 November 2026</span>
                            <span aria-hidden="true">·</span>
                            <span>{events.length} events and engagements</span>
                        </p>
                        <p className="text-gray-600 leading-relaxed max-w-2xl mb-6">
                            ARIN brings African evidence into global climate negotiations. At COP31 we convened sessions on locally led
                            adaptation metrics, adaptation finance, high-integrity climate action and resilient cities for the urban poor.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="#cop31-programme"
                                className="px-5 py-2.5 bg-[#021d49] text-white font-semibold rounded-lg inline-flex items-center gap-2 hover:bg-[#032a5e] transition-colors"
                            >
                                View programme
                                <ArrowRight className="w-4 h-4" />
                            </a>
                            <Link
                                href={NEWS_BRIEF_HREF}
                                className="px-5 py-2.5 border border-gray-300 text-[#021d49] font-semibold rounded-lg inline-flex items-center gap-2 hover:border-[#021d49] transition-colors"
                            >
                                <Newspaper className="w-4 h-4" />
                                COP31 news briefs
                            </Link>
                        </div>
                    </div>

                    <a
                        href={mainPoster.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block relative w-44 lg:w-52 shrink-0 group"
                        aria-label="Open the ARIN at COP31 programme poster full size"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={mainPoster.src}
                            width={mainPoster.width}
                            height={mainPoster.height}
                            alt={mainPoster.alt}
                            className="w-full h-auto rounded-md border border-gray-200 shadow-md group-hover:-translate-y-1 transition-transform"
                        />
                        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-[#021d49]/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                            <Maximize2 className="w-3 h-3" />
                            Full poster
                        </span>
                    </a>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6">
                {/* Programme */}
                <section id="cop31-programme" className="pt-10 scroll-mt-28" aria-labelledby="cop31-programme-title">
                    <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
                        <h2 id="cop31-programme-title" className="text-2xl font-bold text-gray-900">
                            Events and engagements
                        </h2>
                        <span className="text-sm text-gray-500">All times are Türkiye time (UTC+3)</span>
                    </div>
                    <ul className="grid lg:grid-cols-2 gap-4">
                        {events.map((e) => (
                            <li key={e.id} className="bg-white rounded-xl border border-gray-200 shadow-sm flex gap-4 p-4">
                                <div className="w-16 shrink-0 rounded-lg bg-[#021d49]/5 text-[#021d49] flex flex-col items-center justify-center py-2 self-start">
                                    {e.date ? (
                                        <>
                                            <span className="text-2xl font-bold leading-none">{Number(e.date.slice(8))}</span>
                                            <span className="text-[11px] font-semibold uppercase tracking-wider mt-1">
                                                {fmtDate(e.date, { month: "short" })}
                                            </span>
                                            <span className="text-[11px] text-gray-500">{fmtDate(e.date, { weekday: "short" })}</span>
                                        </>
                                    ) : (
                                        <span className="text-xs font-semibold text-center leading-tight">Date TBC</span>
                                    )}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-[11px] font-semibold uppercase tracking-wider text-green-700">{e.organiser}</p>
                                    <h3 className="font-semibold text-gray-900 leading-snug mt-0.5">{e.title}</h3>
                                    <div className="mt-2 flex flex-col gap-1 text-[13px] text-gray-600">
                                        {e.date && (
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5 text-[#021d49] shrink-0" />
                                                {timeLabel(e)}
                                            </span>
                                        )}
                                        <span className="flex items-start gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-[#021d49] shrink-0 mt-0.5" />
                                            {e.venue ?? "Venue to be confirmed"}
                                        </span>
                                    </div>
                                </div>

                                {e.poster && (
                                    <a
                                        href={e.poster.src}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-20 h-24 shrink-0 self-start rounded-md overflow-hidden border border-gray-200 bg-slate-50 hover:shadow-md transition-shadow"
                                        aria-label={`Open the ${e.organiser} side event poster full size`}
                                        title="View poster"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={e.poster.src}
                                            width={e.poster.width}
                                            height={e.poster.height}
                                            alt={e.poster.alt}
                                            loading="lazy"
                                            className="w-full h-full object-cover object-top"
                                        />
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Photographs */}
                {photos.length > 0 && (
                    <section className="pt-10" aria-labelledby="cop31-photos-title">
                        <h2 id="cop31-photos-title" className="text-2xl font-bold text-gray-900 mb-4">
                            From Antalya
                        </h2>
                        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {photos.map((p) => (
                                <li key={p.src} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                    <a href={p.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={p.srcSmall ?? p.src}
                                            width={p.width}
                                            height={p.height}
                                            alt={p.alt}
                                            loading="lazy"
                                            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                                        />
                                    </a>
                                    <div className="px-4 py-3">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                                            {fmtDate(p.date, { weekday: "short", day: "numeric", month: "short" })}
                                        </p>
                                        <p className="font-semibold text-gray-900 leading-snug text-sm mt-0.5">{p.dayTitle}</p>
                                        {p.newsBrief && (
                                            <Link
                                                href={p.newsBrief}
                                                className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-[#021d49] hover:underline"
                                            >
                                                Read the news brief
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </>
    );
}
