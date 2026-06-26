"use client";
import { useState, useRef, useCallback } from "react";
import {
    ArrowRight, Play, X,
    Wind, Building2, Wheat, Pickaxe, Cpu, HeartPulse, Trees, SunMedium,
} from "lucide-react";

const thematicAreas = [
    { icon: SunMedium, title: "Sustainable Development", color: "#f59e0b", slug: "sustainable-development" },
    { icon: Wind, title: "Climate Change & Energy", color: "#0ea5e9", slug: "climate-change-energy" },
    { icon: Building2, title: "Cities & Resilience", color: "#8b5cf6", slug: "cities-resilience" },
    { icon: Wheat, title: "Agriculture & Forestry", color: "#22c55e", slug: "agriculture-forestry" },
    { icon: Pickaxe, title: "Mining, Trade & Industry", color: "#f97316", slug: "mining-trade-industry" },
    { icon: Cpu, title: "Technology & Innovation", color: "#3b82f6", slug: "technology-innovation" },
    { icon: HeartPulse, title: "Climate and Health", color: "#ef4444", slug: "climate-health" },
    { icon: Trees, title: "Forests & Ecosystems", color: "#10b981", slug: "forests-ecosystems" },
];

export default function AboutSection() {
    const [open, setOpen] = useState(false);
    const overlayRef = useRef<HTMLDivElement>(null);
    const closeOnBg = useCallback((e: React.MouseEvent) => {
        if (e.target === overlayRef.current) setOpen(false);
    }, []);

    return (
        <>
            <section className="ab2-section">

                {/* ── Decorative background ── */}
                <div className="ab2-art">
                    <div className="ab2-lines" />
                    <div className="ab2-vlines" />
                    <div className="ab2-lines-mask" />
                    <div className="ab2-orb1" />
                    <div className="ab2-orb2" />
                    <div className="ab2-deco-word">ARIN</div>
                </div>

                <div className="ab2-grid">

                    {/* ══ LEFT  video column ══ */}
                    <div className="ab2-video-col">

                        {/* Main video card  real photo + overlay */}
                        <div className="ab2-vid-card" onClick={() => setOpen(true)}>

                            {/* Photo background */}
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/paafrica.jpg"
                                alt="ARIN Conference"
                                className="ab2-vid-photo"
                            />

                            {/* Gradient overlay */}
                            <div className="ab2-vid-overlay" />

                            {/* Subtle art on top of photo */}
                            <div className="ab2-vid-grid" />
                            <div className="ab2-vid-arc ab2-vid-arc1" />
                            <div className="ab2-vid-arc ab2-vid-arc2" />
                            <div className="ab2-vid-arc ab2-vid-arc3" />
                            <div className="ab2-vid-arc ab2-vid-arc5" />
                            <div className="ab2-vid-arc ab2-vid-arc6" />

                            {/* Glass stat chips */}
                            <div className="ab2-stat-chip ab2-chip-top">
                                <div className="ab2-chip-num">25<span style={{ color: "#34d399" }}>+</span></div>
                                <div className="ab2-chip-lbl">Countries</div>
                            </div>
                            <div className="ab2-stat-chip ab2-chip-right">
                                <div className="ab2-chip-num">500<span style={{ color: "#34d399" }}>+</span></div>
                                <div className="ab2-chip-lbl">Projects</div>
                            </div>

                            {/* Play button */}
                            <div className="ab2-play-btn">
                                <div className="ab2-play-pulse" />
                                <div className="ab2-play-pulse2" />
                                <Play className="w-7 h-7" style={{ color: "#021d49", marginLeft: 3 }} />
                            </div>

                            {/* Bottom label */}
                            <div className="ab2-play-label">
                                <div className="ab2-play-label-dot" />
                                Watch Our Story
                            </div>
                        </div>

                    </div>

                    {/* ══ RIGHT  text + thematic areas ══ */}
                    <div>
                        <div className="ab2-eyebrow">
                            <div className="ab2-ey-dot" />
                            What We Do
                        </div>

                        <h2 className="ab2-title">
                            Transforming Research<br />
                            into <em>Lasting Impact</em><br />
                            Across Africa
                        </h2>

                        <p className="ab2-body">
                            The Africa Research and Impact Network (ARIN) is a pan-African research organisation that
                            strengthens the capacity of African researchers and policymakers to generate, share, and use evidence
                            for sustainable development. ARIN operates a Science-Policy Fellowship Programme engaging
                            members from 36 African countries, with 30% drawn from government and policy institutions.
                        </p>

                        {/* Thematic areas mini grid */}
                        <div className="ab2-themes-label">Our Thematic Areas</div>
                        <div className="ab2-themes-grid">
                            {thematicAreas.map((area) => {
                                const Icon = area.icon;
                                return (
                                    <a
                                        key={area.slug}
                                        href={`/about-us/focus-areas/${area.slug}`}
                                        className="ab2-theme-chip"
                                        style={{ "--chip-color": area.color } as React.CSSProperties}
                                    >
                                        <div
                                            className="ab2-theme-ico"
                                            style={{ background: area.color + "1a" }}
                                        >
                                            <Icon style={{ width: 13, height: 13, color: area.color }} />
                                        </div>
                                        <span className="ab2-theme-name">{area.title}</span>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="ab2-ctas">
                            <a href="/about-us/focus-areas" className="ab2-btn-p">
                                Explore All Areas <ArrowRight className="w-4 h-4" />
                            </a>
                            <a href="/contact" className="ab2-btn-s">
                                Get in Touch <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ Video Modal ══ */}
            {open && (
                <div className="ab2-modal" ref={overlayRef} onClick={closeOnBg}>
                    <div className="ab2-modal-box">
                        <button className="ab2-modal-close" onClick={() => setOpen(false)} aria-label="Close">
                            <X className="w-4 h-4 text-white" />
                        </button>
                        <iframe
                            src="https://www.youtube.com/embed/K1MKlqB0uKk?start=15112&autoplay=1"
                            title="ARIN  4th Annual Conference"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </>
    );
}
