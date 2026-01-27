"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from '@/app/navbar/Navbar';
import { Mail, Calendar, User } from 'lucide-react';

export default function NewsletterDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [newsletter, setNewsletter] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        import('@/services/newslettersService').then(({ newslettersService }) => {
            newslettersService.getById(id)
                .then((data) => {
                    setNewsletter(data);
                    setError(null);
                })
                .catch((err) => setError(err.message || 'Failed to load newsletter'))
                .finally(() => setLoading(false));
        });
    }, [id]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (error) return <div className="p-8 text-red-600">{error}</div>;
    if (!newsletter) return <div className="p-8">Newsletter not found.</div>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 p-4 md:p-8">
                <div className="max-w-2xl mx-auto space-y-8">
                    <div className="bg-white rounded-2xl shadow-lg border-2 p-8">
                        <h1 className="text-3xl font-bold mb-4">{newsletter.title}</h1>
                        {newsletter.image && (
                            <div className="mb-4">
                                <img src={newsletter.image} alt="Cover" className="w-full max-w-md h-auto rounded-lg shadow-md" />
                            </div>
                        )}
                        {newsletter.authors && newsletter.authors.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {newsletter.authors.map((author: string, idx: number) => (
                                    <span key={idx} className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200"><User className="w-4 h-4 mr-1" />{author}</span>
                                ))}
                            </div>
                        )}
                        <div className="mb-4 text-gray-500 text-sm flex gap-4">
                            {newsletter.year && <span>Year: {newsletter.year}</span>}
                            {newsletter.datePosted && <span>Date: {new Date(newsletter.datePosted).toLocaleDateString()}</span>}
                        </div>
                        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: newsletter.description }} />
                        <button onClick={() => router.back()} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Back</button>
                    </div>
                </div>
            </div>
        </>
    );
}
