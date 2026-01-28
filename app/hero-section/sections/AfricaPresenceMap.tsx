"use client";
import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import * as d3 from 'd3';
import { MapPin, Users, Globe } from 'lucide-react';

const FocalPoints = () => {
    const mapRef = useRef<SVGSVGElement>(null);
    const [isTopoJsonLoaded, setIsTopoJsonLoaded] = React.useState(false);

    const focalPoints = [
        {
            id: 1,
            name: "Nairobi",
            country: "Kenya",
            description: "Regional Headquarters",
            team: "15 Researchers",
            coordinates: [36.8219, -1.2921]
        },
        {
            id: 2,
            name: "Lagos",
            country: "Nigeria",
            description: "West Africa Office",
            team: "8 Researchers",
            coordinates: [3.3792, 6.5244]
        },
        {
            id: 3,
            name: "Cairo",
            country: "Egypt",
            description: "North Africa Hub",
            team: "6 Researchers",
            coordinates: [31.2357, 30.0444]
        }
    ];

    useEffect(() => {
        if (!mapRef.current || !isTopoJsonLoaded) return;

        const width = 800;
        const height = 600;

        const svg = d3.select(mapRef.current);
        svg.selectAll("*").remove();

        const projection = d3.geoMercator()
            .scale(130)
            .center([0, 20])
            .translate([width / 2, height / 2]);

        const path = d3.geoPath().projection(projection);

        d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
            .then((data: any) => {
                const countries = (window as any).topojson.feature(data, data.objects.countries);

                svg.append("g")
                    .selectAll("path")
                    .data(countries.features)
                    .enter()
                    .append("path")
                    .attr("d", path as any)
                    .attr("fill", "#f3f4f6")
                    .attr("stroke", "#d1d5db")
                    .attr("stroke-width", 0.5);

                const markers = svg.append("g");

                focalPoints.forEach((point) => {
                    const coords = projection(point.coordinates as [number, number]);
                    if (coords) {
                        const marker = markers.append("g")
                            .attr("transform", `translate(${coords[0]}, ${coords[1]})`);

                        marker.append("circle")
                            .attr("r", 10)
                            .attr("fill", "#021d49")
                            .attr("stroke", "#fff")
                            .attr("stroke-width", 3)
                            .style("pointer-events", "none")
                            .style("filter", "drop-shadow(0 2px 4px rgba(0,0,0,0.2))");

                        marker.append("text")
                            .attr("y", 28)
                            .attr("text-anchor", "middle")
                            .style("font-family", "system-ui")
                            .style("font-size", "13px")
                            .style("font-weight", "600")
                            .style("fill", "#14234d")
                            .style("pointer-events", "none")
                            .text(point.country);
                    }
                });
            });
    }, [isTopoJsonLoaded]);

    return (
        <>
            <Script
                src="https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js"
                onLoad={() => setIsTopoJsonLoaded(true)}
            />
            <section className="w-full bg-gradient-to-b from-white to-slate-50 py-2 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white mb-6" style={{ backgroundColor: '#021d49' }}>
                            <Globe className="w-5 h-5" />
                            <span>Global Presence</span>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#14234d' }}>
                            Our Focal Points Across Africa
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            We operate strategic research hubs across the continent, bringing together experts and communities to drive impactful change through evidence-based solutions.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Map Section - Left */}
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full opacity-10" style={{ backgroundColor: '#021d49' }}></div>
                            <div className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-10" style={{ backgroundColor: '#14234d' }}></div>

                            <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-2xl p-8 relative overflow-hidden border border-gray-100">
                                {!isTopoJsonLoaded ? (
                                    <div className="flex items-center justify-center h-96">
                                        <div className="text-center">
                                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#021d49] mb-4"></div>
                                            <p className="text-gray-600">Loading map...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <svg
                                        ref={mapRef}
                                        viewBox="0 0 800 600"
                                        className="w-full h-auto"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Content Section - Right */}
                        <div className="space-y-8">
                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    <div className="text-5xl font-bold mb-2" style={{ color: '#021d49' }}>3</div>
                                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Regional Offices</div>
                                </div>
                                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                    <div className="text-5xl font-bold mb-2" style={{ color: '#021d49' }}>29</div>
                                    <div className="text-sm text-gray-600 font-semibold uppercase tracking-wide">Total Researchers</div>
                                </div>
                            </div>

                            {/* Why Work With Us */}
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: '#14234d' }}>
                                    <div className="w-1 h-8 rounded-full" style={{ backgroundColor: '#021d49' }}></div>
                                    Why Work With Us?
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-transform group-hover:scale-110" style={{ backgroundColor: '#021d49' }}>
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">Evidence-based research driving policy and practice across Africa</p>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-transform group-hover:scale-110" style={{ backgroundColor: '#021d49' }}>
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">Multi-disciplinary teams of experts working on critical challenges</p>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-transform group-hover:scale-110" style={{ backgroundColor: '#021d49' }}>
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">Strong partnerships with local communities and international organizations</p>
                                    </div>
                                    <div className="flex items-start gap-4 group">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 transition-transform group-hover:scale-110" style={{ backgroundColor: '#021d49' }}>
                                            <div className="w-2 h-2 rounded-full bg-white"></div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">Commitment to sustainable development and social impact</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default FocalPoints;