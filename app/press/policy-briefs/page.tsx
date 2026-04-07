"use client";
import React, { useState, useEffect } from 'react';
import { policyBriefsService } from '@/services/policyBriefsService';
import { Calendar, Search, ChevronLeft, ChevronRight, ArrowRight, Lightbulb, FileText } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

const stripHtml = (html: string) => html ? html.replace(/<[^>]+>/g, '') : '';

const truncate = (text: string, words: number) => {
    const arr = text.trim().split(/\s+/);
    return arr.length > words ? arr.slice(0, words).join(' ') + '…' : text;
};

const PolicyBriefsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const briefsPerPage = 6;
    const [briefs, setBriefs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        policyBriefsService.getAll()
            .then(data => setBriefs([...data].sort((a, b) => {
                const da = a.datePosted ? new Date(a.datePosted).getTime() : 0;
                const db = b.datePosted ? new Date(b.datePosted).getTime() : 0;
                if (db !== da) return db - da;
                // fallback: newer MongoDB _id means later upload
                return (b._id || '').localeCompare(a._id || '');
            })))
            .catch(err => setError(err.message || 'Failed to load policy briefs'))
            .finally(() => setLoading(false));
    }, []);

    const categories = ['All', ...Array.from(new Set(briefs.map(b => b.category).filter(Boolean))) as string[]];

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filtered = briefs.filter(b => {
        const search = searchTerm.toLowerCase();
        const matchSearch = (b.title || '').toLowerCase().includes(search) || (b.excerpt || '').toLowerCase().includes(search);
        const matchCat = selectedCategory === 'All' || b.category === selectedCategory;
        const matchDate = !b.datePosted || new Date(b.datePosted) <= today;
        return matchSearch && matchCat && matchDate;
    });

    const totalPages = Math.ceil(filtered.length / briefsPerPage);
    const paginated = filtered.slice((currentPage - 1) * briefsPerPage, currentPage * briefsPerPage);

    const goToPage = (p: number) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    const goTo = (id: string) => { if (id) window.location.href = `/press/policy-briefs/${id}`; };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#f5f4f0]">

                {/* Hero */}
                <section className="bg-[#021d49]">
                    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row md:items-center gap-5">
                        <div className="flex-1">
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">Policy Briefs</h1>
                            <p className="text-blue-200 text-sm mt-1 max-w-lg">
                                Evidence-based policy recommendations and insights to inform decision-making across Africa
                            </p>
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search policy briefs..."
                                value={searchTerm}
                                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg text-sm text-gray-800 focus:outline-none"
                            />
                        </div>
                    </div>
                </section>

                {/* Filter bar */}
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

                {/* Grid */}
                <section className="max-w-7xl mx-auto px-6 py-10">

                    {loading && (
                        <div className="flex flex-col items-center justify-center py-24 gap-3">
                            <div className="w-8 h-8 rounded-full border-2 border-[#021d49] border-t-transparent animate-spin" />
                            <p className="text-sm text-gray-400">Loading…</p>
                        </div>
                    )}

                    {error && <p className="text-center text-red-500 py-16 text-sm">{error}</p>}

                    {!loading && !error && filtered.length === 0 && (
                        <div className="text-center py-20">
                            <Lightbulb className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 font-medium">No policy briefs found</p>
                            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter</p>
                        </div>
                    )}

                    {!loading && !error && paginated.length > 0 && (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
                            {paginated.map(brief => {
                                /*
                                 * Try every possible field name the API might use for the image.
                                 * Log it so we can confirm what's available.
                                 */
                                const img = brief.image || brief.coverImage || brief.cover_image || brief.thumbnail || null;
                                const plain = stripHtml(brief.description || brief.excerpt || '');
                                const snippet = truncate(plain, 20);
                                const date = brief.datePosted
                                    ? new Date(brief.datePosted).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
                                    : '';
                                const id = brief._id || brief.id;

                                return (
                                    <article
                                        key={id}
                                        onClick={() => goTo(id)}
                                        className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#021d49]/30 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                                    >
                                        {/* ── Image area ──
                                            Taller slot (h-56) so the photo has room to breathe.
                                            object-cover fills the space without cropping too aggressively.
                                            No overlay at all — image is 100% visible.
                                        */}
                                        <div className="relative h-56 w-full shrink-0 overflow-hidden">
                                            {img ? (
                                                <img
                                                    src={img}
                                                    alt={brief.title || 'Policy brief cover'}
                                                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                                    onError={e => {
                                                        // If image fails to load, hide it so fallback shows
                                                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                                                    }}
                                                />
                                            ) : null}

                                            {/* Fallback — only visible when there's no image */}
                                            {!img && (
                                                <div
                                                    className="absolute inset-0 flex items-center justify-center bg-[#021d49]"
                                                    style={{
                                                        backgroundImage: "repeating-linear-gradient(45deg,rgba(255,255,255,.04) 0,rgba(255,255,255,.04) 1px,transparent 0,transparent 50%)",
                                                        backgroundSize: "28px 28px",
                                                    }}
                                                >
                                                    <Lightbulb className="w-12 h-12 text-white/20" />
                                                </div>
                                            )}

                                            {/* Small badge — top-right corner only, minimal footprint */}
                                            <span className="absolute top-3 right-3 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-white/95 text-[#021d49] rounded-full shadow">
                                                Policy Brief
                                            </span>
                                        </div>

                                        {/* ── Card body ── */}
                                        <div className="flex flex-col flex-grow p-5">

                                            {/* Category chip */}
                                            {brief.category && (
                                                <span className="self-start mb-2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#021d49] bg-[#021d49]/8 rounded-full">
                                                    {brief.category}
                                                </span>
                                            )}

                                            {/* Title */}
                                            <h3 className="text-[15px] font-bold text-gray-900 group-hover:text-[#021d49] leading-snug mb-2 line-clamp-3 transition-colors">
                                                {brief.title}
                                            </h3>

                                            {/* Date */}
                                            {date && (
                                                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {date}
                                                </div>
                                            )}

                                            {/* Snippet */}
                                            <p className="text-sm text-gray-500 leading-relaxed flex-grow line-clamp-3">
                                                {snippet}
                                            </p>

                                            {/* CTA */}
                                            <button
                                                onClick={e => { e.stopPropagation(); goTo(id); }}
                                                className="mt-5 flex items-center justify-center gap-2 py-2.5 w-full bg-[#021d49] hover:bg-[#032a6b] text-white text-sm font-semibold rounded-xl transition-colors"
                                            >
                                                Read More <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#021d49] hover:enabled:text-white transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => goToPage(i + 1)}
                                    className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors ${currentPage === i + 1
                                        ? 'bg-[#021d49] text-white border-[#021d49]'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-gray-300 bg-white text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#021d49] hover:enabled:text-white transition-colors"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </section>

                {/* Why ARIN */}
                <section className="max-w-7xl mx-auto px-6 pb-16">
                    <div className="bg-[#021d49] rounded-2xl p-10 text-white">
                        <h2 className="text-2xl font-bold mb-8 text-center">Why Explore ARIN Policy Briefs?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            {[
                                { icon: <Lightbulb className="w-8 h-8 text-blue-300" />, title: "Evidence-Based Policy", body: "Access research-backed policy recommendations for decision-makers" },
                                { icon: <FileText className="w-8 h-8 text-blue-300" />, title: "Practical Insights", body: "Get actionable insights on complex policy challenges facing Africa" },
                                { icon: <Calendar className="w-8 h-8 text-blue-300" />, title: "Timely Analysis", body: "Stay informed on current policy debates and emerging issues" },
                            ].map(({ icon, title, body }) => (
                                <div key={title} className="text-center">
                                    <div className="flex justify-center mb-3">{icon}</div>
                                    <h3 className="text-base font-bold mb-1">{title}</h3>
                                    <p className="text-blue-200 text-sm leading-relaxed">{body}</p>
                                </div>
                            ))}
                        </div>
                        <p className="text-blue-200 text-sm text-center max-w-2xl mx-auto leading-relaxed">
                            ARIN's policy briefs translate cutting-edge research into clear, actionable recommendations that inform policy dialogue and drive positive change across the continent.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default PolicyBriefsPage;