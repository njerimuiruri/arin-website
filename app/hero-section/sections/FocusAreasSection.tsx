"use client";
import React, { useState } from "react";
import { Wind, Building2, Wheat, Pickaxe, Cpu, HeartPulse, Trees, SunMedium, ArrowRight } from "lucide-react";

const areas = [
    {
        icon: SunMedium,
        title: "Sustainable Development",
        slug: "sustainable-development",
        desc: "Advancing policies and research that balance economic growth, social equity, and environmental stewardship across African nations.",
    },
    {
        icon: Wind,
        title: "Climate Change & Energy",
        slug: "climate-change-energy",
        desc: "Exploring intersections of climate systems and energy transitions to promote resilient, low-carbon solutions for the continent.",
    },
    {
        icon: Building2,
        title: "Cities & Resilience",
        slug: "cities-resilience",
        desc: "Building adaptive urban frameworks that enable African cities to withstand climate shocks, migration pressures, and infrastructure challenges.",
    },
    {
        icon: Wheat,
        title: "Agriculture & Forestry",
        slug: "agriculture-forestry",
        desc: "Driving climate-smart agriculture and sustainable forestry practices to secure food systems and rural livelihoods.",
    },
    {
        icon: Pickaxe,
        title: "Mining, Trade & Industry",
        slug: "mining-trade-industry",
        desc: "Shaping responsible resource extraction, trade policy, and industrial transformation for inclusive economic development.",
    },
    {
        icon: Cpu,
        title: "Technology & Innovation",
        slug: "technology-innovation",
        desc: "Harnessing digital technologies, AI, and innovation ecosystems to accelerate research uptake and policy implementation.",
    },
    {
        icon: HeartPulse,
        title: "Climate and Health",
        slug: "climate-health",
        desc: "Investigating the health impacts of climate change and building evidence for health-resilient communities and systems.",
    },
    {
        icon: Trees,
        title: "Forests & Ecosystems",
        slug: "forests-ecosystems",
        desc: "Protecting and restoring Africa's forests and biodiversity through evidence-based conservation and ecosystem governance.",
    },
];

export default function FocusAreasSection() {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

                /* ══ Section ══ */
                .fa-section {
                    position: relative;
                    padding: 104px 0 112px;
                    overflow: hidden;
                    background: #ffffff;
                }

                /* Subtle orb */
                .fa-bg {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(ellipse 60% 50% at 10% 20%, rgba(2,29,73,.04) 0%, transparent 60%),
                        radial-gradient(ellipse 50% 50% at 90% 80%, rgba(29,78,216,.04) 0%, transparent 60%);
                    pointer-events: none;
                }
                /* Grid texture */
                .fa-grid-tex {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(2,29,73,.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(2,29,73,.04) 1px, transparent 1px);
                    background-size: 48px 48px;
                    pointer-events: none;
                }
                /* Scattered dots */
                .fa-dots-tex {
                    position: absolute;
                    inset: 0;
                    background-image: radial-gradient(circle, rgba(2,29,73,.07) 1px, transparent 1px);
                    background-size: 28px 28px;
                    -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%);
                    mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%);
                    pointer-events: none;
                }

                /* ══ Wrapper ══ */
                .fa-wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 1160px;
                    margin: 0 auto;
                    padding: 0 32px;
                }

                /* ══ Header ══ */
                .fa-header {
                    text-align: center;
                    margin-bottom: 64px;
                }
                .fa-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 500;
                    color: rgba(255,255,255,.7);
                    letter-spacing: .15em;
                    text-transform: uppercase;
                    background: #eff6ff;
                    border: 1px solid #bfdbfe;
                    border-radius: 99px;
                    padding: 6px 18px;
                    margin-bottom: 20px;
                    backdrop-filter: blur(10px);
                }
                .fa-ey-dot {
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: rgba(255,255,255,.15);
                    animation: faBlink 2s ease infinite;
                }
                @keyframes faBlink { 0%,100%{opacity:1} 50%{opacity:.3} }

                .fa-title {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: clamp(2.2rem, 3.5vw, 3rem);
                    color: #021d49;
                    line-height: 1.1;
                    letter-spacing: -0.02em;
                    margin-bottom: 14px;
                }
                .fa-title em { font-style: italic; color: white; }

                .fa-subtitle {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 15px;
                    color: #64748b;
                    line-height: 1.75;
                    max-width: 520px;
                    margin: 0 auto;
                }

                /* ══ Grid ══ */
                .fa-cards {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 18px;
                }
                @media (max-width: 1000px) { .fa-cards { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 520px)  { .fa-cards { grid-template-columns: 1fr; } }

                /* ══ Card ══ */
                @keyframes faCardIn {
                    from { opacity:0; transform: translateY(28px) scale(.97); }
                    to   { opacity:1; transform: translateY(0) scale(1); }
                }
                .fa-card {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                    padding: 28px 24px 24px;
                    border-radius: 22px;
                    /* Glass */
                    background: #ffffff;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(2,29,73,.09);
                    box-shadow:
                        0 4px 20px rgba(2,29,73,.08),
                        0 1px 0 rgba(255,255,255,.9) inset;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all .35s cubic-bezier(.34,1.1,.64,1);
                    opacity: 0;
                    animation: faCardIn .55s ease forwards;
                    overflow: hidden;
                }

                /* Shimmer top highlight */
                .fa-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 10%; right: 10%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(2,29,73,.08), transparent);
                    border-radius: 99px;
                }

                /* Hover glow uses CSS var set inline */
                .fa-card::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 22px;
                    opacity: 0;
                    transition: opacity .35s ease;
                    background: rgba(255,255,255,.04);
                }
                .fa-card:hover {
                    transform: translateY(-6px) scale(1.02);
                    background: #f8faff;
                    border-color: var(--card-color, rgba(29,78,216,.3));
                    box-shadow:
                        0 16px 48px rgba(2,29,73,.12),
                        0 1px 0 rgba(255,255,255,1) inset;
                }
                .fa-card:hover::after { opacity: 1; }

                /* Colored top border on hover */
                .fa-card-topbar {
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    border-radius: 22px 22px 0 0;
                    background: var(--card-color, #1d4ed8);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform .4s ease;
                }
                .fa-card:hover .fa-card-topbar { transform: scaleX(1); }

                /* Icon */
                .fa-ico-wrap {
                    width: 52px; height: 52px;
                    border-radius: 16px;
                    background: #021d49;
                    border: 1px solid #021d49;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 16px;
                    transition: all .3s ease;
                    position: relative;
                    z-index: 1;
                    flex-shrink: 0;
                }
                .fa-card:hover .fa-ico-wrap {
                    background: var(--card-color, #1d4ed8);
                    border-color: var(--card-color, #1d4ed8);
                    box-shadow: 0 4px 20px rgba(2,29,73,.2);
                }
                .fa-ico-wrap svg {
                    width: 22px; height: 22px;
                    color: #ffffff;
                    transition: color .3s ease;
                }
                .fa-card:hover .fa-ico-wrap svg { color: #ffffff; }

                /* Title */
                .fa-card-title {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: 15px;
                    color: #021d49 !important;
                    line-height: 1.3;
                    margin-bottom: 10px;
                    position: relative;
                    z-index: 1;
                }

                /* Desc */
                .fa-card-desc {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12.5px;
                    color: #64748b;
                    line-height: 1.65;
                    flex: 1;
                    position: relative;
                    z-index: 1;
                    margin-bottom: 18px;
                    transition: color .3s ease;
                }
                .fa-card:hover .fa-card-desc { color: #475569; }

                /* Learn more link */
                .fa-learn {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    color: rgba(255,255,255,.7);
                    position: relative;
                    z-index: 1;
                    opacity: 0;
                    transform: translateY(6px);
                    transition: all .3s ease;
                    letter-spacing: .02em;
                }
                .fa-learn svg { width: 13px; height: 13px; transition: transform .25s ease; }
                .fa-card:hover .fa-learn { opacity: 1; transform: translateY(0); }
                .fa-card:hover .fa-learn svg { transform: translateX(3px); }

                /* ══ Bottom CTA ══ */
                .fa-cta {
                    text-align: center;
                    margin-top: 52px;
                }
                .fa-cta-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 14px 30px;
                    border-radius: 999px;
                    background: #021d49;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 700;
                    font-size: 14px;
                    transition: all .25s ease;
                    box-shadow: 0 4px 20px rgba(2,29,73,.2);
                    text-decoration: none;
                }
                .fa-cta-btn:hover {
                    background: rgba(255,255,255,.15);
                    color: white;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 32px rgba(255,255,255,.15);
                }
                .fa-cta-btn svg { width: 16px; height: 16px; }
            `}</style>

            <section className="fa-section">
                <div className="fa-bg" />
                <div className="fa-grid-tex" />
                <div className="fa-dots-tex" />

                <div className="fa-wrap">
                    {/* Header */}
                    <div className="fa-header">
                        <div className="fa-eyebrow">
                            <div className="fa-ey-dot" />
                            Thematic Disciplines
                        </div>
                        <h2 className="fa-title">
                            Our <em>Focus Areas</em>
                        </h2>
                        <p className="fa-subtitle">
                            ARIN pioneers path-breaking research across key thematic areas
                            shaping Africa's sustainable development agenda.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="fa-cards">
                        {areas.map((area, i) => {
                            const Icon = area.icon;
                            return (
                                <a
                                    key={area.slug}
                                    href={`/focus-areas/${area.slug}`}
                                    className="fa-card"
                                    style={{
                                        animationDelay: `${i * 0.07}s`,
                                    } as React.CSSProperties}
                                >
                                    <div className="fa-card-topbar" />
                                    <div className="fa-ico-wrap">
                                        <Icon />
                                    </div>
                                    <div className="fa-card-title">{area.title}</div>
                                    <div className="fa-card-desc">{area.desc}</div>
                                    <div className="fa-learn">
                                        Learn more <ArrowRight />
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <div className="fa-cta">
                        <a href="/focus-areas" className="fa-cta-btn">
                            Explore All Focus Areas <ArrowRight />
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}