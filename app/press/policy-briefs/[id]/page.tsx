"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, FileText, ArrowLeft, ExternalLink, BookOpen } from "lucide-react";
import { policyBriefsService } from "@/services/policyBriefsService";
import Footer from "@/app/footer/Footer";

interface PolicyBrief {
    id: string;
    _id?: string;
    title: string;
    category?: string;
    image?: string;
    coverImage?: string;
    datePosted?: string;
    excerpt?: string;
    description?: string;
    availableResources?: string[];
}

function getResourceFileName(url: string, index: number): string {
    if (!url) return `Resource ${index + 1}`;
    try {
        const pathname = new URL(url).pathname;
        const raw = pathname.split("/").pop() ?? "";
        const decoded = decodeURIComponent(raw.split("?")[0]);
        return decoded || `Resource ${index + 1}`;
    } catch {
        const raw = url.split("/").pop() ?? "";
        return decodeURIComponent(raw.split("?")[0]) || `Resource ${index + 1}`;
    }
}

function getViewUrl(url: string): string {
    if (!url) return "";
    return url.replace("/upload/fl_attachment/", "/upload/");
}

function isValidUrl(url: unknown): url is string {
    if (typeof url !== "string" || !url.trim()) return false;
    try { new URL(url); return true; } catch { return false; }
}

const PolicyBriefViewPage = () => {
    const params = useParams();
    const id = typeof params === "object" && params !== null && "id" in params
        ? String((params as Record<string, string>).id)
        : "";

    const [brief, setBrief] = useState<PolicyBrief | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBrief = async () => {
            try {
                setLoading(true);
                const data = await policyBriefsService.getById(id);
                setBrief(data);
                setError(null);
            } catch (err: any) {
                setError(err?.message || "Failed to load policy brief");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchBrief();
    }, [id]);

    const resources = (brief?.availableResources ?? []).filter(isValidUrl);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-[#f5f4f0]">

                {/* ── Loading ── */}
                {loading && (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 rounded-full border-2 border-[#021d49] border-t-transparent animate-spin" />
                            <p className="text-sm text-gray-400 tracking-wide">Loading…</p>
                        </div>
                    </div>
                )}

                {/* ── Error ── */}
                {error && (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <p className="text-red-500 text-sm">{error}</p>
                    </div>
                )}

                {/* ── Content ── */}
                {!loading && !error && brief && (
                    <>
                        {/* Hero */}
                        <div className="relative w-full h-[220px] md:h-[300px] overflow-hidden">
                            {(brief.image || brief.coverImage) ? (
                                <img
                                    src={brief.image || brief.coverImage}
                                    alt={brief.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-[#021d49]"
                                    style={{
                                        backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0,rgba(255,255,255,.04) 1px,transparent 0,transparent 50%)",
                                        backgroundSize: "32px 32px",
                                    }}
                                />
                            )}

                            {/* gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                            {/* back button */}
                            <button
                                onClick={() => window.history.back()}
                                className="absolute top-6 left-6 flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" /> Back
                            </button>

                            {/* hero text */}
                            <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-10 max-w-4xl mx-auto">
                                {brief.category && (
                                    <span className="inline-block mb-3 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/80 border border-white/25 rounded-full backdrop-blur-sm">
                                        {brief.category}
                                    </span>
                                )}
                                <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
                                    {brief.title}
                                </h1>
                                {brief.datePosted && (
                                    <div className="flex items-center gap-2 mt-3 text-white/55 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(brief.datePosted).toLocaleDateString(undefined, {
                                            year: "numeric", month: "long", day: "numeric",
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* ── Body ── */}
                        <div className="max-w-3xl mx-auto px-6 md:px-8 py-12">

                            {/* Excerpt / key message callout */}
                            {brief.excerpt && (
                                <div className="flex gap-4 mb-10 p-6 bg-[#021d49] rounded-2xl">
                                    <BookOpen className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                                    <p className="text-white/90 text-base leading-relaxed italic">
                                        {brief.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Description — full justified, like a Word doc */}
                            {brief.description && (
                                <div
                                    className="
                                        text-[15px] leading-8 text-gray-700
                                        [&>p]:text-justify [&>p]:mb-5
                                        [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-[#021d49] [&>h1]:mt-8 [&>h1]:mb-3
                                        [&>h2]:text-xl  [&>h2]:font-bold [&>h2]:text-[#021d49] [&>h2]:mt-7 [&>h2]:mb-3
                                        [&>h3]:text-lg  [&>h3]:font-semibold [&>h3]:text-[#021d49] [&>h3]:mt-6 [&>h3]:mb-2
                                        [&>ul]:list-disc  [&>ul]:pl-6 [&>ul]:mb-5 [&>ul>li]:mb-1.5 [&>ul>li]:text-justify
                                        [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol>li]:mb-1.5 [&>ol>li]:text-justify
                                        [&>blockquote]:border-l-4 [&>blockquote]:border-[#021d49]/30 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-500 [&>blockquote]:my-5
                                        [&>img]:rounded-xl [&>img]:my-6 [&>img]:w-full
                                        [&>strong]:font-semibold [&>strong]:text-gray-900
                                        [&_a]:text-blue-600 [&_a]:underline
                                    "
                                    dangerouslySetInnerHTML={{ __html: brief.description }}
                                />
                            )}

                            {/* ── Resources ── */}
                            {resources.length > 0 && (
                                <section className="mt-12 pt-10 border-t border-gray-300/60">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5">
                                        Available Resources
                                    </p>
                                    <ul className="space-y-3">
                                        {resources.map((url, idx) => {
                                            const filename = getResourceFileName(url, idx);
                                            const viewUrl = getViewUrl(url);
                                            return (
                                                <li key={idx}>
                                                    <a
                                                        href={viewUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group flex items-center gap-4 px-5 py-4 bg-white rounded-xl border border-gray-200 hover:border-[#021d49] hover:shadow-sm transition-all"
                                                    >
                                                        <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-[#021d49]/8 group-hover:bg-[#021d49]/15 transition-colors">
                                                            <FileText className="w-5 h-5 text-[#021d49]" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-gray-800 group-hover:text-[#021d49] truncate transition-colors">
                                                                {filename}
                                                            </p>
                                                            <p className="text-xs text-gray-400 mt-0.5">PDF · Opens in new tab</p>
                                                        </div>
                                                        <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#021d49] transition-colors shrink-0" />
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </section>
                            )}

                            {/* bottom back */}
                            <div className="mt-12 pt-6 border-t border-gray-200">
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#021d49] transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" /> Back to all briefs
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
};

export default PolicyBriefViewPage;