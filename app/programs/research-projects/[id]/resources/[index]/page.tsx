"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';
import { useParams } from 'next/navigation';
import { ArrowLeft, Check, Download, Link2 } from 'lucide-react';
import { getResearchProject } from '@/services/researchProjectService';
import { getResourceMeta, buildAssetUrl } from '../../../components/ResourceCard';

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
                <div className="max-w-5xl mx-auto px-6 pt-6">
                    <a
                        href={`/programs/research-projects/${id}`}
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#021d49] transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to {project.title}
                    </a>
                </div>

                <div className="max-w-5xl mx-auto px-6 pt-8 pb-16">
                    <div className="grid sm:grid-cols-[280px_1fr] gap-8 lg:gap-10 items-start">
                        {/* Image/icon — positioned beside the text, sized to stay
                            proportionate instead of dominating the page. */}
                        {resource.image ? (
                            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100 shadow-sm">
                                <img src={buildAssetUrl(resource.image)} alt="" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-full aspect-square rounded-2xl bg-linear-to-br from-blue-50 to-[#021d49]/5 border border-gray-100 flex items-center justify-center">
                                <Icon className="w-12 h-12 text-[#021d49]/30" />
                            </div>
                        )}

                        {/* Text — full width of its own column, well-spaced and easy to read */}
                        <div>
                            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-4">
                                <Icon className="w-3 h-3" /> {meta.label}
                            </span>

                            <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-gray-900 text-balance mb-4">
                                {resource.title}
                            </h1>

                            {resource.description && (
                                <p className="text-base text-gray-600 leading-relaxed text-justify mb-7">{resource.description}</p>
                            )}

                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group px-6 py-3 bg-[#021d49] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#032d6b] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                                >
                                    <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" /> View / Download Document
                                </a>
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className="px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
                                >
                                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4" />}
                                    {copied ? 'Link Copied' : 'Copy Link'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ResourceDetailPage;
