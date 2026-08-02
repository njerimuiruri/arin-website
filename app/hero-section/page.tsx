export const dynamic = "force-dynamic";
export const revalidate = 3600;

import HeroTopSection from "./sections/HeroTopSection";
import PartnersSection from "./sections/PartnersSection";
import LatestFromArinSection from "./sections/LatestFromArinSection";
import CTASection from "./sections/CTASection";

import { technicalReportsService } from "@/services/technicalReportsService";
import { policyBriefsService } from "@/services/policyBriefsService";
import { getNewsBriefs } from "@/services/newsBriefsService";
import { getResearchProjects } from "@/services/researchProjectService";

import StatsSection from "./sections/StatsSection";
import AboutSection from "./sections/Aboutsection";
import StrategicPlanSection from "./sections/StrategicPlanSection";

const partners = [
    { name: "Partner 1", logo: "/partners/adaptation_research_alliance.png" },
    { name: "Partner 2", logo: "/partners/afidep.png" },
    { name: "Partner 3", logo: "/partners/easteco.png" },
    { name: "Partner 4", logo: "/partners/franfurt_school.png" },
    { name: "Partner 5", logo: "/partners/gcrf.jpg" },
    { name: "Partner 6", logo: "/partners/giz.png" },
    { name: "Partner 1", logo: "/partners/iclei.jpg" },
    { name: "Partner 2", logo: "/partners/kenia.png" },
    { name: "Partner 3", logo: "/partners/idrc.png" },
    { name: "Partner 5", logo: "/partners/nairobi_county.jpg" },
    { name: "Partner 6", logo: "/partners/redcross.png" },
    { name: "Partner 4", logo: "/partners/sdi.png" },
    { name: "Partner 5", logo: "/partners/ssn.jpg" },
    { name: "Partner 6", logo: "/partners/steps_africa.jpg" },
    { name: "Partner 4", logo: "/partners/uk_foreign_office.jpg" },
    { name: "Partner 5", logo: "/partners/ukcdr-scaled.jpg" },
    { name: "Partner 6", logo: "/partners/ukri.png" }
];

export default async function HeroSection() {
    // Fetch all data on the server
    const [techReports, policyBriefs, newsBriefs, researchProjects] = await Promise.allSettled([
        technicalReportsService.getAll().catch(() => []),
        policyBriefsService.getAll().catch(() => []),
        getNewsBriefs().catch(() => []),
        getResearchProjects().catch(() => []),
    ]).then(results =>
        results.map(r => r.status === 'fulfilled' ? r.value : [])
    );

    return (
        <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50">
            <HeroTopSection />
            <AboutSection />
            <StrategicPlanSection />

            <LatestFromArinSection
                newsBriefs={newsBriefs}
                techReports={techReports}
                policyBriefs={policyBriefs}
                researchProjects={researchProjects}
            />
            <StatsSection />
            <PartnersSection partners={partners} />
            <CTASection />
        </div>
    );
}
