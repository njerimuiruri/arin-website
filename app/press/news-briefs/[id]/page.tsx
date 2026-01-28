"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getNewsBriefById } from "@/services/newsBriefsService";
import Navbar from "@/app/navbar/Navbar";
import { Calendar, Users } from "lucide-react";

export default function NewsBriefDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const [brief, setBrief] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBrief() {
            setLoading(true);
            const data = await getNewsBriefById(id);
            setBrief(data);
            setLoading(false);
        }
        if (id) fetchBrief();
    }, [id]);

    if (loading) return <div className="p-8">Loading...</div>;
    if (!brief) return <div className="p-8 text-red-600">News brief not found.</div>;

    return (
        <>
            <Navbar />
            <div className="max-w-3xl mx-auto px-4 py-12">
                {(brief.image || brief.coverImage) && (
                    <img
                        src={brief.image || brief.coverImage}
                        alt={brief.title}
                        className="w-full h-64 object-cover rounded mb-6"
                    />
                )}
                <h1 className="text-3xl font-bold mb-2">{brief.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-[#021d49]" />
                        {brief.datePosted ? new Date(brief.datePosted).toLocaleDateString() : ""}
                    </span>
                    {brief.authors && brief.authors.length > 0 && (
                        <span className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-[#021d49]" />
                            {brief.authors.join(", ")}
                        </span>
                    )}
                </div>
                <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: brief.description }} />
                {brief.availableResources && brief.availableResources.length > 0 && (
                    <div className="mb-4">
                        <h2 className="font-semibold mb-2">Resources</h2>
                        <ul className="list-disc pl-5">
                            {brief.availableResources.map((url: string, i: number) => (
                                <li key={i}>
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {url.split("/").pop()}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
