import React from 'react';
import { RP, NumberedCards } from './rp-ui';
import { splitSteps, titledList, TitledItem } from '@/lib/htmlSections';

const Html = ({ html, className = '' }: { html: string; className?: string }) => (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
);

function Lead({ html }: { html: string }) {
    if (!html) return null;
    return <Html html={html} className="mb-9 max-w-3xl space-y-4 text-base leading-relaxed text-[#5b6a86]" />;
}

function PlainCards({ items }: { items: TitledItem[] }) {
    return (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it, i) => (
                <div
                    key={i}
                    className="rounded-2xl border-t-[3px] bg-white p-6 shadow-sm ring-1 ring-black/5"
                    style={{ borderTopColor: RP.accentWord }}
                >
                    <h3 className="mb-2 text-base font-bold leading-snug" style={{ color: RP.ink }}>
                        {it.title}
                    </h3>
                    <Html html={it.html} className="text-sm leading-relaxed text-[#5b6a86]" />
                </div>
            ))}
        </div>
    );
}

// <h3> sub-headings become a vertical timeline (phases, stages, steps).
function Timeline({ steps }: { steps: { title: string; html: string }[] }) {
    return (
        <ol className="relative ml-5 mt-9 space-y-10 border-l-2" style={{ borderColor: RP.line }}>
            {steps.map((s, i) => {
                const list = titledList(s.html);
                return (
                    <li key={i} className="relative pl-9 sm:pl-10">
                        <span
                            className="absolute -left-[21px] -top-1.5 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ring-4 ring-white"
                            style={{ background: RP.ink }}
                            aria-hidden
                        >
                            {i + 1}
                        </span>
                        <h3 className="text-lg font-bold leading-snug" style={{ color: RP.ink }}>
                            {s.title}
                        </h3>
                        <Html
                            html={list ? list.before : s.html}
                            className="mt-2 max-w-3xl space-y-3 text-[15px] leading-relaxed text-[#5b6a86]"
                        />
                        {list && (
                            <div className="mt-5 space-y-3">
                                {list.items.map((it, j) => (
                                    <div
                                        key={j}
                                        className="grid gap-1.5 rounded-2xl p-5 sm:grid-cols-[180px_1fr] sm:gap-6"
                                        style={{ background: RP.tint }}
                                    >
                                        <p className="text-sm font-bold" style={{ color: RP.ink }}>
                                            {it.title}
                                        </p>
                                        <Html html={it.html} className="text-sm leading-relaxed text-[#5b6a86]" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </li>
                );
            })}
        </ol>
    );
}

// Renders one <h2> section of a project description, picking a layout from
// how the copy is structured: sub-headings → timeline, "Title: text" lists →
// cards, anything else → prose. The wording is never changed.
export default function DescriptionSection({ html }: { html: string }) {
    const { before, parts } = splitSteps(html);
    if (parts.length >= 2) {
        return (
            <>
                <Lead html={before} />
                <Timeline steps={parts} />
            </>
        );
    }

    const list = titledList(html);
    if (list) {
        return (
            <>
                <Lead html={list.before} />
                {list.ordered ? (
                    <NumberedCards
                        columns={2}
                        items={list.items.map((it) => ({ title: it.title, body: <Html html={it.html} /> }))}
                    />
                ) : (
                    <PlainCards items={list.items} />
                )}
            </>
        );
    }

    return <Html html={html} className="p-prose max-w-3xl" />;
}
