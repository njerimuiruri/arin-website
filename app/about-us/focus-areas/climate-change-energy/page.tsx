import { Wind, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

const AREA = {
    title: "Climate Change & Energy",
    color: "#3b82f6",
    colorLight: "#eff6ff",
    colorBorder: "#bfdbfe",
    icon: Wind,
    tagline: "Resilient, Low-Carbon Solutions for the Continent",
    description:
        "ARIN's Climate Change & Energy focus area explores the intersections of climate systems and energy transitions to promote resilient, low-carbon solutions across Africa. We generate evidence to inform ambitious national climate plans, clean energy investments, and adaptation strategies that leave no one behind.",
    highlights: [
        "National climate policy analysis",
        "Renewable energy transition pathways",
        "Climate finance and investment research",
        "Adaptation and mitigation strategies",
        "Carbon markets and offsetting",
        "Energy access and equity",
    ],
    keyAreas: [
        {
            title: "Climate Policy & NDCs",
            body: "Supporting African governments in designing, implementing, and reviewing Nationally Determined Contributions aligned with the Paris Agreement goals.",
        },
        {
            title: "Clean Energy Transitions",
            body: "Researching pathways to scale renewable energy, phase out fossil fuels, and ensure universal energy access across urban and rural Africa.",
        },
        {
            title: "Climate Finance",
            body: "Mobilising and tracking climate finance flows, improving access to green funds, and building capacity for effective financial management in climate action.",
        },
    ],
};

export default function ClimateChangeEnergyPage() {
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
                                    Interested in collaborating on Climate Change & Energy research?
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
