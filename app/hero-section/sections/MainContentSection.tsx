"use client";
import { ArrowRight, Calendar, MapPin, Users, ChevronLeft, ChevronRight, FileText, Download, Eye, Clock, Tag } from "lucide-react";
import React, { useState } from "react";

const upcomingEvent = {
    title: "Annual African Research Summit 2026",
    date: "March 15-17, 2026",
    location: "Nairobi, Kenya",
    attendees: "500+",
    description: "Join leading researchers from across Africa for three days of knowledge sharing and collaboration"
};

const latestDocuments = [
    {
        category: "Technical Report",
        title: "AI in African Healthcare: Opportunities and Challenges",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
        author: "Dr. Amina Okafor",
        date: "Jan 10, 2026",
        downloads: "234",
        pages: "45 pages",
        tag: "Healthcare"
    },
    {
        category: "Policy Brief",
        title: "Sustainable Agriculture Policy Framework for East Africa",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400&q=80",
        author: "Prof. James Mwangi",
        date: "Jan 8, 2026",
        downloads: "189",
        pages: "12 pages",
        tag: "Agriculture"
    },
    {
        category: "News Brief",
        title: "Breakthrough in Renewable Energy Research at ARIN Conference",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80",
        author: "Dr. Sarah Nkomo",
        date: "Jan 5, 2026",
        downloads: "412",
        pages: "8 pages",
        tag: "Energy"
    }
];

const MainContentSection = () => {
    const [currentDoc, setCurrentDoc] = useState(0);
    const nextDoc = () => setCurrentDoc((prev) => (prev + 1) % latestDocuments.length);
    const prevDoc = () => setCurrentDoc((prev) => (prev - 1 + latestDocuments.length) % latestDocuments.length);

    return (
        <div className="relative bg-white py-20">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute top-20 right-0 w-96 h-96 bg-[#021d49] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#021d49] rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Trust Badge & Headline */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full shadow-md border border-emerald-200 mb-6 animate-fadeIn">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-gray-700 font-semibold">
                            Trusted by 500+ African Researchers across 35 countries
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#021d49] mb-6 leading-tight animate-fadeIn delay-100">
                        Transforming Africa Through{' '}
                        <span className="gradient-text">Research Excellence</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed animate-fadeIn delay-200">
                        ARIN provides a peer review platform where best research and impact practices from different African contexts are shared, profiled, and leveraged to inform transformative policy action across climate change, knowledge management, science, technology, and innovation.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-fadeIn delay-300">
                    <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="text-5xl font-bold gradient-text mb-2">500+</div>
                        <div className="text-gray-700 font-semibold">Active Researchers</div>
                    </div>
                    <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="text-5xl font-bold gradient-text mb-2">35</div>
                        <div className="text-gray-700 font-semibold">African Countries</div>
                    </div>
                    <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="text-5xl font-bold gradient-text mb-2">1000+</div>
                        <div className="text-gray-700 font-semibold">Research Publications</div>
                    </div>
                </div>

                {/* Event & Document Section */}
                <div className="grid lg:grid-cols-2 gap-8 mb-20">
                    {/* Upcoming Event Card */}
                    <div className="bg-gradient-to-br from-[#021d49] via-[#032a5f] to-[#021d49] rounded-3xl p-8 shadow-2xl animate-scaleIn delay-400">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6">
                            <Calendar className="w-4 h-4" />
                            Upcoming Event
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 leading-tight">
                            {upcomingEvent.title}
                        </h3>

                        <p className="text-white/80 mb-6">
                            {upcomingEvent.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-xs text-white/70">Date</div>
                                    <div className="text-white font-semibold">{upcomingEvent.date}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-xs text-white/70">Location</div>
                                    <div className="text-white font-semibold">{upcomingEvent.location}</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-xs text-white/70">Expected Attendees</div>
                                    <div className="text-white font-semibold">{upcomingEvent.attendees} Researchers</div>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-4 bg-white hover:bg-gray-100 text-[#021d49] font-bold rounded-xl transition-all hover:shadow-xl group">
                            <span className="flex items-center justify-center gap-2">
                                Register Now
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>

                    {/* Latest Document Card */}
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn delay-500">
                        <div className="relative h-64 overflow-hidden group">
                            <img
                                src={latestDocuments[currentDoc].image}
                                alt={latestDocuments[currentDoc].title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                            <div className="absolute top-6 left-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#021d49] backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                                    <FileText className="w-4 h-4" />
                                    {latestDocuments[currentDoc].category}
                                </div>
                            </div>

                            <div className="absolute top-6 right-6">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[#021d49] text-xs font-semibold">
                                    <Tag className="w-3 h-3" />
                                    {latestDocuments[currentDoc].tag}
                                </div>
                            </div>

                            <button
                                onClick={prevDoc}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 text-[#021d49]" />
                            </button>
                            <button
                                onClick={nextDoc}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <ChevronRight className="w-5 h-5 text-[#021d49]" />
                            </button>
                        </div>

                        <div className="p-8">
                            <h3 className="text-2xl font-bold text-[#021d49] mb-4 leading-tight min-h-[4rem]">
                                {latestDocuments[currentDoc].title}
                            </h3>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#021d49] to-[#0a4d8f] rounded-full flex items-center justify-center text-white font-bold">
                                        {latestDocuments[currentDoc].author.split(' ')[1][0]}
                                    </div>
                                    <span className="font-semibold">{latestDocuments[currentDoc].author}</span>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {latestDocuments[currentDoc].date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        {latestDocuments[currentDoc].pages}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        {latestDocuments[currentDoc].downloads}
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 mb-6">
                                {latestDocuments.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentDoc(index)}
                                        className={`h-2 rounded-full transition-all ${currentDoc === index
                                            ? 'bg-[#021d49] w-8'
                                            : 'bg-gray-300 w-2 hover:bg-gray-400'
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-gradient-to-r from-[#021d49] to-[#0a4d8f] hover:from-[#021d49]/90 hover:to-[#0a4d8f]/90 text-white font-semibold rounded-xl transition-all hover:shadow-lg">
                                    <span className="flex items-center justify-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        View
                                    </span>
                                </button>
                                <button className="flex-1 py-3 bg-white hover:bg-gray-50 text-[#021d49] font-semibold rounded-xl border-2 border-gray-200 hover:border-[#021d49] transition-all">
                                    <span className="flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Download
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContentSection;
