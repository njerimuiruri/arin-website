import React from 'react';
import { Award } from 'lucide-react';
import { RP, Accordion } from './rp-ui';

export interface LevelItem {
    name: string;
    subtitle?: string;
    description?: string;
    points?: string[];
    certificate?: string;
}

// Programme structure as a Finovate-style accordion — one tier open at a time.
export default function SubProjectLevels({ items }: { items: LevelItem[] }) {
    if (!items || items.length === 0) return null;

    return (
        <Accordion
            defaultOpen={0}
            items={items.map((level) => ({
                title: level.name,
                subtitle: level.subtitle,
                content: (
                    <div className="space-y-4 pt-1">
                        {level.description && <p>{level.description}</p>}
                        {level.points && level.points.length > 0 && (
                            <ul className="space-y-2">
                                {level.points.map((p, j) => (
                                    <li key={j} className="flex items-start gap-2.5">
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="mt-1 h-3.5 w-3.5 shrink-0"
                                            fill="none"
                                            stroke="#3f6bab"
                                            strokeWidth="3.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                        <span>{p}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {level.certificate && (
                            <div
                                className="inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold"
                                style={{ background: RP.tint, color: RP.ink }}
                            >
                                <Award className="h-4 w-4" style={{ color: '#3f6bab' }} />
                                {level.certificate}
                            </div>
                        )}
                    </div>
                ),
            }))}
        />
    );
}
