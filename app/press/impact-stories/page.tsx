"use client";

import { useEffect, useState } from 'react';
import { Heart, Search, ChevronLeft, ChevronRight, ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { getImpactStories } from '@/services/impactStoriesService';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

const ImpactStoriesPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [stories, setStories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const storiesPerPage = 6;
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        getImpactStories()
            .then(data => setStories(data))
            .catch(err => setError(err.message || 'Failed to load stories'))
            .finally(() => setLoading(false));
    }, []);

    const categories = ['All', ...Array.from(new Set(stories.map(s => s.category).filter(Boolean)))];

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filteredStories = stories.filter(story => {
        const matchesSearch = story.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
        const matchesDate = !story.date || new Date(story.date) <= today;
        return matchesSearch && matchesCategory && matchesDate;
    });

    // Pagination
    const indexOfLastStory = currentPage * storiesPerPage;
    const indexOfFirstStory = indexOfLastStory - storiesPerPage;
    const currentStories = filteredStories.slice(indexOfFirstStory, indexOfLastStory);
    const totalPages = Math.ceil(filteredStories.length / storiesPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleStoryClick = (storyId: string | undefined) => {
        if (!storyId) return;
        router.push(`/press/impact-stories/${storyId}`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Compact Dark Navy Hero Banner */}
                <section className="relative overflow-hidden bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                    <div className="relative max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">Impact Stories</h1>
                                <p className="text-sm text-blue-100 mt-1">Real stories of transformation and resilience from communities across Africa</p>
                            </div>
                            <div className="w-full md:max-w-sm">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search impact stories..."
                                            value={searchTerm}
                                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#021d49] focus:outline-none transition-all text-gray-800 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Filter Bar */}
                <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap gap-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${selectedCategory === cat
                                    ? 'bg-[#021d49] text-white shadow-md'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stories Grid */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    {loading ? (
                        <div className="text-center py-16 text-lg text-gray-500">Loading stories...</div>
                    ) : error ? (
                        <div className="text-center py-16 text-red-600">{error}</div>
                    ) : currentStories.length === 0 ? (
                        <div className="text-center py-16">
                            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No stories found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {currentStories.map((story, idx) => (
                                <div
                                    key={story._id || idx}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#021d49] cursor-pointer group flex flex-col"
                                    onClick={() => handleStoryClick(story._id || story.id)}
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden shrink-0">
                                        {story.image ? (
                                            <>
                                                <img
                                                    src={story.image.startsWith('http') ? story.image : `https://api.demo.arin-africa.org${story.image}`}
                                                    alt={story.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#021d49] to-[#032a5e]">
                                                <Heart className="w-16 h-16 text-white/20" />
                                            </div>
                                        )}
                                        {story.category && (
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-lg shadow-lg">{story.category}</span>
                                            </div>
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-2 line-clamp-2">{story.title}</h3>
                                        <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-500">
                                            {story.location && (
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="w-3.5 h-3.5 text-[#021d49]" />
                                                    <span>{story.location}</span>
                                                </div>
                                            )}
                                            {story.date && (
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-3.5 h-3.5 text-[#021d49]" />
                                                    <span>{new Date(story.date).toLocaleDateString()}</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                                            {story.excerpt || (story.description ? story.description.replace(/<[^>]+>/g, '').split(' ').slice(0, 25).join(' ') + '...' : '')}
                                        </p>
                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleStoryClick(story._id || story.id); }}
                                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#021d49] to-[#032a5e] hover:from-[#032a5e] hover:to-[#021d49] text-white font-semibold rounded-lg shadow-md text-sm"
                                            >
                                                <span>Read Full Story</span><ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredStories.length > 0 && totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white border border-gray-300'} transition-all duration-200`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentPage === index + 1
                                        ? 'bg-gradient-to-r from-[#021d49] to-[#021d49] text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white border border-gray-300'} transition-all duration-200`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Why Impact Stories Matter Section */}
                <section className="max-w-[1400px] mx-auto px-6 pb-16 mt-12">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Impact Stories Matter</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <Heart className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Real Change</h3>
                                <p className="text-gray-300 text-sm">Witness the tangible impact of research-driven solutions</p>
                            </div>
                            <div className="text-center">
                                <Users className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Community Voice</h3>
                                <p className="text-gray-300 text-sm">Hear directly from communities driving change</p>
                            </div>
                            <div className="text-center">
                                <MapPin className="w-10 h-10 text-[#021d49] mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Scalable Solutions</h3>
                                <p className="text-gray-300 text-sm">Learn from successful models that can be replicated</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            These stories showcase how evidence-based research translates into meaningful change, improving lives and building resilience across African communities.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default ImpactStoriesPage;
