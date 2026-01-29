"use client";
import { FileText, Calendar, ArrowRight, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Link from "next/link";
import { workingPaperSeriesService } from '@/services/workingPaperSeriesService';
import React, { useState, useEffect } from 'react';

export default function WorkingPapersPage() {
    const [papers, setPapers] = useState<any[]>([]);
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    useEffect(() => {
        workingPaperSeriesService.getAll().then(setPapers).catch(() => setPapers([]));
    }, []);
    const handleToggle = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };
    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FileText className="w-12 h-12 text-[#021d49]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Working Paper{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Series
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Preliminary research findings and analysis exploring critical issues in climate adaptation, agriculture, and sustainable development
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#021d49] mb-1">{papers.length}</div>
                                <p className="text-sm text-gray-600">Working Papers</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">{papers.length}</div>
                                <p className="text-sm text-gray-600">Recent Publications</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-[#021d49] mb-1">{new Date().getFullYear()}</div>
                                <p className="text-sm text-gray-600">Latest Year</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {papers.map((paper) => (
                            <Link
                                key={paper._id}
                                href={`/press/working-papers/${paper._id}`}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] group flex flex-col"
                            >
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#021d49] to-[#021d49]">
                                    {paper.image ? (
                                        <>
                                            <img
                                                src={paper.image.startsWith('http') ? paper.image : `http://localhost:5001${paper.image}`}
                                                alt={paper.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <FileText className="w-16 h-16 text-white/30" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-white/90 text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-full shadow-lg">
                                            Working Paper
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-3 line-clamp-3">
                                        {paper.title}
                                    </h3>
                                    <div className="mb-4 bg-gray-50 rounded-lg p-3">
                                        <div className="flex flex-col gap-2">
                                            {paper.authors && paper.authors.length > 0 && (
                                                <div className="flex items-center gap-2 text-sm">
                                                    <User className="w-4 h-4 text-[#021d49] flex-shrink-0" />
                                                    <span className="text-gray-700">{paper.authors.join(', ')}</span>
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="w-4 h-4 text-[#021d49] flex-shrink-0" />
                                                <span className="text-gray-600">{paper.datePosted ? new Date(paper.datePosted).toLocaleDateString() : ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4 flex-grow prose max-w-none">
                                        {paper.description ? (() => {
                                            const plain = paper.description.replace(/<[^>]+>/g, '');
                                            const words = plain.split(/\s+/);
                                            const isLong = words.length > 40;
                                            const showAll = expanded[paper._id];
                                            const displayText = showAll ? plain : words.slice(0, 40).join(' ') + (isLong ? '...' : '');
                                            return <>
                                                {displayText}
                                                {isLong && (
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-blue-600 underline text-xs focus:outline-none"
                                                        onClick={e => { e.preventDefault(); handleToggle(paper._id); }}
                                                    >
                                                        {showAll ? 'View Less' : 'View More'}
                                                    </button>
                                                )}
                                            </>;
                                        })() : <em>No description provided.</em>}
                                    </div>
                                    {paper.availableResources && paper.availableResources.length > 0 && (
                                        <div className="mb-2">
                                            <span className="font-semibold text-xs text-gray-700">Resources:</span>
                                            <ul className="list-disc ml-4">
                                                {paper.availableResources.map((url, idx) => (
                                                    <li key={idx}>
                                                        <a href={url.startsWith('http') ? url : `http://localhost:5001${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">Resource {idx + 1}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <span className="mt-auto w-full px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#021d49] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200">
                                        <span>Read Paper</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {papers.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No working papers found</h3>
                            <p className="text-gray-600">No working papers are available at this time.</p>
                        </div>
                    )}
                </section>

                {/* Why Explore Working Papers Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Explore ARIN Working Papers?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <FileText className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Preliminary Research</h3>
                                <p className="text-gray-300 text-sm">Access early-stage research findings and emerging insights</p>
                            </div>
                            <div className="text-center">
                                <User className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Expert Analysis</h3>
                                <p className="text-gray-300 text-sm">Benefit from in-depth analysis by ARIN researchers</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Current Topics</h3>
                                <p className="text-gray-300 text-sm">Explore timely research on pressing development challenges</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            ARIN's working paper series provides preliminary research findings that contribute to policy dialogue and academic discourse on climate adaptation, sustainable agriculture, and development in Africa.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
