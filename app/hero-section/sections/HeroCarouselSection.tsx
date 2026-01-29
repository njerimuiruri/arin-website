"use client";
import { ArrowRight, Play, Pause, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const HeroCarouselSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
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

    return (
        <div className="relative w-full bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
            <div
                className="relative w-full h-[75vh] md:h-[85vh] overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className={`carousel-slide ${isTransitioning ? 'transitioning' : ''}`}>
                    {renderCarouselMedia(mediaContent[currentSlide], currentSlide)}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-7xl mx-auto px-6 pb-16 w-full">
                            <div className="max-w-3xl">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full mb-4 animate-slideUp">
                                    <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                                    <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
                                        {mediaContent[currentSlide].subtitle}
                                    </span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight animate-slideUp delay-100">
                                    {mediaContent[currentSlide].title}
                                </h2>
                                <p className="text-base md:text-lg text-white/90 mb-6 leading-relaxed animate-slideUp delay-200">
                                    {mediaContent[currentSlide].description}
                                </p>
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
    );
};

export default HeroCarouselSection;
