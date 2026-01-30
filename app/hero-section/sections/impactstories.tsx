"use client";
import React from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

import { useEffect, useState } from 'react';
import { getImpactStories } from '@/services/impactStoriesService';
import { useRouter } from 'next/navigation';

const ImpactStories = () => {
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        getImpactStories()
            .then(data => setStories(data.slice(0, 6)))
            .catch(err => setError(err.message || 'Failed to load stories'))
            .finally(() => setLoading(false));
    }, []);

    const truncate = (text: string, wordLimit = 30) => {
        if (!text) return '';
        const plain = text.replace(/<[^>]+>/g, '');
        const words = plain.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : plain;
    };

    const handleViewAll = () => {
        router.push('/press/impact-stories');
    };

    return (
        <section className="w-full bg-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold mb-6" style={{ backgroundColor: '#021d49', color: 'white' }}>
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
                    {loading && (
                        <div className="col-span-3 text-center py-12 text-gray-400">Loading impact stories...</div>
                    )}
                    {error && (
                        <div className="col-span-3 text-center py-12 text-red-500">{error}</div>
                    )}
                    {!loading && !error && stories.map((story) => (
                        <div
                            key={story._id || story.id}
                            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Image */}
                            <div className="relative h-56 overflow-hidden">
                                <img
                                    src={story.image?.startsWith('http') ? story.image : story.image ? `https://api.demo.arin-africa.org${story.image}` : '/api/placeholder/600/400'}
                                    alt={story.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {story.category && (
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm" style={{ backgroundColor: 'rgba(69, 157, 184, 0.9)' }}>
                                            {story.category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                    {story.location && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-4 h-4" />
                                            <span>{story.location}</span>
                                        </div>
                                    )}
                                    {story.date && (
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{
                                                (() => {
                                                    const d = new Date(story.date);
                                                    return isNaN(d.getTime())
                                                        ? story.date
                                                        : d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                                                })()
                                            }</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-[#021d49] transition-colors" style={{ color: '#14234d' }}>
                                    {story.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                    {truncate(story.excerpt || story.description)}
                                </p>

                                {/* Optionally, add a Read Full Story button here to navigate to the detail page */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* View More Button */}
                <div className="text-center">
                    <button
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: '#021d49' }}
                        onClick={handleViewAll}
                    >
                        View All Impact Stories
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ImpactStories;