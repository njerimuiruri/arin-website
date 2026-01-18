"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Users, FileText, Mail } from 'lucide-react';
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
            <div className="w-full bg-linear-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero with image */}
                <section className="relative bg-linear-to-br from-[#021d49] via-[#46a1bb] to-[#021d49] py-0 overflow-hidden">
                    {project?.image && (
                        <div className="h-72 w-full bg-black/30">
                            <img
                                src={buildImageUrl(project.image)}
                                alt={project.title || 'Project image'}
                                className="h-full w-full object-cover mix-blend-normal opacity-80"
                            />
                        </div>
                    )}
                    <div className="max-w-350 mx-auto px-6 py-8 relative">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm">Back to Projects</span>
                        </button>
                        {loading && (<div className="text-white/80">Loading project...</div>)}
                        {error && (<div className="text-red-300">{error}</div>)}
                        {project && (
                            <>
                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.category && (
                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
                                            {project.category}
                                        </span>
                                    )}
                                </div>
                                {/* Title and Date */}
                                <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-md">
                                    {project.title}
                                </h1>
                                <div className="flex items-center gap-2 text-gray-200">
                                    <Calendar className="w-4 h-4" />
                                    <span className="text-sm">{project.date ? new Date(project.date).toLocaleDateString() : ''}</span>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                {/* Main Content */}

                <section className="max-w-350 mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-linear-to-br from-[#46a1bb] to-[#021d49] rounded-lg flex items-center justify-center shrink-0">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Description</h2>
                                </div>
                                {loading && (<p className="text-gray-600">Loading...</p>)}
                                {error && (<p className="text-red-600">{error}</p>)}
                                {project && (
                                    <div className="prose max-w-none">
                                        <div dangerouslySetInnerHTML={{ __html: project.description || '' }} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Column - Project Team */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 sticky top-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-linear-to-br from-[#46a1bb] to-[#021d49] rounded-lg flex items-center justify-center shrink-0">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Project Team</h2>
                                </div>
                                <div className="space-y-4">
                                    {loading && (<p className="text-gray-600">Loading team...</p>)}
                                    {error && (<p className="text-red-600">{error}</p>)}
                                    {project && Array.isArray(project.projectTeam) && project.projectTeam.length > 0 ? (
                                        project.projectTeam.map((name: string, index: number) => (
                                            <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                                <h4 className="font-bold text-gray-900 text-sm mb-1">{name}</h4>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-600 text-sm">No team members listed.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="max-w-350 mx-auto px-6 pb-12">
                    <div className="bg-linear-to-br from-[#021d49] via-[#46a1bb] to-[#021d49] rounded-xl p-8 text-center text-white shadow-lg">
                        <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
                        <h2 className="text-2xl font-bold mb-3">
                            Interested in This Project?
                        </h2>
                        <p className="text-sm text-white/90 mb-6 max-w-xl mx-auto">
                            Get in touch with our team to learn more about collaboration opportunities
                        </p>
                        <button className="bg-white text-[#021d49] px-6 py-3 rounded-full font-bold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Contact Us
                        </button>
                    </div>
                </section>
            </div>

        </>
    );
};

export default ProjectDetailPage;