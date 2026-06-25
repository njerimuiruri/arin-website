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

  const counts = [
    useCountUp(stats[0].value, started, 0),
    useCountUp(stats[1].value, started, 150),
    useCountUp(stats[2].value, started, 300),
    useCountUp(stats[3].value, started, 450),
  ];

  return (
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
              the breadth of Africa  driving evidence-based change where
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
  );
}
