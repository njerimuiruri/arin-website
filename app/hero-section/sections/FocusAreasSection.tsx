"use client";
import React from "react";
import { Wind, Building2, Wheat, Pickaxe, Cpu, HeartPulse, Trees, SunMedium, ArrowRight } from "lucide-react";

const areas = [
    {
        icon: SunMedium,
        title: "Sustainable Development",
        slug: "sustainable-development",
        desc: "Advancing policies and research that balance economic growth, social equity, and environmental stewardship across African nations.",
    },
    {
        icon: Wind,
        title: "Climate Change & Energy",
        slug: "climate-change-energy",
        desc: "Exploring intersections of climate systems and energy transitions to promote resilient, low-carbon solutions for the continent.",
    },
    {
        icon: Building2,
        title: "Cities & Resilience",
        slug: "cities-resilience",
        desc: "Building adaptive urban frameworks that enable African cities to withstand climate shocks, migration pressures, and infrastructure challenges.",
    },
    {
        icon: Wheat,
        title: "Agriculture & Forestry",
        slug: "agriculture-forestry",
        desc: "Driving climate-smart agriculture and sustainable forestry practices to secure food systems and rural livelihoods.",
    },
    {
        icon: Pickaxe,
        title: "Mining, Trade & Industry",
        slug: "mining-trade-industry",
        desc: "Shaping responsible resource extraction, trade policy, and industrial transformation for inclusive economic development.",
    },
    {
        icon: Cpu,
        title: "Technology & Innovation",
        slug: "technology-innovation",
        desc: "Harnessing digital technologies, AI, and innovation ecosystems to accelerate research uptake and policy implementation.",
    },
    {
        icon: HeartPulse,
        title: "Climate and Health",
        slug: "climate-health",
        desc: "Investigating the health impacts of climate change and building evidence for health-resilient communities and systems.",
    },
    {
        icon: Trees,
        title: "Forests & Ecosystems",
        slug: "forests-ecosystems",
        desc: "Protecting and restoring Africa's forests and biodiversity through evidence-based conservation and ecosystem governance.",
    },
];

export default function FocusAreasSection() {
    return (
        <section className="fa-section">
            <div className="fa-bg" />
            <div className="fa-grid-tex" />
            <div className="fa-dots-tex" />

            <div className="fa-wrap">
                {/* Header */}
                <div className="fa-header">
                    {/* <div className="fa-eyebrow">
                        <div className="fa-ey-dot" />
                        Thematic Disciplines
                    </div> */}
                    <h2 className="fa-title">
                        Our Focus Areas
                    </h2>
                    <p className="fa-subtitle">
                        ARIN pioneers path-breaking research across key thematic areas
                        shaping Africa's sustainable development agenda.
                    </p>
                </div>

                {/* Cards */}
                <div className="fa-cards">
                    {areas.map((area, i) => {
                        const Icon = area.icon;
                        return (
                            <a
                                key={area.slug}
                                href={`/about-us/focus-areas/${area.slug}`}
                                className="fa-card"
                                style={{ animationDelay: `${i * 0.07}s` } as React.CSSProperties}
                            >
                                <div className="fa-card-topbar" />
                                <div className="fa-ico-wrap">
                                    <Icon />
                                </div>
                                <div className="fa-card-title">{area.title}</div>
                                <div className="fa-card-desc">{area.desc}</div>
                                <div className="fa-learn">
                                    Learn more <ArrowRight />
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* CTA */}
                <div className="fa-cta">
                    <a href="/about-us/focus-areas" className="fa-cta-btn">
                        Explore All Focus Areas <ArrowRight />
                    </a>
                </div>
            </div>
        </section>
    );
}
