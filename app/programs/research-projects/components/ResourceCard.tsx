import React from 'react';
import { BookOpen, ClipboardList, File, FileText, ListChecks, Presentation, Wrench } from 'lucide-react';

export interface ResourceItem {
    url: string;
    title: string;
    description?: string;
    type?: string;
    group?: string;
    image?: string;
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

export default function ResourceCard({ resource, href }: { resource: ResourceItem; href: string }) {
    const meta = getResourceMeta(resource.type);
    const Icon = meta.icon;

    return (
        <a
            href={href}
            className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
        >
            {resource.image ? (
                <div className="h-32 w-full overflow-hidden bg-gray-100">
                    <img src={resource.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
            ) : (
                <div className="h-32 w-full bg-linear-to-br from-[#021d49]/5 to-[#021d49]/10 flex items-center justify-center">
                    <Icon className="w-10 h-10 text-[#021d49]/30" />
                </div>
            )}
            <div className="flex flex-col flex-1 p-6">
                <span className="w-fit text-[11px] font-semibold uppercase tracking-wide text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-3">
                    {meta.label}
                </span>
                <h3 className="font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2">{resource.title}</h3>
                {resource.description && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{resource.description}</p>
                )}
                <div className="mt-auto pt-3 flex items-center gap-1.5 text-sm font-semibold text-[#021d49] group-hover:gap-2.5 transition-all">
                    View Resource
                </div>
            </div>
        </a>
    );
}
