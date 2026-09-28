"use client";
import React, { useState, useEffect } from "react";
import { X, BookOpen, Users, ArrowRight, Briefcase } from "lucide-react";
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

// Bio is stored as HTML; flatten it to plain text for the short preview on the ED feature
const bioPreview = (bio?: string) =>
    (bio || "")
        .replace(/<[^>]+>/g, " ")
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, " ")
        .trim();

/* ─────────────────────────────────────────────
   TEAM CARD  — simple photo + name + role tile
───────────────────────────────────────────── */
function TeamCard({
    member,
    onClick,
}: {
    member: SecretariatMember;
    onClick: () => void;
}) {
    const name = `${member.firstName} ${member.lastName}`;

    return (
        <button type="button" onClick={onClick} className="sec-card">
            <div className="sec-card-photo">
                <img
                    src={imgSrc(member.image) || fallback(name)}
                    alt={name}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = fallback(name); }}
                />
            </div>
            <div className="sec-card-body">
                <div className="sec-card-name">{name}</div>
                <div className="sec-card-role">{member.role}</div>
                <div className="sec-card-link">
                    View bio <ArrowRight size={13} />
                </div>
            </div>
        </button>
    );
}

/* ─────────────────────────────────────────────
   EXECUTIVE DIRECTOR FEATURE  — large photo beside
   name, role and a bio preview so leadership is the
   first thing visitors see.
───────────────────────────────────────────── */
function LeaderFeature({
    member,
    onClick,
}: {
    member: SecretariatMember;
    onClick: () => void;
}) {
    const name = `${member.firstName} ${member.lastName}`;
    const preview = bioPreview(member.bio);

    return (
        <div className="sec-leader">
            <div className="sec-leader-photo">
                <img
                    src={imgSrc(member.image) || fallback(name)}
                    alt={name}
                    onError={e => { (e.currentTarget as HTMLImageElement).src = fallback(name); }}
                />
            </div>
            <div className="sec-leader-body">
                <div className="sec-eyebrow">Executive Director</div>
                <h2 className="sec-leader-name">{name}</h2>
                <div className="sec-leader-role">{member.role}</div>
                {preview && <p className="sec-leader-bio">{preview}</p>}
                <button type="button" onClick={onClick} className="sec-leader-btn">
                    Read full bio <ArrowRight size={15} />
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
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px 16px",
                animation: "tm-fadeIn .2s ease",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                className="sec-modal"
                style={{
                    background: "white",
                    borderRadius: 16,
                    maxWidth: 900, width: "100%",
                    maxHeight: "88vh",
                    boxShadow: "0 40px 120px rgba(2,29,73,.32)",
                    animation: "tm-slideUp .3s cubic-bezier(.22,1,.36,1)",
                    display: "flex",
                    overflow: "hidden",
                }}
            >
                {/* ── Left: portrait photo, with name/role captioned on the image ── */}
                <div className="sec-modal-photo" style={{
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
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to top, rgba(2,8,30,.9) 0%, rgba(2,8,30,.1) 45%, transparent 65%)",
                        pointerEvents: "none",
                    }} />
                    <div style={{ position: "absolute", left: 22, right: 22, bottom: 22 }}>
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 5,
                            padding: "4px 11px", borderRadius: 99,
                            background: "rgba(0,196,179,.18)",
                            border: "1px solid rgba(0,196,179,.4)",
                            marginBottom: 10,
                        }}>
                            <Briefcase size={10} style={{ color: "#5fe8d8" }} />
                            <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 10, color: "#5fe8d8",
                                letterSpacing: ".06em", textTransform: "uppercase",
                            }}>
                                {member.role}
                            </span>
                        </div>
                        <h2 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700, fontSize: "1.5rem",
                            color: "white", lineHeight: 1.2, margin: 0,
                        }}>
                            {name}
                        </h2>
                    </div>
                </div>

                {/* ── Right: bio ── */}
                <div style={{
                    flex: 1,
                    overflowY: "auto",
                    position: "relative",
                }}>
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        style={{
                            position: "absolute", top: 16, right: 16, zIndex: 2,
                            width: 36, height: 36, borderRadius: "50%",
                            background: "#f1f4f9",
                            border: "1px solid rgba(2,29,73,.1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            cursor: "pointer", color: "#021d49",
                        }}
                    >
                        <X size={15} />
                    </button>

                    <div style={{ padding: "32px 30px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                            <BookOpen size={16} style={{ color: "#00a896" }} />
                            <span style={{
                                fontFamily: "'Playfair Display', Georgia, serif",
                                fontWeight: 700, fontSize: "1.1rem", color: "#021d49",
                            }}>
                                Biography
                            </span>
                        </div>
                        <div
                            style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: 14.5, color: "#475569", lineHeight: 1.8,
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
    const leaders = grouped["Executive Director"] || [];
    const teamKeys = CATEGORY_ORDER.filter(c => c !== "Executive Director" && grouped[c]);

    return (
        <>
            <Navbar />

            <style jsx global>{`
                .sec-wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

                /* ── ED feature ── */
                .sec-leader {
                    display: grid;
                    grid-template-columns: 380px 1fr;
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 10px 40px rgba(2,29,73,.08);
                    border: 1px solid #e6eaf1;
                    animation: tm-slideUp .5s cubic-bezier(.22,1,.36,1) both;
                }
                .sec-leader + .sec-leader { margin-top: 24px; }
                .sec-leader-photo { background: #e8edf5; aspect-ratio: 4 / 5; }
                .sec-leader-photo img {
                    width: 100%; height: 100%; display: block;
                    object-fit: cover; object-position: center top;
                }
                .sec-leader-body {
                    padding: 44px 48px;
                    display: flex; flex-direction: column; justify-content: center;
                }
                .sec-eyebrow {
                    font-family: 'Inter', sans-serif;
                    font-size: 12px; font-weight: 600;
                    letter-spacing: .12em; text-transform: uppercase;
                    color: #00a896; margin-bottom: 12px;
                }
                .sec-leader-name {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-weight: 700; font-size: clamp(1.8rem, 3.2vw, 2.5rem);
                    color: #021d49; line-height: 1.15; margin: 0 0 8px;
                }
                .sec-leader-role {
                    font-family: 'Inter', sans-serif;
                    font-size: 15px; color: #64748b; margin-bottom: 22px;
                }
                .sec-leader-bio {
                    font-family: 'Inter', sans-serif;
                    font-size: 15px; color: #475569; line-height: 1.75;
                    margin: 0 0 28px;
                    display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .sec-leader-btn {
                    align-self: flex-start;
                    display: inline-flex; align-items: center; gap: 8px;
                    padding: 12px 24px; border-radius: 99px; border: none;
                    background: #021d49; color: white; cursor: pointer;
                    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 14px;
                    transition: background .2s ease;
                }
                .sec-leader-btn:hover { background: #00a896; }

                /* ── Section headings ── */
                .sec-section { margin-top: 64px; }
                .sec-section-head {
                    display: flex; align-items: baseline; gap: 10px;
                    padding-bottom: 14px; margin-bottom: 28px;
                    border-bottom: 1px solid #e2e8f0;
                }
                .sec-section-head h2 {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-weight: 700; font-size: 1.5rem; color: #021d49; margin: 0;
                }
                .sec-section-head span {
                    font-family: 'Inter', sans-serif; font-size: 13px; color: #94a3b8;
                }

                /* ── Team grid + cards ── */
                .sec-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }
                .sec-card {
                    display: flex; flex-direction: column;
                    text-align: left; padding: 0; cursor: pointer;
                    background: white; border: 1px solid #e6eaf1;
                    border-radius: 12px; overflow: hidden;
                    transition: transform .25s ease, box-shadow .25s ease;
                    animation: tm-slideUp .45s cubic-bezier(.22,1,.36,1) both;
                }
                .sec-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 16px 36px rgba(2,29,73,.12);
                }
                .sec-card-photo { aspect-ratio: 4 / 5; background: #e8edf5; overflow: hidden; }
                .sec-card-photo img {
                    width: 100%; height: 100%; display: block;
                    object-fit: cover; object-position: center top;
                    transition: transform .4s ease;
                }
                .sec-card:hover .sec-card-photo img { transform: scale(1.04); }
                .sec-card-body { padding: 16px 18px 18px; display: flex; flex-direction: column; flex: 1; }
                .sec-card-name {
                    font-family: 'Playfair Display', Georgia, serif;
                    font-weight: 700; font-size: 1.05rem; color: #021d49;
                    line-height: 1.3; margin-bottom: 4px;
                }
                .sec-card-role {
                    font-family: 'Inter', sans-serif;
                    font-size: 13px; color: #64748b; line-height: 1.45;
                    margin-bottom: 14px;
                }
                .sec-card-link {
                    margin-top: auto;
                    display: inline-flex; align-items: center; gap: 5px;
                    font-family: 'Inter', sans-serif; font-weight: 600; font-size: 13px;
                    color: #00a896;
                }

                /* ── Modal ── */
                .sec-modal { flex-direction: row; }
                .sec-modal-photo { width: 320px; }

                @media (max-width: 1024px) {
                    .sec-grid { grid-template-columns: repeat(3, 1fr); }
                }
                @media (max-width: 820px) {
                    .sec-leader { grid-template-columns: 1fr; }
                    .sec-leader-photo { aspect-ratio: 1 / 1; max-height: 420px; }
                    .sec-leader-body { padding: 28px 24px 32px; }
                    .sec-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
                    .sec-modal { flex-direction: column; overflow-y: auto !important; }
                    .sec-modal-photo { width: 100%; height: 320px; }
                }
                @media (max-width: 420px) {
                    .sec-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <div style={{ background: "#f7f9fc", minHeight: "100vh", paddingBottom: 100 }}>

                {/* ── Header ── */}
                <div style={{ background: "#021d49", padding: "28px 0" }}>
                    <div className="sec-wrap">
                        <h1 style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)",
                            color: "white", lineHeight: 1.2, margin: "0 0 6px",
                        }}>
                            Meet the ARIN Team
                        </h1>
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: 14, color: "rgba(255,255,255,.75)",
                            lineHeight: 1.6, margin: 0,
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

                {!loading && allMembers.length > 0 && (
                    <div className="sec-wrap">

                        {/* ── Executive Director feature ── */}
                        {leaders.length > 0 && (
                            <div style={{ marginTop: 48 }}>
                                {leaders.map(member => (
                                    <LeaderFeature
                                        key={member._id}
                                        member={member}
                                        onClick={() => setSelectedMember(member)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* ── Remaining categories ── */}
                        {teamKeys.map(category => (
                            <section key={category} className="sec-section">
                                <div className="sec-section-head">
                                    <h2>{CATEGORY_LABELS[category] ?? category}</h2>
                                    <span>{grouped[category].length}</span>
                                </div>
                                <div className="sec-grid">
                                    {grouped[category].map(member => (
                                        <TeamCard
                                            key={member._id}
                                            member={member}
                                            onClick={() => setSelectedMember(member)}
                                        />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                )}
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
