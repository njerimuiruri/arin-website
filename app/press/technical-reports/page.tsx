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
import { FileText, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, User, BookOpen, Download, TrendingUp, LayoutList, LayoutGrid } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { cleanHtmlContent } from '@/lib/htmlUtils';
import Footer from '@/app/footer/Footer';

const TechnicalReportsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [reports, setReports] = useState<TechnicalReport[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 6;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

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

    const categories = ['All', ...Array.from(new Set(reports.map(r => r.category).filter(Boolean)))] as string[];

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filteredReports = reports.filter((report) => {
        const matchesSearch = (report.title ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (report.excerpt ?? '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || report.category === selectedCategory;
        const matchesDate = !report.datePosted || new Date(report.datePosted) <= today;
        return matchesSearch && matchesCategory && matchesDate;
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

                    <div className="relative max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">
                                    Technical Reports
                                </h1>
                                <p className="text-sm text-blue-100 mt-1">
                                    Comprehensive technical documentation and research insights from ARIN's initiatives
                                </p>
                            </div>

                            {/* Search */}
                            <div className="w-full md:max-w-sm">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search technical reports..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#021d49] focus:outline-none transition-all text-gray-800 text-sm"
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

                    {/* Results Counter + View Toggle */}
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {filteredReports.length === 0 ? 'No reports found' : `${filteredReports.length} ${filteredReports.length === 1 ? 'Report' : 'Reports'} Found`}
                        </h2>
                        <div className="flex items-center gap-3">
                            {filteredReports.length > 0 && (
                                <p className="text-sm text-gray-500">
                                    Showing {indexOfFirstReport + 1}–{Math.min(indexOfLastReport, filteredReports.length)} of {filteredReports.length}
                                </p>
                            )}
                            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                                <button
                                    onClick={() => setViewMode('list')}
                                    title="List view"
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-[#021d49] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <LayoutList className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    title="Grid view"
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[#021d49] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Grid view */}
                    {viewMode === 'grid' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentReports.map((report) => (
                                <div
                                    key={report._id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#021d49] cursor-pointer group flex flex-col"
                                    onClick={() => handleReportClick(report._id)}
                                >
                                    <div className="relative h-52 overflow-hidden flex-shrink-0">
                                        {report.image ? (
                                            <>
                                                <img src={report.image} alt={report.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#021d49] to-[#032a5e]">
                                                <BookOpen className="w-16 h-16 text-white/20" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3">
                                            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-lg shadow-lg">
                                                {report.category || 'Technical Report'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex flex-col flex-1">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-2 line-clamp-2">{report.title}</h3>
                                            <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-500">
                                                {report.postedBy && <div className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#021d49]" /><span>{report.postedBy}</span></div>}
                                                {report.postedDate && <div className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#021d49]" /><span>{report.postedDate}</span></div>}
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                                {report.description ? (() => { const plain = cleanHtmlContent(report.description).replace(/<[^>]+>/g, ''); const words = plain.split(/\s+/); return words.slice(0, 25).join(' ') + (words.length > 25 ? '...' : ''); })() : ''}
                                            </p>
                                        </div>
                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                            <button onClick={(e) => { e.stopPropagation(); handleReportClick(report._id); }} className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#021d49] to-[#032a5e] hover:from-[#032a5e] hover:to-[#021d49] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-sm">
                                                <FileText className="w-4 h-4" /><span>Read Report</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* List view */}
                    {viewMode === 'list' && (
                        <div className="space-y-3">
                            {currentReports.map((report) => (
                                <div
                                    key={report._id}
                                    onClick={() => handleReportClick(report._id)}
                                    className="bg-white rounded-xl border border-gray-100 hover:border-[#021d49] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-4 p-4 group"
                                >
                                    {/* Thumbnail */}
                                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                        {report.image ? (
                                            <img src={report.image} alt={report.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-[#021d49] to-[#032a5e] flex items-center justify-center">
                                                <BookOpen className="w-7 h-7 text-white/30" />
                                            </div>
                                        )}
                                    </div>
                                    {/* Meta + content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="px-2 py-0.5 bg-[#021d49]/10 text-[#021d49] text-xs font-bold uppercase tracking-wide rounded">
                                                {report.category || 'Technical Report'}
                                            </span>
                                            {report.postedDate && (
                                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                                    <Calendar className="w-3 h-3" /> {report.postedDate}
                                                </span>
                                            )}
                                            {report.postedBy && (
                                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                                    <User className="w-3 h-3" /> {report.postedBy}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-snug line-clamp-1 mb-1">
                                            {report.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 line-clamp-1">
                                            {report.description ? cleanHtmlContent(report.description).replace(/<[^>]+>/g, '').split(/\s+/).slice(0, 20).join(' ') + '...' : ''}
                                        </p>
                                    </div>
                                    {/* CTA */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleReportClick(report._id); }}
                                        className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#021d49] hover:bg-[#032a5e] text-white text-sm font-semibold rounded-lg transition-colors"
                                    >
                                        Read <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

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
            <Footer />
        </>
    );
};

export default TechnicalReportsPage;