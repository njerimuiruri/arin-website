import React from 'react';
import { ArrowLeft, ArrowRight, Calendar, FileDown, Layers, Tag } from 'lucide-react';

interface ProjectHeroProps {
    title: string;
    category?: string;
    dateLabel?: string;
    excerpt?: string;
    coverImageUrl?: string;
    hasResources: boolean;
    hasThemes: boolean;
}

export default function ProjectHero({ title, category, dateLabel, excerpt, coverImageUrl, hasResources, hasThemes }: ProjectHeroProps) {
    return (
        <section className="bg-white border-b border-gray-100">
            <div className="max-w-5xl mx-auto px-6 pt-4">
                <a
                    href="/programs/research-projects"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#021d49] transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Research Projects
                </a>
            </div>

            <div className="max-w-5xl mx-auto px-6 pt-4 pb-6 sm:pt-5 sm:pb-7">
                <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    <div className="flex-1 min-w-0">
                        {category && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase bg-blue-50 border border-blue-100 text-[#021d49] mb-3">
                                <Tag className="w-3 h-3" /> {category}
                            </span>
                        )}
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900 text-balance mb-3">
                            {title}
                        </h1>
                        {dateLabel && (
                            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                                <Calendar className="w-4 h-4" /> {dateLabel}
                            </div>
                        )}
                        {excerpt && (
                            <p className="text-base text-gray-600 leading-relaxed max-w-2xl mb-5 text-justify">{excerpt}</p>
                        )}
                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href="#overview"
                                className="px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-xl shadow-sm hover:bg-[#032d6b] transition-colors inline-flex items-center gap-2"
                            >
                                Learn More <ArrowRight className="w-4 h-4" />
                            </a>
                            {hasThemes && (
                                <a
                                    href="#themes"
                                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                                >
                                    <Layers className="w-4 h-4" /> View Themes
                                </a>
                            )}
                            {hasResources && (
                                <a
                                    href="#resources"
                                    className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                                >
                                    <FileDown className="w-4 h-4" /> View Resources
                                </a>
                            )}
                        </div>
                    </div>

                    {coverImageUrl && (
                        <div className="w-40 sm:w-56 lg:w-60 shrink-0 mx-auto lg:mx-0">
                            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-50 shadow-sm border border-gray-100 p-2">
                                <img src={coverImageUrl} alt="" className="w-full h-full object-contain" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
