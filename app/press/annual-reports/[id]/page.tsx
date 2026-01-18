"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Download, FileText, Loader } from 'lucide-react';
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
            className="html-content"
            style={{
                fontSize: '16px',
                lineHeight: '1.8',
                color: '#4b5563',
                wordWrap: 'break-word',
                overflowWrap: 'break-word',
            }}
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
                <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <Loader className="w-8 h-8 text-[#46a1bb] animate-spin" />
                        <p className="text-gray-600">Loading annual report...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !report) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <button 
                            onClick={() => router.back()} 
                            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft size={20} /> Back
                        </button>
                        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
                            {error || 'Annual report not found'}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* Back Button */}
                    <button 
                        onClick={() => router.back()} 
                        className="flex items-center gap-2 mb-8 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Annual Reports
                    </button>

                    {/* Main Content */}
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Cover Image */}
                        {report.image && (
                            <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                                <img
                                    src={report.image}
                                    alt={report.title}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            </div>
                        )}

                        {/* Content Area */}
                        <div className="p-8 lg:p-12">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-4 py-2 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold rounded-lg">
                                        {report.year}
                                    </span>
                                    {report.category && (
                                        <span className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg">
                                            {report.category}
                                        </span>
                                    )}
                                </div>
                                
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    {report.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex items-center gap-6 text-gray-600 border-t border-b border-gray-200 py-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-[#46a1bb]" />
                                        <span>
                                            {new Date(report.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {report.description && (
                                <div className="mb-12">
                                    {/* Debug: Check content type */}
                                    {typeof report.description === 'string' && report.description.includes('<') ? (
                                        <HtmlRenderer content={report.description} />
                                    ) : (
                                        <p className="text-gray-700 whitespace-pre-wrap">{report.description}</p>
                                    )}
                                </div>
                            )}

                            {/* Available Resources */}
                            {report.availableResources && report.availableResources.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <FileText className="w-6 h-6 text-[#46a1bb]" />
                                        Available Resources
                                    </h2>
                                    <div className="space-y-3">
                                        {report.availableResources.map((resource, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleDownloadPDF(resource, `${report.title}-resource-${index + 1}`)}
                                                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-[#46a1bb] rounded-lg hover:shadow-md transition-all duration-200 group"
                                            >
                                                <Download className="w-5 h-5 text-[#46a1bb] group-hover:scale-110 transition-transform" />
                                                <span className="flex-1 text-left">
                                                    <span className="text-gray-800 font-semibold">{report.title} Resource</span>
                                                    <span className="text-sm text-gray-600 block">Click to download PDF</span>
                                                </span>
                                                <FileText className="w-5 h-5 text-gray-400" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </article>
                </div>
            </div>
        </>
    );
};

export default AnnualReportDetailPage;
