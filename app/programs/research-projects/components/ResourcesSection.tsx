import React from 'react';
import ResourceCard, { ResourceItem } from './ResourceCard';

export type IndexedResourceItem = ResourceItem & { _index: number };

interface ResourcesGridProps {
    projectId: string;
    resources: IndexedResourceItem[];
}

// Splits resources into "documents" vs "presentations" and renders each as
// its own card grid. Reused by both the general Resources tab and each
// theme's own tab (ThemeSection), so the two stay visually consistent. Each
// card links to its own detail page rather than straight to the file/link,
// using the resource's stable index in the project's resources array
// (resources have no _id of their own).
export function ResourcesGrid({ projectId, resources }: ResourcesGridProps) {
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
                        {other.map((res) => (
                            <ResourceCard key={res._index} resource={res} href={`/programs/research-projects/${projectId}/resources/${res._index}`} />
                        ))}
                    </div>
                </div>
            )}

            {presentations.length > 0 && (
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-6">Slides & Conference Presentations</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {presentations.map((res) => (
                            <ResourceCard key={res._index} resource={res} href={`/programs/research-projects/${projectId}/resources/${res._index}`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

interface ResourcesSectionProps {
    projectId: string;
    resources: IndexedResourceItem[];
}

export default function ResourcesSection({ projectId, resources }: ResourcesSectionProps) {
    return <ResourcesGrid projectId={projectId} resources={resources} />;
}
