"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';
import { useParams } from 'next/navigation';
import { ArrowLeft, Layers } from 'lucide-react';
import { getResearchProject } from '@/services/researchProjectService';
import ThemeSection from '../../../components/ThemeSection';

const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const ThemeDetailPage = () => {
    const { id, themeId } = useParams();
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

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#021d49] mb-4" />
                        <p className="text-gray-500">Loading theme...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const themes = Array.isArray(project?.themes) ? project.themes : [];
    const theme = themes.find((t: any) => slugify(t.name) === themeId);

    if (error || !project || !theme) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white px-6">
                    <div className="max-w-md text-center">
                        <p className="text-red-600 font-medium mb-4">{error || 'Theme not found'}</p>
                        <a href={`/programs/research-projects/${id}`} className="text-[#021d49] font-semibold hover:underline">
                            Back to Project
                        </a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const allResources = Array.isArray(project.resources) ? project.resources : [];
    const allAbstracts = Array.isArray(project.abstracts) ? project.abstracts : [];
    // Resources/abstracts carry no _id of their own — their index in the
    // project's full array is their stable identity, used by their detail pages.
    const resources = allResources
        .map((r: any, i: number) => ({ ...r, _index: i }))
        .filter((r: any) => r.group === theme.name);
    const abstracts = allAbstracts
        .map((a: any, i: number) => ({ ...a, _index: i }))
        .filter((a: any) => a.group === theme.name);

    return (
        <>
            <Navbar />
            <main className="bg-white min-h-screen">
                <div className="border-b border-gray-100">
                    <div className="max-w-5xl mx-auto px-6 pt-4">
                        <a
                            href={`/programs/research-projects/${id}`}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#021d49] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to {project.title}
                        </a>
                    </div>
                    <div className="max-w-5xl mx-auto px-6 pt-5 pb-7 sm:pt-6 sm:pb-8">
                        <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#021d49] flex items-center justify-center mb-4">
                            <Layers className="w-5 h-5" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 text-balance">
                            {theme.name}
                        </h1>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 py-10 sm:py-14">
                    <ThemeSection projectId={project._id} description={theme.description} resources={resources} abstracts={abstracts} />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ThemeDetailPage;
