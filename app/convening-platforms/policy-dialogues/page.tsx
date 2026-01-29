"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, MessageSquare, Search, Filter } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getPolicyDialogues } from '@/services/policyDialoguesService';

const PolicyDialoguesPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');
    const [dialogues, setDialogues] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchDialogues() {
            try {
                const data = await getPolicyDialogues();
                setDialogues(data);
            } catch (err) {
                console.error('Failed to fetch policy dialogues:', err);
                setError('Failed to load policy dialogues');
            } finally {
                setLoading(false);
            }
        }
        fetchDialogues();
    }, []);

    // Extract unique years from dialogues
    const years = ['All', ...Array.from(new Set(dialogues.map(d => new Date(d.date).getFullYear().toString()))).sort().reverse()];

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const buildImageUrl = (path: string) => {
        if (!path) return '';
        return path.startsWith('http') ? path : `http://localhost:5001${path}`;
    };

    const filteredDialogues = dialogues
        .filter(dialogue => {
            const matchesSearch = dialogue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                dialogue.description.toLowerCase().includes(searchTerm.toLowerCase());
            const dialogueYear = new Date(dialogue.date).getFullYear().toString();
            const matchesYear = selectedYear === 'All' || dialogueYear === selectedYear;
            return matchesSearch && matchesYear;
        })
        .sort((a, b) => {
            const dateA = a.date ? new Date(a.date).getTime() : 0;
            const dateB = b.date ? new Date(b.date).getTime() : 0;
            return dateB - dateA;
        });

    const handleDialogueClick = (dialogueId: string) => {
        router.push(`/convening-platforms/policy-dialogues/${dialogueId}`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Policy{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Dialogues
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Facilitating evidence-based conversations between researchers, policymakers, and stakeholders to drive impactful policy change across Africa
                        </p>
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
                                        placeholder="Search policy dialogues..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Year Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dialogues Grid */}
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#021d49] mx-auto"></div>
                            <p className="text-gray-600 mt-4">Loading policy dialogues...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <MessageSquare className="w-12 h-12 text-red-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Dialogues</h3>
                            <p className="text-gray-600">{error}</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {filteredDialogues.map((dialogue) => (
                                <div
                                    key={dialogue._id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] cursor-pointer flex flex-col h-full"
                                    onClick={() => handleDialogueClick(dialogue._id)}
                                >
                                    {/* Image Container */}
                                    {dialogue.image && (
                                        <div className="relative h-48 overflow-hidden bg-gray-200">
                                            <img
                                                src={buildImageUrl(dialogue.image)}
                                                alt={dialogue.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            />
                                            {/* Overlay with Status */}
                                            <div className="absolute top-0 right-0 p-3">
                                                <span className={`px-3 py-1 ${dialogue.status === 'Ongoing' ? 'bg-green-500' : dialogue.status === 'Completed' ? 'bg-blue-500' : 'bg-yellow-500'} text-white text-xs font-bold rounded-full whitespace-nowrap shadow-lg`}>
                                                    {dialogue.status}
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Content Container - Sticky */}
                                    <div className="p-5 flex flex-col flex-1">
                                        {/* Icon and Label */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <MessageSquare className="w-5 h-5 text-[#021d49] flex-shrink-0" />
                                            <span className="text-xs font-semibold text-[#021d49] uppercase tracking-wide">Policy Dialogue</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-gray-900 hover:text-[#021d49] transition-colors leading-tight mb-3 line-clamp-2">
                                            {dialogue.title}
                                        </h3>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 flex-shrink-0 text-[#021d49]" />
                                            <span className="font-medium">{formatDate(dialogue.date)}</span>
                                        </div>

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow line-clamp-3">
                                            {dialogue.description.replace(/<[^>]*>/g, '').substring(0, 120)}...
                                        </p>

                                        {/* Resources Count */}
                                        {dialogue.availableResources && dialogue.availableResources.length > 0 && (
                                            <div className="mb-4 inline-flex items-center gap-2 text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 w-fit">
                                                <span>📎</span>
                                                <span>{dialogue.availableResources.length} resource{dialogue.availableResources.length > 1 ? 's' : ''}</span>
                                            </div>
                                        )}

                                        {/* Read More Button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDialogueClick(dialogue._id); }}
                                            className="w-full px-4 py-2.5 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center hover:shadow-lg hover:from-[#021d49] hover:to-[#021d49] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#021d49] focus:ring-opacity-60"
                                            aria-label={`Read more about ${dialogue.title}`}
                                        >
                                            <span>Read More</span>
                                            <ArrowRight className="w-4 h-4 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && !error && filteredDialogues.length === 0 && (
                        <div className="text-center py-16">
                            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No policy dialogues found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>


            </div>
        </>

    );
};

export default PolicyDialoguesPage;