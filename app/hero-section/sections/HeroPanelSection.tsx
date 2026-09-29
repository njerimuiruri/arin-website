"use client";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// Panel hero: solid navy copy panel beside a clear, untinted photo.
// The photo column is capped so the source images (1280–1600px wide) are never
// upscaled much, and there is no zoom animation — both of which made them look soft.
const backgrounds = ["/images/lreb.jpg", "/images/arin1.jpeg", "/images/lreb4.jpg", "/images/geo.jpeg", "/images/sdg.jpeg"];
const DURATION = 6000;

const NAVY = "#021d49";
const TEAL = "#00c4b3";

const HeroPanelSection = () => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const t = setTimeout(() => setCurrent((c) => (c + 1) % backgrounds.length), DURATION);
        return () => clearTimeout(t);
    }, [current, paused]);

    const go = (dir: number) => setCurrent((c) => (c + dir + backgrounds.length) % backgrounds.length);

    return (
        <section className="w-full" style={{ background: NAVY }}>
            <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12">
                {/* Photo — first on mobile, right on desktop */}
                <div
                    className="relative lg:col-span-7 lg:order-2 h-64 sm:h-80 lg:h-[520px] overflow-hidden bg-slate-900"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {backgrounds.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            key={src}
                            src={src}
                            alt=""
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
                            style={{ opacity: i === current ? 1 : 0 }}
                        />
                    ))}

                    {/* Controls */}
                    <div className="absolute bottom-0 right-0 flex items-stretch">
                        <span className="hidden sm:flex items-center px-4 text-xs font-semibold tabular-nums tracking-widest bg-white" style={{ color: NAVY }}>
                            {String(current + 1).padStart(2, "0")}
                            <span className="text-slate-400">&nbsp;/ {String(backgrounds.length).padStart(2, "0")}</span>
                        </span>
                        <button onClick={() => go(-1)} aria-label="Previous image" className="hp-ctrl">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={() => go(1)} aria-label="Next image" className="hp-ctrl hp-ctrl-accent">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Copy panel */}
                <div className="lg:col-span-5 lg:order-1 relative flex items-center px-6 sm:px-10 lg:pl-12 xl:pl-16 lg:pr-10 py-10 lg:py-0">
                    {/* Teal accent bar along the seam */}
                    <span className="hidden lg:block absolute top-0 right-0 w-1 h-24" style={{ background: TEAL }} aria-hidden="true" />

                    <div className="hp-in">
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: TEAL }}>
                            Africa Research &amp; Impact Network
                        </p>
                        <h1 className="text-white mb-4" style={{ fontSize: "clamp(1.9rem, 3.2vw, 2.9rem)", fontWeight: 700, lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                            Evidence that drives Africa&apos;s sustainable development
                        </h1>
                        <p className="text-white/70 text-base leading-relaxed mb-7 max-w-md">
                            We connect researchers, policymakers and practitioners across the continent to turn research into policy and action.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                            <a href="#about" className="hp-btn hp-btn-primary">
                                Discover ARIN <ArrowRight className="w-4 h-4" />
                            </a>
                            <Link href="/contact" className="hp-btn hp-btn-outline">
                                Partner with us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hp-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 12px 24px; border-radius: 4px;
                    font-weight: 600; font-size: 15px;
                    transition: background .2s ease, color .2s ease, border-color .2s ease, gap .2s ease;
                }
                .hp-btn-primary { background: ${TEAL}; color: ${NAVY}; border: 1.5px solid ${TEAL}; }
                .hp-btn-primary:hover { background: #fff; border-color: #fff; gap: 14px; }
                .hp-btn-outline { color: #fff; border: 1.5px solid rgba(255,255,255,.5); }
                .hp-btn-outline:hover { background: #fff; color: ${NAVY}; border-color: #fff; }

                .hp-ctrl {
                    width: 48px; height: 48px; display: flex; align-items: center; justify-content: center;
                    background: ${NAVY}; color: #fff; transition: background .2s ease, color .2s ease;
                }
                .hp-ctrl:hover { background: #0a2d66; }
                .hp-ctrl-accent { background: ${TEAL}; color: ${NAVY}; }
                .hp-ctrl-accent:hover { background: #fff; }
                .hp-btn:focus-visible, .hp-ctrl:focus-visible { outline: 2px solid ${TEAL}; outline-offset: 2px; }

                @keyframes hpIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
                .hp-in { animation: hpIn .8s cubic-bezier(.2,.7,.2,1) both; }
                @media (prefers-reduced-motion: reduce) { .hp-in { animation: none; } }
            `}</style>
        </section>
    );
};

export default HeroPanelSection;
