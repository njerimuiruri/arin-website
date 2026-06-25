"use client";
import { ArrowUpRight } from "lucide-react";

/**
 * CAPCHACallsOverlay
 * ─────────────────────────────────────────────────────────────────────────────
 * Clean, minimal calls strip overlaid inside the HeroSection.
 * Uses a solid dark backdrop behind the text so it reads over any image.
 *
 * PLACEMENT in HeroSection.tsx  add just before the closing </div> of the
 * "── MAIN CONTENT" block, right above the BOTTOM ROW div:
 *
 *   <CAPCHACallsOverlay />
 *
 *   {/* ── BOTTOM ROW: theme thumbs + nav ── *\/}
 *   <div className="flex flex-col sm:flex-row ...">
 * ─────────────────────────────────────────────────────────────────────────────
 */

const calls = [
    {
        status: "Deadline Passed",
        color: "#9ca3af",
        title: "Spotlight Series 2026",
        sub: "Presenters & Moderators",
        cta: "Closed",
        href: null,
        disabled: true,
    },
    {
        status: "Registration Open",
        color: "#fbbf24",
        title: "CAPCHA Connect",
        sub: "Pan-African Platform",
        cta: "Register",
        href: "https://ee.kobotoolbox.org/single/81f9beab8ea9a72662b5c429f732f7f3",
        disabled: false,
    },
    {
        status: "Deadline Extended  25 Apr",
        color: "#c084fc",
        title: "Learning Curve",
        sub: "Climate-Health Programme",
        cta: "Enrol",
        href: "https://ee.kobotoolbox.org/single/5b3703edf1a128aa20c66dff2fadd84f",
        disabled: false,
    },
];

export default function CAPCHACallsOverlay() {
    return (
        <div
            className="pointer-events-auto w-full mb-6"
            style={{ zIndex: 15 }}
        >
            {/* Solid dark pill container  guaranteed readable over any image */}
            <div style={{
                display: "inline-flex",
                alignItems: "stretch",
                background: "rgba(2, 15, 40, 0.88)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                overflow: "hidden",
                width: "100%",
            }}>

                {/* Left label */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "12px 18px",
                    borderRight: "1px solid rgba(255,255,255,0.08)",
                    flexShrink: 0,
                    gap: 4,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: "#00c4b3",
                            display: "inline-block",
                            animation: "co-pulse 1.6s ease-in-out infinite",
                        }} />
                        <span style={{
                            fontSize: "0.58rem",
                            fontFamily: "'DM Mono', 'Courier New', monospace",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            color: "#00c4b3",
                            fontWeight: 600,
                        }}>
                            CAPCHA
                        </span>
                    </div>
                    <span style={{
                        fontSize: "0.6rem",
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(255,255,255,0.35)",
                        whiteSpace: "nowrap",
                    }}>
                        2 Open Calls
                    </span>
                </div>

                {/* Call items */}
                {calls.map((c, i) => {
                    if (c.disabled) return (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 12,
                                padding: "12px 16px",
                                borderRight: i < calls.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                                opacity: 0.5,
                                cursor: "not-allowed",
                            }}
                        >
                            <div style={{ minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.color, display: "inline-block", flexShrink: 0 }} />
                                    <span style={{ fontSize: "0.58rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: c.color, fontWeight: 600 }}>
                                        {c.status}
                                    </span>
                                </div>
                                <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'DM Sans', sans-serif" }}>
                                    {c.title}
                                </p>
                                <p style={{ margin: "2px 0 0", fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'DM Sans', sans-serif" }}>
                                    {c.sub}
                                </p>
                            </div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "5px 12px", borderRadius: 99, border: `1px solid ${c.color}`, color: c.color, fontSize: "0.68rem", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", flexShrink: 0, letterSpacing: "0.02em" }}>
                                {c.cta}
                            </div>
                        </div>
                    );
                    return (
                        <a
                            key={i}
                            href={c.href!}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                flex: 1,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 12,
                                padding: "12px 16px",
                                borderRight: i < calls.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                                textDecoration: "none",
                                transition: "background 0.18s",
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                        >
                            <div style={{ minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.color, display: "inline-block", flexShrink: 0, animation: `co-pulse 1.6s ${i * 0.25}s ease-in-out infinite` }} />
                                    <span style={{ fontSize: "0.58rem", fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em", textTransform: "uppercase", color: c.color, fontWeight: 600 }}>
                                        {c.status}
                                    </span>
                                </div>
                                <p style={{ margin: 0, fontSize: "0.82rem", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'DM Sans', sans-serif" }}>
                                    {c.title}
                                </p>
                                <p style={{ margin: "2px 0 0", fontSize: "0.65rem", color: "rgba(255,255,255,0.45)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'DM Sans', sans-serif" }}>
                                    {c.sub}
                                </p>
                            </div>
                            <div style={{ display: "inline-flex", alignItems: "center", gap: 3, padding: "5px 12px", borderRadius: 99, border: `1px solid ${c.color}`, color: c.color, fontSize: "0.68rem", fontWeight: 700, fontFamily: "'DM Sans', sans-serif", whiteSpace: "nowrap", flexShrink: 0, letterSpacing: "0.02em" }}>
                                {c.cta}
                                <ArrowUpRight style={{ width: 11, height: 11 }} />
                            </div>
                        </a>
                    );
                })}
            </div>

            <style>{`
        @keyframes co-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
      `}</style>
        </div>
    );
}