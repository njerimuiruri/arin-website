"use client";
import React from 'react';
import { ArrowRight, Users, BookOpen, TrendingUp, Globe, Lightbulb, Award, Calendar, MapPin, ExternalLink, ChevronRight } from 'lucide-react';

const HeroSection = () => {
    const latestPosts = [
        {
            title: "Climate Action Research in East Africa",
            excerpt: "New findings on adaptation strategies for vulnerable communities...",
            date: "Dec 20, 2024",
            category: "Research",
            image: "/api/placeholder/400/250"
        },
        {
            title: "Policy Brief: Sustainable Mining Practices",
            excerpt: "Recommendations for transparent mineral resource management...",
            date: "Dec 18, 2024",
            category: "Policy",
            image: "/api/placeholder/400/250"
        },
        {
            title: "Innovation in African Agriculture",
            excerpt: "Technology solutions transforming farming practices across the continent...",
            date: "Dec 15, 2024",
            category: "Innovation",
            image: "/api/placeholder/400/250"
        }
    ];

    const upcomingEvents = [
        {
            title: "ARIN Annual Conference 2025",
            date: "March 15-17, 2025",
            location: "Nairobi, Kenya",
            type: "Conference"
        },
        {
            title: "Climate Policy Dialogue",
            date: "January 22, 2025",
            location: "Virtual",
            type: "Workshop"
        },
        {
            title: "Research Fellows Symposium",
            date: "February 10, 2025",
            location: "Accra, Ghana",
            type: "Symposium"
        }
    ];

    const partners = [
        { name: "Partner 1", logo: "/api/placeholder/150/80" },
        { name: "Partner 2", logo: "/api/placeholder/150/80" },
        { name: "Partner 3", logo: "/api/placeholder/150/80" },
        { name: "Partner 4", logo: "/api/placeholder/150/80" },
        { name: "Partner 5", logo: "/api/placeholder/150/80" },
        { name: "Partner 6", logo: "/api/placeholder/150/80" }
    ];

    const latestProjects = [
        {
            title: "Climate Resilience in Coastal Cities",
            description: "Building adaptive capacity in urban centers facing sea-level rise",
            status: "Active",
            region: "East Africa"
        },
        {
            title: "Sustainable Agriculture Initiative",
            description: "Promoting climate-smart farming practices across the continent",
            status: "Active",
            region: "West Africa"
        },
        {
            title: "Renewable Energy Transition Study",
            description: "Research on pathways to clean energy in African countries",
            status: "Ongoing",
            region: "Pan-African"
        }
    ];

    return (
        <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50">
            {/* Hero Section */}
            <section className="max-w-[1600px] mx-auto px-6 py-20">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md border border-stone-200">
                            <span className="text-[#46a1bb] text-xl">★</span>
                            <span className="text-sm text-gray-700 font-semibold">
                                Trusted by researchers across Africa
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                            Transforming Africa's Research{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">Landscape</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed">
                            ARIN seeks to identify and leverage on key research talents to flexibly and
                            innovatively contribute to Africa's research transformation, policy analysis
                            and capacity building.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a
                                href="/join"
                                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#46a1bb] to-[#021d49] hover:from-[#3a8da5] hover:to-[#011536] text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                            >
                                Get Started Free
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a
                                href="/about-us/mission"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold text-lg rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 shadow-lg"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>

                    {/* Right Content - Network Visualization */}
                    <div className="relative">
                        <div className="relative bg-gradient-to-br from-[#021d49] via-gray-800 to-stone-900 rounded-3xl overflow-hidden shadow-2xl aspect-square">
                            {/* Decorative elements */}
                            <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#46a1bb] rounded-full opacity-20 blur-3xl"></div>
                            <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-[#021d49] rounded-full opacity-20 blur-3xl"></div>

                            {/* Image container */}
                            <div className="relative w-full h-full flex items-center justify-center p-12">
                                <img
                                    src="/api/placeholder/600/600"
                                    alt="ARIN Research Network"
                                    className="w-full h-full object-cover rounded-2xl opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                            </div>

                            {/* Network connection lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'overlay' }}>
                                <line x1="33%" y1="16%" x2="66%" y2="16%" stroke="white" strokeWidth="1.5" opacity="0.4" />
                                <line x1="33%" y1="50%" x2="66%" y2="50%" stroke="white" strokeWidth="1.5" opacity="0.4" />
                                <line x1="33%" y1="84%" x2="66%" y2="84%" stroke="white" strokeWidth="1.5" opacity="0.4" />
                                <line x1="33%" y1="16%" x2="33%" y2="84%" stroke="white" strokeWidth="1.5" opacity="0.4" />
                                <line x1="50%" y1="16%" x2="50%" y2="84%" stroke="white" strokeWidth="1.5" opacity="0.4" />
                                <line x1="66%" y1="16%" x2="66%" y2="84%" stroke="white" strokeWidth="1.5" opacity="0.4" />
                                <line x1="33%" y1="16%" x2="50%" y2="50%" stroke="white" strokeWidth="1.5" opacity="0.3" />
                                <line x1="66%" y1="16%" x2="50%" y2="50%" stroke="white" strokeWidth="1.5" opacity="0.3" />
                                <line x1="33%" y1="84%" x2="50%" y2="50%" stroke="white" strokeWidth="1.5" opacity="0.3" />
                                <line x1="66%" y1="84%" x2="50%" y2="50%" stroke="white" strokeWidth="1.5" opacity="0.3" />
                            </svg>

                            {/* Connection nodes */}
                            <div className="absolute top-[16%] left-[33%] w-4 h-4 bg-white rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                            <div className="absolute top-[16%] left-[50%] w-4 h-4 bg-white rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                            <div className="absolute top-[16%] left-[66%] w-4 h-4 bg-white rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                            <div className="absolute top-[50%] left-[33%] w-4 h-4 bg-white rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                            <div className="absolute top-[50%] left-[50%] w-5 h-5 bg-[#46a1bb] rounded-full opacity-90 -translate-x-1/2 -translate-y-1/2 shadow-xl">
                                <div className="absolute inset-0 bg-[#46a1bb] rounded-full animate-ping opacity-50"></div>
                            </div>
                            <div className="absolute top-[50%] left-[66%] w-4 h-4 bg-white rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                            <div className="absolute top-[84%] left-[33%] w-4 h-4 bg-white rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                            <div className="absolute top-[84%] left-[50%] w-4 h-4 bg-white rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                            <div className="absolute top-[84%] left-[66%] w-4 h-4 bg-white rounded-full opacity-70 -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-[1600px] mx-auto px-6 pb-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Why Join Us
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Be part of Africa's transformative research and policy platform
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200 hover:border-[#46a1bb] hover:-translate-y-2">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#46a1bb]/20 to-[#021d49]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <TrendingUp className="w-10 h-10 text-[#46a1bb]" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Share Research Trends
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Develop models and best practices on pathways to research excellence and impact.
                        </p>
                    </div>

                    <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200 hover:border-amber-300 hover:-translate-y-2">
                        <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <BookOpen className="w-10 h-10 text-amber-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Policy Reviews
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Convene evidence and impact dialogues.
                        </p>
                    </div>

                    <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200 hover:border-purple-300 hover:-translate-y-2">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                            <Lightbulb className="w-10 h-10 text-purple-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Support Knowledge Systems
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                            Support capacity of individuals and institutions on transformative research and impact pathways.
                        </p>
                    </div>
                </div>
            </section>

            {/* Focus Areas Section */}
            <section className="max-w-[1600px] mx-auto px-6 pb-20">
                <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            Our Focus Areas
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                            Among the areas that ARIN has pioneered path-breaking research, are climate
                            change, knowledge management, science technology, and innovation.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-4">Climate Change</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                The network currently convenes research and policy platforms on climate action,
                                drawing from the perspective of researchers on adaptation, science, technology,
                                and innovation status in Africa.
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-4">Knowledge Management</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Support contextual knowledge systems and learning
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <h3 className="text-2xl font-bold mb-4">Science, Technology & Innovation</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Through the same approach, ARIN assesses opportunities for science-policy interface,
                                through contextual projects on research commercialization, innovation, knowledge
                                translation, and practice.
                            </p>
                        </div>
                    </div>

                    <div className="text-center">
                        <a
                            href="/about-us/focus-areas"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
                        >
                            Explore Our Work
                            <ArrowRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </section>

            {/* Mission Areas Section */}
            <section className="max-w-[1600px] mx-auto px-6 pb-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Join Us For Our Mission
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Addressing Africa's most pressing challenges through research and innovation
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Climate Change */}
                    <div className="group bg-gradient-to-br from-white to-blue-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#46a1bb]/30 hover:border-[#46a1bb]">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Globe className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Climate Change and Energy
                                </h3>
                                <span className="inline-block px-4 py-2 bg-[#46a1bb]/10 text-[#021d49] text-xs font-bold rounded-full">
                                    Sustainable Development
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Climate change is recognised as one of the threats that drags Africa's effort to
                            alleviate poverty. According to the IPCC reports, Africa is among the most vulnerable
                            continents.
                        </p>
                        <a href="/focus-areas/climate-change" className="inline-flex items-center gap-2 text-[#46a1bb] font-bold hover:gap-4 transition-all">
                            Learn More <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Mining */}
                    <div className="group bg-gradient-to-br from-white to-amber-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-amber-200 hover:border-amber-400">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <TrendingUp className="w-8 h-8 text-white" />
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
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Africa is well endowed with mineral resources. However, most minerals are exported without
                            significant downstream processing.
                        </p>
                        <a href="/focus-areas/mining-trade" className="inline-flex items-center gap-2 text-amber-600 font-bold hover:gap-4 transition-all">
                            Learn More <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Agriculture */}
                    <div className="group bg-gradient-to-br from-white to-lime-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-lime-200 hover:border-lime-400">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Lightbulb className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Agriculture and Forestry
                                </h3>
                                <span className="inline-block px-4 py-2 bg-lime-100 text-lime-800 text-xs font-bold rounded-full">
                                    Food Security
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Agriculture contributes directly to climate change rendering farmers among the most
                            vulnerable. Approximately 60% of Africa's trade and jobs are derived from agriculture.
                        </p>
                        <a href="/focus-areas/agriculture" className="inline-flex items-center gap-2 text-lime-600 font-bold hover:gap-4 transition-all">
                            Learn More <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>

                    {/* Technology */}
                    <div className="group bg-gradient-to-br from-white to-purple-50 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-purple-200 hover:border-purple-400">
                        <div className="flex items-start gap-6 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    Technology and Innovation
                                </h3>
                                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                                    Digital Transformation
                                </span>
                            </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mb-6">
                            Africa is increasingly recognised as a key global player in technology and innovation.
                            UN agencies and development partners are supporting African countries.
                        </p>
                        <a href="/focus-areas/technology" className="inline-flex items-center gap-2 text-purple-600 font-bold hover:gap-4 transition-all">
                            Learn More <ChevronRight className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                {/* Cities Highlight */}
                <div className="bg-gradient-to-r from-[#021d49] via-gray-900 to-[#021d49] rounded-3xl p-12 text-white shadow-2xl">
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h3 className="text-4xl font-bold mb-6">Cities and Resilience</h3>
                            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                                More than 50% of the world's population live in cities. African cities will double in
                                population by 2050, urbanizing more rapidly than any other part of the planet.
                            </p>
                            <a
                                href="/focus-areas/cities-resilience"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
                            >
                                Explore Cities Initiative
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-10 border border-white/20">
                            <div className="space-y-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-[#46a1bb]/20 rounded-2xl flex items-center justify-center">
                                        <Users className="w-8 h-8 text-[#46a1bb]" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">50%+</p>
                                        <p className="text-gray-400">Urban Population</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-[#46a1bb]/20 rounded-2xl flex items-center justify-center">
                                        <TrendingUp className="w-8 h-8 text-[#46a1bb]" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-bold">2x by 2050</p>
                                        <p className="text-gray-400">Population Growth</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Posts */}
            <section className="max-w-[1600px] mx-auto px-6 pb-20">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest Posts</h2>
                        <p className="text-gray-600 text-lg">Stay updated with our recent publications and insights</p>
                    </div>
                    <a href="/press/blog" className="hidden md:inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#46a1bb] to-[#021d49] text-white font-bold rounded-xl hover:from-[#3a8da5] hover:to-[#011536] transition-all shadow-lg">
                        View All Posts
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestPosts.map((post, index) => (
                        <article key={index} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-stone-200 hover:border-[#46a1bb] hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                                    <span className="px-4 py-2 bg-[#46a1bb] text-white text-xs font-bold rounded-full shadow-xl backdrop-blur-sm">
                                        {post.category}
                                    </span>
                                    <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:rotate-45">
                                        <ArrowRight className="w-5 h-5 text-gray-900" />
                                    </div>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-1.5 h-10 bg-gradient-to-b from-[#46a1bb] to-[#021d49] rounded-full"></div>
                                    <p className="text-sm text-gray-500 font-semibold">{post.date}</p>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#46a1bb] transition-colors leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">{post.excerpt}</p>
                                <a href="#" className="inline-flex items-center gap-2 text-[#46a1bb] font-bold hover:gap-4 transition-all">
                                    <span className="border-b-2 border-transparent hover:border-[#46a1bb] transition-all">Read Article</span>
                                    <ChevronRight className="w-5 h-5" />
                                </a>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="max-w-[1600px] mx-auto px-6 pb-20">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
                        <p className="text-gray-600 text-lg">Join us at our upcoming conferences and workshops</p>
                    </div>
                    <a href="/convening-platforms/events" className="hidden md:inline-flex items-center gap-3 px-6 py-3 border-2 border-[#46a1bb] text-[#46a1bb] font-bold rounded-xl hover:bg-[#46a1bb] hover:text-white transition-all shadow-lg">
                        View All Events
                        <Calendar className="w-5 h-5" />
                    </a>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event, index) => (
                        <div key={index} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#46a1bb] to-[#021d49] rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-500"></div>

                            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                                    <div className="absolute -bottom-12 left-1/2 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <div className="relative">
                                            <div className="w-20 h-20 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">
                                                <Calendar className="w-10 h-10 text-white" />
                                            </div>
                                            <div className="absolute inset-0 w-20 h-20 bg-[#46a1bb] rounded-2xl opacity-0 group-hover:opacity-30 group-hover:scale-125 transition-all duration-700"></div>
                                        </div>
                                        <span className="px-4 py-2 bg-gradient-to-r from-[#46a1bb]/10 to-[#021d49]/10 text-[#021d49] text-xs font-bold rounded-full border-2 border-[#46a1bb]/20 shadow-lg">
                                            {event.type}
                                        </span>
                                    </div>

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#46a1bb] transition-colors duration-300">
                                            {event.title}
                                        </h3>
                                        <div className="h-1 w-0 bg-gradient-to-r from-[#46a1bb] to-[#021d49] rounded-full group-hover:w-16 transition-all duration-500"></div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="group/item flex items-center gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-100 hover:border-amber-300 transition-all duration-300">
                                            <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform">
                                                <Calendar className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-amber-700 font-bold mb-1 uppercase">Date</p>
                                                <p className="text-sm font-bold text-gray-800">{event.date}</p>
                                            </div>
                                        </div>

                                        <div className="group/item flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
                                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-transform">
                                                <MapPin className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs text-purple-700 font-bold mb-1 uppercase">Location</p>
                                                <p className="text-sm font-bold text-gray-800">{event.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <a href="#" className="group/btn relative w-full inline-flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-[#46a1bb] to-[#021d49] text-white font-bold rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#021d49] to-[#46a1bb] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative z-10">Register Now</span>
                                        <ExternalLink className="relative z-10 w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Latest Projects */}
            <section className="max-w-[1600px] mx-auto px-6 pb-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Projects</h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our ongoing research initiatives across Africa
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestProjects.map((project, index) => (
                        <div key={index} className="group relative">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#46a1bb] via-[#021d49] to-[#46a1bb] rounded-3xl opacity-0 group-hover:opacity-75 blur-sm transition duration-700"></div>

                            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                    <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#46a1bb]/30 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                                    <div className="absolute -bottom-12 left-1/2 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-3 h-3 bg-[#46a1bb] rounded-full animate-pulse"></div>
                                                <div className="absolute inset-0 w-3 h-3 bg-[#46a1bb] rounded-full animate-ping"></div>
                                            </div>
                                            <span className="px-4 py-2 bg-gradient-to-r from-[#46a1bb]/10 to-[#021d49]/10 text-[#021d49] text-xs font-bold rounded-full border-2 border-[#46a1bb]/20 shadow-lg">
                                                {project.status}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-stone-50 to-gray-50 rounded-full border-2 border-stone-200 shadow-sm group-hover:border-[#46a1bb] transition-colors">
                                            <Globe className="w-4 h-4 text-[#46a1bb]" />
                                            <span className="text-xs text-gray-700 font-bold">{project.region}</span>
                                        </div>
                                    </div>

                                    <div className="relative mb-8">
                                        <div className="w-20 h-20 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 relative z-10">
                                            <Lightbulb className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="absolute inset-0 w-20 h-20 bg-[#46a1bb] rounded-2xl opacity-0 group-hover:opacity-40 translate-y-1 translate-x-1 transition-all duration-700"></div>
                                        <div className="absolute inset-0 w-20 h-20 bg-[#021d49] rounded-2xl opacity-0 group-hover:opacity-20 translate-y-2 translate-x-2 transition-all duration-700"></div>
                                    </div>

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#46a1bb] transition-colors duration-300">
                                            {project.title}
                                        </h3>
                                        <div className="h-1.5 w-0 bg-gradient-to-r from-[#46a1bb] to-[#021d49] rounded-full group-hover:w-24 transition-all duration-700 shadow-lg"></div>
                                    </div>

                                    <p className="text-gray-600 mb-8 leading-relaxed text-sm min-h-[5rem]">
                                        {project.description}
                                    </p>

                                    <div className="relative h-0.5 mb-8 overflow-hidden rounded-full">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#46a1bb] via-[#021d49] to-[#46a1bb] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    </div>

                                    <a href="#" className="group/btn relative w-full inline-flex items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#46a1bb]/10 to-[#021d49]/10 rounded-2xl border-2 border-[#46a1bb]/20 hover:border-[#46a1bb] overflow-hidden transition-all duration-300 hover:shadow-xl">
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#46a1bb] to-[#021d49] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                        <span className="relative z-10 font-bold text-[#46a1bb] group-hover/btn:text-white transition-colors">Explore Project</span>
                                        <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-xl flex items-center justify-center shadow-lg group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300">
                                            <ChevronRight className="w-6 h-6 text-white group-hover/btn:translate-x-1 transition-transform" />
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Partners */}
            <section className="max-w-[1600px] mx-auto px-6 pb-20">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
                    <p className="text-gray-600 text-lg">Working together to transform Africa's research landscape</p>
                </div>

                <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-stone-200">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 items-center">
                        {partners.map((partner, index) => (
                            <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-110">
                                <img src={partner.logo} alt={partner.name} className="max-h-16 w-auto" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
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
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#46a1bb] to-[#021d49] text-white font-bold text-lg rounded-xl hover:from-[#3a8da5] hover:to-[#011536] transition-all duration-300 shadow-2xl hover:scale-105"
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

            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
            `}</style>
        </div>
    );
};

export default HeroSection;