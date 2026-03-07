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
            <style jsx global>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

            /* ══ Section shell ══ */
            .ab2-section {
                position: relative;
                background: #ffffff;
                padding: 100px 0 96px;
                overflow: hidden;
            }

            /* ── Line art background (no dots) ── */
            .ab2-art {
                position: absolute;
                inset: 0;
                pointer-events: none;
                overflow: hidden;
            }

            /* Horizontal lines */
            .ab2-lines {
                position: absolute;
                inset: 0;
                background-image: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 59px,
                    rgba(2,29,73,.045) 59px,
                    rgba(2,29,73,.045) 60px
                );
            }

            /* Vertical lines */
            .ab2-vlines {
                position: absolute;
                inset: 0;
                background-image: repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 79px,
                    rgba(2,29,73,.03) 79px,
                    rgba(2,29,73,.03) 80px
                );
            }

            /* Fade mask so lines are subtle in centre */
            .ab2-lines-mask {
                position: absolute;
                inset: 0;
                background: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, white 85%);
            }

            /* Soft orbs for depth */
            .ab2-orb1 {
                position: absolute;
                top: -180px; left: -140px;
                width: 560px; height: 560px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(29,78,216,.05) 0%, transparent 68%);
            }
            .ab2-orb2 {
                position: absolute;
                bottom: -160px; right: -120px;
                width: 480px; height: 480px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(2,29,73,.04) 0%, transparent 68%);
            }

            /* Thin diagonal accent lines */
            .ab2-diag {
                position: absolute;
                inset: 0;
                background-image: repeating-linear-gradient(
                    -45deg,
                    transparent,
                    transparent 39px,
                    rgba(29,78,216,.018) 39px,
                    rgba(29,78,216,.018) 40px
                );
            }

            /* ══ Grid ══ */
            .ab2-grid {
                position: relative;
                z-index: 1;
                max-width: 1160px;
                margin: 0 auto;
                padding: 0 32px;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 64px;
                align-items: stretch;
            }
            @media (max-width: 860px) {
                .ab2-grid { grid-template-columns: 1fr; gap: 48px; align-items: unset; }
                .ab2-video-col { order: -1; }
            }

            /* ══ Video column — stretches to full text height ══ */
            .ab2-video-col {
                position: relative;
                display: flex;
                flex-direction: column;
            }

            /* The video card fills the full column height */
            .ab2-vid-card {
                position: relative;
                flex: 1;
                min-height: 380px;
                border-radius: 28px;
                overflow: hidden;
                background: linear-gradient(145deg, #0a1c44 0%, #021d49 45%, #0c2a64 100%);
                box-shadow:
                    0 2px 0 rgba(255,255,255,.08) inset,
                    0 28px 80px rgba(2,29,73,.18),
                    0 4px 16px rgba(2,29,73,.10);
                cursor: pointer;
                transition: transform .35s ease, box-shadow .35s ease;
            }
            .ab2-vid-card:hover {
                transform: translateY(-4px) scale(1.01);
                box-shadow: 0 36px 100px rgba(2,29,73,.24);
            }

            /* ── Abstract art inside the card ── */

            /* Blueprint-style grid lines */
            .ab2-vid-grid {
                position: absolute;
                inset: 0;
                background-image:
                    linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
                background-size: 40px 40px;
            }

            /* Diagonal hatching */
            .ab2-vid-hatch {
                position: absolute;
                inset: 0;
                opacity: .18;
                background-image: repeating-linear-gradient(
                    -55deg,
                    transparent, transparent 20px,
                    rgba(255,255,255,.06) 20px, rgba(255,255,255,.06) 21px
                );
            }

            /* Concentric arcs — decorative geometric art */
            .ab2-vid-arc {
                position: absolute;
                border-radius: 50%;
                border: 1px solid rgba(255,255,255,.07);
            }
            .ab2-vid-arc1 { width: 220px; height: 220px; bottom: -60px; left: -60px; }
            .ab2-vid-arc2 { width: 340px; height: 340px; bottom: -110px; left: -110px; }
            .ab2-vid-arc3 { width: 460px; height: 460px; bottom: -160px; left: -160px; }
            .ab2-vid-arc4 { width: 580px; height: 580px; bottom: -210px; left: -210px; }

            /* Top-right corner arcs */
            .ab2-vid-arc5 { width: 180px; height: 180px; top: -50px; right: -50px; border-color: rgba(29,78,216,.12); }
            .ab2-vid-arc6 { width: 280px; height: 280px; top: -90px; right: -90px; border-color: rgba(29,78,216,.07); }

            /* Centre radial glow */
            .ab2-vid-glow {
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                width: 55%; height: 55%;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(29,78,216,.2) 0%, transparent 70%);
            }

            /* Dot grid overlay inside card */
            .ab2-vid-dots {
                position: absolute;
                inset: 0;
                background-image: radial-gradient(circle, rgba(255,255,255,.08) 1px, transparent 1px);
                background-size: 24px 24px;
                -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%);
                mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%);
            }

            /* Thin cross-hair lines */
            .ab2-vid-cross-h {
                position: absolute;
                top: 50%; left: 0; right: 0;
                height: 1px;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,.06) 30%, rgba(255,255,255,.06) 70%, transparent);
            }
            .ab2-vid-cross-v {
                position: absolute;
                left: 50%; top: 0; bottom: 0;
                width: 1px;
                background: linear-gradient(180deg, transparent, rgba(255,255,255,.06) 30%, rgba(255,255,255,.06) 70%, transparent);
            }

            /* ── Play button ── */
            .ab2-play-btn {
                position: absolute;
                top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                z-index: 4;
                width: 76px; height: 76px;
                border-radius: 50%;
                background: rgba(255,255,255,.95);
                border: 2px solid rgba(255,255,255,1);
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 8px 32px rgba(0,0,0,.25);
                transition: all .3s ease;
                cursor: pointer;
            }
            .ab2-play-btn::before {
                content: '';
                position: absolute;
                inset: -10px;
                border-radius: 50%;
                border: 1.5px dashed rgba(255,255,255,.4);
                animation: spinRing 9s linear infinite;
            }
            @keyframes spinRing { to { transform: rotate(360deg); } }

            .ab2-play-pulse {
                position: absolute;
                inset: -18px; border-radius: 50%;
                border: 1.5px solid rgba(255,255,255,.22);
                animation: vidPulse 2.5s ease-out infinite;
            }
            .ab2-play-pulse2 {
                position: absolute;
                inset: -30px; border-radius: 50%;
                border: 1px solid rgba(255,255,255,.10);
                animation: vidPulse 2.5s ease-out .9s infinite;
            }
            @keyframes vidPulse { 0%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(1.35)} }

            .ab2-vid-card:hover .ab2-play-btn {
                background: #021d49;
                transform: translate(-50%, -50%) scale(1.12);
                box-shadow: 0 12px 40px rgba(2,29,73,.45);
            }
            .ab2-vid-card:hover .ab2-play-btn svg { color: white !important; }

            /* Play label chip */
            .ab2-play-label {
                position: absolute;
                bottom: 28px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 4;
                font-family: 'DM Sans', sans-serif;
                font-size: 12px;
                font-weight: 600;
                color: rgba(255,255,255,.8);
                letter-spacing: .08em;
                text-transform: uppercase;
                display: flex;
                align-items: center;
                gap: 7px;
                background: rgba(255,255,255,.10);
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,.15);
                padding: 7px 18px;
                border-radius: 99px;
                white-space: nowrap;
                transition: all .25s ease;
            }
            .ab2-vid-card:hover .ab2-play-label {
                background: rgba(255,255,255,.18);
                color: white;
            }
            .ab2-play-label-dot {
                width: 6px; height: 6px;
                border-radius: 50%;
                background: #60a5fa;
                animation: blink2 2s ease infinite;
            }
            @keyframes blink2 { 0%,100%{opacity:1} 50%{opacity:.3} }

            /* Glass stat badges on the card */
            .ab2-stat-chip {
                position: absolute;
                z-index: 5;
                background: rgba(255,255,255,.12);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255,255,255,.22);
                border-radius: 14px;
                padding: 10px 16px;
            }
            .ab2-chip-top  { top: 24px; left: 24px; }
            .ab2-chip-right { top: 24px; right: 24px; }
            .ab2-chip-num {
                font-family: 'Playfair Display', serif;
                font-weight: 900;
                font-size: 1.3rem;
                color: white;
                line-height: 1;
            }
            .ab2-chip-lbl {
                font-family: 'DM Mono', monospace;
                font-size: 9px;
                color: rgba(255,255,255,.5);
                text-transform: uppercase;
                letter-spacing: .08em;
                margin-top: 2px;
            }

            /* ══ Text column ══ */
            .ab2-eyebrow {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                font-family: 'DM Sans', sans-serif;
                font-size: 11px;
                font-weight: 600;
                color: #1d4ed8;
                letter-spacing: .1em;
                text-transform: uppercase;
                background: #eff6ff;
                border: 1px solid #bfdbfe;
                border-radius: 99px;
                padding: 5px 14px;
                margin-bottom: 20px;
            }
            .ab2-ey-dot {
                width: 6px; height: 6px;
                border-radius: 50%;
                background: #1d4ed8;
                animation: blink2 2s ease infinite;
            }

            .ab2-title {
                font-family: 'Times New Roman', Times, serif;
                font-weight: 700;
                font-size: clamp(2rem, 3.2vw, 3rem);
                color: #021d49;
                line-height: 1.1;
                letter-spacing: -0.025em;
                margin-bottom: 18px;
            }
            .ab2-title em { font-style: italic; color: #1d4ed8; }

            .ab2-body {
                font-family: 'DM Sans', sans-serif;
                font-size: 15px;
                color: #64748b;
                line-height: 1.75;
                margin-bottom: 32px;
                max-width: 460px;
            }

            /* Feature rows */
            .ab2-feats { display: flex; flex-direction: column; gap: 14px; margin-bottom: 36px; }
            .ab2-feat {
                display: flex; gap: 14px; align-items: flex-start;
                padding: 14px 16px;
                border-radius: 14px;
                border: 1px solid rgba(2,29,73,.06);
                background: white;
                transition: all .25s ease;
                cursor: default;
            }
            .ab2-feat:hover {
                border-color: rgba(29,78,216,.15);
                box-shadow: 0 6px 20px rgba(2,29,73,.07);
                transform: translateX(4px);
            }
            .ab2-feat-ico {
                width: 36px; height: 36px;
                border-radius: 10px;
                background: rgba(2,29,73,.05);
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0;
                transition: background .25s ease;
            }
            .ab2-feat:hover .ab2-feat-ico { background: #021d49; }
            .ab2-feat:hover .ab2-feat-ico svg { color: white !important; }
            .ab2-feat-ico svg { width: 15px; height: 15px; color: #021d49; transition: color .25s ease; }
            .ab2-feat-title { font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 13px; color: #021d49; margin-bottom: 2px; }
            .ab2-feat-desc  { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #94a3b8; line-height: 1.5; }

            /* CTAs */
            .ab2-ctas { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
            .ab2-btn-p {
                display: inline-flex; align-items: center; gap: 8px;
                padding: 13px 26px; border-radius: 999px;
                background: #021d49; color: white;
                font-family: 'DM Sans', sans-serif; font-weight: 600; font-size: 14px;
                transition: all .25s ease;
                box-shadow: 0 4px 18px rgba(2,29,73,.28);
            }
            .ab2-btn-p:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 8px 28px rgba(29,78,216,.35); }
            .ab2-btn-s {
                display: inline-flex; align-items: center; gap: 6px;
                color: #021d49; font-family: 'DM Sans', sans-serif;
                font-weight: 600; font-size: 14px;
                border-bottom: 1.5px solid rgba(2,29,73,.2);
                padding-bottom: 1px; transition: all .2s ease;
            }
            .ab2-btn-s:hover { color: #1d4ed8; border-color: #1d4ed8; gap: 10px; }

            /* ══ Video Modal ══ */
            .ab2-modal {
                position: fixed; inset: 0; z-index: 2000;
                background: rgba(2,8,24,.88);
                backdrop-filter: blur(14px);
                -webkit-backdrop-filter: blur(14px);
                display: flex; align-items: center; justify-content: center;
                padding: 24px;
                animation: fadeIn2 .3s ease forwards;
            }
            @keyframes fadeIn2 { from{opacity:0} to{opacity:1} }
            .ab2-modal-box {
                position: relative;
                width: 100%; max-width: 880px;
                border-radius: 22px;
                overflow: hidden;
                box-shadow: 0 40px 120px rgba(0,0,0,.5);
                animation: scaleUp .35s cubic-bezier(.34,1.56,.64,1) forwards;
            }
            @keyframes scaleUp { from{opacity:0;transform:scale(.88)} to{opacity:1;transform:scale(1)} }
            .ab2-modal-box video {
                width: 100%; display: block;
                aspect-ratio: 16/9; background: #000;
            }
            .ab2-modal-close {
                position: absolute; top: 14px; right: 14px;
                width: 36px; height: 36px; border-radius: 50%;
                background: rgba(255,255,255,.15);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255,255,255,.25);
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; transition: background .2s ease; z-index: 10;
            }
            .ab2-modal-close:hover { background: rgba(255,255,255,.28); }
        `}</style>

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