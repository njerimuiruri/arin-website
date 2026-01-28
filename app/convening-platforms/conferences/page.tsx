"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, Search, Filter, MapPin, Presentation } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

interface Conference {
    _id: string;
    title: string;
    description: string;
    date: string;
    venue?: string;
    image?: string;
    category?: string;
    availableResources?: string[];
    year?: number;
}

const ConferencesPage = () => {
    const router = useRouter();
    const [conferences, setConferences] = useState<Conference[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    useEffect(() => {
        fetchConferences();
    }, []);

    const fetchConferences = async () => {
        try {
            const apiBaseUrl = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : '') || 'http://localhost:5001';
            const response = await fetch(apiBaseUrl + '/api/conferences', {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to fetch conferences');
            const data = await response.json();

            // Fix image URLs to include backend base URL
            const fixedData = data.map((conf: Conference) => ({
                ...conf,
                image: conf.image && conf.image.startsWith('/uploads')
                    ? apiBaseUrl.replace(/\/api$/, '') + conf.image
                    : conf.image
            }));

            setConferences(fixedData);
        } catch (error) {
            console.error('Error fetching conferences:', error);
            setConferences([]);
        } finally {
            setLoading(false);
        }
    };

    const years = ['All', ...Array.from(new Set(conferences.map(c => c.year?.toString() || ''))).filter(Boolean).sort().reverse()];

    const filteredConferences = conferences.filter(conference => {
        const matchesSearch = conference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conference.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = selectedYear === 'All' || conference.year?.toString() === selectedYear;
        return matchesSearch && matchesYear;
    });

    const handleConferenceClick = (conferenceId: string) => {
        router.push(`/convening-platforms/conferences/${conferenceId}`);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-linear-to-br from-slate-50 via-white to-stone-50 min-h-screen flex items-center justify-center">
                    <div className="animate-pulse text-center">Loading conferences...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full bg-linear-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-400 mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Presentation className="w-12 h-12 text-[#021d49]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            ARIN International{' '}
                            <span className="bg-linear-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Conferences
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Annual gatherings bringing together researchers, policymakers, and practitioners to advance climate resilience, sustainable development, and evidence-based solutions for Africa
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
                                        placeholder="Search conferences..."
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

                    {/* Conferences Grid */}
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {filteredConferences.map((conference) => (
                            <div
                                key={conference._id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] cursor-pointer group"
                                onClick={() => handleConferenceClick(conference._id)}
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    {conference.image ? (
                                        <img
                                            src={conference.image}
                                            alt={conference.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#021d49] to-[#021d49] flex items-center justify-center">
                                            <Presentation className="w-16 h-16 text-white/50" />
                                        </div>
                                    )}
                                    {conference.year && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 font-bold text-sm rounded-full shadow-lg">
                                                {conference.year}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-3 line-clamp-3">
                                        {conference.title}
                                    </h3>

                                    {/* Date and Venue */}
                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#021d49]" />
                                            <span>{new Date(conference.date).toLocaleDateString()}</span>
                                        </div>
                                        {conference.venue && (
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4 text-[#021d49]" />
                                                <span>{conference.venue}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div
                                        className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2"
                                        dangerouslySetInnerHTML={{ __html: conference.description }}
                                    />

                                    {/* Read More Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleConferenceClick(conference._id); }}
                                        className="w-full px-5 py-2.5 bg-linear-to-r from-[#021d49] to-[#021d49] text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-200"
                                    >
                                        <span>View Details</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredConferences.length === 0 && (
                        <div className="text-center py-16">
                            <Presentation className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No conferences found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>

                {/* Stats Section */}
                <section className="max-w-400 mx-auto px-6 pb-16">
                    <div className="bg-linear-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Conference Impact</h2>
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#021d49] mb-2">{conferences.length}</div>
                                <p className="text-gray-300 text-sm">Conferences Held</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#021d49] mb-2">200+</div>
                                <p className="text-gray-300 text-sm">Network Members</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#021d49] mb-2">30+</div>
                                <p className="text-gray-300 text-sm">Countries</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#021d49] mb-2">1000+</div>
                                <p className="text-gray-300 text-sm">Participants</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            The ARIN International Conference series serves as a premier platform for advancing interdisciplinary
                            research and fostering collaboration between researchers, policymakers, and practitioners across Africa
                            and beyond. Each year, we bring together diverse perspectives to address pressing challenges in climate
                            change, health resilience, and sustainable development.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ConferencesPage;