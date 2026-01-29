"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Download, FileText, Loader, Share2, BookOpen, ExternalLink } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getAnnualReport } from '@/services/annualReportsService';
import { cleanHtmlContent } from '@/lib/htmlUtils';
import type { AnnualReport } from '@/services/annualReportsService';

interface HtmlRendererProps {
    content: string;
}

// Simple HTML Renderer Component with proper styling
const HtmlRenderer: React.FC<HtmlRendererProps> = ({ content }) => {
    const cleanedContent = cleanHtmlContent(content);

    return (
        <div
            className="html-content prose prose-lg max-w-none
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
            dangerouslySetInnerHTML={{ __html: cleanedContent }}
        />
    );
};

const AnnualReportDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [report, setReport] = useState<AnnualReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const data = await getAnnualReport(id);
                if (!data) {
                    setError('Annual report not found');
                } else {
                    setReport(data);
                }
            } catch (err) {
                console.error('Failed to fetch annual report:', err);
                setError('Failed to load annual report');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleDownloadPDF = (url: string, title: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title}.pdf`;
        link.target = '_blank';
        link.click();
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading annual report...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !report) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50 flex items-center justify-center px-4">
                    <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <BookOpen className="w-10 h-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h2>
                        <p className="text-gray-600 mb-6">The annual report you're looking for doesn't exist or has been removed.</p>
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

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50">
                {/* Hero Image Section - Full Width */}
                {report.image && (
                    <div className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden bg-gray-900">
                        <img
                            src={report.image}
                            alt={report.title}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                            }}
                        />
                        {/* Balanced Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>

                        {/* Content Overlay - Centered */}
                        <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
                            <div className="max-w-5xl w-full text-center">
                                {/* Year and Category Badges */}
                                <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
                                    <span className="inline-block px-5 py-2.5 bg-white text-[#021d49] font-bold text-sm uppercase tracking-wider rounded-lg shadow-xl">
                                        📊 {report.year}
                                    </span>
                                    {report.category && (
                                        <span className="inline-block px-5 py-2.5 bg-blue-500 text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-xl">
                                            {report.category}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
                                    {report.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-white">
                                    {report.date && (
                                        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-lg shadow-lg border border-white/20">
                                            <Calendar className="w-5 h-5" />
                                            <span className="font-semibold">
                                                {new Date(report.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    )}
                                </div>
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
                {!report.image && (
                    <div className="relative bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white py-20">
                        <div className="max-w-5xl mx-auto px-6">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back
                            </button>

                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wide rounded-lg">
                                    📊 {report.year}
                                </span>
                                {report.category && (
                                    <span className="inline-block px-4 py-2 bg-blue-500/80 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wide rounded-lg">
                                        {report.category}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {report.title}
                            </h1>

                            {report.date && (
                                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg inline-flex">
                                    <Calendar className="w-5 h-5" />
                                    <span className="font-medium">
                                        {new Date(report.date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Main Content - Full Width */}
                <div className="px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-4 gap-8">
                            {/* Main Content Column - Takes 3/4 of the space */}
                            <div className="lg:col-span-3">
                                {/* Description Section */}
                                {report.description && (
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mb-8">
                                        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                                            <div className="bg-[#021d49]/10 p-3 rounded-lg">
                                                <BookOpen className="w-6 h-6 text-[#021d49]" />
                                            </div>
                                            <h2 className="text-2xl font-bold text-gray-900">Report Overview</h2>
                                        </div>

                                        {typeof report.description === 'string' && report.description.includes('<') ? (
                                            <HtmlRenderer content={report.description} />
                                        ) : (
                                            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-justify">
                                                {report.description}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Available Resources Section */}
                                {report.availableResources && report.availableResources.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                                            <div className="bg-green-100 p-2 rounded-lg">
                                                <Download className="w-5 h-5 text-green-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Available Resources</h3>
                                        </div>

                                        <div className="space-y-3">
                                            {report.availableResources.map((resource, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleDownloadPDF(resource, `${report.title}-resource-${index + 1}`)}
                                                    className="w-full flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-gray-50 to-green-50/50 hover:from-[#021d49] hover:to-[#032a5e] border border-gray-200 hover:border-[#021d49] rounded-xl transition-all duration-300 group"
                                                >
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-white/20 transition-colors">
                                                            <FileText className="w-4 h-4 text-[#021d49] group-hover:text-white transition-colors" />
                                                        </div>
                                                        <div className="flex-1 min-w-0 text-left">
                                                            <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors block truncate">
                                                                {report.title} - Resource {index + 1}
                                                            </span>
                                                            <span className="text-xs text-gray-500 group-hover:text-white/80 transition-colors">
                                                                Click to download PDF
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - Takes 1/4 of the space */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-6 space-y-6">
                                    {/* Report Info Card */}
                                    <div className="bg-gradient-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-lg p-6 text-white">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <BookOpen className="w-5 h-5" />
                                            Report Information
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Year</p>
                                                <p className="text-white font-bold text-xl">{report.year}</p>
                                            </div>

                                            {report.category && (
                                                <div>
                                                    <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Category</p>
                                                    <p className="text-white font-bold">{report.category}</p>
                                                </div>
                                            )}

                                            {report.date && (
                                                <div>
                                                    <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Published</p>
                                                    <p className="text-white font-bold">
                                                        {new Date(report.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </p>
                                                </div>
                                            )}

                                            {report.availableResources && report.availableResources.length > 0 && (
                                                <div>
                                                    <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Resources</p>
                                                    <p className="text-white font-bold">
                                                        {report.availableResources.length} file{report.availableResources.length > 1 ? 's' : ''} available
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick Actions Card */}
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Share2 className="w-5 h-5 text-[#021d49]" />
                                            Quick Actions
                                        </h3>

                                        <div className="space-y-3">
                                            <button
                                                onClick={() => window.print()}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#032a5e] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Print Report
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: report.title,
                                                            text: 'Check out this annual report from ARIN',
                                                            url: window.location.href,
                                                        });
                                                    }
                                                }}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all"
                                            >
                                                <Share2 className="w-4 h-4" />
                                                Share Report
                                            </button>
                                        </div>
                                    </div>

                                    {/* Download All Card */}
                                    {report.availableResources && report.availableResources.length > 1 && (
                                        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-6">
                                            <div className="flex items-start gap-3">
                                                <Download className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                                                <div>
                                                    <h4 className="font-bold text-green-900 mb-1">Multiple Resources</h4>
                                                    <p className="text-sm text-green-800">
                                                        {report.availableResources.length} files are available for download below.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
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
                                Back to Annual Reports
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AnnualReportDetailPage;