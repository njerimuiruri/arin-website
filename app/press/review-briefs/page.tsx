"use client";
import React from 'react';
import { MessagesSquare, Calendar, Lightbulb, GraduationCap } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

const highlights = [
    {
        icon: Calendar,
        title: 'Weekly Friday Review Meetings',
        description: 'Interactive learning sessions where ARIN Fellows and affiliated researchers share ongoing or completed work.',
    },
    {
        icon: Lightbulb,
        title: 'Distilled Insights',
        description: 'Briefs capture the key insights, lessons, and feedback shared in each session.',
    },
    {
        icon: GraduationCap,
        title: 'Institutional Learning',
        description: 'Supports institutional learning and informs future research and engagement across ARIN.',
    },
];

const ReviewBriefsPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#f5f4f0]">
                {/* Hero */}
                <section className="bg-[#021d49]">
                    <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                            <MessagesSquare className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">ARIN Review Briefs</h1>
                            <p className="text-blue-200 text-sm mt-2 max-w-2xl leading-relaxed">
                                Concise summaries developed from the weekly Friday Review Meetings, distilling key insights, lessons, and feedback to support institutional learning.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Highlights */}
                <section className="max-w-7xl mx-auto px-6 py-14">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How Review Briefs Come Together</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-16">
                        {highlights.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow text-center">
                                <div className="w-12 h-12 rounded-xl bg-[#021d49]/8 flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-[#021d49]" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-[#021d49] rounded-2xl p-10 text-white text-center">
                        <h2 className="text-2xl font-bold mb-3">Published Review Briefs Coming Soon</h2>
                        <p className="text-blue-200 text-sm max-w-2xl mx-auto leading-relaxed mb-6">
                            We are compiling briefs from our Friday Review Meetings for publication here. ARIN Fellows and affiliated researchers can reach out to our team to share their session outputs.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-6 py-3 bg-white text-[#021d49] font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm"
                        >
                            Get in Touch
                        </a>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ReviewBriefsPage;
