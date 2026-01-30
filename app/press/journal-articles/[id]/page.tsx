"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getJournalArticle } from "@/services/journalArticlesService";
import { ArrowLeft, Calendar, Users, Download, FileText, ExternalLink } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

interface JournalArticle {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    authors?: string[];
    datePosted?: string;
    coverImage?: string;
    availableResources?: string[];
    year?: number;
}

export default function JournalArticleDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [article, setArticle] = useState<JournalArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const dateDisplay = article.datePosted
        ? new Date(article.datePosted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Date not available';

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
                            <style jsx global>{`
                                .prose {
                                    color: #1f2937;
                                    font-size: 1.125rem;
                                    line-height: 1.85;
                                }
                                .prose p {
                                    margin-bottom: 1.5rem;
                                    color: #374151;
                                    font-size: 1.125rem;
                                    line-height: 1.85;
                                }
                                .prose h1, .prose h2, .prose h3, .prose h4 {
                                    color: #111827;
                                    font-weight: 700;
                                    margin-top: 2rem;
                                    margin-bottom: 1rem;
                                    line-height: 1.3;
                                }
                                .prose h2 {
                                    font-size: 2rem;
                                    border-bottom: 3px solid #021d49;
                                    padding-bottom: 0.5rem;
                                    margin-top: 3rem;
                                }
                                .prose h3 {
                                    font-size: 1.5rem;
                                    color: #021d49;
                                }
                                .prose ul, .prose ol {
                                    margin-top: 1.5rem;
                                    margin-bottom: 1.5rem;
                                    padding-left: 1.5rem;
                                }
                                .prose li {
                                    margin-bottom: 0.75rem;
                                    color: #374151;
                                    font-size: 1.125rem;
                                    line-height: 1.75;
                                }
                                .prose strong {
                                    color: #111827;
                                    font-weight: 700;
                                }
                                .prose a {
                                    color: #021d49;
                                    text-decoration: underline;
                                    font-weight: 600;
                                }
                                .prose a:hover {
                                    color: #14234d;
                                }
                                .prose blockquote {
                                    border-left: 4px solid #021d49;
                                    padding-left: 1.5rem;
                                    font-style: italic;
                                    color: #4b5563;
                                    margin: 2rem 0;
                                    background: #f9fafb;
                                    padding: 1.5rem;
                                    border-radius: 0.5rem;
                                }
                                .prose code {
                                    background: #f3f4f6;
                                    padding: 0.25rem 0.5rem;
                                    border-radius: 0.25rem;
                                    font-size: 0.9em;
                                    color: #021d49;
                                }
                                .prose img {
                                    border-radius: 0.75rem;
                                    margin: 2rem 0;
                                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                                }
                            `}</style>
                            <div
                                className="article-content"
                                dangerouslySetInnerHTML={{ __html: article.description }}
                            />
                        </div>
                    </div>

                    {/* Available Resources - Enhanced Design */}
                    {article.availableResources && article.availableResources.length > 0 && (
                        <div className="bg-gradient-to-br from-white to-slate-50 rounded-2xl shadow-xl border border-gray-200 p-10 mb-12">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 bg-[#021d49] rounded-xl flex items-center justify-center shadow-lg">
                                    <Download className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-3xl font-bold text-gray-900">
                                        Available Resources
                                    </h2>
                                    <p className="text-gray-600 text-sm mt-1">Download supporting materials and documents</p>
                                </div>
                            </div>
                            <div className="grid gap-4">
                                {article.availableResources.map((url, index) => {
                                    const fileName = url.split('/').pop() || `Resource ${index + 1}`;
                                    const downloadUrl = url.startsWith('http') ? url : `https://api.demo.arin-africa.org${url}`;

                                    return (
                                        <a
                                            key={index}
                                            href={downloadUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group relative flex items-center gap-5 p-6 bg-white hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 rounded-xl border-2 border-gray-200 hover:border-[#021d49] transition-all shadow-md hover:shadow-xl"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#021d49] to-[#14234d] rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                                    <FileText className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-bold text-gray-900 text-lg group-hover:text-[#021d49] transition-colors mb-1">
                                                    {fileName}
                                                </p>
                                                <p className="text-sm text-gray-600 font-medium">PDF Document • Click to download</p>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <ExternalLink className="w-6 h-6 text-[#021d49] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </div>
                                        </a>
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
        </>
    );
}