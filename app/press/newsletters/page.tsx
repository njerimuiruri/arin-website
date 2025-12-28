"use client";
import React, { useState } from 'react';
import { Mail, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const NewslettersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const newslettersPerPage = 6;

    const newsletters = [
        {
            id: 'newsletter-sample-1',
            title: 'ARIN Quarterly Newsletter - Q4 2025',
            author: 'ARIN Communications Team',
            postedDate: 'December 15, 2025',
            category: 'Quarterly',
            excerpt: 'Highlights from the fourth quarter of 2025, featuring major research milestones, policy impacts, and upcoming events for the new year.',
            image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&q=80',
            hasImage: true
        },
        {
            id: 'newsletter-sample-2',
            title: 'Climate Adaptation Research Updates - November 2025',
            author: 'Dr. Joanes Atela',
            postedDate: 'November 30, 2025',
            category: 'Research Updates',
            excerpt: 'Monthly research updates on climate adaptation initiatives across Africa, showcasing new findings and collaborative partnerships.',
            image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
            hasImage: true
        },
        {
            id: 'newsletter-sample-3',
            title: 'ARIN Network News - October 2025',
            author: 'Network Coordination Team',
            postedDate: 'October 20, 2025',
            category: 'Network Updates',
            excerpt: 'Updates from our growing network of researchers, policymakers, and practitioners working towards sustainable development across the continent.',
            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
            hasImage: true
        }
    ];

    const categories = ['All', 'Quarterly', 'Research Updates', 'Network Updates', 'Special Edition'];

    const filteredNewsletters = newsletters.filter(newsletter => {
        const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            newsletter.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            newsletter.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || newsletter.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastNewsletter = currentPage * newslettersPerPage;
    const indexOfFirstNewsletter = indexOfLastNewsletter - newslettersPerPage;
    const currentNewsletters = filteredNewsletters.slice(indexOfFirstNewsletter, indexOfLastNewsletter);
    const totalPages = Math.ceil(filteredNewsletters.length / newslettersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNewsletterClick = (newsletterId) => {
        console.log('Navigate to newsletter:', newsletterId);
        alert(`Navigate to newsletter: ${newsletterId}\n\nIn your Next.js app, use:\nrouter.push(\`/newsletters/${newsletterId}\`)`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Mail className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            ARIN{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
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
                                    <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-gradient-to-br from-[#021d49] to-[#46a1bb]">
                                        {newsletter.hasImage ? (
                                            <>
                                                <img
                                                    src={newsletter.image}
                                                    alt={newsletter.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
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
                                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3">
                                                {newsletter.category}
                                            </span>
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-3">
                                                {newsletter.title}
                                            </h3>
                                        </div>

                                        {/* Metadata */}
                                        <div className="mb-4 bg-gray-50 rounded-lg p-4">
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <User className="w-4 h-4 text-[#46a1bb] flex-shrink-0" />
                                                    <span className="text-gray-700 font-medium">{newsletter.author}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Calendar className="w-4 h-4 text-[#46a1bb] flex-shrink-0" />
                                                    <span className="text-gray-600">{newsletter.postedDate}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            {newsletter.excerpt}
                                        </p>

                                        {/* Button */}
                                        <div className="flex items-center justify-end">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleNewsletterClick(newsletter.id); }}
                                                className="px-6 py-3 bg-gradient-to-r from-[#021d49] to-[#46a1bb] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200 whitespace-nowrap"
                                            >
                                                <span>Continue Reading</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredNewsletters.length === 0 && (
                        <div className="text-center py-16">
                            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No newsletters found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredNewsletters.length > 0 && totalPages > 1 && (
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

                {/* Why Subscribe Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Subscribe to ARIN Newsletters?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <Mail className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Regular Updates</h3>
                                <p className="text-gray-300 text-sm">Get the latest research findings and network news directly to your inbox</p>
                            </div>
                            <div className="text-center">
                                <User className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Expert Insights</h3>
                                <p className="text-gray-300 text-sm">Learn from thought leaders and researchers across Africa</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Event Updates</h3>
                                <p className="text-gray-300 text-sm">Stay informed about upcoming workshops, webinars, and conferences</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            Subscribe to ARIN newsletters and stay connected with our community of researchers, policymakers, and practitioners driving sustainable development across Africa.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default NewslettersPage;