"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Download, Share2, Clock, FileText, Users } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getPolicyDialogue } from '@/services/policyDialoguesService';

const PolicyDialogueDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [dialogue, setDialogue] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        return img.startsWith('http') ? img : `https://api.demo.arin-africa.org${img}`;
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

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white min-h-screen">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-[#021d49] to-[#021d49] text-white">
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <button
                            onClick={() => router.push('/convening-platforms/policy-dialogues')}
                            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 font-medium transition-all hover:gap-3 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Policy Dialogues
                        </button>
                    </section>
                </div>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* Image Section */}
                                {img && (
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={img}
                                            alt={dialogue.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-4 py-2 ${getStatusColor(dialogue.status)} rounded-full font-semibold text-sm backdrop-blur-sm border shadow-lg flex items-center gap-2`}>
                                                <span>{getStatusIcon(dialogue.status)}</span>
                                                {dialogue.status}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Title and Date Section */}
                                <div className="p-8">
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                                        {dialogue.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <Calendar className="w-5 h-5 text-[#021d49]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Date</p>
                                                <p className="text-sm font-semibold text-gray-900">{formatDate(dialogue.date)}</p>
                                            </div>
                                        </div>

                                        {dialogue.availableResources && dialogue.availableResources.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-green-50 rounded-lg">
                                                    <FileText className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Resources</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {dialogue.availableResources.length} file{dialogue.availableResources.length > 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[#021d49]/10 rounded-lg">
                                        <FileText className="w-6 h-6 text-[#021d49]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                                </div>
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: dialogue.description || '' }}
                                />
                            </div>

                            {/* Available Resources Card */}
                            {dialogue.availableResources && dialogue.availableResources.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-green-50 rounded-lg">
                                            <Download className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Available Resources</h2>
                                    </div>
                                    <div className="grid gap-3">
                                        {dialogue.availableResources.map((resource: string, idx: number) => {
                                            const resourceUrl = resource.startsWith('http') ? resource : `https://api.demo.arin-africa.org${resource}`;
                                            const fileName = resource.split('/').pop() || `Resource ${idx + 1}`;
                                            return (
                                                <a
                                                    key={idx}
                                                    href={resourceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-[#021d49] hover:bg-blue-50/50 transition-all group"
                                                >
                                                    <div className="p-3 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-lg group-hover:scale-110 transition-transform">
                                                        <Download className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-semibold text-gray-900 truncate">{fileName}</p>
                                                        <p className="text-xs text-gray-500">Click to download</p>
                                                    </div>
                                                    <span className="text-xs px-3 py-1.5 bg-red-100 text-red-700 rounded-full font-medium">PDF</span>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <span className="text-2xl">📋</span>
                                    Quick Info
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200">
                                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider mb-2">Status</p>
                                        <div className={`px-3 py-2 ${getStatusColor(dialogue.status)} rounded-lg font-bold text-sm inline-flex items-center gap-2`}>
                                            <span className="text-base">{getStatusIcon(dialogue.status)}</span>
                                            {dialogue.status}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200">
                                        <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-2">Event Date</p>
                                        <p className="font-bold text-gray-900 text-lg">{formatDate(dialogue.date)}</p>
                                    </div>

                                    {dialogue.availableResources && dialogue.availableResources.length > 0 && (
                                        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl border border-green-200">
                                            <p className="text-xs text-green-600 font-semibold uppercase tracking-wider mb-2">Resources</p>
                                            <p className="font-bold text-gray-900 text-lg">
                                                {dialogue.availableResources.length} document{dialogue.availableResources.length > 1 ? 's' : ''}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Share Card */}
                            <div className="bg-gradient-to-br from-[#021d49] via-[#2d7a8f] to-[#021d49] rounded-2xl shadow-lg p-6 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                                        <Share2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">Share This</h3>
                                </div>
                                <p className="text-white/90 text-sm leading-relaxed mb-5">
                                    Share this policy dialogue with colleagues and stakeholders to spread awareness and foster meaningful discussions.
                                </p>
                                <button className="w-full py-3 bg-white text-[#021d49] rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg">
                                    Share Now
                                </button>
                            </div>

                            {/* Help Card */}
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200 p-6">
                                <div className="text-center mb-3">
                                    <span className="text-4xl">💡</span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Need More Info?</h3>
                                <p className="text-sm text-gray-700 text-center mb-4">
                                    Have questions about this policy dialogue? We're here to help!
                                </p>
                                <button className="w-full py-2.5 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                                    Contact Us
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default PolicyDialogueDetailPage;