import React from 'react';

export interface AbstractItem {
    name: string;
    title?: string;
    photo?: string;
    body: string;
    group?: string;
}

export type IndexedAbstractItem = AbstractItem & { _index: number };

interface AbstractsSectionProps {
    projectId: string;
    items: IndexedAbstractItem[];
}

const fallback = (name: string) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=021d49&color=ffffff&size=200`;

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

function AbstractCard({ item, href }: { item: AbstractItem; href: string }) {
    return (
        <a
            href={href}
            className="group flex flex-col h-full text-left bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
        >
            <div className="p-5 flex items-center gap-4 border-b border-gray-50">
                <img
                    src={item.photo || fallback(item.name)}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover shrink-0 bg-slate-100"
                />
                <div className="min-w-0">
                    <p className="font-semibold text-gray-900 leading-snug truncate">{item.name}</p>
                    {item.title && <p className="text-xs text-gray-500 truncate">{item.title}</p>}
                </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4 flex-1">
                    {stripHtml(item.body)}
                </p>
                <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#021d49] group-hover:gap-2.5 transition-all">
                    Read Full Abstract
                </div>
            </div>
        </a>
    );
}

// Card grid with no intro copy. Reused by both the general Abstracts tab and
// each theme's own tab (ThemeSection). Each card links to a full detail page
// rather than opening a modal, using the abstract's stable index in the
// project's abstracts array (abstracts have no _id of their own).
export function AbstractsGrid({ projectId, items }: AbstractsSectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item) => (
                <AbstractCard
                    key={item._index}
                    item={item}
                    href={`/programs/research-projects/${projectId}/abstracts/${item._index}`}
                />
            ))}
        </div>
    );
}

export default function AbstractsSection({ projectId, items }: AbstractsSectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <div>
            <p className="text-sm text-gray-500 mb-8 max-w-2xl">
                Student and researcher abstracts submitted in connection with this project. Click a card to read the full abstract.
            </p>
            <AbstractsGrid projectId={projectId} items={items} />
        </div>
    );
}
