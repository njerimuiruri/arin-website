"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, Users } from 'lucide-react';
import { RP } from './rp-ui';
import { excerptOf } from '@/lib/htmlSections';

export interface NewsBriefSummary {
    _id: string;
    title: string;
    description?: string;
    authors?: string[];
}

const INITIAL = 6;

function byline(authors: string[] = []) {
    if (authors.length <= 3) return authors.join(', ');
    return `${authors.slice(0, 2).join(', ')} and ${authors.length - 2} others`;
}

export default function ProjectNewsBriefs({ items }: { items: NewsBriefSummary[] }) {
    const [showAll, setShowAll] = useState(false);
    const visible = showAll ? items : items.slice(0, INITIAL);

    return (
        <div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visible.map((b) => (
                        <Link
                            key={b._id}
                            href={`/press/news-briefs/${b._id}`}
                            className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:shadow-lg"
                        >
                            <span aria-hidden className="h-1 w-full" style={{ background: RP.accentWord }} />
                            <div className="flex flex-1 flex-col p-6">
                                <h3
                                    className="text-[17px] font-bold leading-snug group-hover:underline"
                                    style={{ color: RP.ink }}
                                >
                                    {b.title}
                                </h3>
                                {b.authors && b.authors.length > 0 && (
                                    <p
                                        className="mt-2.5 flex items-start gap-2 text-[13px] font-medium"
                                        style={{ color: RP.accentWord }}
                                    >
                                        <Users className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {byline(b.authors)}
                                    </p>
                                )}
                                <p className="mt-3 text-sm leading-relaxed line-clamp-3" style={{ color: RP.inkSoft }}>
                                    {excerptOf(b.description)}
                                </p>
                                <span
                                    className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-bold transition-all group-hover:gap-2.5"
                                    style={{ color: RP.ink }}
                                >
                                    Read the brief <ArrowRight className="h-4 w-4" />
                                </span>
                            </div>
                        </Link>
                ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                {items.length > INITIAL && !showAll && (
                    <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                        style={{ background: RP.ink }}
                    >
                        Show all {items.length} briefs <ChevronDown className="h-4 w-4" />
                    </button>
                )}
                <Link
                    href="/press/news-briefs"
                    className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold hover:bg-gray-50"
                    style={{ borderColor: RP.line, color: RP.ink }}
                >
                    All ARIN news briefs <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}
