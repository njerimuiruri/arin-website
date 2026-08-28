import React from 'react';

export interface ProjectAreaSwitcherItem {
    _id: string;
    name: string;
}

interface ProjectAreaSwitcherProps {
    projectId: string;
    items: ProjectAreaSwitcherItem[];
    currentId: string;
}

// Lets a visitor jump straight from one project area to a sibling one
// without first going back to the project page — the "never feel stuck"
// requirement. Pure links, no client state needed.
export default function ProjectAreaSwitcher({ projectId, items, currentId }: ProjectAreaSwitcherProps) {
    if (!items || items.length <= 1) return null;

    return (
        <div className="border-t border-gray-100 bg-slate-50/60">
            <div className="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 overflow-x-auto">
                {items.map((item) => {
                    const isActive = item._id === currentId;
                    return (
                        <a
                            key={item._id}
                            href={`/programs/research-projects/${projectId}/themes/${item._id}`}
                            aria-current={isActive ? 'page' : undefined}
                            className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
                                isActive
                                    ? 'bg-[#021d49] border-[#021d49] text-white'
                                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-[#021d49]'
                            }`}
                        >
                            {item.name}
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

interface ProjectAreaPrevNextProps {
    projectId: string;
    projectTitle: string;
    items: ProjectAreaSwitcherItem[];
    currentId: string;
}

export function ProjectAreaPrevNext({ projectId, projectTitle, items, currentId }: ProjectAreaPrevNextProps) {
    const index = items.findIndex((item) => item._id === currentId);
    const prev = index > 0 ? items[index - 1] : null;
    const next = index >= 0 && index < items.length - 1 ? items[index + 1] : null;

    return (
        <div className="border-t border-gray-100">
            <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between gap-4">
                {prev ? (
                    <a
                        href={`/programs/research-projects/${projectId}/themes/${prev._id}`}
                        className="group min-w-0 text-left"
                    >
                        <span className="block text-xs text-gray-400 mb-0.5">← Previous</span>
                        <span className="block text-sm font-semibold text-gray-700 group-hover:text-[#021d49] truncate">{prev.name}</span>
                    </a>
                ) : (
                    <a href={`/programs/research-projects/${projectId}`} className="group min-w-0 text-left">
                        <span className="block text-xs text-gray-400 mb-0.5">← Back to</span>
                        <span className="block text-sm font-semibold text-gray-700 group-hover:text-[#021d49] truncate">{projectTitle}</span>
                    </a>
                )}

                {next && (
                    <a
                        href={`/programs/research-projects/${projectId}/themes/${next._id}`}
                        className="group min-w-0 text-right ml-auto"
                    >
                        <span className="block text-xs text-gray-400 mb-0.5">Next →</span>
                        <span className="block text-sm font-semibold text-gray-700 group-hover:text-[#021d49] truncate">{next.name}</span>
                    </a>
                )}
            </div>
        </div>
    );
}
