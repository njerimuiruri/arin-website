import React from 'react';
import { CheckCircle2, Calendar, Tag, Layers, Flag, TrendingUp, Landmark, ArrowRight, Building2, Handshake } from 'lucide-react';

export interface OrgItem {
    name: string;
    logo?: string;
}

interface AboutSectionProps {
    description: string;
    objectives?: string[];
    focusAreas?: string[];
    category?: string;
    dateLabel?: string;
    teamMembers?: string[];
    goal?: string;
    outputs?: string;
    longTermOutcome?: string;
    intermediateOutcomes?: string[];
    funders?: OrgItem[];
    partners?: OrgItem[];
}

function OrgLogoRow({ items }: { items: OrgItem[] }) {
    return (
        <div className="flex flex-wrap gap-3">
            {items.map((item, i) => (
                <div
                    key={i}
                    className="flex flex-col items-center justify-center gap-2 w-32 p-3 bg-white border border-gray-100 rounded-xl shadow-sm"
                >
                    <div className="h-10 w-full flex items-center justify-center">
                        {item.logo ? (
                            <img src={item.logo} alt={item.name} className="max-h-10 max-w-full object-contain" />
                        ) : (
                            <Building2 className="w-6 h-6 text-gray-300" />
                        )}
                    </div>
                    <p className="text-xs text-gray-600 text-center leading-snug line-clamp-2">{item.name}</p>
                </div>
            ))}
        </div>
    );
}

// Groups runs of 2+ adjacent standalone <img> tags (e.g. partner/funder logos
// pasted one after another) into a row so they don't stack awkwardly.
const groupAdjacentImages = (html: string) =>
    html.replace(/(?:<img\b[^>]*>\s*){2,}/gi, (match) => `<div class="p-logo-row">${match}</div>`);

export default function AboutSection({
    description,
    objectives = [],
    focusAreas = [],
    category,
    dateLabel,
    teamMembers = [],
    goal,
    longTermOutcome,
    intermediateOutcomes = [],
    outputs,
    funders = [],
    partners = [],
}: AboutSectionProps) {
    const hasFacts = Boolean(category || dateLabel || focusAreas.length > 0);
    const hasOutputsOrOutcomes = Boolean(outputs || longTermOutcome || intermediateOutcomes.length > 0);

    return (
        <div>
            <div className="grid lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <div
                        className="p-prose"
                        dangerouslySetInnerHTML={{
                            __html: description
                                ? groupAdjacentImages(description)
                                : '<p style="color:#9ca3af;font-style:italic">No description available.</p>',
                        }}
                    />

                    {goal && (
                        <div className="mt-10 flex items-start gap-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-6">
                            <Flag className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-1.5">Project Goal</p>
                                <p className="text-base text-gray-800 leading-relaxed">{goal}</p>
                            </div>
                        </div>
                    )}

                    {objectives.length > 0 && (
                        <div className="mt-10">
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

                    {hasOutputsOrOutcomes && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-emerald-600" /> Outputs & Outcomes
                            </h3>

                            {outputs && (
                                <div className="mb-4">
                                    <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Outputs</p>
                                    <div className="p-prose" dangerouslySetInnerHTML={{ __html: outputs }} />
                                </div>
                            )}

                            {longTermOutcome && (
                                <div className="mb-4">
                                    <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-1.5">Long-term Outcome</p>
                                    <p className="text-sm text-gray-700 leading-relaxed">{longTermOutcome}</p>
                                </div>
                            )}

                            {intermediateOutcomes.length > 0 && (
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">Intermediate Outcomes</p>
                                    <div className="space-y-2">
                                        {intermediateOutcomes.map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex items-start gap-3 p-4 bg-white border border-gray-100 rounded-xl shadow-sm"
                                            >
                                                <ArrowRight className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                                                <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {funders.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <Landmark className="w-5 h-5 text-blue-600" /> Funder{funders.length > 1 ? 's' : ''}
                            </h3>
                            <OrgLogoRow items={funders} />
                        </div>
                    )}

                    {partners.length > 0 && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                                <Handshake className="w-5 h-5 text-blue-600" /> Partners
                            </h3>
                            <OrgLogoRow items={partners} />
                        </div>
                    )}
                </div>

                {hasFacts && (
                    <aside className="lg:col-span-1">
                        <div className="bg-slate-50 border border-gray-100 rounded-2xl p-6 space-y-6">
                            <h3 className="text-xs font-bold tracking-widest uppercase text-gray-400">At a Glance</h3>

                            {category && (
                                <div className="flex items-start gap-3">
                                    <Tag className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Category</p>
                                        <p className="text-sm font-semibold text-gray-900">{category}</p>
                                    </div>
                                </div>
                            )}

                            {dateLabel && (
                                <div className="flex items-start gap-3">
                                    <Calendar className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">Published</p>
                                        <p className="text-sm font-semibold text-gray-900">{dateLabel}</p>
                                    </div>
                                </div>
                            )}

                            {focusAreas.length > 0 && (
                                <div className="flex items-start gap-3">
                                    <Layers className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                                    <div>
                                        <p className="text-xs text-gray-400 mb-2">Key Focus Areas</p>
                                        <div className="flex flex-wrap gap-2">
                                            {focusAreas.map((area, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 bg-white text-[#021d49] text-xs font-medium rounded-full border border-blue-100"
                                                >
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                )}
            </div>

            {teamMembers.length > 0 && (
                <div className="mt-12">
                    <h3 className="text-xl font-bold text-gray-900 mb-5">Project Team</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {teamMembers.map((name, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col items-center text-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#021d49] to-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                                    {name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 leading-snug">{name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">Team Member</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
