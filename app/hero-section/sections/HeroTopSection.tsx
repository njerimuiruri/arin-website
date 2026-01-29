"use client";
import { ArrowRight, Play, Pause, Calendar, MapPin, Users, ChevronLeft, ChevronRight, FileText, Download, Eye, Clock, Tag, Newspaper, BookOpen, PenTool, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { getEvents, Event as ArinEvent } from "@/services/eventsService";
import { technicalReportsService, TechnicalReport } from "@/services/technicalReportsService";
import { policyBriefsService, PolicyBrief } from "@/services/policyBriefsService";
import { getNewsBriefs } from "@/services/newsBriefsService";
import { getResearchProjects } from "@/services/researchProjectService";

interface NewsBrief {
    _id?: string;
    title: string;
    description?: string;
    authors?: string[];
    image?: string;
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

const HeroTopSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const autoSlideTimerRef = useRef<NodeJS.Timeout | null>(null);

    const mediaContent = [
        {
            type: "youtube",
            videoId: "GYrEMHVHzyo",
            thumbnail: "/images/aafellows.png",
            title: "Accountable Adaptation",
            subtitle: "Building Climate Resilience",
            description: "Transparent governance for sustainable development across Africa",
            duration: 7000
        },
        {
            type: "video",
            src: "/videos/local-video-1.mp4",
            thumbnail: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&q=80",
            title: "African Research Excellence",
            subtitle: "Knowledge Systems",
            description: "Advancing research and innovation across the continent",
            duration: null
        },
        {
            type: "youtube",
            videoId: "ScMzIvxBSi4",
            thumbnail: "https://img.youtube.com/vi/ScMzIvxBSi4/maxresdefault.jpg",
            title: "Climate Action Networks",
            subtitle: "Collaborative Solutions",
            description: "Working together for sustainable and resilient futures",
            duration: 7000
        },
        {
            type: "image",
            src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1920&q=80",
            title: "Building Research Capacity",
            subtitle: "Next Generation Leaders",
            description: "Empowering African researchers to drive transformative change",
            duration: 6000
        },
        {
            type: "video",
            src: "/videos/local-video-2.mp4",
            thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80",
            title: "Collaborative Research Network",
            subtitle: "Connected for Impact",
            description: "Bridging research communities across Africa for greater reach",
            duration: null
        }
    ];

    const [upcomingEvent, setUpcomingEvent] = useState<EventWithFlag | null>(null);
    const [latestDocument, setLatestDocument] = useState<any | null>(null);
    const [latestTechnicalReport, setLatestTechnicalReport] = useState<TechnicalReport | null>(null);
    const [latestPolicyBrief, setLatestPolicyBrief] = useState<PolicyBrief | null>(null);
    const [latestNewsBrief, setLatestNewsBrief] = useState<NewsBrief | null>(null);
    const [latestResearchProject, setLatestResearchProject] = useState<ResearchProject | null>(null);

    // Auto-slide functionality
    useEffect(() => {
        if (isPaused) return;

        const currentMedia = mediaContent[currentSlide];

        if (autoSlideTimerRef.current) {
            clearTimeout(autoSlideTimerRef.current);
        }

        if (currentMedia.type === "video" && videoRef.current) {
            const videoElement = videoRef.current;
            const handleVideoEnd = () => {
                nextSlide();
            };
            videoElement.addEventListener('ended', handleVideoEnd);
            videoElement.play().catch((err: any) => console.log("Autoplay prevented:", err));

            return () => {
                videoElement.removeEventListener('ended', handleVideoEnd);
            };
        } else {
            const duration = currentMedia.duration || 6000;
            autoSlideTimerRef.current = setTimeout(() => {
                nextSlide();
            }, duration);
        }

        return () => {
            if (autoSlideTimerRef.current) {
                clearTimeout(autoSlideTimerRef.current);
            }
        };
    }, [currentSlide, isPaused]);

    // Fetch latest content on mount
    useEffect(() => {
        async function fetchLatest() {
            const events = await getEvents();
            if (Array.isArray(events) && events.length > 0) {
                const now = new Date();
                const upcoming = events.filter(e => new Date(e.date) >= now);
                if (upcoming.length > 0) {
                    const next = upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
                    setUpcomingEvent({ ...next, isUpcoming: true });
                } else {
                    const past = events.filter(e => new Date(e.date) < now);
                    if (past.length > 0) {
                        const last = past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                        setUpcomingEvent({ ...last, isUpcoming: false });
                    } else {
                        setUpcomingEvent(null);
                    }
                }
            } else {
                setUpcomingEvent(null);
            }

            const [techReports, policyBriefs, newsBriefs, researchProjects] = await Promise.all([
                technicalReportsService.getAll(),
                policyBriefsService.getAll(),
                getNewsBriefs(),
                getResearchProjects()
            ]);

            // Set individual latest items
            if (Array.isArray(techReports) && techReports.length > 0) {
                techReports.sort((a, b) => new Date(b.datePosted || 0).getTime() - new Date(a.datePosted || 0).getTime());
                setLatestTechnicalReport(techReports[0]);
            } else {
                setLatestTechnicalReport(null);
            }

            if (Array.isArray(policyBriefs) && policyBriefs.length > 0) {
                policyBriefs.sort((a, b) => new Date(b.datePosted || 0).getTime() - new Date(a.datePosted || 0).getTime());
                setLatestPolicyBrief(policyBriefs[0]);
            } else {
                setLatestPolicyBrief(null);
            }

            if (Array.isArray(newsBriefs) && newsBriefs.length > 0) {
                newsBriefs.sort((a, b) => new Date(b.datePosted || b.createdAt || b.date || 0).getTime() - new Date(a.datePosted || a.createdAt || a.date || 0).getTime());
                setLatestNewsBrief(newsBriefs[0]);
            } else {
                setLatestNewsBrief(null);
            }

            if (Array.isArray(researchProjects) && researchProjects.length > 0) {
                researchProjects.sort((a, b) => new Date(b.datePosted || b.createdAt || b.date || 0).getTime() - new Date(a.datePosted || a.createdAt || a.date || 0).getTime());
                setLatestResearchProject(researchProjects[0]);
            } else {
                setLatestResearchProject(null);
            }

            // Set combined latest document
            const allDocs = [];
            if (Array.isArray(techReports)) allDocs.push(...techReports.map(d => ({ ...d, docType: 'Technical Report' })));
            if (Array.isArray(policyBriefs)) allDocs.push(...policyBriefs.map(d => ({ ...d, docType: 'Policy Brief' })));
            if (Array.isArray(newsBriefs)) allDocs.push(...newsBriefs.map(d => ({ ...d, docType: 'News Brief' })));
            if (Array.isArray(researchProjects)) allDocs.push(...researchProjects.map(d => ({ ...d, docType: 'Research Project' })));

            if (allDocs.length > 0) {
                allDocs.sort((a, b) => new Date(b.datePosted || b.createdAt || b.date || 0).getTime() - new Date(a.datePosted || a.createdAt || a.date || 0).getTime());
                setLatestDocument(allDocs[0]);
            } else {
                setLatestDocument(null);
            }
        }
        fetchLatest();
    }, []);

    const nextSlide = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % mediaContent.length);
            setIsTransitioning(false);
        }, 300);
    };

    const prevSlide = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide((prev) => (prev - 1 + mediaContent.length) % mediaContent.length);
            setIsTransitioning(false);
        }, 300);
    };

    const goToSlide = (index: number) => {
        if (index === currentSlide) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(index);
            setIsTransitioning(false);
        }, 300);
    };

    const renderCarouselMedia = (media: any, index: number) => {
        if (media.type === "youtube") {
            return (
                <iframe
                    src={`https://www.youtube.com/embed/${media.videoId}?autoplay=1&mute=1&controls=0&rel=0&loop=1&playlist=${media.videoId}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={media.title}
                />
            );
        } else if (media.type === "video") {
            return (
                <video
                    ref={index === currentSlide ? videoRef : null}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={media.thumbnail}
                    autoPlay
                    muted
                    playsInline
                >
                    <source src={media.src} type="video/mp4" />
                </video>
            );
        } else {
            return (
                <img
                    src={media.src}
                    alt={media.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            );
        }
    };

    return (
        <>
            {/* HERO CAROUSEL SECTION - FULL WIDTH AT TOP */}
            <div className="relative w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                {/* Main Carousel */}
                <div
                    className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {/* Carousel Content */}
                    <div className={`carousel-slide ${isTransitioning ? 'transitioning' : ''}`}>
                        {renderCarouselMedia(mediaContent[currentSlide], currentSlide)}

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>

                        {/* Content Overlay */}
                        <div className="absolute inset-0 flex items-end">
                            <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
                                <div className="max-w-3xl">
                                    {/* Subtitle Badge */}
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full mb-4 animate-slideUp">
                                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                        <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
                                            {mediaContent[currentSlide].subtitle}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight animate-slideUp delay-100">
                                        {mediaContent[currentSlide].title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed animate-slideUp delay-200">
                                        {mediaContent[currentSlide].description}
                                    </p>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-wrap gap-3 animate-slideUp delay-300">
                                        <a
                                            href="/join"
                                            className="group px-6 py-3 bg-white hover:bg-gray-100 text-[#021d49] font-bold text-sm rounded-full transition-all shadow-2xl hover:shadow-white/20 hover:scale-105 flex items-center gap-2"
                                        >
                                            Join the Network
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </a>
                                        <a
                                            href="/about-us/mission"
                                            className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm rounded-full border-2 border-white/30 hover:border-white/50 transition-all"
                                        >
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Controls */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 z-20"
                        >
                            <ChevronLeft className="w-7 h-7 text-white" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 z-20"
                        >
                            <ChevronRight className="w-7 h-7 text-white" />
                        </button>

                        {/* Pause/Play Button */}
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="absolute top-6 right-6 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all hover:scale-110 z-20"
                        >
                            {isPaused ? (
                                <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                            ) : (
                                <Pause className="w-5 h-5 text-white" fill="currentColor" />
                            )}
                        </button>

                        {/* Slide Indicators */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                            {mediaContent.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`h-1.5 rounded-full transition-all ${currentSlide === index
                                        ? 'bg-white w-12'
                                        : 'bg-white/40 w-8 hover:bg-white/60'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Thumbnail Navigation Strip */}
                <div className="relative bg-slate-900/50 backdrop-blur-md border-t border-white/10">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="grid grid-cols-5 gap-4">
                            {mediaContent.map((media, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`relative aspect-video rounded-lg overflow-hidden transition-all ${currentSlide === index
                                        ? 'ring-3 ring-white scale-105 shadow-xl'
                                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                                        }`}
                                >
                                    <img
                                        src={media.thumbnail || media.src}
                                        alt={media.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {(media.type === "video" || media.type === "youtube") && (
                                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                            <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                                                <Play className="w-4 h-4 text-slate-900 ml-0.5" fill="currentColor" />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT SECTION */}
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
                                {upcomingEvent
                                    ? (upcomingEvent.isUpcoming ? 'Upcoming Event' : 'Most Recent Past Event')
                                    : 'No Event'}
                            </div>
                            {upcomingEvent ? (
                                <>
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
                                                <div className="text-white font-semibold">{upcomingEvent.attendees || 'N/A'} Researchers</div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="w-full py-4 bg-white hover:bg-gray-100 text-[#021d49] font-bold rounded-xl transition-all hover:shadow-xl group">
                                        <span className="flex items-center justify-center gap-2">
                                            {upcomingEvent.isUpcoming ? 'Register Now' : 'View Details'}
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </button>
                                </>
                            ) : (
                                <div className="text-white text-lg font-semibold">No event upcoming or past found.</div>
                            )}
                        </div>

                        {/* Latest Document Card */}
                        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn delay-500">
                            {latestDocument ? (
                                <>
                                    <div className="relative h-64 overflow-hidden group">
                                        <img
                                            src={latestDocument.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"}
                                            alt={latestDocument.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                        <div className="absolute top-6 left-6">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#021d49] backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                                                <FileText className="w-4 h-4" />
                                                {latestDocument.docType}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-[#021d49] mb-4 leading-tight min-h-16">
                                            {latestDocument.title}
                                        </h3>
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <span className="font-semibold">{latestDocument.authors ? latestDocument.authors.join(', ') : latestDocument.author || ''}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    {latestDocument.datePosted || latestDocument.createdAt || latestDocument.date || ''}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-3">
                                            <a
                                                href={`/${latestDocument.docType.replace(/ /g, '-').toLowerCase()}s/${latestDocument._id}`}
                                                className="flex-1 py-3 bg-gradient-to-r from-[#021d49] to-[#0a4d8f] hover:from-[#021d49]/90 hover:to-[#0a4d8f]/90 text-white font-semibold rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2"
                                            >
                                                <Eye className="w-4 h-4" />
                                                View
                                            </a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="p-8 text-center text-gray-400 text-lg font-semibold">No document found.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Access Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#021d49] mb-4">Quick Access</h2>
                        <p className="text-gray-600">Explore our latest research and publications</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <a href="/news-briefs" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#021d49] text-center transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <Newspaper className="w-8 h-8 text-[#021d49]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">News Brief</h3>
                            <p className="text-sm text-gray-600">Latest updates and announcements</p>
                        </a>

                        <a href="/technical-reports" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#021d49] text-center transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-8 h-8 text-[#021d49]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Technical Report</h3>
                            <p className="text-sm text-gray-600">In-depth research findings</p>
                        </a>

                        <a href="/policy-briefs" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#021d49] text-center transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-8 h-8 text-[#021d49]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Policy Brief</h3>
                            <p className="text-sm text-gray-600">Policy recommendations and insights</p>
                        </a>

                        <a href="/stories-of-change" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#021d49] text-center transition-all hover:-translate-y-2">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                <PenTool className="w-8 h-8 text-[#021d49]" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Story of Change</h3>
                            <p className="text-sm text-gray-600">Impact stories from the field</p>
                        </a>
                    </div>
                </div>
            </div>

            {/* Latest Posts Section */}
            <div className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#021d49] mb-4">Latest from ARIN</h2>
                        <p className="text-gray-600">Stay updated with our newest content and insights</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Latest News Brief */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#021d49]">Latest News Brief</h3>
                                <a href="/news-briefs" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            {latestNewsBrief ? (
                                <div className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={latestNewsBrief.coverImage || latestNewsBrief.image || "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80"}
                                            alt={latestNewsBrief.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=80"; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                            {latestNewsBrief.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {latestNewsBrief.description ? latestNewsBrief.description.replace(/<[^>]+>/g, '').split(' ').slice(0, 10).join(' ') + (latestNewsBrief.description.replace(/<[^>]+>/g, '').split(' ').length > 10 ? '...' : '') : ''}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {latestNewsBrief.datePosted ? new Date(latestNewsBrief.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                        </p>
                                        <a href={`/news-briefs/${latestNewsBrief._id}`} className="mt-2 inline-block text-xs text-[#0a4d8f] font-semibold underline hover:text-[#021d49]">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ) : <div className="text-gray-400">No news brief found.</div>}
                        </div>

                        {/* Latest Technical Report */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#021d49]">Technical Report</h3>
                                <a href="/technical-reports" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            {latestTechnicalReport ? (
                                <div className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={latestTechnicalReport.image || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"}
                                            alt={latestTechnicalReport.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                            {latestTechnicalReport.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {latestTechnicalReport.description ? latestTechnicalReport.description.replace(/<[^>]+>/g, '').split(' ').slice(0, 10).join(' ') + (latestTechnicalReport.description.replace(/<[^>]+>/g, '').split(' ').length > 10 ? '...' : '') : ''}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {latestTechnicalReport.datePosted ? new Date(latestTechnicalReport.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                        </p>
                                        <a href={`/technical-reports/${latestTechnicalReport._id}`} className="mt-2 inline-block text-xs text-[#0a4d8f] font-semibold underline hover:text-[#021d49]">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ) : <div className="text-gray-400">No technical report found.</div>}
                        </div>

                        {/* Latest Policy Brief */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#021d49]">Policy Brief</h3>
                                <a href="/policy-briefs" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            {latestPolicyBrief ? (
                                <div className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={latestPolicyBrief.image || "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400&q=80"}
                                            alt={latestPolicyBrief.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1625246333195-78d9c38ad649?w=400&q=80"; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                            {latestPolicyBrief.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {latestPolicyBrief.description ? latestPolicyBrief.description.replace(/<[^>]+>/g, '').split(' ').slice(0, 10).join(' ') + (latestPolicyBrief.description.replace(/<[^>]+>/g, '').split(' ').length > 10 ? '...' : '') : ''}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {latestPolicyBrief.datePosted ? new Date(latestPolicyBrief.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                        </p>
                                        <a href={`/policy-briefs/${latestPolicyBrief._id}`} className="mt-2 inline-block text-xs text-[#0a4d8f] font-semibold underline hover:text-[#021d49]">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ) : <div className="text-gray-400">No policy brief found.</div>}
                        </div>

                        {/* Latest Research Project */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#021d49]">Research Project</h3>
                                <a href="/research-projects" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            {latestResearchProject ? (
                                <div className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] group">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={latestResearchProject.image || "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&q=80"}
                                            alt={latestResearchProject.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&q=80"; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                            {latestResearchProject.title}
                                        </h4>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {latestResearchProject.description ? latestResearchProject.description.replace(/<[^>]+>/g, '').split(' ').slice(0, 10).join(' ') + (latestResearchProject.description.replace(/<[^>]+>/g, '').split(' ').length > 10 ? '...' : '') : ''}
                                        </p>
                                        <p className="text-xs text-gray-500 mb-1">
                                            {latestResearchProject.datePosted ? new Date(latestResearchProject.datePosted).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                        </p>
                                        <a href={`/research-projects/${latestResearchProject._id}`} className="mt-2 inline-block text-xs text-[#0a4d8f] font-semibold underline hover:text-[#021d49]">
                                            Read More
                                        </a>
                                    </div>
                                </div>
                            ) : <div className="text-gray-400">No research project found.</div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroTopSection;