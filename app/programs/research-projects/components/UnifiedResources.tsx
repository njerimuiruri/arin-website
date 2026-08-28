"use client";
import React, { useMemo, useState } from 'react';
import ResourceCard, { ResourceItem } from './ResourceCard';

export interface AggregatedResource extends ResourceItem {
    _index?: number; // present for general (project-level) resources — used to link to their detail page
    _source: string; // 'General' or the owning project area's name
}

interface UnifiedResourcesProps {
    projectId: string;
    resources: AggregatedResource[];
}

// Project-level resources and every project area's own resources, in one
// place, filterable by source — so "show me everything" and "show me just
// this project area's material" are both a click away instead of requiring
// a visitor to hunt through each project area individually.
export default function UnifiedResources({ projectId, resources }: UnifiedResourcesProps) {
    const sources = useMemo(() => {
        const seen = new Set<string>();
        const ordered: string[] = [];
        for (const r of resources) {
            if (!seen.has(r._source)) {
                seen.add(r._source);
                ordered.push(r._source);
            }
        }
        return ordered;
    }, [resources]);

    const [activeFilter, setActiveFilter] = useState<string>('All');

    if (resources.length === 0) return null;

    const filtered = activeFilter === 'All' ? resources : resources.filter((r) => r._source === activeFilter);

    return (
        <div>
            {sources.length > 1 && (
                <div className="flex flex-wrap gap-2 mb-6">
                    {['All', ...sources].map((source) => {
                        const isActive = source === activeFilter;
                        return (
                            <button
                                key={source}
                                type="button"
                                onClick={() => setActiveFilter(source)}
                                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
                                    isActive
                                        ? 'bg-[#021d49] border-[#021d49] text-white'
                                        : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-[#021d49]'
                                }`}
                            >
                                {source}
                            </button>
                        );
                    })}
                </div>
            )}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((res, i) => (
                    <ResourceCard
                        key={`${res._source}-${res._index ?? i}`}
                        resource={res}
                        href={typeof res._index === 'number' ? `/programs/research-projects/${projectId}/resources/${res._index}` : res.url}
                        external={typeof res._index !== 'number'}
                    />
                ))}
            </div>
        </div>
    );
}
