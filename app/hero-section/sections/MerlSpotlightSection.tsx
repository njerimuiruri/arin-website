import { ArrowRight, ExternalLink, CheckCircle2 } from "lucide-react";

const partners = [
    { label: "MECCF", full: "Ministry of Environment, Climate Change, Natural Resources & Forestry — Kenya" },
    { label: "SSN", full: "SouthSouthNorth" },
    { label: "CDKN", full: "Climate & Development Knowledge Network" },
    { label: "WRI", full: "World Resources Institute" },
    { label: "AGNES", full: "African Group of Negotiators Expert Support" },
    { label: "ARIN / LAMA", full: "Africa Research & Impact Network — LAMA Platform", highlight: true },
];

const highlights = [
    "Standardised climate indicators handbook",
    "Digital MERL data collection & reporting tool",
    "Strengthened transparency & accountability",
    "Informed decision-making across Kenya’s climate actions",
];

export default function MerlSpotlightSection() {
    return (
        <section
            className="py-16 md:py-20 px-6"
            style={{ background: "white", borderTop: "1px solid #f1f5f9" }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

                {/* Top label row */}
                <div className="flex flex-wrap items-center gap-3 mb-10 md:mb-12">
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        padding: "6px 14px", borderRadius: 99,
                        background: "rgba(0,196,179,0.08)",
                        border: "1px solid rgba(0,196,179,0.25)",
                    }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c4b3" }} />
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 11, fontWeight: 700,
                            letterSpacing: "0.12em", textTransform: "uppercase",
                            color: "#00c4b3",
                        }}>
                            Partnership Spotlight
                        </span>
                    </div>
                    <div className="hidden sm:block flex-1" style={{ height: 1, background: "#f1f5f9" }} />
                    <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 12, color: "#9ca3af",
                    }}>
                        LAMA in Action · Kenya 2025
                    </span>
                </div>

                {/* Main grid — stacks on mobile, side-by-side on lg+ */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

                    {/* LEFT */}
                    <div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 700,
                            fontSize: "clamp(1.75rem, 3vw, 2.6rem)",
                            lineHeight: 1.18,
                            color: "#0f172a",
                            marginBottom: 28,
                            letterSpacing: "-0.01em",
                        }}>
                            ARIN's LAMA Platform Engaged in Kenya's National
                            Climate Monitoring, Evaluation, Reporting &amp; Learning Initiative
                        </h2>

                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 15.5,
                            lineHeight: 1.9,
                            color: "#475569",
                            marginBottom: 32,
                        }}>
                            Kenya&apos;s Ministry of Environment, Climate Change, Natural Resources and Forestry (MECCF)
                            has formed a landmark multi-partner initiative — co-led with{" "}
                            <strong style={{ color: "#0f172a", fontWeight: 600 }}>SouthSouthNorth (SSN)</strong>,{" "}
                            the <strong style={{ color: "#0f172a", fontWeight: 600 }}>Climate and Development Knowledge Network (CDKN)</strong>,
                            and the <strong style={{ color: "#0f172a", fontWeight: 600 }}>World Resources Institute (WRI)</strong>,
                            with technical support from the{" "}
                            <strong style={{ color: "#0f172a", fontWeight: 600 }}>African Group of Negotiators Expert Support (AGNES)</strong>,
                            and with the strategic engagement of the{" "}
                            <strong style={{ color: "#0f172a", fontWeight: 600 }}>Africa Research and Impact Network (ARIN)</strong>{" "}
                            through its{" "}
                            <strong style={{ color: "#00c4b3", fontWeight: 600 }}>Locally Led Adaptation Metrics for Africa (LAMA) Platform</strong>.
                            Together, this coalition is co-developing a standardised indicators handbook and a digital
                            Monitoring, Evaluation, Reporting, and Learning (MERL) tool. The MERL tool will leverage
                            these indicators to strengthen data collection, analysis, and reporting — ultimately promoting
                            greater transparency, accountability, and &quot;Informed decision-making across Kenya&apos;s climate actions&quot;.
                        </p>

                        {/* Deliverables */}
                        <div style={{ marginBottom: 36 }}>
                            <p style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 11, fontWeight: 700,
                                letterSpacing: "0.1em", textTransform: "uppercase",
                                color: "#94a3b8", marginBottom: 16,
                            }}>
                                Key Deliverables
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {highlights.map((item) => (
                                    <div key={item} style={{
                                        display: "flex", alignItems: "flex-start", gap: 10,
                                        padding: "12px 14px",
                                        background: "#f8fafc",
                                        borderRadius: 10,
                                        border: "1px solid #f1f5f9",
                                    }}>
                                        <CheckCircle2 size={15} style={{ color: "#00c4b3", marginTop: 1, flexShrink: 0 }} />
                                        <span style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 13, color: "#374151", lineHeight: 1.5,
                                        }}>
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTAs */}
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                            <a
                                href="/convening-platforms/lama"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    padding: "12px 24px", borderRadius: 8,
                                    background: "#021d49", color: "white",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600, fontSize: 14,
                                    textDecoration: "none",
                                    boxShadow: "0 1px 3px rgba(2,29,73,0.3), 0 4px 16px rgba(2,29,73,0.15)",
                                    transition: "opacity 0.2s",
                                }}
                            >
                                Explore LAMA Platform <ArrowRight size={15} />
                            </a>
                            <a
                                href="https://cdkn.org/story/measuring-impact-kenyas-innovative-approach-tracking-and-reporting-climate-action-impact/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    padding: "12px 24px", borderRadius: 8,
                                    background: "white",
                                    border: "1.5px solid #e2e8f0",
                                    color: "#0f172a",
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600, fontSize: 14,
                                    textDecoration: "none",
                                }}
                            >
                                Read Full Story on CDKN <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT — partners panel */}
                    <div>
                        {/* Accent bar card */}
                        <div style={{
                            background: "white",
                            borderRadius: 16,
                            border: "1px solid #e2e8f0",
                            overflow: "hidden",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 8px 32px rgba(2,29,73,0.06)",
                        }}>
                            {/* Top accent */}
                            <div style={{
                                height: 4,
                                background: "linear-gradient(90deg, #021d49 0%, #00c4b3 100%)",
                            }} />

                            {/* Card heading */}
                            <div style={{ padding: "20px 24px 16px" }}>
                                <p style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 11, fontWeight: 700,
                                    letterSpacing: "0.12em", textTransform: "uppercase",
                                    color: "#94a3b8", margin: 0,
                                }}>
                                    Initiative Partners
                                </p>
                            </div>

                            {/* Partners list */}
                            <div style={{ padding: "0 0 8px" }}>
                                {partners.map(({ label, full, highlight }) => (
                                    <div key={label} style={{
                                        display: "flex", alignItems: "flex-start", gap: 14,
                                        padding: "13px 24px",
                                        borderLeft: highlight ? "3px solid #00c4b3" : "3px solid transparent",
                                        background: highlight ? "rgba(0,196,179,0.035)" : "transparent",
                                        borderBottom: "1px solid #f8fafc",
                                    }}>
                                        <span style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 10.5, fontWeight: 700,
                                            letterSpacing: "0.04em",
                                            color: highlight ? "#00c4b3" : "#021d49",
                                            minWidth: 62, paddingTop: 2,
                                            textTransform: "uppercase",
                                        }}>
                                            {label}
                                        </span>
                                        <span style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontSize: 13, color: "#64748b",
                                            lineHeight: 1.55,
                                        }}>
                                            {full}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Source footer */}
                            <div style={{
                                padding: "14px 24px",
                                borderTop: "1px solid #f1f5f9",
                                background: "#fafbfc",
                            }}>
                                <p style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 11, color: "#94a3b8",
                                    margin: 0, lineHeight: 1.6,
                                }}>
                                    Source:{" "}
                                    <a
                                        href="https://cdkn.org/story/measuring-impact-kenyas-innovative-approach-tracking-and-reporting-climate-action-impact/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: "#475569", textDecoration: "underline" }}
                                    >
                                        CDKN — Measuring Impact, Kenya 2025
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Stat strip below card */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {[
                                { value: "6", label: "Partner organisations" },
                                { value: "2025", label: "Initiative year" },
                            ].map(({ value, label }) => (
                                <div key={label} style={{
                                    padding: "16px 20px",
                                    background: "#f8fafc",
                                    borderRadius: 12,
                                    border: "1px solid #f1f5f9",
                                    textAlign: "center",
                                }}>
                                    <p style={{
                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        fontSize: 28, fontWeight: 700,
                                        color: "#021d49", margin: "0 0 2px",
                                        lineHeight: 1,
                                    }}>
                                        {value}
                                    </p>
                                    <p style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 11, color: "#94a3b8",
                                        margin: 0, lineHeight: 1.4,
                                    }}>
                                        {label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
