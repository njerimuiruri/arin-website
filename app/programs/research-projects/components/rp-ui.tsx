"use client";
import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Minus, Plus } from 'lucide-react';

// ---------------------------------------------------------------------------
// Shared design system for the Research Project pages.
// Finovate-style layout patterns (eyebrow tags, two-tone headings, accordions,
// check pills, numbered process cards, solid colour panels, dark feature
// cards) on ARIN's navy + a lime accent. Every colour lives here so the whole
// section can be retinted from one place.
// ---------------------------------------------------------------------------
export const RP = {
    ink: '#021d49',        // ARIN navy — headings, dark panels, solid buttons
    inkSoft: '#5b6a86',    // muted body text
    accent: '#021d49',     // number circles / icon badges (navy, white content)
    accentText: '#ffffff', // text/content on the navy accent
    accentWord: '#3f6bab', // desaturated ARIN blue — two-tone heading word
    tint: '#f4f6fb',       // alternating section background
    line: '#e4e8f0',       // hairlines
};

type BandBg = 'white' | 'tint' | 'ink';

export function Band({
    id,
    bg = 'white',
    className = '',
    children,
}: {
    id?: string;
    bg?: BandBg;
    className?: string;
    children: React.ReactNode;
}) {
    // The whole page is white now; sections are separated by a hairline only.
    void bg;
    return (
        <section id={id} className={`scroll-mt-28 bg-white ${className}`}>
            <div className="mx-auto max-w-7xl border-b border-black/[0.07] px-6 py-9 last:border-b-0 sm:py-12">
                {children}
            </div>
        </section>
    );
}

export function Eyebrow({
    children,
    onDark = false,
}: {
    children: React.ReactNode;
    onDark?: boolean;
}) {
    return (
        <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{
                borderColor: onDark ? 'rgba(255,255,255,0.25)' : 'rgba(2,29,73,0.15)',
                color: onDark ? '#ffffff' : RP.ink,
            }}
        >
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: RP.accent }} />
            {children}
        </span>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    accentWord,
    subtitle,
    onDark = false,
    align = 'left',
    className = '',
}: {
    eyebrow?: string;
    title: string;
    accentWord?: string;
    subtitle?: string;
    onDark?: boolean;
    align?: 'left' | 'center';
    className?: string;
}) {
    return (
        <div
            className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}
        >
            {eyebrow && (
                <div className={`mb-5 ${align === 'center' ? 'flex justify-center' : ''}`}>
                    <Eyebrow onDark={onDark}>{eyebrow}</Eyebrow>
                </div>
            )}
            <h2
                className="text-3xl sm:text-4xl lg:text-[2.7rem] font-bold leading-[1.1] text-balance"
                style={{ color: onDark ? '#ffffff' : RP.ink }}
            >
                {title}
                {accentWord && (
                    <>
                        {' '}
                        <span style={{ color: onDark ? '#7fa8dd' : RP.accentWord }}>{accentWord}</span>
                    </>
                )}
            </h2>
            {subtitle && (
                <p
                    className="mt-4 text-base sm:text-lg leading-relaxed"
                    style={{ color: onDark ? 'rgba(255,255,255,0.75)' : RP.inkSoft }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export function PillButton({
    href,
    children,
    variant = 'solid',
    external = false,
    withArrow = true,
}: {
    href: string;
    children: React.ReactNode;
    variant?: 'solid' | 'outline' | 'light' | 'accent';
    external?: boolean;
    withArrow?: boolean;
}) {
    const base =
        'group inline-flex items-center gap-3 rounded-full text-sm font-semibold transition-colors';
    const styles: Record<string, { cls: string; style: React.CSSProperties; badge: string }> = {
        solid: {
            cls: `${base} pl-6 pr-2 py-2 text-white hover:opacity-90`,
            style: { background: RP.ink },
            badge: 'bg-white/15 group-hover:bg-white/25',
        },
        accent: {
            cls: `${base} pl-6 pr-2 py-2 text-white hover:opacity-90`,
            style: { background: RP.ink },
            badge: 'bg-white/15 group-hover:bg-white/25',
        },
        light: {
            cls: `${base} pl-6 pr-2 py-2 hover:bg-gray-50`,
            style: { background: '#fff', color: RP.ink, border: `1px solid ${RP.line}` },
            badge: 'bg-black/5 group-hover:bg-black/10',
        },
        outline: {
            cls: `${base} px-5 py-2.5 hover:bg-white/10`,
            style: { color: '#fff', border: '1px solid rgba(255,255,255,0.3)' },
            badge: '',
        },
    };
    const s = styles[variant];
    const Icon = external ? ArrowUpRight : ArrowRight;
    return (
        <a
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className={s.cls}
            style={s.style}
        >
            {children}
            {withArrow && variant !== 'outline' && (
                <span className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${s.badge}`}>
                    <Icon className="h-4 w-4" />
                </span>
            )}
            {withArrow && variant === 'outline' && <Icon className="h-4 w-4" />}
        </a>
    );
}

// Finovate accordion — one row open at a time, thin dividers, +/- toggle.
export function Accordion({
    items,
    defaultOpen = 0,
}: {
    items: { title: string; subtitle?: string; content: React.ReactNode }[];
    defaultOpen?: number | null;
}) {
    const [open, setOpen] = useState<number | null>(defaultOpen);
    return (
        <div>
            {items.map((it, i) => {
                const isOpen = open === i;
                return (
                    <div key={i} style={{ borderColor: RP.line }} className="border-t last:border-b">
                        <button
                            type="button"
                            onClick={() => setOpen(isOpen ? null : i)}
                            className="flex w-full items-center gap-4 py-5 text-left"
                            aria-expanded={isOpen}
                        >
                            <span className="flex-1 min-w-0">
                                <span className="block text-lg font-bold" style={{ color: RP.ink }}>
                                    {it.title}
                                </span>
                                {it.subtitle && (
                                    <span className="mt-0.5 block text-sm font-semibold" style={{ color: RP.accentWord }}>
                                        {it.subtitle}
                                    </span>
                                )}
                            </span>
                            <span
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors"
                                style={{ background: isOpen ? RP.ink : '#f1f2ee', color: isOpen ? '#fff' : RP.ink }}
                            >
                                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                            </span>
                        </button>
                        {isOpen && (
                            <div className="pb-6 pr-12 text-[15px] leading-relaxed" style={{ color: RP.inkSoft }}>
                                {it.content}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// Centered flowing pills with a lime check badge.
export function CheckPills({ items }: { items: string[] }) {
    if (!items?.length) return null;
    return (
        <div className="flex flex-wrap justify-center gap-3">
            {items.map((t, i) => (
                <span
                    key={i}
                    className="inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-5 text-sm font-semibold"
                    style={{ background: RP.tint, color: RP.ink }}
                >
                    <span
                        className="flex h-7 w-7 items-center justify-center rounded-full"
                        style={{ background: RP.ink }}
                    >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </span>
                    {t}
                </span>
            ))}
        </div>
    );
}

// Lime number circle on top, white card with content below (Finovate steps).
export function NumberedCards({
    items,
    columns = 3,
}: {
    items: { title?: string; body: React.ReactNode }[];
    columns?: 2 | 3 | 4;
}) {
    const col =
        columns === 4
            ? 'sm:grid-cols-2 lg:grid-cols-4'
            : columns === 2
            ? 'sm:grid-cols-2'
            : 'sm:grid-cols-2 lg:grid-cols-3';
    return (
        <div className={`grid ${col} gap-6`}>
            {items.map((it, i) => (
                <div key={i} className="relative rounded-3xl bg-white p-7 pt-9 shadow-sm ring-1 ring-black/5">
                    <span
                        className="absolute -top-5 left-7 flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold"
                        style={{ background: RP.accent, color: RP.accentText }}
                    >
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    {it.title && (
                        <h3 className="mb-2 text-lg font-bold" style={{ color: RP.ink }}>
                            {it.title}
                        </h3>
                    )}
                    <div className="text-sm leading-relaxed" style={{ color: RP.inkSoft }}>
                        {it.body}
                    </div>
                </div>
            ))}
        </div>
    );
}

// Big number tiles (Levels / Pass Mark / Certificates).
export function StatTiles({ items }: { items: { value: string; label: string }[] }) {
    if (!items?.length) return null;
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((s, i) => (
                <div key={i} className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-black/5">
                    <div className="text-3xl font-bold leading-none sm:text-4xl" style={{ color: RP.ink }}>
                        {s.value}
                    </div>
                    <div className="mt-2 text-[11px] font-bold uppercase tracking-wider" style={{ color: RP.inkSoft }}>
                        {s.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

// White callout card with a navy icon badge, left accent bar and a faint
// corner motif — used for the project goal.
export function AccentPanel({
    eyebrow,
    title,
    icon,
    children,
}: {
    eyebrow?: string;
    title?: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="relative overflow-hidden rounded-[1.75rem] bg-white p-7 shadow-sm ring-1 ring-black/[0.06] sm:p-9">
            <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: RP.ink }} />
            {/* faint corner motif */}
            <svg
                aria-hidden
                viewBox="0 0 200 200"
                className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 opacity-[0.06]"
                fill="none"
                stroke={RP.ink}
                strokeWidth="2"
            >
                <circle cx="100" cy="100" r="40" />
                <circle cx="100" cy="100" r="70" />
                <circle cx="100" cy="100" r="100" />
            </svg>
            <div className="relative pl-3">
                {icon && (
                    <div
                        className="mb-4 flex h-11 w-11 items-center justify-center rounded-full text-white"
                        style={{ background: RP.ink }}
                    >
                        {icon}
                    </div>
                )}
                {eyebrow && (
                    <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: RP.accentWord }}>
                        {eyebrow}
                    </p>
                )}
                {title && (
                    <h3 className="mb-3 text-xl font-bold sm:text-2xl" style={{ color: RP.ink }}>
                        {title}
                    </h3>
                )}
                <div className="max-w-2xl text-[15px] leading-relaxed sm:text-base" style={{ color: RP.inkSoft }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

// Dark green feature cards with lime icons (Finovate 4-up dark grid).
export function DarkCards({
    items,
    columns = 4,
}: {
    items: { icon?: React.ReactNode; title: string; body: React.ReactNode }[];
    columns?: 2 | 3 | 4;
}) {
    const col =
        columns === 4
            ? 'sm:grid-cols-2 lg:grid-cols-4'
            : columns === 3
            ? 'sm:grid-cols-2 lg:grid-cols-3'
            : 'sm:grid-cols-2';
    return (
        <div className={`grid ${col} gap-5`}>
            {items.map((it, i) => (
                <div
                    key={i}
                    className="flex h-full flex-col rounded-3xl p-7"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                    {it.icon && <div className="mb-5" style={{ color: '#7fa8dd' }}>{it.icon}</div>}
                    <h3 className="mb-2 text-lg font-bold text-white">{it.title}</h3>
                    <div className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {it.body}
                    </div>
                </div>
            ))}
        </div>
    );
}
