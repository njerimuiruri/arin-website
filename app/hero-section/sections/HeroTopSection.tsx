"use client";
import { ArrowRight, Play, Calendar, MapPin, Users, ChevronLeft, ChevronRight, FileText, Download, Eye, Clock, Tag, Newspaper, BookOpen, PenTool } from "lucide-react";
import { useState, useEffect } from "react";

const HeroTopSection = () => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [activeTab, setActiveTab] = useState('event');

    const mediaContent = [
        {
            type: "video",
            src: "https://www.w3schools.com/html/mov_bbb.mp4",
            thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800",
            title: "ARIN Research Impact"
        },
        {
            type: "image",
            src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800",
            title: "African Research Excellence"
        },
        {
            type: "image",
            src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800",
            title: "Building Research Capacity"
        },
        {
            type: "video",
            src: "https://www.w3schools.com/html/movie.mp4",
            thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
            title: "Collaborative Research Network"
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
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400",
            author: "Dr. Amina Okafor",
            date: "Jan 10, 2026",
            downloads: "234",
            pages: "45 pages",
            tag: "Healthcare"
        },
        {
            category: "Policy Brief",
            title: "Sustainable Agriculture Policy Framework for East Africa",
            image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400",
            author: "Prof. James Mwangi",
            date: "Jan 8, 2026",
            downloads: "189",
            pages: "12 pages",
            tag: "Agriculture"
        },
        {
            category: "News Brief",
            title: "Breakthrough in Renewable Energy Research at ARIN Conference",
            image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400",
            author: "Dr. Sarah Nkomo",
            date: "Jan 5, 2026",
            downloads: "412",
            pages: "8 pages",
            tag: "Energy"
        }
    ];

    const [currentDoc, setCurrentDoc] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % mediaContent.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const videoElement = document.querySelector('video');
        if (videoElement && mediaContent[currentSlide].type === "video") {
            videoElement.play().catch(err => console.log("Autoplay prevented:", err));
        }
    }, [currentSlide]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % mediaContent.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + mediaContent.length) % mediaContent.length);
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
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    50% { transform: translateY(-30px) translateX(10px); }
                }
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(20px) rotate(-5deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.1); }
                }
                @keyframes slide-in {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-float { animation: float 6s ease-in-out infinite; }
                .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
                .animate-float-reverse { animation: float-reverse 7s ease-in-out infinite; }
                .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
                .animate-slide-in { animation: slide-in 0.8s ease-out forwards; }
                .animation-delay-200 { animation-delay: 0.2s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .animation-delay-600 { animation-delay: 0.6s; }
            `}</style>

            <div className="relative bg-gradient-to-b from-white via-slate-50 to-white pt-10 pb-4 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Large floating orbs */}
                    <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#459db8] rounded-full opacity-5 blur-3xl animate-pulse-glow"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#14234d] rounded-full opacity-5 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

                    {/* Floating geometric shapes */}
                    <div className="absolute top-40 left-20 w-16 h-16 border-2 border-[#459db8] opacity-20 animate-float"></div>
                    <div className="absolute top-60 right-32 w-12 h-12 bg-[#459db8] opacity-10 rotate-45 animate-float-slow"></div>
                    <div className="absolute bottom-40 left-1/4 w-20 h-20 border-2 border-[#14234d] opacity-15 rounded-full animate-float-reverse"></div>
                    <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#14234d] opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>

                    {/* Small particles */}
                    <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-[#459db8] rounded-full opacity-40 animate-float-slow"></div>
                    <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-[#459db8] rounded-full opacity-30 animate-float" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-1/3 left-2/3 w-2 h-2 bg-[#14234d] rounded-full opacity-40 animate-float-reverse"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-6 w-full">
                    {/* Top Section - Headline & Trust Badge */}
                    <div className="text-center max-w-4xl mx-auto mb-6">
                        <div className="inline-flex items-center gap-2 px-5 py-2 bg-white rounded-full shadow-md border border-gray-200 mb-6 hover:shadow-lg transition-shadow animate-slide-in">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-700 font-medium">
                                Trusted by 500+ African Researchers across 35 countries
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#14234d] leading-[1.1] mb-6 animate-slide-in animation-delay-200">
                            Transforming Africa Through{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-[#459db8] to-[#14234d] bg-clip-text text-transparent">
                                    Research Excellence
                                </span>
                                <div className="absolute bottom-3 left-0 w-full h-4 bg-[#459db8] opacity-10 rounded"></div>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto animate-slide-in animation-delay-400">
                            ARIN provides a peer review platform where best research and impact practices from different African contexts are shared, profiled, and leveraged to inform transformative policy action across climate change, knowledge management, science, technology, and innovation.
                        </p>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid lg:grid-cols-5 gap-8 mb-12 animate-slide-in animation-delay-600">
                        {/* Left Side - Large Media Carousel */}
                        <div className="lg:col-span-3">
                            <div className="relative group mb-4">
                                <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl aspect-video transform hover:scale-[1.02] transition-transform duration-300">
                                    {mediaContent[currentSlide].type === "video" ? (
                                        <div className="relative w-full h-full">
                                            <video
                                                className="w-full h-full object-cover"
                                                poster={mediaContent[currentSlide].thumbnail}
                                                controls={isVideoPlaying}
                                                autoPlay
                                                muted
                                                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                                            >
                                                <source src={mediaContent[currentSlide].src} type="video/mp4" />
                                            </video>
                                            {!isVideoPlaying && (
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent flex items-center justify-center cursor-pointer" onClick={() => setIsVideoPlaying(true)}>
                                                    <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all shadow-2xl">
                                                        <Play className="w-10 h-10 text-[#14234d] ml-1" fill="currentColor" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <img
                                            src={mediaContent[currentSlide].src}
                                            alt={mediaContent[currentSlide].title}
                                            className="w-full h-full object-cover"
                                        />
                                    )}

                                    <button
                                        onClick={prevSlide}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-[#14234d]" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                    >
                                        <ChevronRight className="w-6 h-6 text-[#14234d]" />
                                    </button>

                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {mediaContent.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`h-2 rounded-full transition-all ${currentSlide === index ? 'bg-white w-8' : 'bg-white/60 w-2 hover:bg-white/80'}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h3 className="text-lg font-bold text-[#14234d]">{mediaContent[currentSlide].title}</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {mediaContent.map((media, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`relative aspect-video rounded-lg overflow-hidden transition-all hover:scale-105 ${currentSlide === index ? 'ring-3 ring-[#459db8] scale-105 shadow-lg' : 'opacity-70 hover:opacity-100 shadow-md'}`}
                                    >
                                        <img
                                            src={media.type === "video" ? media.thumbnail : media.src}
                                            alt={media.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {media.type === "video" && (
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <div className="w-8 h-8 bg-white/95 rounded-full flex items-center justify-center shadow-lg">
                                                    <Play className="w-4 h-4 text-[#14234d] ml-0.5" fill="currentColor" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - CTAs, Stats, Event & Documents */}
                        <div className="lg:col-span-2 space-y-5">
                            <div className="space-y-3">
                                <a
                                    href="/join"
                                    className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-[#459db8] to-[#14234d] hover:from-[#3a8199] hover:to-[#0d1728] text-white font-bold text-lg rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-[1.02]"
                                >
                                    Join the Network
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                                <a
                                    href="/about-us/mission"
                                    className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-white hover:bg-gray-50 text-[#14234d] font-semibold text-lg rounded-xl border-2 border-gray-200 hover:border-[#459db8] transition-all shadow-md hover:shadow-lg"
                                >
                                    Learn More
                                </a>
                            </div>

                            <div className="grid grid-cols-3 gap-4 py-5 border-y border-gray-200">
                                <div className="text-center">
                                    <div className="text-3xl lg:text-4xl font-bold text-[#14234d] mb-1">500+</div>
                                    <div className="text-xs text-gray-600 font-medium">Researchers</div>
                                </div>
                                <div className="text-center border-x border-gray-200">
                                    <div className="text-3xl lg:text-4xl font-bold text-[#14234d] mb-1">35</div>
                                    <div className="text-xs text-gray-600 font-medium">Countries</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl lg:text-4xl font-bold text-[#14234d] mb-1">1000+</div>
                                    <div className="text-xs text-gray-600 font-medium">Publications</div>
                                </div>
                            </div>

                            <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                                <button
                                    onClick={() => setActiveTab('event')}
                                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'event' ? 'bg-white text-[#14234d] shadow-md' : 'text-gray-600 hover:text-[#14234d]'}`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Event
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab('document')}
                                    className={`flex-1 px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'document' ? 'bg-white text-[#14234d] shadow-md' : 'text-gray-600 hover:text-[#14234d]'}`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <FileText className="w-4 h-4" />
                                        Document
                                    </div>
                                </button>
                            </div>

                            {activeTab === 'event' && (
                                <div className="bg-gradient-to-br from-[#14234d] via-[#1e3a5f] to-[#14234d] rounded-2xl p-6 shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-all">
                                    <div className="absolute top-0 right-0 w-48 h-48 bg-[#459db8] rounded-full opacity-10 blur-3xl animate-pulse-glow"></div>
                                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#459db8] rounded-full opacity-5 blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
                                    <div className="relative z-10">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs font-semibold mb-4">
                                            <Calendar className="w-3 h-3" />
                                            Upcoming Event
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                                            {upcomingEvent.title}
                                        </h3>

                                        <p className="text-white/80 text-sm mb-5">
                                            {upcomingEvent.description}
                                        </p>

                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 group">
                                                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                                                    <Calendar className="w-5 h-5 text-[#459db8]" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-white/70">Date</div>
                                                    <div className="text-white font-semibold text-sm">{upcomingEvent.date}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 group">
                                                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                                                    <MapPin className="w-5 h-5 text-[#459db8]" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-white/70">Location</div>
                                                    <div className="text-white font-semibold text-sm">{upcomingEvent.location}</div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 group">
                                                <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-colors">
                                                    <Users className="w-5 h-5 text-[#459db8]" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-white/70">Expected Attendees</div>
                                                    <div className="text-white font-semibold text-sm">{upcomingEvent.attendees} Researchers</div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="w-full py-3 bg-white hover:bg-gray-100 text-[#14234d] font-bold rounded-xl transition-all hover:shadow-xl group">
                                            <span className="flex items-center justify-center gap-2">
                                                Register Now
                                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'document' && (
                                <div className="bg-white rounded-2xl shadow-2xl relative overflow-hidden transform hover:scale-[1.02] transition-all">
                                    <div className="relative h-48 overflow-hidden group">
                                        <img
                                            src={latestDocuments[currentDoc].image}
                                            alt={latestDocuments[currentDoc].title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                        <div className="absolute top-4 left-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#459db8] backdrop-blur-sm rounded-full text-white text-xs font-semibold">
                                                <FileText className="w-3 h-3" />
                                                {latestDocuments[currentDoc].category}
                                            </div>
                                        </div>

                                        <div className="absolute top-4 right-4">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[#14234d] text-xs font-semibold">
                                                <Tag className="w-3 h-3" />
                                                {latestDocuments[currentDoc].tag}
                                            </div>
                                        </div>

                                        <button
                                            onClick={prevDoc}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                        >
                                            <ChevronLeft className="w-4 h-4 text-[#14234d]" />
                                        </button>
                                        <button
                                            onClick={nextDoc}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                        >
                                            <ChevronRight className="w-4 h-4 text-[#14234d]" />
                                        </button>
                                    </div>

                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-[#14234d] mb-4 leading-tight line-clamp-2 min-h-[3.5rem]">
                                            {latestDocuments[currentDoc].title}
                                        </h3>

                                        <div className="space-y-2.5 mb-5">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <div className="w-8 h-8 bg-gradient-to-br from-[#459db8] to-[#14234d] rounded-full flex items-center justify-center text-white font-bold text-xs">
                                                    {latestDocuments[currentDoc].author.split(' ')[1][0]}
                                                </div>
                                                <span className="font-medium">{latestDocuments[currentDoc].author}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {latestDocuments[currentDoc].date}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <FileText className="w-3.5 h-3.5" />
                                                    {latestDocuments[currentDoc].pages}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Download className="w-3.5 h-3.5" />
                                                    {latestDocuments[currentDoc].downloads}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center gap-1.5 mb-5">
                                            {latestDocuments.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => setCurrentDoc(index)}
                                                    className={`h-1.5 rounded-full transition-all ${currentDoc === index ? 'bg-[#459db8] w-6' : 'bg-gray-300 w-1.5 hover:bg-gray-400'}`}
                                                />
                                            ))}
                                        </div>

                                        <div className="flex gap-2">
                                            <button className="flex-1 py-2.5 bg-gradient-to-r from-[#459db8] to-[#14234d] hover:from-[#3a8199] hover:to-[#0d1728] text-white font-semibold text-sm rounded-lg transition-all hover:shadow-lg group">
                                                <span className="flex items-center justify-center gap-2">
                                                    <Eye className="w-4 h-4" />
                                                    View
                                                </span>
                                            </button>
                                            <button className="flex-1 py-2.5 bg-white hover:bg-gray-50 text-[#14234d] font-semibold text-sm rounded-lg border-2 border-gray-200 hover:border-[#459db8] transition-all group">
                                                <span className="flex items-center justify-center gap-2">
                                                    <Download className="w-4 h-4" />
                                                    Download
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Access Section */}
            <div className="mt-8 mb-12 max-w-6xl mx-auto px-6">
                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-[#14234d]">Quick Access</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <a href="/news-briefs" className="group bg-white px-6 py-6 text-gray-700 hover:text-white text-sm font-semibold transition-all shadow-md hover:shadow-xl border border-gray-200 hover:border-[#459db8] text-center hover:bg-gradient-to-br hover:from-[#459db8] hover:to-[#14234d] transform hover:-translate-y-1 rounded-xl">
                        <Newspaper className="w-6 h-6 mx-auto mb-2 text-[#459db8] group-hover:text-white transition-colors" />
                        News Brief
                    </a>
                    <a href="/technical-reports" className="group bg-white px-6 py-6 text-gray-700 hover:text-white text-sm font-semibold transition-all shadow-md hover:shadow-xl border border-gray-200 hover:border-[#459db8] text-center hover:bg-gradient-to-br hover:from-[#459db8] hover:to-[#14234d] transform hover:-translate-y-1 rounded-xl">
                        <FileText className="w-6 h-6 mx-auto mb-2 text-[#459db8] group-hover:text-white transition-colors" />
                        Technical Report
                    </a>
                    <a href="/policy-briefs" className="group bg-white px-6 py-6 text-gray-700 hover:text-white text-sm font-semibold transition-all shadow-md hover:shadow-xl border border-gray-200 hover:border-[#459db8] text-center hover:bg-gradient-to-br hover:from-[#459db8] hover:to-[#14234d] transform hover:-translate-y-1 rounded-xl">
                        <BookOpen className="w-6 h-6 mx-auto mb-2 text-[#459db8] group-hover:text-white transition-colors" />
                        Policy Brief
                    </a>
                    <a href="/stories-of-change" className="group bg-white px-6 py-6 text-gray-700 hover:text-white text-sm font-semibold transition-all shadow-md hover:shadow-xl border border-gray-200 hover:border-[#459db8] text-center hover:bg-gradient-to-br hover:from-[#459db8] hover:to-[#14234d] transform hover:-translate-y-1 rounded-xl">
                        <PenTool className="w-6 h-6 mx-auto mb-2 text-[#459db8] group-hover:text-white transition-colors" />
                        Story of Change
                    </a>
                </div>
            </div>

            {/* Latest Posts Section */}
            <div className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Latest News */}
                        <div>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#14234d]">
                                <h3 className="text-xl font-bold text-[#14234d]">Latest News</h3>
                                <a href="/news" className="text-xs text-[#459db8] hover:text-[#14234d] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a href="/news/g20-debt" className="block bg-white shadow-md hover:shadow-xl transition-all rounded-xl overflow-hidden">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600"
                                        alt="The G20 has Failed on Debt"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-base font-bold text-[#14234d] mb-2 line-clamp-2 hover:text-[#459db8] transition-colors">
                                        The G20 has Failed on Debt. Time to Look to the UN
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-3">Jan 14, 2026</p>
                                </div>
                            </a>
                        </div>

                        {/* Press Releases & Statements */}
                        <div>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#14234d]">
                                <h3 className="text-xl font-bold text-[#14234d]">Press Releases</h3>
                                <a href="/press-releases" className="text-xs text-[#459db8] hover:text-[#14234d] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a href="/press/ethiopian-debt" className="block bg-white shadow-md hover:shadow-xl transition-all rounded-xl overflow-hidden">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600"
                                        alt="Bondholders seeking massive profits"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h4 className="text-base font-bold text-[#14234d] mb-2 line-clamp-2 hover:text-[#459db8] transition-colors">
                                        Bondholders seeking massive profits from Ethiopian 'debt relief'
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-3">Jan 13, 2026</p>
                                </div>
                            </a>
                        </div>

                        {/* Events */}
                        <div>
                            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#14234d]">
                                <h3 className="text-xl font-bold text-[#14234d]">Events</h3>
                                <a href="/events" className="text-xs text-[#459db8] hover:text-[#14234d] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a href="/events/g20-webinar" className="block bg-white shadow-md hover:shadow-xl transition-all rounded-xl overflow-hidden">
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-amber-700 to-amber-900">
                                    <div className="absolute inset-0 flex items-center justify-center p-6">
                                        <div className="text-center">
                                            <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold mb-2 rounded-full">
                                                ▶ Webinar
                                            </div>
                                            <h4 className="text-white font-bold text-lg leading-tight">
                                                G20 Common Framework & Africa's Debt Crisis
                                            </h4>
                                            <p className="text-amber-200 text-sm mt-2">Still fit for purpose?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
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
                            <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-[#14234d]">
                                <h3 className="text-xl font-bold text-[#14234d]">Stories of Change</h3>
                                <a href="/stories" className="text-xs text-[#459db8] hover:text-[#14234d] font-semibold flex items-center gap-1 group">
                                    VIEW ALL
                                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                            <a href="/stories/debt-justice" className="block bg-white shadow-md hover:shadow-xl transition-all rounded-xl overflow-hidden">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600"
                                        alt="Stories of Change"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <span className="px-2 py-1 bg-white/90 text-[#14234d] text-xs font-semibold rounded-full">Impact Story</span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h4 className="text-base font-bold text-[#14234d] mb-2 line-clamp-2 hover:text-[#459db8] transition-colors">
                                        We are galvanising a critical mass of Africans to advocate for debt justice
                                    </h4>
                                    <p className="text-xs text-gray-500 mb-3">Jan 15, 2026</p>
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