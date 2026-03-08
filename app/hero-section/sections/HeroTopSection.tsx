"use client";
import {
    ArrowRight, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX,
    Globe, Zap, Leaf, Building2, FlaskConical, HeartPulse, Pickaxe,
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

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

const HeroSection = () => {
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

    return (
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
    );
};

export default HeroSection;