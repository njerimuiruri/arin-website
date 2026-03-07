"use client";
import React from "react";
import { ArrowUpRight, CheckCircle2, BookOpen, Lightbulb, FlaskConical, Users } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

const pillars = [
    {
        icon: FlaskConical,
        title: "Share Research Trends",
        desc: "Develop models and best practices on pathways to research excellence and impact.",
    },
    {
        icon: BookOpen,
        title: "Policy Reviews",
        desc: "Convene evidence and impact dialogues that inform transformative policy action.",
    },
    {
        icon: Users,
        title: "Support Knowledge Systems",
        desc: "Build capacity of individuals and institutions on transformative research and impact pathways.",
    },
];

const focusAreas = [
    {
        title: "Climate Change",
        desc: "Research and policy platforms on climate action, adaptation, science, technology, and innovation status in Africa.",
    },
    {
        title: "Knowledge Management",
        desc: "Support contextual knowledge systems and learning across the continent.",
    },
    {
        title: "Science, Technology & Innovation",
        desc: "Science-policy interface through research commercialisation, innovation, and knowledge translation.",
    },
];

export default function ARINAboutPage() {
    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

                .ab-page { background: #f9fafb; }

                /* ── shared ── */
                .ab-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 500;
                    letter-spacing: .14em;
                    text-transform: uppercase;
                    color: #021d49;
                    background: white;
                    border: 1px solid rgba(2,29,73,.15);
                    border-radius: 99px;
                    padding: 5px 14px;
                    margin-bottom: 22px;
                }
                .ab-eyebrow-dot {
                    width: 6px; height: 6px;
                    border-radius: 50%;
                    background: #1d4ed8;
                    animation: abBlink 2s ease infinite;
                }
                @keyframes abBlink { 0%,100%{opacity:1} 50%{opacity:.3} }

                /* ══════════════════════════════
                   SECTION 1 — MISSION (image ref 1)
                   Two-col: big title left, text+btn right
                   then 4-col image/card strip below
                ══════════════════════════════ */
                .ms-section {
                    background: #f9fafb;
                    padding: 88px 0 0;
                }
                .ms-wrap {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 40px;
                }

                /* Top row */
                .ms-top {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 64px;
                    align-items: start;
                    margin-bottom: 64px;
                }
                @media (max-width: 860px) { .ms-top { grid-template-columns: 1fr; gap: 32px; } }

                .ms-title {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: clamp(2.4rem, 4vw, 3.6rem);
                    color: #021d49;
                    line-height: 1.1;
                    letter-spacing: -0.025em;
                }
                .ms-title em { font-style: italic; color: #1d4ed8; }

                .ms-right { padding-top: 8px; }
                .ms-body {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 15px;
                    color: #64748b;
                    line-height: 1.8;
                    margin-bottom: 28px;
                    max-width: 480px;
                }
                .ms-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #021d49;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 600;
                    font-size: 14px;
                    padding: 13px 26px;
                    border-radius: 99px;
                    text-decoration: none;
                    transition: all .25s ease;
                    box-shadow: 0 4px 16px rgba(2,29,73,.25);
                }
                .ms-btn:hover { background: #1d4ed8; transform: translateY(-1px); }
                .ms-btn svg { width: 16px; height: 16px; }

                /* Bottom strip: image | card | image | card */
                .ms-strip {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0;
                    border-radius: 24px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(2,29,73,.10);
                }
                @media (max-width: 860px) { .ms-strip { grid-template-columns: 1fr 1fr; } }
                @media (max-width: 540px)  { .ms-strip { grid-template-columns: 1fr; } }

                .ms-strip-img {
                    aspect-ratio: 3/4;
                    overflow: hidden;
                    position: relative;
                }
                .ms-strip-img img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform .5s ease;
                }
                .ms-strip-img:hover img { transform: scale(1.04); }

                .ms-strip-card {
                    background: white;
                    padding: 36px 28px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 24px;
                    min-height: 280px;
                }

                .ms-card-ico {
                    width: 48px; height: 48px;
                    border-radius: 14px;
                    background: #eff6ff;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 8px;
                }
                .ms-card-ico svg { width: 22px; height: 22px; color: #021d49; }

                .ms-card-title {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: 1.15rem;
                    color: #021d49;
                    margin-bottom: 10px;
                }
                .ms-card-desc {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 13px;
                    color: #64748b;
                    line-height: 1.65;
                    margin-bottom: 16px;
                }

                .ms-card-divider {
                    height: 1px;
                    background: rgba(2,29,73,.07);
                    margin-bottom: 14px;
                }
                .ms-card-bullet {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px;
                    font-weight: 600;
                    color: #021d49;
                }
                .ms-card-bullet::before {
                    content: '';
                    width: 7px; height: 7px;
                    border-radius: 50%;
                    background: #1d4ed8;
                    flex-shrink: 0;
                }

                /* ══════════════════════════════
                   SECTION 2 — WHY US (image ref 2)
                   Left: stacked / overlapping images
                   Right: title, body, 3-col pillars, CTA
                ══════════════════════════════ */
                .wu-section {
                    background: #ffffff;
                    padding: 96px 0 104px;
                    overflow: hidden;
                    position: relative;
                }
                /* Subtle line art */
                .wu-lines {
                    position: absolute;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        0deg, transparent, transparent 59px,
                        rgba(2,29,73,.04) 59px, rgba(2,29,73,.04) 60px
                    ), repeating-linear-gradient(
                        90deg, transparent, transparent 79px,
                        rgba(2,29,73,.025) 79px, rgba(2,29,73,.025) 80px
                    );
                    pointer-events: none;
                }
                .wu-line-mask {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, white 80%);
                    pointer-events: none;
                }

                .wu-wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 40px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 72px;
                    align-items: center;
                }
                @media (max-width: 860px) { .wu-wrap { grid-template-columns: 1fr; gap: 48px; } }

                /* ── image stack (left) ── */
                .wu-img-stack {
                    position: relative;
                    height: 480px;
                }
                .wu-img-back {
                    position: absolute;
                    top: 0; left: 0;
                    width: 78%;
                    aspect-ratio: 4/5;
                    border-radius: 22px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(2,29,73,.14);
                }
                .wu-img-front {
                    position: absolute;
                    bottom: 0; right: 0;
                    width: 68%;
                    aspect-ratio: 4/5;
                    border-radius: 22px;
                    overflow: hidden;
                    box-shadow: 0 28px 80px rgba(2,29,73,.18);
                    border: 4px solid white;
                }
                .wu-img-back img,
                .wu-img-front img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform .5s ease;
                }
                .wu-img-back:hover img,
                .wu-img-front:hover img { transform: scale(1.04); }

                /* Floating stat badge */
                .wu-badge {
                    position: absolute;
                    top: 44%;
                    left: 48%;
                    transform: translate(-50%, -50%);
                    z-index: 10;
                    background: #021d49;
                    color: white;
                    border-radius: 16px;
                    padding: 14px 18px;
                    text-align: center;
                    box-shadow: 0 12px 36px rgba(2,29,73,.3);
                    border: 3px solid white;
                    white-space: nowrap;
                }
                .wu-badge-num {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: 1.8rem;
                    color: #60a5fa;
                    line-height: 1;
                }
                .wu-badge-lbl {
                    font-family: 'DM Mono', monospace;
                    font-size: 9px;
                    color: rgba(255,255,255,.6);
                    text-transform: uppercase;
                    letter-spacing: .1em;
                    margin-top: 3px;
                }

                /* ── right text ── */
                .wu-title {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: clamp(2.2rem, 3.5vw, 3rem);
                    color: #021d49;
                    line-height: 1.1;
                    letter-spacing: -0.025em;
                    margin-bottom: 16px;
                }
                .wu-title em { font-style: italic; color: #1d4ed8; }

                .wu-body {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 15px;
                    color: #64748b;
                    line-height: 1.8;
                    margin-bottom: 36px;
                }

                /* 3-col pillars strip */
                .wu-pillars {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    background: #f1f5f9;
                    border-radius: 18px;
                    overflow: hidden;
                    margin-bottom: 36px;
                }
                @media (max-width: 540px) { .wu-pillars { grid-template-columns: 1fr; } }

                .wu-pillar {
                    padding: 22px 18px;
                    text-align: center;
                    border-right: 1px solid rgba(2,29,73,.07);
                    transition: background .2s ease;
                }
                .wu-pillar:last-child { border-right: none; }
                .wu-pillar:hover { background: white; }

                .wu-pillar-ico {
                    width: 44px; height: 44px;
                    border-radius: 12px;
                    background: #021d49;
                    display: flex; align-items: center; justify-content: center;
                    margin: 0 auto 12px;
                    transition: background .2s ease;
                }
                .wu-pillar:hover .wu-pillar-ico { background: #1d4ed8; }
                .wu-pillar-ico svg { width: 20px; height: 20px; color: white; }

                .wu-pillar-title {
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 700;
                    font-size: 12px;
                    color: #021d49;
                    line-height: 1.4;
                }

                /* CTA */
                .wu-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: #021d49;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 600;
                    font-size: 14px;
                    padding: 13px 26px;
                    border-radius: 99px;
                    text-decoration: none;
                    transition: all .25s ease;
                    box-shadow: 0 4px 16px rgba(2,29,73,.25);
                }
                .wu-btn:hover { background: #1d4ed8; transform: translateY(-1px); }
                .wu-btn svg { width: 16px; height: 16px; }
            `}</style>

            <Navbar />
            <div className="ab-page">

                {/* ══ SECTION 1: OUR MISSION ══ */}
                <section className="ms-section">
                    <div className="ms-wrap">

                        {/* Top row */}
                        <div className="ms-top">
                            <div>
                                <div className="ab-eyebrow">
                                    <span className="ab-eyebrow-dot" />
                                    Our Mission
                                </div>
                                <h1 className="ms-title">
                                    Research &amp; Policy<br />
                                    Transformation for<br />
                                    <em>Sustainable Africa</em>
                                </h1>
                            </div>
                            <div className="ms-right">
                                <p className="ms-body">
                                    ARIN seeks to identify and leverage key research talents to flexibly and innovatively contribute to Africa's research transformation, policy analysis and capacity building. ARIN provides a peer review platform where best research and impact practices from different African contexts are shared, profiled, and leveraged to inform transformative policy action.
                                </p>
                                <a href="/about-us" className="ms-btn">
                                    Learn More <ArrowUpRight />
                                </a>
                            </div>
                        </div>

                        {/* Strip: img | card | img | card */}
                        <div className="ms-strip">
                            {/* Image 1 */}
                            <div className="ms-strip-img">
                                <img src="/images/mission-1.jpg" alt="ARIN Researchers" />
                            </div>

                            {/* Card 1 — Mission */}
                            <div className="ms-strip-card">
                                <div>
                                    <div className="ms-card-ico">
                                        <FlaskConical />
                                    </div>
                                    <div className="ms-card-title">Our Mission</div>
                                    <div className="ms-card-desc">
                                        ARIN connects scholars, institutions, and policymakers to drive evidence-based solutions that shape millions of lives across Africa.
                                    </div>
                                    <div className="ms-card-divider" />
                                    <div className="ms-card-bullet">Evidence-Based Research</div>
                                </div>
                            </div>

                            {/* Image 2 */}
                            <div className="ms-strip-img">
                                <img src="/images/mission-2.jpg" alt="Africa Research" />
                            </div>

                            {/* Card 2 — Vision */}
                            <div className="ms-strip-card">
                                <div>
                                    <div className="ms-card-ico">
                                        <Lightbulb />
                                    </div>
                                    <div className="ms-card-title">Our Vision</div>
                                    <div className="ms-card-desc">
                                        To become the leading pan-African research network driving science-policy interface and innovation across the continent.
                                    </div>
                                    <div className="ms-card-divider" />
                                    <div className="ms-card-bullet">Pan-African Impact</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ══ SECTION 2: WHY US ══ */}
                <section className="wu-section">
                    <div className="wu-lines" />
                    <div className="wu-line-mask" />

                    <div className="wu-wrap">

                        {/* Left: stacked images */}
                        <div className="wu-img-stack">
                            <div className="wu-img-back">
                                <img src="/images/why-us-1.jpg" alt="ARIN Network" />
                            </div>
                            <div className="wu-img-front">
                                <img src="/images/why-us-2.jpg" alt="ARIN Research" />
                            </div>
                            {/* Floating badge */}
                            <div className="wu-badge">
                                <div className="wu-badge-num">25+</div>
                                <div className="wu-badge-lbl">Countries</div>
                            </div>
                        </div>

                        {/* Right: text */}
                        <div>
                            <div className="ab-eyebrow">
                                <span className="ab-eyebrow-dot" />
                                Why Choose ARIN
                            </div>
                            <h2 className="wu-title">
                                From Research to<br />
                                <em>Real-World Impact</em><br />
                                Across Africa
                            </h2>
                            <p className="wu-body">
                                Among the areas that ARIN has pioneered path-breaking research are climate change, knowledge management, science technology, and innovation. The network convenes research and policy platforms on climate action — drawing from researchers on adaptation, STI status, and science-policy interface in Africa.
                            </p>

                            {/* 3-pillar strip */}
                            <div className="wu-pillars">
                                {pillars.map((p, i) => {
                                    const Icon = p.icon;
                                    return (
                                        <div key={i} className="wu-pillar">
                                            <div className="wu-pillar-ico"><Icon /></div>
                                            <div className="wu-pillar-title">{p.title}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <a href="/contact" className="wu-btn">
                                Contact Us <ArrowUpRight />
                            </a>
                        </div>

                    </div>
                </section>

            </div>
        </>
    );
}