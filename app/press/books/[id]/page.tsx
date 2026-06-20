"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBook } from "@/services/booksService";
import { ArrowLeft, Calendar, Users, Download, BookOpen, FileText, Eye, ZoomIn, X, Lock, ShoppingCart, Zap, CreditCard } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import { API_CONFIG } from '@/lib/apiConfig';

declare global {
    interface Window {
        PaystackPop: {
            setup: (options: Record<string, unknown>) => { openIframe: () => void };
        };
    }
}

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
    embargoDate?: string;
    price?: number;
    currency?: string;
}

const getFileTypeLabel = (url: string): string => {
    const lower = url.toLowerCase();
    if (lower.endsWith('.pdf')) return 'PDF Document';
    if (lower.endsWith('.doc') || lower.endsWith('.docx')) return 'Word Document';
    if (lower.endsWith('.ppt') || lower.endsWith('.pptx')) return 'PowerPoint';
    if (lower.endsWith('.xls') || lower.endsWith('.xlsx')) return 'Excel Spreadsheet';
    return 'Document';
};

export default function BookDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [payModal, setPayModal] = useState<"cart" | "buy" | null>(null);
    const [email, setEmail] = useState("");
    const [paying, setPaying] = useState(false);
    const [paystackReady, setPaystackReady] = useState(false);

    useEffect(() => {
        const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
        if (existing) { setPaystackReady(true); return; }
        const script = document.createElement("script");
        script.src = "https://js.paystack.co/v1/inline.js";
        script.async = true;
        script.onload = () => setPaystackReady(true);
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        setLoading(true);
        getBook(id)
            .then(data => { setBook(data); setError(null); })
            .catch(err => setError(err instanceof Error ? err.message : "Failed to load book"))
            .finally(() => setLoading(false));
    }, [id]);

    const initiatePaystack = () => {
        if (!book?.price) return;
        if (!email.trim() || !email.includes("@")) {
            alert("Please enter a valid email address.");
            return;
        }
        setPaying(true);
        const currency = book.currency || "USD";
        const totalAmount = Math.round(book.price * quantity * 100);
        const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
            email: email.trim(),
            amount: totalAmount,
            currency,
            ref: `ARIN-${Date.now()}-${Math.floor(Math.random() * 99999)}`,
            metadata: { book_id: book._id, book_title: book.title, quantity },
            callback: (response: { reference: string }) => {
                setPaying(false);
                setPayModal(null);
                alert(`Payment successful! Reference: ${response.reference}`);
            },
            onClose: () => setPaying(false),
        });
        handler.openIframe();
    };

    const formatPrice = (price: number, currency = "USD") =>
        new Intl.NumberFormat("en-US", { style: "currency", currency }).format(price);

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading...</p>
                </div>
            </div>
        </>
    );

    if (error || !book) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">{error ? "Error" : "Book Not Found"}</h2>
                    <p className="text-gray-500 text-sm mb-6">{error || "The book you're looking for doesn't exist."}</p>
                    <Link href="/press/books" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-lg hover:bg-[#032a5e] transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Books
                    </Link>
                </div>
            </div>
        </>
    );

    const imageUrl = book.image?.startsWith('http') ? book.image : book.image ? `${API_CONFIG.BASE_URL}${book.image}` : '';
    const authorsDisplay = book.authors && book.authors.length > 0 ? book.authors.join(", ") : "Unknown Author";
    const dateDisplay = book.datePosted ? new Date(book.datePosted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
    const resources = (book.availableResources ?? []).filter((u): u is string => typeof u === 'string' && u.trim().length > 0);
    const isEmbargoed = book.embargoDate && new Date(book.embargoDate) > new Date();
    const embargoDateDisplay = book.embargoDate ? new Date(book.embargoDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

    return (
        <>
            <Navbar />

            {/* Image Modal */}
            {imageModalOpen && imageUrl && (
                <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setImageModalOpen(false)}>
                    <div className="relative max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setImageModalOpen(false)} className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        <img src={imageUrl} alt={book.title} className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" />
                        <p className="text-white/60 text-xs text-center mt-3">Click outside to close</p>
                    </div>
                </div>
            )}

            {/* Payment email modal */}
            {payModal && book.price && (
                <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[#021d49] rounded-xl flex items-center justify-center">
                                <CreditCard className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    {payModal === "buy" ? "Buy Now" : "Add to Cart"}
                                </h2>
                                <p className="text-xs text-gray-500">Secure payment via Paystack</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-3 mb-4 text-sm">
                            <p className="font-medium text-gray-900 line-clamp-1">{book.title}</p>
                            <p className="text-gray-500 text-xs mt-0.5">Qty: {quantity} × {formatPrice(book.price, book.currency)} = <span className="font-semibold text-gray-800">{formatPrice(book.price * quantity, book.currency)}</span></p>
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your email address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 mb-4 text-sm focus:outline-none focus:border-[#021d49]"
                            autoFocus
                        />
                        <button
                            onClick={initiatePaystack}
                            disabled={paying}
                            className="w-full py-3 bg-[#021d49] text-white rounded-xl font-bold text-sm hover:bg-[#032a5e] disabled:opacity-50 transition mb-2"
                        >
                            {paying ? "Opening Paystack…" : `Pay ${formatPrice(book.price * quantity, book.currency)} with Paystack`}
                        </button>
                        <button
                            onClick={() => { setPayModal(null); setPaying(false); }}
                            className="w-full py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-50">

                {/* Hero Banner */}
                <div className="bg-[#021d49] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
                        {imageUrl && (
                            <button onClick={() => setImageModalOpen(true)} className="shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/60 transition-colors relative group" title="View full-size">
                                <img src={imageUrl} alt={book.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )}
                        <div className="flex-1 min-w-0">
                            <Link href="/press/books" className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-2 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> All Books
                            </Link>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <h1 className="text-lg md:text-2xl font-bold leading-snug line-clamp-2">{book.title}</h1>
                                {isEmbargoed && (
                                    <span className="flex items-center gap-1 px-2.5 py-1 bg-orange-500 text-white text-xs font-bold rounded-lg shrink-0">
                                        <Lock className="w-3 h-3" /> Embargoed
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3 text-xs text-white/70">
                                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{authorsDisplay}</span>
                                {dateDisplay && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{dateDisplay}</span>}
                                {book.year && <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{book.year}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-4 gap-8 items-start">

                        {/* Main content */}
                        <div className="lg:col-span-3">

                            {/* Embargo notice (full-width, above description) */}
                            {isEmbargoed && (
                                <div className="flex items-start gap-4 bg-orange-50 border border-orange-200 rounded-2xl p-6 mb-6">
                                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                                        <Lock className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-orange-800 text-base mb-1">This Book is Under Embargo</h3>
                                        <p className="text-orange-700 text-sm leading-relaxed">
                                            Full access to this book and its resources is restricted until <strong>{embargoDateDisplay}</strong>. The description below is available for preview, but downloads and full content will be unlocked after the embargo period ends.
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* About This Book */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10 mb-8">
                                <div className="flex items-center gap-3 mb-7 pb-5 border-b border-gray-100">
                                    <div className="bg-[#021d49]/10 p-2.5 rounded-lg">
                                        <BookOpen className="w-5 h-5 text-[#021d49]" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">About This Book</h2>
                                </div>
                                <div
                                    className="prose prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-headings:text-gray-900 prose-a:text-[#021d49] prose-img:rounded-xl"
                                    dangerouslySetInnerHTML={{ __html: book.description }}
                                />
                            </div>

                            {/* Resources — hidden when embargoed */}
                            {!isEmbargoed && resources.length > 0 && (
                                <div id="resources" className="bg-linear-to-br from-[#021d49]/5 to-blue-50 rounded-2xl border border-gray-200 p-8 md:p-10 mb-8">
                                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-200">
                                        <div className="bg-[#021d49] p-3 rounded-xl">
                                            <FileText className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">Available Resources</h2>
                                            <p className="text-sm text-gray-500 mt-0.5">View or download the book and supporting documents</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {resources.map((url, idx) => {
                                            const fullUrl = url.startsWith('http') ? url : `${API_CONFIG.BASE_URL}${url}`;
                                            const filename = decodeURIComponent(url.split('/').pop()?.split('?')[0] ?? '') || `Document ${idx + 1}`;
                                            const fileLabel = getFileTypeLabel(url);
                                            return (
                                                <div key={idx} className="bg-white rounded-xl border border-gray-200 hover:border-[#021d49] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
                                                    <div className="bg-linear-to-r from-[#021d49]/5 to-blue-50 px-5 py-4 flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-red-200 transition-colors">
                                                            <FileText className="w-5 h-5 text-red-600" />
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="text-sm font-semibold text-gray-900 break-all leading-snug group-hover:text-[#021d49] transition-colors" title={filename}>{filename}</p>
                                                            <p className="text-xs text-gray-500 mt-1">{fileLabel}</p>
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

                            {/* Cover Image */}
                            {imageUrl && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <button onClick={() => setImageModalOpen(true)} className="relative w-full group block" title="Click to view full-size">
                                        <img src={imageUrl} alt={book.title} className="w-full object-contain max-h-72 bg-gray-50" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                            <div className="bg-white/90 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <ZoomIn className="w-5 h-5 text-gray-900" />
                                            </div>
                                        </div>
                                    </button>
                                    <p className="text-xs text-center text-gray-400 py-2 px-3 border-t border-gray-100">Click image to enlarge</p>
                                </div>
                            )}

                            {/* Price + Buy section */}
                            {book.price && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
                                    <p className="text-3xl font-bold text-gray-900 mb-1">
                                        {formatPrice(book.price, book.currency)}
                                    </p>
                                    <p className="text-xs text-gray-400 mb-4">Price per copy</p>

                                    {isEmbargoed ? (
                                        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3 py-2.5 text-orange-700 text-sm">
                                            <Lock className="w-4 h-4 shrink-0" />
                                            <span>Purchase available after <strong>{embargoDateDisplay}</strong></span>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Quantity */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-sm text-gray-600 font-medium">Qty:</span>
                                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold text-base">-</button>
                                                    <span className="px-3 py-1.5 text-sm font-semibold border-x border-gray-300">{quantity}</span>
                                                    <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 font-bold text-base">+</button>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setPayModal("cart")}
                                                disabled={!paystackReady}
                                                className="w-full flex items-center justify-center gap-2 py-3 bg-[#021d49] text-white rounded-xl font-bold text-sm hover:bg-[#032a5e] disabled:opacity-60 transition mb-2"
                                            >
                                                <ShoppingCart className="w-4 h-4" /> Add To Cart
                                            </button>
                                            <button
                                                onClick={() => setPayModal("buy")}
                                                disabled={!paystackReady}
                                                className="w-full flex items-center justify-center gap-2 py-3 bg-[#021d49] text-white rounded-xl font-bold text-sm hover:bg-[#032a5e] disabled:opacity-60 transition"
                                            >
                                                <Zap className="w-4 h-4" /> Buy Now
                                            </button>

                                            {/* Payment icons */}
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <p className="text-xs text-gray-400 mb-2 text-center">Payment Methods</p>
                                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                                    <span className="border border-gray-200 rounded px-2 py-0.5 text-xs font-bold text-blue-800 tracking-widest">VISA</span>
                                                    <span className="border border-gray-200 rounded px-2 py-0.5 text-xs font-bold text-red-600">MC</span>
                                                    <span className="border border-gray-200 rounded px-2 py-0.5 text-xs font-bold text-green-700">M-PESA</span>
                                                    <span className="border border-gray-200 rounded px-2 py-0.5 text-xs font-bold text-blue-500">Paystack</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Book Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Book Details</h3>
                                <dl className="space-y-3 text-sm">
                                    <div>
                                        <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Authors</dt>
                                        <dd className="text-gray-900 font-medium">{authorsDisplay}</dd>
                                    </div>
                                    {dateDisplay && (
                                        <div>
                                            <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Published</dt>
                                            <dd className="text-gray-900 font-medium">{dateDisplay}</dd>
                                        </div>
                                    )}
                                    {book.year && (
                                        <div>
                                            <dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Year</dt>
                                            <dd className="text-gray-900 font-medium">{book.year}</dd>
                                        </div>
                                    )}
                                    {isEmbargoed && (
                                        <div className="pt-2 border-t border-gray-100">
                                            <dt className="text-orange-500 text-xs uppercase tracking-wide mb-0.5 flex items-center gap-1">
                                                <Lock className="w-3 h-3" /> Embargo Lifted
                                            </dt>
                                            <dd className="text-orange-700 font-semibold">{embargoDateDisplay}</dd>
                                        </div>
                                    )}
                                </dl>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-linear-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-sm p-6 text-white">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <Link href="/press/books" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold">
                                        <ArrowLeft className="w-4 h-4" /> All Books
                                    </Link>
                                    {!isEmbargoed && resources.length > 0 && (
                                        <a href="#resources" className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#021d49] rounded-lg hover:bg-blue-50 transition-colors text-sm font-semibold">
                                            <FileText className="w-4 h-4" /> View Resources
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <Link href="/press/books" className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl hover:bg-[#032a5e] transition-colors shadow-sm">
                            <ArrowLeft className="w-4 h-4" /> View All Books
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
