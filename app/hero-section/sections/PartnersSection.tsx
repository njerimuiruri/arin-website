"use client";

import { useState, useEffect } from "react";

const PartnersSection = ({ partners }: { partners: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const partnersPerSlide = 6;

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + partnersPerSlide) % partners.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [partners.length, isPaused]);

    const visiblePartners = [];
    for (let i = 0; i < partnersPerSlide; i++) {
        visiblePartners.push(partners[(currentIndex + i) % partners.length]);
    }

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex * partnersPerSlide);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + partnersPerSlide) % partners.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => {
            const newIndex = prev - partnersPerSlide;
            return newIndex < 0 ? partners.length - partnersPerSlide : newIndex;
        });
    };

    return (
        <section className="max-w-[1600px] mx-auto px-6 pb-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4" style={{ color: '#14234d' }}>
                    Our Partners
                </h2>
                <p className="text-gray-600 text-lg">
                    Working together to transform Africa's research landscape
                </p>
            </div>

            <div
                className="relative bg-gradient-to-br from-white to-blue-50 rounded-3xl p-12 shadow-xl border-2 overflow-hidden"
                style={{ borderColor: '#459db8' }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                    style={{ borderWidth: '2px', borderColor: '#459db8' }}
                    aria-label="Previous partners"
                >
                    <svg
                        className="w-6 h-6 transition-transform group-hover:-translate-x-1"
                        style={{ color: '#459db8' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                    style={{ borderWidth: '2px', borderColor: '#459db8' }}
                    aria-label="Next partners"
                >
                    <svg
                        className="w-6 h-6 transition-transform group-hover:translate-x-1"
                        style={{ color: '#459db8' }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 items-center transition-all duration-700 ease-in-out px-8">
                    {visiblePartners.map((partner, index) => (
                        <div
                            key={`${currentIndex}-${index}`}
                            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100 hover:scale-110 animate-fadeIn group"
                        >
                            <div className="relative">
                                <img
                                    src={partner.logo}
                                    alt={partner.name}
                                    className="max-h-16 w-auto transition-all duration-300"
                                />
                                <div
                                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                                    style={{ backgroundColor: '#459db8' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-3 mt-10">
                    {Array.from({ length: Math.ceil(partners.length / partnersPerSlide) }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${Math.floor(currentIndex / partnersPerSlide) === idx
                                ? 'w-10'
                                : 'w-2.5 hover:w-6'
                                }`}
                            style={{
                                backgroundColor: Math.floor(currentIndex / partnersPerSlide) === idx
                                    ? '#459db8'
                                    : '#cbd5e1'
                            }}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Pause Indicator */}
                {isPaused && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium text-white shadow-md" style={{ backgroundColor: '#459db8' }}>
                        Paused
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(15px);
                    }
                    to {
                        opacity: 0.7;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.6s ease-out;
                }
            `}</style>
        </section>
    );
};

export default PartnersSection;