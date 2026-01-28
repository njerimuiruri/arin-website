"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Download, FileText } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

interface Cop {
    _id: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    availableResources?: string[];
    year?: number;
}

const CopDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [cop, setCop] = useState<Cop | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchCop() {
            if (!id) return;
            try {
                const apiBaseUrl = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : '') || 'http://localhost:5001';
                const response = await fetch(`${apiBaseUrl}/api/cop/${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) throw new Error('Failed to fetch COP item');
                const data = await response.json();

                // Fix image URL to include backend base URL
                if (data.image && data.image.startsWith('/uploads')) {
                    data.image = apiBaseUrl + data.image;
                }

                setCop(data);
            } catch (err) {
                console.error('Failed to fetch COP item:', err);
                setError('Failed to load COP item');
            } finally {
                setLoading(false);
            }
        }
        fetchCop();
    }, [id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen flex items-center justify-center">
                    <div className="animate-pulse text-center">Loading COP item...</div>
                </div>
            </>
        );
    }

    if (error || !cop) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <button onClick={() => router.back()} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800">
                            <ArrowLeft size={20} /> Back
                        </button>
                        <div className="bg-red-100 text-red-700 p-4 rounded">{error || 'COP item not found'}</div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    {/* Back Button */}
                    <button onClick={() => router.back()} className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800">
                        <ArrowLeft size={20} /> Back to COP
                    </button>

                    {/* Main Image */}
                    {cop.image && (
                        <div className="relative h-96 mb-8 rounded-2xl overflow-hidden shadow-2xl">
                            <img src={cop.image} alt={cop.title} className="w-full h-full object-cover" />
                            {cop.year && (
                                <div className="absolute top-4 right-4">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 font-bold rounded-full shadow-lg">
                                        {cop.year}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Content */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        {/* Title */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-6">{cop.title}</h1>

                        {/* Meta Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-[#021d49]" size={24} />
                                <div>
                                    <p className="text-sm text-gray-500">Date</p>
                                    <p className="font-semibold text-gray-900">{new Date(cop.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: cop.description }} />
                        </div>

                        {/* Available Resources */}
                        {cop.availableResources && cop.availableResources.length > 0 && (
                            <div className="mb-8 pt-8 border-t">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <FileText className="text-[#021d49]" />
                                    Available Resources
                                </h2>
                                <div className="space-y-3">
                                    {cop.availableResources.map((resource, index) => (
                                        <a
                                            key={index}
                                            href={resource.startsWith('http') ? resource : `#`}
                                            target={resource.startsWith('http') ? '_blank' : undefined}
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-colors group"
                                        >
                                            <Download className="text-blue-600 group-hover:text-blue-700" size={20} />
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{resource}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Related Content */}
                    <div className="bg-gradient-to-br from-[#021d49] to-[#0d3d6b] rounded-xl p-8 text-white text-center">
                        <h2 className="text-2xl font-bold mb-3">Explore More COP Content</h2>
                        <p className="text-gray-300 mb-6">Visit our COP page to see all policy briefs and position papers</p>
                        <button
                            onClick={() => router.push('/convening-platforms/cop')}
                            className="px-6 py-3 bg-[#021d49] text-white font-semibold rounded-lg hover:bg-[#3a8aa6] transition-colors"
                        >
                            Back to All COP Content
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CopDetailPage;
