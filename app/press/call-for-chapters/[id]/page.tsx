"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCallById } from "@/services/callForBooksService";
import { BookOpen, Calendar, AlertCircle, ArrowLeft, FileText, Tag, Clock, Share2, Bell, ZoomIn, X, Eye, Download } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

const CallForBookDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [call, setCall] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        getCallById(id)
            .then(setCall)
            .catch((err: any) => setError(err.message || "Failed to fetch details"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading call for book chapters...</p>
                </div>
            </div>
        </>
    );

    if (error) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Call</h2>
                    <p className="text-gray-500 text-sm mb-6">{error}</p>
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-lg hover:bg-[#032a5e] transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                </div>
            </div>
        </>
    );

    if (!call) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Call Not Found</h2>
                    <p className="text-gray-500 text-sm mb-6">The call for book chapters you're looking for doesn't exist or has been removed.</p>
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-lg hover:bg-[#032a5e] transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );

    const daysRemaining = call.deadline ? Math.ceil((new Date(call.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null;
    const isUrgent = daysRemaining !== null && daysRemaining <= 7;
    const isExpired = daysRemaining !== null && daysRemaining < 0;
    const resources = (call.availableResources ?? []).filter((u: any): u is string => typeof u === 'string' && u.trim().length > 0);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* Image Modal */}
                {imageModalOpen && call.image && (
                    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setImageModalOpen(false)}>
                        <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setImageModalOpen(false)} className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                            <img src={call.image} alt={call.title} className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" />
                            <p className="text-white/60 text-xs text-center mt-3">Click outside to close</p>
                        </div>
                    </div>
                )}

                {/* Compact Hero Banner */}
                <div className="bg-[#021d49] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
                        {call.image && (
                            <button onClick={() => setImageModalOpen(true)} className="shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/60 transition-colors relative group" title="View full-size">
                                <img src={call.image} alt={call.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )}
                        <div className="flex-1 min-w-0">
                            <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-2 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> All Calls
                            </button>
                            <span className="inline-block px-2.5 py-0.5 bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-wider rounded-full mb-2 ml-2">Call for Book Chapters</span>
                            <h1 className="text-lg md:text-2xl font-bold leading-snug mb-2 line-clamp-2">{call.title}</h1>
                            <div className="flex flex-wrap gap-3 text-xs text-white/70">
                                {(call.postedDate || call.createdAt) && (
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {call.postedDate || new Date(call.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                )}
                                {call.deadline && !isExpired && daysRemaining !== null && (
                                    <span className={`flex items-center gap-1 ${isUrgent ? 'text-red-300' : 'text-orange-300'}`}>
                                        <Clock className="w-3.5 h-3.5" />
                                        {daysRemaining === 0 ? 'Due Today!' : `${daysRemaining} days left`}
                                    </span>
                                )}
                                {isExpired && <span className="flex items-center gap-1 text-gray-400"><Clock className="w-3.5 h-3.5" /> Deadline passed</span>}
                            </div>
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
                                    <h2 className="text-xl font-bold text-gray-900">Call Description</h2>
                                </div>
                                {call.excerpt || call.description ? (
                                    <div
                                        className="prose prose-base max-w-none
                                            prose-headings:text-gray-900 prose-headings:font-bold
                                            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-justify
                                            prose-a:text-[#021d49] prose-a:no-underline hover:prose-a:underline
                                            prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-5
                                            prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-5
                                            prose-li:text-gray-700 prose-img:rounded-xl prose-img:my-6 prose-img:w-full"
                                        dangerouslySetInnerHTML={{ __html: call.excerpt || call.description }}
                                    />
                                ) : (
                                    <p className="text-gray-500 italic">No description available for this call.</p>
                                )}
                            </div>

                            {/* Category tags */}
                            {call.category && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                                    <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                                        <div className="bg-purple-100 p-2.5 rounded-lg">
                                            <Tag className="w-4 h-4 text-purple-600" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900">Categories & Topics</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {call.category.split(', ').map((tag: string, idx: number) => (
                                            <span key={idx} className="px-4 py-2 bg-purple-50 border border-purple-200 text-purple-700 text-sm font-semibold rounded-lg">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Resources below description */}
                            {resources.length > 0 && (
                                <div id="resources" className="bg-linear-to-br from-[#021d49]/5 to-blue-50 rounded-2xl border border-gray-200 p-8 md:p-10 mb-8">
                                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-200">
                                        <div className="bg-[#021d49] p-3 rounded-xl">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Available Resources</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">View or download submission guidelines and documents</p>
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
                            {call.image && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <button onClick={() => setImageModalOpen(true)} className="relative w-full group block" title="Click to view full-size">
                                        <img src={call.image} alt={call.title} className="w-full object-contain max-h-64 bg-[#021d49]" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                            <div className="bg-white/90 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <ZoomIn className="w-5 h-5 text-gray-900" />
                                            </div>
                                        </div>
                                    </button>
                                    <p className="text-xs text-center text-gray-400 py-2 px-3 border-t border-gray-100">Click image to enlarge</p>
                                </div>
                            )}

                            {/* Deadline Card */}
                            {call.deadline && (
                                <div className={`rounded-2xl shadow-sm p-6 text-white ${isExpired ? 'bg-gray-600' : isUrgent ? 'bg-red-500' : 'bg-orange-500'}`}>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Clock className="w-5 h-5" />
                                        <h3 className="text-sm font-bold uppercase tracking-wider">Deadline</h3>
                                    </div>
                                    <p className="text-lg font-bold mb-1">{new Date(call.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    {!isExpired && daysRemaining !== null && <p className="text-xs font-medium opacity-90">{daysRemaining === 0 ? 'Due Today!' : daysRemaining === 1 ? '1 day remaining' : `${daysRemaining} days remaining`}</p>}
                                    {isExpired && <p className="text-xs font-medium opacity-90">Deadline has passed</p>}
                                </div>
                            )}

                            {/* Quick Actions */}
                            <div className="bg-linear-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-sm p-6 text-white">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button onClick={() => router.back()} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold">
                                        <ArrowLeft className="w-4 h-4" /> All Calls
                                    </button>
                                    {resources.length > 0 && (
                                        <a href="#resources" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#021d49] rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">
                                            <FileText className="w-4 h-4" /> View Resources
                                        </a>
                                    )}
                                    <button onClick={() => navigator.share?.({ title: call.title, url: window.location.href })} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>

                            {/* Important Notice */}
                            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                    <Bell className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <h4 className="font-bold text-blue-900 text-sm mb-1">Important</h4>
                                        <p className="text-xs text-blue-800">Ensure your submission meets all requirements before the deadline.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button onClick={() => router.back()} className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl hover:bg-[#032a5e] transition-colors shadow-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to All Calls
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CallForBookDetailsPage;
