import React from 'react';
import { ArrowUpRight, Link2 } from 'lucide-react';
import SectionHeading from './SectionHeading';

interface RelatedInitiative {
    title: string;
    description?: string;
    url: string;
    image?: string;
}

interface RelatedInitiativesProps {
    items: RelatedInitiative[];
}

export default function RelatedInitiatives({ items }: RelatedInitiativesProps) {
    if (!items || items.length === 0) return null;

    return (
        <section className="bg-slate-50 border-y border-gray-100">
            <div className="max-w-6xl mx-auto px-6 py-12 sm:py-14">
                <SectionHeading eyebrow="Explore More" title="Related Initiatives" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {items.map((item, idx) => {
                        const external = /^https?:\/\//i.test(item.url);
                        return (
                            <a
                                key={idx}
                                href={item.url}
                                target={external ? '_blank' : undefined}
                                rel={external ? 'noopener noreferrer' : undefined}
                                className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                            >
                                {item.image ? (
                                    <div className="h-32 w-full overflow-hidden bg-gray-100">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <div className="h-32 w-full bg-linear-to-br from-[#021d49] to-blue-700 flex items-center justify-center">
                                        <Link2 className="w-8 h-8 text-white/70" />
                                    </div>
                                )}
                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="font-semibold text-gray-900 leading-snug mb-1.5">{item.title}</h3>
                                    {item.description && (
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">{item.description}</p>
                                    )}
                                    <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#021d49] group-hover:gap-2.5 transition-all">
                                        Visit <ArrowUpRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
