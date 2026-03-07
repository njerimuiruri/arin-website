"use client";
import {
    ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX,
    Globe, Zap, Leaf, Building2, FlaskConical, HeartPulse, Pickaxe,
    Newspaper, FileText, BookOpen, PenTool
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import React from "react";

import { Event as ArinEvent } from "@/services/eventsService";
import { TechnicalReport } from "@/services/technicalReportsService";
import { PolicyBrief } from "@/services/policyBriefsService";

interface NewsBrief {
    _id?: string; title: string; description?: string;
    image?: string; coverImage?: string; datePosted?: string; createdAt?: string; date?: string;
}
interface ResearchProject {
    _id?: string; title: string; description?: string; image?: string;
    datePosted?: string; createdAt?: string; date?: string;
}
interface Props {
    events: ArinEvent[]; techReports: TechnicalReport[]; policyBriefs: PolicyBrief[];
    newsBriefs: NewsBrief[]; researchProjects: ResearchProject[]; policyDialogues: any[];
}

const slides = [
    { type: "image" as const, src: "/images/lreb.jpg", icon: Leaf, label: "Sustainable Development", tag: "01", href: "/about-us/focus-areas" },
    { type: "image" as const, src: "/images/fgd1.jpg", icon: Zap, label: "Climate Change & Energy", tag: "02", href: "/about-us/focus-areas" },
    { type: "image" as const, src: "/images/lreb4.jpg", icon: Building2, label: "Cities & Resilience", tag: "03", href: "/about-us/focus-areas" },
    { type: "video" as const, src: "/videos/hero1.mp4", poster: "/images/sdg.jpeg", icon: Globe, label: "Agriculture & Forestry", tag: "04", href: "/about-us/focus-areas" },
    { type: "image" as const, src: "/images/geo.jpeg", icon: Pickaxe, label: "Mining, Trade & Industry", tag: "05", href: "/about-us/focus-areas" },
    { type: "video" as const, src: "/videos/hero2.mp4", poster: "/images/lreb.jpg", icon: FlaskConical, label: "Technology & Innovation", tag: "06", href: "/about-us/focus-areas" },
    { type: "image" as const, src: "/images/fgd1.jpg", icon: HeartPulse, label: "Climate & Health", tag: "07", href: "/about-us/focus-areas" },
];

const DURATION = 6000;

const HeroSection = ({ events, techReports, policyBriefs, newsBriefs, researchProjects, policyDialogues }: Props) => {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(true);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

    const goTo = useCallback((idx: number) => {
        if (idx === current) return;
        setPrev(current); setCurrent(idx);
    }, [current]);
    const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
    const prev_ = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

    useEffect(() => {
        if (paused) { clearInterval(timerRef.current!); return; }
        clearInterval(timerRef.current!);
        timerRef.current = setInterval(next, DURATION);
        return () => clearInterval(timerRef.current!);
    }, [current, paused, next]);

    useEffect(() => {
        videoRefs.current.forEach((v, i) => {
            if (!v) return;
            if (i === current) { v.currentTime = 0; v.muted = muted; paused ? v.pause() : v.play().catch(() => { }); }
            else v.pause();
        });
    }, [current, paused, muted]);

    const slide = slides[current];
    const Icon = slide.icon;
    const isVideo = slide.type === "video";

    // Latest docs helpers
    const byDate = (a: any[]) => [...a].sort((x, y) =>
        new Date(y.datePosted || y.createdAt || y.date || 0).getTime() -
        new Date(x.datePosted || x.createdAt || x.date || 0).getTime()
    );
    const latest = {
        news: Array.isArray(newsBriefs) && newsBriefs.length ? byDate(newsBriefs)[0] : null,
        tech: Array.isArray(techReports) && techReports.length ? byDate(techReports)[0] : null,
        policy: Array.isArray(policyBriefs) && policyBriefs.length ? byDate(policyBriefs)[0] : null,
        research: Array.isArray(researchProjects) && researchProjects.length ? byDate(researchProjects)[0] : null,
    };

    return (
        <React.Fragment>
            <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

            .fp { font-family:'Playfair Display',serif; }
            .fd { font-family:'DM Sans',sans-serif; }
            .fm { font-family:'DM Mono',monospace; }

            /* ── animations ── */
            @keyframes kb   { 0%{transform:scale(1.07)} 100%{transform:scale(1)} }
            @keyframes fu   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
            @keyframes fl   { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
            @keyframes ipop { 0%{opacity:0;transform:scale(.75) rotate(-8deg)} 100%{opacity:1;transform:scale(1) rotate(0)} }
            @keyframes pb   { from{width:0%} to{width:100%} }
            @keyframes spin { to{transform:rotate(360deg)} }

            .a-tag  { animation:fl   .5s ease forwards .0s; opacity:0 }
            .a-icon { animation:ipop .55s cubic-bezier(.34,1.56,.64,1) forwards .08s; opacity:0 }
            .a-h1   { animation:fu   .6s ease forwards .16s; opacity:0 }
            .a-sub  { animation:fu   .6s ease forwards .26s; opacity:0 }
            .a-cta  { animation:fu   .55s ease forwards .36s; opacity:0 }

            /* ── glass ── */
            .g-dark {
                background: rgba(2,29,73,.55);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border:1px solid rgba(255,255,255,.12);
            }
            .g-light {
                background: rgba(255,255,255,.14);
                backdrop-filter: blur(18px);
                -webkit-backdrop-filter: blur(18px);
                border:1px solid rgba(255,255,255,.28);
            }
            .g-white {
                background: rgba(255,255,255,.92);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border:1px solid rgba(255,255,255,1);
                box-shadow:0 4px 20px rgba(2,29,73,.10);
            }

            /* ── thumb icon buttons ── */
            .th-btn {
                flex-shrink:0;
                width:48px; height:48px; border-radius:14px;
                display:flex; align-items:center; justify-content:center;
                cursor:pointer;
                border:1.5px solid rgba(255,255,255,.20);
                background:rgba(255,255,255,.10);
                transition:all .25s ease;
                position:relative;
            }
            .th-btn:hover { background:rgba(255,255,255,.25); border-color:rgba(255,255,255,.5); transform:translateY(-2px); }
            .th-btn.th-on { background:white; border-color:white; box-shadow:0 4px 16px rgba(0,0,0,.2); }
            .th-btn.th-on svg { color:#021d49 !important; }
            .th-btn .th-tip {
                position:absolute; bottom:calc(100% + 8px); left:50%; transform:translateX(-50%);
                background:#021d49; color:white; padding:4px 10px; border-radius:8px;
                font-size:10px; white-space:nowrap; font-family:'DM Sans',sans-serif;
                opacity:0; pointer-events:none; transition:opacity .2s ease;
            }
            .th-btn:hover .th-tip { opacity:1; }

            /* ── ctrl buttons ── */
            .c-btn {
                width:38px; height:38px; border-radius:50%;
                display:flex; align-items:center; justify-content:center;
                background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.28);
                cursor:pointer; transition:all .2s ease;
                backdrop-filter:blur(8px);
            }
            .c-btn:hover { background:white; }
            .c-btn:hover svg { color:#021d49 !important; }

            /* ── CTA ── */
            .btn-primary {
                display:inline-flex; align-items:center; gap:8px;
                padding:13px 26px; border-radius:999px;
                background:#021d49; color:white;
                font-family:'DM Sans',sans-serif; font-weight:600; font-size:14px;
                letter-spacing:.02em; transition:all .25s ease;
                box-shadow:0 4px 20px rgba(2,29,73,.35);
            }
            .btn-primary:hover { background:#1d4ed8; transform:translateY(-1px); box-shadow:0 8px 28px rgba(29,78,216,.4); }

            .btn-ghost {
                display:inline-flex; align-items:center; gap:6px;
                padding:12px 22px; border-radius:999px;
                background:rgba(255,255,255,.15); color:white;
                font-family:'DM Sans',sans-serif; font-weight:500; font-size:14px;
                border:1.5px solid rgba(255,255,255,.35);
                transition:all .25s ease; backdrop-filter:blur(8px);
            }
            .btn-ghost:hover { background:rgba(255,255,255,.25); border-color:rgba(255,255,255,.6); gap:10px; }

            /* spinning dashed ring */
            @keyframes dashspin { to{stroke-dashoffset:-100} }
        `}</style>

            {/* ══════════════════════════════════════════════════════════
            HERO  — fullscreen, image shows fully, text bottom-left
        ══════════════════════════════════════════════════════════ */}
            <section className="relative w-full overflow-hidden" style={{ height: "100svh", minHeight: 640 }}>

                {/* ─── background slides ─── */}
                {slides.map((s, i) => {
                    const on = i === current, was = i === prev;
                    return (
                        <div key={i} className="absolute inset-0" style={{
                            zIndex: on ? 2 : was ? 1 : 0,
                            opacity: on ? 1 : 0,
                            transition: "opacity 1.2s ease-in-out",
                        }}>
                            {s.type === "video"
                                ? <video ref={el => { videoRefs.current[i] = el }} src={s.src} poster={(s as any).poster}
                                    muted={muted} loop playsInline
                                    className="absolute inset-0 w-full h-full object-cover" />
                                : <div className="absolute inset-0" style={{
                                    backgroundImage: `url(${s.src})`,
                                    backgroundSize: "cover", backgroundPosition: "center",
                                    animation: on ? "kb 7s ease-in-out forwards" : "none",
                                }} />
                            }
                            {/* Gradient: heavy bottom-left for text, light everywhere else */}
                            <div className="absolute inset-0" style={{
                                background: "linear-gradient(135deg, rgba(2,29,73,0.72) 0%, rgba(2,29,73,0.18) 55%, rgba(2,29,73,0.04) 100%)"
                            }} />
                            {/* Extra bottom fade */}
                            <div className="absolute inset-0" style={{
                                background: "linear-gradient(to top, rgba(2,29,73,0.60) 0%, transparent 40%)"
                            }} />
                        </div>
                    );
                })}

                {/* ─── UI layer ─── */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between pointer-events-none">

                    {/* ── TOP BAR ── */}
                    <div className="flex items-center justify-between px-6 sm:px-10 lg:px-20 pt-24 pointer-events-auto">
                        {/* ARIN badge */}
                        <div className="g-light rounded-2xl px-4 py-2 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="fm text-white/80 text-xs tracking-widest uppercase">
                                Africa Research & Impact Network
                            </span>
                        </div>

                        {/* Right: slide counter + mute */}
                        <div className="flex items-center gap-3">
                            <div className="g-light rounded-xl px-3 py-1.5">
                                <span className="fm text-white/50 text-xs">
                                    <span className="fp font-black text-white text-base">{String(current + 1).padStart(2, "0")}</span>
                                    <span className="mx-1 text-white/30">/</span>
                                    {String(slides.length).padStart(2, "0")}
                                </span>
                            </div>
                            {isVideo && (
                                <button onClick={() => setMuted(m => !m)} className="c-btn pointer-events-auto" aria-label="Toggle mute">
                                    {muted ? <VolumeX className="w-3.5 h-3.5 text-white" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* ── MAIN CONTENT — bottom-left ── */}
                    <div className="px-6 sm:px-10 lg:px-20 pb-10 pointer-events-auto">

                        {/* Discipline content block */}
                        <div key={current} className="mb-8 max-w-xl">

                            {/* Tag row */}
                            <div className="a-tag flex items-center gap-3 mb-4">
                                {/* Animated dashed ring icon */}
                                <div style={{
                                    width: 52, height: 52, borderRadius: "50%", flexShrink: 0,
                                    border: "2px dashed rgba(255,255,255,.45)",
                                    background: "rgba(255,255,255,.12)",
                                    backdropFilter: "blur(12px)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="fm text-white/50 text-[10px] tracking-widest uppercase mb-0.5">
                                        Thematic Area {slide.tag}
                                    </p>
                                    <p className="fd text-white/70 text-xs font-medium">
                                        Our Focus Areas
                                    </p>
                                </div>
                            </div>

                            {/* Headline */}
                            <h1 className="a-h1 fp text-white mb-3" style={{
                                fontSize: "clamp(2.6rem, 5.5vw, 5rem)",
                                fontWeight: 900,
                                lineHeight: 1.06,
                                letterSpacing: "-0.025em",
                            }}>
                                {/* Split last word blue */}
                                {(() => {
                                    const words = slide.label.split(" ");
                                    return words.map((w, wi) => (
                                        <span key={wi} style={{ color: wi === words.length - 1 ? "#60a5fa" : "white" }}>
                                            {w}{wi < words.length - 1 ? " " : ""}
                                        </span>
                                    ));
                                })()}
                            </h1>

                            {/* Short description */}
                            <p className="a-sub fd text-white/60 text-sm leading-relaxed mb-6" style={{ maxWidth: 380 }}>
                                ARIN drives evidence-based research and policy transformation
                                across Africa in this critical domain.
                            </p>

                            {/* CTAs */}
                            <div className="a-cta flex items-center gap-3 flex-wrap">
                                <a href={slide.href} className="btn-primary">
                                    Explore Focus Area <ArrowRight className="w-4 h-4" />
                                </a>
                                <a href="/contact" className="btn-ghost">
                                    Join the Network
                                </a>
                            </div>
                        </div>

                        {/* ── BOTTOM ROW: theme thumbs + nav ── */}
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">

                            {/* Theme icon row */}
                            <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                                {slides.map((s, i) => {
                                    const TI = s.icon;
                                    return (
                                        <button key={i} onClick={() => goTo(i)}
                                            className={`th-btn ${i === current ? "th-on" : ""}`}
                                            aria-label={s.label}>
                                            <span className="th-tip">{s.label}</span>
                                            <TI className="w-5 h-5 text-white" />
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Nav controls */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button onClick={prev_} className="c-btn" aria-label="Previous">
                                    <ChevronLeft className="w-4 h-4 text-white" />
                                </button>
                                <button onClick={next} className="c-btn" aria-label="Next">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </button>
                                <button onClick={() => setPaused(p => !p)} className="c-btn" aria-label={paused ? "Play" : "Pause"}>
                                    {paused ? <Play className="w-3.5 h-3.5 text-white" /> : <Pause className="w-3.5 h-3.5 text-white" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── right-side dot indicators ─── */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 pointer-events-auto">
                    {slides.map((_, i) => (
                        <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}
                            style={{
                                width: 6, height: i === current ? 28 : 6,
                                borderRadius: 99, border: "none",
                                background: i === current ? "white" : "rgba(255,255,255,.35)",
                                cursor: "pointer", transition: "all .35s ease", padding: 0,
                            }}
                        />
                    ))}
                </div>

                {/* ─── progress bar ─── */}
                <div className="absolute bottom-0 left-0 w-full z-20" style={{ height: 2, background: "rgba(255,255,255,.10)" }}>
                    <div key={`${current}-${paused}`} style={{
                        height: "100%", background: "rgba(255,255,255,.70)",
                        animation: paused ? "none" : `pb ${DURATION}ms linear forwards`,
                    }} />
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════
            LATEST FROM ARIN
        ══════════════════════════════════════════════════════════ */}
            <LatestSection latest={latest} />
        </React.Fragment>
    );
};

// ─── Latest Section ────────────────────────────────────────────────────────────
function LatestSection({ latest }: { latest: { news: any; tech: any; policy: any; research: any } }) {
    const cats = [
        { doc: latest.news, label: "News Brief", href: "/press/news-briefs", color: "#3b82f6" },
        { doc: latest.tech, label: "Technical Report", href: "/press/technical-reports", color: "#021d49" },
        { doc: latest.policy, label: "Policy Brief", href: "/press/policy-briefs", color: "#f59e0b" },
        { doc: latest.research, label: "Research Project", href: "/programs/research-projects", color: "#10b981" },
    ];
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                    <div>
                        <p className="fm text-xs tracking-widest text-gray-400 uppercase mb-2">Fresh from the Network</p>
                        <h2 className="fp text-[#021d49]" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 800 }}>
                            Latest from <span style={{ color: "#1d4ed8" }}>ARIN</span>
                        </h2>
                    </div>
                    <a href="/press" className="fd text-sm text-[#021d49] font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                        View All <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {cats.map(({ doc, label, href, color }, i) => (
                        <div key={i}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ background: color }} />
                                    <span className="fd text-[#021d49] font-semibold text-xs uppercase tracking-wider">{label}</span>
                                </div>
                                <a href={href} className="fm text-[10px] text-gray-400 hover:text-[#021d49] transition-colors uppercase flex items-center gap-1">
                                    All <ArrowRight className="w-3 h-3" />
                                </a>
                            </div>
                            {doc ? (
                                <a href={`${href}/${doc._id}`} className="group block rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-lg transition-all duration-300">
                                    <div className="relative h-40 overflow-hidden bg-gray-100">
                                        <img
                                            src={doc.coverImage || doc.image || "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80"}
                                            alt={doc.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={e => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80" }}
                                        />
                                        <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,.28),transparent)" }} />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="fp text-[#021d49] font-bold text-sm line-clamp-2 leading-snug mb-3 group-hover:text-blue-900 transition-colors">
                                            {doc.title}
                                        </h4>
                                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                            <span className="fm text-[10px] text-gray-300">
                                                {doc.datePosted ? new Date(doc.datePosted).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : ""}
                                            </span>
                                            <span className="fd inline-flex items-center gap-1 text-xs font-semibold" style={{ color }}>
                                                Read <ArrowRight className="w-3 h-3" />
                                            </span>
                                        </div>
                                    </div>
                                </a>
                            ) : (
                                <div className="rounded-2xl border border-dashed border-gray-200 h-52 flex items-center justify-center text-gray-300 text-xs fd bg-white">
                                    No {label.toLowerCase()} yet
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HeroSection;