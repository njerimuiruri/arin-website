"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, FileText, ArrowLeft, BookOpen, ZoomIn, X, Eye, Download } from "lucide-react";
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

function toProxyUrl(url: string, download = false): string {
    if (!url) return "";
    try {
        // Extract the path after /upload/ (strip optional version segment vXXXXXX/)
        const match = url.match(/\/upload\/(?:v\d+\/)?arin\/resources\/(.*)/);
        if (!match) return url; // not a known Cloudinary resource path, return as-is
        const path = match[1];
        return `/api/resources/${path}${download ? "?download=1" : ""}`;
    } catch {
        return url;
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

function processHTMLContent(html: string): string {
    let processed = html;

    // Process KEY MESSAGES
    // Match paragraphs that start with "KEY MESSAGE:" or "Key Message:"
    processed = processed.replace(
        /<p[^>]*>([\s\S]*?(?:KEY\s+MESSAGE|Key\s+Message)\s*:[\s\S]*?)<\/p>/gi,
        '<p class="key-message">$1</p>'
    );

    // Process SUGGESTED CITATION
    // Wrap citation blocks
    processed = processed.replace(
        /<p[^>]*>([\s\S]*?(?:SUGGESTED\s+CITATION|Suggested\s+Citation)\s*:[\s\S]*?)<\/p>/gi,
        '<div class="suggested-citation"><span class="suggested-citation-label">Suggested Citation</span><p>$1</p></div>'
    );

    // Process FRAMEWORK/ASCUFS STEPS
    // Match steps like "STEP 1:", "Step 1:", or " 1 Step:"
    processed = processed.replace(
        /<p[^>]*>\s*(STEP\s*)?(\d)\s*[\s.:\-]*([^<]*(?:<[^/][^>]*>[^<]*)*)<\/p>/gi,
        (match, stepWord, stepNum, content) => {
            const stepClass = `step-${stepNum}`;
            return `<div class="framework-step ${stepClass}">
                      <div class="framework-step-number">${stepNum}</div>
                      <div class="framework-step-content">
                        <p>${content.trim()}</p>
                      </div>
                    </div>`;
        }
    );

    return processed;
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
                <div className="max-w-7xl mx-auto px-6 py-8">

                    {/* Compact info bar — replaces sidebar */}
                    <div className="flex flex-wrap items-center gap-3 mb-6 p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                        {/* Thumbnail */}
                        {heroImage && (
                            <button onClick={() => setImageModalOpen(true)} className="shrink-0 relative group" title="View full-size">
                                <img src={heroImage} alt={brief.title} className="w-14 h-16 object-cover rounded-lg border border-gray-200 shadow-sm" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-lg transition-all flex items-center justify-center">
                                    <ZoomIn className="w-3.5 h-3.5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )}

                        {/* Meta */}
                        <div className="flex flex-wrap items-center gap-4 flex-1 min-w-0">
                            {brief.category && (
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Category</p>
                                    <p className="text-sm font-semibold text-gray-800">{brief.category}</p>
                                </div>
                            )}
                            {brief.datePosted && (
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Published</p>
                                    <p className="text-sm font-semibold text-gray-800">
                                        {new Date(brief.datePosted).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                            <button onClick={() => window.history.back()}
                                className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold rounded-lg transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> All Briefs
                            </button>
                            {resources.length > 0 && (
                                <a href="#resources"
                                    className="flex items-center gap-1.5 px-3 py-2 bg-[#021d49] hover:bg-[#032a5e] text-white text-xs font-semibold rounded-lg transition-colors">
                                    <FileText className="w-3.5 h-3.5" /> View Resources
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Excerpt callout — full width */}
                    {brief.excerpt && (
                        <div className="flex gap-4 mb-6 p-6 bg-[#021d49] rounded-2xl">
                            <BookOpen className="w-5 h-5 text-white/50 shrink-0 mt-0.5" />
                            <p className="text-white/90 text-base leading-relaxed italic">{brief.excerpt}</p>
                        </div>
                    )}

                    {/* Brief Content — full width, document style */}
                    {brief.description && (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8 overflow-hidden">
                            <div className="flex items-center gap-3 px-10 pt-8 pb-5 border-b border-gray-100">
                                <div className="bg-[#021d49]/10 p-2.5 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-[#021d49]" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Brief Content</h2>
                            </div>

                            {/* Inject document-level styles scoped to this container */}
                            <style>{`
                              .doc-body { font-family: Georgia, 'Times New Roman', serif; font-size: 16.5px; line-height: 1.9; color: #1f2937; }
                              .doc-body p { margin-bottom: 1.3em; text-align: justify; }
                              .doc-body h1 { font-size: 1.8rem; font-weight: 700; color: #021d49; margin: 2.25rem 0 0.8rem; font-family: system-ui, sans-serif; line-height: 1.3; text-align: center; }
                              .doc-body h2 { font-size: 1.35rem; font-weight: 700; color: #021d49; margin: 2rem 0 0.65rem; font-family: system-ui, sans-serif; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.4rem; }
                              .doc-body h3 { font-size: 1.1rem; font-weight: 600; color: #021d49; margin: 1.6rem 0 0.5rem; font-family: system-ui, sans-serif; }
                              .doc-body ul { list-style: disc; padding-left: 2rem; margin-bottom: 1.3em; }
                              .doc-body ol { list-style: decimal; padding-left: 2rem; margin-bottom: 1.3em; }
                              .doc-body li { margin-bottom: 0.5em; line-height: 1.75; }
                              .doc-body blockquote { border-left: 4px solid #021d49; margin: 1.75em 0; color: #4b5563; font-style: italic; background: #f8fafc; padding: 1rem 1.4rem; border-radius: 0 0.5rem 0.5rem 0; }
                              .doc-body img { border-radius: 0.75rem; margin: 1.75rem auto; max-width: 100%; display: block; box-shadow: 0 4px 20px rgba(0,0,0,0.10); }
                              .doc-body p:has(+ p > img), .doc-body p:empty { display: none; }
                              .doc-body p:has(img) { text-align: center; }
                              .doc-body p em:only-child, .doc-body p > em:only-child { display: block; text-align: center; font-size: 0.88rem; color: #6b7280; margin-top: -1rem; margin-bottom: 1.5rem; font-style: italic; }
                              .doc-body table { width: 100%; border-collapse: collapse; margin: 2rem 0; font-size: 0.93rem; font-family: system-ui, sans-serif; }
                              .doc-body th { background-color: #021d49; color: #fff; font-weight: 600; text-align: left; padding: 11px 15px; border: 1px solid #021d49; }
                              .doc-body td { border: 1px solid #d1d5db; padding: 10px 15px; vertical-align: top; line-height: 1.6; }
                              .doc-body tr:nth-child(even) td { background-color: #f8fafc; }
                              .doc-body a { color: #1d4ed8; text-decoration: underline; }
                              .doc-body strong { font-weight: 700; color: #111827; }
                              .doc-body [style*="text-align: center"] { text-align: center !important; }
                              .doc-body [style*="text-align:center"] { text-align: center !important; }
                              .doc-body p[style*="text-align: center"], .doc-body p[style*="text-align:center"] { text-align: center !important; }
                              
                              /* Key Messages Styling */
                              .key-message { 
                                background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%);
                                border-left: 4px solid #22c55e;
                                padding: 1.5rem 1.75rem;
                                margin: 1.5rem 0;
                                border-radius: 0.75rem;
                                color: #065f46;
                                font-weight: 500;
                              }
                              .key-message strong { color: #047857; }
                              
                              /* Suggested Citation Styling */
                              .suggested-citation {
                                background: #f8fafc;
                                border: 2px solid #e2e8f0;
                                padding: 1.5rem 1.75rem;
                                margin: 2rem 0;
                                border-radius: 0.75rem;
                              }
                              .suggested-citation-label {
                                font-size: 0.85rem;
                                font-weight: 700;
                                color: #021d49;
                                text-transform: uppercase;
                                letter-spacing: 0.5px;
                                margin-bottom: 0.75rem;
                                display: block;
                              }
                              .suggested-citation p {
                                margin-bottom: 0 !important;
                                font-family: 'Courier New', monospace;
                                font-size: 0.95rem;
                                color: #1f2937;
                                line-height: 1.6;
                                text-align: left !important;
                              }
                              
                              /* Framework Steps Styling */
                              .framework-step {
                                display: flex;
                                gap: 1.5rem;
                                margin: 2rem 0;
                                padding: 1.5rem;
                                background: white;
                                border-radius: 0.75rem;
                                border-left: 5px solid #021d49;
                              }
                              .framework-step.step-1 { border-left-color: #2563eb; background: linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(37, 99, 235, 0.02) 100%); }
                              .framework-step.step-2 { border-left-color: #059669; background: linear-gradient(135deg, rgba(5, 150, 105, 0.05) 0%, rgba(5, 150, 105, 0.02) 100%); }
                              .framework-step.step-3 { border-left-color: #d97706; background: linear-gradient(135deg, rgba(217, 119, 6, 0.05) 0%, rgba(217, 119, 6, 0.02) 100%); }
                              .framework-step.step-4 { border-left-color: #7c3aed; background: linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(124, 58, 237, 0.02) 100%); }
                              .framework-step.step-5 { border-left-color: #dc2626; background: linear-gradient(135deg, rgba(220, 38, 38, 0.05) 0%, rgba(220, 38, 38, 0.02) 100%); }
                              
                              .framework-step-number {
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: 700;
                                font-size: 1.5rem;
                                color: white;
                                width: 50px;
                                height: 50px;
                                border-radius: 50%;
                                flex-shrink: 0;
                              }
                              .step-1 .framework-step-number { background-color: #2563eb; }
                              .step-2 .framework-step-number { background-color: #059669; }
                              .step-3 .framework-step-number { background-color: #d97706; }
                              .step-4 .framework-step-number { background-color: #7c3aed; }
                              .step-5 .framework-step-number { background-color: #dc2626; }
                              
                              .framework-step-content h3 {
                                margin-top: 0;
                                margin-bottom: 0.75rem;
                              }
                              .framework-step-content p {
                                margin-bottom: 0.5em;
                                text-align: left !important;
                              }
                              .framework-step-content ul {
                                margin-bottom: 0;
                                padding-left: 1.75rem;
                              }
                              .framework-step-content li {
                                margin-bottom: 0.4em;
                                font-size: 0.95rem;
                              }
                            `}</style>

                            <div
                                className="doc-body px-10 py-8"
                                dangerouslySetInnerHTML={{ __html: processHTMLContent(brief.description) }}
                            />
                        </div>
                    )}

                    {/* Resources — full width */}
                    {resources.length > 0 && (
                        <div id="resources" className="bg-linear-to-br from-[#021d49]/5 to-blue-50 rounded-2xl border border-gray-200 p-8 mb-8">
                            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-200">
                                <div className="bg-[#021d49] p-3 rounded-xl">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Available Resources</h2>
                                    <p className="text-sm text-gray-500 mt-0.5">View or download the policy brief documents</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {resources.map((url, idx) => {
                                    const filename = getResourceFileName(url, idx);
                                    const openUrl = toProxyUrl(url);
                                    const downloadUrl = toProxyUrl(url, true);
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
                                                <a href={openUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 text-[#021d49] hover:bg-[#021d49] hover:text-white transition-all duration-200 font-semibold text-sm">
                                                    <Eye className="w-4 h-4" /> Open
                                                </a>
                                                <a href={downloadUrl} download={filename} className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-semibold text-sm">
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

                    <div className="mt-4">
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
