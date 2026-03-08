import { Pickaxe, ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/app/navbar/Navbar";
import Footer from "@/app/footer/Footer";

const AREA = {
    title: "Mining, Trade & Industry",
    color: "#f97316",
    colorLight: "#fff7ed",
    colorBorder: "#fed7aa",
    icon: Pickaxe,
    tagline: "Responsible Resources for Inclusive Economic Development",
    description:
        "ARIN's Mining, Trade & Industry focus area shapes responsible resource extraction, trade policy, and industrial transformation for inclusive economic development. We examine how African nations can leverage natural resource wealth to build diversified, equitable, and sustainable economies.",
    highlights: [
        "Responsible mining governance",
        "Trade policy and regional integration",
        "Industrial transformation strategies",
        "Resource revenue management",
        "Environmental and social safeguards",
        "Artisanal and small-scale mining",
    ],
    keyAreas: [
        {
            title: "Extractive Industry Governance",
            body: "Strengthening transparency, accountability, and revenue management in Africa's mining and petroleum sectors to maximise development impact.",
        },
        {
            title: "Trade & Regional Integration",
            body: "Analysing trade policy frameworks, the African Continental Free Trade Area (AfCFTA), and regional value chains to promote inclusive industrial growth.",
        },
        {
            title: "Just Transition in Industry",
            body: "Supporting African industries to transition toward cleaner, more sustainable production methods while protecting livelihoods and promoting decent work.",
        },
    ],
};

export default function MiningTradeIndustryPage() {
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
                                    Interested in collaborating on Mining, Trade & Industry research?
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
