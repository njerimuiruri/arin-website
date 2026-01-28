"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Calendar, Search, Filter, Briefcase, Users } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

interface Vacancy {
    _id: string;
    positionName: string;
    employmentType: string;
    description: string;
    image?: string;
    datePosted: string;
    deadline: string;
}

const VacanciesPage = () => {
    const router = useRouter();
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');

    useEffect(() => {
        fetchVacancies();
    }, []);

    const fetchVacancies = async () => {
        try {
            const apiBaseUrl = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : '') || 'http://localhost:5001';
            const response = await fetch(apiBaseUrl + '/api/vacancies', {
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error('Failed to fetch vacancies');
            const data = await response.json();

            // Fix image URLs to include backend base URL
            const fixedData = data.map((vacancy: Vacancy) => ({
                ...vacancy,
                image: vacancy.image && vacancy.image.startsWith('/uploads')
                    ? apiBaseUrl + vacancy.image
                    : vacancy.image
            }));

            setVacancies(fixedData);
        } catch (error) {
            console.error('Error fetching vacancies:', error);
            setVacancies([]);
        } finally {
            setLoading(false);
        }
    };

    const jobTypes = ['All', 'Full-time', 'Part-time'];

    const filteredVacancies = vacancies.filter(vacancy => {
        const matchesSearch = vacancy.positionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            vacancy.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || vacancy.employmentType === selectedType;
        return matchesSearch && matchesType;
    });

    const handleVacancyClick = (vacancyId: string) => {
        router.push(`/opportunities/vacancies/${vacancyId}`);
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen flex items-center justify-center">
                    <div className="animate-pulse text-center">Loading vacancies...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Briefcase className="w-12 h-12 text-[#021d49]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Career{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Opportunities
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Join the Africa Research and Impact Network and be part of a dynamic team driving research excellence and policy impact across Africa
                        </p>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-2xl p-10 text-white shadow-2xl mb-12">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">{vacancies.length}</div>
                                <p className="text-sm text-gray-200">Open Positions</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">{vacancies.filter(v => v.employmentType === 'Full-time').length}</div>
                                <p className="text-sm text-gray-200">Full-time Jobs</p>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">{vacancies.filter(v => v.employmentType === 'Part-time').length}</div>
                                <p className="text-sm text-gray-200">Part-time Jobs</p>
                            </div>
                        </div>
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
                                        placeholder="Search vacancies..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Type Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {jobTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vacancies List - Card Layout */}
                    {filteredVacancies.length === 0 ? (
                        <div className="text-center py-12">
                            <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No vacancies found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {filteredVacancies.map((vacancy) => (
                                <div
                                    key={vacancy._id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] cursor-pointer group"
                                    onClick={() => handleVacancyClick(vacancy._id)}
                                >
                                    {/* Image */}
                                    {vacancy.image && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={vacancy.image}
                                                alt={vacancy.positionName}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-3">
                                            <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-bold text-xs uppercase tracking-wide rounded-full">
                                                {vacancy.employmentType}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors mb-2">
                                            {vacancy.positionName}
                                        </h3>

                                        {/* Description */}
                                        <div
                                            className="text-sm text-gray-600 line-clamp-3 mb-3"
                                            dangerouslySetInnerHTML={{ __html: vacancy.description.substring(0, 150) + '...' }}
                                        />

                                        {/* Dates */}
                                        <div className="space-y-1 text-sm text-gray-500 mb-4">
                                            {vacancy.datePosted && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>Posted: {new Date(vacancy.datePosted).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                            {vacancy.deadline && (
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-red-500" />
                                                    <span className="text-red-600 font-medium">Deadline: {new Date(vacancy.deadline).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Button */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleVacancyClick(vacancy._id); }}
                                            className="w-full px-4 py-2 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 flex items-center gap-2 justify-center"
                                        >
                                            <span>View Details</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Info Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-16">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Join ARIN?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <Briefcase className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Collaborative Network</h3>
                                <p className="text-gray-300 text-sm">Work with over 200 researchers and policymakers across Africa</p>
                            </div>
                            <div className="text-center">
                                <Users className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Impactful Work</h3>
                                <p className="text-gray-300 text-sm">Drive evidence-based policy change and sustainable development</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
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