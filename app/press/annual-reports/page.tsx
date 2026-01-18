"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, FileText, Download, Search, Filter, User, Loader } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getAnnualReports } from '@/services/annualReportsService';
import type { AnnualReport } from '@/services/annualReportsService';

const AnnualReportsPage = () => {
    const router = useRouter();
    const [reports, setReports] = useState<AnnualReport[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');
    const [years, setYears] = useState<string[]>(['All']);

    // Fetch reports on mount
    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const data = await getAnnualReports();
                setReports(data);

                // Extract unique years from reports
                const uniqueYears = ['All', ...new Set(data.map(r => r.year).filter(Boolean))].sort((a, b) => {
                    if (a === 'All') return -1;
                    if (b === 'All') return 1;
                    return b.localeCompare(a); // Descending order
                });
                setYears(uniqueYears);
            } catch (error) {
                console.error('Failed to fetch annual reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const filteredReports = reports.filter(report => {
        const matchesSearch = 
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.description && report.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesYear = selectedYear === 'All' || report.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    const handleReportClick = (reportId: string) => {
        router.push(`/press/annual-reports/${reportId}`);
    };

    const handleDownloadPDF = (e: React.MouseEvent, reportId: string, title: string) => {
        e.stopPropagation();
        const report = reports.find(r => r._id === reportId);
        if (report?.availableResources && report.availableResources.length > 0) {
            const pdfUrl = report.availableResources[0];
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${title}.pdf`;
            link.target = '_blank';
            link.click();
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FileText className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Annual{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Reports
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Explore ARIN's journey of impact, innovation, and achievement through our comprehensive annual reports
                        </p>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search annual reports..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Year Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader className="w-8 h-8 text-[#46a1bb] animate-spin mb-3" />
                            <p className="text-gray-600">Loading annual reports...</p>
                        </div>
                    )}

                    {/* Reports Grid */}
                    {!loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {filteredReports.map((report) => (
                            <div
                                key={report._id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleReportClick(report._id)}
                            >
                                {/* Report Image */}
                                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                                    {report.image ? (
                                        <img
                                            src={report.image}
                                            alt={report.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                            }}
                                        />
                                    ) : null}
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                                    {/* Year Badge - Top Left */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-lg uppercase tracking-wide rounded-lg shadow-xl">
                                            {report.year}
                                        </span>
                                    </div>

                                    {/* Download Button - Top Right */}
                                    {report.availableResources && report.availableResources.length > 0 && (
                                    <button
                                        onClick={(e) => handleDownloadPDF(e, report._id, report.title)}
                                        className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg group/download"
                                        aria-label="Download PDF"
                                    >
                                        <Download className="w-5 h-5 text-[#46a1bb] group-hover/download:scale-110 transition-transform" />
                                    </button>
                                    )}

                                    {/* Title on Image - Bottom */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-bold text-white leading-tight">
                                            {report.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Date */}
                                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                        <span>{new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>

                                    {/* Description/Excerpt */}
                                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                        {report.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                            Annual Reports
                                        </span>
                                        {report.category && (
                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                            {report.category}
                                        </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleReportClick(report._id); }}
                                            className="px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <span>View</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        {report.availableResources && report.availableResources.length > 0 && (
                                        <button
                                            onClick={(e) => handleDownloadPDF(e, report._id, report.title)}
                                            className="px-4 py-3 bg-white border-2 border-[#46a1bb] text-[#46a1bb] font-semibold rounded-lg hover:bg-[#46a1bb] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>PDF</span>
                                        </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    )}

                    {/* No Results Message */}
                    {!loading && filteredReports.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No annual reports found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>


            </div>

        </>
    );
};

export default AnnualReportsPage;