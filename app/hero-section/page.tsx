import { Suspense } from "react";
import { dynamic } from "next/dynamic";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

import HeroTopSection from "./sections/HeroTopSection";
import FeaturesSection from "./sections/FeaturesSection";
import FocusAreasSection from "./sections/FocusAreasSection";
import MissionAreasSection from "./sections/MissionAreasSection";
import LatestPostsSection from "./sections/LatestPostsSection";
import UpcomingEventsSection from "./sections/UpcomingEventsSection";
import LatestProjectsSection from "./sections/LatestProjectsSection";
import PartnersSection from "./sections/PartnersSection";
import CTASection from "./sections/CTASection";
import AfricaPresenceMap from "./sections/AfricaPresenceMap";
import ImpactStories from "./sections/impactstories";

import { getEvents } from "@/services/eventsService";
import { technicalReportsService } from "@/services/technicalReportsService";
import { policyBriefsService } from "@/services/policyBriefsService";
import { getNewsBriefs } from "@/services/newsBriefsService";
import { getResearchProjects } from "@/services/researchProjectService";
import { getPolicyDialogues } from "@/services/policyDialoguesService";

const latestPosts = [
    {
        title: "Climate Action Research in East Africa",
        excerpt: "New findings on adaptation strategies for vulnerable communities...",
        date: "Dec 20, 2024",
        category: "Research",
        image: "/api/placeholder/400/250"
    },
    {
        title: "Policy Brief: Sustainable Mining Practices",
        excerpt: "Recommendations for transparent mineral resource management...",
        date: "Dec 18, 2024",
        category: "Policy",
        image: "/api/placeholder/400/250"
    },
    {
        title: "Innovation in African Agriculture",
        excerpt: "Technology solutions transforming farming practices across the continent...",
        date: "Dec 15, 2024",
        category: "Innovation",
        image: "/api/placeholder/400/250"
    }
];

const upcomingEvents = [
    {
        title: "ARIN Annual Conference 2025",
        date: "March 15-17, 2025",
        location: "Nairobi, Kenya",
        type: "Conference"
    },
    {
        title: "Climate Policy Dialogue",
        date: "January 22, 2025",
        location: "Virtual",
        type: "Workshop"
    },
    {
        title: "Research Fellows Symposium",
        date: "February 10, 2025",
        location: "Accra, Ghana",
        type: "Symposium"
    }
];

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
    { name: "Partner 4", logo: "/partners/kings_college_london.png" },
    { name: "Partner 5", logo: "/partners/nairobi_county.jpg" },
    { name: "Partner 6", logo: "/partners/redcross.png" },
    { name: "Partner 4", logo: "/partners/sdi.png" },
    { name: "Partner 5", logo: "/partners/ssn.jpg" },
    { name: "Partner 6", logo: "/partners/steps_africa.jpg" },
    { name: "Partner 5", logo: "/partners/tomorrowscities.png" },
    { name: "Partner 6", logo: "/partners/ucl.jpg" },
    { name: "Partner 4", logo: "/partners/uk_foreign_office.jpg" },
    { name: "Partner 5", logo: "/partners/ukcdr-scaled.jpg" },
    { name: "Partner 6", logo: "/partners/ukri.png" }
];

const latestProjects = [
    {
        title: "Climate Resilience in Coastal Cities",
        description: "Building adaptive capacity in urban centers facing sea-level rise",
        status: "Active",
        region: "East Africa"
    },
    {
        title: "Sustainable Agriculture Initiative",
        description: "Promoting climate-smart farming practices across the continent",
        status: "Active",
        region: "West Africa"
    },
    {
        title: "Renewable Energy Transition Study",
        description: "Research on pathways to clean energy in African countries",
        status: "Ongoing",
        region: "Pan-African"
    }
];

export default async function HeroSection() {
    // Fetch all data on the server
    const [events, techReports, policyBriefs, newsBriefs, researchProjects, policyDialogues] = await Promise.allSettled([
        getEvents(),
        technicalReportsService.getAll().catch(() => []),
        policyBriefsService.getAll().catch(() => []),
        getNewsBriefs().catch(() => []),
        getResearchProjects().catch(() => []),
        getPolicyDialogues ? getPolicyDialogues().catch(() => []) : Promise.resolve([])
    ]).then(results =>
        results.map(r => r.status === 'fulfilled' ? r.value : [])
    );

    return (
        <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50">
            <HeroTopSection
                events={events}
                techReports={techReports}
                policyBriefs={policyBriefs}
                newsBriefs={newsBriefs}
                researchProjects={researchProjects}
                policyDialogues={policyDialogues}
            />
            <FeaturesSection />
            <FocusAreasSection />
            <MissionAreasSection />
            <AfricaPresenceMap />
            {/* <LatestPostsSection latestPosts={latestPosts} /> */}
            {/* <UpcomingEventsSection upcomingEvents={upcomingEvents} /> */}
            {/* <LatestProjectsSection latestProjects={latestProjects} /> */}
            <ImpactStories />
            <PartnersSection partners={partners} />
            <CTASection />
        </div>
    );
}