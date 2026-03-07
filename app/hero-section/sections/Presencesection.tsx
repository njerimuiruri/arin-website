"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

function useCountUp(target: number, started: boolean, delay = 0) {
    const [val, setVal] = useState(0);
    const ran = useRef(false);
    useEffect(() => {
        if (!started || ran.current) return;
        ran.current = true;
        const DURATION = 1800;
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

const stats = [
    { value: 28, suffix: "+", label: "Countries" },
    { value: 5, suffix: "", label: "Focal Points" },
    { value: 70, suffix: "+", label: "Fellows" },
    { value: 4, suffix: "", label: "Regions" },
];

const focalPoints = [
    { top: "39%", left: "13%", name: "Sierra Leone" },
    { top: "44%", left: "20%", name: "Ghana" },
    { top: "51%", left: "67%", name: "Kenya" },
    { top: "63%", left: "57%", name: "Zambia" },
    { top: "65%", left: "63%", name: "Malawi" },
];

const legend = [
    { color: "#e63946", label: "Focal Points & Fellows" },
    { color: "#38bdf8", label: "ARIN Fellows" },
    { color: "#e2e8f0", border: "#cbd5e1", label: "Recruitment Ongoing" },
];

export default function PresenceSection() {
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) setStarted(true);
        }, { threshold: 0.15 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    const c0 = useCountUp(stats[0].value, started, 0);
    const c1 = useCountUp(stats[1].value, started, 150);
    const c2 = useCountUp(stats[2].value, started, 300);
    const c3 = useCountUp(stats[3].value, started, 450);
    const counts = [c0, c1, c2, c3];

    return (
        <>
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .pr-section {
          background: #ffffff;
          padding: 100px 0 104px;
          position: relative;
          overflow: hidden;
        }
        .pr-section::before {
          content: '';
          position: absolute;
          top: -200px; left: -160px;
          width: 580px; height: 580px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(2,29,73,.04) 0%, transparent 70%);
          pointer-events: none;
        }
        .pr-section::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(2,29,73,.08) 30%, rgba(2,29,73,.08) 70%, transparent);
        }

        .pr-wrap {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 32px;
        }

        /* ── Two-col grid ── */
        .pr-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .pr-grid { grid-template-columns: 1fr; gap: 48px; }
          .pr-map-col { order: -1; }
        }

        /* ══ LEFT TEXT COL ══ */
        .pr-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          color: #1d4ed8;
          letter-spacing: .15em;
          text-transform: uppercase;
          background: #eff6ff;
          border: 1px solid #bfdbfe;
          border-radius: 99px;
          padding: 5px 16px;
          margin-bottom: 20px;
        }
        .pr-ey-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #1d4ed8;
          animation: prBlink 2s ease infinite;
        }
        @keyframes prBlink { 0%,100%{opacity:1} 50%{opacity:.25} }

        .pr-title {
          font-family: 'Times New Roman', Times, serif;
          font-weight: 900;
          font-size: clamp(2rem, 3vw, 2.9rem);
          color: #021d49;
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
        }
        .pr-title em { font-style: italic; color: #1d4ed8; }

        .pr-body {
          font-family: 'Times New Roman', Times, serif;
          font-size: 15px;
          color: #64748b;
          line-height: 1.75;
          margin-bottom: 36px;
          max-width: 420px;
        }

        /* ── Stats grid ── */
        .pr-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 36px;
        }
        .pr-stat {
          padding: 18px 20px;
          background: #f8faff;
          border: 1px solid rgba(2,29,73,.07);
          border-radius: 16px;
          transition: all .25s ease;
          cursor: default;
        }
        .pr-stat:hover {
          background: #eff6ff;
          border-color: rgba(29,78,216,.15);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(2,29,73,.07);
        }
        .pr-stat-num {
          font-family: 'Times New Roman', Times, serif;
          font-weight: 900;
          font-size: 2rem;
          color: #021d49;
          line-height: 1;
          letter-spacing: -0.03em;
          margin-bottom: 4px;
        }
        .pr-stat-suf { color: #1d4ed8; }
        .pr-stat-lbl {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        /* ── Legend ── */
        .pr-legend {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 36px;
        }
        .pr-leg {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #475569;
        }
        .pr-leg-sw {
          width: 14px; height: 14px;
          border-radius: 4px;
          flex-shrink: 0;
        }

        /* ── CTA ── */
        .pr-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 999px;
          background: #021d49;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          transition: all .25s ease;
          box-shadow: 0 4px 18px rgba(2,29,73,.28);
        }
        .pr-btn:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(29,78,216,.35);
        }

        /* ══ MAP COL ══ */
        .pr-map-col { position: relative; }

        .pr-map-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(2,29,73,.08);
          box-shadow:
            0 1px 0 rgba(255,255,255,1) inset,
            0 24px 64px rgba(2,29,73,.10),
            0 4px 12px rgba(2,29,73,.05);
          background: #eef4fb;
        }
        .pr-map-card img {
          width: 100%;
          display: block;
        }

        /* Dots */
        .pr-dot {
          position: absolute;
          transform: translate(-50%, -50%);
          cursor: pointer;
          z-index: 4;
        }
        .pr-dot-core {
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #021d49;
          box-shadow: 0 0 0 2.5px white, 0 2px 8px rgba(2,29,73,.45);
          position: relative; z-index: 2;
        }
        .pr-ring {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          border: 1.5px solid rgba(2,29,73,.35);
          animation: prRing 2.4s ease-out infinite;
        }
        .pr-ring2 {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%,-50%);
          border-radius: 50%;
          border: 1px solid rgba(2,29,73,.12);
          animation: prRing 2.4s ease-out .8s infinite;
        }
        @keyframes prRing {
          0%  { width:10px; height:10px; opacity:1; }
          100%{ width:46px; height:46px; opacity:0; }
        }
        .pr-tip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          background: #021d49;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity .2s ease;
          z-index: 10;
        }
        .pr-tip::after {
          content: '';
          position: absolute;
          top: 100%; left: 50%;
          transform: translateX(-50%);
          border: 4px solid transparent;
          border-top-color: #021d49;
        }
        .pr-dot:hover .pr-tip { opacity: 1; }
      `}</style>

            <section ref={ref} className="pr-section">
                <div className="pr-wrap">
                    <div className="pr-grid">

                        {/* ── LEFT: Text ── */}
                        <div>
                            <div className="pr-eyebrow">
                                <div className="pr-ey-dot" />
                                Our Presence
                            </div>

                            <h2 className="pr-title">
                                Rooted Across<br />
                                the <em>African</em><br />
                                <em>Continent</em>
                            </h2>

                            <p className="pr-body">
                                ARIN's network of researchers, focal points, and fellows spans
                                the breadth of Africa — driving evidence-based change where
                                it matters most.
                            </p>

                            {/* Legend */}
                            <div className="pr-legend">
                                {legend.map((l) => (
                                    <div key={l.label} className="pr-leg">
                                        <div
                                            className="pr-leg-sw"
                                            style={{
                                                background: l.color,
                                                border: l.border ? `1px solid ${l.border}` : undefined,
                                            }}
                                        />
                                        {l.label}
                                    </div>
                                ))}
                            </div>

                            <a href="/network" className="pr-btn">
                                Explore Our Network <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>

                        {/* ── RIGHT: Map ── */}
                        <div className="pr-map-col">
                            <div className="pr-map-card">
                                <img src="/images/map.jpg" alt="ARIN Presence Across Africa" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}