import React from 'react';
import { ArrowRight, Flag } from 'lucide-react';
import { RP, NumberedCards, AccentPanel, CheckPills } from './rp-ui';

interface ThemeLink {
    _id: string;
    name: string;
    subtitle?: string;
    overview?: string;
}

interface ProjectOverviewProps {
    description: string;
    goal?: string;
    objectives?: string[];
    focusAreas?: string[];
    projectId?: string;
    themes?: ThemeLink[];
}

const stripTags = (h: string) => h.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

// Split the description HTML into individual paragraph inner-HTML strings.
function toParagraphs(html: string): string[] {
    if (!html) return [];
    const matches = html.match(/<p[^>]*>[\s\S]*?<\/p>/gi) || [];
    return matches
        .map((m) => m.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '').trim())
        .filter((t) => stripTags(t).length > 0);
}

// Split a description's HTML on its own <h2>/<h3>/<h4> headings into
// {title, html} chunks so a long wall of text can render as section cards.
function splitIntoSections(html: string): { title: string | null; html: string }[] {
    const parts = html.split(/(<h[2-4][^>]*>[\s\S]*?<\/h[2-4]>)/i);
    const out: { title: string | null; html: string }[] = [];
    let pending: { title: string | null; html: string } | null = null;
    for (const seg of parts) {
        if (!seg || !seg.trim()) continue;
        const hm = seg.match(/^<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>$/i);
        if (hm) {
            if (pending) out.push(pending);
            pending = { title: stripTags(hm[1]) || null, html: '' };
        } else if (pending) {
            pending.html += seg;
        } else {
            out.push({ title: null, html: seg });
        }
    }
    if (pending) out.push(pending);
    return out.filter((s) => s.title || stripTags(s.html).length > 0);
}

// Renders a long, structured-only description: a lead paragraph, then the
// rest either as section cards (if it has its own headings) or as a
// two-column prose flow. Never changes the wording.
function LongDescription({ html }: { html: string }) {
    const firstP = (html.match(/<p[^>]*>[\s\S]*?<\/p>/i) || [])[0] || '';
    const lead = firstP.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '').trim();
    const rest = firstP ? html.replace(firstP, '') : html;
    const hasHeadings = /<h[2-4][\s>]/i.test(rest);
    const sections = hasHeadings ? splitIntoSections(rest) : [];

    return (
        <div className="space-y-8">
            {lead && (
                <p
                    className="max-w-3xl text-lg leading-relaxed sm:text-xl"
                    style={{ color: '#2f3d57' }}
                    dangerouslySetInnerHTML={{ __html: lead }}
                />
            )}

            {hasHeadings ? (
                <div className="grid gap-5 md:grid-cols-2">
                    {sections.map((s, i) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-white p-6 ring-1 ring-black/[0.07] sm:p-7"
                        >
                            {s.title && (
                                <h3 className="mb-3 text-base font-bold" style={{ color: RP.ink }}>
                                    {s.title}
                                </h3>
                            )}
                            <div
                                className="p-prose max-w-none text-[14px] leading-relaxed [&_img]:my-3 [&_img]:w-full [&_img]:rounded-lg"
                                style={{ color: RP.inkSoft }}
                                dangerouslySetInnerHTML={{ __html: s.html }}
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="p-prose max-w-none text-[15px] leading-relaxed md:columns-2 md:gap-12 [&>*]:break-inside-avoid [&_img]:my-3 [&_img]:w-full [&_img]:rounded-xl [&_li]:break-inside-avoid [&_p]:break-inside-avoid"
                    style={{ color: RP.inkSoft }}
                    dangerouslySetInnerHTML={{ __html: rest }}
                />
            )}
        </div>
    );
}

// Pull "The first phase, X, will …." style steps out of a paragraph.
function extractPhases(paraHtml: string) {
    const text = stripTags(paraHtml);
    const re =
        /(?:first|second|third|fourth|fifth|sixth)\s+phase,?\s*([A-Za-z][A-Za-z\s-]+?)[,.]\s*(will[^.]*\.)/gi;
    const steps: { name: string; text: string }[] = [];
    let m: RegExpExecArray | null;
    while ((m = re.exec(text)) !== null) {
        steps.push({ name: m[1].trim().replace(/\s+/g, ' '), text: m[2].trim() });
    }
    const outlook = text.match(/(By the end of the project[\s\S]*?\.)\s*$/i);
    return { steps, outlook: outlook ? outlook[1].trim() : '' };
}

function ProgrammesRail({ themes, projectId }: { themes: ThemeLink[]; projectId?: string }) {
    return (
        <div className="rounded-3xl p-5 lg:sticky lg:top-28" style={{ background: RP.tint }}>
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: RP.inkSoft }}>
                Two programmes run under this project
            </p>
            <div className="space-y-3">
                {themes.map((t, i) => (
                    <a
                        key={t._id}
                        href={`/programs/research-projects/${projectId}/themes/${t._id}`}
                        className="group block rounded-2xl bg-white p-4 ring-1 ring-black/5 transition hover:shadow-md"
                    >
                        <div className="flex items-start gap-3">
                            <span
                                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                                style={{ background: RP.ink }}
                            >
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="min-w-0 flex-1">
                                {t.subtitle && (
                                    <span
                                        className="block text-[10px] font-bold uppercase tracking-wide"
                                        style={{ color: RP.accentWord }}
                                    >
                                        {t.subtitle}
                                    </span>
                                )}
                                <span className="block text-[15px] font-bold leading-snug" style={{ color: RP.ink }}>
                                    {t.name}
                                </span>
                            </span>
                        </div>
                        {t.overview && (
                            <p className="mt-2.5 text-xs leading-relaxed line-clamp-3" style={{ color: RP.inkSoft }}>
                                {t.overview}
                            </p>
                        )}
                        <span
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold transition-all group-hover:gap-2.5"
                            style={{ color: RP.ink }}
                        >
                            Open programme <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default function ProjectOverview({
    description,
    goal,
    objectives = [],
    focusAreas = [],
    projectId,
    themes = [],
}: ProjectOverviewProps) {
    const paras = toParagraphs(description);
    const lead = paras[0] || (description ? stripTags(description) : '');
    const rest = paras.slice(1);

    const phaseIdx = rest.findIndex(
        (p) => /\bphase\b/i.test(stripTags(p)) && /\bfirst\b|1st/i.test(stripTags(p)),
    );
    let steps: { name: string; text: string }[] = [];
    let outlook = '';
    let bodyParas = rest;
    if (phaseIdx >= 0) {
        const ex = extractPhases(rest[phaseIdx]);
        if (ex.steps.length >= 2) {
            steps = ex.steps;
            outlook = ex.outlook;
            bodyParas = rest.filter((_, i) => i !== phaseIdx);
        }
    }

    const hasRail = themes.length > 0;

    // Projects with no goal / objectives / focus / programmes / phase steps are
    // just a long description — chunk it into cards / columns so it reads well.
    const isDescriptionOnly =
        !hasRail &&
        steps.length === 0 &&
        !goal &&
        objectives.length === 0 &&
        focusAreas.length === 0 &&
        stripTags(description).length > 900;

    if (isDescriptionOnly) {
        return (
            <div className="space-y-10">
                <LongDescription html={description} />
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className={hasRail ? 'grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-14' : ''}>
                <div className="space-y-5">
                    {lead && (
                        <p
                            className="text-lg leading-relaxed sm:text-xl"
                            style={{ color: '#2f3d57' }}
                            dangerouslySetInnerHTML={{ __html: lead }}
                        />
                    )}
                    {bodyParas.map((p, i) => (
                        <p
                            key={i}
                            className="text-[15px] leading-relaxed"
                            style={{ color: RP.inkSoft }}
                            dangerouslySetInnerHTML={{ __html: p }}
                        />
                    ))}
                </div>

                {hasRail && <ProgrammesRail themes={themes} projectId={projectId} />}
            </div>

            {steps.length > 0 && (
                <div>
                    <h3 className="mb-6 text-2xl font-bold" style={{ color: RP.ink }}>
                        How the project works
                    </h3>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((s, i) => (
                            <div key={i} className="relative rounded-3xl bg-white p-6 pt-8 shadow-sm ring-1 ring-black/5">
                                <span
                                    className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                                    style={{ background: RP.ink }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h4 className="text-base font-bold" style={{ color: RP.ink }}>
                                    {s.name}
                                </h4>
                                <p className="mt-1.5 text-[13px] leading-relaxed" style={{ color: RP.inkSoft }}>
                                    {s.text}
                                </p>
                            </div>
                        ))}
                    </div>
                    {outlook && (
                        <div
                            className="mt-6 rounded-2xl border-l-4 p-5 text-sm leading-relaxed"
                            style={{ borderColor: RP.accentWord, background: RP.tint, color: RP.ink }}
                        >
                            {outlook}
                        </div>
                    )}
                </div>
            )}

            {goal && (
                <AccentPanel eyebrow="The goal" icon={<Flag className="h-5 w-5" />}>
                    {goal}
                </AccentPanel>
            )}

            {objectives.length > 0 && (
                <div>
                    <h3 className="mb-6 text-2xl font-bold" style={{ color: RP.ink }}>
                        Objectives
                    </h3>
                    <NumberedCards columns={3} items={objectives.map((o) => ({ body: o }))} />
                </div>
            )}

            {focusAreas.length > 0 && (
                <div>
                    <h3
                        className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.18em]"
                        style={{ color: RP.inkSoft }}
                    >
                        Key Focus Areas
                    </h3>
                    <CheckPills items={focusAreas} />
                </div>
            )}
        </div>
    );
}
