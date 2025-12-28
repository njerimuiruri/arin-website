"use client";
import React from 'react';
import { BookOpen, FileText, ExternalLink, CheckCircle, Target, Users, Lightbulb } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const ARINPressPage = () => {
    const handlePDFClick = () => {
        window.open('/documents/ARIN-Press-Write-up-1-1.pdf', '_blank');
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-12">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <BookOpen className="w-12 h-12 text-[#46a1bb]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            ARIN{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Press
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Publishing impactful research and evidence-based insights for Africa's development
                        </p>
                    </div>

                    {/* Main Content Section */}
                    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
                        {/* Left Side - Image/PDF Preview */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                            <div className="relative mb-6">
                                <img
                                    src="/arinpress.png"
                                    alt="ARIN Press Publication"
                                    className="w-full h-80 object-cover rounded-xl shadow-md"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className="px-4 py-2 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-sm uppercase tracking-wide rounded-lg shadow-xl">
                                        ARIN Press
                                    </span>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">About ARIN Press</h3>
                                <p className="text-gray-600 mb-6">
                                    Download our comprehensive publication to learn more about ARIN's impact, research, and contributions to Africa's development.
                                </p>
                                <button
                                    onClick={handlePDFClick}
                                    className="w-full px-6 py-4 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                                >
                                    <FileText className="w-5 h-5" />
                                    <span>Read ARIN Press PDF</span>
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Right Side - About Text */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">About ARIN</h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    The Africa Research and Impact Network (ARIN) is an International impact platform bringing together a network of scholars, researchers, policymakers, and practitioners drawn from think tanks, research organisations, academia, and public agencies across Africa and the diaspora working or having an interest in Africa.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ARIN Network Aims */}
                    <div className="max-w-6xl mx-auto mb-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">ARIN Network Aims</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="bg-gradient-to-br from-[#46a1bb]/5 to-[#021d49]/5 rounded-xl p-6 border border-[#46a1bb]/20">
                                    <div className="w-12 h-12 rounded-full bg-[#46a1bb] flex items-center justify-center mb-4">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">1. Evidence Consolidation</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Consolidating evidence from various African contexts and leveraging these to support policies and capacity-building
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-[#46a1bb]/5 to-[#021d49]/5 rounded-xl p-6 border border-[#46a1bb]/20">
                                    <div className="w-12 h-12 rounded-full bg-[#46a1bb] flex items-center justify-center mb-4">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">2. Research Excellence</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Promoting research excellence and sharing best research and impact practices
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-[#46a1bb]/5 to-[#021d49]/5 rounded-xl p-6 border border-[#46a1bb]/20">
                                    <div className="w-12 h-12 rounded-full bg-[#46a1bb] flex items-center justify-center mb-4">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">3. Peer Learning</h3>
                                    <p className="text-gray-700 leading-relaxed">
                                        Facilitating peer-to-peer learning among researchers, policymakers, and practitioners working in Africa
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ARIN Experience & Expertise */}
                    <div className="max-w-6xl mx-auto mb-12">
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                            <div className="flex items-center gap-3 mb-6">
                                <Lightbulb className="w-8 h-8 text-[#46a1bb]" />
                                <h2 className="text-3xl font-bold text-gray-900">Our Experience & Expertise</h2>
                            </div>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    ARIN has vast experience in generating and consolidating evidence on what works or not, focusing on the key strategic sectors or themes of paramount importance to Africa.
                                </p>
                                <p>
                                    ARIN has delivered several multi-disciplinary research projects, high-level multi-stakeholder policy labs, conferences, dialogues, consultancies, and capacity building, some of which involve overall planning and facilitation. ARIN has performed high-level policy dialogues and capacity building in various fields, which include climate change (e.g., climate risk assessment in arid and semi-arid urban areas; climate negotiations and policy influence at all levels, climate finance access and planning, etc.), agri-food systems, health, disaster risk reduction, and energy, among others.
                                </p>
                                <p>
                                    ARIN's thematic focus is tailored to address sectors identified by African countries as key development frontiers in the Agenda 2063, the SDGs, and other relevant development frameworks.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Key Thematic Areas */}
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                            <h2 className="text-3xl font-bold mb-8 text-center">Key Thematic Areas</h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <h3 className="text-lg font-bold mb-2">Climate Change</h3>
                                    <p className="text-gray-300 text-sm">Climate risk assessment, negotiations, policy influence, and finance access</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <h3 className="text-lg font-bold mb-2">Agri-Food Systems</h3>
                                    <p className="text-gray-300 text-sm">Sustainable agriculture and food security initiatives</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <h3 className="text-lg font-bold mb-2">Health Systems</h3>
                                    <p className="text-gray-300 text-sm">Health policy, systems strengthening, and capacity building</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <h3 className="text-lg font-bold mb-2">Disaster Risk Reduction</h3>
                                    <p className="text-gray-300 text-sm">Risk assessment and resilience building strategies</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <h3 className="text-lg font-bold mb-2">Energy Systems</h3>
                                    <p className="text-gray-300 text-sm">Sustainable energy solutions and policy frameworks</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <h3 className="text-lg font-bold mb-2">SDGs & Agenda 2063</h3>
                                    <p className="text-gray-300 text-sm">Alignment with Africa's development frameworks</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default ARINPressPage;