import React from 'react';
import { ResourcesGrid } from './ResourcesSection';
import { AbstractsGrid, IndexedAbstractItem } from './AbstractsSection';
import { ResourceItem } from './ResourceCard';

interface ThemeSectionProps {
    projectId: string;
    description?: string;
    resources: ResourceItem[];
    abstracts: IndexedAbstractItem[];
}

export default function ThemeSection({ projectId, description, resources, abstracts }: ThemeSectionProps) {
    return (
        <div className="space-y-12">
            {description && (
                <p className="text-base text-gray-600 leading-relaxed max-w-3xl">{description}</p>
            )}

            {resources.length > 0 && (
                <div>
                    <ResourcesGrid resources={resources} />
                </div>
            )}

            {abstracts.length > 0 && (
                <div>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold text-gray-900">Abstracts</h3>
                        <p className="text-gray-500 mt-1.5 text-sm leading-relaxed">Student and researcher abstracts submitted under this theme. Click a card to read the full abstract.</p>
                    </div>
                    <AbstractsGrid projectId={projectId} items={abstracts} />
                </div>
            )}

            {resources.length === 0 && abstracts.length === 0 && !description && (
                <p className="text-sm text-gray-400 italic">No content added under this theme yet.</p>
            )}
        </div>
    );
}
