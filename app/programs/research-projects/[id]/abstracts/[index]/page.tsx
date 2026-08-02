"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';
import { useParams } from 'next/navigation';
import { ArrowLeft, Layers } from 'lucide-react';
import { getResearchProject } from '@/services/researchProjectService';

const fallback = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=021d49&color=ffffff&size=200`;

// Abstracts written before the rich-text editor was added are plain text
// (newlines, no tags) — render those with whitespace-pre-wrap instead of as HTML.
const looksLikeHtml = (value: string) => /<[a-z][\s\S]*>/i.test(value);

const AbstractDetailPage = () => {
    const { id, index } = useParams();
    const [project, setProject] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getResearchProject(id as string);
                if (mounted) setProject(data);
            } catch (e: any) {
                if (mounted) setError(e?.message || 'Failed to load project');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#021d49] mb-4" />
                        <p className="text-gray-500">Loading abstract...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const abstracts = Array.isArray(project?.abstracts) ? project.abstracts : [];
    const abstract = abstracts[Number(index)];

    if (error || !project || !abstract) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white px-6">
                    <div className="max-w-md text-center">
                        <p className="text-red-600 font-medium mb-4">{error || 'Abstract not found'}</p>
                        <a href={`/programs/research-projects/${id}`} className="text-[#021d49] font-semibold hover:underline">
                            Back to Project
                        </a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="bg-white min-h-screen">
                <div className="max-w-3xl mx-auto px-6 pt-8 pb-20">
                    <a
                        href={`/programs/research-projects/${id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#021d49] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to {project.title}
                    </a>

                    <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100">
                        <img
                            src={abstract.photo || fallback(abstract.name)}
                            alt={abstract.name}
                            className="w-16 h-16 rounded-full object-cover shrink-0 bg-slate-100"
                        />
                        <div className="min-w-0">
                            <h1 className="text-xl font-bold text-gray-900 leading-snug">{abstract.name}</h1>
                            {abstract.title && <p className="text-sm text-gray-500 mt-0.5">{abstract.title}</p>}
                            {abstract.group && (
                                <span className="inline-flex items-center gap-1.5 mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-[#021d49]">
                                    <Layers className="w-3 h-3" /> {abstract.group}
                                </span>
                            )}
                        </div>
                    </div>

                    {looksLikeHtml(abstract.body) ? (
                        <div className="p-prose" dangerouslySetInnerHTML={{ __html: abstract.body }} />
                    ) : (
                        <p className="text-base text-gray-700 leading-relaxed whitespace-pre-wrap">{abstract.body}</p>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AbstractDetailPage;
