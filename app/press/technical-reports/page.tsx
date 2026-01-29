"use client";
import React, { useState, useEffect } from 'react';

type TechnicalReport = {
    _id?: string;
    title: string;
    authors?: string[];
    description: string;
    image?: string;
    datePosted?: string;
    availableResources?: string[];
    year?: number;
    category?: string;
    excerpt?: string;
    postedBy?: string;
    postedDate?: string;
};
import { FileText, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, User, BookOpen, Download, TrendingUp } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { cleanHtmlContent } from '@/lib/htmlUtils';

const TechnicalReportsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [reports, setReports] = useState<TechnicalReport[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 6;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        import('@/services/technicalReportsService').then(({ technicalReportsService }) => {
            technicalReportsService.getAll()
                .then(data => {
                    setReports(data);
                    setError(null);
                })
                .catch(err => setError(err.message || 'Failed to fetch technical reports'))
                .finally(() => setLoading(false));
        });
    }, []);

    const categories = ['All', 'Technical Reports', 'Workshop Reports', 'Webinar Reports'];

    const filteredReports = reports.filter((report) => {
        const matchesSearch = (report.title ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.excerpt ?? '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
        return matchesSearch && matchesCategory;
    }).sort((a, b) => {
        const dateA = a.datePosted ? new Date(a.datePosted).getTime() : 0;
        const dateB = b.datePosted ? new Date(b.datePosted).getTime() : 0;
        return dateB - dateA;
    });

    // Pagination logic
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleReportClick = (reportId: string | undefined) => {
        if (!reportId) return;
        window.location.href = `/press/technical-reports/${reportId}`;
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50 min-h-screen">
                {/* Hero Section - Compact */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-6 py-12">
                        <div className="text-center">
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-3">
                                Technical Reports
                            </h1>

                            <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                                Comprehensive technical documentation and research insights from ARIN's initiatives
                            </p>

                            {/* Search Only */}
                            <div className="max-w-2xl mx-auto">
                                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-2xl">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search technical reports..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#021d49] focus:outline-none transition-all text-gray-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reports List - Improved Layout */}
                <section className="max-w-7xl mx-auto px-6 py-12">
                    {/* Category Filter Tabs */}
                    <div className="mb-8 flex flex-wrap gap-3 justify-center">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setCurrentPage(1);
                                }}
                                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-gradient-to-r from-[#021d49] to-[#032a5e] text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Results Counter */}
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {filteredReports.length === 0 ? 'No reports found' : `${filteredReports.length} ${filteredReports.length === 1 ? 'Report' : 'Reports'} Found`}
                        </h2>
                        {filteredReports.length > 0 && (
                            <p className="text-sm text-gray-500">
                                Showing {indexOfFirstReport + 1}-{Math.min(indexOfLastReport, filteredReports.length)} of {filteredReports.length}
                            </p>
                        )}
                    </div>

                    <div className="space-y-6">
                        {currentReports.map((report) => (
                            <div
                                key={report._id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#021d49] cursor-pointer group"
                                onClick={() => handleReportClick(report._id)}
                            >
                                <div className="md:flex">
                                    {/* Image Section - Optimized */}
                                    <div className="md:w-5/12 relative h-56 md:h-auto overflow-hidden">
                                        {report.image ? (
                                            <>
                                                <img
                                                    src={report.image}
                                                    alt={report.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#021d49] to-[#032a5e]">
                                                <BookOpen className="w-20 h-20 text-white/20" />
                                            </div>
                                        )}

                                        {/* Floating Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-lg shadow-lg">
                                                {report.category || 'Technical Report'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="md:w-7/12 p-6 md:p-8 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-3 line-clamp-2">
                                                {report.title}
                                            </h3>

                                            {/* Metadata - Compact */}
                                            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                                                {report.postedBy && (
                                                    <div className="flex items-center gap-1.5">
                                                        <User className="w-4 h-4 text-[#021d49]" />
                                                        <span>{report.postedBy}</span>
                                                    </div>
                                                )}
                                                {report.postedDate && (
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-4 h-4 text-[#021d49]" />
                                                        <span>{report.postedDate}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                                {report.description
                                                    ? (() => {
                                                        const plain = cleanHtmlContent(report.description).replace(/<[^>]+>/g, '');
                                                        const words = plain.split(/\s+/);
                                                        return words.slice(0, 35).join(' ') + (words.length > 35 ? '...' : '');
                                                    })()
                                                    : ''}
                                            </p>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleReportClick(report._id); }}
                                                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#021d49] to-[#032a5e] hover:from-[#032a5e] hover:to-[#021d49] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                                            >
                                                <FileText className="w-4 h-4" />
                                                <span>Read Report</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredReports.length === 0 && (
                        <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <BookOpen className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Reports Found</h3>
                            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                                className="px-6 py-2.5 bg-[#021d49] text-white font-semibold rounded-lg hover:bg-[#032a5e] transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredReports.length > 0 && totalPages > 1 && (
                        <div className="mt-10 flex justify-center items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2.5 rounded-lg transition-all duration-200 ${currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white shadow-sm hover:shadow-md border border-gray-200'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`min-w-[40px] px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${currentPage === index + 1
                                            ? 'bg-gradient-to-r from-[#021d49] to-[#032a5e] text-white shadow-md scale-105'
                                            : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2.5 rounded-lg transition-all duration-200 ${currentPage === totalPages
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white shadow-sm hover:shadow-md border border-gray-200'
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </section>

                {/* Why Explore Section - More Visual */}
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <div className="bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] rounded-2xl overflow-hidden shadow-2xl relative">
                        {/* Decorative Background */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full filter blur-3xl"></div>
                            <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-400 rounded-full filter blur-3xl"></div>
                        </div>

                        <div className="relative p-10 md:p-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                                Why Explore ARIN Technical Reports?
                            </h2>
                            <p className="text-blue-100 text-center max-w-2xl mx-auto mb-10">
                                Access comprehensive insights and detailed analysis from Africa's leading research initiatives
                            </p>

                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                    <div className="bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                        <BookOpen className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Detailed Documentation</h3>
                                    <p className="text-blue-100 text-sm leading-relaxed">
                                        Access comprehensive technical documentation and proven methodologies from our research
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                    <div className="bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                        <FileText className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Event Insights</h3>
                                    <p className="text-blue-100 text-sm leading-relaxed">
                                        Get detailed reports from workshops, webinars, and stakeholder dialogues
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                                    <div className="bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                        <TrendingUp className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Latest Updates</h3>
                                    <p className="text-blue-100 text-sm leading-relaxed">
                                        Stay informed on the progress of key ARIN initiatives and research findings
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default TechnicalReportsPage;