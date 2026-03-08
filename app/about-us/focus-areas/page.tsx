"use client";
import React, { useState, useEffect, useRef } from "react";
import {
    Wind, Building2, Wheat, Pickaxe, Cpu, HeartPulse,
    Trees, SunMedium, ArrowRight, ArrowUpRight, ChevronDown
} from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const areas = [
    {
        icon: SunMedium,
        title: "Sustainable Development",
        slug: "sustainable-development",
        color: "#f59e0b",
        desc: "Advancing policies and research that balance economic growth, social equity, and environmental stewardship across African nations.",
        highlights: ["SDG alignment", "Policy research", "Economic equity"],
    },
    {
        icon: Wind,
        title: "Climate Change & Energy",
        slug: "climate-change-energy",
        color: "#0ea5e9",
        desc: "Exploring intersections of climate systems and energy transitions to promote resilient, low-carbon solutions for the continent.",
        highlights: ["Energy transition", "Carbon resilience", "Climate adaptation"],
    },
    {
        icon: Building2,
        title: "Cities & Resilience",
        slug: "cities-resilience",
        color: "#8b5cf6",
        desc: "Building adaptive urban frameworks that enable African cities to withstand climate shocks, migration pressures, and infrastructure challenges.",
        highlights: ["Urban planning", "SDG 11", "Infrastructure"],
    },
    {
        icon: Wheat,
        title: "Agriculture & Forestry",
        slug: "agriculture-forestry",
        color: "#22c55e",
        desc: "Driving climate-smart agriculture and sustainable forestry practices to secure food systems and rural livelihoods.",
        highlights: ["Food security", "Climate-smart farming", "Rural livelihoods"],
    },
    {
        icon: Pickaxe,
        title: "Mining, Trade & Industry",
        slug: "mining-trade-industry",
        color: "#f97316",
        desc: "Shaping responsible resource extraction, trade policy, and industrial transformation for inclusive economic development.",
        highlights: ["Resource governance", "Trade policy", "Industrialisation"],
    },
    {
        icon: Cpu,
        title: "Technology & Innovation",
        slug: "technology-innovation",
        color: "#3b82f6",
        desc: "Harnessing digital technologies, AI, and innovation ecosystems to accelerate research uptake and policy implementation.",
        highlights: ["AI & digital", "Innovation systems", "Research uptake"],
    },
    {
        icon: HeartPulse,
        title: "Climate and Health",
        slug: "climate-health",
        color: "#ef4444",
        desc: "Investigating the health impacts of climate change and building evidence for health-resilient communities and systems.",
        highlights: ["Health systems", "Climate-health nexus", "Community resilience"],
    },
    {
        icon: Trees,
        title: "Forests & Ecosystems",
        slug: "forests-ecosystems",
        color: "#10b981",
        desc: "Protecting and restoring Africa's forests and biodiversity through evidence-based conservation and ecosystem governance.",
        highlights: ["Biodiversity", "Conservation", "Ecosystem governance"],
    },
];

/* ─────────────────────────────────────────
   ANIMATED COUNTER HOOK
───────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, start = false) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime: number | null = null;
        const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return count;
}

/* ─────────────────────────────────────────
   FOCUS AREA CARD
───────────────────────────────────────── */
function AreaCard({ area, index }: { area: typeof areas[0]; index: number }) {
    const [hovered, setHovered] = useState(false);
    const Icon = area.icon;

    return (
        <a
            href={`/about-us/focus-areas/${area.slug}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "28px 24px 24px",
                borderRadius: 22,
                background: "white",
                border: `1px solid ${hovered ? area.color + "55" : "rgba(2,29,73,.08)"}`,
                boxShadow: hovered
                    ? `0 20px 56px rgba(2,29,73,.12), 0 0 0 1px ${area.color}33`
                    : "0 4px 20px rgba(2,29,73,.06)",
                cursor: "pointer",
                textDecoration: "none",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "all .35s cubic-bezier(.34,1.1,.64,1)",
                position: "relative",
                overflow: "hidden",
                animationDelay: `${index * 0.07}s`,
            }}
        >
            {/* Top accent bar */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: area.color,
                borderRadius: "22px 22px 0 0",
                transform: hovered ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform .4s ease",
            }} />

            {/* Subtle bg glow */}
            <div style={{
                position: "absolute", top: -40, right: -40,
                width: 140, height: 140, borderRadius: "50%",
                background: `radial-gradient(circle, ${area.color}18 0%, transparent 70%)`,
                opacity: hovered ? 1 : 0,
                transition: "opacity .4s ease",
                pointerEvents: "none",
            }} />

            {/* Icon */}
            <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: hovered ? area.color : "#021d49",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: 18,
                flexShrink: 0,
                boxShadow: hovered ? `0 6px 20px ${area.color}55` : "none",
                transition: "all .3s ease",
            }}>
                <Icon style={{ width: 22, height: 22, color: "white" }} />
            </div>

            {/* Title */}
            <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700, fontSize: "1.05rem",
                color: "#021d49", lineHeight: 1.3,
                marginBottom: 10,
            }}>
                {area.title}
            </div>

            {/* Desc */}
            <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, color: "#64748b",
                lineHeight: 1.7, flex: 1, marginBottom: 20,
            }}>
                {area.desc}
            </div>



            {/* Learn more */}
            <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600, fontSize: 12.5,
                color: area.color,
                transition: "gap .25s ease",
            }}>
                Learn more
                <ArrowRight style={{
                    width: 14, height: 14,
                    transform: hovered ? "translateX(4px)" : "translateX(0)",
                    transition: "transform .25s ease",
                }} />
            </div>
        </a>
    );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function FocusAreasPage() {
    const cardsRef = useRef<HTMLDivElement>(null);
    const [statsVisible, setStatsVisible] = useState(false);
    const statsRef = useRef<HTMLDivElement>(null);

    const c1 = useCountUp(8, 1400, statsVisible);
    const c2 = useCountUp(25, 1600, statsVisible);
    const c3 = useCountUp(500, 1800, statsVisible);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setStatsVisible(true);
        }, { threshold: 0.3 });
        if (statsRef.current) obs.observe(statsRef.current);
        return () => obs.disconnect();
    }, []);

    const scrollToCards = () => {
        cardsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <>
            <Navbar />

            <div style={{ background: "#f8faff", minHeight: "100vh" }}>

                {/* ══════════════════════════════════
                    HERO — infographic image
                ══════════════════════════════════ */}
                <section style={{
                    background: "#ffffff",
                    padding: "22px 40px 60px",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(2,29,73,.07)",
                }}>
                    {/* Grid lines */}
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 47px,rgba(2,29,73,.04) 47px,rgba(2,29,73,.04) 48px),repeating-linear-gradient(90deg,transparent,transparent 47px,rgba(2,29,73,.04) 47px,rgba(2,29,73,.04) 48px)",
                        pointerEvents: "none",
                    }} />
                    {/* Glow orbs */}


                    <div style={{
                        maxWidth: 1160, margin: "0 auto",
                        position: "relative", zIndex: 1,
                    }}>
                        {/* Eyebrow */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase",
                            color: "#021d49",
                            background: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            borderRadius: 99, padding: "5px 16px",
                            marginBottom: 24,
                            animation: "fa-fadeUp .6s ease forwards",
                        }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8", animation: "fa-pulse 2s ease infinite" }} />
                            Thematic Disciplines
                        </div>

                        {/* Heading */}
                        <h1 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 700, fontSize: "clamp(2.6rem, 5vw, 4rem)",
                            color: "#021d49", lineHeight: 1.05,
                            marginBottom: 16, maxWidth: 680,
                            animation: "fa-fadeUp .7s .1s ease both",
                        }}>
                            Our <em style={{ fontStyle: "italic", color: "#00c4b3" }}>Focus Areas</em>
                        </h1>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 15, color: "#64748b",
                            lineHeight: 1.8, maxWidth: 560, marginBottom: 52,
                            animation: "fa-fadeUp .7s .2s ease both",
                        }}>
                            ARIN pioneers path-breaking research across eight thematic disciplines shaping Africa's sustainable development and policy transformation agenda.
                        </p>

                        {/* ── Infographic image ── */}
                        <div style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            boxShadow: "0 32px 80px rgba(0,0,0,.35)",
                            border: "1px solid rgba(255,255,255,.1)",
                            animation: "fa-fadeUp .8s .3s ease both",
                            maxWidth: 960, margin: "0 auto",
                        }}>
                            <img
                                src="/images/ThematicAreasARIN.jpg"
                                alt="ARIN Thematic Disciplines and Analytical Approaches"
                                style={{ width: "100%", display: "block" }}
                            />
                        </div>

                        {/* Scroll cue */}
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <button
                                onClick={scrollToCards}
                                style={{
                                    display: "inline-flex", flexDirection: "column",
                                    alignItems: "center", gap: 6,
                                    background: "none", border: "none",
                                    cursor: "pointer",
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase",
                                    color: "rgba(2,29,73,.3)",
                                    animation: "fa-float 2.5s ease infinite",
                                }}
                            >
                                Explore Areas
                                <ChevronDown style={{ width: 18, height: 18 }} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════
                    STAT STRIP
                ══════════════════════════════════ */}
                {/* <div ref={statsRef} style={{
                    background: "white",
                    borderBottom: "1px solid rgba(2,29,73,.07)",
                }}>
                    <div style={{
                        maxWidth: 1160, margin: "0 auto",
                        padding: "0 40px",
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                    }}>
                        {[
                            { num: c1, suffix: "", label: "Thematic Focus Areas" },
                            { num: c2, suffix: "+", label: "African Countries" },
                            { num: c3, suffix: "+", label: "Research Projects" },
                        ].map((s, i) => (
                            <div key={i} style={{
                                padding: "28px 24px",
                                textAlign: "center",
                                borderRight: i < 2 ? "1px solid rgba(2,29,73,.07)" : "none",
                            }}>
                                <div style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 700, fontSize: "2.4rem",
                                    color: "#021d49", lineHeight: 1,
                                    marginBottom: 4,
                                }}>
                                    {s.num}{s.suffix}
                                </div>
                                <div style={{
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: 9.5, color: "#94a3b8",
                                    letterSpacing: ".1em", textTransform: "uppercase",
                                }}>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* ══════════════════════════════════
                    FOCUS AREA CARDS
                ══════════════════════════════════ */}
                <div ref={cardsRef} style={{
                    maxWidth: 1160, margin: "0 auto",
                    padding: "32px 40px 96px",
                }}>
                    {/* Section label */}
                    <div style={{ marginBottom: 48, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                        <div>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 7,
                                fontFamily: "'Space Mono', monospace",
                                fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase",
                                color: "#021d49",
                                background: "#eff6ff", border: "1px solid #bfdbfe",
                                borderRadius: 99, padding: "4px 14px", marginBottom: 14,
                            }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00c4b3" }} />
                                All Areas
                            </div>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                color: "#021d49", lineHeight: 1.1, margin: 0,
                            }}>
                                Explore Each <em style={{ fontStyle: "italic", color: "#00c4b3" }}>Discipline</em>
                            </h2>
                        </div>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 14, color: "#94a3b8",
                            maxWidth: 340, lineHeight: 1.7, margin: 0,
                        }}>
                            Click any area below to explore its research focus, publications, and policy contributions.
                        </p>
                    </div>

                    {/* 4-col grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: 20,
                    }}
                        className="fa-grid"
                    >
                        {areas.map((area, i) => (
                            <AreaCard key={area.slug} area={area} index={i} />
                        ))}
                    </div>


                </div>

                {/* ══════════════════════════════════
                    CTA BANNER
                ══════════════════════════════════ */}
                <div style={{ padding: "0 40px 80px" }}>
                    <div style={{
                        maxWidth: 1160, margin: "0 auto",
                        background: "#021d49",
                        borderRadius: 20,
                        padding: "28px 40px",
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap", gap: 20,
                        position: "relative", overflow: "hidden",
                    }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,.03) 79px,rgba(255,255,255,.03) 80px)",
                            pointerEvents: "none",
                        }} />
                        <p style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 600, fontSize: "1.3rem",
                            color: "white", margin: 0, position: "relative",
                        }}>
                            Want to contribute to ARIN's research agenda?
                        </p>
                        <a href="/contact" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "11px 24px", borderRadius: 99,
                            background: "white", color: "#021d49",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700, fontSize: 13,
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            position: "relative",
                            transition: "background .2s",
                        }}
                            onMouseEnter={e => (e.currentTarget.style.background = "#eff6ff")}
                            onMouseLeave={e => (e.currentTarget.style.background = "white")}
                        >
                            Get in Touch <ArrowUpRight style={{ width: 14, height: 14 }} />
                        </a>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}