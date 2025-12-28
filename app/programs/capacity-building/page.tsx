"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, Search, Filter, Users, Target, ArrowLeft, BookOpen, Download, Share2, Clock, MapPin, Award } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

// ==================== CAPACITY BUILDING LIST PAGE ====================
const CapacityBuildingList = ({ onProjectClick }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');

    const projects = [
        {
            id: 'cfs-centre',
            title: 'The Climate Finance and Sustainability CFS (Centre)',
            date: 'October 3, 2023',
            status: 'Ongoing',
            location: 'Pan-African',
            duration: 'Ongoing',
            participants: '1000+ professionals',
            excerpt: 'The Climate Finance and Sustainability (CFS) Centre is one of the first Southern-Driven Centres of Excellence, aimed at enhancing climate finance and sustainability training in Africa.',
            tags: ['Training', 'Climate Finance', 'Sustainability']
        },
        {
            id: 'arin-ash-summer-school',
            title: 'Invitation to apply to the ARIN-ASH summer school',
            date: 'May 13, 2020',
            status: 'Completed',
            location: 'Africa',
            duration: '3 months',
            participants: '50+ scholars',
            excerpt: 'The Africa Sustainability Hub (ASH) is looking for young scholars willing to be part of a network of correspondents across and beyond Africa. The network shall purpose...',
            tags: ['Training', 'Programs', 'Youth Development']
        }
    ];

    const statuses = ['All', 'Ongoing', 'Completed'];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = selectedStatus === 'All' || project.status === selectedStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
            {/* Hero Section */}
            <section className="max-w-[1600px] mx-auto px-6 py-12">
                <div className="text-center mb-8">
                    <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                        Capacity{' '}
                        <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
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
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors"
                                />
                            </div>
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <select
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
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
                    {filteredProjects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                            onClick={() => onProjectClick(project.id)}
                        >
                            {/* Status Badge */}
                            <div className="flex items-start justify-between mb-4">
                                <span className={`px-3 py-1 ${project.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white text-xs font-bold rounded-full`}>
                                    {project.status}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-4">
                                {project.title}
                            </h3>

                            {/* Meta Info */}
                            <div className="space-y-2 mb-4 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Posted on {project.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{project.location}</span>
                                </div>
                            </div>

                            {/* Excerpt */}
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                {project.excerpt}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag, index) => (
                                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Continue Reading Button */}
                            <button
                                onClick={(e) => { e.stopPropagation(); onProjectClick(project.id); }}
                                className="w-full px-4 py-2.5 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg flex items-center gap-2 justify-center hover:bg-gray-900 hover:text-white transition-all"
                            >
                                <span>CONTINUE READING</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
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
    );
};

// ==================== CAPACITY BUILDING DETAIL PAGE ====================
const CapacityBuildingDetail = ({ projectId, onBack }) => {
    // Project database
    const projectsDatabase = {
        'cfs-centre': {
            id: 'cfs-centre',
            title: 'The Climate Finance and Sustainability CFS (Centre)',
            date: 'October 3, 2023',
            status: 'Ongoing',
            location: 'Pan-African',
            duration: 'Ongoing Initiative',
            category: 'Training',
            description: 'The Climate Finance and Sustainability (CFS) Centre is one of the first Southern-Driven Centres of Excellence, aimed at enhancing climate finance and sustainability training in Africa. The Centre serves as a beacon of knowledge, providing comprehensive training programs, research opportunities, and capacity building initiatives for professionals, policymakers, and institutions across the African continent.',
            objectives: [
                'Establish a premier training hub for climate finance and sustainability in Africa',
                'Develop and deliver cutting-edge curriculum on climate finance mechanisms and tools',
                'Build capacity of African professionals in accessing and managing climate finance',
                'Foster research and innovation in climate finance and sustainable development',
                'Create partnerships with international institutions for knowledge exchange and collaboration'
            ],
            outcomes: [
                'Over 1000+ professionals trained in climate finance and sustainability',
                'Development of specialized training modules tailored to African contexts',
                'Establishment of alumni network spanning 30+ African countries',
                'Publication of research papers and policy briefs on climate finance',
                'Recognition as a leading Centre of Excellence in Southern-Driven climate initiatives'
            ],
            partners: [
                'African Development Bank',
                'United Nations Environment Programme',
                'African Climate Foundation',
                'Regional Universities and Research Institutions',
                'Government Ministries of Finance and Environment'
            ],
            resources: [
                { name: 'CFS Centre Overview', size: '3.2 MB', type: 'PDF' },
                { name: 'Training Programs Catalog', size: '5.8 MB', type: 'PDF' },
                { name: 'Annual Report 2023', size: '4.5 MB', type: 'PDF' }
            ]
        },
        'arin-ash-summer-school': {
            id: 'arin-ash-summer-school',
            title: 'Invitation to apply to the ARIN-ASH summer school',
            date: 'May 13, 2020',
            status: 'Completed',
            location: 'Africa',
            duration: '3 months',
            category: 'Training Programs',
            description: 'The Africa Sustainability Hub (ASH) is looking for young scholars willing to be part of a network of correspondents across and beyond Africa. The network shall purpose to strengthen the capacity of young researchers and practitioners in sustainability science, climate action, and environmental policy. This summer school brought together emerging leaders from diverse backgrounds to engage in intensive learning, research collaboration, and knowledge sharing on critical sustainability challenges facing the African continent.',
            objectives: [
                'Build a network of young sustainability correspondents across Africa',
                'Enhance research and analytical skills in sustainability science',
                'Foster collaboration among young scholars from different African countries',
                'Develop communication and reporting skills on sustainability issues',
                'Create pathways for continued engagement in climate and sustainability work'
            ],
            outcomes: [
                '50+ young scholars participated from 15 African countries',
                'Formation of active alumni network continuing collaborative research',
                'Publication of student research papers on African sustainability challenges',
                'Development of policy briefs shared with national governments',
                'Establishment of ongoing mentorship program for participants'
            ],
            partners: [
                'African Research and Impact Network (ARIN)',
                'Africa Sustainability Hub (ASH)',
                'Partner Universities across Africa',
                'International Development Research Centre',
                'African Climate Policy Centre'
            ],
            resources: [
                { name: 'Summer School Program Guide', size: '2.8 MB', type: 'PDF' },
                { name: 'Participant Research Compendium', size: '8.4 MB', type: 'PDF' },
                { name: 'Impact Report 2020', size: '3.1 MB', type: 'PDF' }
            ]
        }
    };

    const project = projectsDatabase[projectId] || projectsDatabase['cfs-centre'];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
                {/* Hero Section */}
                <div className="relative h-96 bg-gradient-to-r from-[#021d49] to-[#46a1bb] overflow-hidden">
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

                    <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
                        <button
                            onClick={onBack}
                            className="mb-6 inline-flex items-center gap-2 text-white hover:text-[#46a1bb] transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Back to All Programs</span>
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-4 py-1.5 bg-[#46a1bb] text-white text-sm font-bold rounded-full">
                                {project.status}
                            </span>
                            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                                {project.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>Posted on {project.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                <span>{project.duration}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <BookOpen className="w-6 h-6 text-[#46a1bb]" />
                                    About This Initiative
                                </h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {project.description}
                                </p>
                            </section>

                            {/* Objectives */}
                            <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <Target className="w-6 h-6 text-[#46a1bb]" />
                                    Key Objectives
                                </h2>
                                <div className="space-y-4">
                                    {project.objectives.map((objective, index) => (
                                        <div key={index} className="flex gap-4 group">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#46a1bb] to-[#021d49] flex items-center justify-center text-white font-bold text-sm">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700 leading-relaxed pt-1 group-hover:text-gray-900 transition-colors">
                                                {objective}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Expected Outcomes */}
                            <section className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-2xl p-8 shadow-lg text-white">
                                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Award className="w-6 h-6 text-[#46a1bb]" />
                                    Outcomes & Impact
                                </h2>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {project.outcomes.map((outcome, index) => (
                                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-colors">
                                            <p className="text-white/90 leading-relaxed">
                                                {outcome}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-3 bg-gradient-to-r from-[#46a1bb] to-[#3a8ba0] text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Download Resources
                                    </button>
                                    <button className="w-full px-4 py-3 border-2 border-[#021d49] text-[#021d49] font-semibold rounded-lg hover:bg-[#021d49] hover:text-white transition-all flex items-center justify-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share Project
                                    </button>
                                </div>
                            </div>

                            {/* Partners */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#46a1bb]" />
                                    Implementation Partners
                                </h3>
                                <div className="space-y-2">
                                    {project.partners.map((partner, index) => (
                                        <div key={index} className="px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                                            {partner}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Resources */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Available Resources</h3>
                                <div className="space-y-3">
                                    {project.resources.map((resource, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                                            <Download className="w-5 h-5 text-[#46a1bb] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-sm text-gray-900 truncate">{resource.name}</p>
                                                <p className="text-xs text-gray-600">{resource.type} • {resource.size}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Contact CTA */}
                            <div className="bg-gradient-to-br from-[#46a1bb] to-[#3a8ba0] rounded-2xl p-6 shadow-lg text-white">
                                <h3 className="text-lg font-bold mb-2">Get Involved</h3>
                                <p className="text-white/90 text-sm mb-4">
                                    Interested in participating or learning more about this initiative?
                                </p>
                                <button className="w-full px-4 py-2.5 bg-white text-[#021d49] font-semibold rounded-lg hover:shadow-lg transition-all">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

// ==================== MAIN APP COMPONENT ====================
const CapacityBuildingApp = () => {
    const [currentView, setCurrentView] = useState('list');
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    const handleProjectClick = (projectId) => {
        setSelectedProjectId(projectId);
        setCurrentView('detail');
    };

    const handleBack = () => {
        setCurrentView('list');
        setSelectedProjectId(null);
    };

    return (
        <>
            <Navbar />
            <div>
                {currentView === 'list' ? (
                    <CapacityBuildingList onProjectClick={handleProjectClick} />
                ) : (
                    <CapacityBuildingDetail projectId={selectedProjectId} onBack={handleBack} />
                )}
            </div>
        </>

    );
};

export default CapacityBuildingApp;