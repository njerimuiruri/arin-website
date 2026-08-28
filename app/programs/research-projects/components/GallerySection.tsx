import React from 'react';

interface GalleryItem {
    url: string;
    caption?: string;
}

interface GallerySectionProps {
    items: GalleryItem[];
}

export default function GallerySection({ items }: GallerySectionProps) {
    if (!items || items.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="group relative aspect-4/3 rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-gray-100"
                >
                    <img
                        src={item.url}
                        alt={item.caption || 'Project photo'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <p className="text-white text-xs font-medium leading-snug">{item.caption}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
