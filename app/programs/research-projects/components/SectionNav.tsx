"use client";
import React, { useEffect, useState } from 'react';

export interface SectionNavItem {
    id: string;
    label: string;
    count?: number;
}

// Sticky jump-nav: every section is always rendered on the page (nothing
// hidden behind a click), this just scrolls to it. Plain anchors + the
// global `scroll-behavior: smooth` do the scrolling; an IntersectionObserver
// tracks which section is currently in view so the matching link can be
// highlighted, the way a tab bar would be — without turning the page into
// actual tab panels (everything stays scrollable and indexable).
export default function SectionNav({ items, maxWidthClass = 'max-w-6xl' }: { items: SectionNavItem[]; maxWidthClass?: string }) {
    const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

    useEffect(() => {
        const elements = items
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => Boolean(el));

        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: '-140px 0px -65% 0px', threshold: 0 }
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [items.map((i) => i.id).join(',')]);

    if (items.length <= 1) return null;

    return (
        <div className="sticky top-20 sm:top-24 lg:top-28 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className={`${maxWidthClass} mx-auto px-6 flex gap-6 overflow-x-auto`}>
                {items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`relative shrink-0 py-3.5 text-sm font-semibold transition-colors inline-flex items-center gap-1.5 ${
                                isActive ? 'text-[#021d49]' : 'text-gray-500 hover:text-[#021d49]'
                            }`}
                        >
                            {item.label}
                            {typeof item.count === 'number' && (
                                <span
                                    className={`text-xs font-bold rounded-full px-1.5 py-0.5 min-w-5 text-center ${
                                        isActive ? 'text-white bg-[#021d49]' : 'text-blue-600 bg-blue-50'
                                    }`}
                                >
                                    {item.count}
                                </span>
                            )}
                            <span
                                className={`absolute left-0 right-0 -bottom-px h-0.5 rounded-full bg-[#021d49] transition-opacity ${
                                    isActive ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
