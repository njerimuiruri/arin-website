import { Building2, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

const AREA = {
    title: "Cities & Resilience",
    color: "#8b5cf6",
    colorLight: "#f5f3ff",
    colorBorder: "#ddd6fe",
    icon: Building2,
    tagline: "Adaptive Urban Frameworks for African Cities",
    description:
        "ARIN's Cities & Resilience focus area builds adaptive urban frameworks that enable African cities to withstand climate shocks, migration pressures, and infrastructure challenges. Our research informs city planning, housing policy, and governance systems that prioritise the most vulnerable urban residents.",
    highlights: [
        "Urban climate risk assessments",
        "Informal settlement resilience",
        "City governance and planning policy",
        "Migration and displacement research",
        "Green urban infrastructure",
        "Disaster risk reduction",
    ],
    keyAreas: [
        {
            title: "Urban Climate Adaptation",
            body: "Developing evidence-based strategies for African cities to adapt to rising temperatures, flooding, droughts, and other climate impacts affecting urban populations.",
        },
        {
            title: "Inclusive Urban Planning",
            body: "Promoting participatory, equitable city planning processes that integrate the needs of informal settlements, women, youth, and other marginalised urban groups.",
        },
        {
            title: "Infrastructure Resilience",
            body: "Researching approaches to build and retrofit urban infrastructure — transport, water, energy, housing — to withstand climate extremes and population growth.",
        },
    ],
};

export default function CitiesResiliencePage() {
    const Icon = AREA.icon;

    return (
        <>
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
                                    Interested in collaborating on Cities & Resilience research?
                                </p>
                                <a href="/contact" className="fd-cta-btn">
                                    Get in Touch <ArrowUpRight />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
