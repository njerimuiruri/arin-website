"use client";
import React, { useState, useEffect } from 'react';
import { Video, Search, Filter, ChevronLeft, ChevronRight, Calendar, Play, Clock } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getPhotosVideos } from '@/services/photosVideosService';

const VideoGalleryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const videosPerPage = 9;

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPhotosVideos().then((data) => {
            // Only use items of type 'video'
            setVideos(Array.isArray(data) ? data.filter((item) => item.type === 'video') : []);
            setLoading(false);
        });
    }, []);

    const categories = ['All', 'Events', 'Webinars', 'Workshops', 'Research', 'Documentaries'];

    const filteredVideos = videos.filter(video => {
        const matchesSearch = (video.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (video.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const indexOfLastVideo = currentPage * videosPerPage;
    const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
    const currentVideos = filteredVideos.slice(indexOfFirstVideo, indexOfLastVideo);
    const totalPages = Math.ceil(filteredVideos.length / videosPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openVideoModal = (video) => {
        setSelectedVideo(video);
    };

    const closeVideoModal = () => {
        setSelectedVideo(null);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {loading ? (
                    <div className="text-center py-16">Loading videos...</div>
                ) : (
                    <section className="max-w-[1400px] mx-auto px-6 py-12">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center gap-3 mb-4">
                                <Video className="w-12 h-12 text-[#021d49]" />
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Video{' '}
                                <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                    Gallery
                                </span>
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                                Watch ARIN's events, webinars, documentaries, and research stories from across Africa
                            </p>
                        </div>

                        {/* Search and Filter */}
                        <div className="max-w-4xl mx-auto mb-8">
                            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            placeholder="Search videos..."
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

                        {/* Video Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                            {currentVideos.map((video) => (
                                <div
                                    key={video._id}
                                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#021d49] cursor-pointer group"
                                    onClick={() => openVideoModal(video)}
                                >
                                    {/* Thumbnail */}
                                    <div className="relative aspect-video overflow-hidden">
                                        <img
                                            src={video.thumbnail || ''}
                                            alt={video.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Play Button Overlay */}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Play className="w-8 h-8 text-[#021d49] ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                        {/* Duration Badge */}
                                        <div className="absolute bottom-2 right-2">
                                            <span className="px-2 py-1 bg-black/80 text-white text-xs font-bold rounded flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {video.duration}
                                            </span>
                                        </div>
                                        {/* Category Badge */}
                                        <div className="absolute top-2 left-2">
                                            <span className="px-3 py-1 bg-[#021d49] text-white text-xs font-bold rounded-full">
                                                {video.category}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#021d49] transition-colors">
                                            {video.title}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {video.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span>{video.date}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredVideos.length === 0 && (
                            <div className="text-center py-16">
                                <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No videos found</h3>
                                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {filteredVideos.length > 0 && totalPages > 1 && (
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
                )}

                {/* Video Modal */}
                {selectedVideo && (
                    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeVideoModal}>
                        <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                            {/* Video Player */}
                            <div className="relative aspect-video mb-4">
                                <video
                                    className="w-full h-full rounded-lg"
                                    src={selectedVideo.url}
                                    controls
                                    title={selectedVideo.title}
                                />
                            </div>

                            {/* Video Info */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                                <h2 className="text-2xl font-bold text-white mb-2">{selectedVideo.title}</h2>
                                <p className="text-white/80 mb-4">{selectedVideo.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-white/70">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{selectedVideo.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{selectedVideo.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 bg-[#021d49] text-white rounded-full text-xs font-bold">
                                            {selectedVideo.category}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={closeVideoModal}
                                className="mt-4 px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors w-full"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default VideoGalleryPage;