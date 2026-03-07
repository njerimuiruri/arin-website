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
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

                .pts-section {
                    position: relative;
                    background: #ffffff;
                    padding: 96px 0 100px;
                    overflow: hidden;
                }

                /* Line art background */
                .pts-lines {
                    position: absolute;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        0deg,
                        transparent, transparent 59px,
                        rgba(2,29,73,.04) 59px, rgba(2,29,73,.04) 60px
                    );
                    pointer-events: none;
                }
                .pts-vlines {
                    position: absolute;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        90deg,
                        transparent, transparent 79px,
                        rgba(2,29,73,.025) 79px, rgba(2,29,73,.025) 80px
                    );
                    pointer-events: none;
                }
                .pts-line-mask {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(ellipse 90% 80% at 50% 50%, transparent 20%, white 80%);
                    pointer-events: none;
                }
                .pts-orb1 {
                    position: absolute;
                    top: -140px; right: -120px;
                    width: 480px; height: 480px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(29,78,216,.05) 0%, transparent 68%);
                    pointer-events: none;
                }
                .pts-orb2 {
                    position: absolute;
                    bottom: -120px; left: -80px;
                    width: 400px; height: 400px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(2,29,73,.04) 0%, transparent 68%);
                    pointer-events: none;
                }

                .pts-section::before,
                .pts-section::after {
                    content: '';
                    position: absolute;
                    left: 0; right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(2,29,73,.08) 30%, rgba(2,29,73,.08) 70%, transparent);
                }
                .pts-section::before { top: 0; }
                .pts-section::after  { bottom: 0; }

                .pts-wrap {
                    position: relative;
                    z-index: 1;
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 32px;
                }

                .pts-header {
                    text-align: center;
                    margin-bottom: 56px;
                }
                .pts-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 500;
                    color: #1d4ed8;
                    letter-spacing: .15em;
                    text-transform: uppercase;
                    background: #eff6ff;
                    border: 1px solid #bfdbfe;
                    border-radius: 99px;
                    padding: 5px 16px;
                    margin-bottom: 18px;
                }
                .pts-ey-dot {
                    width: 5px; height: 5px;
                    border-radius: 50%;
                    background: #1d4ed8;
                    animation: ptsBlink 2s ease infinite;
                }
                @keyframes ptsBlink { 0%,100%{opacity:1} 50%{opacity:.25} }

                .pts-title {
                    font-family: 'Times New Roman', Times, serif;
                    font-weight: 700;
                    font-size: clamp(1.9rem, 3vw, 2.7rem);
                    color: #021d49;
                    line-height: 1.1;
                    letter-spacing: -0.025em;
                    margin-bottom: 12px;
                }
                .pts-title em { font-style: italic; color: #1d4ed8; }

                .pts-sub {
                    font-family: 'DM Sans', sans-serif;
                    font-size: 15px;
                    color: #94a3b8;
                    line-height: 1.7;
                }

                .pts-card {
                    position: relative;
                    background: white;
                    border: 1px solid rgba(2,29,73,.08);
                    border-radius: 28px;
                    padding: 52px 64px 40px;
                    box-shadow:
                        0 1px 0 rgba(255,255,255,1) inset,
                        0 20px 60px rgba(2,29,73,.08),
                        0 4px 12px rgba(2,29,73,.04);
                    overflow: hidden;
                }
                .pts-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #021d49, #1d4ed8, #021d49);
                    border-radius: 28px 28px 0 0;
                }

                .pts-grid {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: 32px 24px;
                    align-items: center;
                    min-height: 120px;
                }
                @media (max-width: 900px) {
                    .pts-grid { grid-template-columns: repeat(3, 1fr); }
                    .pts-card { padding: 40px 32px 32px; }
                }
                @media (max-width: 540px) {
                    .pts-grid { grid-template-columns: repeat(2, 1fr); }
                }

                @keyframes ptsLogoIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .pts-logo-item {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 12px;
                    border-radius: 14px;
                    border: 1px solid transparent;
                    transition: all .3s ease;
                    cursor: pointer;
                    opacity: 0;
                    animation: ptsLogoIn .5s ease forwards;
                    filter: none;
                }
                .pts-logo-item:hover {
                
                    opacity: 1;
                    border-color: rgba(2,29,73,.08);
                    background: #f8faff;
                    transform: translateY(-3px);
                    box-shadow: 0 8px 24px rgba(2,29,73,.08);
                }
                .pts-logo-item img {
                    max-height: 48px;
                    width: auto;
                    max-width: 100%;
                    display: block;
                    transition: transform .3s ease;
                }
                .pts-logo-item:hover img { transform: scale(1.05); }

                .pts-controls {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 36px;
                    padding-top: 28px;
                    border-top: 1px solid rgba(2,29,73,.06);
                }
                .pts-nav-btn {
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    border: 1.5px solid rgba(2,29,73,.12);
                    background: white;
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer;
                    transition: all .25s ease;
                    color: #021d49;
                    box-shadow: 0 2px 8px rgba(2,29,73,.06);
                }
                .pts-nav-btn:hover {
                    background: #021d49;
                    border-color: #021d49;
                    color: white;
                    box-shadow: 0 6px 20px rgba(2,29,73,.2);
                    transform: scale(1.08);
                }
                .pts-nav-btn svg { width: 16px; height: 16px; }
                .pts-nav-group { display: flex; align-items: center; gap: 10px; }

                .pts-dots { display: flex; align-items: center; gap: 7px; }
                .pts-dot {
                    height: 8px;
                    border-radius: 99px;
                    cursor: pointer;
                    transition: all .35s ease;
                    background: #cbd5e1;
                }
                .pts-dot.active { width: 28px; background: #021d49; }
                .pts-dot:not(.active) { width: 8px; }
                .pts-dot:not(.active):hover { width: 16px; background: #94a3b8; }

                .pts-counter {
                    font-family: 'DM Mono', monospace;
                    font-size: 11px;
                    color: #94a3b8;
                    letter-spacing: .05em;
                }
                .pts-counter span { color: #021d49; font-weight: 500; }

                .pts-paused {
                    position: absolute;
                    top: 16px; right: 20px;
                    font-family: 'DM Mono', monospace;
                    font-size: 9px;
                    letter-spacing: .1em;
                    text-transform: uppercase;
                    color: white;
                    background: #021d49;
                    padding: 4px 10px;
                    border-radius: 99px;
                }
            `}</style>

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
        </>
    );
};

export default PartnersSection;