import React from 'react';
import { ArrowRight } from 'lucide-react';
import { API_CONFIG } from '@/lib/apiConfig';
import { RP } from './rp-ui';
import { CardArt, motifVariantFor } from './PageArt';

export interface ThemeSummary {
    _id: string;
    name: string;
    subtitle?: string;
    overview?: string;
    coverImage?: string;
    learningModules?: unknown[];
    resources?: unknown[];
    objectives?: unknown[];
    levels?: unknown[];
    learningOutcomes?: unknown[];
}

interface ThemesGridProps {
    projectId: string;
    items: ThemeSummary[];
}

const buildImageUrl = (img?: string) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`;
};

export default function ThemesGrid({ projectId, items }: ThemesGridProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="grid gap-6 md:grid-cols-2">
            {items.map((theme, i) => {
                const chips = [
                    (theme.levels?.length || 0) > 0 ? `${theme.levels!.length} levels` : null,
                    (theme.objectives?.length || 0) > 0 ? `${theme.objectives!.length} objectives` : null,
                    (theme.learningOutcomes?.length || 0) > 0 ? `${theme.learningOutcomes!.length} outcomes` : null,
                    (theme.learningModules?.length || 0) > 0 ? `${theme.learningModules!.length} modules` : null,
                    (theme.resources?.length || 0) > 0 ? `${theme.resources!.length} resources` : null,
                ].filter(Boolean) as string[];

                return (
                    <a
                        key={theme._id}
                        href={`/programs/research-projects/${projectId}/themes/${theme._id}`}
                        className="group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-white p-8 ring-1 ring-black/[0.07] transition-all duration-200 hover:-translate-y-1 hover:ring-black/15 hover:shadow-[0_18px_50px_-20px_rgba(2,29,73,0.35)]"
                    >
                        <CardArt variant={motifVariantFor(theme.name)} />

                        <div className="relative flex flex-1 flex-col">
                            {theme.coverImage && (
                                <div className="mb-6 overflow-hidden rounded-2xl" style={{ background: RP.tint }}>
                                    <img
                                        src={buildImageUrl(theme.coverImage)}
                                        alt=""
                                        className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="mb-5 flex items-center gap-3">
                                <span
                                    className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                                    style={{ background: RP.ink }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span
                                    className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                                    style={{ background: RP.tint, color: RP.accentWord }}
                                >
                                    Programme {i + 1} of {items.length}
                                </span>
                            </div>

                            {theme.subtitle && (
                                <p
                                    className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.14em]"
                                    style={{ color: RP.accentWord }}
                                >
                                    {theme.subtitle}
                                </p>
                            )}

                            <h3 className="text-[1.6rem] font-bold leading-tight" style={{ color: RP.ink }}>
                                {theme.name}
                            </h3>

                            {theme.overview && (
                                <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: RP.inkSoft }}>
                                    {theme.overview}
                                </p>
                            )}

                            {chips.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {chips.map((c) => (
                                        <span
                                            key={c}
                                            className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide"
                                            style={{ background: RP.tint, color: RP.ink }}
                                        >
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <span
                                className="mt-7 inline-flex items-center gap-3 self-start rounded-full py-2.5 pl-5 pr-2.5 text-sm font-semibold text-white"
                                style={{ background: RP.ink }}
                            >
                                Open the {theme.name.length > 24 ? 'programme page' : `${theme.name} page`}
                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-colors group-hover:bg-white/30">
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </span>
                            </span>
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
