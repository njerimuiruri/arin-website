import { Cpu, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

const AREA = {
    title: "Technology & Innovation",
    color: "#6366f1",
    colorLight: "#eef2ff",
    colorBorder: "#c7d2fe",
    icon: Cpu,
    tagline: "Digital Solutions to Accelerate Africa's Development",
    description:
        "ARIN's Technology & Innovation focus area harnesses digital technologies, AI, and innovation ecosystems to accelerate research uptake and policy implementation. We investigate how emerging technologies can be leveraged to address Africa's most pressing development challenges while managing associated risks and inequalities.",
    highlights: [
        "Digital transformation policy",
        "Artificial intelligence in development",
        "Innovation ecosystem mapping",
        "Technology access and equity",
        "Data governance frameworks",
        "EdTech and HealthTech research",
    ],
    keyAreas: [
        {
            title: "AI & Data for Development",
            body: "Researching how artificial intelligence, big data, and machine learning can be harnessed to improve public services, agricultural productivity, and health outcomes across Africa.",
        },
        {
            title: "Digital Infrastructure & Access",
            body: "Investigating policy frameworks and investment models to expand affordable, reliable digital connectivity and device access for underserved communities.",
        },
        {
            title: "Innovation Ecosystems",
            body: "Mapping and strengthening Africa's startup, research, and entrepreneurship ecosystems to foster homegrown technological solutions to local challenges.",
        },
    ],
};

export default function TechnologyInnovationPage() {
    const Icon = AREA.icon;

    return (
        <div
            className="fd-page"
            style={{
                "--fd-color": AREA.color,
                "--fd-color-light": AREA.colorLight,
                "--fd-color-border": AREA.colorBorder,
            } as React.CSSProperties}
        >
            <Navbar />

            <section className="fd-hero">
                <div className="fd-hero-grid" />
                <div className="fd-hero-orb" />

                <div className="fd-hero-inner">
                    <a href="/about-us/focus-areas" className="fd-back">
                        <ArrowLeft /> Back to Focus Areas
                    </a>

                    <div className="fd-hero-row">
                        <div className="fd-icon">
                            <Icon />
                        </div>

                        <div className="fd-hero-text">
                            <div className="fd-badge">
                                <span className="fd-badge-dot" />
                                Focus Area
                            </div>
                            <h1 className="fd-h1">{AREA.title}</h1>
                            <p className="fd-tagline">{AREA.tagline}</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="fd-body">
                <div className="fd-content-grid">
                    <div>
                        <p className="fd-description">{AREA.description}</p>

                        <h2 className="fd-section-heading">Key Research Areas</h2>
                        <div className="fd-key-areas">
                            {AREA.keyAreas.map((ka, i) => (
                                <div key={i} className="fd-key-card">
                                    <h3 className="fd-key-card-title">{ka.title}</h3>
                                    <p className="fd-key-card-body">{ka.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="fd-sidebar">
                        <div className="fd-themes-card">
                            <div className="fd-themes-label">Key Themes</div>
                            <ul className="fd-theme-list">
                                {AREA.highlights.map((h, i) => (
                                    <li key={i} className="fd-theme-item">
                                        <CheckCircle2 />
                                        <span className="fd-theme-text">{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="fd-cta-card">
                            <p className="fd-cta-text">
                                Interested in collaborating on Technology & Innovation research?
                            </p>
                            <a href="/contact" className="fd-cta-btn">
                                Get in Touch <ArrowUpRight />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
