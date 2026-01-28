"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Users, FileText, Mail } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { useParams, useRouter } from 'next/navigation';
import { getImpactStory } from '@/services/impactStoriesService';

const ImpactStoryDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [story, setStory] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        return img.startsWith('http') ? img : `http://localhost:5001${img}`;
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-linear-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                <section className="relative bg-linear-to-br from-[#021d49] via-[#021d49] to-[#021d49] py-0 overflow-hidden">
                    {story?.image && (
                        <div className="h-72 w-full bg-black/30">
                            <img
                                src={buildImageUrl(story.image)}
                                alt={story.title || 'Impact story image'}
                                className="h-full w-full object-cover mix-blend-normal opacity-80"
                            />
                        </div>
                    )}
                    <div className="max-w-350 mx-auto px-6 py-8 relative">
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm">Back to Stories</span>
                        </button>
                        {loading && (<div className="text-white/80">Loading story...</div>)}
                        {error && (<div className="text-red-300">{error}</div>)}
                        {story && (
                            <>
                                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                                    {story.title}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-200">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{story.date ? new Date(story.date).toLocaleDateString() : ''}</span>
                                </div>
                            </>
                        )}
                    </div>
                </section>
                <section className="max-w-350 mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-linear-to-br from-[#021d49] to-[#021d49] rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Description</h2>
                                </div>
                                {loading && (<p className="text-gray-600">Loading...</p>)}
                                {error && (<p className="text-red-600">{error}</p>)}
                                {story && (
                                    <div className="prose max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: story.description || '' }} />
                                    </div>
                                )}
                                {story?.video && (
                                    <div className="mt-6">
                                        <video src={buildImageUrl(story.video)} controls className="w-full max-h-96 rounded-lg shadow" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 sticky top-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-br from-[#021d49] to-[#021d49] rounded-lg flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Meta</h2>
                                </div>
                                <div className="space-y-4">
                                    {loading && (<p className="text-gray-600">Loading...</p>)}
                                    {error && (<p className="text-red-600">{error}</p>)}
                                    {story && (
                                        <>
                                            {story.category && (
                                                <div className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                                    <h4 className="font-bold text-gray-900 text-sm mb-1">Category</h4>
                                                    <div className="text-gray-700 text-sm">{story.category}</div>
                                                </div>
                                            )}
                                            {story.beneficiaries && (
                                                <div className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                                    <h4 className="font-bold text-gray-900 text-sm mb-1">Beneficiaries</h4>
                                                    <div className="text-gray-700 text-sm">{story.beneficiaries}</div>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="max-w-350 mx-auto px-6 pb-12">
                    <div className="bg-linear-to-br from-[#021d49] via-[#021d49] to-[#021d49] rounded-xl p-8 text-center text-white shadow-lg">
                        <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
                        <h2 className="text-2xl font-bold mb-3">
                            Interested in This Story?
                        </h2>
                        <p className="text-sm text-white/90 mb-6 max-w-xl mx-auto">
                            Get in touch with our team to learn more about collaboration opportunities
                        </p>
                        <button className="bg-white text-[#021d49] px-6 py-3 rounded-full font-bold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Contact Us
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ImpactStoryDetailPage;
