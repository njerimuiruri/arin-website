"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, FileText, Download, Search, Filter, User } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const AnnualReportsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    const reports = [
        {
            id: 'annual-report-2023',
            title: 'ARIN ANNUAL REPORT 2023',
            date: 'June 10, 2025',
            year: '2023',
            author: 'Awino',
            excerpt: 'This document encapsulates our collective journey in advancing knowledge, fostering innovation, and making a meaningful impact on society.  At…',
            tags: ['Annual Reports', 'Publications'],
            image: '/annualreport2023.png',
            pdfLink: '/documents/ARIN-Annual-Report-2023.pdf'
        },
        {
            id: 'annual-report-2022',
            title: 'ARIN ANNUAL REPORT 2022',
            date: 'April 22, 2023',
            year: '2022',
            author: 'Erick',
            excerpt: 'This report provides the key highlights and achievements realised by the Africa Research & Impact Network (ARIN) during the year 2022. The report highlights some of the project activities…',
            tags: ['Annual Reports', 'Publications'],
            image: '/annualreport2022.png',
            pdfLink: '/documents/ARIN-ANNUAL-REPORT-2022_Consolidating-Research-Evidence-for-Impact.pdf'
        }
    ];

    const years = ['All', '2023', '2022'];

    const filteredReports = reports.filter(report => {
        const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesYear = selectedYear === 'All' || report.year === selectedYear;
        return matchesSearch && matchesYear;
    });

    const handleReportClick = (reportId) => {
        console.log('Navigate to report:', reportId);
        alert(`Navigate to report: ${reportId}\n\nIn your Next.js app, use:\nrouter.push(\`/annual-reports/${reportId}\`)`);
    };

    const handleDownloadPDF = (e, pdfLink, title) => {
        e.stopPropagation();
        console.log('Download PDF:', pdfLink);
        alert(`Downloading: ${title}\n\nIn your Next.js app, this will download the PDF from:\n${pdfLink}`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <FileText className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Annual{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Reports
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Explore ARIN's journey of impact, innovation, and achievement through our comprehensive annual reports
                        </p>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search annual reports..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Year Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reports Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {filteredReports.map((report) => (
                            <div
                                key={report.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleReportClick(report.id)}
                            >
                                {/* Report Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={report.image}
                                        alt={report.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                                    {/* Year Badge - Top Left */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-4 py-2 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-lg uppercase tracking-wide rounded-lg shadow-xl">
                                            {report.year}
                                        </span>
                                    </div>

                                    {/* Download Button - Top Right */}
                                    <button
                                        onClick={(e) => handleDownloadPDF(e, report.pdfLink, report.title)}
                                        className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg group/download"
                                        aria-label="Download PDF"
                                    >
                                        <Download className="w-5 h-5 text-[#46a1bb] group-hover/download:scale-110 transition-transform" />
                                    </button>

                                    {/* Title on Image - Bottom */}
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-2xl font-bold text-white leading-tight">
                                            {report.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Author and Date */}
                                    <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <User className="w-4 h-4 text-[#46a1bb]" />
                                            <span>Posted by {report.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                            <span>{report.date}</span>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                        {report.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {report.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleReportClick(report.id); }}
                                            className="px-4 py-3 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-lg shadow-md hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <span>Continue Reading</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={(e) => handleDownloadPDF(e, report.pdfLink, report.title)}
                                            className="px-4 py-3 bg-white border-2 border-[#46a1bb] text-[#46a1bb] font-semibold rounded-lg hover:bg-[#46a1bb] hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Download PDF</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredReports.length === 0 && (
                        <div className="text-center py-16">
                            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No annual reports found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>


            </div>

        </>
    );
};

export default AnnualReportsPage;