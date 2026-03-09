"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

const NewslettersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const newslettersPerPage = 6;

    const [newsletters, setNewsletters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        import('@/services/newslettersService').then(({ newslettersService }) => {
            newslettersService.getAll()
                .then((data: any[]) => {
                    setNewsletters(data);
                    setError(null);
                })
                .catch((err: any) => setError(err.message || 'Failed to fetch newsletters'))
                .finally(() => setLoading(false));
        });
    }, []);

    const categories = ['All', 'Quarterly', 'Research Updates', 'Network Updates', 'Special Edition'];

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filteredNewsletters = newsletters.filter(newsletter => {
        const matchesSearch = (newsletter.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (newsletter.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (newsletter.authors?.join(' ').toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || newsletter.category === selectedCategory;
        const matchesDate = !newsletter.datePosted || new Date(newsletter.datePosted) <= today;
        return matchesSearch && matchesCategory && matchesDate;
    });

    // Pagination logic
    const indexOfLastNewsletter = currentPage * newslettersPerPage;
    const indexOfFirstNewsletter = indexOfLastNewsletter - newslettersPerPage;
    const currentNewsletters = filteredNewsletters.slice(indexOfFirstNewsletter, indexOfLastNewsletter);
    const totalPages = Math.ceil(filteredNewsletters.length / newslettersPerPage);

    const handleNewsletterClick = (id: string) => {
        window.location.href = `/press/newsletters/${id}`;
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">ARIN Newsletters</h1>
                                <p className="text-sm text-blue-100 mt-1">Stay connected with ARIN's latest research, insights, events, and network updates through our regular newsletters</p>
                            </div>
                            <div className="w-full md:max-w-sm">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search newsletters..."
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

                {/* Slim Category Filter Bar */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <Filter className="w-4 h-4" />
                            <span>Filter by Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                        ? 'bg-[#021d49] text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Newsletters Grid - 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentNewsletters.map((newsletter) => (
                            <div
                                key={newsletter._id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#021d49] cursor-pointer group flex flex-col"
                                onClick={() => handleNewsletterClick(newsletter._id)}
                            >
                                {/* Image */}
                                <div className="relative h-52 overflow-hidden shrink-0">
                                    {newsletter.hasImage ? (
                                        <>
                                            <img
                                                src={newsletter.image}
                                                alt={newsletter.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#021d49] to-[#032a5e]">
                                            <Mail className="w-16 h-16 text-white/20" />
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-lg shadow-lg">
                                            Newsletter
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-1">
                                    {newsletter.category && (
                                        <span className="inline-block px-2.5 py-1 bg-linear-to-r from-[#021d49] to-[#032a5e] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-2 self-start">
                                            {newsletter.category}
                                        </span>
                                    )}
                                    <h3 className="text-base font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-2">
                                        {newsletter.title}
                                    </h3>
                                    <div className="flex flex-col gap-1 mb-3">
                                        {newsletter.authors && newsletter.authors.length > 0 && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <User className="w-4 h-4 text-[#021d49] shrink-0" />
                                                <span className="line-clamp-1">{newsletter.authors.join(', ')}</span>
                                            </div>
                                        )}
                                        {newsletter.datePosted && (
                                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 text-[#021d49] shrink-0" />
                                                <span>{new Date(newsletter.datePosted).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1">
                                        {newsletter.description ? newsletter.description.replace(/<[^>]*>/g, '').slice(0, 180) + (newsletter.description.replace(/<[^>]*>/g, '').length > 180 ? '...' : '') : ''}
                                    </p>
                                    <div className="pt-4 mt-4 border-t border-gray-100">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleNewsletterClick(newsletter._id); }}
                                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-[#021d49] to-[#032a5e] text-white font-semibold rounded-lg shadow-md text-sm"
                                        >
                                            View Newsletter <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-12">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                                        ? 'bg-[#021d49] text-white'
                                        : 'border border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredNewsletters.length === 0 && !loading && (
                        <div className="text-center py-12">
                            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">No newsletters found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#021d49] mx-auto"></div>
                            <p className="text-gray-500 mt-4">Loading newsletters...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                                <p className="text-red-600 font-medium">{error}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewslettersPage;
