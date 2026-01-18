"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, Globe, Search, Filter } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

interface Cop {
    _id: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    availableResources?: string[];
    year?: number;
}

const COPPage = () => {
    const router = useRouter();
    const [cops, setCops] = useState<Cop[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    useEffect(() => {
        fetchCops();
    }, []);

    const fetchCops = async () => {
        try {
            const apiBaseUrl = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : '') || 'http://localhost:5001';
            const response = await fetch(apiBaseUrl + '/cop', {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to fetch COP items');
            const data = await response.json();
            
            // Fix image URLs to include backend base URL
            const fixedData = data.map((cop: Cop) => ({
                ...cop,
                image: cop.image && cop.image.startsWith('/uploads') 
                    ? apiBaseUrl + cop.image 
                    : cop.image
            }));
            
            setCops(fixedData);
        } catch (error) {
            console.error('Error fetching COP items:', error);
            setCops([]);
        } finally {
            setLoading(false);
        }
    };

    const years = ['All', ...Array.from(new Set(cops.map(c => c.year?.toString() || ''))).filter(Boolean).sort().reverse()];

    const filteredCops = cops.filter(cop => {
        const matchesSearch = cop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            cop.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = selectedYear === 'All' || cop.year?.toString() === selectedYear;
        return matchesSearch && matchesYear;
    });

    const handleCopClick = (copId: string) => {
        router.push(`/convening-platforms/cop/${copId}`);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen flex items-center justify-center">
                    <div className="animate-pulse text-center">Loading COP content...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Globe className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Conference of the{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Parties (COP)
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            ARIN's contributions to global climate policy discussions, driving African-led solutions and advancing the Global Goal on Adaptation
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
                                        placeholder="Search COP content..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Year Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COP Items Grid */}
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {filteredCops.map((cop) => (
                            <div
                                key={cop._id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleCopClick(cop._id)}
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    {cop.image ? (
                                        <img
                                            src={cop.image}
                                            alt={cop.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#021d49] to-[#46a1bb] flex items-center justify-center">
                                            <Globe className="w-16 h-16 text-white/50" />
                                        </div>
                                    )}
                                    {cop.year && (
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 font-bold text-sm rounded-full shadow-lg">
                                                {cop.year}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-3 line-clamp-3">
                                        {cop.title}
                                    </h3>

                                    {/* Date */}
                                    <div className="space-y-2 mb-3">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                            <span>{new Date(cop.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                        {cop.description.replace(/<[^>]*>/g, '')}
                                    </p>

                                    {/* Read More Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleCopClick(cop._id); }}
                                        className="w-full px-5 py-2.5 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-200"
                                    >
                                        <span>View Details</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredCops.length === 0 && (
                        <div className="text-center py-16">
                            <Globe className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No COP content found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>

                {/* Info Section */}
                <section className="max-w-[1600px] mx-auto px-6 pb-16">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">ARIN at COP</h2>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            The Africa Research and Impact Network actively participates in Conference of the Parties (COP) meetings,
                            bringing evidence-based research and African perspectives to global climate negotiations. Our work focuses on
                            advancing locally-led adaptation, strengthening climate-health linkages, and ensuring African voices lead
                            the development of the Global Goal on Adaptation.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default COPPage;