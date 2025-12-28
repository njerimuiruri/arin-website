"use client";
import React, { useState } from 'react';
import { Newspaper, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, Users } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const NewsBriefsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const briefsPerPage = 6;

    const newsBriefs = [
        {
            id: 'geo-africa-workshop',
            title: 'GEO-AFRICA WORKSHOP',
            date: 'November 21, 2025',
            category: 'Events & Workshops',
            authors: 'Maria Nailantei & Florence Onyango',
            excerpt: 'Photo: Participants stood for a group photo at Emara…',
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
            hasImage: true
        },
        {
            id: 'climate-resilience-metrics',
            title: 'Accelerating Global Climate Resilience through Robust Adaptation Metrics',
            date: 'November 21, 2025',
            category: 'Publications',
            authors: '',
            excerpt: 'A new policy paper titled "Accelerating Global Climate Resilience through Robust Adaptation Metrics", co-authored by…',
            image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=800&q=80',
            hasImage: true
        },
        {
            id: 'morocco-conference',
            title: 'ARIN Advances Climate Adaptation Measurement at International Conference in Morocco',
            date: 'October 8, 2025',
            category: 'Conferences',
            authors: 'Dr. Humphrey Agevi, Dr. Eurallyah Akinyi',
            excerpt: 'Delegates gather for a group photo during the…',
            image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80',
            hasImage: true
        },
        {
            id: 'africa-climate-summit',
            title: 'ARIN Advocates for Locally Led Adaptation Metrics at Africa Climate Summit 2',
            date: 'September 11, 2025',
            category: 'Advocacy',
            authors: 'Florence Onyango, Maria Nalantei',
            excerpt: 'The Africa Research and Impact Network (ARIN), through its Locally Led…',
            image: 'https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?w=800&q=80',
            hasImage: true
        }
    ];

    const categories = ['All', 'Events & Workshops', 'Publications', 'Conferences', 'Advocacy'];

    const filteredBriefs = newsBriefs.filter(brief => {
        const matchesSearch = brief.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brief.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            brief.authors.toLowerCase().includes(searchTerm.toLowerCase());
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
        console.log('Navigate to news brief:', briefId);
        alert(`Navigate to news brief: ${briefId}\n\nIn your Next.js app, use:\nrouter.push(\`/news-briefs/${briefId}\`)`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Newspaper className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            News{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Briefs
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Stay updated with the latest news, events, and developments from the Africa Research and Impact Network
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#46a1bb] mb-1">{newsBriefs.length}</div>
                                <p className="text-sm text-gray-600">News Updates</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">{newsBriefs.length}</div>
                                <p className="text-sm text-gray-600">Recent Stories</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-[#46a1bb] mb-1">{categories.length - 1}</div>
                                <p className="text-sm text-gray-600">Categories</p>
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
                                        placeholder="Search news briefs..."
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

                    {/* News Briefs Grid Layout */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {currentBriefs.map((brief) => (
                            <div
                                key={brief.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group flex flex-col"
                                onClick={() => handleBriefClick(brief.id)}
                            >
                                {/* Brief Image */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#021d49] to-[#46a1bb]">
                                    {brief.hasImage ? (
                                        <>
                                            <img
                                                src={brief.image}
                                                alt={brief.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
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
                                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                                        <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                        <span>{brief.date}</span>
                                    </div>

                                    {/* Authors - if available */}
                                    {brief.authors && (
                                        <div className="mb-3 bg-gray-50 rounded-lg p-3">
                                            <div className="flex items-start gap-2">
                                                <Users className="w-4 h-4 text-[#46a1bb] flex-shrink-0 mt-0.5" />
                                                <div className="flex-1">
                                                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-1">By</p>
                                                    <p className="text-xs text-gray-700 leading-relaxed">
                                                        {brief.authors}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Excerpt */}
                                    <div className="mb-4 flex-grow">
                                        <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                                            {brief.excerpt}
                                        </p>
                                    </div>

                                    {/* Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleBriefClick(brief.id); }}
                                        className="mt-auto w-full px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#46a1bb] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200"
                                    >
                                        <span>read more</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

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

                {/* Why Follow ARIN News Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Follow ARIN News?</h2>
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
            </div>

        </>
    );
};

export default NewsBriefsPage;