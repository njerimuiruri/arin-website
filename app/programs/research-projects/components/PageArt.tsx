import React from 'react';
import { RP } from './rp-ui';

type Variant = 'climate' | 'ai' | 'publishing';

// Faint decorative SVG motif for a page hero. Sits behind the content
// (absolute, pointer-events-none) so each page gets its own quiet artwork.
export default function PageArt({
    variant = 'climate',
    className = '',
}: {
    variant?: Variant;
    className?: string;
}) {
    return (
        <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
            <svg
                viewBox="0 0 400 400"
                className="absolute -right-16 -top-24 h-[520px] w-[520px] opacity-[0.06] sm:opacity-[0.08]"
                fill="none"
                stroke={RP.ink}
                strokeWidth="1.5"
            >
                {variant === 'climate' && <ClimateMotif />}
                {variant === 'ai' && <AiMotif />}
                {variant === 'publishing' && <PublishingMotif />}
            </svg>
        </div>
    );
}

export function motifVariantFor(name: string): Variant {
    if (/publish/i.test(name)) return 'publishing';
    if (/\bai\b|fellowship|machine|learning|analyt/i.test(name)) return 'ai';
    return 'climate';
}

// Faint watermark motif for the corner of a card.
export function CardArt({ variant = 'climate' }: { variant?: Variant }) {
    return (
        <svg
            aria-hidden
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 opacity-[0.05]"
            fill="none"
            stroke={RP.ink}
            strokeWidth="3"
        >
            {variant === 'climate' && <ClimateMotif />}
            {variant === 'ai' && <AiMotif />}
            {variant === 'publishing' && <PublishingMotif />}
        </svg>
    );
}

// A larger, framed version of the motif — used as the hero's side visual
// when a page has no cover image, so every page still has its own artwork.
export function HeroArtPanel({ variant = 'climate' }: { variant?: Variant }) {
    return (
        <div className="overflow-hidden rounded-3xl p-2.5" style={{ background: RP.tint }}>
            <div
                className="relative flex aspect-16/10 w-full items-center justify-center overflow-hidden rounded-2xl"
                style={{ background: '#ffffff' }}
            >
                <svg
                    viewBox="0 0 400 400"
                    className="h-[85%] w-[85%]"
                    fill="none"
                    stroke={RP.ink}
                    strokeWidth="2.25"
                    style={{ opacity: 0.32 }}
                >
                    {variant === 'climate' && <ClimateMotif />}
                    {variant === 'ai' && <AiMotif />}
                    {variant === 'publishing' && <PublishingMotif />}
                </svg>
            </div>
        </div>
    );
}

// Concentric isolines + scattered station dots — climate / mapping.
function ClimateMotif() {
    return (
        <g>
            {[40, 78, 116, 154, 192].map((r) => (
                <circle key={r} cx="200" cy="200" r={r} />
            ))}
            <path d="M60 250 Q150 180 240 250 T400 240" />
            <path d="M20 160 Q120 90 220 150 T400 130" />
            {[
                [120, 120],
                [270, 150],
                [180, 260],
                [300, 250],
                [90, 210],
                [230, 90],
            ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="4" fill={RP.ink} stroke="none" />
            ))}
        </g>
    );
}

// Node network — AI / machine learning.
function AiMotif() {
    const nodes: [number, number][] = [
        [70, 90],
        [70, 200],
        [70, 310],
        [200, 140],
        [200, 260],
        [330, 110],
        [330, 210],
        [330, 300],
    ];
    const edges: [number, number][] = [
        [0, 3],
        [1, 3],
        [1, 4],
        [2, 4],
        [3, 5],
        [3, 6],
        [4, 6],
        [4, 7],
    ];
    return (
        <g>
            {edges.map(([a, b], i) => (
                <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
            ))}
            {nodes.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="9" fill={RP.ink} stroke="none" />
            ))}
        </g>
    );
}

// Stacked pages / lines — publishing.
function PublishingMotif() {
    return (
        <g>
            {[0, 26, 52].map((dy) => (
                <rect key={dy} x={90 + dy} y={70 + dy} width="180" height="230" rx="14" />
            ))}
            {[120, 150, 180, 210, 240].map((y) => (
                <line key={y} x1="150" y1={y} x2="290" y2={y} />
            ))}
        </g>
    );
}
