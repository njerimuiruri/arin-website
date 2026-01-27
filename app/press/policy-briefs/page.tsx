"use client";
import React, { useState, useEffect } from 'react';
import { policyBriefsService } from '@/services/policyBriefsService';
import { FileText, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, Lightbulb } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const PolicyBriefsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const briefsPerPage = 6;
    const [briefs, setBriefs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBriefs = async () => {
            try {
                const data = await policyBriefsService.getAll();
                setBriefs(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBriefs();
    }, []);

    // Dynamically get categories from briefs
    const categories = ['All', ...Array.from(new Set(briefs.map(b => b.category).filter(Boolean)))];

    const filteredBriefs = briefs.filter(brief => {
        const matchesSearch = (brief.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (brief.excerpt || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || brief.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastBrief = currentPage * briefsPerPage;
    const indexOfFirstBrief = indexOfLastBrief - briefsPerPage;
    const currentBriefs = filteredBriefs.slice(indexOfFirstBrief, indexOfLastBrief);
    const totalPages = Math.ceil(filteredBriefs.length / briefsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBriefClick = (briefId) => {
        // TODO: Replace with Next.js router navigation
        window.location.href = `/press/policy-briefs/${briefId}`;
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Lightbulb className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Policy{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Briefs
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Evidence-based policy recommendations and insights to inform decision-making and drive sustainable development across Africa
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#46a1bb] mb-1">{briefs.length}</div>
                                <p className="text-sm text-gray-600">Policy Briefs</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">{briefs.length}</div>
                                <p className="text-sm text-gray-600">Recent Publications</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-[#46a1bb] mb-1">{categories.length - 1}</div>
                                <p className="text-sm text-gray-600">Topic Areas</p>
                            </div>
                        </div>
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
                                        placeholder="Search policy briefs..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Policy Briefs Grid Layout */}
                    {loading && (
                        <div className="text-center py-16">
                            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Loading policy briefs…</h3>
                        </div>
                    )}
                    {error && (
                        <div className="text-center py-16">
                            <Lightbulb className="w-12 h-12 text-red-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-red-700 mb-2">{error}</h3>
                        </div>
                    )}
                    {!loading && !error && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {currentBriefs.map((brief) => {
                                // Use image or coverImage for compatibility
                                const coverImg = brief.image || brief.coverImage;
                                // Strip HTML tags from description
                                const stripHtml = (html) => html ? html.replace(/<[^>]+>/g, '') : '';
                                const plainDesc = stripHtml(brief.description || '');
                                // Truncate to 10 words
                                const desc = plainDesc.split(' ').slice(0, 10).join(' ');
                                // Format date
                                let dateStr = '';
                                if (brief.datePosted) {
                                    const d = new Date(brief.datePosted);
                                    dateStr = d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                                }
                                return (
                                    <div
                                        key={brief._id || brief.id}
                                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group flex flex-col"
                                        onClick={() => handleBriefClick(brief._id || brief.id)}
                                    >
                                        {/* Brief Image */}
                                        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#021d49] to-[#46a1bb]">
                                            {coverImg ? (
                                                <>
                                                    <img
                                                        src={coverImg}
                                                        alt={brief.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <Lightbulb className="w-16 h-16 text-white/30" />
                                                </div>
                                            )}

                                            {/* Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 bg-white/90 text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-full shadow-lg">
                                                    Policy Brief
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            {/* Category */}
                                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3 self-start">
                                                {brief.category}
                                            </span>

                                            {/* Title */}
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-3 line-clamp-3">
                                                {brief.title}
                                            </h3>

                                            {/* Date */}
                                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                                <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                                <span>{dateStr}</span>
                                            </div>

                                            {/* Truncated Description (plain text, no HTML) */}
                                            <div className="mb-4 flex-grow">
                                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                    {desc}{plainDesc.split(' ').length > 10 ? '...' : ''}
                                                </p>
                                            </div>

                                            {/* Button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleBriefClick(brief._id || brief.id); }}
                                                className="mt-auto w-full px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#46a1bb] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200"
                                            >
                                                <span>read more</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {!loading && !error && filteredBriefs.length === 0 && (
                        <div className="text-center py-16">
                            <Lightbulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No policy briefs found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredBriefs.length > 0 && totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#46a1bb] hover:text-white border border-gray-300'} transition-all duration-200`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentPage === index + 1
                                        ? 'bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#46a1bb] hover:text-white border border-gray-300'} transition-all duration-200`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </section>

                {/* Why Explore ARIN Policy Briefs Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Explore ARIN Policy Briefs?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <Lightbulb className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Evidence-Based Policy</h3>
                                <p className="text-gray-300 text-sm">Access research-backed policy recommendations for decision-makers</p>
                            </div>
                            <div className="text-center">
                                <FileText className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Practical Insights</h3>
                                <p className="text-gray-300 text-sm">Get actionable insights on complex policy challenges facing Africa</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Timely Analysis</h3>
                                <p className="text-gray-300 text-sm">Stay informed on current policy debates and emerging issues</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            ARIN's policy briefs translate cutting-edge research into clear, actionable recommendations that inform policy dialogue and drive positive change across the continent.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PolicyBriefsPage;