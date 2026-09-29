"use client";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Background rotates purely for visual variety — the message itself stays
// fixed, so the hero states one clear thing about ARIN instead of cycling
// through a different claim every few seconds.
const backgrounds = ["/images/lreb.jpg", "/images/arin1.jpeg", "/images/lreb4.jpg", "/images/geo.jpeg", "/images/sdg.jpeg"];
const DURATION = 6000;

const HeroSection = () => {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState<number | null>(null);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setPrev(current);
            setCurrent((c) => (c + 1) % backgrounds.length);
        }, DURATION);
        return () => clearInterval(timerRef.current!);
    }, [current]);

    return (
        <section className="relative w-full" style={{ minHeight: 480 }}>
            {/* Background layer — clipped to the section's bounds (rounded corners,
                the decorative ring bleeding off-canvas). The text content below is
                NOT inside this clipped layer, so it can never get cut off, however
                tall it ends up being on a given screen. */}
            <div className="absolute inset-0 overflow-hidden">
                {backgrounds.map((src, i) => {
                    const on = i === current, was = i === prev;
                    return (
                        <div key={i} className="absolute inset-0" style={{ zIndex: on ? 2 : was ? 1 : 0, opacity: on ? 1 : 0, transition: "opacity 1.4s ease-in-out" }}>
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url(${src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                animation: on ? "kb 8s ease-in-out forwards" : "none",
                            }} />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(2,29,73,0.80) 0%, rgba(2,29,73,0.38) 55%, rgba(2,29,73,0.14) 100%)" }} />
                            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(2,29,73,0.6) 0%, transparent 45%)" }} />
                        </div>
                    );
                })}

                {/* Restrained decorative art — a faint ring and a small dot-grid tucked in
                    the top-right, well clear of the text column, for visual texture without clutter. */}
                <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border border-white/10 pointer-events-none hidden md:block" />
                <div className="absolute top-16 right-10 lg:right-24 w-28 h-28 pointer-events-none hidden lg:block" style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.28) 1.5px, transparent 1.5px)",
                    backgroundSize: "14px 14px",
                }} />
            </div>

            {/* Slide indicator dots — subtle, top-right, replaces the old manual controls
                with a passive "there's more imagery" cue rather than an interactive control. */}
            <div className="absolute top-8 right-6 sm:right-10 lg:right-20 z-10 flex items-center gap-1.5">
                {backgrounds.map((_, i) => (
                    <div
                        key={i}
                        className="rounded-full transition-all duration-500"
                        style={{
                            width: i === current ? 18 : 6,
                            height: 6,
                            background: i === current ? "#00c4b3" : "rgba(255,255,255,0.35)",
                        }}
                    />
                ))}
            </div>

            {/* Content — normal document flow (not absolutely positioned), so if it
                ever needs more room than the nominal minHeight, the section simply
                grows to fit rather than clipping the buttons. */}
            <div className="relative z-10 flex flex-col justify-between" style={{ minHeight: 480 }}>
                <div className="max-w-6xl mx-auto w-full px-6 pt-20">
                    <div className="g-light rounded-2xl px-4 py-2 inline-flex items-center gap-2 w-fit">
                        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        <span className="fm text-white/80 text-xs tracking-widest uppercase">
                            Africa Research &amp; Impact Network
                        </span>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto w-full px-6 pt-10 pb-14">
                    <div className="max-w-2xl">
                        <div className="w-12 h-1 rounded-full mb-4" style={{ background: "#00c4b3" }} />
                        <h1 className="text-white mb-3" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                            Africa&apos;s Network for<br />
                            <span style={{ color: "#00c4b3" }}>Research-Driven Impact</span>
                        </h1>
                        <p className="text-white/70 text-base leading-relaxed mb-6 max-w-lg">
                            We connect researchers, policymakers, and practitioners across the continent to turn evidence into action for sustainable development.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                            <a href="#about" className="btn-primary">
                                Learn About ARIN <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="/contact" className="btn-ghost">
                                Join the Network
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll cue */}
            <a
                href="#about"
                aria-label="Scroll to learn more"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full bg-white/15 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white/25 transition-colors animate-bounce shadow-lg"
            >
                <ChevronDown className="w-4 h-4" />
            </a>
        </section>
    );
};

export default HeroSection;
