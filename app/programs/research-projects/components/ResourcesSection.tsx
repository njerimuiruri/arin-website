import React from 'react';
import ResourceCard, { ResourceItem } from './ResourceCard';

interface ResourcesGridProps {
    resources: ResourceItem[];
}

// Splits resources into "documents" vs "presentations" and renders each as
// its own card grid. Reused by both the general Resources tab and each
// theme's own tab (ThemeSection), so the two stay visually consistent.
export function ResourcesGrid({ resources }: ResourcesGridProps) {
    if (!resources || resources.length === 0) return null;

    const presentations = resources.filter((r) => r.type === 'presentation');
    const other = resources.filter((r) => r.type !== 'presentation');

    return (
        <div className="space-y-10">
            {other.length > 0 && (
                <div>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Resources & Publications</h3>
                        <p className="text-gray-500 mt-1.5 text-sm leading-relaxed">Reports, papers, toolkits and guidelines produced by this project.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {other.map((res, idx) => (
                            <ResourceCard key={idx} resource={res} />
                        ))}
                    </div>
                </div>
            )}

            {presentations.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Slides & Conference Presentations</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {presentations.map((res, idx) => (
                            <ResourceCard key={idx} resource={res} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

interface ResourcesSectionProps {
    resources: ResourceItem[];
}

export default function ResourcesSection({ resources }: ResourcesSectionProps) {
    return <ResourcesGrid resources={resources} />;
}
