import { SunMedium, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

const AREA = {
    title: "Sustainable Development",
    color: "#f59e0b",
    colorLight: "#fffbeb",
    colorBorder: "#fde68a",
    icon: SunMedium,
    tagline: "Balancing Growth, Equity, and Environmental Stewardship",
    description:
        "ARIN's Sustainable Development focus area advances policies and research that harmonise economic growth, social equity, and environmental stewardship across African nations. By bridging knowledge and policy, we help governments, communities, and institutions navigate the complex trade-offs of development.",
    highlights: [
        "SDG alignment and progress monitoring",
        "Inclusive economic policy research",
        "Environmental stewardship frameworks",
        "Cross-sectoral development strategies",
        "Community-centered development models",
        "Regional and continental policy advocacy",
    ],
    keyAreas: [
        {
            title: "SDG Implementation",
            body: "Supporting African nations in localising, monitoring, and accelerating progress toward the UN Sustainable Development Goals through evidence-based policy recommendations.",
        },
        {
            title: "Green Economy Transition",
            body: "Researching pathways for African economies to transition toward low-carbon, resource-efficient, and socially inclusive growth models.",
        },
        {
            title: "Policy Coherence",
            body: "Promoting integrated, coherent policy frameworks that align development ambitions with environmental limits and social justice imperatives.",
        },
    ],
};

export default function SustainableDevelopmentPage() {
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
                        {/* Left */}
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

                        {/* Sidebar */}
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
                                    Interested in collaborating on Sustainable Development research?
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
