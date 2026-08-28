"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';
import { API_CONFIG } from '@/lib/apiConfig';
import { useParams } from 'next/navigation';
import { getResearchProject, getResearchProjects } from '@/services/researchProjectService';
import { getThemesByProject } from '@/services/themeService';

import ProjectHero from '../components/ProjectHero';
import ProjectOverview from '../components/ProjectOverview';
import ProjectImpact from '../components/ProjectImpact';
import PartnersFunders from '../components/PartnersFunders';
import ProjectTeam from '../components/ProjectTeam';
import ThemesGrid from '../components/ThemesGrid';
import UnifiedResources, { AggregatedResource } from '../components/UnifiedResources';
import AbstractsSection from '../components/AbstractsSection';
import GallerySection from '../components/GallerySection';
import Breadcrumb from '../components/Breadcrumb';
import RelatedInitiatives from '../components/RelatedInitiatives';
import RelatedProjects from '../components/RelatedProjects';
import { Band, SectionHeading } from '../components/rp-ui';

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
// Cuts at the last full word within `max` chars instead of mid-word.
const truncate = (text: string, max: number) =>
    text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '') + '…';
const buildImageUrl = (img?: string) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`;
};

const CONTAINER = 'max-w-7xl';

const ProjectDetailPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState<any | null>(null);
    const [allProjects, setAllProjects] = useState<any[]>([]);
    const [themes, setThemes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const [data, list, projectThemes] = await Promise.all([
                    getResearchProject(id as string),
                    getResearchProjects().catch(() => []),
                    getThemesByProject(id as string).catch(() => []),
                ]);
                if (mounted) {
                    setProject(data);
                    setAllProjects(list);
                    setThemes(projectThemes);
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

    const excerpt = truncate(stripHtml(project.description || '').trim(), 200);
    const dateLabel = project.date
        ? new Date(project.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : undefined;
    const gallery = Array.isArray(project.gallery) ? project.gallery : [];
    const relatedInitiatives = Array.isArray(project.relatedInitiatives) ? project.relatedInitiatives : [];
    const teamMembers = Array.isArray(project.teamMembers) ? project.teamMembers : [];
    const allResources = Array.isArray(project.resources) ? project.resources : [];
    const indexedResources = allResources.map((r: any, i: number) => ({ ...r, _index: i }));
    const allAbstracts = Array.isArray(project.abstracts) ? project.abstracts : [];
    const indexedAbstracts = allAbstracts.map((a: any, i: number) => ({ ...a, _index: i }));
    const legacyThemes = Array.isArray(project.themes) ? project.themes : [];

    const legacyThemeNames = new Set(legacyThemes.map((t: any) => t.name));
    const resources = indexedResources.filter((r: any) => !r.group || !legacyThemeNames.has(r.group));
    const abstracts = indexedAbstracts.filter((a: any) => !a.group || !legacyThemeNames.has(a.group));

    const unifiedResources: AggregatedResource[] = [
        ...resources.map((r: any) => ({ ...r, _source: 'General' as const })),
        ...themes.flatMap((theme: any) =>
            (Array.isArray(theme.resources) ? theme.resources : []).map((r: any) => ({
                ...r,
                _index: undefined,
                _source: theme.name,
            }))
        ),
    ];

    const funders = Array.isArray(project.funders) ? project.funders : [];
    const partners = Array.isArray(project.partners) ? project.partners : [];
    const hasImpact = Boolean(
        project.outputs || project.longTermOutcome ||
        (project.intermediateOutcomes && project.intermediateOutcomes.length > 0)
    );
    const hasPartners = Boolean(funders.length > 0 || partners.length > 0);

    return (
        <>
            <Navbar />
            <main className="bg-white">
                <Breadcrumb
                    maxWidthClass={CONTAINER}
                    items={[
                        { label: 'Research Projects', href: '/programs/research-projects' },
                        { label: project.title },
                    ]}
                />

                <ProjectHero
                    title={project.title}
                    category={project.category}
                    dateLabel={dateLabel}
                    excerpt={excerpt}
                    coverImageUrl={buildImageUrl(project.coverImage)}
                    hasResources={unifiedResources.length > 0}
                    hasThemes={themes.length > 0}
                    projectAreasCount={themes.length}
                    resourcesCount={unifiedResources.length}
                    teamCount={teamMembers.length}
                />

                {themes.length > 0 && (
                    <Band id="project-areas">
                        <SectionHeading
                            eyebrow="Programmes under this project"
                            title="Project"
                            accentWord="Areas"
                            subtitle="This project runs two programmes, each on its own page. Click a card to open it."
                        />
                        <div className="mt-6">
                            <ThemesGrid projectId={project._id} items={themes} />
                        </div>
                    </Band>
                )}

                <Band id="overview">
                    <SectionHeading
                        eyebrow="Our research"
                        title="Project"
                        accentWord="Overview"
                        subtitle="What this project is about, the goal it works toward, and the objectives that guide it."
                    />
                    <div className="mt-6">
                        <ProjectOverview
                            description={project.description}
                            goal={project.goal}
                            objectives={project.objectives}
                            focusAreas={project.focusAreas}
                            projectId={project._id}
                            themes={themes}
                        />
                    </div>
                </Band>

                {hasImpact && (
                    <Band id="impact">
                        <SectionHeading
                            eyebrow="Outcomes & evidence"
                            title="The"
                            accentWord="Impact"
                            subtitle="What this project has produced and the change it's working toward."
                        />
                        <div className="mt-6">
                            <ProjectImpact
                                outputs={project.outputs}
                                longTermOutcome={project.longTermOutcome}
                                intermediateOutcomes={project.intermediateOutcomes}
                            />
                        </div>
                    </Band>
                )}

                {unifiedResources.length > 0 && (
                    <Band id="resources" bg="white">
                        <SectionHeading
                            eyebrow="Downloads"
                            title="Resources"
                            subtitle="Reports, papers, toolkits, and presentations — from the project overall and from each project area."
                        />
                        <div className="mt-6">
                            <UnifiedResources projectId={project._id} resources={unifiedResources} />
                        </div>
                    </Band>
                )}

                {abstracts.length > 0 && (
                    <Band id="abstracts" bg="tint">
                        <SectionHeading
                            eyebrow="Contributions"
                            title="Abstracts"
                            subtitle="Student and researcher abstracts submitted in connection with this project."
                        />
                        <div className="mt-6">
                            <AbstractsSection projectId={project._id} items={abstracts} />
                        </div>
                    </Band>
                )}

                {hasPartners && (
                    <Band id="partners" bg="white">
                        <SectionHeading eyebrow="Who we work with" title="Partners &" accentWord="Funders" />
                        <div className="mt-6">
                            <PartnersFunders funders={project.funders} partners={project.partners} />
                        </div>
                    </Band>
                )}

                {teamMembers.length > 0 && (
                    <Band id="team" bg="tint">
                        <SectionHeading eyebrow="The people" title="Project" accentWord="Team" />
                        <div className="mt-6">
                            <ProjectTeam teamMembers={teamMembers} />
                        </div>
                    </Band>
                )}

                {gallery.length > 0 && (
                    <Band id="gallery" bg="white">
                        <SectionHeading eyebrow="In pictures" title="Gallery" />
                        <div className="mt-6">
                            <GallerySection items={gallery} />
                        </div>
                    </Band>
                )}

                <RelatedInitiatives items={relatedInitiatives} />
                <RelatedProjects allProjects={allProjects} currentId={project._id} category={project.category} />
            </main>
            <Footer />
        </>
    );
};

export default ProjectDetailPage;
