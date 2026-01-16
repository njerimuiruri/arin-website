"use client";
import HeroTopSection from "./sections/HeroTopSection";
import FeaturesSection from "./sections/FeaturesSection";
import FocusAreasSection from "./sections/FocusAreasSection";
import MissionAreasSection from "./sections/MissionAreasSection";
import LatestPostsSection from "./sections/LatestPostsSection";
import UpcomingEventsSection from "./sections/UpcomingEventsSection";
import LatestProjectsSection from "./sections/LatestProjectsSection";
import PartnersSection from "./sections/PartnersSection";
import CTASection from "./sections/CTASection";

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
    { name: "Partner 1", logo: "/api/placeholder/150/80" },
    { name: "Partner 2", logo: "/api/placeholder/150/80" },
    { name: "Partner 3", logo: "/api/placeholder/150/80" },
    { name: "Partner 4", logo: "/api/placeholder/150/80" },
    { name: "Partner 5", logo: "/api/placeholder/150/80" },
    { name: "Partner 6", logo: "/api/placeholder/150/80" }
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

const HeroSection = () => {
    return (
        <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50">
            <HeroTopSection />
            <FeaturesSection />
            <FocusAreasSection />
            <MissionAreasSection />
            <LatestPostsSection latestPosts={latestPosts} />
            <UpcomingEventsSection upcomingEvents={upcomingEvents} />
            <LatestProjectsSection latestProjects={latestProjects} />
            <PartnersSection partners={partners} />
            <CTASection />
        </div>
    );
};

export default HeroSection;