"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Calendar, FileText, Search, Filter, X } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getResearchProjects } from '@/services/researchProjectService';
import { useRouter } from 'next/navigation';

const ResearchProjectsPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getResearchProjects();
                if (mounted) setProjects(data);
            } catch (e: any) {
                if (mounted) setError(e?.message || 'Failed to load projects');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, []);

    const categories = useMemo(() => {
        const set = new Set<string>();
        projects.forEach(p => { if (p.category) set.add(p.category); });
        return ['All', ...Array.from(set)];
    }, [projects]);

    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
    const buildImageUrl = (img?: string) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `http://localhost:5001${img}`;
    };

    const filteredProjects = projects.filter(project => {
        const text = stripHtml(project.description || '');
        const matchesSearch = (project.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleProjectClick = (projectId: string) => {
        router.push(`/programs/research-projects/${projectId}`);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#021d49] via-[#032d6b] to-[#021d49] text-white">
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                    <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                        <div className="text-center">
                            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
                                Research{' '}
                                <span className="text-blue-300">
                                    Projects
                                </span>
                            </h1>
                            <p className="text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
                                Driving evidence-based solutions for sustainable development and climate resilience across Africa
                            </p>
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="max-w-7xl mx-auto px-6 py-12">
                    {/* Search and Filter Section */}
                    <div className="mb-10">
                        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search projects by title or description..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#021d49] focus:outline-none transition-all text-gray-700 placeholder:text-gray-400"
                                    />
                                    {searchTerm && (
                                        <button
                                            onClick={clearSearch}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            aria-label="Clear search"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>

                                {/* Category Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-[#021d49] focus:outline-none transition-all appearance-none bg-white cursor-pointer text-gray-700 font-medium"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            {/* Active Filters Display */}
                            {(searchTerm || selectedCategory !== 'All') && (
                                <div className="mt-4 flex items-center gap-3 flex-wrap">
                                    <span className="text-sm text-gray-600 font-medium">Active filters:</span>
                                    {searchTerm && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#021d49] text-white text-sm rounded-full">
                                            Search: "{searchTerm}"
                                            <button onClick={clearSearch} className="hover:bg-white/20 rounded-full p-0.5">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedCategory !== 'All' && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#021d49] text-white text-sm rounded-full">
                                            Category: {selectedCategory}
                                            <button onClick={() => setSelectedCategory('All')} className="hover:bg-white/20 rounded-full p-0.5">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Results Count */}
                        <div className="mt-4 text-center">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-[#021d49]">{filteredProjects.length}</span> of <span className="font-semibold">{projects.length}</span> projects
                            </p>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#021d49] mb-4"></div>
                            <p className="text-gray-600">Loading projects...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="max-w-md mx-auto text-center py-12">
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                                <p className="text-red-600 font-medium">{error}</p>
                            </div>
                        </div>
                    )}

                    {/* Projects Grid */}
                    {!loading && !error && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => {
                                const imageUrl = buildImageUrl(project.coverImage);
                                return (
                                    <div
                                        key={project._id}
                                        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#021d49] cursor-pointer overflow-hidden transform hover:-translate-y-1"
                                        onClick={() => handleProjectClick(project._id)}
                                    >
                                        {/* Main Image */}
                                        {imageUrl ? (
                                            <div className="h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                                                <img
                                                    src={imageUrl}
                                                    alt={project.title || 'Project image'}
                                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        ) : (
                                            <div className="h-48 w-full bg-gradient-to-br from-[#021d49]/5 to-[#021d49]/10 flex items-center justify-center">
                                                <FileText className="w-16 h-16 text-[#021d49]/30" />
                                            </div>
                                        )}

                                        <div className="p-6 space-y-4">
                                            {/* Title */}
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-snug line-clamp-2 min-h-[3.5rem]">
                                                {project.title}
                                            </h3>

                                            {/* Date and Category Row */}
                                            <div className="flex items-center justify-between gap-3 text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="w-4 h-4 text-[#021d49]" />
                                                    <span className="font-medium">
                                                        {project.date ? new Date(project.date).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            year: 'numeric'
                                                        }) : 'N/A'}
                                                    </span>
                                                </div>

                                                {project.category && (
                                                    <span className="inline-block px-3 py-1 bg-[#021d49]/10 text-[#021d49] text-xs font-bold rounded-full border border-[#021d49]/20">
                                                        {project.category}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 min-h-[4.5rem]">
                                                {stripHtml(project.description || 'No description available').slice(0, 150)}
                                                {stripHtml(project.description || '').length > 150 ? '...' : ''}
                                            </p>

                                            {/* Team Members */}
                                            {project.teamMembers && project.teamMembers.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {project.teamMembers.slice(0, 3).map((member: string, idx: number) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100"
                                                        >
                                                            {member}
                                                        </span>
                                                    ))}
                                                    {project.teamMembers.length > 3 && (
                                                        <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                                            +{project.teamMembers.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}

                                            {/* CTA Button */}
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleProjectClick(project._id); }}
                                                className="mt-4 w-full px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl shadow-md flex items-center gap-2 justify-center hover:bg-[#032d6b] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#021d49]/30 group"
                                                aria-label={`Read more about ${project.title}`}
                                            >
                                                <span>View Details</span>
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* No Results Message */}
                    {!loading && !error && filteredProjects.length === 0 && (
                        <div className="text-center py-20">
                            <div className="max-w-md mx-auto">
                                <div className="bg-gray-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                                    <FileText className="w-12 h-12 text-gray-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">No projects found</h3>
                                <p className="text-gray-600 mb-6">
                                    We couldn't find any projects matching your search criteria.
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setSelectedCategory('All');
                                    }}
                                    className="px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl hover:bg-[#032d6b] transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default ResearchProjectsPage;