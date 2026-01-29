"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/navbar/Navbar";
import { getCapacityProject } from "@/services/capacityBuildingService";
import Footer from "@/app/footer/Footer";

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const buildImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:5001${imagePath}`;
};

const buildResourceUrl = (resourcePath) => {
    if (resourcePath.startsWith("http")) return resourcePath;
    return `http://localhost:5001${resourcePath}`;
};

const extractTextFromHtml = (html, maxLength = 150) => {
    if (!html) return "";
    if (typeof window === "undefined") return html;
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const CapacityBuildingDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id;
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            try {
                const data = await getCapacityProject(id);
                setProject(data);
            } catch (error) {
                setProject(null);
            } finally {
                setLoading(false);
            }
        }
        if (id) fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#021d49] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading project details...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600 text-lg mb-4">Project not found</p>
                    <button onClick={() => router.back()} className="text-[#021d49] hover:underline">
                        Back to All Programs
                    </button>
                </div>
            </div>
        );
    }

    const img = buildImageUrl(project.image);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
                {/* Hero Section */}
                <div className="relative h-96 bg-gradient-to-r from-[#021d49] to-[#021d49] overflow-hidden">
                    <div className="absolute inset-0 bg-black/40" />
                    {img && (
                        <div className="absolute inset-0">
                            <img src={img} alt={project.title} className="w-full h-full object-cover opacity-30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
                    <div className="relative max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap gap-4 items-center mb-2">
                            {project.status && (
                                <span className="inline-block bg-white/80 text-[#021d49] px-3 py-1 rounded-full text-xs font-semibold">
                                    {project.status}
                                </span>
                            )}
                            {project.date && (
                                <span className="inline-block bg-white/80 text-[#021d49] px-3 py-1 rounded-full text-xs font-semibold">
                                    {formatDate(project.date)}
                                </span>
                            )}
                            {project.location && (
                                <span className="inline-block bg-white/80 text-[#021d49] px-3 py-1 rounded-full text-xs font-semibold">
                                    {project.location}
                                </span>
                            )}
                        </div>
                        <p className="text-white/90 max-w-2xl text-lg drop-shadow-lg">
                            {extractTextFromHtml(project.description, 200)}
                        </p>
                    </div>
                </div>
                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Project Details */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-[#021d49] mb-4">Project Overview</h2>
                            <div className="prose max-w-none text-gray-800 mb-6" dangerouslySetInnerHTML={{ __html: project.description }} />
                            {project.objectives && project.objectives.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-[#021d49] mb-2">Objectives</h3>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {project.objectives.map((obj, idx) => (
                                            <li key={idx}>{obj}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.outcomes && project.outcomes.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-[#021d49] mb-2">Outcomes</h3>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {project.outcomes.map((out, idx) => (
                                            <li key={idx}>{out}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.partners && project.partners.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-[#021d49] mb-2">Partners</h3>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {project.partners.map((partner, idx) => (
                                            <li key={idx}>{partner}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {project.projectTeam && project.projectTeam.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-[#021d49] mb-2">Project Team</h3>
                                    <ul className="list-disc pl-5 text-gray-700">
                                        {project.projectTeam.map((member, idx) => (
                                            <li key={idx}>{member}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {/* Sidebar */}
                        <div>
                            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 mb-6">
                                <h3 className="text-lg font-bold text-[#021d49] mb-4">Project Details</h3>
                                <ul className="text-gray-700 text-sm space-y-2">
                                    {project.status && (
                                        <li><span className="font-semibold">Status:</span> {project.status}</li>
                                    )}
                                    {project.date && (
                                        <li><span className="font-semibold">Date:</span> {formatDate(project.date)}</li>
                                    )}
                                    {project.location && (
                                        <li><span className="font-semibold">Location:</span> {project.location}</li>
                                    )}
                                    {project.year && (
                                        <li><span className="font-semibold">Year:</span> {project.year}</li>
                                    )}
                                </ul>
                            </div>
                            {project.availableResources && project.availableResources.length > 0 && (
                                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                                    <h3 className="text-lg font-bold text-[#021d49] mb-4">Available Resources</h3>
                                    <ul className="space-y-2">
                                        {project.availableResources.map((res, idx) => (
                                            <li key={idx}>
                                                <a href={buildResourceUrl(res)} target="_blank" rel="noopener noreferrer" className="text-[#0a4d8f] hover:underline">
                                                    Resource {idx + 1}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-8">
                        <button onClick={() => router.back()} className="text-[#021d49] hover:underline">
                            &larr; Back to All Programs
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CapacityBuildingDetailPage;
