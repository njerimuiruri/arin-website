"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getJournalArticle } from "@/services/journalArticlesService";
import { ArrowLeft, Calendar, Users, Download } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

interface JournalArticle {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    authors?: string[];
    datePosted?: string;
    image?: string;
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
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-[#46a1bb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading article...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <Link
                            href="/press/journal-articles"
                            className="px-6 py-2 bg-[#46a1bb] text-white rounded-lg hover:bg-[#021d49]"
                        >
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
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
                        <p className="text-gray-600 mb-4">The journal article you're looking for doesn't exist.</p>
                        <Link
                            href="/press/journal-articles"
                            className="px-6 py-2 bg-[#46a1bb] text-white rounded-lg hover:bg-[#021d49]"
                        >
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
                <div className="max-w-4xl mx-auto px-6 py-12">
                    {/* Back Button */}
                    <Link
                        href="/press/journal-articles"
                        className="inline-flex items-center gap-2 text-[#46a1bb] hover:text-[#021d49] font-medium mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Journal Articles
                    </Link>

                    {/* Article Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Metadata Card */}
                        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 space-y-4">
                            {/* Authors */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-[#46a1bb]" />
                                    Authors
                                </h3>
                                <p className="text-gray-900 leading-relaxed">
                                    {authorsDisplay}
                                </p>
                            </div>

                            {/* Date */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-[#46a1bb]" />
                                    Publication Date
                                </h3>
                                <p className="text-gray-900">
                                    {dateDisplay}
                                </p>
                            </div>

                            {/* Year */}
                            {article.year && (
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">Year</h3>
                                    <p className="text-gray-900">{article.year}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Cover Image */}
                    {article.image && (
                        <div className="mb-8">
                            <img
                                src={article.image.startsWith('http') ? article.image : `http://localhost:5001${article.image}`}
                                alt={article.title}
                                className="w-full h-96 object-cover rounded-lg shadow-lg border border-gray-200"
                            />
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
                        <div className="prose prose-lg max-w-none">
                            <div
                                className="text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: article.description }}
                            />
                        </div>
                    </div>

                    {/* Available Resources */}
                    {article.availableResources && article.availableResources.length > 0 && (
                        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Download className="w-6 h-6 text-[#46a1bb]" />
                                Available Resources
                            </h2>
                            <div className="space-y-3">
                                {article.availableResources.map((url, index) => {
                                    const fileName = url.split('/').pop() || `Resource ${index + 1}`;
                                    const downloadUrl = url.startsWith('http') ? url : `http://localhost:5001${url}`;

                                    return (
                                        <a
                                            key={index}
                                            href={downloadUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 rounded-lg border border-blue-200 transition-all group"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex-grow">
                                                <p className="font-semibold text-gray-900 group-hover:text-blue-600">
                                                    {fileName}
                                                </p>
                                                <p className="text-sm text-gray-600">PDF Document</p>
                                            </div>
                                            <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0 0V8m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Share and Navigate Section */}
                    <div className="flex gap-4">
                        <Link
                            href="/press/journal-articles"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-[#021d49] to-[#46a1bb] hover:shadow-lg text-white font-semibold rounded-lg shadow-md text-center transition-all"
                        >
                            View All Articles
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
