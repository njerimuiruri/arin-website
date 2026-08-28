"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ExpandableSectionProps {
    label?: string;
    html: string;
}

export default function ExpandableSection({ label = 'View More Details', html }: ExpandableSectionProps) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-3 px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
                aria-expanded={open}
            >
                {label}
                <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
                <div className="px-6 pb-6 pt-1 border-t border-gray-100">
                    <div className="p-prose text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
                </div>
            )}
        </div>
    );
}
