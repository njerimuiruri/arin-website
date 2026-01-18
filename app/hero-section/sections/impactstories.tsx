"use client";
import React from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

const ImpactStories = () => {
    const stories = [
        {
            id: 1,
            title: "Transforming Urban Agriculture in Nairobi",
            excerpt: "How innovative farming techniques are helping communities achieve food security in densely populated areas.",
            image: "/api/placeholder/600/400",
            location: "Nairobi, Kenya",
            date: "December 2024",
            category: "Food Security"
        },
        {
            id: 2,
            title: "Clean Energy Access for Rural Communities",
            excerpt: "Solar power initiatives bringing electricity to 5,000 households across West Africa.",
            image: "/api/placeholder/600/400",
            location: "Lagos, Nigeria",
            date: "November 2024",
            category: "Energy"
        },
        {
            id: 3,
            title: "Climate Resilience in Coastal Regions",
            excerpt: "Empowering fishing communities with adaptive strategies to combat rising sea levels.",
            image: "/api/placeholder/600/400",
            location: "Mombasa, Kenya",
            date: "October 2024",
            category: "Climate Action"
        },
        {
            id: 4,
            title: "Women in STEM: Breaking Barriers",
            excerpt: "Supporting 200+ young women to pursue careers in science, technology, and engineering.",
            image: "/api/placeholder/600/400",
            location: "Cairo, Egypt",
            date: "September 2024",
            category: "Education"
        },
        {
            id: 5,
            title: "Water Management Innovation",
            excerpt: "Smart irrigation systems helping farmers optimize water usage and increase crop yields by 40%.",
            image: "/api/placeholder/600/400",
            location: "Accra, Ghana",
            date: "August 2024",
            category: "Agriculture"
        },
        {
            id: 6,
            title: "Health Systems Strengthening",
            excerpt: "Training healthcare workers to improve maternal and child health outcomes in underserved areas.",
            image: "/api/placeholder/600/400",
            location: "Kampala, Uganda",
            date: "July 2024",
            category: "Healthcare"
        }
    ];

    return (
        <section className="w-full bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#459db8', color: 'white' }}>
                        <span>Our Impact</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#14234d' }}>
                        Stories of Change
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Discover how our research and partnerships are creating lasting impact across African communities
                    </p>
                </div>

                {/* Stories Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm" style={{ backgroundColor: 'rgba(69, 157, 184, 0.9)' }}>
                                        {story.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{story.location}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>{story.date}</span>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-[#459db8] transition-colors" style={{ color: '#14234d' }}>
                                    {story.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                    {story.excerpt}
                                </p>

                                <button className="flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all" style={{ color: '#459db8' }}>
                                    Read Full Story
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center">
                    <button className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ backgroundColor: '#459db8' }}>
                        View All Impact Stories
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ImpactStories;