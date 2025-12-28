"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, MessageSquare, Search, Filter } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const PolicyDialoguesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    const dialogues = [
        {
            id: 'community-leaders-drr',
            title: 'Community Leaders Dialogues on Disaster Risk Reduction (DRR) and Gender Intersectionality under the Nairobi City Risk Hub, 2020',
            date: 'December 10, 2020',
            year: '2020',
            excerpt: 'The Nairobi Risk Hub Secretariat (African Centre for Technology Studies -ACTS), Nairobi City County Government…',
            tags: ['DRR', 'Gender', 'Urban Risk'],
            status: 'Completed'
        },
        {
            id: 'climate-finance-ndcs',
            title: 'Making Climate Finance Work for Africa: Using NDCs to Leverage Climate Finance for Innovation System Building',
            date: 'August 10, 2020',
            year: '2020',
            excerpt: 'The workshop was organized by the Africa Sustainability Hub (ASH), a networked research and knowledge…',
            tags: ['Climate Finance', 'NDCs', 'Innovation'],
            status: 'Completed'
        }
    ];

    const years = ['All', '2020'];

    const filteredDialogues = dialogues.filter(dialogue => {
        const matchesSearch = dialogue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dialogue.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = selectedYear === 'All' || dialogue.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    const handleDialogueClick = (dialogueId) => {
        console.log('Navigate to dialogue:', dialogueId);
        alert(`Navigate to policy dialogue: ${dialogueId}\n\nIn your Next.js app, use:\nrouter.push(\`/policy-dialogues/${dialogueId}\`)`);
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
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
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

                    {/* Dialogues Grid */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {filteredDialogues.map((dialogue) => (
                            <div
                                key={dialogue.id}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer"
                                onClick={() => handleDialogueClick(dialogue.id)}
                            >
                                {/* Header with Status */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-[#46a1bb]" />
                                        <span className="text-sm font-semibold text-[#46a1bb]">Policy Dialogue</span>
                                    </div>
                                    <span className={`px-3 py-1 ${dialogue.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white text-xs font-bold rounded-full whitespace-nowrap`}>
                                        {dialogue.status}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-gray-900 hover:text-[#46a1bb] transition-colors leading-tight mb-4">
                                    {dialogue.title}
                                </h3>

                                {/* Date */}
                                <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4" />
                                    <span>{dialogue.date}</span>
                                </div>

                                {/* Excerpt */}
                                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                    {dialogue.excerpt}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {dialogue.tags.map((tag, index) => (
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
                                    onClick={(e) => { e.stopPropagation(); handleDialogueClick(dialogue.id); }}
                                    className="w-full px-5 py-2.5 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#46a1bb] focus:ring-opacity-60"
                                    aria-label={`Read more about ${dialogue.title}`}
                                >
                                    <span>read more</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {filteredDialogues.length === 0 && (
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