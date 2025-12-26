"use client";
import React from 'react';
import { ArrowLeft, Calendar, Users, Target, FileText, Lightbulb, TrendingUp, Award, Mail } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const ProjectDetailPage = () => {
    const project = {
        id: 'soar-2025',
        title: 'State of Adaptation Report, 2025 (SOAR,2025)',
        date: 'June 24, 2025',
        category: 'Climate Adaptation',
        status: 'Ongoing',
        tags: ['Climate Change', 'Adaptation', 'Policy'],

        background: `Africa stands at the frontline of the global climate crisis, confronting increasing risks across vital livelihood sectors, including agriculture, water, health, ecosystems, infrastructure, and human settlements. Although the continent contributes only 4% of global greenhouse gas emissions, it bears a disproportionate share of climate-related impacts. These challenges are exacerbated by structural vulnerabilities such as widespread poverty, limited institutional capacity, restricted access to finance, and significant data gaps.

Climate change is already affecting the continent and is projected to intensify. The Intergovernmental Panel on Climate Change's 6th Assessment Report (AR6) confirms that Africa is warming faster than the global average. The continent's vulnerability is further compounded by widespread poverty, limited access to basic services, governance challenges, and gender and wealth inequalities. The IPCC also highlights growing threats to food insecurity due to declining crop yields. Over 53% of the Sub-Saharan African labour force, most of whom rely on rainfed agriculture, are under threat. By 2020, more than one in five people in Africa were facing hunger, twice the global average.`,

        justification: `Despite the existence of several global and regional adaptation reports, many fail to fully capture African contexts, knowledge systems, and lived experiences. Much of the existing data is fragmented, outdated, or externally driven, limiting its utility for African decision-makers. Furthermore, adaptation finance remains insufficient and poorly aligned with the continent's real needs.

There is an urgent need for a report that is comprehensive and credible, context-specific, globally aligned, and action-oriented.`,

        aim: `The overarching aim of SoAR 2025 is to catalyse adaptation ambition and action across Africa by delivering a comprehensive, data-driven, and contextually relevant assessment of the continent's progress, challenges, and opportunities in climate adaptation, fully aligned with the GGA framework.`,

        objectives: [
            'To document and assess the status of adaptation implementation across key livelihood and ecological sectors in line with GGA thematic priorities.',
            'To generate and synthesise evidence on emerging trends, innovations, and best practices in adaptation planning, finance, and governance across local, national, and regional scales.',
            'To track the alignment of national adaptation policies (e.g., NDCs, NAPs) with continental (e.g., Agenda 2063) and global (e.g., Paris Agreement) frameworks, identifying synergies and gaps.',
            'To support strategic investment by mapping the adaptation finance landscape and identifying entry points for resource mobilisation.',
            'To promote inclusive knowledge-sharing by involving a wide range of African stakeholders, including governments, civil society, indigenous groups, academia, and the private sector.',
            'To serve as a reference document for adaptation practitioners, policymakers, and development partners striving to build resilience across Africa.'
        ],

        keyOutput: `The State of Adaptation Report 2025 (SoAR 2025) will deliver a comprehensive, African-led assessment of the continent's climate adaptation landscape. This single, integrated report will provide a continent-wide overview of adaptation progress and emerging risks. It will offer evidence-based analysis of adaptation finance flows and governance systems, assess the alignment of national and regional actions with the Global Goal on Adaptation (GGA), the Paris Agreement, and Africa's Agenda 2063, and compile successful practices and innovations from across the continent.`,

        team: [
            { name: 'Dr Joanes Atela', role: 'Principal Investigator', affiliation: 'ARIN' },
            { name: 'Mr Charles Tonui', role: 'Research Associate', affiliation: 'ARIN' },
            { name: 'Ms Edna Kowenje', role: 'Research Associate', affiliation: 'ARIN' },
            { name: 'Dr Humphrey Agevi', role: 'Senior Researcher', affiliation: 'ARIN' },
            { name: 'Dr Eurallyah Akinyi', role: 'Research Fellow', affiliation: 'ARIN' },
            { name: 'Dr. Isaiah Maket', role: 'Research Fellow', affiliation: 'ARIN' },
            { name: 'Mr Washington Kanyangi', role: 'Research Coordinator', affiliation: 'ARIN' },
            { name: 'Ms Ann Irungu', role: 'Project Officer', affiliation: 'ARIN' },
            { name: 'Ms Florence Onyango', role: 'Communications Officer', affiliation: 'ARIN' }
        ],

        stats: [
            { value: '53%', label: 'SSA labour force at risk' },
            { value: '4%', label: 'Africa\'s global emissions' },
            { value: '1 in 5', label: 'Africans facing hunger' },
            { value: '2025', label: 'Report publication year' }
        ]
    };

    const handleBack = () => {
        console.log('Navigate back to projects list');
        alert('In your Next.js app, use:\nrouter.back() or router.push("/research-projects")');
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Compact Hero Section - No Image */}
                <section className="bg-gradient-to-br from-[#021d49] via-[#46a1bb] to-[#021d49] py-8">
                    <div className="max-w-[1400px] mx-auto px-6">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors mb-6 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-semibold text-sm">Back to Projects</span>
                        </button>

                        {/* Tags and Status */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-white/30">
                                {project.category}
                            </span>
                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                                {project.status}
                            </span>
                            {project.tags.map((tag, index) => (
                                <span key={index} className="px-3 py-1 bg-[#46a1bb]/20 backdrop-blur-md text-white text-xs font-bold rounded-full border border-[#46a1bb]/30">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Title and Date */}
                        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                            {project.title}
                        </h1>
                        <div className="flex items-center gap-2 text-gray-200">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{project.date}</span>
                        </div>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-[1400px] mx-auto px-6 py-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {project.stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent mb-1">
                                        {stat.value}
                                    </div>
                                    <p className="text-xs text-gray-600">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="max-w-[1400px] mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Background */}
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <FileText className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Background</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{project.background}</p>
                            </div>

                            {/* Justification */}
                            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Lightbulb className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Justification</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-line">{project.justification}</p>
                            </div>

                            {/* Aim */}
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Aim</h2>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-sm">{project.aim}</p>
                            </div>

                            {/* Objectives */}
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <TrendingUp className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Objectives</h2>
                                </div>
                                <div className="space-y-3">
                                    {project.objectives.map((objective, index) => (
                                        <div key={index} className="flex gap-3 items-start">
                                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-md flex items-center justify-center text-white font-bold text-xs">
                                                {index + 1}
                                            </div>
                                            <p className="text-gray-700 leading-relaxed text-sm pt-0.5">{objective}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Key Output */}
                            <div className="bg-gradient-to-br from-[#021d49] to-[#46a1bb] rounded-xl p-6 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Award className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-2xl font-bold">Key Output</h2>
                                </div>
                                <p className="text-white/90 leading-relaxed text-sm">{project.keyOutput}</p>
                            </div>
                        </div>

                        {/* Right Column - Project Team */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 sticky top-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Project Team</h2>
                                </div>
                                <div className="space-y-4">
                                    {project.team.map((member, index) => (
                                        <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                                            <h4 className="font-bold text-gray-900 text-sm mb-1">{member.name}</h4>
                                            <p className="text-[#46a1bb] text-xs font-semibold mb-1">{member.role}</p>
                                            <p className="text-gray-600 text-xs">{member.affiliation}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="max-w-[1400px] mx-auto px-6 pb-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-[#46a1bb] to-[#021d49] rounded-xl p-8 text-center text-white shadow-lg">
                        <Mail className="w-12 h-12 mx-auto mb-4 opacity-90" />
                        <h2 className="text-2xl font-bold mb-3">
                            Interested in This Project?
                        </h2>
                        <p className="text-sm text-white/90 mb-6 max-w-xl mx-auto">
                            Get in touch with our team to learn more about collaboration opportunities
                        </p>
                        <button className="bg-white text-[#021d49] px-6 py-3 rounded-full font-bold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105">
                            Contact Us
                        </button>
                    </div>
                </section>
            </div>

        </>
    );
};

export default ProjectDetailPage;