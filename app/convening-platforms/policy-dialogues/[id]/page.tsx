"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Calendar, Check, Download, Share2, FileText } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { API_CONFIG } from '@/lib/apiConfig';
import { getPolicyDialogue } from '@/services/policyDialoguesService';

const PolicyDialogueDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [dialogue, setDialogue] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchDialogue() {
            if (!id) return;
            try {
                const data = await getPolicyDialogue(id);
                if (!data) {
                    setError('Policy dialogue not found');
                } else {
                    setDialogue(data);
                }
            } catch (err) {
                console.error('Failed to fetch dialogue:', err);
                setError('Failed to load policy dialogue');
            } finally {
                setLoading(false);
            }
        }
        fetchDialogue();
    }, [id]);

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const buildImageUrl = (img?: string) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Ongoing':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Completed':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Incomplete':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Ongoing':
                return '🔄';
            case 'Completed':
                return '✓';
            case 'Incomplete':
                return '⏳';
            default:
                return '●';
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white min-h-screen">
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#021d49] border-t-transparent mx-auto"></div>
                            <p className="text-gray-600 mt-6 text-lg font-medium">Loading policy dialogue...</p>
                        </div>
                    </section>
                </div>
            </>
        );
    }

    if (error || !dialogue) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white min-h-screen">
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-[#021d49] hover:text-[#021d49] mb-8 font-semibold transition-all hover:gap-3"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="text-6xl mb-4">😞</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">{error || 'Policy Dialogue Not Found'}</h2>
                            <p className="text-gray-600 text-lg mb-6">The policy dialogue you're looking for doesn't exist or has been removed.</p>
                            <button
                                onClick={() => router.push('/convening-platforms/policy-dialogues')}
                                className="px-6 py-3 bg-[#021d49] text-white rounded-lg hover:bg-[#021d49] transition-colors font-semibold"
                            >
                                View All Dialogues
                            </button>
                        </div>
                    </section>
                </div>
            </>
        );
    }

    const img = buildImageUrl(dialogue.image);
    const resources: { url: string; name: string }[] = (dialogue.availableResources || []).map((resource: string, idx: number) => ({
        url: resource.startsWith('http') ? resource : `${API_CONFIG.BASE_URL}${resource}`,
        name: decodeURIComponent(resource.split('/').pop() || `Resource ${idx + 1}`)
            .replace(/\.pdf$/i, '')
            .replace(/[_-]+/g, ' ')
            .trim(),
    }));
    const primaryResource = resources[0];

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title: dialogue.title, url });
            } catch {
                // user dismissed the share sheet
            }
            return;
        }
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-slate-50 min-h-screen">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-[#021d49] text-white">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#00c4b3]/10 blur-3xl" />
                    <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-[#3a8ba0]/20 blur-3xl" />

                    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-6 lg:pb-8">
                        <button
                            onClick={() => router.push('/convening-platforms/policy-dialogues')}
                            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 text-sm font-medium transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Policy Dialogues
                        </button>

                        <div className="grid lg:grid-cols-[1fr_170px] gap-6 lg:gap-10 items-center">
                            <div>
                                <p className="text-[#00c4b3] text-xs font-semibold uppercase tracking-[0.2em] mb-2">Policy Dialogue</p>
                                <h1 className="text-xl sm:text-2xl lg:text-[1.75rem] font-bold leading-snug mb-3">
                                    {dialogue.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    <span className={`px-3 py-1.5 ${getStatusColor(dialogue.status)} rounded-full font-semibold border inline-flex items-center gap-1.5`}>
                                        <span>{getStatusIcon(dialogue.status)}</span>
                                        {dialogue.status}
                                    </span>
                                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                                        <Calendar className="w-4 h-4 text-[#00c4b3]" />
                                        {formatDate(dialogue.date)}
                                    </span>
                                    {resources.length > 0 && (
                                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15">
                                            <FileText className="w-4 h-4 text-[#00c4b3]" />
                                            {resources.length} document{resources.length > 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
                                {primaryResource && (
                                    <a
                                        href={primaryResource.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-[#00c4b3] text-[#021d49] font-semibold hover:bg-white transition-colors shadow-lg"
                                    >
                                        <Download className="w-4 h-4" />
                                        Download Report
                                    </a>
                                )}
                            </div>

                            {/* Report cover, shown in full rather than cropped */}
                            {img && (
                                <div className="mx-auto w-full max-w-40 lg:max-w-none">
                                    <div className="rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 lg:rotate-2 hover:rotate-0 transition-transform duration-300">
                                        <img src={img} alt={dialogue.title} className="w-full h-auto block" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
                        {/* Overview */}
                        <article className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-10">
                            <h2 className="text-2xl font-bold text-[#021d49] mb-2">Overview</h2>
                            <div className="w-12 h-1 rounded-full bg-[#00c4b3] mb-8" />
                            <div
                                className="text-gray-700 text-[1.05rem] leading-8 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_p:first-child]:text-lg [&_p:first-child]:text-gray-900 [&_p:first-child]:font-medium [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#021d49] [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#021d49] [&_h3]:mt-6 [&_h3]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-5 [&_li]:mb-2 [&_a]:text-[#3a8ba0] [&_a]:underline [&_strong]:text-gray-900"
                                dangerouslySetInnerHTML={{ __html: dialogue.description || '' }}
                            />
                        </article>

                        {/* Sidebar */}
                        <aside className="space-y-6 lg:sticky lg:top-6 self-start">
                            {resources.length > 0 && (
                                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                    <h3 className="text-lg font-bold text-[#021d49] mb-4">Resources</h3>
                                    <div className="space-y-3">
                                        {resources.map((resource, idx) => (
                                            <a
                                                key={idx}
                                                href={resource.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-[#021d49] hover:bg-slate-50 transition-colors group"
                                            >
                                                <div className="shrink-0 w-11 h-11 rounded-lg bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold">
                                                    PDF
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-900 text-sm truncate">{resource.name}</p>
                                                    <p className="text-xs text-gray-500">Download report</p>
                                                </div>
                                                <Download className="w-5 h-5 text-gray-400 group-hover:text-[#021d49] transition-colors" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="bg-[#021d49] rounded-2xl p-6 text-white">
                                <h3 className="text-lg font-bold mb-2">Share this dialogue</h3>
                                <p className="text-white/75 text-sm leading-relaxed mb-5">
                                    Pass it on to colleagues and stakeholders working on climate adaptation.
                                </p>
                                <button
                                    onClick={handleShare}
                                    className="w-full py-2.5 inline-flex items-center justify-center gap-2 bg-white text-[#021d49] rounded-lg font-semibold hover:bg-[#00c4b3] transition-colors"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                    {copied ? 'Link copied' : 'Share'}
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                                <h3 className="text-lg font-bold text-[#021d49] mb-2">Questions?</h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    Get in touch with the ARIN team to learn more about this dialogue.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3a8ba0] hover:text-[#021d49] transition-colors"
                                >
                                    Contact us <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </aside>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PolicyDialogueDetailPage;