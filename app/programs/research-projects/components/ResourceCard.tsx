import React from 'react';
import { BookOpen, ClipboardList, Download, File, FileText, ListChecks, Presentation, Wrench } from 'lucide-react';

export interface ResourceItem {
    url: string;
    title: string;
    description?: string;
    type?: string;
    group?: string;
}

const TYPE_META: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    pdf: { label: 'PDF Document', icon: FileText },
    presentation: { label: 'Presentation', icon: Presentation },
    report: { label: 'Report', icon: ClipboardList },
    publication: { label: 'Publication', icon: BookOpen },
    toolkit: { label: 'Toolkit', icon: Wrench },
    guideline: { label: 'Guideline', icon: ListChecks },
    other: { label: 'Resource', icon: File },
};

export function getResourceMeta(type?: string) {
    return TYPE_META[type || 'other'] || TYPE_META.other;
}

export default function ResourceCard({ resource }: { resource: ResourceItem }) {
    const meta = getResourceMeta(resource.type);
    const Icon = meta.icon;

    return (
        <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col h-full p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#021d49] flex items-center justify-center group-hover:bg-[#021d49] group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                    {meta.label}
                </span>
            </div>
            <h3 className="font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2">{resource.title}</h3>
            {resource.description && (
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{resource.description}</p>
            )}
            <div className="mt-auto pt-3 flex items-center gap-1.5 text-sm font-semibold text-[#021d49] group-hover:gap-2.5 transition-all">
                View / Download <Download className="w-3.5 h-3.5" />
            </div>
        </a>
    );
}
