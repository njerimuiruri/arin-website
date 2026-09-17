"use client";
import { FileText, Calendar, ArrowRight, User, Search } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Link from "next/link";
import { workingPaperSeriesService } from '@/services/workingPaperSeriesService';
import React, { useState, useEffect } from 'react';
import Footer from '@/app/footer/Footer';
import { API_CONFIG } from '@/lib/apiConfig';

// Strips HTML tags and decodes common entities (e.g. literal "&nbsp;" left over
// from pasted content) so card previews and search matching show clean text.
function toPlainText(html: string): string {
    if (!html) return '';
    return html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&nbsp;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/&lt;/gi, '<')
        .replace(/&gt;/gi, '>')
        .replace(/&quot;/gi, '"')
        .replace(/&#0?39;/gi, "'")
        .replace(/&rsquo;/gi, '’')
        .replace(/&lsquo;/gi, '‘')
        .replace(/&rdquo;/gi, '”')
        .replace(/&ldquo;/gi, '“')
        .replace(/&mdash;/gi, '—')
        .replace(/&ndash;/gi, '–')
        .replace(/\s+/g, ' ')
        .trim();
}

function PaperCard({ paper }: { paper: any }) {
    return (
        <Link
            href={`/press/working-papers/${String(paper._id)}`}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] group flex flex-col"
        >
            {paper.image ? (
                <div className="relative h-48 overflow-hidden bg-[#021d49]">
                    <img
                        src={paper.image.startsWith('http') ? paper.image : `${API_CONFIG.BASE_URL}${paper.image}`}
                        alt={paper.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-full shadow-lg">
                            {paper.category || 'Working Paper'}
                        </span>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#021d49]/10 text-[#021d49] text-xs font-bold uppercase tracking-wide">
                        <FileText className="w-3.5 h-3.5" /> {paper.category || 'Working Paper'}
                    </span>
                    {paper.datePosted && (
                        <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(paper.datePosted).toLocaleDateString()}
                        </span>
                    )}
                </div>
            )}
            <div className="p-6 flex flex-col grow">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-2 line-clamp-3">
                    {paper.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-3 text-sm text-gray-600">
                    {paper.authors && paper.authors.length > 0 && (
                        <span className="inline-flex items-center gap-1.5 min-w-0">
                            <User className="w-3.5 h-3.5 text-[#021d49] shrink-0" />
                            <span className="truncate">{paper.authors.join(', ')}</span>
                        </span>
                    )}
                    {paper.image && paper.datePosted && (
                        <span className="inline-flex items-center gap-1.5 text-gray-400 shrink-0">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(paper.datePosted).toLocaleDateString()}
                        </span>
                    )}
                </div>
                <p className="mb-4 grow text-sm text-gray-600 leading-relaxed line-clamp-5">
                    {paper.description ? toPlainText(paper.description) : <em>No description provided.</em>}
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 text-[#021d49] font-semibold text-sm group-hover:gap-2.5 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                </span>
            </div>
        </Link>
    );
}

export default function WorkingPapersPage() {
    const [papers, setPapers] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        workingPaperSeriesService.getAll()
            .then(setPapers)
            .catch(() => setPapers([]))
            .finally(() => setLoading(false));
    }, []);

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const filteredPapers = papers
        .filter(p => !p.datePosted || new Date(p.datePosted) <= today)
        .filter(p =>
            !searchTerm ||
            (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (Array.isArray(p.authors) ? p.authors.join(', ') : (p.authors || '')).toLowerCase().includes(searchTerm.toLowerCase()) ||
            toPlainText(p.description).toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const dateA = new Date(a.createdAt || a.datePosted || 0).getTime();
            const dateB = new Date(b.createdAt || b.datePosted || 0).getTime();
            return dateB - dateA;
        });

    // Categories present in the filtered set, "General" always last so
    // more specific groupings (e.g. "SDG") surface first.
    const categories = Array.from(new Set(filteredPapers.map(p => p.category || 'General')))
        .sort((a, b) => (a === 'General' ? 1 : 0) - (b === 'General' ? 1 : 0) || a.localeCompare(b));

    const visiblePapers = activeCategory === 'All'
        ? filteredPapers
        : filteredPapers.filter(p => (p.category || 'General') === activeCategory);

    const groupedByCategory = categories.map(category => ({
        category,
        items: filteredPapers.filter(p => (p.category || 'General') === category),
    }));

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Compact Dark Navy Hero Banner */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                    <div className="relative max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">Working Paper Series</h1>
                                <p className="text-sm text-blue-100 mt-1">Preliminary research findings and analyses on critical issues in climate adaptation and sustainable development</p>
                            </div>
                            <div className="w-full md:max-w-sm">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search working papers..."
                                            value={searchTerm}
                                            onChange={(e) => { setSearchTerm(e.target.value); }}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#021d49] focus:outline-none transition-all text-gray-800 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cards Grid */}
                <section className="max-w-7xl mx-auto px-6 py-8">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                            <div className="w-10 h-10 rounded-full border-4 border-[#021d49] border-t-transparent animate-spin" />
                            <p className="text-sm text-gray-500">Loading working papers…</p>
                        </div>
                    )}

                    {!loading && categories.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                            <button
                                type="button"
                                onClick={() => setActiveCategory('All')}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${activeCategory === 'All'
                                    ? 'bg-[#021d49] text-white border-[#021d49]'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#021d49] hover:text-[#021d49]'
                                    }`}
                            >
                                All ({filteredPapers.length})
                            </button>
                            {categories.map(category => {
                                const count = filteredPapers.filter(p => (p.category || 'General') === category).length;
                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setActiveCategory(category)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${activeCategory === category
                                            ? 'bg-[#021d49] text-white border-[#021d49]'
                                            : 'bg-white text-gray-600 border-gray-200 hover:border-[#021d49] hover:text-[#021d49]'
                                            }`}
                                    >
                                        {category} ({count})
                                    </button>
                                );
                            })}
                        </div>
                    )}

                    {!loading && activeCategory === 'All' ? (
                        groupedByCategory.map(({ category, items }) => (
                            items.length > 0 && (
                                <div key={category} className="mb-10">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        {category} Papers
                                        <span className="text-sm font-normal text-gray-400">({items.length})</span>
                                    </h2>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {items.map((paper: any) => (
                                            <PaperCard key={String(paper._id)} paper={paper} />
                                        ))}
                                    </div>
                                </div>
                            )
                        ))
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {visiblePapers.map((paper: any) => (
                                <PaperCard key={String(paper._id)} paper={paper} />
                            ))}
                        </div>
                    )}

                    {/* No Results Message */}
                    {!loading && visiblePapers.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Working Papers Found</h3>
                            <p className="text-gray-600">No working papers are available at this time.</p>
                        </div>
                    )}
                </section>

                {/* Why Explore Working Papers Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-linear-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Explore ARIN Working Papers?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <FileText className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Preliminary Research</h3>
                                <p className="text-gray-300 text-sm">Access early-stage research findings and emerging insights.</p>
                            </div>
                            <div className="text-center">
                                <User className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Expert Analysis</h3>
                                <p className="text-gray-300 text-sm">Benefit from in-depth analyses by ARIN researchers.</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Current Topics</h3>
                                <p className="text-gray-300 text-sm">Explore timely research on pressing development challenges.</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            ARIN's Working Paper Series provides preliminary research findings that contribute to policy dialogue and academic discourse on climate adaptation, sustainable agriculture, and development in Africa.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
