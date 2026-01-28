"use client";
import React, { useState, useEffect } from 'react';
import { Camera, Search, Filter, X, ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getPhotosVideos } from '@/services/photosVideosService';

const PhotoGalleryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const photosPerPage = 12;

    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getPhotosVideos().then((data) => {
            // Only use items of type 'photo'
            setPhotos(Array.isArray(data) ? data.filter((item) => item.type === 'photo') : []);
            setLoading(false);
        });
    }, []);

    const categories = ['All', 'Events', 'Workshops', 'Research', 'Programs'];

    const filteredPhotos = photos.filter(photo => {
        const matchesSearch = (photo.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (photo.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Pagination
    const indexOfLastPhoto = currentPage * photosPerPage;
    const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
    const currentPhotos = filteredPhotos.slice(indexOfFirstPhoto, indexOfLastPhoto);
    const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const openLightbox = (photo) => {
        setSelectedPhoto(photo);
    };

    const closeLightbox = () => {
        setSelectedPhoto(null);
    };

    const navigatePhoto = (direction) => {
        const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
        let newIndex;
        if (direction === 'next') {
            newIndex = (currentIndex + 1) % filteredPhotos.length;
        } else {
            newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
        }
        setSelectedPhoto(filteredPhotos[newIndex]);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {loading ? (
                    <div className="text-center py-16">Loading photos...</div>
                ) : (
                    <>
                        {/* Hero Section */}
                        <section className="max-w-[1400px] mx-auto px-6 py-12">
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Camera className="w-12 h-12 text-[#021d49]" />
                                </div>
                                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                    Photo{' '}
                                    <span className="bg-gradient-to-r from-[#021d49] to-[#021d49] bg-clip-text text-transparent">
                                        Gallery
                                    </span>
                                </h1>
                                <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                                    Capturing moments from ARIN's events, research activities, and impact across Africa
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
                                                placeholder="Search photos..."
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

                            {/* Photo Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
                                {currentPhotos.map((photo) => (
                                    <div
                                        key={photo._id}
                                        className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300"
                                        onClick={() => openLightbox(photo)}
                                    >
                                        <div className="aspect-square">
                                            <img
                                                src={photo.url}
                                                alt={photo.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="absolute bottom-0 left-0 right-0 p-4">
                                                <h3 className="text-white font-bold text-sm mb-1">{photo.title}</h3>
                                                <p className="text-white/80 text-xs">{photo.location}</p>
                                            </div>
                                        </div>
                                        {/* Category Badge */}
                                        <div className="absolute top-2 right-2">
                                            <span className="px-2 py-1 bg-[#021d49] text-white text-xs font-bold rounded-full">
                                                {photo.category}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* No Results */}
                            {filteredPhotos.length === 0 && (
                                <div className="text-center py-16">
                                    <Camera className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">No photos found</h3>
                                    <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {filteredPhotos.length > 0 && totalPages > 1 && (
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

                        {/* Lightbox Modal */}
                        {selectedPhoto && (
                            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={closeLightbox}>
                                <button
                                    onClick={closeLightbox}
                                    className="absolute top-4 right-4 text-white hover:text-[#021d49] transition-colors"
                                >
                                    <X className="w-8 h-8" />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); navigatePhoto('prev'); }}
                                    className="absolute left-4 text-white hover:text-[#021d49] transition-colors"
                                >
                                    <ChevronLeft className="w-12 h-12" />
                                </button>

                                <button
                                    onClick={(e) => { e.stopPropagation(); navigatePhoto('next'); }}
                                    className="absolute right-4 text-white hover:text-[#021d49] transition-colors"
                                >
                                    <ChevronRight className="w-12 h-12" />
                                </button>

                                <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
                                    <img
                                        src={selectedPhoto.url}
                                        alt={selectedPhoto.title}
                                        className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                                    />
                                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mt-4">
                                        <h2 className="text-2xl font-bold text-white mb-2">{selectedPhoto.title}</h2>
                                        <p className="text-white/80 mb-4">{selectedPhoto.description}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-white/70">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{selectedPhoto.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                <span>{selectedPhoto.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-[#021d49] text-white rounded-full text-xs font-bold">
                                                    {selectedPhoto.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
            </>
            )}
        </div >
    );
};

export default PhotoGalleryPage;