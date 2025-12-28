"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, Users, Search, Filter, Heart, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const CSRPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    const csrActivities = [
        {
            id: 'odhong-football-club',
            title: 'The Inauguration of Odhong Football Club in Nyakach-Kisumu County by the ARIN Convener Dr. Joanes Atela',
            date: 'May 31, 2021',
            year: '2021',
            author: 'ARIN Team',
            excerpt: 'In support of youth empowerment, the ARIN Convener Dr Joanes Atela was joined by ARIN…',
            tags: ['Youth Empowerment', 'Sports', 'Community Development'],
            image: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800&q=80',
            category: 'Youth Empowerment'
        }
    ];

    const years = ['All', '2021'];

    const filteredActivities = csrActivities.filter(activity => {
        const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesYear = selectedYear === 'All' || activity.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    const handleActivityClick = (activityId) => {
        console.log('Navigate to CSR activity:', activityId);
        alert(`Navigate to CSR activity: ${activityId}\n\nIn your Next.js app, use:\nrouter.push(\`/csr/${activityId}\`)`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Heart className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Corporate Social{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Responsibility
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            ARIN's commitment to community development, youth empowerment, and social impact across Africa
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
                                        placeholder="Search CSR activities..."
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

                    {/* CSR Activities - Horizontal Card Layout */}
                    <div className="space-y-6 max-w-6xl mx-auto">
                        {filteredActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleActivityClick(activity.id)}
                            >
                                <div className="md:flex">
                                    {/* Left Side - Image */}
                                    <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                                        <img
                                            src={activity.image}
                                            alt={activity.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                        {/* Category Badge - Bottom Left */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-4 py-2 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-sm uppercase tracking-wide rounded-lg shadow-xl">
                                                {activity.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="md:w-3/5 p-8">
                                        {/* Title */}
                                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-4">
                                            {activity.title}
                                        </h3>

                                        {/* Date and Author */}
                                        <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                                <span>{activity.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <User className="w-4 h-4 text-[#46a1bb]" />
                                                <span>{activity.author}</span>
                                            </div>
                                        </div>

                                        {/* Excerpt */}
                                        <p className="text-base text-gray-600 leading-relaxed mb-6">
                                            {activity.excerpt}
                                        </p>

                                        {/* Tags and Button Row */}
                                        <div className="flex items-center justify-between gap-4">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 flex-1">
                                                {activity.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Read More Button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleActivityClick(activity.id); }}
                                                className="px-6 py-3 bg-gradient-to-r from-[#021d49] to-[#46a1bb] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200 whitespace-nowrap"
                                            >
                                                <span>Read More</span>
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredActivities.length === 0 && (
                        <div className="text-center py-16">
                            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No CSR activities found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>

                {/* CSR Impact Section */}
                <section className="max-w-[1600px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Our CSR Impact</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <Heart className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Community Development</h3>
                                <p className="text-gray-300 text-sm">Supporting grassroots initiatives and empowering local communities</p>
                            </div>
                            <div className="text-center">
                                <Users className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Youth Empowerment</h3>
                                <p className="text-gray-300 text-sm">Creating opportunities for young people to thrive and lead</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Sustainable Impact</h3>
                                <p className="text-gray-300 text-sm">Long-term programs that create lasting positive change</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            ARIN is committed to giving back to the communities we serve. Through our CSR initiatives, we support
                            youth empowerment, sports development, education, and community-led development projects across Africa.
                            Our goal is to create sustainable impact that transforms lives and strengthens communities.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CSRPage;