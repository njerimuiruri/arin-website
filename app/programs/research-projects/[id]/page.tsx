"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';
import { API_CONFIG } from '@/lib/apiConfig';
import { useParams } from 'next/navigation';
import { getResearchProject, getResearchProjects } from '@/services/researchProjectService';

import ProjectHero from '../components/ProjectHero';
import ProjectOverview from '../components/ProjectOverview';
import ProjectImpact from '../components/ProjectImpact';
import ProjectTeam from '../components/ProjectTeam';
import ThemesGrid from '../components/ThemesGrid';
import ResourcesSection from '../components/ResourcesSection';
import AbstractsSection from '../components/AbstractsSection';
import GallerySection from '../components/GallerySection';
import SectionNav from '../components/SectionNav';
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
const slugify = (text: string) => text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const SECTION_SCROLL_MT = 'scroll-mt-32 sm:scroll-mt-36 lg:scroll-mt-40';

function SectionHeader({ title }: { title: string }) {
    return <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">{title}</h2>;
}

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
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];
    const relatedInitiatives = Array.isArray(project.relatedInitiatives) ? project.relatedInitiatives : [];
    const teamMembers = Array.isArray(project.teamMembers) ? project.teamMembers : [];
    // Resources and abstracts carry no _id of their own, so their position in
    // these arrays is their stable identity — tag it on before any
    // filtering/grouping so the detail pages (/resources/[index],
    // /abstracts/[index]) can look the right one back up.
    const allResources = Array.isArray(project.resources) ? project.resources : [];
    const indexedResources = allResources.map((r: any, i: number) => ({ ...r, _index: i }));
    const allAbstracts = Array.isArray(project.abstracts) ? project.abstracts : [];
    const indexedAbstracts = allAbstracts.map((a: any, i: number) => ({ ...a, _index: i }));
    const themes = Array.isArray(project.themes) ? project.themes : [];

    // Resources/abstracts tagged with a theme live on that theme's own page;
    // everything else stays in the general Resources/Abstracts sections here.
    const themeNames = new Set(themes.map((t: any) => t.name));
    const resources = indexedResources.filter((r: any) => !r.group || !themeNames.has(r.group));
    const abstracts = indexedAbstracts.filter((a: any) => !a.group || !themeNames.has(a.group));

    const themeSummaries = themes.map((theme: any) => ({
        id: slugify(theme.name),
        name: theme.name,
        description: theme.description,
        resourceCount: allResources.filter((r: any) => r.group === theme.name).length,
        abstractCount: indexedAbstracts.filter((a: any) => a.group === theme.name).length,
    }));

    const hasImpact = Boolean(
        project.outputs || project.longTermOutcome ||
        (project.intermediateOutcomes && project.intermediateOutcomes.length > 0) ||
        (project.funders && project.funders.length > 0) ||
        (project.partners && project.partners.length > 0)
    );

    // Themes and Resources come right after Overview — they're the content
    // people are most often here to find, so they shouldn't be buried below
    // supporting detail like Outcomes/Funders/Team.
    const navItems = [
        { id: 'overview', label: 'Overview' },
        ...(themeSummaries.length > 0 ? [{ id: 'themes', label: 'Themes', count: themeSummaries.length }] : []),
        ...(resources.length > 0 ? [{ id: 'resources', label: 'Resources', count: resources.length }] : []),
        ...(abstracts.length > 0 ? [{ id: 'abstracts', label: 'Abstracts', count: abstracts.length }] : []),
        ...(hasImpact ? [{ id: 'impact', label: 'Impact' }] : []),
        ...(teamMembers.length > 0 ? [{ id: 'team', label: 'Team', count: teamMembers.length }] : []),
        ...(gallery.length > 0 ? [{ id: 'gallery', label: 'Gallery', count: gallery.length }] : []),
    ];

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
                    hasThemes={themeSummaries.length > 0}
                />

                <SectionNav items={navItems} />

                <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10">
                    <section id="overview" className={SECTION_SCROLL_MT}>
                        <ProjectOverview
                            description={project.description}
                            goal={project.goal}
                            objectives={project.objectives}
                            focusAreas={project.focusAreas}
                        />
                    </section>

                    {themeSummaries.length > 0 && (
                        <section id="themes" className={`${SECTION_SCROLL_MT} mt-12 pt-10 border-t border-gray-100`}>
                            <SectionHeader title="Themes" />
                            <ThemesGrid projectId={project._id} items={themeSummaries} />
                        </section>
                    )}

                    {resources.length > 0 && (
                        <section id="resources" className={`${SECTION_SCROLL_MT} mt-12 pt-10 border-t border-gray-100`}>
                            <SectionHeader title="Resources" />
                            <ResourcesSection projectId={project._id} resources={resources} />
                        </section>
                    )}

                    {abstracts.length > 0 && (
                        <section id="abstracts" className={`${SECTION_SCROLL_MT} mt-12 pt-10 border-t border-gray-100`}>
                            <SectionHeader title="Abstracts" />
                            <AbstractsSection projectId={project._id} items={abstracts} />
                        </section>
                    )}

                    {hasImpact && (
                        <section id="impact" className={`${SECTION_SCROLL_MT} mt-12 pt-10 border-t border-gray-100`}>
                            <SectionHeader title="Impact" />
                            <ProjectImpact
                                outputs={project.outputs}
                                longTermOutcome={project.longTermOutcome}
                                intermediateOutcomes={project.intermediateOutcomes}
                                funders={project.funders}
                                partners={project.partners}
                            />
                        </section>
                    )}

                    {teamMembers.length > 0 && (
                        <section id="team" className={`${SECTION_SCROLL_MT} mt-12 pt-10 border-t border-gray-100`}>
                            <SectionHeader title="Project Team" />
                            <ProjectTeam teamMembers={teamMembers} />
                        </section>
                    )}

                    {gallery.length > 0 && (
                        <section id="gallery" className={`${SECTION_SCROLL_MT} mt-12 pt-10 border-t border-gray-100`}>
                            <SectionHeader title="Gallery" />
                            <GallerySection items={gallery} />
                        </section>
                    )}
                </div>

                <RelatedInitiatives items={relatedInitiatives} />
                <RelatedProjects allProjects={allProjects} currentId={project._id} category={project.category} />
            </main>
            <Footer />
        </>
    );
};

export default ProjectDetailPage;
