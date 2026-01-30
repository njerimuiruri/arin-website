"use client";
import React, { useState } from 'react';
import { BookOpen, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, AlertCircle } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CallForBooksPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [calls, setCalls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const callsPerPage = 6;
    const router = useRouter();

    const categories = ['All', 'Publications', 'Books', 'Call for book chapters'];

    useEffect(() => {
        const fetchCalls = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("https://api.demo.arin-africa.org/api/call-for-books");
                if (!res.ok) throw new Error("Failed to fetch calls");
                const data = await res.json();
                setCalls(data);
            } catch (err) {
                setError(err.message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchCalls();
    }, []);

    const filteredCalls = calls.filter(call => {
        const matchesSearch = call.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            call.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (call.category && call.category.includes(selectedCategory));
        return matchesSearch && matchesCategory;
    });

    // Pagination logic
    const indexOfLastCall = currentPage * callsPerPage;
    const indexOfFirstCall = indexOfLastCall - callsPerPage;
    const currentCalls = filteredCalls.slice(indexOfFirstCall, indexOfLastCall);
    const totalPages = Math.ceil(filteredCalls.length / callsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCallClick = (callId) => {
        router.push(`/press/call-for-chapters/${callId}`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen className="w-12 h-12 text-[#021d49]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Call for{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Book Chapters
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Opportunities to contribute to ARIN's collaborative book publications and share your research with a wider audience
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#021d49] mb-1">{calls.length}</div>
                                <p className="text-sm text-gray-600">Total Calls</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-gray-400 mb-1">{calls.filter(c => c.status === 'Closed').length}</div>
                                <p className="text-sm text-gray-600">Closed Calls</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-green-600 mb-1">{calls.filter(c => c.status === 'Open').length}</div>
                                <p className="text-sm text-gray-600">Open Calls</p>
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
                                        placeholder="Search calls for book chapters..."
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

                    {/* Calls List - Horizontal Card Layout */}
                    <div className="space-y-6 max-w-6xl mx-auto">
                        {loading ? (
                            <div className="text-center py-16 text-lg text-gray-500">Loading calls...</div>
                        ) : error ? (
                            <div className="text-center py-16 text-red-600">{error}</div>
                        ) : currentCalls.length === 0 ? (
                            <div className="text-center py-16">
                                <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No calls found</h3>
                                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                            </div>
                        ) : (
                            currentCalls.map((call) => (
                                <div
                                    key={call._id || call.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] cursor-pointer group"
                                    onClick={() => handleCallClick(call._id || call.id)}
                                >
                                    <div className="md:flex">
                                        {/* Left Side - Image */}
                                        <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden bg-gradient-to-br from-[#021d49] to-[#021d49]">
                                            {call.image ? (
                                                <>
                                                    <img
                                                        src={call.image}
                                                        alt={call.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                    {/* Gradient Overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className="w-24 h-24 text-white/30" />
                                                </div>
                                            )}

                                            {/* Status Badge - Bottom Left */}
                                            <div className="absolute bottom-4 left-4">
                                                <span className={`px-4 py-2 ${call.status === 'Open' ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold text-sm uppercase tracking-wide rounded-lg shadow-xl`}>
                                                    {call.status || (new Date(call.deadline) > new Date() ? 'Open' : 'Closed')}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Side - Content */}
                                        <div className="md:w-3/5 p-8">
                                            {/* Header */}
                                            <div className="mb-4">
                                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3">
                                                    Call for Book Chapters
                                                </span>
                                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-3">
                                                    {call.title}
                                                </h3>
                                            </div>

                                            {/* Metadata */}
                                            <div className="mb-4 bg-gray-50 rounded-lg p-4">
                                                <div className="flex flex-col gap-2">
                                                    {call.postedBy && (
                                                        <div className="flex items-center gap-2 text-sm">
                                                            <span className="text-gray-700">Posted by {call.postedBy}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <Calendar className="w-4 h-4 text-[#021d49] flex-shrink-0" />
                                                        <span className="text-gray-600">{call.postedDate || call.createdAt ? new Date(call.createdAt).toLocaleDateString() : ''}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm">
                                                        <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                                        <span className="text-gray-700 font-medium">Deadline: {call.deadline}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Category Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {(call.category ? call.category.split(', ') : []).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Excerpt */}
                                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                                {call.excerpt}
                                            </p>

                                            {/* Button */}
                                            <div className="flex items-center justify-end">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleCallClick(call._id || call.id); }}
                                                    className={`px-6 py-3 ${call.status === 'Open' ? 'bg-gradient-to-r from-[#021d49] to-[#021d49] hover:shadow-xl' : 'bg-gray-400'} text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200 whitespace-nowrap`}
                                                >
                                                    <span>{call.status === 'Open' ? 'View Details' : 'View Call'}</span>
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* No Results Message */}
                    {filteredCalls.length === 0 && (
                        <div className="text-center py-16">
                            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No calls found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredCalls.length > 0 && totalPages > 1 && (
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

                {/* Why Contribute Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Contribute to ARIN Books?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <BookOpen className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Share Your Research</h3>
                                <p className="text-gray-300 text-sm">Contribute to impactful publications on critical African issues</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Collaborative Work</h3>
                                <p className="text-gray-300 text-sm">Join a network of leading researchers and scholars</p>
                            </div>
                            <div className="text-center">
                                <AlertCircle className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Wider Reach</h3>
                                <p className="text-gray-300 text-sm">Amplify the impact of your work across the continent and beyond</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            Contributing to ARIN's book publications offers an opportunity to share your research, engage with peers, and contribute to building Africa's knowledge base on sustainable development and climate resilience.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CallForBooksPage;