"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Download, Clock, MapPin, FileText, Tag } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getEvent } from '@/services/eventsService';

const EventDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    const [event, setEvent] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchEvent() {
            if (!id) return;
            try {
                const data = await getEvent(id);
                if (!data) {
                    setError('Event not found');
                } else {
                    setEvent(data);
                }
            } catch (err) {
                console.error('Failed to fetch event:', err);
                setError('Failed to load event');
            } finally {
                setLoading(false);
            }
        }
        fetchEvent();
    }, [id]);

    const formatDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const formatTime = (timeString: string) => {
        if (!timeString) return '';
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    const buildImageUrl = (img?: string) => {
        if (!img) return '';
        return img.startsWith('http') ? img : `http://localhost:5001${img}`;
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Conference':
                return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'Workshop':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'Webinar':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'Dialogue':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Friday Reviews':
                return 'bg-pink-100 text-pink-700 border-pink-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusColor = (status: string) => {
        return status === 'Upcoming'
            ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
            : 'bg-gray-100 text-gray-700 border-gray-200';
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white min-h-screen">
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center py-20">
                            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#021d49] border-t-transparent mx-auto"></div>
                            <p className="text-gray-600 mt-6 text-lg font-medium">Loading event...</p>
                        </div>
                    </section>
                </div>
            </>
        );
    }

    if (error || !event) {
        return (
            <>
                <Navbar />
                <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white min-h-screen">
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <button
                            onClick={() => router.back()}
                            className="flex items-center gap-2 text-[#021d49] hover:text-[#021d49] mb-8 font-semibold transition-all hover:gap-3"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>
                        <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
                            <div className="text-6xl mb-4">😞</div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-3">{error || 'Event Not Found'}</h2>
                            <p className="text-gray-600 text-lg mb-6">The event you're looking for doesn't exist or has been removed.</p>
                            <button
                                onClick={() => router.push('/convening-platforms/events')}
                                className="px-6 py-3 bg-[#021d49] text-white rounded-lg hover:bg-[#021d49] transition-colors font-semibold"
                            >
                                View All Events
                            </button>
                        </div>
                    </section>
                </div>
            </>
        );
    }

    const img = buildImageUrl(event.image);

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white min-h-screen">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-[#021d49] to-[#021d49] text-white">
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                        <button
                            onClick={() => router.push('/convening-platforms/events')}
                            className="flex items-center gap-2 text-white/90 hover:text-white mb-6 font-medium transition-all hover:gap-3 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Events
                        </button>
                    </section>
                </div>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Title Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                                {/* Image Section */}
                                {img && (
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={img}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <span className={`px-4 py-2 ${getCategoryColor(event.category)} rounded-full font-semibold text-sm backdrop-blur-sm border shadow-lg`}>
                                                {event.category}
                                            </span>
                                            <span className={`px-4 py-2 ${getStatusColor(event.status)} rounded-full font-semibold text-sm backdrop-blur-sm border shadow-lg`}>
                                                {event.status}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Title and Info Section */}
                                <div className="p-8">
                                    <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
                                        {event.title}
                                    </h1>

                                    <div className="flex flex-wrap items-center gap-6 text-gray-600 pb-6 border-b border-gray-200">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <Calendar className="w-5 h-5 text-[#021d49]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-medium">Date</p>
                                                <p className="text-sm font-semibold text-gray-900">{formatDate(event.date)}</p>
                                            </div>
                                        </div>

                                        {event.time && (
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-green-50 rounded-lg">
                                                    <Clock className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Time</p>
                                                    <p className="text-sm font-semibold text-gray-900">{formatTime(event.time)}</p>
                                                </div>
                                            </div>
                                        )}

                                        {event.location && (
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-amber-50 rounded-lg">
                                                    <MapPin className="w-5 h-5 text-amber-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Location</p>
                                                    <p className="text-sm font-semibold text-gray-900">{event.location}</p>
                                                </div>
                                            </div>
                                        )}

                                        {event.availableResources && event.availableResources.length > 0 && (
                                            <div className="flex items-center gap-2">
                                                <div className="p-2 bg-purple-50 rounded-lg">
                                                    <FileText className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-xs text-gray-500 font-medium">Resources</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {event.availableResources.length} file{event.availableResources.length > 1 ? 's' : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Description Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-[#021d49]/10 rounded-lg">
                                        <FileText className="w-6 h-6 text-[#021d49]" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900">Event Description</h2>
                                </div>
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: event.description || '' }}
                                />
                            </div>

                            {/* Available Resources Card */}
                            {event.availableResources && event.availableResources.length > 0 && (
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-green-50 rounded-lg">
                                            <Download className="w-6 h-6 text-green-600" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Event Resources</h2>
                                    </div>
                                    <div className="grid gap-3">
                                        {event.availableResources.map((resource: string, idx: number) => {
                                            const resourceUrl = resource.startsWith('http') ? resource : `http://localhost:5001${resource}`;
                                            const fileName = resource.split('/').pop() || `Resource ${idx + 1}`;
                                            return (
                                                <a
                                                    key={idx}
                                                    href={resourceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-4 p-5 border-2 border-gray-200 rounded-xl hover:border-[#021d49] hover:bg-blue-50/50 transition-all group"
                                                >
                                                    <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-[#021d49]/10 transition-colors">
                                                        <FileText className="w-6 h-6 text-gray-600 group-hover:text-[#021d49]" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 group-hover:text-[#021d49]">{fileName}</p>
                                                        <p className="text-sm text-gray-500">Click to download</p>
                                                    </div>
                                                    <Download className="w-5 h-5 text-gray-400 group-hover:text-[#021d49]" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Info Card */}
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sticky top-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Event Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Category</p>
                                        <span className={`px-3 py-1 ${getCategoryColor(event.category)} rounded-full text-sm font-semibold inline-block`}>
                                            {event.category}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 font-medium mb-1">Status</p>
                                        <span className={`px-3 py-1 ${getStatusColor(event.status)} rounded-full text-sm font-semibold inline-block`}>
                                            {event.status}
                                        </span>
                                    </div>
                                    {event.date && (
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium mb-1">When</p>
                                            <p className="text-gray-900 font-semibold">{formatDate(event.date)}</p>
                                            {event.time && <p className="text-gray-600 text-sm">{formatTime(event.time)}</p>}
                                        </div>
                                    )}
                                    {event.location && (
                                        <div>
                                            <p className="text-sm text-gray-500 font-medium mb-1">Where</p>
                                            <p className="text-gray-900 font-semibold">{event.location}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default EventDetailPage;
