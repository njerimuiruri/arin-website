"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

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

    const filteredNewsletters = newsletters.filter(newsletter => {
        const matchesSearch = (newsletter.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (newsletter.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (newsletter.authors?.join(' ').toLowerCase() || '').includes(searchTerm.toLowerCase());
        // If you have category, filter by it, else always true
        const matchesCategory = selectedCategory === 'All' || newsletter.category === selectedCategory;
        return matchesSearch && matchesCategory;
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
                {/* Hero Section */}
                <section className="max-w-350 mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Mail className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            ARIN{' '}
                            <span className="bg-linear-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Newsletters
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Stay connected with ARIN's latest research, insights, events, and network updates through our regular newsletters
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#46a1bb] mb-1">{newsletters.length}</div>
                                <p className="text-sm text-gray-600">Newsletters</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">{newsletters.length}</div>
                                <p className="text-sm text-gray-600">Recent Issues</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-[#46a1bb] mb-1">Monthly</div>
                                <p className="text-sm text-gray-600">Updates</p>
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
                                        placeholder="Search newsletters..."
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

                    {/* Newsletters List - Horizontal Card Layout */}
                    <div className="space-y-6 max-w-6xl mx-auto">
                        {currentNewsletters.map((newsletter) => (
                            <div
                                key={newsletter.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleNewsletterClick(newsletter.id)}
                            >
                                <div className="md:flex">
                                    {/* Left Side - Newsletter Image */}
                                    <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-linear-to-br from-[#021d49] to-[#46a1bb]">
                                        {newsletter.hasImage ? (
                                            <>
                                                <img
                                                    src={newsletter.image}
                                                    alt={newsletter.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Mail className="w-24 h-24 text-white/30" />
                                            </div>
                                        )}

                                        {/* Category Badge - Bottom Left */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-4 py-2 bg-white/90 text-[#021d49] font-bold text-sm uppercase tracking-wide rounded-lg shadow-xl">
                                                Newsletter
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="md:w-3/5 p-8">
                                        {/* Header */}
                                        <div className="mb-4">
                                            <span className="inline-block px-3 py-1 bg-linear-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3">
                                                {newsletter.category}
                                            </span>
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-3">
                                                {newsletter.title}
                                            </h3>
                                        </div>
                                        <div className="mb-4 bg-gray-50 rounded-lg p-4">
                                            <div className="flex flex-col gap-2">
                                                {newsletter.authors && newsletter.authors.length > 0 && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <User className="w-4 h-4 text-[#46a1bb] shrink-0" />
                                                        <span className="text-gray-700">{newsletter.authors.join(', ')}</span>
                                                    </div>
                                                )}
                                                {newsletter.datePosted && (
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="w-4 h-4 text-[#46a1bb] shrink-0" />
                                                        <span className="text-gray-600">{new Date(newsletter.datePosted).toLocaleDateString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            {newsletter.description ? newsletter.description.replace(/<[^>]*>/g, '').slice(0, 180) + (newsletter.description.replace(/<[^>]*>/g, '').length > 180 ? '...' : '') : ''}
                                        </p>
                                        <div className="flex items-center justify-end">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleNewsletterClick(newsletter.id); }}
                                                className="px-6 py-3 bg-linear-to-r from-[#021d49] to-[#46a1bb] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200 whitespace-nowrap"
                                            >
                                                <span>View Newsletter</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
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
                                        ? 'bg-[#46a1bb] text-white'
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
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#46a1bb] mx-auto"></div>
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
                </section>
            </div>
        </>
    );
};

export default NewslettersPage;