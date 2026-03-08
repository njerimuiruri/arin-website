import { HeartPulse, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

const AREA = {
    title: "Climate and Health",
    color: "#ef4444",
    colorLight: "#fef2f2",
    colorBorder: "#fecaca",
    icon: HeartPulse,
    tagline: "Building Evidence for Health-Resilient Communities",
    description:
        "ARIN's Climate and Health focus area investigates the health impacts of climate change and builds evidence for health-resilient communities and systems. We examine how extreme weather, changing disease vectors, food insecurity, and environmental degradation affect human health across Africa — and how health systems can be strengthened to respond.",
    highlights: [
        "Climate-sensitive disease surveillance",
        "Health system resilience",
        "Nutrition and food security linkages",
        "Mental health and climate stress",
        "Heat health policy research",
        "One Health approaches",
    ],
    keyAreas: [
        {
            title: "Vector-Borne & Climate Diseases",
            body: "Investigating how changing rainfall patterns, temperatures, and ecosystems affect the distribution and intensity of malaria, dengue, cholera, and other climate-sensitive diseases.",
        },
        {
            title: "Health System Strengthening",
            body: "Developing frameworks to build health system capacity, workforce resilience, and infrastructure to respond to climate-related health shocks and emergencies.",
        },
        {
            title: "Environmental Health Policy",
            body: "Generating evidence on the health impacts of pollution, deforestation, and land degradation to inform integrated environmental and health governance.",
        },
    ],
};

export default function ClimateHealthPage() {
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
                                Interested in collaborating on Climate and Health research?
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
