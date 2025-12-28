"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, MapPin, Clock, Briefcase, Search, Filter, DollarSign, Users, FileText } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const VacanciesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const vacancies = [
        {
            id: 'research-fellow-climate',
            title: 'Research Fellow - Climate Adaptation',
            location: 'Nairobi, Kenya',
            type: 'Full-time',
            deadline: 'January 31, 2025',
            postedDate: 'December 15, 2024',
            status: 'Open',
            salary: 'Competitive',
            excerpt: 'ARIN is seeking a highly motivated Research Fellow to lead climate adaptation research projects across East Africa. The ideal candidate will have expertise in climate science, policy analysis, and community engagement.',
            requirements: ['PhD in Climate Science, Environmental Studies, or related field', '5+ years research experience', 'Strong publication record'],
            tags: ['Research', 'Climate', 'Full-time'],
            poster: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80'
        },
        {
            id: 'policy-analyst',
            title: 'Policy Analyst - Health Systems',
            location: 'Accra, Ghana',
            type: 'Full-time',
            deadline: 'February 15, 2025',
            postedDate: 'December 10, 2024',
            status: 'Open',
            salary: '$45,000 - $60,000',
            excerpt: 'We are looking for a Policy Analyst to support our health systems strengthening initiatives. This role involves analyzing health policies, conducting stakeholder consultations, and developing policy briefs.',
            requirements: ['Master\'s degree in Public Health or related field', 'Policy analysis experience', 'Excellent writing skills'],
            tags: ['Policy', 'Health', 'Full-time'],
            poster: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80'
        },
        {
            id: 'communications-officer',
            title: 'Communications Officer',
            location: 'Remote',
            type: 'Contract',
            deadline: 'January 20, 2025',
            postedDate: 'December 5, 2024',
            status: 'Open',
            salary: 'Negotiable',
            excerpt: 'ARIN seeks a creative Communications Officer to manage our digital presence, develop content strategies, and engage with stakeholders across multiple platforms.',
            requirements: ['Bachelor\'s degree in Communications or Journalism', '3+ years experience', 'Social media expertise'],
            tags: ['Communications', 'Remote', 'Contract'],
            poster: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80'
        },
        {
            id: 'data-scientist',
            title: 'Data Scientist - Climate Modeling',
            location: 'Kigali, Rwanda',
            type: 'Full-time',
            deadline: 'March 1, 2025',
            postedDate: 'December 1, 2024',
            status: 'Open',
            salary: '$50,000 - $70,000',
            excerpt: 'Join our team as a Data Scientist to develop climate models and analyze large datasets for evidence-based policy recommendations across Africa.',
            requirements: ['Master\'s or PhD in Data Science, Statistics, or related field', 'Python/R programming', 'Machine learning experience'],
            tags: ['Data Science', 'Climate', 'Full-time'],
            poster: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
        },
        {
            id: 'program-coordinator',
            title: 'Program Coordinator - Youth Engagement',
            location: 'Lagos, Nigeria',
            type: 'Part-time',
            deadline: 'November 30, 2024',
            postedDate: 'October 15, 2024',
            status: 'Closed',
            salary: '$30,000 - $40,000',
            excerpt: 'Support the coordination of youth-focused climate action programs, including workshop organization, stakeholder engagement, and monitoring and evaluation.',
            requirements: ['Bachelor\'s degree in relevant field', 'Project management experience', 'Youth engagement background'],
            tags: ['Program Management', 'Youth', 'Part-time'],
            poster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80'
        }
    ];

    const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Remote'];
    const statusOptions = ['All', 'Open', 'Closed'];

    const filteredVacancies = vacancies.filter(vacancy => {
        const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vacancy.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vacancy.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || vacancy.type === selectedType;
        const matchesStatus = selectedStatus === 'All' || vacancy.status === selectedStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    const handleVacancyClick = (vacancyId) => {
        console.log('Navigate to vacancy:', vacancyId);
        alert(`Navigate to vacancy: ${vacancyId}\n\nIn your Next.js app, use:\nrouter.push(\`/vacancies/${vacancyId}\`)`);
    };

    const openVacancies = vacancies.filter(v => v.status === 'Open').length;
    const closedVacancies = vacancies.filter(v => v.status === 'Closed').length;

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Briefcase className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Career{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Opportunities
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Join the Africa Research and Impact Network and be part of a dynamic team driving research excellence and policy impact across Africa
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#46a1bb] mb-1">{vacancies.length}</div>
                                <p className="text-sm text-gray-600">Total Positions</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">{openVacancies}</div>
                                <p className="text-sm text-gray-600">Open Positions</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-gray-400 mb-1">{closedVacancies}</div>
                                <p className="text-sm text-gray-600">Closed Positions</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#46a1bb] mb-1">5</div>
                                <p className="text-sm text-gray-600">Locations</p>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                            <div className="grid md:grid-cols-3 gap-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search vacancies..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Type Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {jobTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Status Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vacancies List - Horizontal Card Layout */}
                    <div className="space-y-6 max-w-6xl mx-auto">
                        {filteredVacancies.map((vacancy) => (
                            <div
                                key={vacancy.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleVacancyClick(vacancy.id)}
                            >
                                <div className="md:flex">
                                    {/* Left Side - Poster Image */}
                                    <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                                        <img
                                            src={vacancy.poster}
                                            alt={vacancy.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                        {/* Status Badge - Bottom Left */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className={`px-4 py-2 ${vacancy.status === 'Open' ? 'bg-green-500' : 'bg-gray-500'} text-white font-bold text-sm uppercase tracking-wide rounded-lg shadow-xl`}>
                                                {vacancy.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="md:w-3/5 p-8">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3">
                                                    {vacancy.type}
                                                </span>
                                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-2">
                                                    {vacancy.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Key Details Grid */}
                                        <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="w-4 h-4 text-[#46a1bb] flex-shrink-0" />
                                                <span className="text-gray-700 font-medium">{vacancy.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <DollarSign className="w-4 h-4 text-[#46a1bb] flex-shrink-0" />
                                                <span className="text-gray-700 font-medium">{vacancy.salary}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Clock className="w-4 h-4 text-[#46a1bb] flex-shrink-0" />
                                                <span className="text-gray-600">Deadline: {vacancy.deadline}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="w-4 h-4 text-[#46a1bb] flex-shrink-0" />
                                                <span className="text-gray-600">Posted: {vacancy.postedDate}</span>
                                            </div>
                                        </div>

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                            {vacancy.excerpt}
                                        </p>

                                        {/* Tags and Button Row */}
                                        <div className="flex items-center justify-between gap-4">
                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 flex-1">
                                                {vacancy.tags.slice(0, 3).map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleVacancyClick(vacancy.id); }}
                                                className={`px-6 py-3 ${vacancy.status === 'Open' ? 'bg-gradient-to-r from-[#021d49] to-[#46a1bb] hover:shadow-xl' : 'bg-gray-400'} text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200 whitespace-nowrap`}
                                                disabled={vacancy.status === 'Closed'}
                                            >
                                                <FileText className="w-4 h-4" />
                                                <span>{vacancy.status === 'Open' ? 'View Details' : 'Closed'}</span>
                                                {vacancy.status === 'Open' && <ArrowRight className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredVacancies.length === 0 && (
                        <div className="text-center py-16">
                            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No vacancies found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>

                {/* Why Join ARIN Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Join ARIN?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <Users className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Collaborative Network</h3>
                                <p className="text-gray-300 text-sm">Work with over 200 researchers and policymakers across Africa</p>
                            </div>
                            <div className="text-center">
                                <Briefcase className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Impactful Work</h3>
                                <p className="text-gray-300 text-sm">Drive evidence-based policy change and sustainable development</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#46a1bb] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Professional Growth</h3>
                                <p className="text-gray-300 text-sm">Access continuous learning and career development opportunities</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            At ARIN, we're committed to fostering a diverse, inclusive workplace where innovation thrives.
                            Join us in shaping Africa's future through cutting-edge research and impactful policy engagement.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
};

export default VacanciesPage;