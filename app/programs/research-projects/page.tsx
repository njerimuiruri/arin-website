"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, FileText, Search, Filter } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const ResearchProjectsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const projects = [
        {
            id: 'soar-2025',
            title: 'State of Adaptation Report, 2025 (SOAR,2025)',
            date: 'June 24, 2025',
            category: 'Climate Adaptation',
            excerpt: 'Africa stands at the frontline of the global climate crisis, confronting increasing risks across vital livelihood sectors, including agriculture, water, health, ecosystems, infrastructure, and human settlements.',
            tags: ['Climate Change', 'Adaptation', 'Policy'],
            status: 'Ongoing'
        },
        {
            id: 'just-transitions-africa',
            title: 'The Global Political Economy of Just Transitions for and in Africa',
            date: 'June 10, 2025',
            category: 'Economic Development',
            excerpt: 'The Project is a multi-country research initiative that seeks to explore how global and local political economy dynamics shape just transition pathways in Africa.',
            tags: ['Just Transition', 'Political Economy', 'Energy'],
            status: 'Ongoing'
        },
        {
            id: 'funding-loss-damage',
            title: 'Funding Loss and Damage in African LDCs: Challenges and Opportunities',
            date: 'February 3, 2025',
            category: 'Climate Finance',
            excerpt: 'The "Funding arrangements for loss and damage associated with slow onset climate impacts: an analysis of African Least Developed Countries" project examines financing mechanisms.',
            tags: ['Loss and Damage', 'Finance', 'LDCs'],
            status: 'Completed'
        },
        {
            id: 'ndc-finance-africa',
            title: 'Building capacity and mobilizing knowledge towards catalyzing NDC finance in Africa',
            date: 'January 15, 2025',
            category: 'Capacity Building',
            excerpt: 'This initiative focuses on strengthening African countries\' capacity to access and mobilize finance for implementing their Nationally Determined Contributions (NDCs).',
            tags: ['NDC', 'Finance', 'Capacity Building'],
            status: 'Ongoing'
        }
    ];

    const categories = ['All', 'Climate Adaptation', 'Economic Development', 'Climate Finance', 'Capacity Building'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleProjectClick = (projectId) => {
        console.log('Navigate to project:', projectId);
        alert(`Navigate to project: ${projectId}\n\nIn your Next.js app, use:\nrouter.push(\`/research-projects/${projectId}\`)`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Research{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Driving evidence-based solutions for sustainable development and climate resilience across Africa
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
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Projects Compact Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProjects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer"
                                onClick={() => handleProjectClick(project.id)}
                            >
                                {/* Header with Status */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 hover:text-[#46a1bb] transition-colors leading-tight mb-2">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <span className={`ml-2 px-2 py-1 ${project.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white text-xs font-bold rounded-full whitespace-nowrap`}>
                                        {project.status}
                                    </span>
                                </div>

                                {/* Date and Category */}
                                <div className="flex items-center gap-3 mb-3 text-sm text-gray-600">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{project.date}</span>
                                    </div>
                                </div>

                                {/* Category Badge */}
                                <div className="mb-3">
                                    <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Excerpt */}
                                <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">
                                    {project.excerpt}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1 mb-3">
                                    {project.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* View Details Link */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleProjectClick(project.id); }}
                                    className="mt-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center hover:from-blue-700 hover:to-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-60 w-full"
                                    aria-label={`Read more about ${project.title}`}
                                >
                                    <span>Read More</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredProjects.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>

                {/* Stats Section */}
                <section className="max-w-[1600px] mx-auto px-6 pb-16">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#46a1bb] mb-2">{projects.length}</div>
                                <p className="text-gray-300 text-sm">Active Projects</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#46a1bb] mb-2">15+</div>
                                <p className="text-gray-300 text-sm">Partner Countries</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#46a1bb] mb-2">50+</div>
                                <p className="text-gray-300 text-sm">Publications</p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-[#46a1bb] mb-2">100K+</div>
                                <p className="text-gray-300 text-sm">People Impacted</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ResearchProjectsPage;