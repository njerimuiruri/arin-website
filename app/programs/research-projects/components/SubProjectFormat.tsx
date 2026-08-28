import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { RP } from './rp-ui';

export interface FormatItem {
    title: string;
    description?: string;
}

export default function SubProjectFormat({ items }: { items: FormatItem[] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, i) => (
                <div key={i} className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5">
                    <div
                        className="mb-4 flex h-11 w-11 items-center justify-center rounded-full"
                        style={{ background: RP.tint, color: RP.ink }}
                    >
                        <LayoutGrid className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1.5 font-bold leading-snug" style={{ color: RP.ink }}>
                        {item.title}
                    </h3>
                    {item.description && (
                        <p className="text-sm leading-relaxed" style={{ color: RP.inkSoft }}>
                            {item.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
