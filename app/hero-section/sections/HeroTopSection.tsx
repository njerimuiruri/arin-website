"use client";
import { ArrowRight, Play, Pause, Calendar, MapPin, Users, ChevronLeft, ChevronRight, FileText, Download, Eye, Clock, Tag, Newspaper, BookOpen, PenTool, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HeroTopSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activeTab, setActiveTab] = useState('event');
    const [currentDoc, setCurrentDoc] = useState(0);
    const videoRef = useRef(null);
    const autoSlideTimerRef = useRef(null);

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
            videoElement.play().catch(err => console.log("Autoplay prevented:", err));

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

    const goToSlide = (index) => {
        if (index === currentSlide) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setCurrentSlide(index);
            setIsTransitioning(false);
        }, 300);
    };

    const renderCarouselMedia = (media, index) => {
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

    const nextDoc = () => {
        setCurrentDoc((prev) => (prev + 1) % latestDocuments.length);
    };

    const prevDoc = () => {
        setCurrentDoc((prev) => (prev - 1 + latestDocuments.length) % latestDocuments.length);
    };

    return (
        <>
            <style jsx>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
                
                * {
                    font-family: 'DM Sans', sans-serif;
                }
                
                h1, h2, h3 {
                    font-family: 'Playfair Display', serif;
                }

                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                }
                
                @keyframes shimmer {
                    0% { background-position: -1000px 0; }
                    100% { background-position: 1000px 0; }
                }
                
                .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }
                .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
                .animate-scaleIn { animation: scaleIn 0.7s ease-out forwards; }
                .animate-float { animation: float 3s ease-in-out infinite; }
                
                .delay-100 { animation-delay: 0.1s; opacity: 0; }
                .delay-200 { animation-delay: 0.2s; opacity: 0; }
                .delay-300 { animation-delay: 0.3s; opacity: 0; }
                .delay-400 { animation-delay: 0.4s; opacity: 0; }
                .delay-500 { animation-delay: 0.5s; opacity: 0; }
                
                .carousel-slide {
                    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
                }
                
                .carousel-slide.transitioning {
                    opacity: 0;
                    transform: scale(1.05);
                }
                
                .gradient-text {
                    background: linear-gradient(135deg, #021d49 0%, #0a4d8f 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                
                .glass-effect {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                }
                
                .shimmer-effect {
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.3) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    background-size: 1000px 100%;
                    animation: shimmer 3s infinite;
                }
            `}</style>

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
                        {/* Latest News */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#021d49]">Latest News</h3>
                                <a href="/news" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a href="/news/g20-debt" className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] group">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80"
                                        alt="The G20 has Failed on Debt"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                        The G20 has Failed on Debt. Time to Look to the UN
                                    </h4>
                                    <p className="text-xs text-gray-500">Jan 14, 2026</p>
                                </div>
                            </a>
                        </div>

                        {/* Press Releases */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#021d49]">Press Releases</h3>
                                <a href="/press-releases" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a href="/press/ethiopian-debt" className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] group">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&q=80"
                                        alt="Bondholders seeking massive profits"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                        Bondholders seeking massive profits from Ethiopian 'debt relief'
                                    </h4>
                                    <p className="text-xs text-gray-500">Jan 13, 2026</p>
                                </div>
                            </a>
                        </div>

                        {/* Events */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#021d49]">Events</h3>
                                <a href="/events" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a href="/events/g20-webinar" className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] group">
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-600 to-orange-700">
                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <div className="text-center">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-3 rounded-full">
                                                <Play className="w-3 h-3" fill="currentColor" />
                                                Webinar
                                            </div>
                                            <h4 className="text-white font-bold text-lg leading-tight">
                                                G20 Common Framework & Africa's Debt Crisis
                                            </h4>
                                            <p className="text-white/80 text-sm mt-2">Still fit for purpose?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                                        <Calendar className="w-3 h-3" />
                                        <span>Feb 20, 2026</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Users className="w-3 h-3" />
                                        <span>300+ Expected</span>
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* Stories of Change */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-[#021d49]">Stories of Change</h3>
                                <a href="/stories" className="text-xs text-[#021d49] hover:text-[#0a4d8f] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a href="/stories/debt-justice" className="block bg-white shadow-xl hover:shadow-2xl transition-all rounded-2xl overflow-hidden border border-gray-100 hover:border-[#021d49] group">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80"
                                        alt="Stories of Change"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#021d49] text-xs font-semibold rounded-full">Impact Story</span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="p-5">
                                    <h4 className="text-base font-bold text-[#021d49] mb-2 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors leading-tight">
                                        We are galvanising a critical mass of Africans to advocate for debt justice
                                    </h4>
                                    <p className="text-xs text-gray-500">Jan 15, 2026</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroTopSection;