import React from 'react';
import { Clock } from 'lucide-react';
import { ResourcesGrid, IndexedResourceItem } from './ResourcesSection';
import { AbstractsGrid, IndexedAbstractItem } from './AbstractsSection';

interface ThemeSectionProps {
    projectId: string;
    description?: string;
    resources: IndexedResourceItem[];
    abstracts: IndexedAbstractItem[];
}

export default function ThemeSection({ projectId, description, resources, abstracts }: ThemeSectionProps) {
    const hasContent = resources.length > 0 || abstracts.length > 0;

    return (
        <div className="space-y-8">
            {description && (
                <p className="text-base text-gray-600 leading-relaxed max-w-3xl text-justify">{description}</p>
            )}

            {resources.length > 0 && (
                <div>
                    <ResourcesGrid projectId={projectId} resources={resources} />
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

            {!hasContent && (
                <div className="flex flex-col items-center justify-center text-center py-12 px-6 bg-slate-50 border border-dashed border-gray-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mb-4">
                        <Clock className="w-5 h-5 text-gray-400" />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">Resources & presentations coming soon</p>
                    <p className="text-sm text-gray-400 mt-1 max-w-sm">Nothing has been added under this theme yet — check back soon.</p>
                </div>
            )}
        </div>
    );
}
