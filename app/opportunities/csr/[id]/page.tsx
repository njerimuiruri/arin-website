"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Heart, FileText } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

interface Csr {
    _id: string;
    title: string;
    description: string;
    image?: string;
    availableResources?: string[];
}

const CsrDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [csr, setCsr] = useState<Csr | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetchCsr(id as string);
    }, [id]);

    const fetchCsr = async (csrId: string) => {
        try {
            const apiBaseUrl = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : '') || 'http://localhost:5001';
            const response = await fetch(`${apiBaseUrl}/api/csr/${csrId}`);
            if (!response.ok) throw new Error('Failed to fetch CSR activity');
            const data = await response.json();

            const fixed: Csr = {
                ...data,
                image: data.image && data.image.startsWith('/uploads') ? apiBaseUrl + data.image : data.image,
                availableResources: Array.isArray(data.availableResources)
                    ? data.availableResources.map((res: string) => res && res.startsWith('/uploads') ? apiBaseUrl + res : res)
                    : [],
            };

            setCsr(fixed);
        } catch (error) {
            console.error('Error fetching CSR activity:', error);
            setCsr(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-stone-50">
                    <div className="animate-pulse text-center">Loading activity...</div>
                </div>
            </>
        );
    }

    if (!csr) {
        return (
            <>
                <Navbar />
                <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-stone-50">
                    <div className="text-center space-y-4">
                        <p className="text-lg text-gray-700">CSR activity not found.</p>
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#021d49] text-white rounded-lg hover:bg-[#062a66]"
                        >
                            <ArrowLeft className="w-4 h-4" /> Go Back
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                <section className="max-w-6xl mx-auto px-6 py-12">
                    <button
                        onClick={() => router.back()}
                        className="mb-6 inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to CSR
                    </button>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        {csr.image && (
                            <div className="relative h-72 w-full overflow-hidden">
                                <img src={csr.image} alt={csr.title} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="p-8 space-y-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-full text-sm">
                                    <Heart className="w-4 h-4" /> Community Impact
                                </span>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">{csr.title}</h1>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /> Updated: {new Date().toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: csr.description }} />

                            {csr.availableResources && csr.availableResources.length > 0 && (
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                                        <FileText className="w-5 h-5" /> Resources
                                    </h3>
                                    <div className="space-y-2">
                                        {csr.availableResources.map((res, idx) => (
                                            <a
                                                key={idx}
                                                href={res}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-[#021d49] hover:text-[#46a1bb]"
                                            >
                                                <FileText className="w-4 h-4" />
                                                <span>{res.split('/').pop()}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default CsrDetailPage;
