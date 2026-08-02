import React from 'react';
import { TrendingUp, ArrowRight, Landmark, Handshake, Building2 } from 'lucide-react';

export interface OrgItem {
    name: string;
    logo?: string;
}

interface ProjectImpactProps {
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

export default function ProjectImpact({ outputs, longTermOutcome, intermediateOutcomes = [], funders = [], partners = [] }: ProjectImpactProps) {
    const hasOutputsOrOutcomes = Boolean(outputs || longTermOutcome || intermediateOutcomes.length > 0);

    return (
        <div className="max-w-4xl space-y-8">
            {hasOutputsOrOutcomes && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-600" /> Outputs & Outcomes
                    </h3>

                    <div className="space-y-5">
                        {outputs && (
                            <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
                                <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 mb-2">Outputs</p>
                                <div className="p-prose" dangerouslySetInnerHTML={{ __html: outputs }} />
                            </div>
                        )}

                        {longTermOutcome && (
                            <div className="flex items-start gap-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl p-6">
                                <TrendingUp className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 mb-1.5">Long-term Outcome</p>
                                    <p className="text-base text-gray-800 leading-relaxed text-justify">{longTermOutcome}</p>
                                </div>
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
                </div>
            )}

            {funders.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <Landmark className="w-5 h-5 text-blue-600" /> Funder{funders.length > 1 ? 's' : ''}
                    </h3>
                    <OrgLogoRow items={funders} />
                </div>
            )}

            {partners.length > 0 && (
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <Handshake className="w-5 h-5 text-blue-600" /> Partners
                    </h3>
                    <OrgLogoRow items={partners} />
                </div>
            )}
        </div>
    );
}
