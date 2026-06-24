"use client";
import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, Users, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getNewsBriefs } from '@/services/newsBriefsService';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

interface NewsBrief {
    _id?: string;
    title?: string;
    description?: string;
    authors?: string[];
    category?: string;
    image?: string;
    datePosted?: string;
}

const NewsBriefsPage = () => {
    const [newsBriefs, setNewsBriefs] = useState<NewsBrief[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const briefsPerPage = 6;
    const router = useRouter();

    useEffect(() => {
        async function fetchBriefs() {
            setLoading(true);
            const data = await getNewsBriefs();
            const sorted = [...data].sort((a: NewsBrief, b: NewsBrief) => {
                const dateA = a.datePosted ? new Date(a.datePosted).getTime() : 0;
                const dateB = b.datePosted ? new Date(b.datePosted).getTime() : 0;
                return dateB - dateA;
            });
            setNewsBriefs(sorted);
            setLoading(false);
        }
        fetchBriefs();
    }, []);

    const knownCategories = ['Friday Reviews', 'Briefs', 'Climate', 'Energy', 'Agriculture', 'Governance', 'Health', 'Biodiversity'];
    const dynamicCategories = knownCategories.filter((c) =>
        newsBriefs.some((b: NewsBrief) => b.category === c)
    );
    const categories = ['All', ...dynamicCategories];

    // Helper to strip HTML tags
    function stripHtml(html: string) {
        if (!html) return '';
        return html.replace(/<[^>]+>/g, '');
    }

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filteredBriefs = newsBriefs.filter((brief: NewsBrief) => {
        const title = (brief.title || '').toLowerCase();
        const description = stripHtml(brief.description || '').toLowerCase();
        const authors = Array.isArray(brief.authors) ? brief.authors.join(', ').toLowerCase() : '';
        const matchesSearch = title.includes(searchTerm.toLowerCase()) ||
            description.includes(searchTerm.toLowerCase()) ||
            authors.includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (brief.category === selectedCategory);
        const matchesDate = !brief.datePosted || new Date(brief.datePosted) <= today;
        return matchesSearch && matchesCategory && matchesDate;
    });

    // Pagination logic
    const indexOfLastBrief = currentPage * briefsPerPage;
    const indexOfFirstBrief = indexOfLastBrief - briefsPerPage;
    const currentBriefs = filteredBriefs.slice(indexOfFirstBrief, indexOfLastBrief);
    const totalPages = Math.ceil(filteredBriefs.length / briefsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBriefClick = (briefId: string) => {
        if (briefId) {
            router.push(`/press/news-briefs/${briefId}`);
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold leading-tight">ARIN News Briefs</h1>
                            <p className="text-sm text-blue-100 mt-1">Stay informed with the latest updates, events, and impact stories from ARIN</p>
                        </div>
                        <div className="w-full md:max-w-sm">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search news briefs..."
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#021d49] focus:outline-none transition-all text-gray-800 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-3 flex-wrap">
                        <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${selectedCategory === category
                                    ? 'bg-[#021d49] text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                        <span className="ml-auto text-xs text-gray-500">{filteredBriefs.length} result{filteredBriefs.length !== 1 ? 's' : ''}</span>
                    </div>
                </div>
            </section>

            {/* News Briefs Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#021d49] mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading news briefs...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* 3-Column Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentBriefs.map((brief) => (
                                <div
                                    key={brief._id || brief.title}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-[#021d49] cursor-pointer group flex flex-col h-full"
                                    onClick={() => brief._id && handleBriefClick(brief._id)}
                                >
                                    {/* Brief Image */}
                                    <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#021d49] to-[#032a5e]">
                                        {(brief.image || brief.coverImage) ? (
                                            <>
                                                <img
                                                    src={brief.image || brief.coverImage}
                                                    alt={brief.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Newspaper className="w-20 h-20 text-white/20" />
                                            </div>
                                        )}

                                        {/* Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-3 py-1.5 font-bold text-xs uppercase tracking-wider rounded-full shadow-lg backdrop-blur-sm ${brief.category === 'Friday Reviews' ? 'bg-blue-500 text-white' : 'bg-white/95 text-[#021d49]'}`}>
                                                {brief.category || 'News'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                            <Calendar className="w-4 h-4 text-[#021d49]" />
                                            <span className="font-medium">
                                                {brief.datePosted ? new Date(brief.datePosted).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }) : ''}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-4 line-clamp-2">
                                            {brief.title}
                                        </h3>

                                        {/* Authors */}
                                        {brief.authors && brief.authors.length > 0 && (
                                            <div className="mb-4 bg-gray-50 rounded-lg p-3 border border-gray-100">
                                                <div className="flex items-start gap-2">
                                                    <Users className="w-4 h-4 text-[#021d49] shrink-0 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">
                                                            Authors
                                                        </p>
                                                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                                                            {brief.authors.join(', ')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Excerpt */}
                                        <div className="flex-grow mb-4">
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                                {brief.excerpt || stripHtml(brief.description).substring(0, 150) + '...'}
                                            </p>
                                        </div>

                                        {/* Read More Button */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (brief._id) handleBriefClick(brief._id);
                                            }}
                                            className="mt-auto w-full px-5 py-3 bg-gradient-to-r from-[#021d49] to-[#032a5e] hover:from-[#032a5e] hover:to-[#021d49] text-white font-semibold rounded-lg shadow-md hover:shadow-xl flex items-center gap-2 justify-center transition-all duration-300 group-hover:gap-3"
                                        >
                                            <span>Read More</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results Message */}
                        {filteredBriefs.length === 0 && (
                            <div className="text-center py-20">
                                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                    <Newspaper className="w-12 h-12 text-gray-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No news briefs found</h3>
                                <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All');
                                    }}
                                    className="px-6 py-3 bg-[#021d49] text-white rounded-lg hover:bg-[#032a5e] transition-colors duration-200"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredBriefs.length > 0 && totalPages > 1 && (
                            <div className="mt-16 flex justify-center items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-3 rounded-lg transition-all duration-200 ${currentPage === 1
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white border border-gray-300 shadow-sm hover:shadow-md'
                                        }`}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex gap-2">
                                    {[...Array(totalPages)].map((_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`px-5 py-3 rounded-lg font-semibold transition-all duration-200 ${currentPage === index + 1
                                                ? 'bg-gradient-to-r from-[#021d49] to-[#032a5e] text-white shadow-lg scale-105'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 shadow-sm'
                                                }`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-3 rounded-lg transition-all duration-200 ${currentPage === totalPages
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white border border-gray-300 shadow-sm hover:shadow-md'
                                        }`}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            {/* Why Follow ARIN News Section */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] rounded-2xl p-12 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold text-center mb-12">Why Follow ARIN News?</h2>

                        <div className="grid md:grid-cols-3 gap-10 mb-10">
                            <div className="text-center group">
                                <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                                    <Newspaper className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Latest Updates</h3>
                                <p className="text-gray-200 leading-relaxed">
                                    Stay informed about ARIN's activities, achievements, and groundbreaking research initiatives
                                </p>
                            </div>

                            <div className="text-center group">
                                <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                                    <Users className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Event Coverage</h3>
                                <p className="text-gray-200 leading-relaxed">
                                    Get exclusive insights from workshops, conferences, summits, and networking events
                                </p>
                            </div>

                            <div className="text-center group">
                                <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-white/20 transition-colors duration-300">
                                    <Calendar className="w-10 h-10 text-white" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Impact Stories</h3>
                                <p className="text-gray-200 leading-relaxed">
                                    Discover how ARIN's work is creating meaningful change and driving development across Africa
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-white/20 pt-8">
                            <p className="text-gray-200 text-center max-w-3xl mx-auto leading-relaxed text-lg">
                                Join our community and stay connected with ARIN's journey towards evidence-based policy and sustainable development across the African continent.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default NewsBriefsPage;