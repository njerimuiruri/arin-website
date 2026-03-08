"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PartnersSection = ({ partners }: { partners: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const partnersPerSlide = 6;
    const totalSlides = Math.ceil(partners.length / partnersPerSlide);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setAnimKey(k => k + 1);
            setCurrentIndex(prev => (prev + partnersPerSlide) % partners.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [partners.length, isPaused]);

    const visiblePartners = Array.from({ length: partnersPerSlide }, (_, i) =>
        partners[(currentIndex + i) % partners.length]
    );

    const goTo = (slideIndex: number) => {
        setAnimKey(k => k + 1);
        setCurrentIndex(slideIndex * partnersPerSlide);
    };

    const next = () => goTo((Math.floor(currentIndex / partnersPerSlide) + 1) % totalSlides);
    const prev = () => goTo((Math.floor(currentIndex / partnersPerSlide) - 1 + totalSlides) % totalSlides);
    const activeSlide = Math.floor(currentIndex / partnersPerSlide);

    return (
        <section className="pts-section">
            <div className="pts-lines" />
            <div className="pts-vlines" />
            <div className="pts-line-mask" />
            <div className="pts-orb1" />
            <div className="pts-orb2" />

            <div className="pts-wrap">
                <div className="pts-header">
                    <div className="pts-eyebrow">
                        <div className="pts-ey-dot" />
                        Partnerships
                    </div>
                    <h2 className="pts-title">
                        Our <em>Partners</em> &amp; Collaborators
                    </h2>
                    <p className="pts-sub">
                        Working together to transform Africa's research landscape
                    </p>
                </div>

                <div
                    className="pts-card"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {isPaused && <div className="pts-paused">Paused</div>}

                    <div className="pts-grid" key={animKey}>
                        {visiblePartners.map((partner, i) => (
                            <div
                                key={`${animKey}-${i}`}
                                className="pts-logo-item"
                                style={{ animationDelay: `${i * 0.07}s` }}
                                title={partner.name}
                            >
                                <img src={partner.logo} alt={partner.name} />
                            </div>
                        ))}
                    </div>

                    <div className="pts-controls">
                        <div className="pts-nav-group">
                            <button className="pts-nav-btn" onClick={prev} aria-label="Previous">
                                <ChevronLeft />
                            </button>
                            <button className="pts-nav-btn" onClick={next} aria-label="Next">
                                <ChevronRight />
                            </button>
                        </div>
                        <div className="pts-dots">
                            {Array.from({ length: totalSlides }).map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`pts-dot ${activeSlide === idx ? "active" : ""}`}
                                    onClick={() => goTo(idx)}
                                />
                            ))}
                        </div>
                        <div className="pts-counter">
                            <span>{activeSlide + 1}</span> / {totalSlides}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
