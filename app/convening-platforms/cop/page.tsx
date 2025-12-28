"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, Globe, Search, Filter, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const COPPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    const copItems = [
        {
            id: 'locally-led-adaptation-metrics',
            title: 'Locally Led Adaptation Metrics Unlocking Finance with Community-Defined Indicators',
            date: 'November 10, 2025',
            year: '2025',
            author: 'Awino',
            excerpt: 'The transition to Locally Led Adaptation (LLA) in Africa is fundamentally hampered by a persistent accountability gap. Despite broad political endorsement, adaptation finance and reporting continue to…',
            tags: ['COP', 'Policy Briefs', 'Locally Led Adaptation', 'Climate Finance'],
            image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=800&q=80'
        },
        {
            id: 'climate-health-emergency',
            title: 'Climate-Health Emergency Policy Pathways for Resilience in Africa (2024)',
            date: 'November 10, 2025',
            year: '2025',
            author: 'Awino',
            excerpt: 'Africa faces a profound and immediate climate-health emergency. Climate related hazards accounted for over 56% of public health emergencies on the continent between 2001 and…',
            tags: ['COP', 'Policy Briefs', 'Climate Health', 'Resilience'],
            image: 'https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&q=80'
        },
        {
            id: 'arin-position-cop30',
            title: 'The Africa Research and Impact Network (ARIN) Position at COP30',
            date: 'November 10, 2025',
            year: '2025',
            author: 'Awino',
            excerpt: 'Driving the Global Goal on Adaptation (GGA) from the Ground Up At COP30, ARIN asserts that Africa must not only participate in, but lead…',
            tags: ['COP', 'Global Goal on Adaptation', 'COP30'],
            image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800&q=80'
        }
    ];

    const years = ['All', '2025', '2024'];

    const filteredItems = copItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesYear = selectedYear === 'All' || item.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    const handleItemClick = (itemId) => {
        console.log('Navigate to COP item:', itemId);
        alert(`Navigate to COP item: ${itemId}\n\nIn your Next.js app, use:\nrouter.push(\`/cop/${itemId}\`)`);
    };

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
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleItemClick(item.id)}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-xs uppercase tracking-wide rounded-full shadow-lg">
                                            COP
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-4">
                                        {item.title}
                                    </h3>

                                    {/* Author and Date */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <User className="w-4 h-4 text-[#46a1bb]" />
                                            <span>Posted by {item.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                            <span>{item.date}</span>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                        {item.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {item.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Read More Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleItemClick(item.id); }}
                                        className="w-full px-5 py-2.5 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-200"
                                    >
                                        <span>Read More</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredItems.length === 0 && (
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