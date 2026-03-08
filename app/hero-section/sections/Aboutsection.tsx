"use client";
import { useState, useRef, useCallback } from "react";
import {
    ArrowRight, Play, X, FlaskConical, Users, Globe2, Lightbulb,
} from "lucide-react";

const features = [
    { icon: FlaskConical, title: "Evidence-Based Research", desc: "Rigorous, peer-reviewed studies informing policy at national and continental levels." },
    { icon: Globe2, title: "Pan-African Network", desc: "Connecting researchers, institutions, and governments across 25+ African nations." },
    { icon: Users, title: "Capacity Building", desc: "Training and empowering the next generation of African research leaders." },
    { icon: Lightbulb, title: "Policy Translation", desc: "Bridging the gap between research findings and real-world policy decisions." },
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

                {/* ── Line art background ── */}
                <div className="ab2-art">
                    <div className="ab2-lines" />
                    <div className="ab2-vlines" />
                    <div className="ab2-diag" />
                    <div className="ab2-lines-mask" />
                    <div className="ab2-orb1" />
                    <div className="ab2-orb2" />
                </div>

                <div className="ab2-grid">

                    {/* ══ LEFT — video card (stretches full height) ══ */}
                    <div className="ab2-video-col">
                        <div className="ab2-vid-card" onClick={() => setOpen(true)}>

                            {/* ── Art layers inside card ── */}
                            <div className="ab2-vid-grid" />
                            <div className="ab2-vid-hatch" />
                            <div className="ab2-vid-dots" />
                            <div className="ab2-vid-cross-h" />
                            <div className="ab2-vid-cross-v" />

                            {/* Concentric arcs bottom-left */}
                            <div className="ab2-vid-arc ab2-vid-arc1" />
                            <div className="ab2-vid-arc ab2-vid-arc2" />
                            <div className="ab2-vid-arc ab2-vid-arc3" />
                            <div className="ab2-vid-arc ab2-vid-arc4" />

                            {/* Corner arcs top-right */}
                            <div className="ab2-vid-arc ab2-vid-arc5" />
                            <div className="ab2-vid-arc ab2-vid-arc6" />

                            <div className="ab2-vid-glow" />

                            {/* Glass stat chips */}
                            <div className="ab2-stat-chip ab2-chip-top">
                                <div className="ab2-chip-num">25<span style={{ color: "#60a5fa" }}>+</span></div>
                                <div className="ab2-chip-lbl">Countries</div>
                            </div>
                            <div className="ab2-stat-chip ab2-chip-right">
                                <div className="ab2-chip-num">500<span style={{ color: "#60a5fa" }}>+</span></div>
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

                    {/* ══ RIGHT — text content ══ */}
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
                            ARIN is Africa's premier research network — connecting scholars, institutions,
                            and policymakers to drive evidence-based solutions that shape millions of lives
                            across the continent.
                        </p>

                        <div className="ab2-feats">
                            {features.map((f, i) => {
                                const FI = f.icon;
                                return (
                                    <div key={i} className="ab2-feat">
                                        <div className="ab2-feat-ico"><FI /></div>
                                        <div>
                                            <div className="ab2-feat-title">{f.title}</div>
                                            <div className="ab2-feat-desc">{f.desc}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="ab2-ctas">
                            <a href="/about-us" className="ab2-btn-p">
                                Learn About ARIN <ArrowRight className="w-4 h-4" />
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
                        <video
                            src="/videos/about.mp4"
                            controls
                            autoPlay
                            playsInline
                        />
                    </div>
                </div>
            )}
        </>
    );
}
