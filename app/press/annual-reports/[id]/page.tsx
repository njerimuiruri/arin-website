"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Download, FileText, Share2, BookOpen, ZoomIn, X, Eye } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getAnnualReport } from '@/services/annualReportsService';
import { cleanHtmlContent } from '@/lib/htmlUtils';
import type { AnnualReport } from '@/services/annualReportsService';
import Footer from '@/app/footer/Footer';

const HtmlRenderer: React.FC<{ content: string }> = ({ content }) => (
    <div
        className="prose prose-base max-w-none
            prose-headings:text-gray-900 prose-headings:font-bold
            prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5 prose-p:text-justify
            prose-a:text-[#021d49] prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-5
            prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-5 prose-li:text-gray-700
            prose-img:rounded-xl prose-img:shadow-md prose-img:my-6 prose-img:w-full
            prose-blockquote:border-l-4 prose-blockquote:border-[#021d49] prose-blockquote:pl-5
            prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:py-2"
        dangerouslySetInnerHTML={{ __html: cleanHtmlContent(content) }}
    />
);

const AnnualReportDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [report, setReport] = useState<AnnualReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        getAnnualReport(id)
            .then(data => { if (data) setReport(data); else setError('Annual report not found'); })
            .catch(() => setError('Failed to load annual report'))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading report...</p>
                </div>
            </div>
        </>
    );

    if (error || !report) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Report Not Found</h2>
                    <p className="text-gray-500 text-sm mb-6">The annual report you are looking for does not exist or has been removed.</p>
                    <button onClick={() => router.back()} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-lg hover:bg-[#032a5e] transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                </div>
            </div>
        </>
    );

    const resources = (report.availableResources ?? []).filter((u): u is string => typeof u === 'string' && u.trim().length > 0);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* Image Modal */}
                {imageModalOpen && report.image && (
                    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setImageModalOpen(false)}>
                        <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setImageModalOpen(false)} className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                            <img src={report.image} alt={report.title} className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" />
                            <p className="text-white/60 text-xs text-center mt-3">Click outside to close</p>
                        </div>
                    </div>
                )}

                {/* Compact Hero Banner */}
                <div className="bg-[#021d49] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
                        {report.image && (
                            <button onClick={() => setImageModalOpen(true)} className="shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/60 transition-colors relative group" title="View full-size">
                                <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )}
                        <div className="flex-1 min-w-0">
                            <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-2 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> All Annual Reports
                            </button>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {report.year && <span className="inline-block px-2.5 py-0.5 bg-white/15 text-white/90 text-xs font-semibold rounded-full">{report.year}</span>}
                                {report.category && <span className="inline-block px-2.5 py-0.5 bg-blue-500/60 text-white text-xs font-semibold rounded-full">{report.category}</span>}
                            </div>
                            <h1 className="text-lg md:text-2xl font-bold leading-snug mb-2 line-clamp-2">{report.title}</h1>
                            {report.date && (
                                <span className="flex items-center gap-1 text-xs text-white/70">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-4 gap-8 items-start">

                        {/* Main content */}
                        <div className="lg:col-span-3">
                            {report.description && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                                    <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
                                        <div className="bg-[#021d49]/10 p-2.5 rounded-lg">
                                            <BookOpen className="w-5 h-5 text-[#021d49]" />
                                        </div>
                                        <h2 className="text-xl font-bold text-gray-900">Report Overview</h2>
                                    </div>
                                    {typeof report.description === 'string' && report.description.includes('<')
                                        ? <HtmlRenderer content={report.description} />
                                        : <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-justify">{report.description}</p>
                                    }
                                </div>
                            )}

                            {/* Resources below description */}
                            {resources.length > 0 && (
                                <div id="resources" className="bg-gradient-to-br from-[#021d49]/5 to-blue-50 rounded-2xl border border-gray-200 p-8 md:p-10 mb-8">
                                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-200">
                                        <div className="bg-[#021d49] p-3 rounded-xl">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Available Resources</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">View or download the full report and supporting documents</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {resources.map((url, idx) => {
                                            const filename = decodeURIComponent(url.split('/').pop()?.split('?')[0] ?? '') || `Document ${idx + 1}`;
                                            return (
                                                <div key={idx} className="bg-white rounded-xl border border-gray-200 hover:border-[#021d49] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                                                    <div className="bg-gradient-to-r from-[#021d49]/5 to-blue-50 px-5 py-4 flex items-start gap-3">
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
                                    <div className="mt-6 pt-5 border-t border-gray-200 bg-white/60 rounded-lg px-4 py-3 text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-blue-500 font-bold shrink-0">ℹ</span>
                                        <span>Click <strong className="text-gray-800">"Open"</strong> to read in a new tab, or <strong className="text-gray-800">"Download"</strong> to save to your device.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-6">
                            {/* Cover Image Card */}
                            {report.image && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <button onClick={() => setImageModalOpen(true)} className="relative w-full group block" title="Click to view full-size">
                                        <img src={report.image} alt={report.title} className="w-full object-contain max-h-64 bg-[#021d49]" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                            <div className="bg-white/90 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <ZoomIn className="w-5 h-5 text-gray-900" />
                                            </div>
                                        </div>
                                    </button>
                                    <p className="text-xs text-center text-gray-400 py-2 px-3 border-t border-gray-100">Click image to enlarge</p>
                                </div>
                            )}

                            {/* Report Info */}
                            <div className="bg-gradient-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-sm p-6 text-white">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" /> Report Information
                                </h3>
                                <div className="space-y-3 text-sm">
                                    {report.year && <div><p className="text-white/60 text-xs uppercase tracking-wide">Year</p><p className="font-bold text-lg">{report.year}</p></div>}
                                    {report.category && <div><p className="text-white/60 text-xs uppercase tracking-wide">Category</p><p className="font-semibold">{report.category}</p></div>}
                                    {report.date && <div><p className="text-white/60 text-xs uppercase tracking-wide">Published</p><p className="font-semibold">{new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p></div>}
                                    {resources.length > 0 && <div><p className="text-white/60 text-xs uppercase tracking-wide">Resources</p><p className="font-semibold">{resources.length} file{resources.length > 1 ? 's' : ''} available</p></div>}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button onClick={() => router.back()} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#021d49] text-white rounded-lg hover:bg-[#032a5e] transition-colors text-sm font-semibold">
                                        <ArrowLeft className="w-4 h-4" /> All Reports
                                    </button>
                                    {resources.length > 0 && (
                                        <a href="#resources" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-semibold">
                                            <FileText className="w-4 h-4" /> View Resources
                                        </a>
                                    )}
                                    <button onClick={() => navigator.share?.({ title: report.title, url: window.location.href })} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-semibold">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button onClick={() => router.back()} className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl hover:bg-[#032a5e] transition-colors shadow-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Annual Reports
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AnnualReportDetailPage;
