"use client";
import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Search, ChevronLeft, ChevronRight, ArrowRight, AlertCircle } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { useRouter } from 'next/navigation';
import Footer from '@/app/footer/Footer';

interface CallForBook {
    _id?: string;
    id?: string;
    title?: string;
    excerpt?: string;
    image?: string;
    status?: string;
    deadline?: string;
    createdAt?: string;
    postedDate?: string;
    postedBy?: string;
    category?: string;
}

const CallForBooksPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [calls, setCalls] = useState<CallForBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
                setError((err as Error).message || "Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };
        fetchCalls();
    }, []);

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filteredCalls = calls.filter(call => {
        const matchesSearch = call.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            call.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (call.category && call.category.includes(selectedCategory));
        const matchesDate = !call.createdAt || new Date(call.createdAt) <= today;
        return matchesSearch && matchesCategory && matchesDate;
    });

    // Pagination logic
    const indexOfLastCall = currentPage * callsPerPage;
    const indexOfFirstCall = indexOfLastCall - callsPerPage;
    const currentCalls = filteredCalls.slice(indexOfFirstCall, indexOfLastCall);
    const totalPages = Math.ceil(filteredCalls.length / callsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCallClick = (callId: string | undefined) => {
        if (!callId) return;
        router.push(`/press/call-for-chapters/${callId}`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Compact Dark Navy Hero Banner */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                    <div className="relative max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">Call for Book Chapters</h1>
                                <p className="text-sm text-blue-100 mt-1">Opportunities to contribute to ARIN's collaborative book publications</p>
                            </div>
                            <div className="w-full md:max-w-sm">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search calls for book chapters..."
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

                {/* Category Filter Bar */}
                <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === cat
                                    ? 'bg-[#021d49] text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Calls Grid */}
                <div className="max-w-7xl mx-auto px-6 py-10">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentCalls.map((call) => (
                                <div
                                    key={call._id || call.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#021d49] cursor-pointer group flex flex-col"
                                    onClick={() => handleCallClick(call._id || call.id)}
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden shrink-0 bg-gradient-to-br from-[#021d49] to-[#032a5e]">
                                        {call.image ? (
                                            <>
                                                <img
                                                    src={call.image}
                                                    alt={call.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <BookOpen className="w-16 h-16 text-white/20" />
                                            </div>
                                        )}
                                        {/* Status Badge */}
                                        <div className="absolute top-3 left-3">
                                            <span className={`px-2.5 py-1 ${call.status === 'Open' ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold text-xs uppercase tracking-wide rounded-lg shadow-lg`}>
                                                {call.status || (call.deadline && new Date(call.deadline) > new Date() ? 'Open' : 'Closed')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-2 line-clamp-2">
                                            {call.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-500">
                                            {call.deadline && (
                                                <div className="flex items-center gap-1">
                                                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                                                    <span className="font-medium text-gray-700">Deadline: {call.deadline}</span>
                                                </div>
                                            )}
                                            {call.createdAt && (
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5 text-[#021d49]" />
                                                    <span>{new Date(call.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                        {/* Category Tags */}
                                        {call.category && (
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {call.category.split(', ').map((tag: string, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                                            {call.excerpt}
                                        </p>
                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleCallClick(call._id || call.id); }}
                                                className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 ${call.status === 'Open' ? 'bg-gradient-to-r from-[#021d49] to-[#032a5e] hover:from-[#032a5e] hover:to-[#021d49]' : 'bg-gray-400 hover:bg-gray-500'} text-white font-semibold rounded-lg shadow-md text-sm transition-all duration-200`}
                                            >
                                                <span>{call.status === 'Open' ? 'View Details' : 'View Call'}</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                </div>

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
            <Footer />
        </>
    );
};

export default CallForBooksPage;
