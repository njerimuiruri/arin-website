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
const MAX_ITEMS = 6;

const getDate = (d: any) => new Date(d.datePosted || d.createdAt || d.date || 0).getTime();

const fmt = (d?: string) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

const CATEGORY_META: Record<string, { color: string; label: string; href: string }> = {
    news: { color: "#3b82f6", label: "News Brief", href: "/press/news-briefs" },
    tech: { color: "#021d49", label: "Technical Report", href: "/press/technical-reports" },
    policy: { color: "#f59e0b", label: "Policy Brief", href: "/press/policy-briefs" },
    project: { color: "#10b981", label: "Research Project", href: "/programs/research-projects" },
};

export default function LatestFromArinSection({ techReports, policyBriefs, newsBriefs, researchProjects }: Props) {
    const pooled = [
        ...(Array.isArray(newsBriefs) ? newsBriefs : []).map((d) => ({ ...d, _cat: "news" })),
        ...(Array.isArray(techReports) ? techReports : []).map((d) => ({ ...d, _cat: "tech" })),
        ...(Array.isArray(policyBriefs) ? policyBriefs : []).map((d) => ({ ...d, _cat: "policy" })),
        ...(Array.isArray(researchProjects) ? researchProjects : []).map((d) => ({ ...d, _cat: "project" })),
    ]
        .sort((a, b) => getDate(b) - getDate(a))
        .slice(0, MAX_ITEMS);

    return (
        <section className="w-full py-12 md:py-16 px-6 bg-[#f0f4fa]">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#021d49] mb-3">News &amp; Insights</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Explore the research we support — emerging findings, news, and events shaping sustainable development across Africa.
                        </p>
                    </div>
                    <a href="/press" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#021d49] hover:gap-2.5 transition-all shrink-0">
                        View All <ArrowRight className="w-4 h-4" />
                    </a>
                </div>

                {pooled.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">No news or updates yet — check back soon.</div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pooled.map((doc: any, i) => {
                            const meta = CATEGORY_META[doc._cat];
                            return (
                                <a
                                    key={`${doc._cat}-${doc._id || i}`}
                                    href={`${meta.href}/${doc._id}`}
                                    className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <div className="h-48 w-full overflow-hidden bg-gray-100">
                                        <img
                                            src={doc.coverImage || doc.image || FALLBACK_IMG}
                                            alt={doc.title}
                                            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <span className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: meta.color }}>
                                            {meta.label}
                                        </span>
                                        <h3 className="font-bold text-gray-900 leading-snug line-clamp-2 mb-3">{doc.title}</h3>
                                        <div className="mt-auto flex items-center gap-1.5 text-xs text-gray-400">
                                            <Calendar className="w-3 h-3" /> {fmt(doc.datePosted || doc.createdAt || doc.date)}
                                        </div>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}
