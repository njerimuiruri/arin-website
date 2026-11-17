"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, Globe, Search, Filter } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { API_CONFIG } from '@/lib/apiConfig';
import Cop31Feature from './Cop31Feature';

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
            const apiBaseUrl = API_CONFIG.BASE_URL;
            const response = await fetch(apiBaseUrl + '/api/cop', {
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

    return (
        <>
            <Navbar />
            <div className="w-full bg-slate-50 min-h-screen">
                <Cop31Feature />

                {/* Archive of COP materials from the CMS */}
                {(loading || cops.length > 0) && (
                    <section className="max-w-6xl mx-auto px-6 pt-12" aria-labelledby="cop-archive-title">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-5">
                            <div>
                                <h2 id="cop-archive-title" className="text-2xl font-bold text-gray-900">More COP materials</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    Briefs, statements and resources from ARIN&apos;s engagement at previous Conferences of the Parties.
                                </p>
                            </div>
                            <div className="flex gap-3 w-full md:w-auto">
                                <div className="relative flex-1 md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search COP content..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors"
                                        aria-label="Search COP content"
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none appearance-none bg-white cursor-pointer"
                                        aria-label="Filter by year"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year === 'All' ? 'All years' : year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {loading && (
                            <div className="animate-pulse text-center text-gray-500 py-10">Loading COP content...</div>
                        )}

                        <ul className="grid lg:grid-cols-2 gap-4">
                            {filteredCops.map((cop) => (
                                <li key={cop._id}>
                                    <button
                                        type="button"
                                        onClick={() => handleCopClick(cop._id)}
                                        className="w-full text-left bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 hover:border-[#021d49] transition-all group flex"
                                    >
                                        <div className="relative w-32 sm:w-40 shrink-0 bg-[#021d49]">
                                            {cop.image ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={cop.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Globe className="w-10 h-10 text-white/40" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 min-w-0 flex-1">
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                                <Calendar className="w-3.5 h-3.5 text-[#021d49]" />
                                                <span>{new Date(cop.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                            </div>
                                            <h3 className="font-semibold text-gray-900 group-hover:text-[#021d49] leading-snug line-clamp-2">
                                                {cop.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 leading-relaxed mt-1 line-clamp-2">
                                                {cop.description.replace(/<[^>]*>/g, '')}
                                            </p>
                                            <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-[#021d49]">
                                                View details
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {!loading && filteredCops.length === 0 && (
                            <div className="text-center py-10 bg-white rounded-xl border border-gray-200">
                                <h3 className="font-semibold text-gray-900 mb-1">No COP content found</h3>
                                <p className="text-sm text-gray-600">Try adjusting your search or filter.</p>
                            </div>
                        )}
                    </section>
                )}

                <div className="pb-16" />
            </div>
        </>
    );
};

export default COPPage;
