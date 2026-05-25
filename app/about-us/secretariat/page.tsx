"use client";
import React, { useState, useEffect } from "react";
import { X, BookOpen, Users, ArrowUpRight, Briefcase, Mail, Linkedin } from "lucide-react";
import { getTeamMembers } from "@/services/teamsService";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import { API_CONFIG } from '@/lib/apiConfig';

type SecretariatMember = {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    category?: string;
    image?: string;
    bio?: string;
};

const CATEGORY_ORDER = [
    "Leadership",
    "Focal Point",
    "Administration",
    "Researchers",
    "Communication",
    "IT",
    "Finance",
];

const imgSrc = (image?: string) =>
    image
        ? image.startsWith("http")
            ? image
            : `${API_CONFIG.BASE_URL}${image}`
        : "";

const fallback = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=021d49&color=ffffff&size=400`;

/* ─────────────────────────────────────────────
   GLASS TEAM CARD
───────────────────────────────────────────── */
function TeamCard({
    member,
    onClick,
}: {
    member: SecretariatMember;
    onClick: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const name = `${member.firstName} ${member.lastName}`;

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                position: "relative",
                borderRadius: 20,
                overflow: "hidden",
                aspectRatio: "3/4",
                cursor: "pointer",
                boxShadow: hovered
                    ? "0 24px 56px rgba(2,29,73,.22)"
                    : "0 6px 24px rgba(2,29,73,.10)",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "all .35s cubic-bezier(.22,1,.36,1)",
            }}
        >
            {/* Photo */}
            <img
                src={imgSrc(member.image) || fallback(name)}
                alt={name}
                onError={e => {
                    (e.currentTarget as HTMLImageElement).src = fallback(name);
                }}
                style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transform: hovered ? "scale(1.06)" : "scale(1)",
                    transition: "transform .5s ease",
                    display: "block",
                }}
            />

            {/* Gradient overlay */}
            <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(2,8,30,.86) 0%, rgba(2,8,30,.3) 50%, transparent 72%)",
                opacity: hovered ? 1 : 0.88,
                transition: "opacity .35s ease",
            }} />

            {/* Glass nameplate */}
            <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                padding: "0 16px 16px",
                transform: hovered ? "translateY(0)" : "translateY(3px)",
                transition: "transform .35s ease",
            }}>
                <div style={{
                    background: "rgba(255,255,255,.1)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                    border: "1px solid rgba(255,255,255,.18)",
                    borderRadius: 14,
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                }}>
                    {/* Name + role */}
                    <div>
                        <div style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 700, fontSize: ".92rem",
                            color: "white", lineHeight: 1.3,
                            marginBottom: 3,
                            wordBreak: "break-word",
                        }}>
                            {name}
                        </div>
                        <div style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 9.5, color: "rgba(255,255,255,.6)",
                            letterSpacing: ".05em",
                            wordBreak: "break-word",
                        }}>
                            {member.role}
                        </div>
                    </div>
                    {/* Button */}
                    <button style={{
                        alignSelf: "flex-start",
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "6px 12px", borderRadius: 99,
                        background: hovered ? "white" : "rgba(255,255,255,.15)",
                        border: "1px solid rgba(255,255,255,.25)",
                        color: hovered ? "#021d49" : "white",
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600, fontSize: 10.5,
                        cursor: "pointer",
                        transition: "all .25s ease",
                        whiteSpace: "nowrap",
                    }}>
                        View Bio <ArrowUpRight size={11} />
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   BIO MODAL
───────────────────────────────────────────── */
function BioModal({
    member,
    onClose,
}: {
    member: SecretariatMember;
    onClose: () => void;
}) {
    const name = `${member.firstName} ${member.lastName}`;
    const photoSrc = imgSrc(member.image) || fallback(name);

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 1000,
                background: "rgba(2,10,30,.65)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px 16px",
                animation: "tm-fadeIn .2s ease",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: "white",
                    borderRadius: 24,
                    maxWidth: 960, width: "100%",
                    maxHeight: "90vh",
                    boxShadow: "0 40px 120px rgba(2,29,73,.32)",
                    animation: "tm-slideUp .3s cubic-bezier(.22,1,.36,1)",
                    display: "flex",
                    flexDirection: "row",
                    overflow: "hidden",
                }}
            >
                {/* ── Left: portrait photo card ── */}
                <div style={{
                    width: 280,
                    flexShrink: 0,
                    position: "relative",
                    background: "#021d49",
                }}>
                    <img
                        src={photoSrc}
                        alt={name}
                        onError={e => { (e.currentTarget as HTMLImageElement).src = fallback(name); }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                            display: "block",
                        }}
                    />
                    {/* subtle bottom gradient so name is legible if we ever overlay */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(2,8,30,.55) 0%, transparent 50%)",
                        pointerEvents: "none",
                    }} />
                </div>

                {/* ── Right: info + bio ── */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    position: "relative",
                }}>
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: "absolute", top: 14, right: 14, zIndex: 2,
                            width: 36, height: 36, borderRadius: "50%",
                            background: "rgba(2,29,73,.08)",
                            border: "1px solid rgba(2,29,73,.12)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "#021d49",
                        }}
                    >
                        <X size={15} />
                    </button>

                    {/* Header strip */}
                    <div style={{ padding: "28px 28px 20px" }}>
                        {/* Role badge */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "4px 11px", borderRadius: 99,
                            background: "#eff6ff",
                            border: "1px solid rgba(0,196,179,.2)",
                            marginBottom: 10,
                        }}>
                            <Briefcase size={10} style={{ color: "#00c4b3" }} />
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 9.5, color: "#00c4b3",
                                letterSpacing: ".07em", textTransform: "uppercase",
                            }}>
                                {member.role}
                            </span>
                        </div>

                        {/* Name */}
                        <h2 style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontWeight: 700, fontSize: "1.6rem",
                            color: "#021d49", lineHeight: 1.2, margin: "0 0 4px",
                        }}>
                            {name}
                        </h2>

                        {/* Divider */}
                        <div style={{
                            height: 2, marginTop: 16,
                            background: "linear-gradient(to right, #021d49, #00c4b3 40%, transparent)",
                            borderRadius: 2,
                        }} />
                    </div>

                    {/* Bio */}
                    <div style={{ padding: "0 28px 28px", flex: 1 }}>
                        <div style={{
                            background: "#f8faff",
                            borderRadius: 14,
                            padding: "18px 20px",
                            border: "1px solid rgba(2,29,73,.07)",
                        }}>
                            <div style={{
                                display: "flex", alignItems: "center", gap: 9, marginBottom: 12,
                            }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: 9,
                                    background: "#021d49",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                }}>
                                    <BookOpen size={14} style={{ color: "white" }} />
                                </div>
                                <span style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontWeight: 700, fontSize: "1rem", color: "#021d49",
                                }}>
                                    Biography
                                </span>
                            </div>
                            <div
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 13.5, color: "#475569", lineHeight: 1.8,
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: member.bio || '<p style="color:#94a3b8;font-style:italic">No biography available.</p>',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const SecretariatPage = () => {
    const [selectedMember, setSelectedMember] = useState<SecretariatMember | null>(null);
    const [members, setMembers] = useState<SecretariatMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMembers = async () => {
            try {
                const data = await getTeamMembers();
                setMembers(data);
            } catch (error) {
                console.error("Failed to load team members:", error);
            } finally {
                setLoading(false);
            }
        };
        loadMembers();
    }, []);

    /* group + order */
    const grouped: Record<string, SecretariatMember[]> = {};
    members.forEach(m => {
        const cat = m.category?.trim() || "Uncategorized";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(m);
    });
    const orderedKeys = [
        ...CATEGORY_ORDER.filter(c => grouped[c]),
        ...Object.keys(grouped).filter(c => !CATEGORY_ORDER.includes(c) && c !== "Uncategorized"),
        ...(grouped["Uncategorized"] ? ["Uncategorized"] : []),
    ];

    return (
        <>
            <Navbar />

            <div style={{ background: "#f8faff", minHeight: "100vh", paddingBottom: 96 }}>

                {/* ── Page header ── */}
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "36px 40px 0", textAlign: "center" }}>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontFamily: "'Space Mono', monospace",
                        fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase",
                        color: "#021d49", background: "white",
                        border: "1px solid rgba(2,29,73,.15)",
                        borderRadius: 99, padding: "5px 14px", marginBottom: 12,
                    }}>
                        <span style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: "#00c4b3",
                        }} />
                        Our People
                    </div>

                    <h1 style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontWeight: 700, fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                        color: "#021d49", lineHeight: 1.1, marginBottom: 10,
                    }}>
                        Meet the{" "}
                        <em style={{ fontStyle: "italic", color: "#00c4b3" }}>ARIN Team</em>
                    </h1>
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 15, color: "#64748b", lineHeight: 1.8,
                        maxWidth: 520, margin: "0 auto",
                    }}>
                        A diverse, passionate group of researchers, communicators, and administrators driving Africa's research transformation.
                    </p>
                </div>

                {/* ── Loading ── */}
                {loading && (
                    <div style={{ textAlign: "center", padding: "80px 0" }}>
                        <div style={{
                            width: 40, height: 40, borderRadius: "50%",
                            border: "3px solid rgba(2,29,73,.1)",
                            borderTopColor: "#021d49",
                            animation: "tm-spin .8s linear infinite",
                            margin: "0 auto 12px",
                        }} />
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#94a3b8" }}>
                            Loading team members…
                        </p>
                    </div>
                )}

                {/* ── Empty ── */}
                {!loading && members.length === 0 && (
                    <div style={{ textAlign: "center", padding: "80px 0" }}>
                        <Users size={48} style={{ color: "#cbd5e1", margin: "0 auto 12px" }} />
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#94a3b8" }}>
                            No team members found.
                        </p>
                    </div>
                )}

                {/* ── Categories ── */}
                {!loading && members.length > 0 && orderedKeys.map((category, idx) => (
                    <div key={category} style={{ maxWidth: 1200, margin: `${idx === 0 ? "32px" : "52px"} auto 0`, padding: "0 40px" }}>

                        {/* Category heading */}
                        <div style={{ marginBottom: 28 }}>
                            <h2 style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontWeight: 700, fontSize: "1.45rem",
                                color: "#021d49", marginBottom: 10,
                            }}>
                                {category}
                            </h2>
                            <div style={{
                                height: 2,
                                background: "linear-gradient(to right, #021d49, #00c4b3 30%, transparent)",
                                borderRadius: 2,
                            }} />
                        </div>

                        {/* Cards */}
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                            gap: 20,
                        }}>
                            {grouped[category].map(member => (
                                <TeamCard
                                    key={member._id}
                                    member={member}
                                    onClick={() => setSelectedMember(member)}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bio modal */}
            {selectedMember && (
                <BioModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
            <Footer />
        </>
    );
};

export default SecretariatPage;