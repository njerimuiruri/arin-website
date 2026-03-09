"use client";
import { FileText, Calendar, ArrowRight, User, Search } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Link from "next/link";
import { workingPaperSeriesService } from '@/services/workingPaperSeriesService';
import React, { useState, useEffect } from 'react';
import Footer from '@/app/footer/Footer';

export default function WorkingPapersPage() {
    const [papers, setPapers] = useState<any[]>([]);
    const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        workingPaperSeriesService.getAll().then(setPapers).catch(() => setPapers([]));
    }, []);

    const today = new Date();
    today.setHours(23, 59, 59, 999);
    const visiblePapers = papers
        .filter(p => !p.datePosted || new Date(p.datePosted) <= today)
        .filter(p =>
            !searchTerm ||
            (p.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (Array.isArray(p.authors) ? p.authors.join(', ') : (p.authors || '')).toLowerCase().includes(searchTerm.toLowerCase()) ||
            (p.description || '').replace(/<[^>]+>/g, '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    const handleToggle = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };
    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Compact Dark Navy Hero Banner */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                    <div className="relative max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">Working Paper Series</h1>
                                <p className="text-sm text-blue-100 mt-1">Preliminary research findings and analyses on critical issues in climate adaptation and sustainable development</p>
                            </div>
                            <div className="w-full md:max-w-sm">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search working papers..."
                                            value={searchTerm}
                                            onChange={(e) => { setSearchTerm(e.target.value); }}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#021d49] focus:outline-none transition-all text-gray-800 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cards Grid */}
                <section className="max-w-7xl mx-auto px-6 py-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visiblePapers.map((paper: any) => (
                            <Link
                                key={String(paper._id)}
                                href={`/press/working-papers/${String(paper._id)}`}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] group flex flex-col"
                            >
                                <div className="relative h-48 overflow-hidden bg-linear-to-br from-[#021d49] to-[#021d49]">
                                    {paper.image ? (
                                        <>
                                            <img
                                                src={paper.image.startsWith('http') ? paper.image : `https://api.demo.arin-africa.org${paper.image}`}
                                                alt={paper.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"></div>
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
                                            const showAll = expanded[String(paper._id)];
                                            const displayText = showAll ? plain : words.slice(0, 40).join(' ') + (isLong ? '...' : '');
                                            return <>
                                                {displayText}
                                                {isLong && (
                                                    <button
                                                        type="button"
                                                        className="ml-2 text-blue-600 underline text-xs focus:outline-none"
                                                        onClick={e => { e.preventDefault(); handleToggle(String(paper._id)); }}
                                                    >
                                                        {showAll ? 'View Less' : 'View More'}
                                                    </button>
                                                )}
                                            </>;
                                        })() : <em>No description provided.</em>}
                                    </div>
                                    {Array.isArray(paper.availableResources) && paper.availableResources.length > 0 && (
                                        <div className="mb-2">
                                            <span className="font-semibold text-xs text-gray-700">Resources:</span>
                                            <ul className="list-disc ml-4">
                                                {paper.availableResources.map((url: string, idx: number) => (
                                                    <li key={idx}>
                                                        <a href={url.startsWith('http') ? url : `https://api.demo.arin-africa.org${url}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-xs">Resource {idx + 1}</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    <span className="mt-auto w-full px-4 py-3 bg-linear-to-r from-[#021d49] to-[#021d49] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200">
                                        <span>Read Paper</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {visiblePapers.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Working Papers Found</h3>
                            <p className="text-gray-600">No working papers are available at this time.</p>
                        </div>
                    )}
                </section>

                {/* Why Explore Working Papers Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-linear-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Explore ARIN Working Papers?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <FileText className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Preliminary Research</h3>
                                <p className="text-gray-300 text-sm">Access early-stage research findings and emerging insights.</p>
                            </div>
                            <div className="text-center">
                                <User className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Expert Analysis</h3>
                                <p className="text-gray-300 text-sm">Benefit from in-depth analyses by ARIN researchers.</p>
                            </div>
                            <div className="text-center">
                                <Calendar className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Current Topics</h3>
                                <p className="text-gray-300 text-sm">Explore timely research on pressing development challenges.</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            ARIN's Working Paper Series provides preliminary research findings that contribute to policy dialogue and academic discourse on climate adaptation, sustainable agriculture, and development in Africa.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}
