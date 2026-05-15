"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getJournalArticle } from "@/services/journalArticlesService";
import { ArrowLeft, Calendar, Users, Download, FileText, BookOpen, X, ZoomIn, Eye } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import { API_CONFIG } from '@/lib/apiConfig';

interface JournalArticle {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    authors?: string[];
    date?: string;
    datePosted?: string;
    coverImage?: string;
    resources?: string[];
    availableResources?: string[];
    year?: number;
}

export default function JournalArticleDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [article, setArticle] = useState<JournalArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        getJournalArticle(id)
            .then(data => { setArticle(data); setError(null); })
            .catch(err => setError(err instanceof Error ? err.message : "Failed to load article"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading article...</p>
                </div>
            </div>
        </>
    );

    if (error || !article) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{error ? "Error" : "Article Not Found"}</h2>
                    <p className="text-gray-500 text-sm mb-6">{error || "The article you're looking for doesn't exist."}</p>
                    <Link href="/press/journal-articles" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-lg hover:bg-[#032a5e] transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Articles
                    </Link>
                </div>
            </div>
        </>
    );

    const authorsDisplay = article.authors && article.authors.length > 0 ? article.authors.join(", ") : "Unknown Author";
    const rawDate = article.date || article.datePosted;
    const dateDisplay = rawDate ? new Date(rawDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    const coverImageUrl = article.coverImage?.startsWith('http') ? article.coverImage : article.coverImage ? `${API_CONFIG.BASE_URL}${article.coverImage}` : '';
    const resourceList = (article.resources || article.availableResources || []).filter((u): u is string => typeof u === 'string' && u.trim().length > 0);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* Image Modal */}
                {imageModalOpen && coverImageUrl && (
                    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setImageModalOpen(false)}>
                        <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setImageModalOpen(false)} className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                            <img src={coverImageUrl} alt={article.title} className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" />
                            <p className="text-white/60 text-xs text-center mt-3">Click outside to close</p>
                        </div>
                    </div>
                )}

                {/* Compact Hero Banner */}
                <div className="bg-[#021d49] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
                        {coverImageUrl && (
                            <button onClick={() => setImageModalOpen(true)} className="shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/60 transition-colors relative group" title="View full-size">
                                <img src={coverImageUrl} alt={article.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )}
                        <div className="flex-1 min-w-0">
                            <Link href="/press/journal-articles" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-2 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> All Journal Articles
                            </Link>
                            <h1 className="text-lg md:text-2xl font-bold leading-snug mb-2 line-clamp-2">{article.title}</h1>
                            <div className="flex flex-wrap gap-3 text-xs text-white/70">
                                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{authorsDisplay}</span>
                                {dateDisplay && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{dateDisplay}</span>}
                                {article.year && <span className="text-white/60">· {article.year}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-4 gap-8 items-start">

                        {/* Main content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
                                    <div className="bg-[#021d49]/10 p-2.5 rounded-lg">
                                        <BookOpen className="w-5 h-5 text-[#021d49]" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Article Content</h2>
                                </div>
                                <div className="prose prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-headings:text-gray-900 prose-a:text-[#021d49] prose-img:rounded-xl"
                                    dangerouslySetInnerHTML={{ __html: article.description }} />
                            </div>

                            {/* Resources below description */}
                            {resourceList.length > 0 && (
                                <div id="resources" className="bg-linear-to-br from-[#021d49]/5 to-blue-50 rounded-2xl border border-gray-200 p-8 md:p-10 mb-8">
                                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-200">
                                        <div className="bg-[#021d49] p-3 rounded-xl">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Available Resources</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">View or download supporting documents</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {resourceList.map((url, idx) => {
                                            const fullUrl = url.startsWith('http') ? url : `${API_CONFIG.BASE_URL}${url}`;
                                            const filename = decodeURIComponent(url.split('/').pop()?.split('?')[0] ?? '') || `Document ${idx + 1}`;
                                            const isPdf = url.toLowerCase().includes('.pdf');
                                            return (
                                                <div key={idx} className="bg-white rounded-xl border border-gray-200 hover:border-[#021d49] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                                                    <div className="bg-linear-to-r from-[#021d49]/5 to-blue-50 px-5 py-4 flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
                                                            <FileText className="w-5 h-5 text-red-600" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-semibold text-gray-900 break-all leading-snug group-hover:text-[#021d49] transition-colors" title={filename}>{filename}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{isPdf ? 'PDF Document' : 'Document'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="grid grid-cols-2 divide-x divide-gray-200 border-t border-gray-200">
                                                        <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 text-[#021d49] hover:bg-[#021d49] hover:text-white transition-all duration-200 font-semibold text-sm">
                                                            <Eye className="w-4 h-4" /> Open
                                                        </a>
                                                        <a href={fullUrl} download className="flex flex-col items-center justify-center gap-1.5 py-4 px-3 text-gray-700 hover:bg-gray-100 transition-colors duration-200 font-semibold text-sm">
                                                            <Download className="w-4 h-4" /> Download
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-6 pt-5 border-t border-gray-200 bg-white/60 rounded-lg px-4 py-3 text-sm text-gray-600 flex items-start gap-2">
                                        <span className="text-blue-500 font-bold shrink-0">ℹ</span>
                                        <span>Click <strong className="text-gray-800">"Open"</strong> to read in a new tab, or <strong className="text-gray-800">"Download"</strong> to save to your device.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-6">
                            {/* Cover Image Card */}
                            {coverImageUrl && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <button onClick={() => setImageModalOpen(true)} className="relative w-full group block" title="Click to view full-size">
                                        <img src={coverImageUrl} alt={article.title} className="w-full object-contain max-h-64 bg-[#021d49]" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                            <div className="bg-white/90 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <ZoomIn className="w-5 h-5 text-gray-900" />
                                            </div>
                                        </div>
                                    </button>
                                    <p className="text-xs text-center text-gray-400 py-2 px-3 border-t border-gray-100">Click image to enlarge</p>
                                </div>
                            )}

                            {/* Article Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Article Details</h3>
                                <dl className="space-y-3 text-sm">
                                    <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Authors</dt><dd className="text-gray-900 font-medium">{authorsDisplay}</dd></div>
                                    {dateDisplay && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Published</dt><dd className="text-gray-900 font-medium">{dateDisplay}</dd></div>}
                                    {article.year && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Year</dt><dd className="text-gray-900 font-medium">{article.year}</dd></div>}
                                </dl>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-linear-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-sm p-6 text-white">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <Link href="/press/journal-articles" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold">
                                        <ArrowLeft className="w-4 h-4" /> All Articles
                                    </Link>
                                    {resourceList.length > 0 && (
                                        <a href="#resources" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#021d49] rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">
                                            <FileText className="w-4 h-4" /> View Resources
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link href="/press/journal-articles" className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl hover:bg-[#032a5e] transition-colors shadow-sm">
                            <ArrowLeft className="w-4 h-4" /> View All Articles
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
