"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, FileText, Lightbulb, ArrowLeft } from "lucide-react";
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
                                    <h2 className="text-lg font-semibold mb-2">Resources</h2>
                                    <ul className="list-disc pl-6">
                                        {brief.availableResources.map((url: string, idx: number) => (
                                            <li key={idx} className="mb-2">
                                                <a
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#021d49] hover:underline flex items-center gap-2"
                                                >
                                                    <FileText className="w-4 h-4" /> {url.split('/').pop()}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
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
