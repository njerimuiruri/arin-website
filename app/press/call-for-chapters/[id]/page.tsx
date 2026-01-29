"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCallById } from "@/services/callForBooksService";
import { BookOpen, Calendar, AlertCircle, ArrowLeft, FileText, Tag, Clock, Share2, Bell } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

const CallForBookDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [call, setCall] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        getCallById(id)
            .then(setCall)
            .catch((err) => setError(err.message || "Failed to fetch details"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading call for book chapters...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50 flex items-center justify-center px-4">
                    <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Call</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-lg hover:bg-[#032a5e] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>
                </div>
            </>
        );
    }

    if (!call) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50 flex items-center justify-center px-4">
                    <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-10 h-10 text-gray-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Call Not Found</h2>
                        <p className="text-gray-600 mb-6">The call for book chapters you're looking for doesn't exist or has been removed.</p>
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-lg hover:bg-[#032a5e] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // Calculate days remaining until deadline
    const daysRemaining = call.deadline ? Math.ceil((new Date(call.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;
    const isUrgent = daysRemaining !== null && daysRemaining <= 7;
    const isExpired = daysRemaining !== null && daysRemaining < 0;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50">
                {/* Hero Image Section - Full Width */}
                {call.image && (
                    <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-gray-900">
                        <img
                            src={call.image}
                            alt={call.title}
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Balanced Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

                        {/* Content Overlay - Centered */}
                        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
                            <div className="max-w-5xl w-full text-center">
                                {/* Badge */}
                                <div className="mb-6">
                                    <span className="inline-block px-5 py-2.5 bg-white text-[#021d49] font-bold text-sm uppercase tracking-wider rounded-lg shadow-xl">
                                        📚 Call for Book Chapters
                                    </span>
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
                                    {call.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white mb-6">
                                    {call.postedDate && (
                                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-lg shadow-lg border border-white/20">
                                            <Calendar className="w-5 h-5" />
                                            <span className="font-semibold">Posted {call.postedDate}</span>
                                        </div>
                                    )}
                                    {call.createdAt && !call.postedDate && (
                                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-lg shadow-lg border border-white/20">
                                            <Calendar className="w-5 h-5" />
                                            <span className="font-semibold">{new Date(call.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Deadline Warning */}
                                {call.deadline && (
                                    <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg shadow-xl backdrop-blur-md border-2 ${isExpired
                                        ? 'bg-gray-500/40 border-gray-300/50'
                                        : isUrgent
                                            ? 'bg-red-500/40 border-red-300/50 animate-pulse'
                                            : 'bg-orange-500/40 border-orange-300/50'
                                        }`}>
                                        <Clock className="w-6 h-6" />
                                        <div className="text-left">
                                            <p className="text-sm font-semibold">Submission Deadline</p>
                                            <p className="text-lg font-bold">
                                                {new Date(call.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            {!isExpired && daysRemaining !== null && (
                                                <p className="text-xs font-medium">
                                                    {daysRemaining === 0 ? 'Due Today!' : daysRemaining === 1 ? '1 day left' : `${daysRemaining} days left`}
                                                </p>
                                            )}
                                            {isExpired && <p className="text-xs font-medium">Deadline Passed</p>}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="absolute top-6 left-6">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-gray-900 font-semibold rounded-lg hover:bg-white transition-all shadow-xl"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* No Image Fallback Header */}
                {!call.image && (
                    <div className="relative bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white py-20">
                        <div className="max-w-5xl mx-auto px-6">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>

                            <div className="mb-4">
                                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wide rounded-lg">
                                    📚 Call for Book Chapters
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {call.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-6">
                                {call.postedDate && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Calendar className="w-5 h-5" />
                                        <span className="font-medium">Posted {call.postedDate}</span>
                                    </div>
                                )}
                                {call.createdAt && !call.postedDate && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Calendar className="w-5 h-5" />
                                        <span className="font-medium">{new Date(call.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                )}
                            </div>

                            {call.deadline && (
                                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-lg shadow-xl backdrop-blur-md border-2 ${isExpired
                                    ? 'bg-gray-500/40 border-gray-300/50'
                                    : isUrgent
                                        ? 'bg-red-500/40 border-red-300/50 animate-pulse'
                                        : 'bg-orange-500/40 border-orange-300/50'
                                    }`}>
                                    <Clock className="w-6 h-6" />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold">Submission Deadline</p>
                                        <p className="text-lg font-bold">
                                            {new Date(call.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </p>
                                        {!isExpired && daysRemaining !== null && (
                                            <p className="text-xs font-medium">
                                                {daysRemaining === 0 ? 'Due Today!' : daysRemaining === 1 ? '1 day left' : `${daysRemaining} days left`}
                                            </p>
                                        )}
                                        {isExpired && <p className="text-xs font-medium">Deadline Passed</p>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <div className="px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-4 gap-8">
                            {/* Main Content Column - Takes 3/4 of the space */}
                            <div className="lg:col-span-3">
                                {/* Description Section */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mb-8">
                                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                                        <div className="bg-[#021d49]/10 p-3 rounded-lg">
                                            <FileText className="w-6 h-6 text-[#021d49]" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Call Description</h2>
                                    </div>

                                    {call.excerpt || call.description ? (
                                        <div
                                            className="prose prose-lg max-w-none
                                                prose-headings:text-gray-900 prose-headings:font-bold
                                                prose-h1:text-3xl prose-h1:mb-4 prose-h2:text-2xl prose-h2:mb-4 prose-h3:text-xl prose-h3:mb-3
                                                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-justify
                                                prose-a:text-[#021d49] prose-a:no-underline hover:prose-a:underline
                                                prose-strong:text-gray-900 prose-strong:font-bold
                                                prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:mb-6
                                                prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:mb-6
                                                prose-li:text-gray-700
                                                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
                                                prose-blockquote:border-l-4 prose-blockquote:border-[#021d49] prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:my-6"
                                            dangerouslySetInnerHTML={{ __html: call.excerpt || call.description }}
                                        />
                                    ) : (
                                        <p className="text-gray-500 italic">No description available for this call.</p>
                                    )}
                                </div>

                                {/* Categories Section */}
                                {call.category && (
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                                            <div className="bg-purple-100 p-2 rounded-lg">
                                                <Tag className="w-5 h-5 text-purple-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Categories & Topics</h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {call.category.split(', ').map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-purple-700 text-sm font-semibold rounded-lg hover:shadow-md transition-shadow"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - Takes 1/4 of the space */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-6 space-y-6">
                                    {/* Deadline Card */}
                                    {call.deadline && (
                                        <div className={`rounded-2xl shadow-lg p-6 text-white ${isExpired
                                            ? 'bg-gradient-to-br from-gray-600 to-gray-700'
                                            : isUrgent
                                                ? 'bg-gradient-to-br from-red-500 to-red-600'
                                                : 'bg-gradient-to-br from-orange-500 to-orange-600'
                                            }`}>
                                            <div className="flex items-center gap-2 mb-4">
                                                <Clock className="w-6 h-6" />
                                                <h3 className="text-lg font-bold">Deadline</h3>
                                            </div>
                                            <p className="text-2xl font-bold mb-2">
                                                {new Date(call.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                            {!isExpired && daysRemaining !== null && (
                                                <p className="text-sm font-medium opacity-90">
                                                    {daysRemaining === 0 ? '⏰ Due Today!' : daysRemaining === 1 ? '⏰ 1 day remaining' : `⏰ ${daysRemaining} days remaining`}
                                                </p>
                                            )}
                                            {isExpired && <p className="text-sm font-medium opacity-90">❌ Deadline has passed</p>}
                                        </div>
                                    )}

                                    {/* Quick Actions Card */}
                                    <div className="bg-gradient-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-lg p-6 text-white">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <Share2 className="w-5 h-5" />
                                            Quick Actions
                                        </h3>

                                        <div className="space-y-3">
                                            <button
                                                onClick={() => window.print()}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition-all"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Print Call
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: call.title,
                                                            text: 'Check out this call for book chapters from ARIN',
                                                            url: window.location.href,
                                                        });
                                                    }
                                                }}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition-all"
                                            >
                                                <Share2 className="w-4 h-4" />
                                                Share Call
                                            </button>
                                        </div>
                                    </div>

                                    {/* Important Notice */}
                                    <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                                        <div className="flex items-start gap-3">
                                            <Bell className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                                            <div>
                                                <h4 className="font-bold text-blue-900 mb-1">Important</h4>
                                                <p className="text-sm text-blue-800">
                                                    Please ensure your submission meets all requirements before the deadline.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Back Button - Bottom */}
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => router.back()}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#021d49] to-[#032a5e] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to All Calls
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CallForBookDetailsPage;