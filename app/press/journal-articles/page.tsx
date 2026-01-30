"use client";
import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Search, Filter, ChevronLeft, ChevronRight, Users, ArrowRight } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getJournalArticles } from '@/services/journalArticlesService';

const JournalArticlesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const articlesPerPage = 6;

    useEffect(() => {
        loadArticles();
    }, []);

    const loadArticles = async () => {
        try {
            setLoading(true);
            const data = await getJournalArticles();
            setArticles(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Failed to load journal articles:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'Health & Climate', 'Environmental Policy', 'Health Economics'];

    const filteredArticles = articles.filter(article => {
        const authorsStr = Array.isArray(article.authors) ? article.authors.join(', ') : (article.authors || '');
        const descriptionStr = article.description || '';
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            authorsStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            descriptionStr.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (article.category && article.category.includes(selectedCategory));
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleArticleClick = (articleId) => {
        window.location.href = `/press/journal-articles/${articleId}`;
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <FileText className="w-16 h-16 text-[#021d49] mx-auto mb-4 animate-pulse" />
                        <p className="text-gray-600">Loading journal articles...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <FileText className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <p className="text-red-600 mb-2">Failed to load journal articles</p>
                        <p className="text-gray-600 text-sm">{error}</p>
                        <button
                            onClick={loadArticles}
                            className="mt-4 px-6 py-2 bg-[#021d49] text-white rounded-lg hover:bg-[#021d49]"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FileText className="w-12 h-12 text-[#021d49]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Journal{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Articles
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Explore peer-reviewed research and scholarly articles advancing knowledge on climate, health, and sustainable development in Africa
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#021d49] mb-1">{articles.length}</div>
                                <p className="text-sm text-gray-600">Published Articles</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">{articles.length}</div>
                                <p className="text-sm text-gray-600">Recent Publications</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-[#021d49] mb-1">Multiple</div>
                                <p className="text-sm text-gray-600">Contributing Authors</p>
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
                                        placeholder="Search journal articles..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors"
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
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Articles Grid Layout */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {currentArticles.map((article) => {
                            const authorsDisplay = Array.isArray(article.authors)
                                ? article.authors.join(', ')
                                : (article.authors || 'Unknown Author');
                            const dateDisplay = article.datePosted
                                ? new Date(article.datePosted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                : 'Date not available';

                            return (
                                <div
                                    key={article._id || article.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] cursor-pointer group flex flex-col"
                                    onClick={() => handleArticleClick(article._id || article.id)}
                                >
                                    {/* Article Image */}
                                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#021d49] to-[#021d49]">
                                        {article.coverImage ? (
                                            <>
                                                <img
                                                    src={article.coverImage.startsWith('http') ? article.coverImage : `https://api.demo.arin-africa.org${article.coverImage}`}
                                                    alt={article.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FileText className="w-16 h-16 text-white/30" />
                                            </div>
                                        )}

                                        {/* Category Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-full shadow-lg">
                                                Article
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow">
                                        {/* Category */}
                                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3 self-start">
                                            {article.category || 'Article'}
                                        </span>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-3 line-clamp-3">
                                            {article.title}
                                        </h3>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                            <Calendar className="w-4 h-4 text-[#021d49]" />
                                            <span>{dateDisplay}</span>
                                        </div>

                                        {/* Authors */}
                                        <div className="mb-4 bg-gray-50 rounded-lg p-3 flex-grow">
                                            <div className="flex items-start gap-2">
                                                <Users className="w-4 h-4 text-[#021d49] flex-shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">Authors</p>
                                                    <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
                                                        {authorsDisplay}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description - if available */}
                                        {article.description && (
                                            <div
                                                className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2"
                                                dangerouslySetInnerHTML={{ __html: article.description }}
                                            />
                                        )}

                                        {/* Button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleArticleClick(article._id || article.id); }}
                                            className="mt-auto w-full px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#021d49] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200"
                                        >
                                            <span>read more</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* No Results Message */}
                    {filteredArticles.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredArticles.length > 0 && totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white border border-gray-300'} transition-all duration-200`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentPage === index + 1
                                        ? 'bg-gradient-to-r from-[#021d49] to-[#021d49] text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white border border-gray-300'} transition-all duration-200`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </section>

                {/* Why Explore ARIN Journal Articles Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Explore ARIN Journal Articles?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <FileText className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Peer-Reviewed Research</h3>
                                <p className="text-gray-300 text-sm">Access rigorous, peer-reviewed studies on critical African issues</p>
                            </div>
                            <div className="text-center">
                                <Users className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Expert Scholarship</h3>
                                <p className="text-gray-300 text-sm">Learn from leading academics and researchers across the continent</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Latest Findings</h3>
                                <p className="text-gray-300 text-sm">Stay current with the most recent research and scientific discoveries</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            ARIN's journal articles represent cutting-edge research that advances knowledge and informs evidence-based solutions for Africa's most pressing challenges in climate, health, and development.
                        </p>
                    </div>
                </section>
            </div>

        </>
    );
};

export default JournalArticlesPage;