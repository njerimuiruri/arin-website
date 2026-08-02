"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check, Download, Link2 } from 'lucide-react';
import { getResearchProject } from '@/services/researchProjectService';
import { getResourceMeta } from '../../../components/ResourceCard';

const ResourceDetailPage = () => {
    const { id, index } = useParams();
    const [project, setProject] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

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

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard API unavailable — silently ignore, link is still visible/shareable via the address bar.
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#021d49] mb-4" />
                        <p className="text-gray-500">Loading resource...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const resources = Array.isArray(project?.resources) ? project.resources : [];
    const resource = resources[Number(index)];

    if (error || !project || !resource) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white px-6">
                    <div className="max-w-md text-center">
                        <p className="text-red-600 font-medium mb-4">{error || 'Resource not found'}</p>
                        <a href={`/programs/research-projects/${id}`} className="text-[#021d49] font-semibold hover:underline">
                            Back to Project
                        </a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const meta = getResourceMeta(resource.type);
    const Icon = meta.icon;

    return (
        <>
            <Navbar />
            <main className="bg-white min-h-screen">
                <div className="max-w-3xl mx-auto px-6 pt-4">
                    <a
                        href={`/programs/research-projects/${id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#021d49] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to {project.title}
                    </a>
                </div>

                <div className="max-w-3xl mx-auto px-6 pt-6 pb-16 sm:pt-8">
                    {resource.image ? (
                        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm mb-6">
                            <img src={resource.image} alt="" className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#021d49] flex items-center justify-center mb-6">
                            <Icon className="w-7 h-7" />
                        </div>
                    )}

                    <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-3">
                        {meta.label}
                    </span>

                    <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900 text-balance mb-4">
                        {resource.title}
                    </h1>

                    {resource.description && (
                        <p className="text-base text-gray-600 leading-relaxed text-justify mb-8">{resource.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-3">
                        <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#032d6b] transition-colors inline-flex items-center gap-2"
                        >
                            <Download className="w-4 h-4" /> View / Download Document
                        </a>
                        <button
                            type="button"
                            onClick={handleCopyLink}
                            className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4" />}
                            {copied ? 'Link Copied' : 'Copy Link'}
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ResourceDetailPage;
