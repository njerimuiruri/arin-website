import React from 'react';
import { Calendar, Layers, Paperclip, Tag, Users } from 'lucide-react';
import { RP, Eyebrow, PillButton } from './rp-ui';
import PageArt, { HeroArtPanel } from './PageArt';

interface ProjectHeroProps {
    title: string;
    category?: string;
    dateLabel?: string;
    excerpt?: string;
    coverImageUrl?: string;
    hasResources: boolean;
    hasThemes: boolean;
    projectAreasCount?: number;
    resourcesCount?: number;
    teamCount?: number;
}

export default function ProjectHero({
    title,
    category,
    dateLabel,
    excerpt,
    coverImageUrl,
    hasResources,
    hasThemes,
    projectAreasCount = 0,
    resourcesCount = 0,
    teamCount = 0,
}: ProjectHeroProps) {
    const meta = [
        dateLabel ? { icon: Calendar, text: dateLabel } : null,
        projectAreasCount ? { icon: Layers, text: `${projectAreasCount} project areas` } : null,
        resourcesCount ? { icon: Paperclip, text: `${resourcesCount} resources` } : null,
        teamCount ? { icon: Users, text: `${teamCount} team members` } : null,
    ].filter(Boolean) as { icon: React.ComponentType<{ className?: string }>; text: string }[];

    return (
        <section className="relative overflow-hidden bg-white border-b border-black/5">
            <PageArt variant="climate" />
            <div className="relative mx-auto max-w-7xl px-6 py-6 sm:py-9">
                <div className="grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
                    <div>
                        <div className="mb-4 flex flex-wrap items-center gap-2">
                            <Eyebrow>Research Project</Eyebrow>
                            {category && (
                                <span
                                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide"
                                    style={{ borderColor: RP.line, color: RP.inkSoft }}
                                >
                                    <Tag className="h-3 w-3" /> {category}
                                </span>
                            )}
                        </div>

                        <h1
                            className="text-[1.7rem] font-bold leading-[1.12] text-balance sm:text-[2.1rem] lg:text-[2.4rem]"
                            style={{ color: RP.ink }}
                        >
                            {title}
                        </h1>

                        {meta.length > 0 && (
                            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px]" style={{ color: RP.inkSoft }}>
                                {meta.map((m, i) => {
                                    const Icon = m.icon;
                                    return (
                                        <span key={i} className="inline-flex items-center gap-1.5">
                                            <Icon className="h-3.5 w-3.5" /> {m.text}
                                        </span>
                                    );
                                })}
                            </div>
                        )}

                        {excerpt && (
                            <p
                                className="mt-4 max-w-xl text-[15px] leading-relaxed line-clamp-3"
                                style={{ color: RP.inkSoft }}
                            >
                                {excerpt}
                            </p>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <PillButton href="#overview" variant="solid">
                                Read the overview
                            </PillButton>
                            {hasThemes && (
                                <PillButton href="#project-areas" variant="light" withArrow={false}>
                                    <Layers className="h-4 w-4" /> Project Areas
                                </PillButton>
                            )}
                            {hasResources && (
                                <PillButton href="#resources" variant="light" withArrow={false}>
                                    <Paperclip className="h-4 w-4" /> Resources
                                </PillButton>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        {coverImageUrl ? (
                            <div className="overflow-hidden rounded-3xl p-2.5" style={{ background: RP.tint }}>
                                <img
                                    src={coverImageUrl}
                                    alt=""
                                    className="aspect-16/10 w-full rounded-2xl bg-white object-contain"
                                />
                            </div>
                        ) : (
                            <HeroArtPanel variant="climate" />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
