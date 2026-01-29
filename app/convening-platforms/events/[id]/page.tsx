"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Download, Clock, MapPin, FileText, Tag, Share2, Bell, ExternalLink } from 'lucide-react';
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

    const getCategoryGradient = (category: string) => {
        switch (category) {
            case 'Conference':
                return 'from-purple-500 to-purple-600';
            case 'Workshop':
                return 'from-blue-500 to-blue-600';
            case 'Webinar':
                return 'from-green-500 to-green-600';
            case 'Dialogue':
                return 'from-amber-500 to-amber-600';
            case 'Friday Reviews':
                return 'from-pink-500 to-pink-600';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 font-medium">Loading event...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !event) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50 flex items-center justify-center px-4">
                    <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
                        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar className="w-10 h-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Not Found</h2>
                        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
                        <button
                            onClick={() => router.push('/convening-platforms/events')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-lg hover:bg-[#032a5e] transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Events
                        </button>
                    </div>
                </div>
            </>
        );
    }

    const img = buildImageUrl(event.image);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-stone-50">
                {/* Hero Image Section - Full Width */}
                {img && (
                    <div className="relative w-full h-[50vh] md:h-[55vh] overflow-hidden bg-gray-900">
                        <img
                            src={img}
                            alt={event.title}
                            className="w-full h-full object-cover object-center"
                        />
                        {/* Light Overlay - Image clearly visible */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                        {/* Content Overlay - Bottom aligned */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                            <div className="max-w-7xl mx-auto">
                                {/* Category and Status Badges */}
                                <div className="mb-4 flex flex-wrap items-center gap-3">
                                    <span className="inline-block px-4 py-2 bg-white text-[#021d49] font-bold text-sm uppercase tracking-wider rounded-lg shadow-xl">
                                        🎯 {event.category}
                                    </span>
                                    {event.status === 'Upcoming' && (
                                        <span className="inline-block px-4 py-2 bg-green-500 text-white font-bold text-sm uppercase tracking-wider rounded-lg shadow-xl">
                                            ✓ {event.status}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] [text-shadow:_2px_2px_8px_rgb(0_0_0_/_90%)]">
                                    {event.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 text-white">
                                    {event.date && (
                                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-white/20">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-semibold text-sm">{formatDate(event.date)}</span>
                                        </div>
                                    )}
                                    {event.time && (
                                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-white/20">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-semibold text-sm">{formatTime(event.time)}</span>
                                        </div>
                                    )}
                                    {event.location && (
                                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg border border-white/20">
                                            <MapPin className="w-4 h-4" />
                                            <span className="font-semibold text-sm">{event.location}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Back Button */}
                        <div className="absolute top-6 left-6">
                            <button
                                onClick={() => router.push('/convening-platforms/events')}
                                className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-900 font-semibold rounded-lg hover:bg-white transition-all shadow-xl"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="hidden sm:inline">Back to Events</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* No Image Fallback Header */}
                {!img && (
                    <div className="relative bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white py-20">
                        <div className="max-w-5xl mx-auto px-6">
                            <button
                                onClick={() => router.push('/convening-platforms/events')}
                                className="flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Events
                            </button>

                            <div className="mb-4 flex flex-wrap items-center gap-3">
                                <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wide rounded-lg">
                                    {event.category}
                                </span>
                                {event.status === 'Upcoming' && (
                                    <span className="inline-block px-4 py-2 bg-green-500/80 backdrop-blur-sm text-white font-bold text-sm uppercase tracking-wide rounded-lg">
                                        {event.status}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {event.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-4 text-white/90">
                                {event.date && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Calendar className="w-5 h-5" />
                                        <span className="font-medium">{formatDate(event.date)}</span>
                                    </div>
                                )}
                                {event.time && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <Clock className="w-5 h-5" />
                                        <span className="font-medium">{formatTime(event.time)}</span>
                                    </div>
                                )}
                                {event.location && (
                                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                                        <MapPin className="w-5 h-5" />
                                        <span className="font-medium">{event.location}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content - Full Width */}
                <div className="px-6 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-4 gap-8">
                            {/* Main Content Column - Takes 3/4 of the space */}
                            <div className="lg:col-span-3">
                                {/* Description Section */}
                                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mb-8">
                                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200">
                                        <div className="bg-[#021d49]/10 p-3 rounded-lg">
                                            <FileText className="w-6 h-6 text-[#021d49]" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900">Event Description</h2>
                                    </div>

                                    <div
                                        className="prose prose-lg max-w-none
                                            prose-headings:text-gray-900 prose-headings:font-bold
                                            prose-h1:text-3xl prose-h1:mb-4 prose-h2:text-2xl prose-h2:mb-4 prose-h3:text-xl prose-h3:mb-3
                                            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-justify
                                            prose-a:text-[#021d49] prose-a:no-underline hover:prose-a:underline
                                            prose-strong:text-gray-900 prose-strong:font-bold
                                            prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-ul:mb-6
                                            prose-ol:list-decimal prose-ol:pl-6 prose-ol:space-y-2 prose-ol:mb-6
                                            prose-li:text-gray-700
                                            prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8 prose-img:w-full
                                            prose-blockquote:border-l-4 prose-blockquote:border-[#021d49] prose-blockquote:pl-6 prose-blockquote:py-2 prose-blockquote:italic prose-blockquote:text-gray-600 prose-blockquote:bg-gray-50 prose-blockquote:my-6"
                                        dangerouslySetInnerHTML={{ __html: event.description || '<p class="text-gray-500 italic">No description available for this event.</p>' }}
                                    />
                                </div>

                                {/* Available Resources Section */}
                                {event.availableResources && event.availableResources.length > 0 && (
                                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                                            <div className="bg-green-100 p-2 rounded-lg">
                                                <Download className="w-5 h-5 text-green-600" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Event Resources</h3>
                                        </div>

                                        <div className="space-y-3">
                                            {event.availableResources.map((resource: string, idx: number) => {
                                                const resourceUrl = resource.startsWith('http') ? resource : `http://localhost:5001${resource}`;
                                                const fileName = resource.split('/').pop() || `Resource ${idx + 1}`;
                                                return (
                                                    <a
                                                        key={idx}
                                                        href={resourceUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center justify-between gap-3 p-4 bg-gradient-to-r from-gray-50 to-green-50/50 hover:from-[#021d49] hover:to-[#032a5e] border border-gray-200 hover:border-[#021d49] rounded-xl transition-all duration-300 group"
                                                    >
                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                            <div className="bg-white p-2 rounded-lg shadow-sm group-hover:bg-white/20 transition-colors">
                                                                <FileText className="w-4 h-4 text-[#021d49] group-hover:text-white transition-colors" />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <span className="text-sm font-semibold text-gray-700 group-hover:text-white transition-colors block truncate">
                                                                    {fileName}
                                                                </span>
                                                                <span className="text-xs text-gray-500 group-hover:text-white/80 transition-colors">
                                                                    Click to download
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors shrink-0" />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar - Takes 1/4 of the space */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-6 space-y-6">
                                    {/* Event Info Card */}
                                    <div className={`bg-gradient-to-br ${getCategoryGradient(event.category)} rounded-2xl shadow-lg p-6 text-white`}>
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <Calendar className="w-5 h-5" />
                                            Event Information
                                        </h3>

                                        <div className="space-y-4">
                                            <div>
                                                <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Category</p>
                                                <p className="text-white font-bold">{event.category}</p>
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Status</p>
                                                <p className="text-white font-bold">{event.status}</p>
                                            </div>

                                            {event.date && (
                                                <div>
                                                    <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Date</p>
                                                    <p className="text-white font-bold">{formatDate(event.date)}</p>
                                                </div>
                                            )}

                                            {event.time && (
                                                <div>
                                                    <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Time</p>
                                                    <p className="text-white font-bold">{formatTime(event.time)}</p>
                                                </div>
                                            )}

                                            {event.location && (
                                                <div>
                                                    <p className="text-xs font-semibold text-white/80 uppercase tracking-wide mb-1">Location</p>
                                                    <p className="text-white font-bold">{event.location}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Quick Actions Card */}
                                    <div className="bg-gradient-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-lg p-6 text-white">
                                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                            <Share2 className="w-5 h-5" />
                                            Quick Actions
                                        </h3>

                                        <div className="space-y-3">
                                            <button
                                                onClick={() => window.print()}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition-all"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Print Event
                                            </button>

                                            <button
                                                onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            title: event.title,
                                                            text: 'Check out this event from ARIN',
                                                            url: window.location.href,
                                                        });
                                                    }
                                                }}
                                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg font-semibold transition-all"
                                            >
                                                <Share2 className="w-4 h-4" />
                                                Share Event
                                            </button>
                                        </div>
                                    </div>

                                    {/* Reminder Notice */}
                                    {event.status === 'Upcoming' && (
                                        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-6">
                                            <div className="flex items-start gap-3">
                                                <Bell className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                                                <div>
                                                    <h4 className="font-bold text-blue-900 mb-1">Upcoming Event</h4>
                                                    <p className="text-sm text-blue-800">
                                                        Don't forget to mark your calendar for this event!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Back to Events Button - Bottom */}
                        <div className="mt-12 text-center">
                            <button
                                onClick={() => router.push('/convening-platforms/events')}
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#021d49] to-[#032a5e] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back to All Events
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetailPage;