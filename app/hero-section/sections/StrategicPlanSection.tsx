"use client";
import { useState } from "react";
import { ArrowRight, FlaskConical, Package, BookOpenCheck, RotateCcw, X, Maximize2, Users, Globe2 } from "lucide-react";

const pillars = [
    {
        number: 1,
        title: "Applied Evidence Generation",
        icon: FlaskConical,
        accent: "#3b82f6",
        tint: "#eff6ff",
        items: [
            "Localising Climate and Sustainability Actions",
            "Building Resilience for the Urban Poor",
            "Inclusive Climate and Health Solutions in Africa",
            "Innovation and Emerging Technologies",
        ],
    },
    {
        number: 2,
        title: "Evidence Packaging",
        icon: Package,
        accent: "#8b5cf6",
        tint: "#f5f3ff",
        items: ["ARIN Publication Platform", "Publishing Academy"],
    },
    {
        number: 3,
        title: "Evidence Uptake",
        icon: BookOpenCheck,
        accent: "#00c4b3",
        tint: "#ecfdf9",
        items: [
            "Science-Policy Fellowship Programme",
            "Policy Translation Labs",
            "Capacity Strengthening",
            "Communication and Outreach",
        ],
    },
    {
        number: 4,
        title: "Feedback & Learning",
        icon: RotateCcw,
        accent: "#f59e0b",
        tint: "#fffbeb",
        items: ["Performance Monitoring", "Outcome Harvesting"],
    },
];

const stats = [
    { value: "400+", label: "Researchers, policymakers & practitioners", icon: Users },
    { value: "41", label: "African countries with National Focal Points", icon: Globe2 },
];

export default function StrategicPlanSection() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <section className="relative w-full py-12 md:py-16 px-6 bg-white border-t border-gray-100 overflow-hidden">
                {/* Decorative dot-grid + soft colour blooms, distinct from About's line
                    texture so adjacent sections don't feel like repeats of each other. */}
                <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none opacity-60"
                    style={{
                        backgroundImage: "radial-gradient(rgba(2,29,73,0.05) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                        maskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 0%, black 30%, transparent 75%)",
                    }}
                />
                <div
                    aria-hidden
                    className="absolute -left-32 top-24 w-80 h-80 rounded-full pointer-events-none hidden lg:block"
                    style={{ background: "radial-gradient(circle, rgba(0,196,179,0.09) 0%, transparent 70%)" }}
                />
                <div
                    aria-hidden
                    className="absolute right-0 bottom-0 w-72 h-72 rounded-full pointer-events-none hidden lg:block"
                    style={{ background: "radial-gradient(circle, rgba(2,29,73,0.05) 0%, transparent 70%)" }}
                />
                <div
                    aria-hidden
                    className="absolute top-20 right-10 w-16 h-16 border border-teal-200/60 rounded-2xl rotate-12 pointer-events-none hidden xl:block"
                />

                <div className="max-w-6xl mx-auto relative">
                    <div className="max-w-2xl mb-10">
                        <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 border border-teal-200 bg-white rounded-full px-4 py-1 mb-4">
                            Strategic Direction
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#021d49] mb-4 tracking-tight">
                            ARIN Strategic Plan 2026–2030
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            <strong className="text-gray-900">Vision:</strong> Strengthen Africa's Research and Policy Leadership in the Globe.{' '}
                            <strong className="text-gray-900">Mission:</strong> To connect researchers, policymakers, and practitioners to drive evidence-based solutions for grassroots communities.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-[480px_minmax(0,1fr)] gap-10 lg:gap-14 items-start">
                        {/* LEFT — the plan itself, sized to stay legible, sticky while the
                            pillars flow past it on the right. */}
                        <div className="lg:sticky lg:top-28">
                            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-xl p-3">
                                <span className="absolute -top-3 left-6 inline-flex items-center bg-[#021d49] text-white text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-sm">
                                    2026–2030
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="group relative w-full rounded-xl overflow-hidden block bg-slate-50"
                                >
                                    <img
                                        src="/images/strategicplan.jpeg"
                                        alt="ARIN Strategic Plan 2026–2030"
                                        className="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-[#021d49]/0 group-hover:bg-[#021d49]/8 transition-colors duration-300 flex items-end justify-end p-4">
                                        <span className="inline-flex items-center gap-2 text-white text-sm font-semibold bg-[#021d49]/90 rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Maximize2 className="w-3.5 h-3.5" /> View Full Size
                                        </span>
                                    </div>
                                </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {stats.map((s) => {
                                    const StatIcon = s.icon;
                                    return (
                                        <div key={s.label} className="bg-slate-50 rounded-xl border border-gray-100 p-4">
                                            <StatIcon className="w-4 h-4 text-teal-600 mb-2" />
                                            <p className="text-xl font-bold text-[#021d49] leading-none">{s.value}</p>
                                            <p className="text-xs text-gray-500 mt-1.5 leading-snug">{s.label}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT — the pillars, a compact 2x2 grid so this column stays
                            roughly the same height as the sticky image beside it. */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {pillars.map((pillar) => {
                                const Icon = pillar.icon;
                                return (
                                    <div
                                        key={pillar.number}
                                        className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 hover:border-gray-200 transition-all duration-300 overflow-hidden"
                                    >
                                        {/* Faint watermark number — decorative, tucked behind the content */}
                                        <span
                                            aria-hidden
                                            className="absolute -top-2 -right-1 text-6xl font-black leading-none select-none pointer-events-none transition-opacity duration-300 group-hover:opacity-80"
                                            style={{ color: pillar.tint }}
                                        >
                                            0{pillar.number}
                                        </span>

                                        <div className="relative">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div
                                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                                    style={{ background: pillar.tint, boxShadow: `0 6px 16px ${pillar.accent}26` }}
                                                >
                                                    <Icon className="w-4.5 h-4.5" style={{ color: pillar.accent }} />
                                                </div>
                                                <h3 className="font-bold text-gray-900 leading-snug text-sm">{pillar.title}</h3>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5">
                                                {pillar.items.map((item) => (
                                                    <span
                                                        key={item}
                                                        className="text-[11px] font-semibold rounded-full px-2.5 py-1"
                                                        style={{ background: pillar.tint, color: pillar.accent }}
                                                    >
                                                        {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-center mt-14">
                        <a
                            href="/contact"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#021d49]/20 hover:bg-[#032d6b] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Partner With Us <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                    </div>
                </div>
            </section>

            {open && (
                <div
                    className="fixed inset-0 z-50 bg-[#021d49]/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setOpen(false)}
                >
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                        <img
                            src="/images/strategicplan.jpeg"
                            alt="ARIN Strategic Plan 2026–2030"
                            className="w-full h-auto rounded-xl shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
