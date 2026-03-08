"use client";
import React from "react";
import { ArrowUpRight, FlaskConical, Lightbulb, BookOpen, Users } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

const pillars = [
    {
        icon: FlaskConical,
        title: "Share Research Trends",
        desc: "Develop models and best practices on pathways to research excellence and impact.",
    },
    {
        icon: BookOpen,
        title: "Policy Reviews",
        desc: "Convene evidence and impact dialogues that inform transformative policy action.",
    },
    {
        icon: Users,
        title: "Support Knowledge Systems",
        desc: "Build capacity of individuals and institutions on transformative research and impact pathways.",
    },
];

export default function ARINAboutPage() {
    return (
        <>
            <Navbar />
            <div className="ab-page">

                {/* ══ SECTION 1: OUR MISSION ══ */}
                <section className="ms-section">
                    <div className="ms-wrap">

                        {/* Top row */}
                        <div className="ms-top">
                            <div>
                                <div className="ab-eyebrow">
                                    <span className="ab-eyebrow-dot" />
                                    Our Mission
                                </div>
                                <h1 className="ms-title">
                                    Research &amp; Policy<br />
                                    Transformation for<br />
                                    <em>Sustainable Africa</em>
                                </h1>
                            </div>
                            <div className="ms-right">
                                <p className="ms-body">
                                    ARIN seeks to identify and leverage key research talents to flexibly and innovatively contribute to Africa's research transformation, policy analysis and capacity building. ARIN provides a peer review platform where best research and impact practices from different African contexts are shared, profiled, and leveraged to inform transformative policy action.
                                </p>
                                {/* <a href="/about-us" className="ms-btn">
                                    Learn More <ArrowUpRight />
                                </a> */}
                            </div>
                        </div>

                        {/* Strip: img | card | img | card */}
                        <div className="ms-strip">
                            {/* Image 1 */}
                            <div className="ms-strip-img">
                                <img src="/images/DSC_0318.jpg" alt="ARIN Researchers" />
                            </div>

                            {/* Card 1 — Mission */}
                            <div className="ms-strip-card">
                                <div>
                                    <div className="ms-card-ico">
                                        <FlaskConical />
                                    </div>
                                    <div className="ms-card-title">Our Mission</div>
                                    <div className="ms-card-desc">
                                        ARIN connects scholars, institutions, and policymakers to drive evidence-based solutions that shape millions of lives across Africa.
                                    </div>
                                    <div className="ms-card-divider" />
                                    <div className="ms-card-bullet">Evidence-Based Research</div>
                                </div>
                            </div>

                            {/* Image 2 */}
                            <div className="ms-strip-img">
                                <img src="/images/lreb.jpg" alt="Africa Research" />
                            </div>

                            {/* Card 2 — Vision */}
                            <div className="ms-strip-card">
                                <div>
                                    <div className="ms-card-ico">
                                        <Lightbulb />
                                    </div>
                                    <div className="ms-card-title">Our Vision</div>
                                    <div className="ms-card-desc">
                                        To become the leading pan-African research network driving science-policy interface and innovation across the continent.
                                    </div>
                                    <div className="ms-card-divider" />
                                    <div className="ms-card-bullet">Pan-African Impact</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ══ SECTION 2: WHY US ══ */}
                <section className="wu-section">
                    <div className="wu-lines" />
                    <div className="wu-line-mask" />

                    <div className="wu-wrap">

                        {/* Left: stacked images */}
                        <div className="wu-img-stack">
                            <div className="wu-img-back">
                                <img src="/images/map.jpg" alt="ARIN Network" />
                            </div>
                            <div className="wu-img-front">
                                <img src="/images/map.jpg" alt="ARIN Research" />
                            </div>
                            {/* Floating badge */}
                            {/* <div className="wu-badge">
                                <div className="wu-badge-num">25+</div>
                                <div className="wu-badge-lbl">Countries</div>
                            </div> */}
                        </div>

                        {/* Right: text */}
                        <div>
                            <div className="ab-eyebrow">
                                <span className="ab-eyebrow-dot" />
                                Why Choose ARIN
                            </div>
                            <h2 className="wu-title">
                                From Research to<br />
                                <em>Real-World Impact</em><br />
                                Across Africa
                            </h2>
                            <p className="wu-body">
                                Among the areas that ARIN has pioneered path-breaking research are climate change, knowledge management, science technology, and innovation. The network convenes research and policy platforms on climate action — drawing from researchers on adaptation, STI status, and science-policy interface in Africa.
                            </p>

                            {/* 3-pillar strip */}
                            <div className="wu-pillars">
                                {pillars.map((p, i) => {
                                    const Icon = p.icon;
                                    return (
                                        <div key={i} className="wu-pillar">
                                            <div className="wu-pillar-ico"><Icon /></div>
                                            <div className="wu-pillar-title">{p.title}</div>
                                        </div>
                                    );
                                })}
                            </div>

                            <a href="/contact" className="wu-btn">
                                Contact Us <ArrowUpRight />
                            </a>
                        </div>

                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
}
