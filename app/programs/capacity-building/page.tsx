"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Search, Filter, Target, MapPin } from 'lucide-react';
import Link from 'next/link';
import { getCapacityProjects } from '@/services/capacityBuildingService';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

// ==================== CAPACITY BUILDING LIST PAGE ====================
const CapacityBuildingList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const data = await getCapacityProjects();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    const statuses = ['All', 'Ongoing', 'Completed'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const buildImageUrl = (imagePath: string | undefined) => {
        if (!imagePath) return null;
        if (imagePath.startsWith('http')) return imagePath;
        return `https://api.demo.arin-africa.org${imagePath}`;
    };

    const extractTextFromHtml = (html: string, maxLength: number = 150) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        const text = div.textContent || div.innerText || '';
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    if (loading) {
        return (
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#021d49] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading capacity building programs...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Capacity{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Building
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Empowering African institutions and individuals with knowledge, skills, and tools for climate action and sustainable development
                        </p>
                    </div>

                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search capacity building programs..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {filteredProjects.map((project) => {
                            const img = buildImageUrl(project.image);
                            const excerpt = project.description ? extractTextFromHtml(project.description) : '';

                            return (
                                <Link
                                    href={`/programs/capacity-building/${project._id}`}
                                    key={project._id}
                                    className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] group block"
                                >
                                    {/* Project Image */}
                                    {img && (
                                        <div className="mb-4 rounded-lg overflow-hidden h-48 bg-gray-100">
                                            <img src={img} alt={project.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    {/* Status Badge */}
                                    <div className="flex items-start justify-between mb-4">
                                        <span className={`px-3 py-1 ${project.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white text-xs font-bold rounded-full`}>
                                            {project.status}
                                        </span>
                                        {project.category && (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                                {project.category}
                                            </span>
                                        )}
                                    </div>
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-4">
                                        {project.title}
                                    </h3>
                                    {/* Meta Info */}
                                    <div className="space-y-2 mb-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>Posted on {formatDate(project.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{project.location}</span>
                                        </div>
                                    </div>
                                    {/* Excerpt */}
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                        {excerpt}
                                    </p>
                                    {/* Continue Reading Button */}
                                    <div className="w-full px-4 py-2.5 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg flex items-center gap-2 justify-center hover:bg-gray-900 hover:text-white transition-all">
                                        <span>CONTINUE READING</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* No Results */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No programs found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>
            </div>
            <Footer />

        </>
    );
};

export default CapacityBuildingList;