'use client';
import React, { useEffect, useRef, useState } from 'react';

export interface TabDef {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface ProjectTabsProps {
    aboutContent: React.ReactNode;
    themeTabs?: TabDef[];
    resourcesContent: React.ReactNode | null;
    abstractsContent: React.ReactNode | null;
    galleryContent: React.ReactNode | null;
}

// Hero CTAs link to #about / #resources; since only the active tab panel is
// rendered, plain anchor-jump can't reach a hidden tab — so intercept clicks
// on those hashes and drive the tab switch + scroll manually instead.
const HASH_TO_TAB: Record<string, string> = {
    '#about': 'overview',
    '#resources': 'resources',
};

export default function ProjectTabs({ aboutContent, themeTabs = [], resourcesContent, abstractsContent, galleryContent }: ProjectTabsProps) {
    const [activeTab, setActiveTab] = useState('overview');
    const containerRef = useRef<HTMLDivElement>(null);

    const tabs: TabDef[] = [
        { id: 'overview', label: 'Overview', content: aboutContent },
        ...themeTabs,
        ...(resourcesContent ? [{ id: 'resources', label: 'Resources', content: resourcesContent }] : []),
        ...(abstractsContent ? [{ id: 'abstracts', label: 'Abstracts', content: abstractsContent }] : []),
        ...(galleryContent ? [{ id: 'gallery', label: 'Gallery', content: galleryContent }] : []),
    ];

    useEffect(() => {
        const goToHash = (hash: string) => {
            const tabId = HASH_TO_TAB[hash];
            if (!tabId) return;
            setActiveTab(tabId);
            containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        const onClick = (e: MouseEvent) => {
            const anchor = (e.target as HTMLElement).closest('a[href="#about"], a[href="#resources"]');
            if (!anchor) return;
            e.preventDefault();
            goToHash(anchor.getAttribute('href') || '');
        };

        document.addEventListener('click', onClick);
        if (window.location.hash) goToHash(window.location.hash);

        return () => document.removeEventListener('click', onClick);
    }, []);

    const active = tabs.find((t) => t.id === activeTab) ?? tabs[0];

    return (
        <div id="project-tabs" ref={containerRef} className="scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-28">
            <div className="sticky top-20 sm:top-24 lg:top-28 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 flex gap-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={`shrink-0 py-4 text-sm font-semibold border-b-2 transition-colors ${
                                tab.id === active.id
                                    ? 'border-blue-600 text-[#021d49]'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8 sm:py-10">{active.content}</div>
        </div>
    );
}
