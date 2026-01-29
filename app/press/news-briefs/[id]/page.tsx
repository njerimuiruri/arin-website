"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getNewsBriefById } from "@/services/newsBriefsService";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, Users, Download, FileText, ArrowLeft, Share2, Clock } from "lucide-react";

export default function NewsBriefDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [brief, setBrief] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBrief() {
            setLoading(true);
            const data = await getNewsBriefById(id);
            setBrief(data);
            setLoading(false);
        }
        if (id) fetchBrief();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#021d49] mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading news brief...</p>
                    </div>
                </div>
            </>
        );
    }

    if (!brief) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center max-w-md">
                        <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">News Brief Not Found</h2>
                        <p className="text-gray-600 mb-6">The news brief you're looking for doesn't exist or has been removed.</p>
                        <button
                            onClick={() => router.push('/press/news-briefs')}
                            className="px-6 py-3 bg-[#021d49] text-white rounded-lg hover:bg-[#032a5e] transition-colors duration-200 inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to News Briefs
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const heroImage = brief.image || brief.coverImage || brief.thumbnail;

    return (
        <>
            <Navbar />

            {/* Hero Section with Prominent Image - Full Width */}
            {heroImage ? (
                <div className="relative bg-black w-full">
                    {/* Full-width hero image */}
                    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
                        <img
                            src={heroImage}
                            alt={brief.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                    </div>

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 pb-12 pt-32">
                        <div className="max-w-7xl mx-auto px-6 lg:px-12">
                            {/* Back Button */}
                            <button
                                onClick={() => router.push('/press/news-briefs')}
                                className="mb-6 inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-200 group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                                <span className="font-medium">Back to News Briefs</span>
                            </button>

                            {/* Category Badge */}
                            <div className="mb-4">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#021d49] text-white rounded-full text-sm font-semibold tracking-wide shadow-lg">
                                    <FileText className="w-4 h-4" />
                                    NEWS BRIEF
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl max-w-5xl">
                                {brief.title}
                            </h1>

                            {/* Meta Information */}
                            <div className="flex flex-wrap items-center gap-6 text-white">
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                                    <Calendar className="w-5 h-5" />
                                    <span className="font-medium">
                                        {brief.datePosted ? new Date(brief.datePosted).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        }) : ''}
                                    </span>
                                </div>

                                {brief.authors && brief.authors.length > 0 && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                                        <Users className="w-5 h-5" />
                                        <span className="font-medium">{brief.authors.join(', ')}</span>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
                                    <Clock className="w-5 h-5" />
                                    <span className="font-medium">5 min read</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Fallback hero without image
                <div className="relative bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] w-full">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
                        <button
                            onClick={() => router.push('/press/news-briefs')}
                            className="mb-8 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-200 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" />
                            <span className="font-medium">Back to News Briefs</span>
                        </button>

                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-semibold tracking-wide">
                                <FileText className="w-4 h-4" />
                                NEWS BRIEF
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight max-w-5xl">
                            {brief.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-gray-200">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span className="font-medium">
                                    {brief.datePosted ? new Date(brief.datePosted).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    }) : ''}
                                </span>
                            </div>

                            {brief.authors && brief.authors.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Users className="w-5 h-5" />
                                    <span className="font-medium">{brief.authors.join(', ')}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span className="font-medium">5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Authors Section - Full Width with Subtle Background */}
            {brief.authors && brief.authors.length > 0 && (
                <div className="w-full bg-gradient-to-r from-gray-50 to-blue-50/30 border-y border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
                        <div className="flex items-start gap-4">
                            <div className="bg-gradient-to-br from-[#021d49] to-[#032a5e] rounded-full w-14 h-14 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Users className="w-7 h-7 text-white" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Written By
                                </p>
                                <p className="text-xl font-semibold text-gray-900">
                                    {brief.authors.join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content - Full Width White Background */}
            <div className="w-full bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                    {/* Article Content */}
                    <div
                        className="prose prose-lg max-w-none
                            prose-headings:text-gray-900 prose-headings:font-bold
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-[#021d49]
                            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-[#032a5e]
                            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
                            prose-a:text-[#021d49] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-900 prose-strong:font-bold
                            prose-ul:my-6 prose-ol:my-6
                            prose-li:text-gray-700 prose-li:my-3 prose-li:text-lg
                            prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-10 prose-img:border prose-img:border-gray-200 prose-img:w-full
                            prose-blockquote:border-l-4 prose-blockquote:border-[#021d49] prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-700 prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:my-8 prose-blockquote:rounded-r-lg"
                        dangerouslySetInnerHTML={{ __html: brief.description }}
                    />
                </div>
            </div>

            {/* Resources Section - Full Width with Gray Background */}
            {brief.availableResources && brief.availableResources.length > 0 && (
                <div className="w-full bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50/20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="bg-gradient-to-br from-[#021d49] to-[#032a5e] rounded-xl w-16 h-16 flex items-center justify-center shadow-lg">
                                <Download className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900">
                                    Available Resources
                                </h2>
                                <p className="text-gray-600 mt-1 text-lg">Download related documents and materials</p>
                            </div>
                        </div>

                        <div className="grid gap-5">
                            {brief.availableResources.map((url: string, i: number) => {
                                const fileName = url.split("/").pop() || `Resource ${i + 1}`;
                                return (
                                    <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-5 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#021d49] hover:shadow-2xl transition-all duration-300 group"
                                    >
                                        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-4 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                                            <FileText className="w-8 h-8 text-[#021d49]" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-900 truncate group-hover:text-[#021d49] transition-colors duration-200 text-xl">
                                                {fileName}
                                            </p>
                                            <p className="text-base text-gray-500 mt-1">
                                                Click to download or view
                                            </p>
                                        </div>
                                        <Download className="w-7 h-7 text-gray-400 group-hover:text-[#021d49] group-hover:scale-110 transition-all duration-200 flex-shrink-0" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Share Section - Full Width with Brand Gradient */}
            <div className="w-full bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white/3 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-20 text-white text-center">
                    <div className="bg-white/10 backdrop-blur-sm w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                        <Share2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-5">Found this interesting?</h3>
                    <p className="text-gray-200 mb-10 max-w-3xl mx-auto text-xl leading-relaxed">
                        Share this news brief with your network and help spread awareness about ARIN's work.
                    </p>
                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: brief.title,
                                    url: window.location.href
                                });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('Link copied to clipboard!');
                            }
                        }}
                        className="px-12 py-5 bg-white text-[#021d49] font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-200 inline-flex items-center gap-3 shadow-2xl text-xl"
                    >
                        <Share2 className="w-6 h-6" />
                        Share This Article
                    </button>
                </div>
            </div>

            {/* Back to News Section - Full Width Light Background */}
            <div className="w-full bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 text-center">
                    <button
                        onClick={() => router.push('/press/news-briefs')}
                        className="px-12 py-5 bg-white text-[#021d49] border-2 border-[#021d49] font-bold rounded-xl hover:bg-[#021d49] hover:text-white hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-2xl text-xl"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        Back to All News Briefs
                    </button>
                </div>
            </div>
        </>
    );
}