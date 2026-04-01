"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, FileText, ArrowLeft, ExternalLink, BookOpen, ZoomIn, X, Eye, Download } from "lucide-react";
import { policyBriefsService } from "@/services/policyBriefsService";
import Footer from "@/app/footer/Footer";

interface PolicyBrief {
    id?: string;
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
        ? String((params as Record<string, string>).id) : "";

    const [brief, setBrief] = useState<PolicyBrief | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        policyBriefsService.getById(id)
            .then((data: PolicyBrief) => { setBrief(data); setError(null); })
            .catch((err: any) => setError(err?.message || "Failed to load policy brief"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading...</p>
                </div>
            </div>
        </>
    );

    if (error || !brief) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md">
                    <p className="text-red-500 text-sm">{error || "Policy brief not found."}</p>
                </div>
            </div>
        </>
    );

    const heroImage = brief.image || brief.coverImage;
    const resources = (brief.availableResources ?? []).filter(isValidUrl);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#f5f4f0]">

                {/* Image Modal */}
                {imageModalOpen && heroImage && (
                    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setImageModalOpen(false)}>
                        <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setImageModalOpen(false)} className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                            <img src={heroImage} alt={brief.title} className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" />
                            <p className="text-white/60 text-xs text-center mt-3">Click outside to close</p>
                        </div>
                    </div>
                )}

                {/* Compact Hero Banner */}
                <div className="bg-[#021d49] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
                        {heroImage && (
                            <button onClick={() => setImageModalOpen(true)} className="shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/60 transition-colors relative group" title="View full-size">
                                <img src={heroImage} alt={brief.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )}
                        <div className="flex-1 min-w-0">
                            <button onClick={() => window.history.back()} className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-2 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> All Policy Briefs
                            </button>
                            {brief.category && (
                                <span className="inline-block px-2.5 py-0.5 bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-wider rounded-full mb-2 ml-2">
                                    {brief.category}
                                </span>
                            )}
                            <h1 className="text-lg md:text-2xl font-bold leading-snug mb-2 line-clamp-2">{brief.title}</h1>
                            {brief.datePosted && (
                                <span className="flex items-center gap-1 text-xs text-white/70">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(brief.datePosted).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-4 gap-8 items-start">

                        {/* Main content */}
                        <div className="lg:col-span-3">

                            {/* Excerpt callout */}
                            {brief.excerpt && (
                                <div className="flex gap-4 mb-8 p-6 bg-[#021d49] rounded-2xl">
                                    <BookOpen className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                                    <p className="text-white/90 text-base leading-relaxed italic">{brief.excerpt}</p>
                                </div>
                            )}

                            {/* Description */}
                            {brief.description && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                                    <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
                                        <div className="bg-[#021d49]/10 p-2.5 rounded-lg">
                                            <BookOpen className="w-5 h-5 text-[#021d49]" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Brief Content</h2>
                                    </div>
                                    <div
                                        className="text-[15px] leading-8 text-gray-700
                                            [&>p]:text-justify [&>p]:mb-5
                                            [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-[#021d49] [&>h1]:mt-8 [&>h1]:mb-3
                                            [&>h2]:text-xl [&>h2]:font-bold [&>h2]:text-[#021d49] [&>h2]:mt-7 [&>h2]:mb-3
                                            [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-[#021d49] [&>h3]:mt-6 [&>h3]:mb-2
                                            [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-5 [&>ul>li]:mb-1.5
                                            [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-5 [&>ol>li]:mb-1.5
                                            [&>blockquote]:border-l-4 [&>blockquote]:border-[#021d49]/30 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-500 [&>blockquote]:my-5
                                            [&>img]:rounded-xl [&>img]:my-6 [&>img]:w-full"
                                        dangerouslySetInnerHTML={{ __html: brief.description }}
                                    />
                                </div>
                            )}

                            {/* Resources below description */}
                            {resources.length > 0 && (
                                <div id="resources" className="bg-linear-to-br from-[#021d49]/5 to-blue-50 rounded-2xl border border-gray-200 p-8 md:p-10 mb-8">
                                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-200">
                                        <div className="bg-[#021d49] p-3 rounded-xl">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Available Resources</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">View or download the policy brief documents</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {resources.map((url, idx) => {
                                            const filename = getResourceFileName(url, idx);
                                            const viewUrl = getViewUrl(url);
                                            return (
                                                <div key={idx} className="bg-white rounded-xl border border-gray-200 hover:border-[#021d49] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                                                    <div className="bg-linear-to-r from-[#021d49]/5 to-blue-50 px-5 py-4 flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
                                                            <FileText className="w-5 h-5 text-red-600" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-semibold text-gray-900 break-all leading-snug group-hover:text-[#021d49] transition-colors" title={filename}>{filename}</p>
                                                            <p className="text-xs text-gray-500 mt-1">PDF · Opens in new tab</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
                                                        <a href={viewUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 text-[#021d49] hover:bg-[#021d49] hover:text-white transition-all duration-200 font-semibold text-sm">
                                                            <Eye className="w-4 h-4" /> Open
                                                        </a>
                                                        <a href={url} download className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-semibold text-sm">
                                                            <Download className="w-4 h-4" /> Download
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-6 pt-5 border-t border-gray-200 bg-white/60 rounded-lg px-4 py-3 text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-blue-500 font-bold shrink-0">ℹ</span>
                                        <span>Click <strong className="text-gray-800">"Open"</strong> to read in a new tab, or <strong className="text-gray-800">"Download"</strong> to save to your device.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-6">
                            {/* Cover Image Card */}
                            {heroImage && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <button onClick={() => setImageModalOpen(true)} className="relative w-full group block" title="Click to view full-size">
                                        <img src={heroImage} alt={brief.title} className="w-full object-contain max-h-64 bg-[#021d49]" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                            <div className="bg-white/90 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <ZoomIn className="w-5 h-5 text-gray-900" />
                                            </div>
                                        </div>
                                    </button>
                                    <p className="text-xs text-center text-gray-400 py-2 px-3 border-t border-gray-100">Click image to enlarge</p>
                                </div>
                            )}

                            {/* Brief Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Brief Details</h3>
                                <dl className="space-y-3 text-sm">
                                    {brief.category && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Category</dt><dd className="text-gray-900 font-medium">{brief.category}</dd></div>}
                                    {brief.datePosted && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Published</dt><dd className="text-gray-900 font-medium">{new Date(brief.datePosted).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</dd></div>}
                                </dl>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-linear-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-sm p-6 text-white">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button onClick={() => window.history.back()} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold">
                                        <ArrowLeft className="w-4 h-4" /> All Briefs
                                    </button>
                                    {resources.length > 0 && (
                                        <a href="#resources" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#021d49] rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">
                                            <FileText className="w-4 h-4" /> View Resources
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl hover:bg-[#032a5e] transition-colors shadow-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to All Briefs
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PolicyBriefViewPage;
