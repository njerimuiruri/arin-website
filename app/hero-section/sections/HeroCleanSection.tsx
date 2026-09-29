"use client";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// Clean hero: white background, compact copy on the left and a large, clear
// photo on the right. No tint, overlay or zoom on the photo. The photo column
// stays within the source images' native width (1280–1600px) so they stay sharp.
const slides = ["/images/lreb.jpg", "/images/arin1.jpeg", "/images/lreb4.jpg", "/images/geo.jpeg", "/images/sdg.jpeg"];
const DURATION = 6000;

const NAVY = "#021d49";
const TEAL = "#00c4b3";
const TEAL_DARK = "#008f83";

const highlights = [
    { value: "25+", label: "Countries" },
    { value: "500+", label: "Research projects" },
    { value: "120+", label: "Partners" },
];

const HeroCleanSection = () => {
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const t = setTimeout(() => setCurrent((c) => (c + 1) % slides.length), DURATION);
        return () => clearTimeout(t);
    }, [current, paused]);

    const go = (dir: number) => setCurrent((c) => (c + dir + slides.length) % slides.length);

    return (
        <section className="relative w-full bg-white border-b border-slate-100 overflow-hidden">
            {/* Very faint grid texture on the copy side only */}
            <div
                className="absolute inset-y-0 left-0 w-1/2 pointer-events-none hidden lg:block"
                style={{
                    backgroundImage: "linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage: "linear-gradient(90deg, #000 0%, transparent 90%)",
                    WebkitMaskImage: "linear-gradient(90deg, #000 0%, transparent 90%)",
                }}
                aria-hidden="true"
            />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6 lg:py-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Copy */}
                <div className="lg:col-span-5 order-2 lg:order-1 hc-in">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="h-0.5 w-8 rounded-full" style={{ background: TEAL }} />
                        <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: TEAL_DARK }}>
                            Africa Research &amp; Impact Network
                        </p>
                    </div>

                    <h1 className="mb-5" style={{ color: NAVY, fontSize: "clamp(2rem, 3.4vw, 3rem)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.025em" }}>
                        Evidence that drives Africa&apos;s{" "}
                        <span style={{ color: TEAL_DARK }}>sustainable development</span>
                    </h1>

                    <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed mb-7 max-w-md">
                        We connect researchers, policymakers and practitioners across the continent to turn research into policy and action.
                    </p>

                    <div className="flex items-center gap-3 flex-wrap mb-8">
                        <a href="#about" className="hc-btn hc-btn-primary">
                            Discover ARIN <ArrowRight className="w-4 h-4" />
                        </a>
                        <Link href="/contact" className="hc-btn hc-btn-outline">
                            Partner with us
                        </Link>
                    </div>

                    {/* Key figures */}
                    <dl className="grid grid-cols-3 max-w-md pt-6 border-t border-slate-200">
                        {highlights.map((h, i) => (
                            <div key={h.label} className={i > 0 ? "pl-4 sm:pl-5 border-l border-slate-200" : ""}>
                                <dt className="sr-only">{h.label}</dt>
                                <dd className="text-2xl font-bold tabular-nums leading-none" style={{ color: NAVY }}>{h.value}</dd>
                                <dd className="text-xs sm:text-sm text-slate-500 mt-1.5">{h.label}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Photo */}
                <div className="lg:col-span-7 order-1 lg:order-2">
                    <div className="relative">
                        {/* Soft offset accent behind the photo */}
                        <div className="absolute -bottom-3 -left-3 w-2/3 h-2/3 rounded-xl hidden sm:block" style={{ background: "#e6f9f7" }} aria-hidden="true" />
                        <div className="absolute -top-3 -right-3 w-20 h-20 rounded-xl hidden sm:block" style={{ background: TEAL, opacity: 0.9 }} aria-hidden="true" />

                        <div
                            className="relative h-64 sm:h-96 lg:h-[460px] overflow-hidden rounded-xl bg-slate-100"
                            style={{ boxShadow: "0 24px 48px -20px rgba(2,29,73,0.28)" }}
                            onMouseEnter={() => setPaused(true)}
                            onMouseLeave={() => setPaused(false)}
                        >
                            {slides.map((src, i) => (
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
                        </div>
                    </div>

                    {/* Thumbnails + arrows — below the photo, so nothing covers it */}
                    <div className="flex items-center justify-between gap-4 mt-5">
                        <div className="flex items-center gap-2">
                            {slides.map((src, i) => (
                                <button
                                    key={src}
                                    onClick={() => setCurrent(i)}
                                    aria-label={`Show image ${i + 1}`}
                                    className="hc-thumb relative w-12 h-9 sm:w-16 sm:h-11 rounded-md overflow-hidden"
                                    data-active={i === current}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={src} alt="" className="w-full h-full object-cover" />
                                    {i === current && !paused && (
                                        <span key={current} className="hc-progress absolute bottom-0 left-0 h-[3px]" style={{ background: TEAL, animationDuration: `${DURATION}ms` }} />
                                    )}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => go(-1)} aria-label="Previous image" className="hc-ctrl">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button onClick={() => go(1)} aria-label="Next image" className="hc-ctrl">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hc-btn {
                    display: inline-flex; align-items: center; gap: 10px;
                    padding: 13px 26px; border-radius: 6px;
                    font-weight: 600; font-size: 15px;
                    transition: background .2s ease, color .2s ease, border-color .2s ease, gap .2s ease, box-shadow .2s ease;
                }
                .hc-btn-primary { background: ${NAVY}; color: #fff; border: 1.5px solid ${NAVY}; box-shadow: 0 8px 20px -8px rgba(2,29,73,.5); }
                .hc-btn-primary:hover { background: ${TEAL}; border-color: ${TEAL}; color: ${NAVY}; gap: 14px; }
                .hc-btn-outline { color: ${NAVY}; border: 1.5px solid #cbd5e1; background: #fff; }
                .hc-btn-outline:hover { border-color: ${NAVY}; }

                .hc-thumb { opacity: .5; outline: 2px solid transparent; outline-offset: 2px; transition: opacity .3s ease, outline-color .3s ease; }
                .hc-thumb:hover { opacity: .85; }
                .hc-thumb[data-active="true"] { opacity: 1; outline-color: ${TEAL}; }

                @keyframes hcProgress { from { width: 0 } to { width: 100% } }
                .hc-progress { animation-name: hcProgress; animation-timing-function: linear; animation-fill-mode: forwards; }

                .hc-ctrl {
                    width: 38px; height: 38px; display: flex; align-items: center; justify-content: center;
                    border: 1px solid #e2e8f0; border-radius: 999px; color: ${NAVY}; background: #fff;
                    transition: background .2s ease, border-color .2s ease, color .2s ease;
                }
                .hc-ctrl:hover { background: ${NAVY}; border-color: ${NAVY}; color: #fff; }
                .hc-btn:focus-visible, .hc-ctrl:focus-visible, .hc-thumb:focus-visible { outline: 2px solid ${TEAL}; outline-offset: 2px; }

                @keyframes hcIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: none } }
                .hc-in { animation: hcIn .8s cubic-bezier(.2,.7,.2,1) both; }
                @media (prefers-reduced-motion: reduce) { .hc-in, .hc-progress { animation: none; } }
            `}</style>
        </section>
    );
};

export default HeroCleanSection;
