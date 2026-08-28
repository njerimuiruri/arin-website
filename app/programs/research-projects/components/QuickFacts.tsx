import React from 'react';
import { Calendar, FolderKanban, Layers, Paperclip, Tag, Users } from 'lucide-react';

interface QuickFactsProps {
    category?: string;
    dateLabel?: string;
    projectAreasCount?: number;
    resourcesCount?: number;
    teamCount?: number;
    orgCount?: number;
}

interface Row {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
    href?: string;
}

// Fills the space next to the overview text with something actually
// useful — a scannable summary of the project's shape — rather than
// stretching the prose column to an unreadable line length.
export default function QuickFacts({ category, dateLabel, projectAreasCount = 0, resourcesCount = 0, teamCount = 0, orgCount = 0 }: QuickFactsProps) {
    const rows: Row[] = [
        ...(category ? [{ icon: Tag, label: 'Category', value: category }] : []),
        ...(dateLabel ? [{ icon: Calendar, label: 'Published', value: dateLabel }] : []),
        ...(projectAreasCount > 0 ? [{ icon: Layers, label: 'Project Areas', value: projectAreasCount, href: '#project-areas' }] : []),
        ...(resourcesCount > 0 ? [{ icon: Paperclip, label: 'Resources', value: resourcesCount, href: '#resources' }] : []),
        ...(teamCount > 0 ? [{ icon: Users, label: 'Team Members', value: teamCount, href: '#team' }] : []),
        ...(orgCount > 0 ? [{ icon: FolderKanban, label: 'Funders & Partners', value: orgCount, href: '#partners' }] : []),
    ];

    if (rows.length === 0) return null;

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 lg:sticky lg:top-36">
            <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">At a Glance</p>
            <dl className="space-y-4">
                {rows.map((row, i) => {
                    const Icon = row.icon;
                    const content = (
                        <>
                            <dt className="flex items-center gap-2.5 text-sm text-gray-500">
                                <Icon className="w-4 h-4 text-[#021d49]/60 shrink-0" /> {row.label}
                            </dt>
                            <dd className="text-sm font-semibold text-gray-900 shrink-0">{row.value}</dd>
                        </>
                    );
                    return row.href ? (
                        <a
                            key={i}
                            href={row.href}
                            className="flex items-center justify-between gap-3 group -mx-1 px-1 py-0.5 rounded-lg hover:bg-blue-50/60 transition-colors"
                        >
                            <dt className="flex items-center gap-2.5 text-sm text-gray-500 group-hover:text-[#021d49]">
                                <Icon className="w-4 h-4 text-[#021d49]/60 shrink-0" /> {row.label}
                            </dt>
                            <dd className="text-sm font-semibold text-[#021d49] shrink-0">{row.value}</dd>
                        </a>
                    ) : (
                        <div key={i} className="flex items-center justify-between gap-3">
                            {content}
                        </div>
                    );
                })}
            </dl>
        </div>
    );
}
