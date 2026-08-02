"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';
import { API_CONFIG } from '@/lib/apiConfig';
import { useParams } from 'next/navigation';
import { getResearchProject, getResearchProjects } from '@/services/researchProjectService';

import ProjectHero from '../components/ProjectHero';
import AboutSection from '../components/AboutSection';
import ResourcesSection from '../components/ResourcesSection';
import GallerySection from '../components/GallerySection';
import AbstractsSection from '../components/AbstractsSection';
import ThemeSection from '../components/ThemeSection';
import ProjectTabs, { TabDef } from '../components/ProjectTabs';
import RelatedInitiatives from '../components/RelatedInitiatives';
import RelatedProjects from '../components/RelatedProjects';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
// Cuts at the last full word within `max` chars instead of mid-word, so
// previews read as an intentional excerpt rather than truncated garbage.
const truncate = (text: string, max: number) =>
    text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '') + '…';
const buildImageUrl = (img?: string) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`;
};

const ProjectDetailPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState<any | null>(null);
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const [data, list] = await Promise.all([
                    getResearchProject(id as string),
                    getResearchProjects().catch(() => []),
                ]);
                if (mounted) {
                    setProject(data);
                    setAllProjects(list);
                }
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
                        <p className="text-gray-500">Loading project...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !project) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white px-6">
                    <div className="max-w-md text-center">
                        <p className="text-red-600 font-medium mb-4">{error || 'Project not found'}</p>
                        <a href="/programs/research-projects" className="text-[#021d49] font-semibold hover:underline">
                            Back to Research Projects
                        </a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const excerpt = truncate(stripHtml(project.description || '').trim(), 180);
    const dateLabel = project.date
        ? new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : undefined;
    const allResources = Array.isArray(project.resources) ? project.resources : [];
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];
    const relatedInitiatives = Array.isArray(project.relatedInitiatives) ? project.relatedInitiatives : [];
    const teamMembers = Array.isArray(project.teamMembers) ? project.teamMembers : [];
    // Abstracts carry no _id of their own, so their position in this array is
    // their stable identity — tag it on before any filtering/grouping so the
    // detail page (/abstracts/[index]) can look the right one back up.
    const allAbstracts = Array.isArray(project.abstracts) ? project.abstracts : [];
    const indexedAbstracts = allAbstracts.map((a: any, i: number) => ({ ...a, _index: i }));
    const themes = Array.isArray(project.themes) ? project.themes : [];

    // Resources/abstracts tagged with a theme move onto that theme's own tab;
    // everything else stays on the general Resources/Abstracts tabs.
    const themeNames = new Set(themes.map((t: any) => t.name));
    const resources = allResources.filter((r: any) => !r.group || !themeNames.has(r.group));
    const abstracts = indexedAbstracts.filter((a: any) => !a.group || !themeNames.has(a.group));

    const themeTabs: TabDef[] = themes
        .map((theme: any) => ({
            theme,
            resources: allResources.filter((r: any) => r.group === theme.name),
            abstracts: indexedAbstracts.filter((a: any) => a.group === theme.name),
        }))
        .filter((t: any) => t.resources.length > 0 || t.abstracts.length > 0)
        .map((t: any) => ({
            id: `theme:${t.theme.name}`,
            label: t.theme.name,
            content: <ThemeSection projectId={project._id} description={t.theme.description} resources={t.resources} abstracts={t.abstracts} />,
        }));

    return (
        <>
            <Navbar />
            <main className="bg-white">
                <ProjectHero
                    title={project.title}
                    category={project.category}
                    dateLabel={dateLabel}
                    excerpt={excerpt}
                    coverImageUrl={buildImageUrl(project.coverImage)}
                    hasResources={resources.length > 0}
                />
                <ProjectTabs
                    aboutContent={
                        <AboutSection
                            description={project.description}
                            objectives={project.objectives}
                            focusAreas={project.focusAreas}
                            category={project.category}
                            dateLabel={dateLabel}
                            teamMembers={teamMembers}
                            goal={project.goal}
                            outputs={project.outputs}
                            longTermOutcome={project.longTermOutcome}
                            intermediateOutcomes={project.intermediateOutcomes}
                            funders={project.funders}
                            partners={project.partners}
                        />
                    }
                    themeTabs={themeTabs}
                    resourcesContent={resources.length > 0 ? <ResourcesSection resources={resources} /> : null}
                    abstractsContent={abstracts.length > 0 ? <AbstractsSection projectId={project._id} items={abstracts} /> : null}
                    galleryContent={gallery.length > 0 ? <GallerySection items={gallery} /> : null}
                />
                <RelatedInitiatives items={relatedInitiatives} />
                <RelatedProjects allProjects={allProjects} currentId={project._id} category={project.category} />
            </main>
            <Footer />
        </>
    );
};

export default ProjectDetailPage;
