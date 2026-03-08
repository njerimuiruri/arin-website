import { Trees, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";

const AREA = {
    title: "Forests & Ecosystems",
    color: "#059669",
    colorLight: "#ecfdf5",
    colorBorder: "#6ee7b7",
    icon: Trees,
    tagline: "Evidence-Based Conservation and Ecosystem Governance",
    description:
        "ARIN's Forests & Ecosystems focus area protects and restores Africa's forests and biodiversity through evidence-based conservation and ecosystem governance. Our research supports community forestry, REDD+ implementation, biodiversity monitoring, and policy frameworks that recognise the rights and roles of forest-dependent communities.",
    highlights: [
        "Forest governance and REDD+",
        "Biodiversity monitoring frameworks",
        "Community-based conservation",
        "Ecosystem services valuation",
        "Deforestation drivers research",
        "Blue carbon and coastal ecosystems",
    ],
    keyAreas: [
        {
            title: "Forest Carbon & REDD+",
            body: "Supporting African nations in designing and implementing REDD+ programmes, forest carbon markets, and nature-based solutions for climate mitigation.",
        },
        {
            title: "Biodiversity & Protected Areas",
            body: "Generating evidence on biodiversity loss, protected area management effectiveness, and wildlife corridors to guide conservation policy and investment.",
        },
        {
            title: "Community Forestry Rights",
            body: "Advancing research on community land tenure, indigenous forest rights, and participatory governance models that put local stewards at the centre of conservation.",
        },
    ],
};

export default function ForestsEcosystemsPage() {
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
                                Interested in collaborating on Forests & Ecosystems research?
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
