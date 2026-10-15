"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Calendar, FileText, Search, X, LayoutList, LayoutGrid } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getResearchProjects } from '@/services/researchProjectService';
import { useRouter } from 'next/navigation';
import Footer from '@/app/footer/Footer';
import { API_CONFIG } from '@/lib/apiConfig';
import { areaBySlug, areaOf, groupByArea, isOngoing, projectPeriod, sortProjects } from '@/lib/researchProjects';

type StatusFilter = 'all' | 'ongoing' | 'completed';
const STATUS_TABS: { value: StatusFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
];

const ResearchProjectsPage = () => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedArea, setSelectedArea] = useState('all'); // focus area slug
    const [selectedStatus, setSelectedStatus] = useState<StatusFilter>('all');
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

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

    // Menu links open this page pre-filtered via ?area=<slug>; keep the URL in sync so filters are shareable.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const area = params.get('area');
        const status = params.get('status');
        if (areaBySlug(area)) setSelectedArea(area as string);
        if (status === 'ongoing' || status === 'completed') setSelectedStatus(status);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedArea !== 'all') params.set('area', selectedArea);
        if (selectedStatus !== 'all') params.set('status', selectedStatus);
        const qs = params.toString();
        window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
    }, [selectedArea, selectedStatus]);

    const areaGroups = useMemo(() => groupByArea(projects), [projects]);
    const selectedAreaName = areaBySlug(selectedArea)?.name;

    const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
    const truncate = (text: string, max: number) =>
        text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '') + '…';
    const buildImageUrl = (img?: string) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`;
    };

    const matchesStatus = (project: any) =>
        selectedStatus === 'all' || (selectedStatus === 'ongoing' ? isOngoing(project) : !isOngoing(project));

    const filteredProjects = sortProjects(projects.filter(project => {
        const text = stripHtml(project.description || '');
        const matchesSearch = (project.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            text.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesArea = selectedArea === 'all' || areaOf(project).slug === selectedArea;
        return matchesSearch && matchesArea && matchesStatus(project);
    }));

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedArea('all');
        setSelectedStatus('all');
    };

    const handleProjectClick = (projectId: string) => {
        router.push(`/programs/research-projects/${projectId}`);
    };

    const clearSearch = () => {
        setSearchTerm('');
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-linear-to-br from-slate-50 via-white to-blue-50 min-h-screen">
                {/* Hero Section */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#021d49] via-[#032d6b] to-[#021d49] text-white">
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-size-[20px_20px]"></div>
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
                            <div className="flex flex-col md:flex-row gap-4">
                                {/* Search Bar */}
                                <div className="relative flex-1">
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

                                {/* Status tabs */}
                                <div className="flex bg-gray-100 rounded-xl p-1 self-start md:self-stretch">
                                    {STATUS_TABS.map(tab => (
                                        <button
                                            key={tab.value}
                                            onClick={() => setSelectedStatus(tab.value)}
                                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${selectedStatus === tab.value ? 'bg-[#021d49] text-white shadow' : 'text-gray-600 hover:text-[#021d49]'}`}
                                        >
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Focus area chips */}
                            {areaGroups.length > 0 && (
                                <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
                                    <button
                                        onClick={() => setSelectedArea('all')}
                                        className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${selectedArea === 'all' ? 'bg-[#021d49] text-white border-[#021d49]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#021d49] hover:text-[#021d49]'}`}
                                    >
                                        All focus areas
                                    </button>
                                    {areaGroups.map(({ area, projects: list }) => (
                                        <button
                                            key={area.slug}
                                            onClick={() => setSelectedArea(area.slug)}
                                            className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors ${selectedArea === area.slug ? 'bg-[#021d49] text-white border-[#021d49]' : 'bg-white text-gray-700 border-gray-200 hover:border-[#021d49] hover:text-[#021d49]'}`}
                                        >
                                            {area.name} <span className="opacity-60">({list.filter(matchesStatus).length})</span>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Active Filters Display */}
                            {(searchTerm || selectedArea !== 'all' || selectedStatus !== 'all') && (
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
                                    {selectedAreaName && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#021d49] text-white text-sm rounded-full">
                                            Focus area: {selectedAreaName}
                                            <button onClick={() => setSelectedArea('all')} className="hover:bg-white/20 rounded-full p-0.5">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    )}
                                    {selectedStatus !== 'all' && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#021d49] text-white text-sm rounded-full">
                                            Status: {selectedStatus === 'ongoing' ? 'Ongoing' : 'Completed'}
                                            <button onClick={() => setSelectedStatus('all')} className="hover:bg-white/20 rounded-full p-0.5">
                                                <X className="w-3.5 h-3.5" />
                                            </button>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Results Count + view toggle */}
                        <div className="mt-4 flex items-center justify-between">
                            {!loading ? (
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-[#021d49]">{filteredProjects.length}</span> of <span className="font-semibold">{projects.length}</span> projects
                            </p>
                            ) : <span />}
                            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
                                <button
                                    onClick={() => setViewMode('list')}
                                    title="List view"
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-[#021d49] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <LayoutList className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    title="Grid view"
                                    className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[#021d49] text-white' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <LayoutGrid className="w-4 h-4" />
                                </button>
                            </div>
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

                    {/* Projects  Grid view */}
                    {!loading && !error && viewMode === 'grid' && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProjects.map((project) => {
                                const imageUrl = buildImageUrl(project.coverImage);
                                return (
                                    <div
                                        key={project._id}
                                        className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#021d49] cursor-pointer overflow-hidden transform hover:-translate-y-1"
                                        onClick={() => handleProjectClick(project._id)}
                                    >
                                        {imageUrl ? (
                                            <div className="h-48 w-full bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                                                <img src={imageUrl} alt={project.title || 'Project image'} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                        ) : (
                                            <div className="h-48 w-full bg-linear-to-br from-[#021d49]/5 to-[#021d49]/10 flex items-center justify-center">
                                                <FileText className="w-16 h-16 text-[#021d49]/30" />
                                            </div>
                                        )}
                                        <div className="p-6 space-y-4">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-snug line-clamp-2 min-h-14">{project.title}</h3>
                                            <div className="flex items-center justify-between gap-3 text-sm">
                                                <div className="flex items-center gap-2 text-gray-600">
                                                    <Calendar className="w-4 h-4 text-[#021d49]" />
                                                    <span className="font-medium">{projectPeriod(project) || 'N/A'}</span>
                                                    {isOngoing(project) && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">Ongoing</span>}
                                                </div>
                                                <span className="inline-block px-3 py-1 bg-[#021d49]/10 text-[#021d49] text-xs font-bold rounded-full border border-[#021d49]/20 text-right">{areaOf(project).name}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 min-h-18">
                                                {truncate(stripHtml(project.description || 'No description available'), 150)}
                                            </p>
                                            {project.teamMembers && project.teamMembers.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {project.teamMembers.slice(0, 3).map((member: string, idx: number) => (
                                                        <span key={idx} className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-100">{member}</span>
                                                    ))}
                                                    {project.teamMembers.length > 3 && <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">+{project.teamMembers.length - 3} more</span>}
                                                </div>
                                            )}
                                            <button onClick={(e) => { e.stopPropagation(); handleProjectClick(project._id); }} className="mt-4 w-full px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl shadow-md flex items-center gap-2 justify-center hover:bg-[#032d6b] transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#021d49]/30 group" aria-label={`Read more about ${project.title}`}>
                                                <span>View Details</span><ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Projects  List view */}
                    {!loading && !error && viewMode === 'list' && (
                        <div className="space-y-3">
                            {filteredProjects.map((project) => {
                                const imageUrl = buildImageUrl(project.coverImage);
                                const dateStr = projectPeriod(project);
                                return (
                                    <div
                                        key={project._id}
                                        onClick={() => handleProjectClick(project._id)}
                                        className="bg-white rounded-xl border border-gray-100 hover:border-[#021d49] shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex items-center gap-4 p-4 group"
                                    >
                                        {/* Thumbnail */}
                                        <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                                            {imageUrl ? (
                                                <img src={imageUrl} alt={project.title || 'Project'} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-[#021d49]/10 flex items-center justify-center">
                                                    <FileText className="w-7 h-7 text-[#021d49]/30" />
                                                </div>
                                            )}
                                        </div>
                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <span className="px-2 py-0.5 bg-[#021d49]/10 text-[#021d49] text-xs font-bold uppercase tracking-wide rounded">
                                                    {areaOf(project).name}
                                                </span>
                                                {isOngoing(project) && (
                                                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded">Ongoing</span>
                                                )}
                                                {dateStr && (
                                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                                        <Calendar className="w-3 h-3" /> {dateStr}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-snug line-clamp-1 mb-0.5">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-1">
                                                {truncate(stripHtml(project.description || ''), 120)}
                                            </p>
                                        </div>
                                        {/* CTA */}
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleProjectClick(project._id); }}
                                            className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-[#021d49] hover:bg-[#032d6b] text-white text-sm font-semibold rounded-lg transition-colors"
                                        >
                                            View <ArrowRight className="w-4 h-4" />
                                        </button>
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
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl hover:bg-[#032d6b] transition-colors"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ResearchProjectsPage;