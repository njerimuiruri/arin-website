"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { technicalReportsService, TechnicalReport } from "@/services/technicalReportsService";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, FileText, User, ArrowLeft, BookOpen, Download, ExternalLink, Tag, Clock } from "lucide-react";
import Footer from "@/app/footer/Footer";

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || 'https://api.demo.arin-africa.org') + '/api';

export default function TechnicalReportDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [report, setReport] = useState<TechnicalReport | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openingIdx, setOpeningIdx] = useState<number | null>(null);

    // Route the PDF through our backend proxy so there are no CORS issues
    // and the browser always receives a proper application/pdf response.
    const buildProxyUrl = (cloudinaryUrl: string, download = false) => {
        const encoded = encodeURIComponent(cloudinaryUrl);
        return `${API_BASE_URL}/technical-reports/resource-proxy?url=${encoded}${download ? '&download=true' : ''}`;
    };

    const openPdf = (url: string, idx: number) => {
        setOpeningIdx(idx);
        const proxyUrl = buildProxyUrl(url);
        const tab = window.open(proxyUrl, '_blank');
        if (!tab) {
            // Popup blocked — navigate in the current tab
            window.location.href = proxyUrl;
        }
        setOpeningIdx(null);
    };

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        technicalReportsService.getById(id)
            .then(data => {
                setReport(data);
                setError(null);
            })
            .catch(err => setError(err.message || "Failed to load report"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
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
    }

    if (error || !report) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                    <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full">
                        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-red-400" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Report Not Found</h2>
                        <p className="text-gray-500 text-sm mb-6">
                            The technical report you are looking for does not exist or has been removed.
                        </p>
                        <button
                            onClick={() => window.location.href = '/press/technical-reports'}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-lg hover:bg-[#032a5e] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Reports
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // Normalise: ensure it's always a flat array of non-empty strings
    const resources: string[] = Array.isArray(report.availableResources)
        ? (report.availableResources as unknown[])
            .map(r => (typeof r === 'string' ? r : String(r ?? '')))
            .filter(r => r.trim().length > 0)
        : [];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* ── Cover Image ── */}
                {report.image && (
                    <div className="w-full bg-[#021d49]">
                        <div className="max-w-7xl mx-auto">
                            <img
                                src={report.image}
                                alt={report.title}
                                className="w-full max-h-[480px] object-cover object-center"
                            />
                        </div>
                    </div>
                )}

                {/* ── Title Band ── */}
                <div className="bg-[#021d49] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-8">
                        {/* Back link */}
                        <button
                            onClick={() => window.location.href = '/press/technical-reports'}
                            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-5 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            All Technical Reports
                        </button>

                        {/* Category badge */}
                        {report.category && (
                            <span className="inline-block px-3 py-1 bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
                                {report.category}
                            </span>
                        )}

                        <h1 className="text-2xl md:text-4xl font-bold leading-snug mb-5 max-w-4xl">
                            {report.title}
                        </h1>

                        {/* Meta row */}
                        <div className="flex flex-wrap gap-4 text-sm text-white/75">
                            {report.authors && report.authors.length > 0 && (
                                <span className="flex items-center gap-1.5">
                                    <User className="w-4 h-4" />
                                    {report.authors.join(", ")}
                                </span>
                            )}
                            {report.datePosted && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(report.datePosted).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric',
                                    })}
                                </span>
                            )}
                            {report.year && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    {report.year}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Body ── */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-3 gap-8 items-start">

                        {/* ── Main content (left, 2/3) ── */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
                                    <div className="bg-[#021d49]/8 p-2.5 rounded-lg">
                                        <BookOpen className="w-5 h-5 text-[#021d49]" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Report Content</h2>
                                </div>

                                <div
                                    className="prose prose-base max-w-none
                                        prose-headings:text-gray-900 prose-headings:font-bold
                                        prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
                                        prose-a:text-[#021d49] prose-a:no-underline hover:prose-a:underline
                                        prose-strong:text-gray-900
                                        prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-5
                                        prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-5
                                        prose-li:text-gray-700
                                        prose-img:rounded-xl prose-img:shadow-md prose-img:my-6 prose-img:w-full
                                        prose-blockquote:border-l-4 prose-blockquote:border-[#021d49] prose-blockquote:pl-5
                                        prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50
                                        prose-blockquote:py-2 prose-blockquote:my-5"
                                    dangerouslySetInnerHTML={{ __html: report.description }}
                                />
                            </div>
                        </div>

                        {/* ── Sidebar (right, 1/3) ── */}
                        <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-6">

                            {/* Report Info */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                    Report Details
                                </h3>
                                <dl className="space-y-3 text-sm">
                                    {report.category && (
                                        <div className="flex items-start gap-3">
                                            <Tag className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <dt className="text-gray-500 text-xs uppercase tracking-wide">Category</dt>
                                                <dd className="text-gray-900 font-medium mt-0.5">{report.category}</dd>
                                            </div>
                                        </div>
                                    )}
                                    {report.year && (
                                        <div className="flex items-start gap-3">
                                            <Clock className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <dt className="text-gray-500 text-xs uppercase tracking-wide">Year</dt>
                                                <dd className="text-gray-900 font-medium mt-0.5">{report.year}</dd>
                                            </div>
                                        </div>
                                    )}
                                    {report.datePosted && (
                                        <div className="flex items-start gap-3">
                                            <Calendar className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <dt className="text-gray-500 text-xs uppercase tracking-wide">Published</dt>
                                                <dd className="text-gray-900 font-medium mt-0.5">
                                                    {new Date(report.datePosted).toLocaleDateString('en-US', {
                                                        year: 'numeric', month: 'long', day: 'numeric',
                                                    })}
                                                </dd>
                                            </div>
                                        </div>
                                    )}
                                    {report.authors && report.authors.length > 0 && (
                                        <div className="flex items-start gap-3">
                                            <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                            <div>
                                                <dt className="text-gray-500 text-xs uppercase tracking-wide">
                                                    {report.authors.length === 1 ? 'Author' : 'Authors'}
                                                </dt>
                                                <dd className="text-gray-900 font-medium mt-0.5">
                                                    {report.authors.join(", ")}
                                                </dd>
                                            </div>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* Available Resources */}
                            {resources.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                        Available Resources
                                    </h3>

                                    <div className="space-y-3">
                                        {resources.map((url, idx) => {
                                            const raw = typeof url === 'string' ? url : '';
                                            const filename = decodeURIComponent(
                                                raw.split('/').pop()?.split('?')[0] ?? ''
                                            ) || `Document ${idx + 1}`;

                                            // Route through backend proxy — avoids CORS and ensures
                                            // the browser receives a proper application/pdf response.
                                            const viewProxyUrl = buildProxyUrl(raw);
                                            const downloadProxyUrl = buildProxyUrl(raw, true);

                                            return (
                                                <div
                                                    key={idx}
                                                    className="border border-gray-200 rounded-xl overflow-hidden"
                                                >
                                                    {/* File info row */}
                                                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
                                                        <div className="w-9 h-9 bg-red-50 rounded-lg flex items-center justify-center shrink-0">
                                                            <FileText className="w-4 h-4 text-red-500" />
                                                        </div>
                                                        <span
                                                            className="text-sm font-medium text-gray-800 truncate flex-1"
                                                            title={filename}
                                                        >
                                                            {filename}
                                                        </span>
                                                    </div>

                                                    {/* Action row */}
                                                    <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
                                                        {/* Open inline via proxy */}
                                                        <button
                                                            onClick={() => openPdf(raw, idx)}
                                                            disabled={openingIdx === idx}
                                                            className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-[#021d49] hover:bg-[#021d49] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-wait"
                                                        >
                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                            {openingIdx === idx ? 'Opening…' : 'Open'}
                                                        </button>

                                                        {/* Download via proxy */}
                                                        <a
                                                            href={downloadProxyUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
                                                        >
                                                            <Download className="w-3.5 h-3.5" />
                                                            Download
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Back button */}
                    <div className="mt-10 pt-8 border-t border-gray-200">
                        <button
                            onClick={() => window.location.href = '/press/technical-reports'}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white text-sm font-semibold rounded-xl hover:bg-[#032a5e] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to All Reports
                        </button>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
}
