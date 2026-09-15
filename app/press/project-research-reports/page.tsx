"use client";
import React from 'react';
import { ClipboardList, Compass, TrendingUp, CheckCircle2, Users2 } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

const reportTypes = [
    {
        icon: Compass,
        title: 'Inception Reports',
        description: 'Outlining research design and stakeholder engagement plans at the start of a project.',
    },
    {
        icon: TrendingUp,
        title: 'Mid-Term Reviews',
        description: 'Capturing progress, emerging insights, and course corrections partway through the project cycle.',
    },
    {
        icon: CheckCircle2,
        title: 'Final Evaluations',
        description: 'Detailing impact, lessons learned, and recommendations at project close.',
    },
    {
        icon: Users2,
        title: 'Community-Engaged Research Reports',
        description: 'Co-produced with local actors, grounding findings in lived community experience.',
    },
];

const ProjectResearchReportsPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#f5f4f0]">
                {/* Hero */}
                <section className="bg-[#021d49]">
                    <div className="max-w-7xl mx-auto px-6 py-14 flex flex-col md:flex-row md:items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                            <ClipboardList className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold text-white">Project Research Reports</h1>
                            <p className="text-blue-200 text-sm mt-2 max-w-2xl leading-relaxed">
                                Comprehensive documentation of research activities, methods, community engagement, and findings throughout the project cycle.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Report types */}
                <section className="max-w-7xl mx-auto px-6 py-14">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What This Includes</h2>
                    <div className="grid md:grid-cols-2 gap-6 mb-16">
                        {reportTypes.map(({ icon: Icon, title, description }) => (
                            <div key={title} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[#021d49]/8 flex items-center justify-center shrink-0">
                                    <Icon className="w-6 h-6 text-[#021d49]" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Coming soon / submissions */}
                    <div className="bg-[#021d49] rounded-2xl p-10 text-white text-center">
                        <h2 className="text-2xl font-bold mb-3">Published Reports Coming Soon</h2>
                        <p className="text-blue-200 text-sm max-w-2xl mx-auto leading-relaxed mb-6">
                            We are curating our library of project research reports for publication here. In the meantime, researchers and project teams looking to publish through ARIN Press can reach out to our team.
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

export default ProjectResearchReportsPage;
