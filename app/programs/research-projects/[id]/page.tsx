"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Users, FileText, Mail, Clock, Tag } from 'lucide-react';
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
        return img.startsWith('http') ? img : `http://localhost:5001${img}`;
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
                {/* Compact Hero Section */}
                <section className="relative bg-gradient-to-br from-[#021d49] via-[#032d6b] to-[#021d49] overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>

                    {/* Cover Image Overlay */}
                    {project?.coverImage && (
                        <div className="absolute inset-0 opacity-20">
                            <img
                                src={buildImageUrl(project.coverImage)}
                                alt={project.title || 'Project cover'}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    )}

                    <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 text-white hover:text-blue-200 transition-colors mb-6 group bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm">Back to Projects</span>
                        </button>

                        {/* Loading State */}
                        {loading && (
                            <div className="text-center py-12">
                                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-white/30 border-t-white mb-4"></div>
                                <p className="text-white/80">Loading project...</p>
                            </div>
                        )}

                        {/* Error State */}
                        {error && (
                            <div className="bg-red-500/20 backdrop-blur-sm border border-red-300/50 rounded-xl p-4 text-white">
                                <p className="font-medium">{error}</p>
                            </div>
                        )}

                        {/* Project Header */}
                        {project && (
                            <div className="max-w-4xl">
                                {/* Category Badge */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.category && (
                                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-sm font-bold rounded-full border border-white/30">
                                            <Tag className="w-3.5 h-3.5" />
                                            {project.category}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                                    {project.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 text-blue-100">
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                                        <Calendar className="w-4 h-4" />
                                        <span className="text-sm font-medium">
                                            {project.date ? new Date(project.date).toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            }) : 'Date not available'}
                                        </span>
                                    </div>

                                    {project.projectTeam && project.projectTeam.length > 0 && (
                                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
                                            <Users className="w-4 h-4" />
                                            <span className="text-sm font-medium">
                                                {project.projectTeam.length} Team {project.projectTeam.length === 1 ? 'Member' : 'Members'}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Main Content */}
                <section className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Description Card */}
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Project Overview</h2>
                                </div>

                                {loading && (
                                    <div className="flex items-center justify-center py-12">
                                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-[#021d49]"></div>
                                    </div>
                                )}

                                {error && (
                                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                                        <p className="text-red-600 font-medium">{error}</p>
                                    </div>
                                )}

                                {project && (
                                    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#021d49] prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700">
                                        <div dangerouslySetInnerHTML={{ __html: project.description || '<p class="text-gray-500 italic">No description available.</p>' }} />
                                    </div>
                                )}
                            </div>

                            {/* Additional Image Section (if available) */}
                            {project?.coverImage && (
                                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Project Visual</h3>
                                    <div className="rounded-xl overflow-hidden border border-gray-200">
                                        <img
                                            src={buildImageUrl(project.coverImage)}
                                            alt={project.title || 'Project visual'}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Project Team Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-6">
                                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-xl flex items-center justify-center shrink-0 shadow-md">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Project Team</h2>
                                </div>

                                <div className="space-y-3">
                                    {loading && (
                                        <div className="text-center py-6">
                                            <div className="inline-block animate-spin rounded-full h-6 w-6 border-3 border-gray-200 border-t-[#021d49]"></div>
                                        </div>
                                    )}

                                    {error && (
                                        <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>
                                    )}

                                    {project && Array.isArray(project.projectTeam) && project.projectTeam.length > 0 ? (
                                        project.projectTeam.map((name: string, index: number) => (
                                            <div
                                                key={index}
                                                className="group p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#021d49] transition-all duration-200 hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm">
                                                        {name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-gray-900 text-sm group-hover:text-[#021d49] transition-colors truncate">
                                                            {name}
                                                        </h4>
                                                        <p className="text-xs text-gray-500">Team Member</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                            <Users className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                            <p className="text-gray-500 text-sm">No team members listed</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Info Card */}
                            <div className="bg-gradient-to-br from-[#021d49] to-[#032d6b] rounded-2xl p-6 shadow-lg text-white">
                                <h3 className="text-lg font-bold mb-4">Project Info</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-start gap-3 pb-3 border-b border-white/20">
                                        <Calendar className="w-5 h-5 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-blue-200 text-xs mb-1">Start Date</p>
                                            <p className="font-semibold">
                                                {project?.date ? new Date(project.date).toLocaleDateString('en-US', {
                                                    month: 'long',
                                                    year: 'numeric'
                                                }) : 'Not specified'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Tag className="w-5 h-5 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-blue-200 text-xs mb-1">Category</p>
                                            <p className="font-semibold">{project?.category || 'Not specified'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA Section */}
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <div className="bg-gradient-to-br from-[#021d49] via-[#032d6b] to-[#021d49] rounded-2xl p-10 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
                        <div className="relative z-10">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/30">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold mb-4">
                                Interested in This Project?
                            </h2>
                            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                                Get in touch with our team to learn more about collaboration opportunities and how you can get involved
                            </p>
                            <button className="bg-white text-[#021d49] px-8 py-4 rounded-xl font-bold text-base hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50">
                                Contact Us Today
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ProjectDetailPage;