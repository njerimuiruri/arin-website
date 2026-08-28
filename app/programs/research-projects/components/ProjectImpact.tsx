import React from 'react';
import { TrendingUp } from 'lucide-react';
import { RP, NumberedCards, AccentPanel } from './rp-ui';

interface ProjectImpactProps {
    outputs?: string;
    longTermOutcome?: string;
    intermediateOutcomes?: string[];
}

const stripTags = (h: string) => h.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

// Pull <li> items out of the outputs HTML; split "Title: rest" where present.
function parseOutputs(html: string): { title?: string; body: string }[] {
    if (!html) return [];
    const lis = html.match(/<li[^>]*>[\s\S]*?<\/li>/gi) || [];
    return lis
        .map((li) => stripTags(li))
        .filter(Boolean)
        .map((text) => {
            const m = text.match(/^([A-Z][^:]{2,60}):\s+([\s\S]+)$/);
            return m ? { title: m[1].trim(), body: m[2].trim() } : { body: text };
        });
}

export default function ProjectImpact({ outputs, longTermOutcome, intermediateOutcomes = [] }: ProjectImpactProps) {
    const outputItems = parseOutputs(outputs || '');

    return (
        <div className="space-y-10">
            {outputItems.length > 0 && (
                <div>
                    <h3 className="mb-6 text-2xl font-bold" style={{ color: RP.ink }}>
                        What the project produces
                    </h3>
                    <NumberedCards
                        columns={3}
                        items={outputItems.map((o) => ({ title: o.title, body: o.body }))}
                    />
                </div>
            )}

            {/* Fallback: no parseable list — render the raw HTML in a card. */}
            {outputItems.length === 0 && outputs && (
                <div className="overflow-hidden rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-9">
                    <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: RP.accentWord }}>
                        Outputs
                    </p>
                    <div className="p-prose" dangerouslySetInnerHTML={{ __html: outputs }} />
                </div>
            )}

            {longTermOutcome && (
                <AccentPanel eyebrow="Long-term Outcome" icon={<TrendingUp className="h-5 w-5" />}>
                    {longTermOutcome}
                </AccentPanel>
            )}

            {intermediateOutcomes.length > 0 && (
                <div>
                    <h3 className="mb-6 text-2xl font-bold" style={{ color: RP.ink }}>
                        Intermediate Outcomes
                    </h3>
                    <NumberedCards columns={2} items={intermediateOutcomes.map((o) => ({ body: o }))} />
                </div>
            )}
        </div>
    );
}
