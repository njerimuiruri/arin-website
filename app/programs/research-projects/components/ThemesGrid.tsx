import React from 'react';
import { ArrowRight, Layers, Clock } from 'lucide-react';

export interface ThemeSummary {
    id: string;
    name: string;
    description?: string;
    resourceCount: number;
    abstractCount: number;
}

interface ThemesGridProps {
    projectId: string;
    items: ThemeSummary[];
}

export default function ThemesGrid({ projectId, items }: ThemesGridProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="grid sm:grid-cols-2 gap-5">
            {items.map((theme) => {
                const total = theme.resourceCount + theme.abstractCount;
                const parts = [
                    theme.resourceCount > 0 ? `${theme.resourceCount} resource${theme.resourceCount > 1 ? 's' : ''}` : null,
                    theme.abstractCount > 0 ? `${theme.abstractCount} abstract${theme.abstractCount > 1 ? 's' : ''}` : null,
                ].filter(Boolean);

                return (
                    <a
                        key={theme.id}
                        href={`/programs/research-projects/${projectId}/themes/${theme.id}`}
                        className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 p-6"
                    >
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#021d49] flex items-center justify-center group-hover:bg-[#021d49] group-hover:text-white transition-colors shrink-0">
                                <Layers className="w-5 h-5" />
                            </div>
                            {total === 0 ? (
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full">
                                    <Clock className="w-3 h-3" /> Coming soon
                                </span>
                            ) : (
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                                    {parts.join(' · ')}
                                </span>
                            )}
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 leading-snug mb-1.5">{theme.name}</h3>
                        {theme.description && (
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{theme.description}</p>
                        )}
                        <div className="mt-auto pt-3 flex items-center gap-1.5 text-sm font-semibold text-[#021d49] group-hover:gap-2.5 transition-all">
                            View theme <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </a>
                );
            })}
        </div>
    );
}
