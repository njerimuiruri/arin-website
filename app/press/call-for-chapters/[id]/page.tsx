"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCallById } from "@/services/callForBooksService";
import { BookOpen, Calendar, AlertCircle } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

const CallForBookDetailsPage = () => {
    const router = useRouter();
    const params = useParams();
    const { id } = params;
    const [call, setCall] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        setError(null);
        getCallById(id)
            .then(setCall)
            .catch((err) => setError(err.message || "Failed to fetch details"))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-8 text-center">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-600">{error}</div>;
    if (!call) return <div className="p-8 text-center">Call for Book Chapter not found.</div>;

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto px-6 py-12">
                <button onClick={() => router.back()} className="mb-6 text-blue-600 underline">Back</button>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-bold text-xs uppercase tracking-wide rounded-full mb-3">
                            Call for Book Chapters
                        </span>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{call.title}</h1>
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <Calendar className="w-4 h-4 text-[#021d49]" />
                            <span className="text-gray-600">
                                {call.postedDate || (call.createdAt ? new Date(call.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : "")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span className="text-gray-700 font-medium">
                                Deadline: {call.deadline ? new Date(call.deadline).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : "-"}
                            </span>
                        </div>
                    </div>
                    {call.image && (
                        <img src={call.image} alt={call.title} className="w-full h-64 object-cover rounded mb-6" />
                    )}
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-2">Description</h2>
                        {call.excerpt || call.description ? (
                            <div
                                className="text-gray-700 prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: call.excerpt || call.description }}
                            />
                        ) : (
                            <p className="text-gray-700">No description available.</p>
                        )}
                    </div>
                    {call.category && (
                        <div className="mb-4">
                            <h2 className="text-lg font-semibold mb-2">Categories</h2>
                            <div className="flex flex-wrap gap-2">
                                {call.category.split(', ').map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">{tag}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CallForBookDetailsPage;
