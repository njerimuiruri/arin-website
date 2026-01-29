"use client";

import { useEffect, useState } from 'react';
import { Heart, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, MapPin, Users, Calendar } from 'lucide-react';
import { getImpactStories } from '@/services/impactStoriesService';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/navbar/Navbar';

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

    const filteredStories = stories.filter(story => {
        const matchesSearch = story.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            story.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
        return matchesSearch && matchesCategory;
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
                {/* Hero Section */}
                <section className="max-w-[1400px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Heart className="w-12 h-12 text-[#021d49]" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Impact{' '}
                            <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                Stories
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Real stories of transformation and resilience from communities across Africa benefiting from ARIN's research and programs
                        </p>
                    </div>

                    {/* Quick Stats */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-[#021d49] mb-1">{stories.length}</div>
                                <p className="text-sm text-gray-600">Impact Stories</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center">
                                <div className="text-3xl font-bold text-green-600 mb-1">
                                    {(() => {
                                        // Sum up all beneficiaries if available, else show '-'
                                        const total = stories.reduce((acc, s) => {
                                            // Accept numbers or strings like '5,000+' or '1000'
                                            if (typeof s.beneficiaries === 'number') return acc + s.beneficiaries;
                                            if (typeof s.beneficiaries === 'string') {
                                                // Remove non-digits, parse as int
                                                const num = parseInt(s.beneficiaries.replace(/[^\d]/g, ''));
                                                if (!isNaN(num)) return acc + num;
                                            }
                                            return acc;
                                        }, 0);
                                        return total > 0 ? total.toLocaleString() : '-';
                                    })()}
                                </div>
                                <p className="text-sm text-gray-600">Lives Impacted</p>
                            </div>
                            <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 text-center col-span-2 md:col-span-1">
                                <div className="text-3xl font-bold text-[#021d49] mb-1">{
                                    Array.from(new Set(stories.map(s => s.category).filter(Boolean))).length
                                }</div>
                                <p className="text-sm text-gray-600">Focus Areas</p>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search impact stories..."
                                        value={searchTerm}
                                        onChange={(e) => {
                                            setSearchTerm(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => {
                                            setSelectedCategory(e.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#021d49] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stories List - Horizontal Card Layout */}
                    <div className="space-y-6 max-w-6xl mx-auto">
                        {currentStories.map((story: any, idx: number) => (
                            <div
                                key={story._id || story.id || idx}
                                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] cursor-pointer group"
                                onClick={() => handleStoryClick(story._id || story.id)}
                            >
                                <div className="md:flex">
                                    {/* Left Side - Image */}
                                    <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                                        {story.image ? (
                                            <img
                                                src={story.image.startsWith('http') ? story.image : `http://localhost:5001${story.image}`}
                                                alt={story.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">No image</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                                        {/* Category Badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-4 py-2 bg-[#021d49] text-white font-bold text-sm uppercase tracking-wide rounded-lg shadow-xl">
                                                {story.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="md:w-3/5 p-8">
                                        {/* Header */}
                                        <div className="mb-4">
                                            <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-3">
                                                {story.title}
                                            </h3>
                                        </div>

                                        {/* Metadata */}
                                        <div className="grid grid-cols-2 gap-3 mb-4 bg-gray-50 rounded-lg p-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                <MapPin className="w-4 h-4 text-[#021d49] shrink-0" />
                                                <span className="text-gray-700 font-medium">{story.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <Calendar className="w-4 h-4 text-[#021d49] shrink-0" />
                                                <span className="text-gray-600">{story.date ? (new Date(story.date)).toLocaleDateString() : <span className="italic text-gray-400">No date</span>}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm col-span-2">
                                                <Users className="w-4 h-4 text-[#021d49] shrink-0" />
                                                <span className="text-gray-700 font-medium">{story.beneficiaries}</span>
                                            </div>
                                        </div>

                                        {/* Excerpt */}
                                        <p className="text-sm text-gray-600 leading-relaxed mb-4">
                                            {story.excerpt || (story.description ? story.description.replace(/<[^>]+>/g, '').split(' ').slice(0, 30).join(' ') + (story.description.split(' ').length > 30 ? '...' : '') : '')}
                                        </p>

                                        {/* Impact Points */}
                                        <div className="mb-4">
                                            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Key Impact:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.isArray(story.impact) && story.impact.map((item: any, index: number) => (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200"
                                                    >
                                                        ✓ {item}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Button */}
                                        <div className="flex items-center justify-end">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleStoryClick(story._id || story.id); }}
                                                className="px-6 py-3 bg-gradient-to-r from-[#021d49] to-[#021d49] hover:shadow-xl text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center transition-all duration-200 whitespace-nowrap"
                                            >
                                                <span>Read Full Story</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results */}
                    {filteredStories.length === 0 && (
                        <div className="text-center py-16">
                            <Heart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No stories found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
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
                </section>

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
        </>
    );
};

export default ImpactStoriesPage;