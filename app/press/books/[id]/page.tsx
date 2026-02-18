"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBook } from "@/services/booksService";
import { ArrowLeft, Calendar, Users, Download, BookOpen } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

interface Book {
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

const getFileTypeLabel = (url: string): string => {
    const lower = url.toLowerCase();
    if (lower.endsWith('.pdf')) return 'PDF document';
    if (lower.endsWith('.doc') || lower.endsWith('.docx')) return 'Word document';
    if (lower.endsWith('.ppt') || lower.endsWith('.pptx')) return 'PowerPoint presentation';
    if (lower.endsWith('.xls') || lower.endsWith('.xlsx')) return 'Excel spreadsheet';
    if (lower.endsWith('.txt')) return 'Text file';
    return 'Document';
};

export default function BookDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeResourceUrl, setActiveResourceUrl] = useState<string | null>(null);

    useEffect(() => {
        loadBook();
    }, [id]);

    const loadBook = async () => {
        try {
            setLoading(true);
            const data = await getBook(id);
            setBook(data);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load book");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                        <p className="text-gray-600 text-lg">Loading...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center max-w-lg mx-auto px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Error</h2>
                        <p className="text-gray-600 text-lg mb-8">{error}</p>
                        <Link
                            href="/press/books"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#021d49] text-white rounded-lg hover:bg-[#032a5e] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Books
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    if (!book) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-white">
                    <div className="text-center max-w-lg mx-auto px-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Book Not Found</h2>
                        <p className="text-gray-600 text-lg mb-8">
                            The book you're looking for doesn't exist.
                        </p>
                        <Link
                            href="/press/books"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-[#021d49] text-white rounded-lg hover:bg-[#032a5e] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Books
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    const authorsDisplay = book.authors && book.authors.length > 0
        ? book.authors.join(", ")
        : "Unknown Author";

    const dateDisplay = book.datePosted
        ? new Date(book.datePosted).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'Date not available';

    return (
        <>
            <Navbar />

            <div className="bg-white min-h-screen">
                <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">

                    {/* Back Button */}
                    <Link
                        href="/press/books"
                        className="inline-flex items-center gap-2 text-gray-700 hover:text-[#021d49] font-medium mb-12 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Back to All Books
                    </Link>

                    {/* Book Layout */}
                    <div className="grid lg:grid-cols-5 gap-16 mb-20">

                        {/* Book Cover - Left Side */}
                        <div className="lg:col-span-2">
                            {book.image ? (
                                <div className="sticky top-8">
                                    <img
                                        src={book.image.startsWith('http') ? book.image : `https://api.demo.arin-africa.org${book.image}`}
                                        alt={book.title}
                                        className="w-full h-auto rounded-lg shadow-xl"
                                    />
                                </div>
                            ) : (
                                <div className="w-full aspect-[2/3] bg-gray-100 rounded-lg flex items-center justify-center">
                                    <BookOpen className="w-20 h-20 text-gray-300" />
                                </div>
                            )}
                        </div>

                        {/* Book Details - Right Side */}
                        <div className="lg:col-span-3 space-y-10">

                            {/* Title */}
                            <div className="border-b border-gray-200 pb-8">
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    {book.title}
                                </h1>
                            </div>

                            {/* Authors */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Users className="w-6 h-6 text-[#021d49]" />
                                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                        Authors
                                    </h2>
                                </div>
                                <p className="text-xl text-gray-900 font-medium">
                                    {authorsDisplay}
                                </p>
                            </div>

                            {/* Publication Date */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <Calendar className="w-6 h-6 text-[#021d49]" />
                                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                        Published
                                    </h2>
                                </div>
                                <p className="text-xl text-gray-900 font-medium">
                                    {dateDisplay}
                                </p>
                            </div>

                            {/* Year */}
                            {book.year && (
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <BookOpen className="w-6 h-6 text-[#021d49]" />
                                        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                            Year
                                        </h2>
                                    </div>
                                    <p className="text-xl text-gray-900 font-medium">
                                        {book.year}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            About This Book
                        </h2>
                        <div
                            className="prose prose-lg max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: book.description }}
                            style={{
                                fontSize: '1.125rem',
                                lineHeight: '1.875rem',
                            }}
                        />
                    </div>

                    {/* Resources Section */}
                    {book.availableResources && book.availableResources.length > 0 && (
                        <div className="mb-20">
                            <div className="flex items-center gap-3 mb-8">
                                <Download className="w-7 h-7 text-[#021d49]" />
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Resources
                                </h2>
                            </div>

                            <div className="space-y-4">
                                {book.availableResources.map((url, index) => {
                                    const fileName = url.split('/').pop() || `Resource ${index + 1}`;
                                    const viewUrl = url.startsWith('http') ? url : `https://api.demo.arin-africa.org${url}`;
                                    const fileTypeLabel = getFileTypeLabel(url);

                                    return (
                                        <div
                                            key={index}
                                            className="group flex items-center justify-between p-6 border-2 border-gray-200 hover:border-[#021d49] rounded-lg transition-all hover:shadow-lg"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="flex items-center justify-center w-14 h-14 bg-gray-100 group-hover:bg-[#021d49] rounded-lg transition-colors">
                                                    <svg className="w-7 h-7 text-gray-600 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-[#021d49] transition-colors">
                                                        {fileName}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {fileTypeLabel}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* View More button shows inline PDF viewer overlay */}
                                            <button
                                                type="button"
                                                onClick={() => setActiveResourceUrl(viewUrl)}
                                                className="inline-flex items-center gap-2 px-4 py-2 border border-[#021d49] text-[#021d49] rounded-lg font-medium hover:bg-[#021d49] hover:text-white transition-colors"
                                            >
                                                <BookOpen className="w-5 h-5" />
                                                View More
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Bottom Navigation */}
                    <div className="pt-8 border-t border-gray-200">
                        <Link
                            href="/press/books"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-[#021d49] hover:bg-[#032a5e] text-white font-semibold rounded-lg transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            View All Books
                        </Link>
                    </div>
                </div>
            </div>

            {/* PDF Viewer Overlay */}
            {activeResourceUrl && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
                    <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[90vh] max-w-5xl flex flex-col overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Viewing document
                            </h3>
                            <button
                                type="button"
                                onClick={() => setActiveResourceUrl(null)}
                                className="px-3 py-1 text-sm font-medium text-gray-600 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                            >
                                Close
                            </button>
                        </div>
                        <div className="flex-1 bg-gray-50">
                            <iframe
                                src={activeResourceUrl}
                                className="w-full h-full border-0"
                                title="Document viewer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}