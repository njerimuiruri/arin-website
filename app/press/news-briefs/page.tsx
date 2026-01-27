"use client";
import React, { useState, useEffect } from 'react';
import { Newspaper, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getNewsBriefs } from '@/services/newsBriefsService';
import Navbar from '@/app/navbar/Navbar';

const NewsBriefsPage = () => {
    const [newsBriefs, setNewsBriefs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const briefsPerPage = 6;
    const router = useRouter();

    useEffect(() => {
        async function fetchBriefs() {
            setLoading(true);
            const data = await getNewsBriefs();
            setNewsBriefs(data);
            setLoading(false);
        }
        fetchBriefs();
    }, []);

    const categories = ['All', 'Events & Workshops', 'Publications', 'Conferences', 'Advocacy'];

    // Helper to strip HTML tags
    function stripHtml(html: string) {
        if (!html) return '';
        return html.replace(/<[^>]+>/g, '');
    }
    // Helper to truncate to n words
    function truncateWords(text: string, n: number) {
        if (!text) return '';
        const words = text.split(/\s+/);
        return words.slice(0, n).join(' ') + (words.length > n ? '...' : '');
    }

    const filteredBriefs = newsBriefs.filter(brief => {
        const title = (brief.title || '').toLowerCase();
        const description = stripHtml(brief.description || '').toLowerCase();
        const authors = (brief.authors || []).join(', ').toLowerCase();
        const matchesSearch = title.includes(searchTerm.toLowerCase()) ||
            description.includes(searchTerm.toLowerCase()) ||
            authors.includes(searchTerm.toLowerCase());
        // If you have categories in your backend, update this accordingly
        const matchesCategory = selectedCategory === 'All' || (brief.category === selectedCategory);
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
        console.log('Navigate to news brief:', briefId);
        router.push(`/press/news-briefs/${briefId}`);
    };

    return (
        <>
            <section>
                {currentBriefs.map((brief) => (
                    <div
                        key={brief._id || brief.title}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group flex flex-col"
                        onClick={() => brief._id && router.push(`/press/news-briefs/${brief._id}`)}
                    >
                        {/* Brief Image */}
                        <div className="relative h-48 overflow-hidden bg-linear-to-br from-[#021d49] to-[#46a1bb]">
                            {(brief.image || brief.coverImage) ? (
                                <>
                                    <img
                                        src={brief.image || brief.coverImage}
                                        alt={brief.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Newspaper className="w-16 h-16 text-white/30" />
                                </div>
                            )}

                            {/* Badge */}
                            <div className="absolute top-4 right-4">
                                <span className="px-3 py-1 bg-white/90 text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-full shadow-lg">
                                    News
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex flex-col grow">
                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-3 line-clamp-3">
                                {brief.title}
                            </h3>

                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                <span>{brief.datePosted ? new Date(brief.datePosted).toLocaleDateString() : ''}</span>
                            </div>

                            {/* Authors - if available */}
                            {brief.authors && brief.authors.length > 0 && (
                                <div className="mb-3 bg-gray-50 rounded-lg p-3">
                                    <div className="flex items-start gap-2">
                                        <Users className="w-4 h-4 text-[#46a1bb] shrink-0 mt-0.5" />
                                        <div className="flex-1">
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">By</p>
                                            <p className="text-xs text-gray-700 leading-relaxed">
                                                {brief.authors.join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Excerpt */}
                            <div className="mb-4 grow">
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    {brief.excerpt}
                                </p>
                            </div>

                            {/* Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); if (brief._id) handleBriefClick(brief._id); }}
                                className="mt-auto w-full px-4 py-3 bg-linear-to-r from-[#021d49] to-[#46a1bb] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200"
                            >
                                <span>read more</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* No Results Message */}
                {filteredBriefs.length === 0 && (
                    <div className="text-center py-16">
                        <Newspaper className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No news briefs found</h3>
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
                                    ? 'bg-linear-to-r from-[#021d49] to-[#46a1bb] text-white shadow-md'
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

            {/* Why Follow ARIN News Section */}
            <section className="max-w-350 mx-auto px-6 pb-16 mt-12">
                <div className="bg-linear-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="text-center">
                            <Newspaper className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Latest Updates</h3>
                            <p className="text-gray-300 text-sm">Stay informed about ARIN's activities and achievements</p>
                        </div>
                        <div className="text-center">
                            <Users className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Event Coverage</h3>
                            <p className="text-gray-300 text-sm">Get insights from workshops, conferences, and summits</p>
                        </div>
                        <div className="text-center">
                            <Calendar className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                            <h3 className="text-xl font-bold mb-2">Impact Stories</h3>
                            <p className="text-gray-300 text-sm">Learn how ARIN's work is making a difference across Africa</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                        Stay connected with ARIN's latest news, events, and impact stories as we work towards evidence-based policy and sustainable development across Africa.
                    </p>
                </div>
            </section>
        </>
    );
};

export default NewsBriefsPage;