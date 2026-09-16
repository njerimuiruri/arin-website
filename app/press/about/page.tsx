"use client";
import React, { useState, useRef } from "react";
import {
    ChevronDown, ArrowRight, ArrowUpRight, FileText, ExternalLink,
    Globe2, Users, Megaphone,
    SunMedium, Wind, Building2, Wheat, Pickaxe, Cpu,
    ClipboardList, Scale, Mail, PenTool, Newspaper, BarChart3,
    MessagesSquare, GraduationCap, BookOpen,
} from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const mattersPoints = [
    {
        icon: Globe2,
        color: "#0ea5e9",
        title: "Amplifying African Voices",
        desc: "Challenging dominant assumptions and centring African perspectives in global discourse.",
    },
    {
        icon: Users,
        color: "#22c55e",
        title: "A Springboard for New Voices",
        desc: "Giving emerging and early-career researchers a route to recognition beyond traditional academic publishing.",
    },
    {
        icon: Megaphone,
        color: "#f59e0b",
        title: "Strategic Dissemination",
        desc: "Reaching policymakers, practitioners, and donors through ARIN's networks, partnerships, and social channels.",
    },
];

const thematicAreas = [
    { icon: SunMedium, title: "Sustainable Development", slug: "sustainable-development", color: "#f59e0b" },
    { icon: Wind, title: "Climate Change and Energy", slug: "climate-change-energy", color: "#0ea5e9" },
    { icon: Building2, title: "Cities and Resilience", slug: "cities-resilience", color: "#8b5cf6" },
    { icon: Wheat, title: "Agriculture and Forestry", slug: "agriculture-forestry", color: "#22c55e" },
    { icon: Pickaxe, title: "Mining, Trade and Industry", slug: "mining-trade-industry", color: "#f97316" },
    { icon: Cpu, title: "Technology and Development", slug: "technology-innovation", color: "#3b82f6" },
];

const knowledgeProducts = [
    { letter: "a", icon: ClipboardList, color: "#0ea5e9", title: "Project Research Reports", desc: "Inception reports, mid-term reviews, final evaluations, and community-engaged research documented across the project cycle.", href: "/press/project-research-reports" },
    { letter: "b", icon: FileText, color: "#f59e0b", title: "Policy Briefs", desc: "Concise, action-oriented summaries that translate evidence into practical recommendations for decision-makers.", href: "/press/policy-briefs" },
    { letter: "c", icon: BookOpen, color: "#8b5cf6", title: "Books and Book Chapters", desc: "Curated by ARIN's Board or thematic leads, published via ARIN Press or with partners such as Taylor & Francis.", href: "/press/books" },
    { letter: "d", icon: Scale, color: "#ef4444", title: "Position Papers", desc: "Evidence-based papers presenting ARIN's perspective on emerging or contested issues to shape narratives and debate.", href: "/press/position-papers" },
    { letter: "e", icon: Mail, color: "#22c55e", title: "Newsletters", desc: "Monthly, quarterly, or annual updates highlighting ARIN's activities, opportunities, and thought leadership.", href: "/press/newsletters" },
    { letter: "f", icon: PenTool, color: "#ec4899", title: "Blog Posts", desc: "Informal reflections on fieldwork, researcher experiences, and learning events for wider public audiences.", href: "/press/blog" },
    { letter: "g", icon: Newspaper, color: "#f97316", title: "News Briefs", desc: "Short, digestible updates on key developments and milestones, tailored for web and social media.", href: "/press/news-briefs" },
    { letter: "h", icon: BarChart3, color: "#3b82f6", title: "Technical Reports", desc: "Detailed analytical publications presenting findings, methodologies, and data across ARIN's thematic areas.", href: "/press/technical-reports" },
    { letter: "i", icon: MessagesSquare, color: "#10b981", title: "ARIN Review Briefs", desc: "Distilled insights from the weekly Friday Review Meetings, supporting institutional learning and future work.", href: "/press/review-briefs" },
    { letter: "j", icon: GraduationCap, color: "#6366f1", title: "Manuscripts and Journal Articles", desc: "Peer-reviewed review articles, methodology papers, and thematic studies grounded in African contexts.", href: "/press/journal-articles" },
];

/* ─────────────────────────────────────────
   SHARED CARD
───────────────────────────────────────── */
function ProductCard({ icon: Icon, color, title, desc, href, badge }: {
    icon: React.ElementType; color: string; title: string; desc: string; href: string; badge?: string;
}) {
    const [hovered, setHovered] = useState(false);
    return (
        <a
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "26px 22px 22px",
                borderRadius: 20,
                background: "white",
                border: `1px solid ${hovered ? color + "55" : "rgba(2,29,73,.08)"}`,
                boxShadow: hovered
                    ? `0 20px 48px rgba(2,29,73,.12), 0 0 0 1px ${color}33`
                    : "0 4px 18px rgba(2,29,73,.06)",
                cursor: "pointer",
                textDecoration: "none",
                transform: hovered ? "translateY(-5px)" : "translateY(0)",
                transition: "all .35s cubic-bezier(.34,1.1,.64,1)",
                position: "relative",
                overflow: "hidden",
                height: "100%",
            }}
        >
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: color,
                transform: hovered ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: "transform .4s ease",
            }} />

            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: hovered ? color : "#021d49",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: hovered ? `0 6px 18px ${color}55` : "none",
                    transition: "all .3s ease",
                }}>
                    <Icon style={{ width: 21, height: 21, color: "white" }} />
                </div>
                {badge && (
                    <span style={{
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 11, color: "rgba(2,29,73,.25)",
                    }}>
                        {badge})
                    </span>
                )}
            </div>

            <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 700, fontSize: "1.15rem",
                color: "#021d49", lineHeight: 1.3,
                marginBottom: 8,
            }}>
                {title}
            </div>

            <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 13, color: "#64748b",
                lineHeight: 1.7, flex: 1, marginBottom: 18,
            }}>
                {desc}
            </div>

            <div style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600, fontSize: 12.5,
                color,
            }}>
                Explore
                <ArrowRight style={{
                    width: 14, height: 14,
                    transform: hovered ? "translateX(4px)" : "translateX(0)",
                    transition: "transform .25s ease",
                }} />
            </div>
        </a>
    );
}

/* ─────────────────────────────────────────
   PAGE
───────────────────────────────────────── */
export default function ARINPressAboutPage() {
    const productsRef = useRef<HTMLDivElement>(null);
    const scrollToProducts = () => productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    return (
        <>
            <Navbar />
            <div style={{ background: "#f8faff", minHeight: "100vh" }}>

                {/* ══════════════════════════════════
                    HERO
                ══════════════════════════════════ */}
                <section style={{
                    background: "#ffffff",
                    padding: "22px 40px 32px",
                    position: "relative",
                    overflow: "hidden",
                    borderBottom: "1px solid rgba(2,29,73,.07)",
                }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 47px,rgba(2,29,73,.04) 47px,rgba(2,29,73,.04) 48px),repeating-linear-gradient(90deg,transparent,transparent 47px,rgba(2,29,73,.04) 47px,rgba(2,29,73,.04) 48px)",
                        pointerEvents: "none",
                    }} />

                    <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase",
                            color: "#021d49",
                            background: "#eff6ff",
                            border: "1px solid #bfdbfe",
                            borderRadius: 99, padding: "5px 16px",
                            marginBottom: 16,
                            animation: "fa-fadeUp .6s ease forwards",
                        }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#38bdf8", animation: "fa-pulse 2s ease infinite" }} />
                            Publishing &amp; Knowledge Dissemination
                        </div>

                        <h1 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 700, fontSize: "clamp(2.6rem, 5vw, 4rem)",
                            color: "#021d49", lineHeight: 1.05,
                            marginBottom: 16, maxWidth: 760,
                            animation: "fa-fadeUp .7s .1s ease both",
                        }}>
                            ARIN <em style={{ fontStyle: "italic", color: "#00c4b3" }}>Press</em>
                        </h1>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 15.5, color: "#64748b",
                            lineHeight: 1.8, maxWidth: 620, marginBottom: 18,
                            animation: "fa-fadeUp .7s .2s ease both",
                        }}>
                            The official publishing and knowledge dissemination arm of the Africa Research and Impact Network — amplifying African research voices and reshaping global and regional policy dialogue.
                        </p>

                        <div style={{ marginBottom: 28, animation: "fa-fadeUp .7s .25s ease both" }}>
                            <a
                                href="/documents/ARIN-Press-Write-up-1-1.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600, fontSize: 13,
                                    color: "#021d49",
                                    padding: "10px 18px",
                                    borderRadius: 99,
                                    border: "1px solid rgba(2,29,73,.15)",
                                    textDecoration: "none",
                                    background: "white",
                                    transition: "all .2s ease",
                                }}
                            >
                                <FileText style={{ width: 15, height: 15 }} />
                                Read the ARIN Press brief
                                <ExternalLink style={{ width: 13, height: 13 }} />
                            </a>
                        </div>

                        <div style={{
                            borderRadius: 24,
                            overflow: "hidden",
                            boxShadow: "0 32px 80px rgba(2,29,73,.18)",
                            border: "1px solid rgba(2,29,73,.06)",
                            animation: "fa-fadeUp .8s .3s ease both",
                            maxWidth: 960, margin: "0 auto",
                        }}>
                            <img
                                src="/arinpress.png"
                                alt="ARIN Press publications"
                                style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "cover" }}
                            />
                        </div>

                        <div style={{ textAlign: "center", marginTop: 20 }}>
                            <button
                                onClick={scrollToProducts}
                                style={{
                                    display: "inline-flex", flexDirection: "column",
                                    alignItems: "center", gap: 6,
                                    background: "none", border: "none",
                                    cursor: "pointer",
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase",
                                    color: "rgba(2,29,73,.3)",
                                    animation: "fa-float 2.5s ease infinite",
                                }}
                            >
                                Explore Knowledge Products
                                <ChevronDown style={{ width: 18, height: 18 }} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════
                    ABOUT NARRATIVE
                ══════════════════════════════════ */}
                <section style={{ padding: "48px 40px", background: "white", borderBottom: "1px solid rgba(2,29,73,.07)" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr)", gap: 40 }}>
                        <div style={{ maxWidth: 820 }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 7,
                                fontFamily: "'Space Mono', monospace",
                                fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase",
                                color: "#021d49",
                                background: "#eff6ff", border: "1px solid #bfdbfe",
                                borderRadius: 99, padding: "4px 14px", marginBottom: 14,
                            }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00c4b3" }} />
                                About
                            </div>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                color: "#021d49", lineHeight: 1.15, marginBottom: 18,
                            }}>
                                A Strategic Pillar of ARIN's Vision to <em style={{ fontStyle: "italic", color: "#00c4b3" }}>Decolonise Knowledge Production</em>
                            </h2>
                            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#475569", lineHeight: 1.85 }}>
                                <p style={{ marginBottom: 18 }}>
                                    ARIN Press is committed to amplifying African research voices, reshaping global and regional policy dialogues, and promoting inclusive, evidence-informed responses to the continent's most urgent challenges — including climate change adaptation, sustainability transitions, biodiversity conservation, innovation systems, and development practice.
                                </p>
                                <p>
                                    Through its publications, ARIN Press bridges the gap between research and action by translating knowledge into accessible, policy-relevant formats that inform decision-making, inspire public discourse, and support practitioner learning. It serves as both a platform and a catalyst, curating high-quality, African-led insights and ensuring they are visible, credible, and impactful within and beyond the continent.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════
                    WHY IT MATTERS
                ══════════════════════════════════ */}
                <section style={{ padding: "48px 40px", position: "relative", overflow: "hidden" }}>
                    <div style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 47px,rgba(2,29,73,.03) 47px,rgba(2,29,73,.03) 48px),repeating-linear-gradient(90deg,transparent,transparent 47px,rgba(2,29,73,.03) 47px,rgba(2,29,73,.03) 48px)",
                        pointerEvents: "none",
                    }} />
                    <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase",
                            color: "#021d49",
                            background: "#eff6ff", border: "1px solid #bfdbfe",
                            borderRadius: 99, padding: "4px 14px", marginBottom: 14,
                        }}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00c4b3" }} />
                            Why It Matters
                        </div>
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                            color: "#021d49", lineHeight: 1.15, marginBottom: 18, maxWidth: 760,
                        }}>
                            Africa's Knowledge Deserves a Global Stage
                        </h2>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#475569", lineHeight: 1.85, maxWidth: 760, marginBottom: 28 }}>
                            <p style={{ marginBottom: 18 }}>
                                Africa holds a vast and diverse reservoir of research, lived experiences, and practical knowledge across critical areas such as climate change, biodiversity, and sustainable development. Yet much of this knowledge remains undocumented, inaccessible, or marginalised within mainstream global discourse. ARIN Press seeks to change this narrative.
                            </p>
                            <p style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontStyle: "italic", fontSize: 19, color: "#021d49", lineHeight: 1.6,
                                borderLeft: "3px solid #00c4b3", paddingLeft: 20,
                            }}>
                                Whether you are a researcher, practitioner, or storyteller, ARIN Press offers a unique space to contribute meaningfully to Africa's climate and development dialogue on your terms.
                            </p>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
                            {mattersPoints.map(({ icon: Icon, color, title, desc }) => (
                                <div key={title} style={{
                                    background: "white", borderRadius: 18, padding: "24px 22px",
                                    border: "1px solid rgba(2,29,73,.08)", boxShadow: "0 4px 18px rgba(2,29,73,.05)",
                                }}>
                                    <div style={{
                                        width: 44, height: 44, borderRadius: 12, background: color,
                                        display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
                                    }}>
                                        <Icon style={{ width: 20, height: 20, color: "white" }} />
                                    </div>
                                    <h3 style={{
                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        fontWeight: 700, fontSize: "1.1rem", color: "#021d49", marginBottom: 8,
                                    }}>
                                        {title}
                                    </h3>
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#64748b", lineHeight: 1.7 }}>
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════
                    THEMATIC AREAS
                ══════════════════════════════════ */}
                <section style={{ padding: "48px 40px", background: "white", borderTop: "1px solid rgba(2,29,73,.07)", borderBottom: "1px solid rgba(2,29,73,.07)" }}>
                    <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                        <div style={{ marginBottom: 24, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                            <div>
                                <div style={{
                                    display: "inline-flex", alignItems: "center", gap: 7,
                                    fontFamily: "'Space Mono', monospace",
                                    fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase",
                                    color: "#021d49",
                                    background: "#eff6ff", border: "1px solid #bfdbfe",
                                    borderRadius: 99, padding: "4px 14px", marginBottom: 14,
                                }}>
                                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00c4b3" }} />
                                    Thematic Focus
                                </div>
                                <h2 style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                    color: "#021d49", lineHeight: 1.1, margin: 0,
                                }}>
                                    Where Our Publications Are <em style={{ fontStyle: "italic", color: "#00c4b3" }}>Rooted</em>
                                </h2>
                            </div>
                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#94a3b8", maxWidth: 340, lineHeight: 1.7, margin: 0 }}>
                                ARIN Press content spans six themes central to Africa's development frontier.
                            </p>
                        </div>

                        <div className="ap-theme-grid">
                            {thematicAreas.map(({ icon: Icon, title, slug, color }) => (
                                <a
                                    key={slug}
                                    href={`/about-us/focus-areas/${slug}`}
                                    className="ap-theme-chip"
                                    style={{ ["--chip-color" as any]: color }}
                                >
                                    <div className="ap-theme-ico" style={{ background: `${color}18` }}>
                                        <Icon style={{ width: 18, height: 18, color }} />
                                    </div>
                                    <span className="ap-theme-name">{title}</span>
                                    <ArrowUpRight className="ap-theme-arrow" style={{ width: 14, height: 14, color: "#cbd5e1" }} />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════
                    CORE KNOWLEDGE PRODUCTS
                ══════════════════════════════════ */}
                <div ref={productsRef} style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 40px 8px" }}>
                    <div style={{ marginBottom: 28, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                        <div>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: 7,
                                fontFamily: "'Space Mono', monospace",
                                fontSize: 9.5, letterSpacing: ".14em", textTransform: "uppercase",
                                color: "#021d49",
                                background: "#eff6ff", border: "1px solid #bfdbfe",
                                borderRadius: 99, padding: "4px 14px", marginBottom: 14,
                            }}>
                                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00c4b3" }} />
                                a &mdash; j &nbsp;·&nbsp; Publication Types
                            </div>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 700, fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                                color: "#021d49", lineHeight: 1.1, margin: 0,
                            }}>
                                Core ARIN Knowledge <em style={{ fontStyle: "italic", color: "#00c4b3" }}>Products</em>
                            </h2>
                        </div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#94a3b8", maxWidth: 360, lineHeight: 1.7, margin: 0 }}>
                            The key knowledge outputs ARIN produces to reach stakeholders and the wider public. Select one to explore it further.
                        </p>
                    </div>

                    <div className="ap-products-grid">
                        {knowledgeProducts.map((p) => (
                            <ProductCard key={p.letter} icon={p.icon} color={p.color} title={p.title} desc={p.desc} href={p.href} badge={p.letter} />
                        ))}
                    </div>
                </div>

                {/* ══════════════════════════════════
                    CTA BANNER
                ══════════════════════════════════ */}
                <div style={{ padding: "24px 40px 56px" }}>
                    <div style={{
                        maxWidth: 1160, margin: "0 auto",
                        background: "#021d49",
                        borderRadius: 20,
                        padding: "28px 40px",
                        display: "flex", alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap", gap: 20,
                        position: "relative", overflow: "hidden",
                    }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: "repeating-linear-gradient(90deg,transparent,transparent 79px,rgba(255,255,255,.03) 79px,rgba(255,255,255,.03) 80px)",
                            pointerEvents: "none",
                        }} />
                        <p style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 600, fontSize: "1.3rem",
                            color: "white", margin: 0, position: "relative", maxWidth: 560,
                        }}>
                            Have research, insights, or a story worth sharing? Publish with ARIN Press.
                        </p>
                        <a href="/contact" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "11px 24px", borderRadius: 99,
                            background: "white", color: "#021d49",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700, fontSize: 13,
                            textDecoration: "none",
                            whiteSpace: "nowrap",
                            position: "relative",
                            transition: "background .2s",
                        }}>
                            Get in Touch <ArrowUpRight style={{ width: 14, height: 14 }} />
                        </a>
                    </div>
                </div>
            </div>
            <Footer />

            <style jsx>{`
                .ap-theme-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 12px;
                }
                @media (max-width: 900px) {
                    .ap-theme-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 560px) {
                    .ap-theme-grid { grid-template-columns: 1fr; }
                }
                .ap-theme-chip {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 16px;
                    border-radius: 14px;
                    border: 1px solid rgba(2, 29, 73, 0.08);
                    background: #fafcff;
                    text-decoration: none;
                    transition: all 0.25s cubic-bezier(0.34, 1.1, 0.64, 1);
                }
                .ap-theme-chip:hover {
                    border-color: var(--chip-color, #021d49);
                    box-shadow: 0 10px 24px rgba(2, 29, 73, 0.08);
                    transform: translateY(-2px);
                    background: white;
                }
                .ap-theme-ico {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .ap-theme-name {
                    font-family: 'Inter', sans-serif;
                    font-size: 13.5px;
                    font-weight: 600;
                    color: #021d49;
                    flex: 1;
                }
                .ap-theme-arrow {
                    flex-shrink: 0;
                    transition: transform 0.25s ease, color 0.25s ease;
                }
                .ap-theme-chip:hover .ap-theme-arrow {
                    transform: translate(2px, -2px);
                    color: var(--chip-color, #021d49) !important;
                }
                .ap-products-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }
                @media (max-width: 900px) {
                    .ap-products-grid { grid-template-columns: repeat(2, 1fr); }
                }
                @media (max-width: 560px) {
                    .ap-products-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </>
    );
}
