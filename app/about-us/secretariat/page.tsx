"use client";
import React, { useState, useEffect } from "react";
import { X, BookOpen, Users, ArrowUpRight, Briefcase, Star } from "lucide-react";
import { getTeamMembers } from "@/services/teamsService";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import { API_CONFIG } from '@/lib/apiConfig';
import { minigrantFellows } from "@/data/minigrant-fellows";

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
    "Executive Director",
    "Focal Points",
    "Secretariat",
    "Fellows",
];

const CATEGORY_LABELS: Record<string, string> = {
    "Executive Director": "Executive Director",
    "Focal Points": "Regional Focal Points",
    "Secretariat": "Secretariat Staff",
    "Fellows": "Fellows",
};

// Map old DB category names → new canonical names so existing data displays correctly
const CATEGORY_ALIASES: Record<string, string> = {
    "Leadership": "Executive Director",
    "Focal Point": "Focal Points",
    "Administration": "Secretariat",
    "Researchers": "Secretariat",
    "Communication": "Secretariat",
    "IT": "Secretariat",
    "Finance": "Secretariat",
};

const normaliseCategory = (raw?: string): string => {
    const trimmed = raw?.trim() || "";
    return CATEGORY_ALIASES[trimmed] ?? trimmed;
};

const imgSrc = (image?: string) =>
    image
        ? image.startsWith("http")
            ? image                              // absolute URL  use as-is
            : image.startsWith("/img/")
                ? image                          // local public folder  use as-is
                : `${API_CONFIG.BASE_URL}${image}` // backend upload path  prepend API base
        : "";

const fallback = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=021d49&color=ffffff&size=400`;

/* ─────────────────────────────────────────────
   TEAM CARD  — bigger, fixed proportions so every
   card in the grid reads as the same size, regardless
   of name length or role length.
───────────────────────────────────────────── */
function TeamCard({
    member,
    index,
    onClick,
}: {
    member: SecretariatMember;
    index: number;
    onClick: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const name = `${member.firstName} ${member.lastName}`;

    return (
        <div style={{ position: "relative", width: "100%", maxWidth: 330, height: "100%" }}>
            {/* Slight decorative "peek" card behind — a small brand-gradient edge
                shows past the corner, a light art touch without being loud. */}
            <div style={{
                position: "absolute",
                inset: 0,
                borderRadius: 22,
                background: "linear-gradient(135deg, #021d49, #00c4b3)",
                transform: hovered ? "translate(9px, 9px)" : "translate(6px, 6px)",
                transition: "transform .32s cubic-bezier(.22,1,.36,1)",
            }} />

            <div
                onClick={onClick}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    position: "relative",
                    zIndex: 1,
                    width: "100%",
                    height: "100%",
                    borderRadius: 22,
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "white",
                    boxShadow: hovered
                        ? "0 26px 56px rgba(2,29,73,.18), 0 0 0 1px rgba(0,196,179,.28)"
                        : "0 4px 20px rgba(2,29,73,.08), 0 0 0 1px rgba(2,29,73,.06)",
                    transform: hovered ? "translateY(-7px)" : "translateY(0)",
                    transition: "all .32s cubic-bezier(.22,1,.36,1)",
                    display: "flex",
                    flexDirection: "column",
                    animation: "tm-slideUp .5s cubic-bezier(.22,1,.36,1) both",
                    animationDelay: `${Math.min(index, 8) * 0.06}s`,
                }}
            >
                {/* Photo — fixed portrait ratio so every card matches, and bigger than before */}
                <div style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "4 / 5",
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#e8edf5",
                }}>
                    <img
                        src={imgSrc(member.image) || fallback(name)}
                        alt={name}
                        onError={e => {
                            (e.currentTarget as HTMLImageElement).src = fallback(name);
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center top",
                            transform: hovered ? "scale(1.05)" : "scale(1)",
                            transition: "transform .5s ease",
                            display: "block",
                        }}
                    />
                    {/* soft bottom fade so the info panel feels connected to the photo */}
                    <div style={{
                        position: "absolute", left: 0, right: 0, bottom: 0, height: 56,
                        background: "linear-gradient(to top, rgba(2,10,30,.2), transparent)",
                        pointerEvents: "none",
                    }} />
                </div>

                {/* Info strip — fixed heights so name/role blocks line up card to card */}
                <div style={{
                    position: "relative",
                    padding: "22px 24px 24px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}>
                    {/* faint corner dot-grid, echoing the page's decorative art */}
                    <div style={{
                        position: "absolute", top: 16, right: 18,
                        width: 26, height: 26,
                        backgroundImage: "radial-gradient(rgba(2,29,73,.16) 1.2px, transparent 1.2px)",
                        backgroundSize: "7px 7px",
                        pointerEvents: "none",
                    }} />

                    <div style={{
                        height: 3,
                        width: hovered ? "100%" : 40,
                        background: "linear-gradient(to right, #021d49, #00c4b3)",
                        borderRadius: 2,
                        marginBottom: 14,
                        transition: "width .35s ease",
                    }} />

                    <div style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 700,
                    fontSize: "1.22rem",
                    color: "#021d49",
                    lineHeight: 1.3,
                    minHeight: "2.6em",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    marginBottom: 10,
                }}>
                    {name}
                </div>

                <div style={{
                    display: "inline-flex",
                    alignSelf: "flex-start",
                    alignItems: "center",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#00a896",
                    background: "rgba(0,196,179,.1)",
                    letterSpacing: ".05em",
                    textTransform: "uppercase",
                    padding: "5px 12px",
                    borderRadius: 99,
                    marginBottom: 20,
                    minHeight: "1.4em",
                    lineHeight: 1.4,
                }}>
                    {member.role}
                </div>

                <button style={{
                    marginTop: "auto",
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "9px 18px",
                    borderRadius: 99,
                    background: hovered ? "#021d49" : "transparent",
                    border: "1.5px solid rgba(2,29,73,.2)",
                    color: hovered ? "white" : "#021d49",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 12,
                    cursor: "pointer",
                    transition: "all .25s ease",
                    whiteSpace: "nowrap",
                }}>
                    View Bio <ArrowUpRight size={12} />
                </button>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   LEADER SPOTLIGHT CARD  — reserved for the
   Executive Director category: bigger, centred,
   circular portrait treatment so leadership reads
   as a deliberate spotlight rather than just
   another grid tile.
───────────────────────────────────────────── */
function LeaderCard({
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
                width: "100%",
                maxWidth: 460,
                cursor: "pointer",
                background: "white",
                borderRadius: 28,
                padding: "40px 40px 32px",
                textAlign: "center",
                boxShadow: hovered
                    ? "0 30px 70px rgba(2,29,73,.2), 0 0 0 1px rgba(0,196,179,.3)"
                    : "0 10px 40px rgba(2,29,73,.1), 0 0 0 1px rgba(2,29,73,.06)",
                transform: hovered ? "translateY(-6px)" : "translateY(0)",
                transition: "all .35s cubic-bezier(.22,1,.36,1)",
                animation: "tm-slideUp .55s cubic-bezier(.22,1,.36,1) both",
            }}
        >
            {/* Star badge */}
            <div style={{
                position: "absolute", top: 22, right: 22,
                width: 30, height: 30, borderRadius: "50%",
                background: "rgba(0,196,179,.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <Star size={13} style={{ color: "#00a896" }} fill="#00a896" />
            </div>

            {/* Circular portrait with gradient ring */}
            <div style={{
                width: 168, height: 168, margin: "0 auto 20px",
                borderRadius: "50%",
                padding: 5,
                background: "linear-gradient(135deg, #021d49, #00c4b3)",
            }}>
                <div style={{
                    width: "100%", height: "100%", borderRadius: "50%",
                    overflow: "hidden", background: "#e8edf5",
                    border: "4px solid white",
                }}>
                    <img
                        src={imgSrc(member.image) || fallback(name)}
                        alt={name}
                        onError={e => { (e.currentTarget as HTMLImageElement).src = fallback(name); }}
                        style={{
                            width: "100%", height: "100%",
                            objectFit: "cover", objectPosition: "center top",
                            transform: hovered ? "scale(1.06)" : "scale(1)",
                            transition: "transform .5s ease",
                            display: "block",
                        }}
                    />
                </div>
            </div>

            <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700, fontSize: "1.5rem",
                color: "#021d49", lineHeight: 1.25, marginBottom: 10,
            }}>
                {name}
            </div>

            <div style={{
                display: "inline-flex", alignItems: "center",
                fontFamily: "'Inter', sans-serif",
                fontSize: 11.5, fontWeight: 600,
                color: "#00a896", background: "rgba(0,196,179,.1)",
                letterSpacing: ".06em", textTransform: "uppercase",
                padding: "6px 16px", borderRadius: 99, marginBottom: 22,
            }}>
                {member.role}
            </div>

            <div>
                <button style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "10px 22px",
                    borderRadius: 99,
                    background: hovered ? "#021d49" : "rgba(2,29,73,.06)",
                    border: "1.5px solid rgba(2,29,73,.2)",
                    color: hovered ? "white" : "#021d49",
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: 12.5,
                    cursor: "pointer",
                    transition: "all .25s ease",
                    whiteSpace: "nowrap",
                }}>
                    View Bio <ArrowUpRight size={13} />
                </button>
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
                    borderRadius: 26,
                    maxWidth: 920, width: "100%",
                    maxHeight: "88vh",
                    boxShadow: "0 40px 120px rgba(2,29,73,.32)",
                    animation: "tm-slideUp .3s cubic-bezier(.22,1,.36,1)",
                    display: "flex",
                    flexDirection: "row",
                    overflow: "hidden",
                }}
            >
                {/* ── Left: portrait photo, with name/role captioned on the image ── */}
                <div style={{
                    width: 320,
                    flexShrink: 0,
                    position: "relative",
                    background: "#021d49",
                    overflow: "hidden",
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
                    {/* legibility gradient behind the caption */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(2,8,30,.92) 0%, rgba(2,8,30,.15) 42%, transparent 62%)",
                        pointerEvents: "none",
                    }} />
                    {/* faint dot-grid, matching the page's decorative language */}
                    <div style={{
                        position: "absolute", top: 20, left: 20,
                        width: 70, height: 70,
                        backgroundImage: "radial-gradient(rgba(255,255,255,.35) 1.5px, transparent 1.5px)",
                        backgroundSize: "12px 12px",
                        pointerEvents: "none",
                    }} />
                    {/* Caption */}
                    <div style={{ position: "absolute", left: 24, right: 24, bottom: 26 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "4px 11px", borderRadius: 99,
                            background: "rgba(0,196,179,.18)",
                            border: "1px solid rgba(0,196,179,.4)",
                            marginBottom: 12,
                        }}>
                            <Briefcase size={10} style={{ color: "#5fe8d8" }} />
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 9.5, color: "#5fe8d8",
                                letterSpacing: ".07em", textTransform: "uppercase",
                            }}>
                                {member.role}
                            </span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700, fontSize: "1.55rem",
                            color: "white", lineHeight: 1.2, margin: 0,
                        }}>
                            {name}
                        </h2>
                    </div>
                </div>

                {/* ── Right: bio ── */}
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
                            position: "absolute", top: 18, right: 18, zIndex: 2,
                            width: 36, height: 36, borderRadius: "50%",
                            background: "rgba(2,29,73,.06)",
                            border: "1px solid rgba(2,29,73,.12)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "#021d49",
                            transition: "background .2s ease",
                        }}
                    >
                        <X size={15} />
                    </button>

                    {/* Bio */}
                    <div style={{ padding: "34px 32px 32px", flex: 1 }}>
                        <div style={{
                            display: "flex", alignItems: "center", gap: 9, marginBottom: 16,
                        }}>
                            <BookOpen size={16} style={{ color: "#00c4b3" }} />
                            <span style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontWeight: 700, fontSize: "1.1rem", color: "#021d49",
                            }}>
                                Biography
                            </span>
                        </div>
                        <div style={{
                            height: 2, width: 40, marginBottom: 20,
                            background: "linear-gradient(to right, #021d49, #00c4b3)",
                            borderRadius: 2,
                        }} />
                        <div
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 14, color: "#475569", lineHeight: 1.85,
                            }}
                            dangerouslySetInnerHTML={{
                                __html: member.bio || '<p style="color:#94a3b8;font-style:italic">No biography available.</p>',
                            }}
                        />
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

    /* merge DB members with static mini-grant fellows */
    const allMembers: SecretariatMember[] = [
        ...members,
        ...(minigrantFellows as SecretariatMember[]),
    ];

    /* group by category, normalising old DB values to new names */
    const grouped: Record<string, SecretariatMember[]> = {};
    allMembers.forEach(m => {
        const cat = normaliseCategory(m.category) || "Uncategorized";
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(m);
    });
    const orderedKeys = CATEGORY_ORDER.filter(c => grouped[c]);

    return (
        <>
            <Navbar />

            <div style={{
                background: "#f8faff",
                backgroundImage: "radial-gradient(rgba(2,29,73,.06) 1px, transparent 1px)",
                backgroundSize: "26px 26px",
                minHeight: "100vh",
                paddingBottom: 100,
            }}>

                {/* ── Hero header ── */}
                <div style={{
                    background: "linear-gradient(135deg, #021d49 0%, #043166 100%)",
                    padding: "60px 40px 68px",
                    position: "relative",
                    overflow: "hidden",
                }}>
                    {/* decorative glow */}
                    <div style={{
                        position: "absolute", top: -80, right: -60,
                        width: 320, height: 320, borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(0,196,179,.22) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }} />
                    {/* decorative ring + dot-grid, echoing the homepage hero's art */}
                    <div style={{
                        position: "absolute", top: -60, right: 40,
                        width: 220, height: 220, borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,.12)",
                        pointerEvents: "none",
                    }} className="hidden md:block" />
                    <div style={{
                        position: "absolute", bottom: 18, right: 90,
                        width: 96, height: 96,
                        backgroundImage: "radial-gradient(rgba(255,255,255,.3) 1.5px, transparent 1.5px)",
                        backgroundSize: "14px 14px",
                        pointerEvents: "none",
                    }} className="hidden lg:block" />
                    <div style={{
                        position: "absolute", top: 30, left: "42%",
                        width: 10, height: 10, borderRadius: "50%",
                        background: "rgba(0,196,179,.5)",
                        pointerEvents: "none",
                    }} className="hidden lg:block" />
                    <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            fontFamily: "'Space Mono', monospace",
                            fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase",
                            color: "#e0f7f4", background: "rgba(255,255,255,.08)",
                            border: "1px solid rgba(255,255,255,.18)",
                            borderRadius: 99, padding: "5px 14px", marginBottom: 18,
                        }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c4b3" }} />
                            Our People
                        </div>
                        <h1 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700, fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
                            color: "white", lineHeight: 1.15, margin: "0 0 12px",
                            maxWidth: 640,
                        }}>
                            Meet the <em style={{ fontStyle: "italic", color: "#00c4b3" }}>ARIN Team</em>
                        </h1>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 14.5, color: "rgba(255,255,255,.72)",
                            lineHeight: 1.7, maxWidth: 560, margin: 0,
                        }}>
                            The leadership, staff, and fellows driving ARIN&apos;s mission across the continent.
                        </p>
                    </div>
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
                {!loading && allMembers.length === 0 && (
                    <div style={{ textAlign: "center", padding: "80px 0" }}>
                        <Users size={48} style={{ color: "#cbd5e1", margin: "0 auto 12px" }} />
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#94a3b8" }}>
                            No team members found.
                        </p>
                    </div>
                )}

                {/* ── Categories ── */}
                {!loading && allMembers.length > 0 && orderedKeys.map((category, idx) => {
                    const isLeadership = category === "Executive Director";
                    return (
                        <div key={category} style={{ maxWidth: 1200, margin: `${idx === 0 ? "48px" : "56px"} auto 0`, padding: "0 40px", position: "relative", overflow: isLeadership ? "hidden" : "visible" }}>

                            {/* Decorative art tucked behind the leadership spotlight */}
                            {isLeadership && (
                                <>
                                    <div style={{
                                        position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
                                        width: 520, height: 320, borderRadius: "50%",
                                        background: "radial-gradient(ellipse, rgba(0,196,179,.14) 0%, transparent 70%)",
                                        pointerEvents: "none",
                                    }} />
                                    <div style={{
                                        position: "absolute", top: 30, right: "8%",
                                        width: 90, height: 90,
                                        backgroundImage: "radial-gradient(rgba(2,29,73,.14) 1.5px, transparent 1.5px)",
                                        backgroundSize: "13px 13px",
                                        pointerEvents: "none",
                                    }} className="hidden md:block" />
                                    <div style={{
                                        position: "absolute", bottom: 10, left: "6%",
                                        width: 130, height: 130, borderRadius: "50%",
                                        border: "1px solid rgba(2,29,73,.1)",
                                        pointerEvents: "none",
                                    }} className="hidden md:block" />
                                </>
                            )}

                            {/* Category heading */}
                            <div style={{
                                display: "flex", alignItems: "center", gap: 12,
                                marginBottom: 28,
                                justifyContent: isLeadership ? "center" : "flex-start",
                                position: "relative",
                            }}>
                                <h2 style={{
                                    fontFamily: "'Playfair Display', Georgia, serif",
                                    fontWeight: 700, fontSize: "1.3rem",
                                    color: "#021d49", margin: 0, whiteSpace: "nowrap",
                                }}>
                                    {CATEGORY_LABELS[category] ?? category}
                                </h2>
                                <span style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: 11, fontWeight: 600, color: "#00a896",
                                    background: "rgba(0,196,179,.1)",
                                    borderRadius: 99, padding: "3px 10px", flexShrink: 0,
                                }}>
                                    {grouped[category].length}
                                </span>
                                {!isLeadership && (
                                    <div style={{
                                        height: 1, flex: 1,
                                        background: "linear-gradient(to right, rgba(2,29,73,.18), transparent)",
                                    }} />
                                )}
                            </div>

                            {isLeadership ? (
                                /* Leadership gets a centred spotlight treatment instead of a grid tile */
                                <div style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: 32,
                                    position: "relative",
                                }}>
                                    {grouped[category].map(member => (
                                        <LeaderCard
                                            key={member._id}
                                            member={member}
                                            onClick={() => setSelectedMember(member)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                /* Cards — auto-fit + centred justify keeps cards at their full
                                   intended size and centres any partial last row instead of
                                   letting it hang ragged to the left */
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(270px, 330px))",
                                    justifyContent: "center",
                                    gap: 30,
                                }}>
                                    {grouped[category].map((member, i) => (
                                        <TeamCard
                                            key={member._id}
                                            member={member}
                                            index={i}
                                            onClick={() => setSelectedMember(member)}
                                        />
                                    ))}
                                </div>
                            )}

                        </div>
                    );
                })}
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
