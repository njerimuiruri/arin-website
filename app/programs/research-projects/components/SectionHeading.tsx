import React from 'react';

interface SectionHeadingProps {
    eyebrow: string;
    title: string;
    description?: string;
    align?: 'left' | 'center';
}

export default function SectionHeading({ eyebrow, title, description, align = 'left' }: SectionHeadingProps) {
    const isCenter = align === 'center';
    return (
        <div className={`mb-10 ${isCenter ? 'text-center max-w-2xl mx-auto' : ''}`}>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-600">{eyebrow}</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{title}</h2>
            {description && <p className="text-gray-500 mt-3 leading-relaxed">{description}</p>}
        </div>
    );
}
