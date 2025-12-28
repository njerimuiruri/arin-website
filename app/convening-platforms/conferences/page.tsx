"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, Users, Search, Filter, User, Presentation } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const ConferencesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    const conferences = [
        {
            id: 'arin-conference-2024',
            title: '2024 : THE 4TH ANNUAL ARIN INTERNATIONAL CONFERENCE – BRIDGING KNOWLEDGE GAPS: INTEGRATING DISCIPLINES FOR CLIMATE AND HEALTH RESILIENCE',
            date: 'July 29, 2024',
            year: '2024',
            author: 'Awino',
            excerpt: 'The 4th International Conference has organized by the Africa Research and Impact Network (ARIN). ARIN is a consortium of over 200 researchers and policymakers with national focal points across…',
            tags: ['ARIN International conference', 'Conferences', 'Climate', 'Health Resilience'],
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
            edition: '4th Annual'
        },
        {
            id: 'arin-conference-2022',
            title: '2022: "REBUILDING BETTER AND RESILIENT COMMUNITIES THROUGH A JUST TRANSITION FOR AFRICA -WHAT DOES COP 27 OFFER? "',
            date: 'July 22, 2024',
            year: '2022',
            author: 'Awino',
            excerpt: 'Introduction The World is on the verge of and amid several transitions structured by major social, economic, and environmental disruptions including climate change, COVID-19, and knowledge shifts. These disruptions are…',
            tags: ['ARIN International conference', 'Just Transition', 'COP27', 'Resilience'],
            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80',
            edition: '2022 Conference'
        },
        {
            id: 'arin-conference-2020',
            title: "2020: INTERNATIONAL REFLECTIVE CONFERENCE 2021 ON 'EVIDENCE- DRIVEN SUSTAINABLE RECOVERY FROM GLOBAL INTRACTABLE CHALLENGES'",
            date: 'July 22, 2024',
            year: '2020',
            author: 'Awino',
            excerpt: "Click here to register for the conference END YEAR INTERNATIONAL REFLECTIVE CONFERENCE 'EVIDENCE - DRIVEN SUSTAINABLE RECOVERY FROM GLOBAL INTRACTABLE CHALLENGES' on 25th, 26th and 29th November 2021. As the world reconfigures its efforts towards addressing the changing nature of global challenges such…",
            tags: ['ARIN International conference', 'Sustainable Recovery', 'Global Challenges'],
            image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80',
            edition: '2020/2021 Conference'
        }
    ];

    const years = ['All', '2024', '2022', '2020'];

    const filteredConferences = conferences.filter(conference => {
        const matchesSearch = conference.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conference.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            conference.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesYear = selectedYear === 'All' || conference.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    const handleConferenceClick = (conferenceId: string) => {
        console.log('Navigate to conference:', conferenceId);
        alert(`Navigate to conference: ${conferenceId}\n\nIn your Next.js app, use:\nrouter.push(\`/conferences/${conferenceId}\`)`);
    };

    return (

        <>
            <Navbar />
            <div className="w-full bg-linear-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-400 mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Presentation className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            ARIN International{' '}
                            <span className="bg-linear-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
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

                    {/* Conferences Grid */}
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                        {filteredConferences.map((conference) => (
                            <div
                                key={conference.id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleConferenceClick(conference.id)}
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={conference.image}
                                        alt={conference.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-linear-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-xs uppercase tracking-wide rounded-full shadow-lg">
                                            {conference.edition}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-900 font-bold text-sm rounded-full shadow-lg">
                                            {conference.year}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-4">
                                        {conference.title}
                                    </h3>

                                    {/* Author and Date */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <User className="w-4 h-4 text-[#46a1bb]" />
                                            <span>Posted by {conference.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                            <span>{conference.date}</span>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                        {conference.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {conference.tags.map((tag, index) => (
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
                                        onClick={(e) => { e.stopPropagation(); handleConferenceClick(conference.id); }}
                                        className="w-full px-5 py-2.5 bg-linear-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-200"
                                    >
                                        <span>Read More</span>
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
                                <div className="text-4xl font-bold text-[#46a1bb] mb-2">{conferences.length}</div>
                                <p className="text-gray-300 text-sm">Conferences Held</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#46a1bb] mb-2">200+</div>
                                <p className="text-gray-300 text-sm">Network Members</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#46a1bb] mb-2">30+</div>
                                <p className="text-gray-300 text-sm">Countries</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#46a1bb] mb-2">1000+</div>
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