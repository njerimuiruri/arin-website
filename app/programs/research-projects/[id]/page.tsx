"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Users, FileText, Mail, Tag, ExternalLink, Info, Download } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { useParams, useRouter } from 'next/navigation';
import { getResearchProject } from '@/services/researchProjectService';

const ProjectDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [project, setProject] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const data = await getResearchProject(id as string);
                if (mounted) setProject(data);
            } catch (e: any) {
                if (mounted) setError(e?.message || 'Failed to load project');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [id]);

    const buildImageUrl = (img?: string) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `https://api.demo.arin-africa.org${img}`;
    };

    const handleBack = () => {
        router.back();
    };

    const handleOpenResource = (url: string) => {
        // Open the resource in a new tab for viewing
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const getResourceFileName = (url: string, index: number) => {
        // Extract the filename from the URL
        const urlParts = url.split('/');
        const fileName = urlParts[urlParts.length - 1];

        // If it's a Cloudinary URL, try to get the original filename
        if (url.includes('cloudinary.com')) {
            // Extract the part after the last slash and before any query parameters
            const cleanFileName = fileName.split('?')[0];
            // Decode URL encoding
            const decodedFileName = decodeURIComponent(cleanFileName);
            return decodedFileName || `Resource ${index + 1}`;
        }

        return fileName || `Resource ${index + 1}`;
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
                {/* Simplified Hero Section - Better Text Visibility */}
                <section className="relative bg-gradient-to-br from-[#021d49] to-[#032d6b] overflow-hidden py-8">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:30px_30px]"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-300 mb-6 group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30 hover:bg-white/20"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm">Back to Projects</span>
                        </button>

                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-16">
                                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mb-4"></div>
                                <p className="text-white/90 text-lg font-medium">Loading project...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-500/90 backdrop-blur-sm border-2 border-red-300 rounded-2xl p-6 text-white shadow-xl">
                                <p className="font-semibold text-lg">{error}</p>
                            </div>
                        )}

                        {/* Project Header - Clean and Readable */}
                        {project && !loading && !error && (
                            <div className="text-center max-w-4xl mx-auto py-6">
                                {/* Category Badge */}
                                {project.category && (
                                    <div className="flex justify-center mb-4">
                                        <span className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 backdrop-blur-md text-white text-sm font-bold rounded-full border border-white/40 shadow-lg">
                                            <Tag className="w-4 h-4" />
                                            {project.category}
                                        </span>
                                    </div>
                                )}

                                {/* Title - Clear and Prominent */}
                                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight px-4">
                                    {project.title}
                                </h1>

                                {/* Meta Information - Easy to Scan */}
                                <div className="flex flex-wrap justify-center items-center gap-4 text-white">
                                    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/30 shadow-md">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm font-semibold">
                                            {project.date ? new Date(project.date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            }) : 'Date not available'}
                                        </span>
                                    </div>

                                    {project.projectTeam && project.projectTeam.length > 0 && (
                                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-xl border border-white/30 shadow-md">
                                            <Users className="w-4 h-4" />
                                            <span className="text-sm font-semibold">
                                                {project.projectTeam.length} Team {project.projectTeam.length === 1 ? 'Member' : 'Members'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Main Content - Single Column for Better Readability */}
                <section className="max-w-5xl mx-auto px-6 py-12">
                    {/* Featured Cover Image - Large and Clear */}
                    {project?.coverImage && (
                        <div className="mb-10">
                            <div className="bg-white rounded-3xl p-4 shadow-2xl border border-gray-200">
                                <div className="rounded-2xl overflow-hidden">
                                    <img
                                        src={buildImageUrl(project.coverImage)}
                                        alt={project.title || 'Project cover'}
                                        className="w-full h-auto object-cover"
                                        style={{ maxHeight: '600px', objectFit: 'cover' }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Quick Info Cards - Side by Side */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        {/* Project Details Card */}
                        <div className="bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-2xl p-6 shadow-xl text-white">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <Info className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold">Project Details</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-blue-200 text-xs mb-1 font-medium uppercase tracking-wide">Category</p>
                                    <p className="font-bold text-lg">{project?.category || 'Not specified'}</p>
                                </div>
                                <div className="border-t border-white/20 pt-4">
                                    <p className="text-blue-200 text-xs mb-1 font-medium uppercase tracking-wide">Start Date</p>
                                    <p className="font-bold text-lg">
                                        {project?.date ? new Date(project.date).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        }) : 'Not specified'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Team Summary Card */}
                        <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-10 h-10 bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-xl flex items-center justify-center">
                                    <Users className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Team Members</h3>
                            </div>
                            <div className="text-gray-700">
                                {project && Array.isArray(project.projectTeam) && project.projectTeam.length > 0 ? (
                                    <>
                                        <p className="text-sm text-gray-600 mb-3">
                                            This project is led by {project.projectTeam.length} dedicated team {project.projectTeam.length === 1 ? 'member' : 'members'}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.projectTeam.slice(0, 3).map((name: string, index: number) => (
                                                <span key={index} className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg border border-gray-300 text-sm font-semibold text-gray-800">
                                                    <div className="w-6 h-6 bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        {name.charAt(0).toUpperCase()}
                                                    </div>
                                                    {name}
                                                </span>
                                            ))}
                                            {project.projectTeam.length > 3 && (
                                                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-600">
                                                    +{project.projectTeam.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-gray-500 text-sm italic">No team members listed</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Project Overview - Full Width for Easy Reading */}
                    <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-200 mb-10">
                        <div className="flex items-center gap-3 mb-8 pb-6 border-b-2 border-gray-100">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-2xl flex items-center justify-center">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900">Project Overview</h2>
                        </div>

                        {loading && (
                            <div className="flex items-center justify-center py-12">
                                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[#021d49]"></div>
                            </div>
                        )}

                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                                <p className="text-red-700 font-semibold text-center">{error}</p>
                            </div>
                        )}

                        {project && (
                            <div className="prose prose-lg max-w-none 
                                prose-headings:text-gray-900 prose-headings:font-bold prose-headings:mt-8 prose-headings:mb-4
                                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:text-base
                                prose-a:text-[#021d49] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-gray-900 prose-strong:font-bold
                                prose-ul:text-gray-700 prose-ul:my-4 prose-ul:space-y-2
                                prose-ol:text-gray-700 prose-ol:my-4 prose-ol:space-y-2
                                prose-li:text-base prose-li:leading-relaxed
                                prose-blockquote:border-l-4 prose-blockquote:border-[#021d49] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600">
                                <div dangerouslySetInnerHTML={{ __html: project.description || '<p class="text-gray-500 italic text-center py-8">No description available.</p>' }} />
                            </div>
                        )}
                    </div>

                    {/* Full Team List - Expandable Section */}
                    {project && Array.isArray(project.projectTeam) && project.projectTeam.length > 0 && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-2xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Meet the Team</h2>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                {project.projectTeam.map((name: string, index: number) => (
                                    <div
                                        key={index}
                                        className="group p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-gray-200 hover:border-[#021d49] transition-all duration-300 hover:shadow-lg"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md group-hover:scale-110 transition-transform">
                                                {name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-bold text-gray-900 text-lg group-hover:text-[#021d49] transition-colors">
                                                    {name}
                                                </h4>
                                                <p className="text-sm text-gray-500 font-medium">Team Member</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Available Resources Section */}
                    {project && Array.isArray(project.resources) && project.resources.length > 0 && (
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-10">
                            <div className="flex items-center gap-3 mb-6 pb-6 border-b-2 border-gray-100">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                    <Download className="w-6 h-6 text-green-600" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">Available Resources</h2>
                            </div>

                            <div className="space-y-3">
                                {project.resources.map((url: string, idx: number) => {
                                    const fileName = getResourceFileName(url, idx);
                                    return (
                                        <button
                                            key={idx}
                                            onClick={() => handleOpenResource(url)}
                                            className="w-full flex items-center justify-between gap-3 p-5 bg-gradient-to-r from-gray-50 to-green-50/50 hover:from-[#021d49] hover:to-[#032d6b] border-2 border-gray-200 hover:border-[#021d49] rounded-2xl transition-all duration-300 group"
                                        >
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div className="bg-white p-3 rounded-xl shadow-sm group-hover:bg-white/20 transition-colors">
                                                    <FileText className="w-6 h-6 text-[#021d49] group-hover:text-white transition-colors" />
                                                </div>
                                                <div className="flex-1 min-w-0 text-left">
                                                    <span className="text-base font-bold text-gray-900 group-hover:text-white transition-colors block truncate">
                                                        {fileName}
                                                    </span>
                                                    <span className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">
                                                        Click to view or download
                                                    </span>
                                                </div>
                                            </div>
                                            <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Contact CTA */}
                    <div className="bg-gradient-to-br from-[#021d49] via-[#032d6b] to-[#021d49] rounded-3xl p-10 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>

                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 border-2 border-white/40 shadow-xl">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                                Interested in This Project?
                            </h2>
                            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Get in touch with our team to learn more about collaboration opportunities
                            </p>
                            <button className="bg-white text-[#021d49] px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 group">
                                Contact Us Today
                                <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProjectDetailPage;