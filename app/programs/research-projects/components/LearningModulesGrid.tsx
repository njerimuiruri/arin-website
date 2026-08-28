import React from 'react';
import { BookOpen, ExternalLink, GraduationCap, PlayCircle, Wrench } from 'lucide-react';

export interface LearningModuleItem {
    title: string;
    description?: string;
    url?: string;
    type?: string;
}

const TYPE_META: Record<string, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
    reading: { label: 'Reading', icon: BookOpen },
    video: { label: 'Video', icon: PlayCircle },
    course: { label: 'Course', icon: GraduationCap },
    tool: { label: 'Tool', icon: Wrench },
};

function getModuleMeta(type?: string) {
    return TYPE_META[type || 'reading'] || TYPE_META.reading;
}

export default function LearningModulesGrid({ modules }: { modules: LearningModuleItem[] }) {
    if (!modules || modules.length === 0) return null;

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((mod, idx) => {
                const meta = getModuleMeta(mod.type);
                const Icon = meta.icon;
                const content = (
                    <>
                        <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Icon className="w-5 h-5" />
                        </div>
                        <span className="w-fit text-[11px] font-semibold uppercase tracking-wide text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full mb-3">
                            {meta.label}
                        </span>
                        <h3 className="font-semibold text-gray-900 leading-snug mb-2">{mod.title}</h3>
                        {mod.description && (
                            <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-1 mb-4">{mod.description}</p>
                        )}
                        {mod.url && (
                            <span className="mt-auto w-fit inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-2 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                                Learn More <ExternalLink className="w-3.5 h-3.5" />
                            </span>
                        )}
                    </>
                );

                const className = "group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-0.5 transition-all duration-200 p-6";

                return mod.url ? (
                    <a key={idx} href={mod.url} target="_blank" rel="noopener noreferrer" className={className}>
                        {content}
                    </a>
                ) : (
                    <div key={idx} className={className}>
                        {content}
                    </div>
                );
            })}
        </div>
    );
}
