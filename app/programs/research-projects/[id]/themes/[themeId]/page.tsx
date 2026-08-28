"use client";
import React, { useEffect, useState } from 'react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';
import { useParams } from 'next/navigation';
import { Layers } from 'lucide-react';
import { API_CONFIG } from '@/lib/apiConfig';
import { getTheme, getThemesByProject } from '@/services/themeService';
import { getResearchProject } from '@/services/researchProjectService';
import LearningModulesGrid from '../../../components/LearningModulesGrid';
import ExpandableSection from '../../../components/ExpandableSection';
import ResourceCard from '../../../components/ResourceCard';
import Breadcrumb from '../../../components/Breadcrumb';
import ProjectAreaSwitcher, { ProjectAreaPrevNext } from '../../../components/ProjectAreaSwitcher';
import SubProjectLevels from '../../../components/SubProjectLevels';
import SubProjectFormat from '../../../components/SubProjectFormat';
import PageArt, { HeroArtPanel, motifVariantFor } from '../../../components/PageArt';
import {
    RP,
    Band,
    Eyebrow,
    SectionHeading,
    PillButton,
    StatTiles,
    NumberedCards,
    CheckPills,
} from '../../../components/rp-ui';

const buildImageUrl = (img?: string) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`;
};

const ThemeDetailPage = () => {
    const { id, themeId } = useParams();
    const [theme, setTheme] = useState<any | null>(null);
    const [project, setProject] = useState<any | null>(null);
    const [siblingThemes, setSiblingThemes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const [themeData, projectData, siblings] = await Promise.all([
                    getTheme(themeId as string),
                    getResearchProject(id as string).catch(() => null),
                    getThemesByProject(id as string).catch(() => []),
                ]);
                if (mounted) {
                    setTheme(themeData);
                    setProject(projectData);
                    setSiblingThemes(siblings);
                }
            } catch (e: any) {
                if (mounted) setError(e?.message || 'Failed to load project area');
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [id, themeId]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#021d49] mb-4" />
                        <p className="text-gray-500">Loading project area...</p>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (error || !theme) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white px-6">
                    <div className="max-w-md text-center">
                        <p className="text-red-600 font-medium mb-4">{error || 'Project area not found'}</p>
                        <a href={`/programs/research-projects/${id}`} className="text-[#021d49] font-semibold hover:underline">
                            Back to Project
                        </a>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    const objectives: string[] = Array.isArray(theme.objectives) ? theme.objectives : [];
    const stats = Array.isArray(theme.stats) ? theme.stats : [];
    const levels = Array.isArray(theme.levels) ? theme.levels : [];
    const format = Array.isArray(theme.format) ? theme.format : [];
    const learningOutcomes: string[] = Array.isArray(theme.learningOutcomes) ? theme.learningOutcomes : [];
    const learningModules = Array.isArray(theme.learningModules) ? theme.learningModules : [];
    const resources = Array.isArray(theme.resources) ? theme.resources : [];
    const hasDetails = Boolean(theme.detailedContent && theme.detailedContent.trim());
    const externalUrl: string = theme.externalUrl || '';
    const externalUrlLabel: string = theme.externalUrlLabel || 'Visit the platform';
    const projectTitle = project?.title || 'Project';

    const isEmpty =
        objectives.length === 0 && levels.length === 0 && format.length === 0 &&
        learningOutcomes.length === 0 && learningModules.length === 0 &&
        resources.length === 0 && !hasDetails;

    const artVariant = motifVariantFor(theme.name);

    return (
        <>
            <Navbar />
            <main className="bg-white">
                <div className="relative overflow-hidden border-b border-black/5">
                    <PageArt variant={artVariant} />
                    <Breadcrumb
                        items={[
                            { label: 'Research Projects', href: '/programs/research-projects' },
                            { label: projectTitle, href: `/programs/research-projects/${id}` },
                            { label: theme.name },
                        ]}
                    />
                    <ProjectAreaSwitcher projectId={id as string} items={siblingThemes} currentId={theme._id} />

                    <div className="relative max-w-7xl mx-auto px-6 py-6 sm:py-9">
                        <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12">
                            <div>
                                <div className="mb-4">
                                    <Eyebrow>{theme.subtitle || 'Project Area'}</Eyebrow>
                                </div>
                                <h1
                                    className="text-[1.7rem] font-bold leading-[1.12] text-balance sm:text-[2.1rem] lg:text-[2.3rem]"
                                    style={{ color: RP.ink }}
                                >
                                    {theme.name}
                                </h1>
                                {theme.overview && (
                                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: RP.inkSoft }}>
                                        {theme.overview}
                                    </p>
                                )}
                                {externalUrl && (
                                    <div className="mt-6">
                                        <PillButton href={externalUrl} variant="accent" external>
                                            {externalUrlLabel}
                                        </PillButton>
                                    </div>
                                )}
                            </div>

                            <div className="hidden lg:block">
                                {theme.coverImage ? (
                                    <div className="overflow-hidden rounded-3xl p-2.5" style={{ background: RP.tint }}>
                                        <img
                                            src={buildImageUrl(theme.coverImage)}
                                            alt=""
                                            className="aspect-16/10 w-full rounded-2xl bg-white object-contain"
                                        />
                                    </div>
                                ) : (
                                    <HeroArtPanel variant={artVariant} />
                                )}
                            </div>
                        </div>

                        {stats.length > 0 && (
                            <div className="mt-6">
                                <StatTiles items={stats} />
                            </div>
                        )}
                    </div>
                </div>

                {objectives.length > 0 && (
                    <Band id="objectives" bg="tint">
                        <SectionHeading eyebrow="What it sets out to do" title="Objectives" />
                        <div className="mt-6">
                            <NumberedCards columns={3} items={objectives.map((o) => ({ body: o }))} />
                        </div>
                    </Band>
                )}

                {levels.length > 0 && (
                    <Band id="structure" bg="white">
                        <SectionHeading
                            eyebrow="How it's structured"
                            title="Programme"
                            accentWord="Structure"
                            subtitle="The tiers you progress through, each with its own assessments and certificate."
                        />
                        <div className="mt-10 rounded-3xl bg-white p-2 sm:p-4 ring-1 ring-black/5">
                            <div className="px-4 sm:px-6">
                                <SubProjectLevels items={levels} />
                            </div>
                        </div>
                    </Band>
                )}

                {format.length > 0 && (
                    <Band id="format" bg="tint">
                        <SectionHeading eyebrow="How it's delivered" title="Format" />
                        <div className="mt-6">
                            <SubProjectFormat items={format} />
                        </div>
                    </Band>
                )}

                {learningOutcomes.length > 0 && (
                    <Band id="outcomes" bg="white">
                        <SectionHeading
                            eyebrow="What you'll gain"
                            title="Learning"
                            accentWord="Outcomes"
                            align="center"
                        />
                        <div className="mt-6">
                            <CheckPills items={learningOutcomes} />
                        </div>
                    </Band>
                )}

                {learningModules.length > 0 && (
                    <Band id="modules" bg="tint">
                        <SectionHeading
                            eyebrow="Study material"
                            title="Learning"
                            accentWord="Modules"
                            subtitle="Readings, videos, courses and tools related to this project area."
                        />
                        <div className="mt-6">
                            <LearningModulesGrid modules={learningModules} />
                        </div>
                    </Band>
                )}

                {hasDetails && (
                    <Band id="details" bg="white">
                        <SectionHeading eyebrow="Deep dive" title="Details" />
                        <div className="mt-10">
                            <ExpandableSection label="View More Details" html={theme.detailedContent} />
                        </div>
                    </Band>
                )}

                {resources.length > 0 && (
                    <Band id="resources" bg="tint">
                        <SectionHeading
                            eyebrow="Downloads"
                            title="Resources"
                            subtitle="Documents, links, and other materials specific to this project area."
                        />
                        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {resources.map((res: any, idx: number) => (
                                <ResourceCard key={idx} resource={res} href={res.url} external />
                            ))}
                        </div>
                    </Band>
                )}

                {isEmpty && (
                    <Band bg="tint">
                        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-black/10 bg-white px-6 py-16 text-center">
                            <p className="text-sm font-semibold" style={{ color: RP.ink }}>Content coming soon</p>
                            <p className="mt-1 max-w-sm text-sm" style={{ color: RP.inkSoft }}>
                                Nothing has been added under this project area yet — check back soon.
                            </p>
                        </div>
                    </Band>
                )}

                {externalUrl && (
                    <section className="bg-white">
                        <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
                            <div className="relative overflow-hidden rounded-[1.75rem] bg-white px-6 py-12 text-center shadow-sm ring-1 ring-black/[0.06] sm:px-10 sm:py-14">
                                <svg
                                    aria-hidden
                                    viewBox="0 0 400 200"
                                    className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.05]"
                                    fill="none"
                                    stroke={RP.ink}
                                    strokeWidth="2"
                                >
                                    <circle cx="60" cy="40" r="26" />
                                    <circle cx="340" cy="160" r="26" />
                                    <path d="M0 150 Q120 90 220 140 T400 120" />
                                </svg>
                                <div className="relative mx-auto max-w-2xl">
                                    <div className="mb-4 flex justify-center">
                                        <Eyebrow>Get started</Eyebrow>
                                    </div>
                                    <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: RP.ink }}>
                                        Ready to join {theme.name}?
                                    </h2>
                                    <p className="mt-3" style={{ color: RP.inkSoft }}>
                                        It runs on a dedicated platform. Follow the link to enrol and begin.
                                    </p>
                                    <div className="mt-7 flex justify-center">
                                        <PillButton href={externalUrl} variant="solid" external>
                                            {externalUrlLabel}
                                        </PillButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                <ProjectAreaPrevNext projectId={id as string} projectTitle={projectTitle} items={siblingThemes} currentId={theme._id} />
            </main>
            <Footer />
        </>
    );
};

export default ThemeDetailPage;
