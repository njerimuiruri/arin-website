import React from 'react';
import { CheckCircle2, Layers, Flag } from 'lucide-react';

interface ProjectOverviewProps {
    description: string;
    goal?: string;
    objectives?: string[];
    focusAreas?: string[];
}

// Groups runs of 2+ adjacent standalone <img> tags (e.g. partner/funder logos
// pasted one after another) into a row so they don't stack awkwardly.
const groupAdjacentImages = (html: string) =>
    html.replace(/(?:<img\b[^>]*>\s*){2,}/gi, (match) => `<div class="p-logo-row">${match}</div>`);

export default function ProjectOverview({ description, goal, objectives = [], focusAreas = [] }: ProjectOverviewProps) {
    return (
        <div className="max-w-4xl">
            <div
                className="p-prose p-prose-lead"
                dangerouslySetInnerHTML={{
                    __html: description
                        ? groupAdjacentImages(description)
                        : '<p style="color:#9ca3af;font-style:italic">No description available.</p>',
                }}
            />

            {goal && (
                <div className="mt-8 flex items-start gap-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                    <Flag className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-1.5">Project Goal</p>
                        <p className="text-base text-gray-800 leading-relaxed text-justify">{goal}</p>
                    </div>
                </div>
            )}

            {objectives.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-5">Objectives</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {objectives.map((obj, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                            >
                                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                <span className="text-sm text-gray-700 leading-relaxed">{obj}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {focusAreas.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-blue-600" /> Key Focus Areas
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {focusAreas.map((area, i) => (
                            <span
                                key={i}
                                className="px-3.5 py-1.5 bg-blue-50 text-[#021d49] text-sm font-medium rounded-full border border-blue-100"
                            >
                                {area}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
