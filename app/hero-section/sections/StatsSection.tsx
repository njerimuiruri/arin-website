"use client";
import { useEffect, useRef, useState } from "react";
import { Globe, BookOpen, Handshake } from "lucide-react";

const stats = [
    {
        icon: Globe,
        value: 25,
        suffix: "+",
        label: "African Countries",
        description: "Nations actively engaged in ARIN's research network.",
    },
    {
        icon: BookOpen,
        value: 500,
        suffix: "+",
        label: "Research Projects",
        description: "Evidence-based studies completed and ongoing.",
    },
    {
        icon: Handshake,
        value: 120,
        suffix: "+",
        label: "Partner Organizations",
        description: "Institutions collaborating on African research.",
    },
];

function useCountUp(target: number, started: boolean, delay = 0) {
    const [val, setVal] = useState(0);
    const ran = useRef(false);
    useEffect(() => {
        if (!started || ran.current) return;
        ran.current = true;
        const DURATION = 2000;
        const t0 = performance.now() + delay;
        const tick = (now: number) => {
            if (now < t0) { requestAnimationFrame(tick); return; }
            const p = Math.min((now - t0) / DURATION, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 4)) * target));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }, [started, target, delay]);
    return val;
}

function StatCard({ stat, index, started }: { stat: typeof stats[0]; index: number; started: boolean }) {
    const val = useCountUp(stat.value, started, index * 180);
    const Icon = stat.icon;
    return (
        <div className="sc-card" style={{ animationDelay: `${index * 0.12}s` }}>
            <div className="sc-icon-wrap">
                <div className="sc-outer">
                    <div className="sc-inner">
                        <Icon className="sc-ico" strokeWidth={1.5} />
                    </div>
                </div>
            </div>
            <div className="sc-num-row">
                <span className="sc-num">{val.toLocaleString()}</span>
                <span className="sc-suf">{stat.suffix}</span>
            </div>
            <h3 className="sc-lbl">{stat.label}</h3>
            <p className="sc-desc">{stat.description}</p>
            <div className="sc-line" />
        </div>
    );
}

export default function StatsSection() {
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setStarted(true); },
            { threshold: 0.25 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

                .sc-section {
                    background: #ffffff;
                    padding: 72px 24px;
                    position: relative;
                    overflow: hidden;
                }

                /* Line art */
                .sc-lines {
                    position: absolute;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        0deg,
                        transparent, transparent 59px,
                        rgba(2,29,73,.04) 59px, rgba(2,29,73,.04) 60px
                    );
                    pointer-events: none;
                }
                .sc-vlines {
                    position: absolute;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        90deg,
                        transparent, transparent 79px,
                        rgba(2,29,73,.025) 79px, rgba(2,29,73,.025) 80px
                    );
                    pointer-events: none;
                }
                .sc-line-mask {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, white 80%);
                    pointer-events: none;
                }

                .sc-section::before,
                .sc-section::after {
                    content: '';
                    position: absolute;
                    left: 0; right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(2,29,73,.08) 30%, rgba(2,29,73,.08) 70%, transparent);
                }
                .sc-section::before { top: 0; }
                .sc-section::after  { bottom: 0; }

                /* ── Grid ── */
                .sc-grid {
                    position: relative;
                    z-index: 1;
                    max-width: 860px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                @media (max-width: 600px) {
                    .sc-grid { grid-template-columns: 1fr; }
                }

                /* ── Header ── */
                .sc-header {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    margin-bottom: 40px;
                }
                .sc-eyebrow {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    letter-spacing: .18em;
                    text-transform: uppercase;
                    color: #94a3b8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }
                .sc-eyebrow::before, .sc-eyebrow::after {
                    content: '';
                    width: 28px; height: 1px;
                    background: rgba(2,29,73,.12);
                    display: inline-block;
                }
                .sc-title {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: clamp(1.6rem, 2.5vw, 2.1rem);
                    color: #021d49;
                    letter-spacing: -0.02em;
                    line-height: 1.1;
                }
                .sc-title span { font-style: italic; color: #1d4ed8; }

                /* ── Card — compact ── */
                @keyframes scIn {
                    from { opacity:0; transform:translateY(20px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .sc-card {
                    background: #fafbff;
                    border: 1px solid rgba(2,29,73,.07);
                    border-radius: 18px;
                    padding: 24px 20px 20px;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    overflow: hidden;
                    opacity: 0;
                    animation: scIn .6s ease forwards;
                    transition: transform .3s ease, box-shadow .3s ease, border-color .3s ease, background .3s ease;
                }
                .sc-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 14px 40px rgba(2,29,73,.09);
                    border-color: rgba(2,29,73,.12);
                    background: white;
                }

                /* ── Icon — smaller ── */
                .sc-icon-wrap { margin-bottom: 14px; }
                .sc-outer {
                    width: 72px; height: 72px;
                    border-radius: 50%;
                    border: 2px dashed rgba(2,29,73,.18);
                    display: flex; align-items: center; justify-content: center;
                    transition: border-color .3s ease;
                }
                .sc-card:hover .sc-outer {
                    border-color: rgba(29,78,216,.4);
                    animation: rotateDash 7s linear infinite;
                }
                @keyframes rotateDash { to { transform: rotate(360deg); } }

                .sc-inner {
                    width: 50px; height: 50px;
                    border-radius: 50%;
                    background: rgba(2,29,73,.05);
                    display: flex; align-items: center; justify-content: center;
                    transition: background .3s ease;
                }
                .sc-card:hover .sc-inner { background: #021d49; }

                .sc-ico {
                    width: 20px; height: 20px;
                    color: #021d49;
                    transition: color .3s ease;
                }
                .sc-card:hover .sc-ico { color: white; }

                /* ── Number — tighter ── */
                .sc-num-row {
                    display: flex;
                    align-items: baseline;
                    gap: 2px;
                    margin-bottom: 4px;
                }
                .sc-num {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: clamp(1.7rem, 2.5vw, 2.2rem);
                    color: #021d49;
                    line-height: 1;
                    letter-spacing: -0.03em;
                    transition: color .3s ease;
                }
                .sc-card:hover .sc-num { color: #1d4ed8; }
                .sc-suf {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: #1d4ed8;
                    line-height: 1;
                }

                /* ── Label ── */
                .sc-lbl {
                    font-family: 'DM Sans', sans-serif;
                    font-weight: 700;
                    font-size: 13px;
                    color: #021d49;
                    margin-bottom: 6px;
                    letter-spacing: .01em;
                }

                /* ── Description ── */
                .sc-desc {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 12px;
                    color: #94a3b8;
                    line-height: 1.6;
                    max-width: 180px;
                    margin: 0 auto;
                }

                /* ── Bottom accent ── */
                .sc-line {
                    position: absolute;
                    bottom: 0; left: 50%;
                    transform: translateX(-50%);
                    height: 3px; width: 0;
                    background: linear-gradient(90deg, #021d49, #1d4ed8);
                    border-radius: 99px;
                    transition: width .4s ease;
                }
                .sc-card:hover .sc-line { width: 48%; }
            `}</style>

            <section ref={ref} className="sc-section">
                <div className="sc-lines" />
                <div className="sc-vlines" />
                <div className="sc-line-mask" />

                <div className="sc-header">
                    <p className="sc-eyebrow">ARIN by the Numbers</p>
                    <h2 className="sc-title">
                        Our <span>Impact</span> Across Africa
                    </h2>
                </div>

                <div className="sc-grid">
                    {stats.map((s, i) => (
                        <StatCard key={i} stat={s} index={i} started={started} />
                    ))}
                </div>
            </section>
        </>
    );
}