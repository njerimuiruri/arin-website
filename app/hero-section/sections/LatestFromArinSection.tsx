"use client";
import { ArrowRight, Calendar } from "lucide-react";
import React from "react";

import { TechnicalReport } from "@/services/technicalReportsService";
import { PolicyBrief } from "@/services/policyBriefsService";

interface NewsBrief {
    _id?: string; title: string;
    image?: string; coverImage?: string; datePosted?: string; createdAt?: string; date?: string;
}
interface ResearchProject {
    _id?: string; title: string; image?: string;
    datePosted?: string; createdAt?: string; date?: string;
}
interface Props {
    techReports: TechnicalReport[];
    policyBriefs: PolicyBrief[];
    newsBriefs: NewsBrief[];
    researchProjects: ResearchProject[];
}

const FALLBACK_IMG = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=90";
const MAX_PER_CAT = 3;

const byDate = (a: any[]) =>
    [...a].sort(
        (x, y) =>
            new Date(y.datePosted || y.createdAt || y.date || 0).getTime() -
            new Date(x.datePosted || x.createdAt || x.date || 0).getTime()
    );

const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

const categories = [
    { color: "#3b82f6", accent: "rgba(59,130,246,0.15)", label: "News Brief", href: "/press/news-briefs" },
    { color: "#021d49", accent: "rgba(2,29,73,0.12)", label: "Technical Report", href: "/press/technical-reports" },
    { color: "#f59e0b", accent: "rgba(245,158,11,0.15)", label: "Policy Brief", href: "/press/policy-briefs" },
    { color: "#10b981", accent: "rgba(16,185,129,0.15)", label: "Research Project", href: "/programs/research-projects" },
];

export default function LatestFromArinSection({ techReports, policyBriefs, newsBriefs, researchProjects }: Props) {
    const catDocs = [
        Array.isArray(newsBriefs) ? byDate(newsBriefs).slice(0, MAX_PER_CAT) : [],
        Array.isArray(techReports) ? byDate(techReports).slice(0, MAX_PER_CAT) : [],
        Array.isArray(policyBriefs) ? byDate(policyBriefs).slice(0, MAX_PER_CAT) : [],
        Array.isArray(researchProjects) ? byDate(researchProjects).slice(0, MAX_PER_CAT) : [],
    ];

    return (
        <section className="arin-section">
                <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 1 }}>

                    {/* ── Section Header ── */}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 40 }}>
                        <div>
                            <p className="section-eyebrow">Fresh from the Network</p>
                            <h2 className="section-heading">
                                Latest from <span>ARIN</span>
                            </h2>
                        </div>
                        <a href="/press" className="view-all-link">
                            View All <ArrowRight size={15} />
                        </a>
                    </div>

                    {/* ── 4-Column Grid ── */}
                    <div className="grid-cols-4">
                        {categories.map(({ color, accent, label, href }, i) => {
                            const docs = catDocs[i];
                            return (
                                <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>

                                    {/* Column header */}
                                    <div className="col-header">
                                        <div className="col-header-left">
                                            <span className="col-dot" style={{ background: color }} />
                                            <span className="col-label">{label}</span>
                                        </div>
                                        <a href={href} className="col-all-link">
                                            All <ArrowRight size={11} />
                                        </a>
                                    </div>

                                    {docs.length === 0 ? (
                                        <div className="empty-state">
                                            <span style={{ fontSize: 28 }}>📭</span>
                                            No {label.toLowerCase()} yet
                                        </div>
                                    ) : (
                                        <>
                                            {/* ── Hero card ── */}
                                            <a href={`${href}/${docs[0]._id}`} className="card-hero">
                                                <img
                                                    src={docs[0].coverImage || docs[0].image || FALLBACK_IMG}
                                                    alt={docs[0].title}
                                                    onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                                                />
                                                <div className="overlay" />
                                                <div className="glass-info">
                                                    <div className="badge" style={{ background: color }}>
                                                        Latest
                                                    </div>
                                                    <div className="hero-title">{docs[0].title}</div>
                                                    <div className="hero-footer">
                                                        <span className="hero-date">
                                                            <Calendar size={10} />
                                                            {fmt(docs[0].datePosted)}
                                                        </span>
                                                        <span className="read-btn">
                                                            Read <ArrowRight size={12} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </a>

                                            {/* ── Compact card 2 ── */}
                                            {docs[1] && (
                                                <a href={`${href}/${docs[1]._id}`} className="card-compact">
                                                    <div className="thumb">
                                                        <img
                                                            src={docs[1].coverImage || docs[1].image || FALLBACK_IMG}
                                                            alt={docs[1].title}
                                                            onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                                                        />
                                                    </div>
                                                    <div className="accent-bar" style={{ background: color }} />
                                                    <div className="info">
                                                        <p className="compact-title">{docs[1].title}</p>
                                                        <div className="compact-footer">
                                                            <span className="compact-date">
                                                                <Calendar size={9} />
                                                                {fmt(docs[1].datePosted)}
                                                            </span>
                                                            <span className="compact-read" style={{ color }}>
                                                                Read <ArrowRight size={11} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            )}

                                            {/* ── Compact card 3 ── */}
                                            {docs[2] && (
                                                <a href={`${href}/${docs[2]._id}`} className="card-compact">
                                                    <div className="thumb">
                                                        <img
                                                            src={docs[2].coverImage || docs[2].image || FALLBACK_IMG}
                                                            alt={docs[2].title}
                                                            onError={e => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                                                        />
                                                    </div>
                                                    <div className="accent-bar" style={{ background: color }} />
                                                    <div className="info">
                                                        <p className="compact-title">{docs[2].title}</p>
                                                        <div className="compact-footer">
                                                            <span className="compact-date">
                                                                <Calendar size={9} />
                                                                {fmt(docs[2].datePosted)}
                                                            </span>
                                                            <span className="compact-read" style={{ color }}>
                                                                Read <ArrowRight size={11} />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            )}
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
    );
}