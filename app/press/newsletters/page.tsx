"use client";
import React, { useState, useEffect } from 'react';
import { Mail, Calendar, Search, ChevronLeft, ChevronRight, ArrowRight, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

const stripHtml = (html: string) => html ? html.replace(/<[^>]+>/g, '') : '';
const truncate = (text: string, chars: number) =>
    text.length > chars ? text.slice(0, chars).trimEnd() + '…' : text;

const NewslettersPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 6;
    const [newsletters, setNewsletters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        import('@/services/newslettersService').then(({ newslettersService }) => {
            newslettersService.getAll()
                .then((data: any[]) => { setNewsletters(data); setError(null); })
                .catch((err: any) => setError(err.message || 'Failed to fetch newsletters'))
                .finally(() => setLoading(false));
        });
    }, []);

    const categories = ['All', 'Quarterly', 'Research Updates', 'Network Updates', 'Special Edition'];
    const today = new Date(); today.setHours(23, 59, 59, 999);

    const filtered = newsletters.filter(n => {
        const s = searchTerm.toLowerCase();
        return (
            ((n.title || '').toLowerCase().includes(s) ||
                (n.description || '').toLowerCase().includes(s) ||
                (n.authors || []).join(' ').toLowerCase().includes(s)) &&
            (selectedCategory === 'All' || n.category === selectedCategory) &&
            (!n.datePosted || new Date(n.datePosted) <= today)
        );
    });

    const totalPages = Math.ceil(filtered.length / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
    const goTo = (id: string) => { window.location.href = `/press/newsletters/${id}`; };
    const goPage = (p: number) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#f5f4f0]">

                {/* ── Hero ── */}
                <section className="bg-[#021d49]">
                    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center gap-5">
                        <div className="flex-1">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">ARIN Newsletters</h1>
                            <p className="text-blue-200 text-sm mt-1 max-w-lg">
                                Stay connected with ARIN's latest research, insights, events, and network updates
                            </p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search newsletters..."
                                value={searchTerm}
                                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg text-sm text-gray-800 focus:outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* ── Filter bar ── */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide transition-all ${selectedCategory === cat
                                    ? 'bg-[#021d49] text-white'
                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── Content ── */}
                <div className="max-w-7xl mx-auto px-6 py-10">

                    {/* Loading */}
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                            <div className="w-8 h-8 rounded-full border-2 border-[#021d49] border-t-transparent animate-spin" />
                            <p className="text-sm text-gray-400">Loading newsletters…</p>
                        </div>
                    )}

                    {/* Error */}
                    {error && <p className="text-center text-red-500 text-sm py-16">{error}</p>}

                    {/* Empty */}
                    {!loading && !error && filtered.length === 0 && (
                        <div className="text-center py-20">
                            <Mail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No newsletters found</p>
                            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
                        </div>
                    )}

                    {/* Grid  no card borders, open layout */}
                    {!loading && !error && paginated.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {paginated.map(n => {
                                const img = n.image || n.coverImage || null;
                                const plain = truncate(stripHtml(n.description || ''), 160);
                                const date = n.datePosted
                                    ? new Date(n.datePosted).toLocaleDateString(undefined, {
                                        year: 'numeric', month: 'short', day: 'numeric',
                                    })
                                    : '';
                                return (
                                    <article
                                        key={n._id}
                                        onClick={() => goTo(n._id)}
                                        className="group cursor-pointer flex flex-col"
                                    >
                                        {/* Image  full visible, rounded, no overlay */}
                                        <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-4 bg-[#021d49] shrink-0">
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt={n.title || 'Newsletter'}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                                                    onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                                                />
                                            ) : null}

                                            {/* Fallback when no image */}
                                            {!img && (
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center"
                                                    style={{
                                                        backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0,rgba(255,255,255,.04) 1px,transparent 0,transparent 50%)",
                                                        backgroundSize: "28px 28px",
                                                    }}
                                                >
                                                    <Mail className="w-12 h-12 text-white/20" />
                                                </div>
                                            )}

                                            {/* Tiny badge */}
                                            <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-white/95 text-[#021d49] rounded-full shadow-sm">
                                                Newsletter
                                            </span>
                                        </div>

                                        {/* Meta row */}
                                        <div className="flex items-center gap-3 mb-2">
                                            {n.category && (
                                                <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#021d49] bg-[#021d49]/8 rounded-full">
                                                    {n.category}
                                                </span>
                                            )}
                                            {date && (
                                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                                    <Calendar className="w-3 h-3" /> {date}
                                                </span>
                                            )}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#021d49] leading-snug mb-2 transition-colors line-clamp-2">
                                            {n.title}
                                        </h3>

                                        {/* Authors */}
                                        {n.authors?.length > 0 && (
                                            <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                                                <User className="w-3 h-3" />
                                                <span className="line-clamp-1">{n.authors.join(', ')}</span>
                                            </div>
                                        )}

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 flex-grow">
                                            {plain}
                                        </p>

                                        {/* Link */}
                                        <button
                                            onClick={e => { e.stopPropagation(); goTo(n._id); }}
                                            className="mt-4 self-start flex items-center gap-1.5 text-sm font-semibold text-[#021d49] hover:gap-2.5 transition-all"
                                        >
                                            View Newsletter <ArrowRight className="w-4 h-4" />
                                        </button>

                                        {/* Divider */}
                                        <div className="mt-5 border-b border-gray-200" />
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-14 flex justify-center items-center gap-2">
                            <button
                                onClick={() => goPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#021d49] hover:enabled:text-white transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goPage(i + 1)}
                                    className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors ${currentPage === i + 1
                                        ? 'bg-[#021d49] text-white border-[#021d49]'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => goPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#021d49] hover:enabled:text-white transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewslettersPage;