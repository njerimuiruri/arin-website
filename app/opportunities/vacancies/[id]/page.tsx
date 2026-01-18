"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Briefcase } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

interface Vacancy {
    _id: string;
    positionName: string;
    employmentType: string;
    description: string;
    image?: string;
    datePosted?: string;
    deadline?: string;
}

const VacancyDetailPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [vacancy, setVacancy] = useState<Vacancy | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        fetchVacancy(id as string);
    }, [id]);

    const fetchVacancy = async (vacancyId: string) => {
        try {
            const apiBaseUrl = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_API_BASE_URL : '') || 'http://localhost:5001';
            const response = await fetch(`${apiBaseUrl}/vacancies/${vacancyId}`);
            if (!response.ok) throw new Error('Failed to fetch vacancy');
            const data = await response.json();

            const fixed: Vacancy = {
                ...data,
                image: data.image && data.image.startsWith('/uploads') ? apiBaseUrl + data.image : data.image,
            };

            setVacancy(fixed);
        } catch (error) {
            console.error('Error fetching vacancy:', error);
            setVacancy(null);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-stone-50">
                    <div className="animate-pulse text-center">Loading vacancy...</div>
                </div>
            </>
        );
    }

    if (!vacancy) {
        return (
            <>
                <Navbar />
                <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-stone-50">
                    <div className="text-center space-y-4">
                        <p className="text-lg text-gray-700">Vacancy not found.</p>
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
                        <ArrowLeft className="w-4 h-4" /> Back to vacancies
                    </button>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                        {vacancy.image && (
                            <div className="relative h-72 w-full overflow-hidden">
                                <img src={vacancy.image} alt={vacancy.positionName} className="w-full h-full object-cover" />
                            </div>
                        )}

                        <div className="p-8 space-y-6">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-full text-sm">
                                    <Briefcase className="w-4 h-4" /> {vacancy.employmentType}
                                </span>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-3">{vacancy.positionName}</h1>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    {vacancy.datePosted && (
                                        <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /> Posted: {new Date(vacancy.datePosted).toLocaleDateString()}</span>
                                    )}
                                    {vacancy.deadline && (
                                        <span className="inline-flex items-center gap-2 text-red-600"><Calendar className="w-4 h-4" /> Deadline: {new Date(vacancy.deadline).toLocaleDateString()}</span>
                                    )}
                                </div>
                            </div>

                            <div className="prose max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: vacancy.description }} />
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default VacancyDetailPage;
