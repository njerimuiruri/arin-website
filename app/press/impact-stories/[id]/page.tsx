"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Users, FileText, Mail, ZoomIn, X, Eye, Download } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { useParams, useRouter } from 'next/navigation';
import { getImpactStory } from '@/services/impactStoriesService';
import Footer from '@/app/footer/Footer';
import { API_CONFIG } from '@/lib/apiConfig';

const ImpactStoryDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [story, setStory] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getImpactStory(id as string);
                if (mounted) setStory(data);
            } catch (e: any) {
                if (mounted) setError(e?.message || 'Failed to load story');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [id]);

    const buildImageUrl = (img?: string) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`;
    };

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading story...</p>
                </div>
            </div>
        </>
    );

    if (error || !story) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full">
                    <p className="text-red-500 text-sm mb-4">{error || 'Story not found.'}</p>
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-lg hover:bg-[#032a5e] transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                </div>
            </div>
        </>
    );

    const imageUrl = buildImageUrl(story.image);
    const resources = (story.availableResources ?? []).filter((u: any): u is string => typeof u === 'string' && u.trim().length > 0);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* Image Modal */}
                {imageModalOpen && imageUrl && (
                    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setImageModalOpen(false)}>
                        <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setImageModalOpen(false)} className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                            <img src={imageUrl} alt={story.title} className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" />
                            <p className="text-white/60 text-xs text-center mt-3">Click outside to close</p>
                        </div>
                    </div>
                )}

                {/* Compact Hero Banner */}
                <div className="bg-[#021d49] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
                        {imageUrl && (
                            <button onClick={() => setImageModalOpen(true)} className="shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/60 transition-colors relative group" title="View full-size">
                                <img src={imageUrl} alt={story.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )}
                        <div className="flex-1 min-w-0">
                            <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-2 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> All Impact Stories
                            </button>
                            {story.category && <span className="inline-block px-2.5 py-0.5 bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-wider rounded-full mb-2 ml-2">{story.category}</span>}
                            <h1 className="text-lg md:text-2xl font-bold leading-snug mb-2 line-clamp-2">{story.title}</h1>
                            {story.date && <span className="flex items-center gap-1 text-xs text-white/70"><Calendar className="w-3.5 h-3.5" />{new Date(story.date).toLocaleDateString()}</span>}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-4 gap-8 items-start">

                        {/* Main content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
                                    <div className="bg-[#021d49]/10 p-2.5 rounded-lg">
                                        <FileText className="w-5 h-5 text-[#021d49]" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Story</h2>
                                </div>
                                <div className="prose prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-headings:text-gray-900 prose-a:text-[#021d49] prose-img:rounded-xl"
                                    dangerouslySetInnerHTML={{ __html: story.description || '' }} />
                                {story.video && (
                                    <div className="mt-6">
                                        <video src={buildImageUrl(story.video)} controls className="w-full max-h-96 rounded-xl shadow" />
                                    </div>
                                )}
                            </div>

                            {/* Resources below description */}
                            {resources.length > 0 && (
                                <div id="resources" className="bg-linear-to-br from-[#021d49]/5 to-blue-50 rounded-2xl border border-gray-200 p-8 md:p-10 mb-8">
                                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-200">
                                        <div className="bg-[#021d49] p-3 rounded-xl">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Available Resources</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">View or download related documents</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {resources.map((url: string, idx: number) => {
                                            const filename = decodeURIComponent(url.split('/').pop()?.split('?')[0] ?? '') || `Document ${idx + 1}`;
                                            return (
                                                <div key={idx} className="bg-white rounded-xl border border-gray-200 hover:border-[#021d49] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                                                    <div className="bg-linear-to-r from-[#021d49]/5 to-blue-50 px-5 py-4 flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
                                                            <FileText className="w-5 h-5 text-red-600" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-semibold text-gray-900 break-all leading-snug group-hover:text-[#021d49] transition-colors" title={filename}>{filename}</p>
                                                            <p className="text-xs text-gray-500 mt-1">PDF Document</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
                                                        <a href={url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 text-[#021d49] hover:bg-[#021d49] hover:text-white transition-all duration-200 font-semibold text-sm">
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
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-6">
                            {/* Cover Image Card */}
                            {imageUrl && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <button onClick={() => setImageModalOpen(true)} className="relative w-full group block" title="Click to view full-size">
                                        <img src={imageUrl} alt={story.title} className="w-full object-cover max-h-64" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                            <div className="bg-white/90 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <ZoomIn className="w-5 h-5 text-gray-900" />
                                            </div>
                                        </div>
                                    </button>
                                    <p className="text-xs text-center text-gray-400 py-2 px-3 border-t border-gray-100">Click image to enlarge</p>
                                </div>
                            )}

                            {/* Story Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Story Details</h3>
                                <dl className="space-y-3 text-sm">
                                    {story.category && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Category</dt><dd className="text-gray-900 font-medium">{story.category}</dd></div>}
                                    {story.beneficiaries && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Beneficiaries</dt><dd className="text-gray-900 font-medium">{story.beneficiaries}</dd></div>}
                                    {story.date && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Date</dt><dd className="text-gray-900 font-medium">{new Date(story.date).toLocaleDateString()}</dd></div>}
                                </dl>
                            </div>

                            {/* Contact CTA */}
                            <div className="bg-linear-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-sm p-6 text-white text-center">
                                <Mail className="w-8 h-8 mx-auto mb-3 opacity-80" />
                                <h3 className="text-sm font-bold mb-2">Interested in This Story?</h3>
                                <p className="text-xs text-white/70 mb-4">Get in touch to learn more about collaboration opportunities</p>
                                <button onClick={() => router.back()} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold mb-2">
                                    <ArrowLeft className="w-4 h-4" /> All Stories
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ImpactStoryDetailPage;
