import React from 'react';

export interface SectionNavItem {
    id: string;
    label: string;
    count?: number;
}

// Lightweight jump-nav replacing the old tab bar: every section is always
// rendered on the page (nothing hidden behind a click), this just scrolls
// to it. Plain anchors + the global `scroll-behavior: smooth` do the rest.
export default function SectionNav({ items }: { items: SectionNavItem[] }) {
    if (items.length <= 1) return null;

    return (
        <div className="sticky top-20 sm:top-24 lg:top-28 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-6 flex gap-6 overflow-x-auto">
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="shrink-0 py-3.5 text-sm font-semibold text-gray-500 hover:text-[#021d49] transition-colors inline-flex items-center gap-1.5"
                    >
                        {item.label}
                        {typeof item.count === 'number' && (
                            <span className="text-xs font-bold text-blue-600 bg-blue-50 rounded-full px-1.5 py-0.5 min-w-5 text-center">
                                {item.count}
                            </span>
                        )}
                    </a>
                ))}
            </div>
        </div>
    );
}
