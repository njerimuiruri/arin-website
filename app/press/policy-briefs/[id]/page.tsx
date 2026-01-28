"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, FileText, Lightbulb, ArrowLeft } from "lucide-react";
import { policyBriefsService } from "@/services/policyBriefsService";

const PolicyBriefViewPage = () => {
    const { id } = useParams();
    const [brief, setBrief] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrief = async () => {
            try {
                setLoading(true);
                const data = await policyBriefsService.getById(id);
                setBrief(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to load policy brief");
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchBrief();
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
                                        alt={brief.title}
                                        className="w-full h-64 object-cover rounded-xl mb-4"
                                    />
                                ) : (
                                    <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-xl">
                                        <Lightbulb className="w-16 h-16 text-white/30" />
                                    </div>
                                )}
                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3">
                                    {brief.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{brief.title}</h1>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                                    <Calendar className="w-4 h-4 text-[#021d49]" />
                                    <span>{brief.datePosted ? new Date(brief.datePosted).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''}</span>
                                </div>
                            </div>
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                                <p className="text-gray-700 leading-relaxed">{brief.excerpt}</p>
                            </div>
                            {brief.description && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: brief.description }} />
                                </div>
                            )}
                            {brief.availableResources && brief.availableResources.length > 0 && (
                                <div className="mb-6">
                                    <h2 className="text-lg font-semibold mb-2">Resources</h2>
                                    <ul className="list-disc pl-6">
                                        {brief.availableResources.map((url, idx) => (
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
