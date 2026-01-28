"use client";
import React from 'react';
import { Leaf, TrendingUp, Sprout, ArrowRight } from 'lucide-react';

const FocusAreasSection = () => {
    const focusAreas = [
        {
            icon: <Leaf className="w-8 h-8" />,
            title: "Climate Change",
            description: "Research and policy on climate adaptation, mitigation, and resilience for Africa's most vulnerable communities."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Mining & Trade",
            description: "Promoting sustainable and transparent mineral resource management and trade practices."
        },
        {
            icon: <Sprout className="w-8 h-8" />,
            title: "Agriculture & Food Systems",
            description: "Innovative solutions for food security, climate-smart agriculture, and rural livelihoods."
        }
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#021d49', color: 'white' }}>
                    <span>What We Do</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#14234d' }}>
                    Our Focus Areas
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                    Among the areas that ARIN has pioneered path-breaking research, are climate
                    change, knowledge management, science technology, and innovation.
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
                {focusAreas.map((area, index) => (
                    <div
                        key={index}
                        className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden"
                    >
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Content */}
                        <div className="relative z-10">
                            <div
                                className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: 'rgba(69, 157, 184, 0.1)', color: '#021d49' }}
                            >
                                {area.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: '#14234d' }}>
                                {area.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {area.description}
                            </p>
                        </div>

                        {/* Decorative element */}
                        <div
                            className="absolute -bottom-2 -right-2 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300"
                            style={{ backgroundColor: '#021d49' }}
                        ></div>
                    </div>
                ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
                <a
                    href="/about-us/focus-areas"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-white"
                    style={{ backgroundColor: '#021d49' }}
                >
                    Explore Our Work
                    <ArrowRight className="w-5 h-5" />
                </a>
            </div>
        </section>
    );
};

export default FocusAreasSection;