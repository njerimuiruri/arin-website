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
            {/* <p className="sc-desc">{stat.description}</p> */}
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
    );
}
