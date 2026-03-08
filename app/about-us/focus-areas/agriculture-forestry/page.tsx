import { Wheat, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

const AREA = {
    title: "Agriculture & Forestry",
    color: "#10b981",
    colorLight: "#ecfdf5",
    colorBorder: "#a7f3d0",
    icon: Wheat,
    tagline: "Climate-Smart Agriculture and Sustainable Forestry",
    description:
        "ARIN's Agriculture & Forestry focus area drives climate-smart agriculture and sustainable forestry practices to secure food systems and rural livelihoods across Africa. Our research supports smallholder farmers, forest-dependent communities, and policymakers in building resilient, productive, and environmentally sustainable land-use systems.",
    highlights: [
        "Climate-smart agriculture research",
        "Food systems and security policy",
        "Agroforestry and land restoration",
        "Smallholder farmer support frameworks",
        "Sustainable land-use planning",
        "Value chain development",
    ],
    keyAreas: [
        {
            title: "Food Security & Nutrition",
            body: "Investigating the impacts of climate variability on food production, supply chains, and nutrition outcomes, with a focus on vulnerable rural and urban populations.",
        },
        {
            title: "Agroforestry & Land Restoration",
            body: "Promoting integrated land-use systems that combine trees, crops, and livestock to enhance productivity, biodiversity, and ecosystem services.",
        },
        {
            title: "Agricultural Policy Reform",
            body: "Generating evidence to guide policy reforms that incentivise sustainable farming practices, improve market access, and strengthen farmer resilience.",
        },
    ],
};

export default function AgricultureForestryPage() {
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
                                Interested in collaborating on Agriculture & Forestry research?
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
