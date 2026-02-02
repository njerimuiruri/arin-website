"use client";
import { ArrowRight, ChevronLeft, ChevronRight, Calendar, MapPin, Users, FileText, Eye, Clock, Newspaper, BookOpen, PenTool, Sparkles, Target, Lightbulb, Globe, TrendingUp } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Import types only
import { Event as ArinEvent } from "@/services/eventsService";
import { TechnicalReport } from "@/services/technicalReportsService";
import { PolicyBrief } from "@/services/policyBriefsService";

interface NewsBrief {
    _id?: string;
    title: string;
    description?: string;
    authors?: string[];
    image?: string;
    coverImage?: string;
    datePosted?: string;
    availableResources?: string[];
    year?: number;
    createdAt?: string;
    date?: string;
}

interface ResearchProject {
    _id?: string;
    title: string;
    description?: string;
    image?: string;
    datePosted?: string;
    createdAt?: string;
    date?: string;
}

interface EventWithFlag extends ArinEvent {
    isUpcoming: boolean;
}

interface ModernHeroSectionProps {
    events: ArinEvent[];
    techReports: TechnicalReport[];
    policyBriefs: PolicyBrief[];
    newsBriefs: NewsBrief[];
    researchProjects: ResearchProject[];
    policyDialogues: any[];
}

const ModernHeroSection = ({
    events,
    techReports,
    policyBriefs,
    newsBriefs,
    researchProjects,
    policyDialogues
}: ModernHeroSectionProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Helper function to truncate text
    const truncateText = (text: string, wordLimit: number) => {
        const cleanText = text.replace(/<[^>]+>/g, '');
        const words = cleanText.split(' ');
        if (words.length <= wordLimit) return cleanText;
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    // Featured content with images and corresponding text
    const featuredContent = [
        {
            image: "/images/lreb.jpg",
            alt: "Research Excellence",
            badge: "Research Transformation",
            title: "Research Excellence",
            subtitle: "Building Africa's Future",
            description: "ARIN seeks to identify and leverage key research talents to flexibly and innovatively contribute to Africa's research transformation, policy analysis and capacity building."
        },
        {
            image: "/images/fgd1.jpg",
            alt: "Community Engagement",
            badge: "Peer Review Platform",
            title: "Collaborative Research",
            subtitle: "Sharing Best Practices",
            description: "ARIN provides a peer review platform where best research and impact practices from different African contexts are shared, profiled, and leveraged to inform transformative policy action."
        },
        {
            image: "/images/sdg.jpeg",
            alt: "Sustainable Development",
            badge: "Path-Breaking Research",
            title: "Innovation & Impact",
            subtitle: "Pioneering Solutions",
            description: "ARIN has pioneered path-breaking research in climate change, knowledge management, science technology, and innovation, driving sustainable development across Africa."
        },
        {
            image: "/images/lreb4.jpg",
            alt: "Climate Action",
            badge: "Policy Platforms",
            title: "Climate Action",
            subtitle: "Science Meets Policy",
            description: "The network convenes research and policy platforms on climate action, drawing from researchers' perspectives on adaptation, science, technology, and innovation status in Africa."
        },
        {
            image: "/images/geo.jpeg",
            alt: "Science-Policy Interface",
            badge: "Knowledge Translation",
            title: "Science-Policy Bridge",
            subtitle: "From Research to Practice",
            description: "ARIN assesses opportunities for science-policy interface through contextual projects on research commercialization, innovation, knowledge translation, and practice."
        }
    ];

    // Compute latest items from props
    let upcomingEvent: EventWithFlag | null = null;
    let latestDocument: any | null = null;

    // Find upcoming event
    if (Array.isArray(events) && events.length > 0) {
        const now = new Date();
        const upcoming = events.filter(e => new Date(e.date) >= now);
        if (upcoming.length > 0) {
            const next = upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
            upcomingEvent = { ...next, isUpcoming: true };
        } else {
            const past = events.filter(e => new Date(e.date) < now);
            if (past.length > 0) {
                const last = past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                upcomingEvent = { ...last, isUpcoming: false };
            }
        }
    }

    // Get latest document
    const sortByDate = (arr: any[]) => arr.sort((a, b) => new Date(b.datePosted || b.createdAt || b.date || 0).getTime() - new Date(a.datePosted || a.createdAt || a.date || 0).getTime());
    const allDocs: any[] = [];
    if (Array.isArray(techReports)) allDocs.push(...techReports.map(d => ({ ...d, docType: 'Technical Report' })));
    if (Array.isArray(policyBriefs)) allDocs.push(...policyBriefs.map(d => ({ ...d, docType: 'Policy Brief' })));
    if (Array.isArray(newsBriefs)) allDocs.push(...newsBriefs.map(d => ({ ...d, docType: 'News Brief' })));
    if (Array.isArray(researchProjects)) allDocs.push(...researchProjects.map(d => ({ ...d, docType: 'Research Project' })));
    if (allDocs.length > 0) {
        sortByDate(allDocs);
        latestDocument = allDocs[0];
    }

    // Get latest items for each category
    let latestNewsBrief = null;
    let latestTechnicalReport = null;
    let latestPolicyBrief = null;
    let latestResearchProject = null;

    if (Array.isArray(newsBriefs) && newsBriefs.length > 0) {
        sortByDate(newsBriefs);
        latestNewsBrief = newsBriefs[0];
    }
    if (Array.isArray(techReports) && techReports.length > 0) {
        sortByDate(techReports);
        latestTechnicalReport = techReports[0];
    }
    if (Array.isArray(policyBriefs) && policyBriefs.length > 0) {
        sortByDate(policyBriefs);
        latestPolicyBrief = policyBriefs[0];
    }
    if (Array.isArray(researchProjects) && researchProjects.length > 0) {
        sortByDate(researchProjects);
        latestResearchProject = researchProjects[0];
    }

    // Auto-slide functionality for images and text
    useEffect(() => {
        if (autoSlideTimerRef.current) {
            clearTimeout(autoSlideTimerRef.current);
        }

        autoSlideTimerRef.current = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
        }, 6000); // 6 seconds for better reading time

        return () => {
            if (autoSlideTimerRef.current) {
                clearTimeout(autoSlideTimerRef.current);
            }
        };
    }, [currentSlide, featuredContent.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
    };

    const currentContent = featuredContent[currentSlide];

    return (
        <>
            <style jsx>{`
                @keyframes fadeInImage {
                    from {
                        opacity: 0;
                        transform: scale(1.05);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }

                @keyframes contentFadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeInImage {
                    animation: fadeInImage 1s ease-out forwards;
                }

                .animate-contentFadeIn {
                    animation: contentFadeIn 0.6s ease-out forwards;
                }

                .animate-slideInUp {
                    animation: slideInUp 0.8s ease-out forwards;
                }

                .delay-100 {
                    animation-delay: 0.1s;
                    opacity: 0;
                }

                .delay-200 {
                    animation-delay: 0.2s;
                    opacity: 0;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                    opacity: 0;
                }

                .delay-400 {
                    animation-delay: 0.4s;
                    opacity: 0;
                }

                .delay-500 {
                    animation-delay: 0.5s;
                    opacity: 0;
                }
            `}</style>

            <div className="relative w-full bg-gradient-to-b from-gray-50 to-white overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/30 rounded-full blur-3xl"></div>
                </div>

                {/* Main Hero Content */}
                <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content Panel with Dynamic Text */}
                        <div className="space-y-8">
                            {/* Badge with animation */}
                            <div key={`badge-${currentSlide}`} className="animate-contentFadeIn">
                                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full border border-orange-200 shadow-sm hover:shadow-md transition-shadow">
                                    <TrendingUp className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm font-bold text-gray-800">{currentContent.badge}</span>
                                </div>
                            </div>

                            {/* Main Heading with Dynamic Content */}
                            <div key={`heading-${currentSlide}`} className="animate-contentFadeIn delay-100">
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#021d49] leading-[1.1] mb-2">
                                    {currentContent.title}
                                </h1>
                                <p className="text-2xl md:text-3xl font-bold text-[#0a4d8f] mb-4">
                                    {currentContent.subtitle}
                                </p>
                                <div className="w-24 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 rounded-full shadow-lg"></div>
                            </div>

                            {/* Dynamic Description */}
                            <p key={`desc-${currentSlide}`} className="text-lg text-gray-700 leading-relaxed animate-contentFadeIn delay-200 font-medium">
                                {currentContent.description}
                            </p>

                            {/* Mission Statement Box */}
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-l-4 border-[#021d49] shadow-lg animate-contentFadeIn delay-300 hover:shadow-xl transition-shadow">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-[#021d49] rounded-lg flex items-center justify-center">
                                        <Target className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#021d49] text-base mb-2">Our Mission</h3>
                                        <p className="text-sm text-gray-700 leading-relaxed">
                                            Transforming Africa through evidence-based research, innovative policy solutions, and collaborative knowledge sharing across the continent.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 animate-contentFadeIn delay-400">
                                <a
                                    href="/contact"
                                    className="group px-8 py-4 bg-[#021d49] hover:bg-[#0a4d8f] text-white font-bold text-base rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2"
                                >
                                    Join the Network
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="/about-us/mission"
                                    className="px-8 py-4 bg-white hover:bg-gray-50 text-[#021d49] font-bold text-base rounded-full border-2 border-[#021d49] transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    Learn More
                                </a>
                            </div>

                            {/* Stats Bar */}
                            <div className="grid grid-cols-3 gap-4 pt-4 animate-contentFadeIn delay-500">
                                <div className="text-center">
                                    <div className="text-3xl font-black text-[#021d49]">500+</div>
                                    <div className="text-xs text-gray-600 font-semibold">Researchers</div>
                                </div>
                                <div className="text-center border-x border-gray-200">
                                    <div className="text-3xl font-black text-[#021d49]">45+</div>
                                    <div className="text-xs text-gray-600 font-semibold">Countries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-black text-[#021d49]">200+</div>
                                    <div className="text-xs text-gray-600 font-semibold">Projects</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Image Panel with Auto-Rotation */}
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                                <img
                                    key={currentSlide}
                                    src={currentContent.image}
                                    alt={currentContent.alt}
                                    className="absolute inset-0 w-full h-full object-cover animate-fadeInImage"
                                />
                                {/* Enhanced Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                                {/* Image Caption */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl">
                                        <p className="text-sm font-bold text-[#021d49]">{currentContent.alt}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={prevSlide}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 z-10"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-6 h-6 text-[#021d49]" />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-110 z-10"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-6 h-6 text-[#021d49]" />
                            </button>

                            {/* Slide Indicators */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {featuredContent.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`h-2 rounded-full transition-all ${currentSlide === index
                                            ? 'bg-white w-10 shadow-lg'
                                            : 'bg-white/50 w-6 hover:bg-white/75'
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event & Document Section */}
                <div className="relative max-w-7xl mx-auto px-6 pb-16">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Upcoming Event Card */}
                        {upcomingEvent && (
                            <div className="bg-gradient-to-br from-[#021d49] via-[#0a4d8f] to-[#1e88e5] rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02]">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-bold mb-5">
                                    <Calendar className="w-4 h-4" />
                                    {upcomingEvent.isUpcoming ? 'Upcoming Event' : 'Recent Event'}
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4 leading-tight line-clamp-2">
                                    {upcomingEvent.title}
                                </h3>
                                <p className="text-white/90 text-base mb-6 line-clamp-2">
                                    {upcomingEvent.description ? upcomingEvent.description.replace(/<[^>]+>/g, '') : ''}
                                </p>
                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-3 text-white text-sm bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                        <Calendar className="w-5 h-5 flex-shrink-0" />
                                        <span className="font-semibold">{upcomingEvent.date ? new Date(upcomingEvent.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'TBA'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white text-sm bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                        <MapPin className="w-5 h-5 flex-shrink-0" />
                                        <span className="font-semibold">{upcomingEvent.location}</span>
                                    </div>
                                </div>
                                <a
                                    href={`/events/${upcomingEvent._id}`}
                                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-gray-100 text-[#021d49] font-bold text-base rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-105"
                                >
                                    View Details
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                            </div>
                        )}

                        {/* Latest Document Card */}
                        {latestDocument && (
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] transition-all hover:shadow-3xl hover:scale-[1.02]">
                                <div className="relative h-56">
                                    <img
                                        src={latestDocument.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"}
                                        alt={latestDocument.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    <div className="absolute top-5 left-5">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-[#021d49] text-xs font-bold shadow-lg">
                                            <FileText className="w-4 h-4" />
                                            {latestDocument.docType}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-7">
                                    <h3 className="text-2xl font-bold text-[#021d49] mb-3 leading-tight line-clamp-2">
                                        {latestDocument.title}
                                    </h3>
                                    <p className="text-gray-600 text-base mb-5 line-clamp-2">
                                        {latestDocument.description ? truncateText(latestDocument.description, 20) : ''}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Clock className="w-4 h-4" />
                                            {latestDocument.datePosted ? new Date(latestDocument.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                        </div>
                                        <a
                                            href={
                                                latestDocument.docType === 'Technical Report'
                                                    ? `/press/technical-reports/${latestDocument._id}`
                                                    : latestDocument.docType === 'Policy Brief'
                                                        ? `/press/policy-briefs/${latestDocument._id}`
                                                        : latestDocument.docType === 'News Brief'
                                                            ? `/press/news-briefs/${latestDocument._id}`
                                                            : `/programs/research-projects/${latestDocument._id}`
                                            }
                                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#021d49] hover:bg-[#0a4d8f] text-white font-semibold text-sm rounded-full transition-all shadow-lg hover:shadow-xl"
                                        >
                                            <Eye className="w-4 h-4" />
                                            View
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Access Links */}
                <div className="relative bg-gradient-to-b from-gray-50 to-white py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-14">
                            <h2 className="text-4xl md:text-5xl font-black text-[#021d49] mb-4">Explore Our Work</h2>
                            <p className="text-gray-600 text-lg font-medium">Access our latest research, publications, and impact stories</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            <a href="/press/news-briefs" className="group bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-500 transition-all hover:-translate-y-2">
                                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md">
                                    <Newspaper className="w-7 h-7 text-[#021d49]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">News Briefs</h3>
                                <p className="text-sm text-gray-600 mb-3">Latest updates and announcements</p>
                                <div className="flex items-center gap-2 text-sm text-[#021d49] font-semibold group-hover:gap-3 transition-all">
                                    Explore <ArrowRight className="w-4 h-4" />
                                </div>
                            </a>

                            <a href="/press/technical-reports" className="group bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-purple-500 transition-all hover:-translate-y-2">
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md">
                                    <FileText className="w-7 h-7 text-[#021d49]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Technical Reports</h3>
                                <p className="text-sm text-gray-600 mb-3">In-depth research findings</p>
                                <div className="flex items-center gap-2 text-sm text-[#021d49] font-semibold group-hover:gap-3 transition-all">
                                    Explore <ArrowRight className="w-4 h-4" />
                                </div>
                            </a>

                            <a href="/press/policy-briefs" className="group bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-orange-500 transition-all hover:-translate-y-2">
                                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md">
                                    <BookOpen className="w-7 h-7 text-[#021d49]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Policy Briefs</h3>
                                <p className="text-sm text-gray-600 mb-3">Evidence-based policy insights</p>
                                <div className="flex items-center gap-2 text-sm text-[#021d49] font-semibold group-hover:gap-3 transition-all">
                                    Explore <ArrowRight className="w-4 h-4" />
                                </div>
                            </a>

                            <a href="/stories-of-change" className="group bg-white p-7 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-emerald-500 transition-all hover:-translate-y-2">
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all shadow-md">
                                    <PenTool className="w-7 h-7 text-[#021d49]" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Impact Stories</h3>
                                <p className="text-sm text-gray-600 mb-3">Real-world transformations</p>
                                <div className="flex items-center gap-2 text-sm text-[#021d49] font-semibold group-hover:gap-3 transition-all">
                                    Explore <ArrowRight className="w-4 h-4" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Latest from ARIN Section */}
                <div className="bg-white py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-[#021d49] mb-4">Latest from ARIN</h2>
                            <p className="text-gray-600 text-lg font-medium">Stay updated with our newest research, insights, and impact stories</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Latest News Brief */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-[#021d49]">News Brief</h3>
                                    <a href="/press/news-briefs" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                        VIEW ALL
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                                {latestNewsBrief ? (
                                    <a href={`/press/news-briefs/${latestNewsBrief._id}`} className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#021d49] group">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={latestNewsBrief.coverImage || latestNewsBrief.image || "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80"}
                                                alt={latestNewsBrief.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80"; }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                                {latestNewsBrief.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                                {latestNewsBrief.description ? truncateText(latestNewsBrief.description, 15) : ''}
                                            </p>
                                            <p className="text-xs text-gray-400 font-semibold">
                                                {latestNewsBrief.datePosted ? new Date(latestNewsBrief.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                            </p>
                                        </div>
                                    </a>
                                ) : <div className="text-gray-400 text-sm">No news brief found.</div>}
                            </div>

                            {/* Latest Technical Report */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-[#021d49]">Technical Report</h3>
                                    <a href="/press/technical-reports" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                        VIEW ALL
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                                {latestTechnicalReport ? (
                                    <a href={`/press/technical-reports/${latestTechnicalReport._id}`} className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#021d49] group">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={latestTechnicalReport.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"}
                                                alt={latestTechnicalReport.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"; }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                                {latestTechnicalReport.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                                {latestTechnicalReport.description ? truncateText(latestTechnicalReport.description, 15) : ''}
                                            </p>
                                            <p className="text-xs text-gray-400 font-semibold">
                                                {latestTechnicalReport.datePosted ? new Date(latestTechnicalReport.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                            </p>
                                        </div>
                                    </a>
                                ) : <div className="text-gray-400 text-sm">No technical report found.</div>}
                            </div>

                            {/* Latest Policy Brief */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-[#021d49]">Policy Brief</h3>
                                    <a href="/press/policy-briefs" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                        VIEW ALL
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                                {latestPolicyBrief ? (
                                    <a href={`/press/policy-briefs/${latestPolicyBrief._id}`} className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#021d49] group">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={latestPolicyBrief.image || "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400&q=80"}
                                                alt={latestPolicyBrief.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400&q=80"; }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                                {latestPolicyBrief.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                                {latestPolicyBrief.description ? truncateText(latestPolicyBrief.description, 15) : ''}
                                            </p>
                                            <p className="text-xs text-gray-400 font-semibold">
                                                {latestPolicyBrief.datePosted ? new Date(latestPolicyBrief.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                            </p>
                                        </div>
                                    </a>
                                ) : <div className="text-gray-400 text-sm">No policy brief found.</div>}
                            </div>

                            {/* Latest Research Project */}
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-xl font-bold text-[#021d49]">Research Project</h3>
                                    <a href="/programs/research-projects" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                        VIEW ALL
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                                {latestResearchProject ? (
                                    <a href={`/programs/research-projects/${latestResearchProject._id}`} className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-[#021d49] group">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={latestResearchProject.image || "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&q=80"}
                                                alt={latestResearchProject.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&q=80"; }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>
                                        <div className="p-6">
                                            <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                                {latestResearchProject.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                                {latestResearchProject.description ? truncateText(latestResearchProject.description, 15) : ''}
                                            </p>
                                            <p className="text-xs text-gray-400 font-semibold">
                                                {latestResearchProject.datePosted ? new Date(latestResearchProject.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                            </p>
                                        </div>
                                    </a>
                                ) : <div className="text-gray-400 text-sm">No research project found.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModernHeroSection;