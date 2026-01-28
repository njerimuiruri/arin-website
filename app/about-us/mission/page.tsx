"use client";
import React from 'react';
import { ArrowRight, Users, BookOpen, TrendingUp, Globe, Lightbulb, Award, Target, Layers, Zap, Factory, Leaf, Droplet } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const ARINMissionPage = () => {
    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md border border-stone-200 mb-8">
                            <span className="text-[#021d49] text-xl">★</span>
                            <span className="text-sm text-gray-700 font-semibold">
                                Our Mission
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                            Our{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">Mission</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            ARIN seeks to identify and leverage on key research talents to flexibly and innovatively contribute to Africa's research transformation, policy analysis and capacity building.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl p-12 lg:p-16 shadow-2xl border-2 border-stone-200">
                        <p className="text-xl text-gray-700 leading-relaxed mb-8">
                            ARIN, therefore provides a peer review platform where best research and impact practices from different African contexts, are shared, profiled, and leveraged to inform transformative policy action.
                        </p>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Among the areas that ARIN has pioneered path-breaking research, are climate change, knowledge management, science technology, and innovation.
                        </p>
                    </div>
                </section>

                {/* Core Focus Areas */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Our Focus Areas
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Climate Change */}
                        <div className="group bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#021d49]/30 hover:border-[#021d49] hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                <Globe className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Climate Change
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                The network currently convenes research and policy platforms on climate action, drawing from the perspective of researchers on, adaptation, science, technology, and innovation status in Africa.
                            </p>
                        </div>

                        {/* Knowledge Management */}
                        <div className="group bg-gradient-to-br from-white to-amber-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400 hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                <BookOpen className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Knowledge Management
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Support contextual knowledge systems and learning
                            </p>
                        </div>

                        {/* Science Technology and Innovation */}
                        <div className="group bg-gradient-to-br from-white to-purple-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-purple-200 hover:border-purple-400 hover:-translate-y-2">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                <Lightbulb className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Science Technology, and Innovation.
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                Through the same approach, ARIN assesses opportunities for science-policy interface, through contextual projects on research commercialization, innovation, knowledge translation, and practice.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sustainable Development Section */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                                Sustainable Development - Africa Sustainability Hub
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            <div className="space-y-6">
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Climate change is recognised as one of the threats that drags Africa's effort to alleviate poverty. According to the Intergovernmental Panel on Climate Change (IPCC) reports, Africa is among the most vulnerable continents to climate change.
                                </p>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    The factors that make Africa vulnerable to climate change include weak adaptive capacity, evolving energy system, high dependency on ecosystem based goods for livelihoods and majorly rain-fed agriculture.
                                </p>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    Projections by the United Nations Environment Programme (UNEP)estimate that climate change will lead to an equivalent of 2 percent to 4 percent annual loss in GDP in Africa by 2040.
                                </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 bg-[#021d49]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <TrendingUp className="w-8 h-8 text-[#021d49]" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold mb-2">2-4%</p>
                                            <p className="text-gray-300">Annual GDP loss projected by 2040</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 bg-[#021d49]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Droplet className="w-8 h-8 text-[#021d49]" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold mb-2">Rain-fed Agriculture</p>
                                            <p className="text-gray-300">Major dependency for livelihoods</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 bg-[#021d49]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Layers className="w-8 h-8 text-[#021d49]" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold mb-2">Ecosystem Dependency</p>
                                            <p className="text-gray-300">High reliance on ecosystem based goods</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cities and Resilience */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-r from-[#021d49] via-gray-900 to-[#021d49] rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                                    Cities and Resilience
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        More than 50% of the world's population live in cities or urban centres and one billion people live in informal settlements and slums worldwide. Cities contribute significantly towards achievement of Sustainable Development Goals (SDGs) especially SDG 11 on sustainable cities and communities.
                                    </p>
                                    <p className="text-lg text-gray-300 leading-relaxed">
                                        African cities will double in population by 2050 this is because being home to the world's youngest and fast-growing population, the continent is urbanizing more rapidly than any other part of the planet (World Economic Forum).
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20">
                                <div className="space-y-8">
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 bg-[#021d49]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Users className="w-8 h-8 text-[#021d49]" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold mb-2">50%+</p>
                                            <p className="text-gray-300">Global urban population</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 bg-[#021d49]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <TrendingUp className="w-8 h-8 text-[#021d49]" />
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold mb-2">2x by 2050</p>
                                            <p className="text-gray-300">African cities population growth</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 bg-[#021d49]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                                            <Target className="w-8 h-8 text-[#021d49]" />
                                        </div>
                                        <div>
                                            <p className="text-xl font-bold mb-2">SDG 11</p>
                                            <p className="text-gray-300">Sustainable cities and communities</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Join Us For Our Mission */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Join us for our Mission
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Addressing Africa's most pressing challenges through research and innovation
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Climate Change and Energy */}
                        <div className="group bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#021d49]/30 hover:border-[#021d49]">
                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <Globe className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        Climate Change and Energy
                                    </h3>
                                    <span className="inline-block px-4 py-2 bg-[#021d49]/10 text-[#021d49] text-xs font-bold rounded-full">
                                        Sustainable Development
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Climate change is recognised as one of the threats that drags Africa's effort to alleviate poverty. According to the Intergovernmental Panel on Climate Change (IPCC) reports, Africa is among the most vulnerable continents to climate change.
                                </p>
                                <p>
                                    The factors that make Africa vulnerable to climate change include weak adaptive capacity, evolving energy system, high dependency on ecosystem based goods for livelihoods and majorly rain-fed agriculture.
                                </p>
                                <p>
                                    Projections by the United Nations Environment Programme (UNEP)estimate that climate change will lead to an equivalent of 2 percent to 4 percent annual loss in GDP in Africa by 2040.
                                </p>
                            </div>
                        </div>

                        {/* Mining, Trade and Industry */}
                        <div className="group bg-gradient-to-br from-white to-amber-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400">
                            <div className="flex items-start gap-6 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                    <Factory className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                        Mining, Trade and Industry
                                    </h3>
                                    <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                                        Economic Development
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Africa is well endowed with mineral resources harbouring the world's largest mineral reserve of platinum, gold, diamonds, chromite, manganese, and vanadium (UNECA).
                                </p>
                                <p>
                                    However, according to the African Review report on Mining, 2009, most of these minerals are exported as ores, concentrates or metals without significant downstream processing to add value leading to low economic benefit to Africa.
                                </p>
                                <p>
                                    Africa conceived a mining Vision to advocate for transparent, equitable and optimal exploitation of mineral resources to underpin broad-based sustainable growth and socio-economic development. Therefore, the untapped mineral potential can help African leapfrog to industrialised economy if value added.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            Ready to Join Africa's Research Revolution?
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Become part of a network that's shaping the future of research and policy in Africa
                        </p>
                        <div className="flex flex-wrap gap-6 justify-center">
                            <a
                                href="/join"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#021d49] to-[#021d49] text-white font-bold text-lg rounded-xl hover:from-[#3a8da5] hover:to-[#011536] transition-all duration-300 shadow-2xl hover:scale-105"
                            >
                                Become a Member
                                <ArrowRight className="w-6 h-6" />
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300"
                            >
                                Contact Us
                            </a>
                        </div>
                    </div>
                </section>
            </div>
        </>

    );
};

export default ARINMissionPage;