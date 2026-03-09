"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, FileText, Download, Search, Filter, Loader } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getAnnualReports } from '@/services/annualReportsService';
import type { AnnualReport } from '@/services/annualReportsService';
import Footer from '@/app/footer/Footer';

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

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filteredReports = reports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.description && report.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesYear = selectedYear === 'All' || report.year === selectedYear;
        const matchesDate = !report.date || new Date(report.date) <= today;
        return matchesSearch && matchesYear && matchesDate;
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
            <div className="w-full bg-linear-to-br from-slate-50 via-white to-stone-50 min-h-screen">

                {/* Compact Dark Navy Hero Banner */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                    <div className="relative max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">Annual Reports</h1>
                                <p className="text-sm text-blue-100 mt-1">Explore ARIN's journey of impact, innovation, and achievement through our comprehensive annual reports</p>
                            </div>
                            <div className="w-full md:max-w-sm">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search annual reports..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#021d49] focus:outline-none transition-all text-gray-800 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Slim Filter Bar */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <Filter className="w-4 h-4" />
                            <span>Filter by Year:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${selectedYear === year
                                        ? 'bg-[#021d49] text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-16">
                            <Loader className="w-8 h-8 text-[#021d49] animate-spin mb-3" />
                            <p className="text-gray-600">Loading annual reports...</p>
                        </div>
                    )}

                    {/* Reports Grid - 3 columns */}
                    {!loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredReports.map((report) => (
                                <div
                                    key={report._id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#021d49] cursor-pointer group flex flex-col"
                                    onClick={() => handleReportClick(report._id)}
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden shrink-0">
                                        {report.image ? (
                                            <>
                                                <img
                                                    src={report.image}
                                                    alt={report.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#021d49] to-[#032a5e]">
                                                <FileText className="w-16 h-16 text-white/20" />
                                            </div>
                                        )}
                                        {/* Year Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-lg shadow-lg">
                                                {report.year}
                                            </span>
                                        </div>
                                        {/* Download Button */}
                                        {report.availableResources && report.availableResources.length > 0 && (
                                            <button
                                                onClick={(e) => handleDownloadPDF(e, report._id, report.title)}
                                                className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg group/download"
                                                aria-label="Download PDF"
                                            >
                                                <Download className="w-4 h-4 text-[#021d49] group-hover/download:scale-110 transition-transform" />
                                            </button>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-2">
                                            {report.title}
                                        </h3>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 text-[#021d49]" />
                                            <span>{new Date(report.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                        </div>

                                        {/* Description */}
                                        <div
                                            className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1"
                                            dangerouslySetInnerHTML={{ __html: report.description }}
                                        />

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                                Annual Reports
                                            </span>
                                            {report.category && (
                                                <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                                    {report.category}
                                                </span>
                                            )}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-2 gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleReportClick(report._id); }}
                                                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-[#021d49] to-[#032a5e] text-white font-semibold rounded-lg shadow-md text-sm"
                                            >
                                                View <ArrowRight className="w-4 h-4" />
                                            </button>
                                            {report.availableResources && report.availableResources.length > 0 && (
                                                <button
                                                    onClick={(e) => handleDownloadPDF(e, report._id, report.title)}
                                                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border-2 border-[#021d49] text-[#021d49] font-semibold rounded-lg text-sm hover:bg-[#021d49] hover:text-white transition-all duration-200"
                                                >
                                                    <Download className="w-4 h-4" /> PDF
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
                </div>

            </div>
            <Footer />
        </>
    );
};

export default AnnualReportsPage;
