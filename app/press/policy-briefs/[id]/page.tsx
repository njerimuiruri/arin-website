"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, FileText, Lightbulb, ArrowLeft, Download, ExternalLink } from "lucide-react";
import { policyBriefsService } from "@/services/policyBriefsService";

interface PolicyBrief {
    id: string;
    title: string;
    category?: string;
    image?: string;
    coverImage?: string;
    datePosted?: string;
    excerpt?: string;
    description?: string;
    availableResources?: string[];
}

const PolicyBriefViewPage = () => {
    // useParams returns Record<string, string> | null in Next.js 13+
    const params = useParams();
    const id = typeof params === 'object' && params !== null && 'id' in params ? String((params as Record<string, string>).id) : '';
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
        if (id && typeof id === 'string' && id.length > 0) fetchBrief();
    }, [id]);

    const handleOpenResource = (url: string) => {
        // Open the resource in a new tab for viewing
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const getResourceFileName = (url: string, index: number) => {
        // Extract the filename from the URL
        const urlParts = url.split('/');
        const fileName = urlParts[urlParts.length - 1];

        // If it's a Cloudinary URL, try to get the original filename
        if (url.includes('cloudinary.com')) {
            // Extract the part after the last slash and before any query parameters
            const cleanFileName = fileName.split('?')[0];
            // Decode URL encoding
            const decodedFileName = decodeURIComponent(cleanFileName);
            return decodedFileName || `Resource ${index + 1}`;
        }

        return fileName || `Resource ${index + 1}`;
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                <section className="max-w-3xl mx-auto px-6 py-12">
                    <button
                        className="mb-6 flex items-center gap-2 text-[#021d49] hover:underline"
                        onClick={() => window.history.back()}
                    >
                        <ArrowLeft className="w-5 h-5" /> Back
                    </button>

                    {loading && (
                        <div className="text-center py-16">
                            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Loading policy brief…</h3>
                        </div>
                    )}
                    {error && (
                        <div className="text-center py-16">
                            <Lightbulb className="w-12 h-12 text-red-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-red-700 mb-2">{error}</h3>
                        </div>
                    )}
                    {!loading && !error && brief && (
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                            <div className="mb-6">
                                {(brief.image || brief.coverImage) ? (
                                    <img
                                        src={brief.image || brief.coverImage}
                                        alt={brief.title || 'Policy Brief'}
                                        className="w-full h-64 object-cover rounded-xl mb-4"
                                    />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-xl">
                                        <Lightbulb className="w-16 h-16 text-white/30" />
                                    </div>
                                )}
                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3">
                                    {brief.category || 'Uncategorized'}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{brief.title || 'Untitled'}</h1>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4 text-[#021d49]" />
                                    <span>{brief.datePosted ? new Date(brief.datePosted).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                                <p className="text-gray-700 leading-relaxed">{brief.excerpt ? brief.excerpt : 'No summary available.'}</p>
                            </div>
                            {brief.description && typeof brief.description === 'string' && brief.description.trim().length > 0 ? (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: brief.description }} />
                                </div>
                            ) : null}
                            {Array.isArray(brief.availableResources) && brief.availableResources.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                                        <div className="bg-green-100 p-2 rounded-lg">
                                            <Download className="w-5 h-5 text-green-600" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Available Resources</h2>
                                    </div>

                                    <div className="space-y-3">
                                        {brief.availableResources.map((url: string, idx: number) => {
                                            const fileName = getResourceFileName(url, idx);
                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOpenResource(url)}
                                                    className="w-full flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-gray-50 to-green-50/50 hover:from-[#021d49] hover:to-[#032a5e] border border-gray-200 hover:border-[#021d49] rounded-xl transition-all duration-300 group"
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-white/20 transition-colors">
                                                            <FileText className="w-5 h-5 text-[#021d49] group-hover:text-white transition-colors" />
                                                        </div>
                                                        <div className="flex-1 min-w-0 text-left">
                                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors block truncate">
                                                                {fileName}
                                                            </span>
                                                            <span className="text-xs text-gray-500 group-hover:text-white/80 transition-colors">
                                                                Click to view or download
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default PolicyBriefViewPage;
