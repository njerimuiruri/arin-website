"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, Search, Filter, Users, Target, ArrowLeft, BookOpen, Download, Share2, Clock, MapPin, Award } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getCapacityProjects, getCapacityProject } from '@/services/capacityBuildingService';

// ==================== CAPACITY BUILDING LIST PAGE ====================
const CapacityBuildingList = ({ onProjectClick }) => {
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
        return `http://localhost:5001${imagePath}`;
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
                            <div
                                key={project._id}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] cursor-pointer group"
                                onClick={() => onProjectClick(project._id)}
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
                                <button
                                    onClick={(e) => { e.stopPropagation(); onProjectClick(project._id); }}
                                    className="w-full px-4 py-2.5 bg-white border-2 border-gray-900 text-gray-900 font-semibold rounded-lg flex items-center gap-2 justify-center hover:bg-gray-900 hover:text-white transition-all"
                                >
                                    <span>CONTINUE READING</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
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
    );
};

// ==================== CAPACITY BUILDING DETAIL PAGE ====================
const CapacityBuildingDetail = ({ projectId, onBack }) => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            try {
                const data = await getCapacityProject(projectId);
                setProject(data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        }
        if (projectId) {
            fetchProject();
        }
    }, [projectId]);

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
        return `http://localhost:5001${imagePath}`;
    };

    const buildResourceUrl = (resourcePath: string) => {
        if (resourcePath.startsWith('http')) return resourcePath;
        return `http://localhost:5001${resourcePath}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#021d49] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">Project not found</p>
                    <button onClick={onBack} className="text-[#021d49] hover:underline">
                        Back to All Programs
                    </button>
                </div>
            </div>
        );
    }

    const img = buildImageUrl(project.image);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
                {/* Hero Section */}
                <div className="relative h-96 bg-gradient-to-r from-[#021d49] to-[#021d49] overflow-hidden">
                    <div className="absolute inset-0 bg-black/40" />
                    {img && (
                        <div className="absolute inset-0">
                            <img src={img} alt={project.title} className="w-full h-full object-cover opacity-30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

                    <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
                        <button
                            onClick={onBack}
                            className="mb-6 inline-flex items-center gap-2 text-white hover:text-[#021d49] transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold">Back to All Programs</span>
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <span className={`px-4 py-1.5 ${project.status === 'Ongoing' ? 'bg-green-500' : 'bg-blue-500'} text-white text-sm font-bold rounded-full`}>
                                {project.status}
                            </span>
                            {project.category && (
                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                                    {project.category}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>Posted on {formatDate(project.date)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{project.location}</span>
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
                                    <BookOpen className="w-6 h-6 text-[#021d49]" />
                                    About This Initiative
                                </h2>
                                <div
                                    className="prose prose-slate max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: project.description || '' }}
                                />
                            </section>

                            {/* Objectives */}
                            {project.objectives && project.objectives.length > 0 && (
                                <section className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <Target className="w-6 h-6 text-[#021d49]" />
                                        Key Objectives
                                    </h2>
                                    <div className="space-y-4">
                                        {project.objectives.map((objective, index) => (
                                            <div key={index} className="flex gap-4 group">
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#021d49] to-[#021d49] flex items-center justify-center text-white font-bold text-sm">
                                                    {index + 1}
                                                </div>
                                                <p className="text-gray-700 leading-relaxed pt-1 group-hover:text-gray-900 transition-colors">
                                                    {objective}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Expected Outcomes */}
                            {project.outcomes && project.outcomes.length > 0 && (
                                <section className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-2xl p-8 shadow-lg text-white">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                        <Award className="w-6 h-6 text-[#021d49]" />
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
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#3a8ba0] text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-2">
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
                            {project.partners && project.partners.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <Users className="w-5 h-5 text-[#021d49]" />
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
                            )}

                            {/* Resources */}
                            {project.availableResources && project.availableResources.length > 0 && (
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Available Resources</h3>
                                    <div className="space-y-3">
                                        {project.availableResources.map((resource, index) => {
                                            const resourceUrl = buildResourceUrl(resource);
                                            const fileName = resource.split('/').pop() || `Resource ${index + 1}`;
                                            return (
                                                <a
                                                    key={index}
                                                    href={resourceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                                                >
                                                    <Download className="w-5 h-5 text-[#021d49] flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-sm text-gray-900 truncate">{fileName}</p>
                                                        <p className="text-xs text-gray-600">PDF</p>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Contact CTA */}
                            <div className="bg-gradient-to-br from-[#021d49] to-[#3a8ba0] rounded-2xl p-6 shadow-lg text-white">
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