import React from 'react';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function Breadcrumb({ items, maxWidthClass = 'max-w-5xl' }: { items: BreadcrumbItem[]; maxWidthClass?: string }) {
    if (!items || items.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className={`${maxWidthClass} mx-auto px-6 pt-4`}>
            <ol className="flex items-center flex-wrap gap-x-1.5 gap-y-1 text-sm">
                {items.map((item, i) => {
                    const isLast = i === items.length - 1;
                    return (
                        <li key={i} className="flex items-center gap-1.5 min-w-0">
                            {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-300 shrink-0" />}
                            {item.href && !isLast ? (
                                <a
                                    href={item.href}
                                    className="text-gray-500 hover:text-[#021d49] transition-colors truncate max-w-[220px]"
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <span className="text-gray-900 font-medium truncate max-w-[280px]">{item.label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
