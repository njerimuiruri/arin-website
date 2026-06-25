"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getBook } from "@/services/booksService";
import {
    ZoomIn, X, Lock, Eye, Download, BookOpen,
    Calendar, Users, ShoppingCart, Zap, CheckCircle,
    Mail, FileText, ArrowLeft, CreditCard
} from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";
import { API_CONFIG } from "@/lib/apiConfig";

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

interface PaymentResult {
    reference: string;
    bookTitle: string;
    amount: number;
    currency: string;
    email: string;
    quantity: number;
    resources: string[];
}

/* ─── helpers ─────────────────────────────────────── */
const formatPrice = (amount: number, currency = "USD") =>
    `${new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)} ${currency}`;

const stripHtml = (html: string) =>
    html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

/* ─── Success overlay ─────────────────────────────── */
function PaymentSuccess({ result, onClose }: { result: PaymentResult; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">

                {/* Green header */}
                <div className="bg-linear-to-br from-emerald-500 to-teal-600 px-8 py-8 text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-9 h-9 text-white" />
                    </div>
                    <h2 className="text-white text-2xl font-extrabold mb-1">Payment Successful!</h2>
                    <p className="text-emerald-100 text-sm">Your order has been confirmed</p>
                </div>

                {/* Body */}
                <div className="px-8 py-6">
                    {/* Order details */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-5 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Book</span>
                            <span className="font-semibold text-gray-800 text-right max-w-[60%] leading-snug">{result.bookTitle}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Quantity</span>
                            <span className="font-semibold text-gray-800">{result.quantity}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount Paid</span>
                            <span className="font-bold text-gray-900">{formatPrice(result.amount / 100, result.currency)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium text-gray-800">{result.email}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 flex justify-between">
                            <span className="text-gray-500">Reference</span>
                            <span className="font-mono text-xs text-gray-600 bg-gray-200 px-2 py-0.5 rounded">{result.reference}</span>
                        </div>
                    </div>

                    {/* What happens next */}
                    <div className="mb-5">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">What happens next</p>
                        <div className="space-y-2.5">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <Mail className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <p className="text-sm text-gray-600">A confirmation receipt has been sent to <strong>{result.email}</strong></p>
                            </div>
                            {result.resources.length > 0 && (
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                                    </div>
                                    <p className="text-sm text-gray-600">Your resources are available to download below</p>
                                </div>
                            )}
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                    <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                                </div>
                                <p className="text-sm text-gray-600">You can verify your payment on Paystack using your reference number</p>
                            </div>
                        </div>
                    </div>

                    {/* Download resources */}
                    {result.resources.length > 0 && (
                        <div className="mb-5">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Download Your Book</p>
                            <div className="space-y-2">
                                {result.resources.map((url, i) => {
                                    const fullUrl = url.startsWith("http") ? url : `${API_CONFIG.BASE_URL}${url}`;
                                    const filename = decodeURIComponent(url.split("/").pop()?.split("?")[0] ?? "") || `Document ${i + 1}`;
                                    return (
                                        <a key={i} href={fullUrl} download
                                            className="flex items-center gap-3 bg-[#021d49] hover:bg-[#032a5e] text-white px-4 py-3 rounded-xl transition group">
                                            <Download className="w-4 h-4 shrink-0" />
                                            <span className="text-sm font-semibold flex-1 line-clamp-1">{filename}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={onClose}
                        className="w-full py-3 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

/* ─── Paystack checkout modal ─────────────────────── */
function CheckoutModal({
    book, quantity, onPay, onClose, paying, paystackReady, email, setEmail
}: {
    book: Book; quantity: number; paying: boolean; paystackReady: boolean;
    email: string; setEmail: (v: string) => void;
    onPay: () => void; onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-40 bg-black/60 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
                <div className="bg-[#021d49] px-6 py-5 flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-white font-bold text-sm">Secure Checkout</h2>
                        <p className="text-white/50 text-xs">Powered by Paystack</p>
                    </div>
                </div>

                <div className="px-6 py-5">
                    {/* Summary */}
                    <div className="bg-gray-50 rounded-2xl p-4 mb-5">
                        <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wide">Order Summary</p>
                        <p className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 mb-3">{book.title}</p>
                        <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-3">
                            <span className="text-gray-500">Qty: {quantity} × {formatPrice(book.price!, book.currency)}</span>
                            <span className="font-extrabold text-gray-900 text-base">{formatPrice(book.price! * quantity, book.currency)}</span>
                        </div>
                    </div>

                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Email address <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && onPay()}
                        placeholder="you@example.com"
                        className="w-full border-2 border-gray-200 focus:border-[#021d49] rounded-xl px-4 py-3 text-sm outline-none transition mb-4"
                        autoFocus
                    />

                    <button
                        onClick={onPay}
                        disabled={paying || !paystackReady || !email.includes("@")}
                        className="w-full h-12 bg-[#021d49] hover:bg-[#032a5e] disabled:opacity-50 text-white rounded-xl font-extrabold text-sm transition mb-2.5 flex items-center justify-center gap-2"
                    >
                        {paying ? (
                            <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing…</>
                        ) : (
                            <><Zap className="w-4 h-4" /> Pay {formatPrice(book.price! * quantity, book.currency)}</>
                        )}
                    </button>

                    <button onClick={onClose} className="w-full h-10 border-2 border-gray-100 rounded-xl text-sm text-gray-500 hover:bg-gray-50 transition">
                        Cancel
                    </button>

                    <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-gray-400">
                        <Lock className="w-3 h-3" /> 256-bit SSL encryption · Paystack secured
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── Main page ───────────────────────────────────── */
export default function BookDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageOpen, setImageOpen] = useState(false);
    const [readMore, setReadMore] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showCheckout, setShowCheckout] = useState(false);
    const [email, setEmail] = useState("");
    const [paying, setPaying] = useState(false);
    const [paystackReady, setPaystackReady] = useState(false);
    const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);

    useEffect(() => {
        const existing = document.querySelector('script[src="https://js.paystack.co/v1/inline.js"]');
        if (existing) { setPaystackReady(true); return; }
        const s = document.createElement("script");
        s.src = "https://js.paystack.co/v1/inline.js";
        s.async = true;
        s.onload = () => setPaystackReady(true);
        document.body.appendChild(s);
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
        if (!email.trim() || !email.includes("@")) return;
        setPaying(true);
        const currency = book.currency || "USD";
        const totalCents = Math.round(book.price * quantity * 100);
        const resources = (book.availableResources ?? []).filter(u => typeof u === "string" && u.trim());

        const handler = window.PaystackPop.setup({
            key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
            email: email.trim(),
            amount: totalCents,
            currency,
            ref: `ARIN-${Date.now()}-${Math.floor(Math.random() * 99999)}`,
            metadata: { book_id: book._id, book_title: book.title, quantity },
            callback: (response: { reference: string }) => {
                setPaying(false);
                setShowCheckout(false);
                setPaymentResult({
                    reference: response.reference,
                    bookTitle: book.title,
                    amount: totalCents,
                    currency,
                    email: email.trim(),
                    quantity,
                    resources,
                });
            },
            onClose: () => setPaying(false),
        });
        handler.openIframe();
    };

    /* ── loading / error states ── */
    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-14 h-14 border-4 border-[#021d49]/20 border-t-[#021d49] rounded-full animate-spin mx-auto mb-5" />
                    <p className="text-gray-500 font-medium">Loading book…</p>
                </div>
            </div>
            <Footer />
        </>
    );

    if (error || !book) return (
        <>
            <Navbar />
            <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
                <div className="text-center bg-white rounded-3xl shadow-sm border border-gray-100 p-12 max-w-sm w-full">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 mb-2">{error ? "Something went wrong" : "Book not found"}</h2>
                    <p className="text-gray-500 text-sm mb-6">{error || "We couldn't find the book you're looking for."}</p>
                    <Link href="/press/books" className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white text-sm font-bold rounded-xl hover:bg-[#032a5e] transition">
                        <ArrowLeft className="w-4 h-4" /> Back to Books
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );

    /* ── derived values ── */
    const imageUrl = book.image?.startsWith("http") ? book.image : book.image ? `${API_CONFIG.BASE_URL}${book.image}` : "";
    const authorsDisplay = book.authors?.length ? book.authors.join(", ") : "Unknown Author";
    const sku = book._id ? `BK${book._id.slice(-11).toUpperCase()}` : "";
    const isEmbargoed = !!(book.embargoDate && new Date(book.embargoDate) > new Date());
    const embargoDateDisplay = book.embargoDate
        ? new Date(book.embargoDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : "";
    const plainDesc = stripHtml(book.description);
    const resources = (book.availableResources ?? []).filter(u => typeof u === "string" && u.trim());

    return (
        <>
            <Navbar />

            {/* ── Modals ── */}
            {paymentResult && (
                <PaymentSuccess result={paymentResult} onClose={() => setPaymentResult(null)} />
            )}

            {showCheckout && book.price && (
                <CheckoutModal
                    book={book} quantity={quantity} paying={paying}
                    paystackReady={paystackReady} email={email} setEmail={setEmail}
                    onPay={initiatePaystack} onClose={() => setShowCheckout(false)}
                />
            )}

            {imageOpen && imageUrl && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setImageOpen(false)}>
                    <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
                        <button onClick={() => setImageOpen(false)}
                            className="absolute -top-12 right-0 w-9 h-9 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition">
                            <X className="w-5 h-5" />
                        </button>
                        <img src={imageUrl} alt={book.title} className="w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl" />
                        <p className="text-white/40 text-xs text-center mt-3">Click outside to close</p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50/30">


                <div className="max-w-6xl mx-auto px-6 py-10">

                    {/* ── Product card ── */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 overflow-hidden mb-8">
                        <div className="flex flex-col lg:flex-row">

                            {/* Image panel */}
                            <div className="lg:w-[44%] shrink-0 relative bg-linear-to-br from-slate-100 via-gray-50 to-blue-50 flex items-center justify-center p-10 min-h-115">
                                {/* Decorative rings */}
                                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                    <div className="absolute -top-16 -left-16 w-64 h-64 bg-[#021d49]/5 rounded-full" />
                                    <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-blue-100/40 rounded-full" />
                                </div>

                                {imageUrl ? (
                                    <>
                                        <img
                                            src={imageUrl}
                                            alt={book.title}
                                            className="relative z-10 max-h-100 w-auto object-contain drop-shadow-2xl rounded-lg"
                                        />
                                        <button onClick={() => setImageOpen(true)}
                                            className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 bg-white/90 hover:bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-xs text-gray-600 font-medium shadow-sm transition backdrop-blur-sm">
                                            <ZoomIn className="w-3.5 h-3.5" /> Click to enlarge
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-32 h-32 bg-gray-100 rounded-3xl flex items-center justify-center">
                                        <BookOpen className="w-16 h-16 text-gray-300" />
                                    </div>
                                )}

                                {isEmbargoed && (
                                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-orange-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-lg shadow-orange-500/30">
                                        <Lock className="w-3 h-3" /> Embargoed
                                    </div>
                                )}
                            </div>

                            {/* Details panel */}
                            <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
                                <div>
                                    {/* Badges */}
                                    <div className="flex flex-wrap items-center gap-2 mb-5">
                                        <span className="text-xs font-bold text-[#021d49] bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                                            ARIN Press
                                        </span>
                                        {book.year && (
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                                                {book.year}
                                            </span>
                                        )}
                                        {isEmbargoed && (
                                            <span className="text-xs font-bold text-orange-600 bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-full flex items-center gap-1">
                                                <Lock className="w-3 h-3" /> Under Embargo
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h1 className="text-2xl md:text-[1.75rem] font-extrabold text-[#021d49] leading-tight mb-4">
                                        {book.title}
                                    </h1>

                                    {/* Meta row */}
                                    <div className="flex flex-wrap gap-4 mb-6">
                                        {book.authors && book.authors.length > 0 && (
                                            <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <Users className="w-4 h-4 text-gray-400" />
                                                {authorsDisplay}
                                            </span>
                                        )}
                                        {book.datePosted && (
                                            <span className="flex items-center gap-1.5 text-sm text-gray-500">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {new Date(book.datePosted).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                                            </span>
                                        )}
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px bg-linear-to-r from-gray-200 via-gray-100 to-transparent mb-6" />

                                    {/* Price */}
                                    {book.price && !isEmbargoed && (
                                        <div className="mb-6">
                                            <p className="text-4xl font-black text-gray-900 tracking-tight leading-none">
                                                {formatPrice(book.price, book.currency)}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-2">Per copy · all taxes included</p>
                                        </div>
                                    )}

                                    {/* Short description */}
                                    <div className="text-gray-600 text-sm leading-relaxed mb-2">
                                        {readMore ? plainDesc : plainDesc.slice(0, 240)}{!readMore && plainDesc.length > 240 && "…"}
                                    </div>
                                    {plainDesc.length > 240 && (
                                        <button onClick={() => setReadMore(!readMore)}
                                            className="text-xs text-[#021d49] font-bold hover:underline mt-1 mb-4">
                                            {readMore ? "Show Less ↑" : "Read More ↓"}
                                        </button>
                                    )}
                                </div>

                                <div>
                                    <div className="h-px bg-linear-to-r from-gray-200 via-gray-100 to-transparent my-6" />

                                    {/* Embargo notice */}
                                    {isEmbargoed ? (
                                        <div className="flex items-start gap-4 bg-linear-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5">
                                            <div className="w-11 h-11 bg-orange-100 rounded-2xl flex items-center justify-center shrink-0">
                                                <Lock className="w-5 h-5 text-orange-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-orange-800 mb-1">Under Embargo Until {embargoDateDisplay}</p>
                                                <p className="text-orange-700 text-xs leading-relaxed">
                                                    This book is currently restricted. Purchase and full resource access will open automatically after the embargo period ends.
                                                </p>
                                            </div>
                                        </div>

                                    ) : book.price ? (
                                        <>
                                            {/* Quantity + CTA */}
                                            <div className="flex items-center gap-3 mb-5">
                                                <div className="flex items-center border-2 border-gray-200 rounded-2xl overflow-hidden shrink-0">
                                                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                                        className="w-11 h-12 text-gray-600 hover:bg-gray-50 font-bold text-xl transition">−</button>
                                                    <span className="w-10 h-12 flex items-center justify-center text-sm font-bold border-x-2 border-gray-200 select-none">
                                                        {quantity}
                                                    </span>
                                                    <button onClick={() => setQuantity(q => q + 1)}
                                                        className="w-11 h-12 text-gray-600 hover:bg-gray-50 font-bold text-xl transition">+</button>
                                                </div>

                                                <button disabled
                                                    className="flex-1 h-12 flex items-center justify-center gap-2 bg-gray-300 text-gray-500 rounded-2xl font-bold text-sm cursor-not-allowed">
                                                    <ShoppingCart className="w-4 h-4" /> Add To Cart
                                                </button>

                                                <button disabled
                                                    className="flex-1 h-12 flex items-center justify-center gap-2 bg-gray-300 text-gray-500 rounded-2xl font-bold text-sm cursor-not-allowed">
                                                    <Zap className="w-4 h-4" /> Buy Now
                                                </button>
                                            </div>

                                            {/* Payment badges */}
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <Lock className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs text-gray-400 mr-1">Secure payment via</span>
                                                {["VISA", "Mastercard", "M-PESA", "Paystack"].map(m => (
                                                    <span key={m} className="text-xs font-bold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-lg">{m}</span>
                                                ))}
                                            </div>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── About section ── */}
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 p-8 md:p-12 mb-6">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-[#021d49] rounded-2xl flex items-center justify-center shadow-lg shadow-[#021d49]/20">
                                <BookOpen className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-extrabold text-gray-900">About This Book</h2>
                                <p className="text-sm text-gray-400">Full description and content overview</p>
                            </div>
                        </div>
                        <div
                            className="prose prose-base max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-headings:text-[#021d49] prose-headings:font-extrabold prose-a:text-[#021d49] prose-strong:text-gray-900"
                            dangerouslySetInnerHTML={{ __html: book.description }}
                        />
                    </div>

                    {/* ── Metadata cards ── */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {[
                            { label: "Authors", value: authorsDisplay },
                            book.datePosted ? { label: "Published", value: new Date(book.datePosted).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) } : null,
                            book.year ? { label: "Year", value: String(book.year) } : null,
                            isEmbargoed ? { label: "Embargo Lifts", value: embargoDateDisplay, orange: true } : null,
                        ].filter(Boolean).map((item, i) => (
                            <div key={i} className={`rounded-2xl border p-5 shadow-sm ${(item as {orange?: boolean}).orange ? "bg-orange-50 border-orange-200" : "bg-white border-gray-100"}`}>
                                <p className={`text-xs font-bold uppercase tracking-widest mb-2 ${(item as {orange?: boolean}).orange ? "text-orange-400" : "text-gray-400"}`}>
                                    {(item as {label: string}).label}
                                </p>
                                <p className={`text-sm font-bold leading-snug ${(item as {orange?: boolean}).orange ? "text-orange-700" : "text-gray-800"}`}>
                                    {(item as {value: string}).value}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* ── Resources ── */}
                    {!isEmbargoed && resources.length > 0 && (
                        <div className="bg-white rounded-3xl shadow-xl border border-gray-100/80 p-8 mb-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-[#021d49] rounded-2xl flex items-center justify-center shadow-lg">
                                    <FileText className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-extrabold text-gray-900">Available Resources</h3>
                                    <p className="text-sm text-gray-400">Download or open the book files</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {resources.map((url, i) => {
                                    const fullUrl = url.startsWith("http") ? url : `${API_CONFIG.BASE_URL}${url}`;
                                    const filename = decodeURIComponent(url.split("/").pop()?.split("?")[0] ?? "") || `Document ${i + 1}`;
                                    return (
                                        <div key={i} className="flex items-center gap-4 bg-linear-to-r from-gray-50 to-blue-50/40 hover:from-blue-50 hover:to-blue-100/40 border border-gray-100 hover:border-blue-200 rounded-2xl px-5 py-4 transition-all group">
                                            <div className="w-10 h-10 bg-red-100 group-hover:bg-red-200 rounded-xl flex items-center justify-center shrink-0 transition">
                                                <FileText className="w-5 h-5 text-red-500" />
                                            </div>
                                            <p className="flex-1 text-sm font-semibold text-gray-700 group-hover:text-[#021d49] line-clamp-1 transition">{filename}</p>
                                            <div className="flex gap-2 shrink-0">
                                                <a href={fullUrl} target="_blank" rel="noopener noreferrer"
                                                    className="flex items-center gap-1.5 px-3 py-2 bg-[#021d49] text-white text-xs font-bold rounded-xl hover:bg-[#032a5e] transition shadow-sm">
                                                    <Eye className="w-3.5 h-3.5" /> Open
                                                </a>
                                                <a href={fullUrl} download
                                                    className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200 transition">
                                                    <Download className="w-3.5 h-3.5" /> Save
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <Link href="/press/books"
                        className="inline-flex items-center gap-2 text-sm text-[#021d49] font-bold hover:underline">
                        <ArrowLeft className="w-4 h-4" /> View All Books
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
