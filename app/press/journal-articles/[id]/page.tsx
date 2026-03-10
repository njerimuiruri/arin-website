"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getJournalArticle } from "@/services/journalArticlesService";
import { ArrowLeft, Calendar, Users, Download, FileText, ExternalLink, BookOpen, X } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

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
    const [activeResourceUrl, setActiveResourceUrl] = useState<string | null>(null);
    const [activeResourceName, setActiveResourceName] = useState<string>("");

    useEffect(() => {
        loadArticle();
    }, [id]);

    const loadArticle = async () => {
        try {
            setLoading(true);
            const data = await getJournalArticle(id);
            setArticle(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load article");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-stone-50">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-gray-600 text-lg font-medium">Loading article...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-stone-50">
                    <div className="text-center max-w-md mx-auto px-6">
                        <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Something went wrong</h2>
                        <p className="text-gray-600 mb-8 text-lg">{error}</p>
                        <Link
                            href="/press/journal-articles"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#021d49] text-white rounded-xl hover:bg-[#14234d] transition-all shadow-lg hover:shadow-xl font-semibold"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Articles
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    if (!article) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-stone-50">
                    <div className="text-center max-w-md mx-auto px-6">
                        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                            <FileText className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">Article Not Found</h2>
                        <p className="text-gray-600 mb-8 text-lg">The journal article you're looking for doesn't exist.</p>
                        <Link
                            href="/press/journal-articles"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-[#021d49] text-white rounded-xl hover:bg-[#14234d] transition-all shadow-lg hover:shadow-xl font-semibold"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Articles
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    const authorsDisplay = article.authors && article.authors.length > 0
        ? article.authors.join(", ")
        : "Unknown Author";

    const rawDate = article.date || article.datePosted;
    const dateDisplay = rawDate
        ? new Date(rawDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Date not available';

    const resourceList = (article.resources || article.availableResources || []).filter(Boolean);

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section with Cover Image */}
                {article.coverImage && (
                    <div className="relative w-full h-96 bg-gradient-to-br from-slate-900 to-slate-700 overflow-hidden">
                        <img
                            src={article.coverImage.startsWith('http') ? article.coverImage : `https://api.demo.arin-africa.org${article.coverImage}`}
                            alt={article.title}
                            className="w-full h-full object-cover opacity-40"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent"></div>
                    </div>
                )}

                <div className="max-w-5xl mx-auto px-6 py-12">
                    {/* Back Button */}
                    <Link
                        href="/press/journal-articles"
                        className="inline-flex items-center gap-2 text-[#021d49] hover:text-[#14234d] font-semibold mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to Journal Articles
                    </Link>

                    {/* Article Header */}
                    <div className={`mb-12 ${article.coverImage ? '-mt-32 relative z-10' : ''}`}>
                        <div className={`${article.coverImage ? 'bg-white rounded-2xl shadow-2xl p-10 border border-gray-100' : ''}`}>
                            <h1 className={`text-4xl lg:text-6xl font-bold mb-8 leading-tight ${article.coverImage ? 'text-gray-900' : 'text-gray-900'}`}>
                                {article.title}
                            </h1>

                            {/* Metadata Cards - Horizontal Layout */}
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Authors Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#021d49] rounded-xl flex items-center justify-center shadow-lg">
                                            <Users className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-[#021d49] mb-2 uppercase tracking-wide">
                                                Authors
                                            </h3>
                                            <p className="text-gray-900 leading-relaxed font-medium text-base">
                                                {authorsDisplay}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Date Card */}
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-sm font-bold text-emerald-700 mb-2 uppercase tracking-wide">
                                                Publication Date
                                            </h3>
                                            <p className="text-gray-900 font-medium text-base">
                                                {dateDisplay}
                                            </p>
                                            {article.year && (
                                                <p className="text-emerald-600 font-semibold text-sm mt-1">
                                                    Year: {article.year}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Article Content - Enhanced Readability */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 mb-12">
                        <div className="prose prose-xl max-w-none">
                            <div
                                className="article-content"
                                dangerouslySetInnerHTML={{ __html: article.description }}
                            />
                        </div>
                    </div>

                    {/* Available Resources */}
                    {resourceList.length > 0 && (
                        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-gray-200 p-10 mb-12">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-[#021d49] rounded-xl flex items-center justify-center shadow-lg">
                                    <Download className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">Available Resources</h2>
                                    <p className="text-gray-600 text-sm mt-1">View or download supporting documents</p>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                {resourceList.map((url, index) => {
                                    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.demo.arin-africa.org";
                                    const fullUrl = url.startsWith('http') ? url : `${apiBase}${url}`;
                                    const fileName = decodeURIComponent(url.split('/').pop()?.split('?')[0] || `Resource ${index + 1}`);
                                    const lower = url.toLowerCase();
                                    const isPdf = lower.includes('.pdf');
                                    const isWord = lower.includes('.doc');
                                    const fileLabel = isPdf ? 'PDF Document' : isWord ? 'Word Document' : 'Document';
                                    // Use Google Docs viewer for non-PDF files so they render in the iframe
                                    const viewUrl = isPdf ? fullUrl : `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between gap-4 p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#021d49] transition-all shadow-md hover:shadow-xl"
                                        >
                                            <div className="flex items-center gap-5 flex-1 min-w-0">
                                                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#021d49] to-[#14234d] rounded-xl shadow-lg">
                                                    <FileText className="w-7 h-7 text-white" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-gray-900 text-base truncate">{fileName}</p>
                                                    <p className="text-sm text-gray-500 mt-0.5">{fileLabel}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => { setActiveResourceUrl(viewUrl); setActiveResourceName(fileName); }}
                                                    className="inline-flex items-center gap-2 px-4 py-2 border border-[#021d49] text-[#021d49] rounded-lg font-medium hover:bg-[#021d49] hover:text-white transition-colors text-sm"
                                                >
                                                    <BookOpen className="w-4 h-4" />
                                                    View
                                                </button>
                                                <a
                                                    href={fullUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Bottom Navigation */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/press/journal-articles"
                            className="flex-1 px-8 py-4 bg-gradient-to-r from-[#021d49] to-[#14234d] hover:from-[#14234d] hover:to-[#021d49] text-white font-bold rounded-xl shadow-lg hover:shadow-2xl text-center transition-all text-lg"
                        >
                            View All Articles
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />

            {/* Inline Document Viewer Overlay */}
            {activeResourceUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-xl shadow-2xl w-[95vw] h-[90vh] max-w-5xl flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
                            <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-[#021d49]" />
                                <span className="font-semibold text-gray-900 text-sm truncate max-w-md">{activeResourceName}</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveResourceUrl(null)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Close
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-100">
                            <iframe
                                src={activeResourceUrl}
                                className="w-full h-full border-0"
                                title={activeResourceName}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}