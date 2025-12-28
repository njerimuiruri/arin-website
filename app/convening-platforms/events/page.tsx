"use client";
import React, { useState } from 'react';
import { ArrowRight, Calendar, MapPin, Clock, Users, Search, Filter } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const EventsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'

    const upcomingEvents = [
        {
            id: 'climate-summit-2025',
            title: 'African Climate Summit 2025',
            date: 'March 15, 2025',
            time: '9:00 AM - 5:00 PM',
            location: 'Nairobi, Kenya',
            type: 'Conference',
            excerpt: 'Join leaders, researchers, and policymakers to discuss climate action strategies and solutions for Africa.',
            attendees: '500+',
            tags: ['Climate Change', 'Policy', 'Networking'],
            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80'
        },
        {
            id: 'research-workshop-2025',
            title: 'Research Methods Workshop',
            date: 'April 10, 2025',
            time: '10:00 AM - 4:00 PM',
            location: 'Virtual',
            type: 'Workshop',
            excerpt: 'Intensive training on qualitative and quantitative research methods for African researchers.',
            attendees: '100+',
            tags: ['Research', 'Training', 'Capacity Building'],
            image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80'
        },
        {
            id: 'climate-action-webinar-2025',
            title: 'Climate Action Planning Webinar',
            date: 'April 25, 2025',
            time: '3:00 PM - 4:30 PM',
            location: 'Virtual',
            type: 'Webinar',
            excerpt: 'Online session on developing effective climate action plans for African municipalities.',
            attendees: '250+',
            tags: ['Climate Action', 'Planning', 'Virtual'],
            image: 'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=800&q=80'
        },
        {
            id: 'policy-dialogue-2025',
            title: 'Policy Dialogue on Sustainable Development',
            date: 'May 20, 2025',
            time: '2:00 PM - 6:00 PM',
            location: 'Accra, Ghana',
            type: 'Dialogue',
            excerpt: 'Engaging policymakers and stakeholders in conversations about sustainable development goals.',
            attendees: '200+',
            tags: ['Policy', 'SDGs', 'Development'],
            image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&q=80'
        },
        {
            id: 'gender-equality-seminar-2025',
            title: 'Gender Equality in Climate Research Seminar',
            date: 'June 5, 2025',
            time: '10:00 AM - 12:00 PM',
            location: 'Addis Ababa, Ethiopia',
            type: 'Seminar',
            excerpt: 'Examining gender perspectives in climate change research and policy making.',
            attendees: '80+',
            tags: ['Gender', 'Research', 'Climate'],
            image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80'
        }
    ];

    const pastEvents = [
        {
            id: 'arin-conference-2024',
            title: 'ARIN Annual Conference 2024',
            date: 'November 12, 2024',
            time: '9:00 AM - 6:00 PM',
            location: 'Kigali, Rwanda',
            type: 'Conference',
            excerpt: 'Annual gathering of ARIN fellows and partners to share research findings and network.',
            attendees: '600+',
            tags: ['Research', 'Networking', 'Impact'],
            image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80'
        },
        {
            id: 'climate-finance-workshop-2024',
            title: 'Climate Finance Capacity Building Workshop',
            date: 'September 5, 2024',
            time: '10:00 AM - 4:00 PM',
            location: 'Lagos, Nigeria',
            type: 'Workshop',
            excerpt: 'Training on accessing climate finance mechanisms for African countries.',
            attendees: '150+',
            tags: ['Climate Finance', 'Training', 'Capacity'],
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80'
        },
        {
            id: 'ndc-implementation-webinar-2024',
            title: 'NDC Implementation Strategies Webinar',
            date: 'September 20, 2024',
            time: '2:00 PM - 3:30 PM',
            location: 'Virtual',
            type: 'Webinar',
            excerpt: 'Virtual discussion on effective strategies for implementing Nationally Determined Contributions.',
            attendees: '300+',
            tags: ['NDC', 'Implementation', 'Virtual'],
            image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
        },
        {
            id: 'youth-summit-2024',
            title: 'African Youth Climate Summit',
            date: 'August 22, 2024',
            time: '9:00 AM - 5:00 PM',
            location: 'Dakar, Senegal',
            type: 'Summit',
            excerpt: 'Empowering young African leaders to take action on climate change.',
            attendees: '300+',
            tags: ['Youth', 'Climate', 'Leadership'],
            image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80'
        },
        {
            id: 'adaptation-seminar-2024',
            title: 'Climate Adaptation Financing Seminar',
            date: 'July 30, 2024',
            time: '11:00 AM - 1:00 PM',
            location: 'Cape Town, South Africa',
            type: 'Seminar',
            excerpt: 'Expert seminar on accessing and managing climate adaptation finance.',
            attendees: '90+',
            tags: ['Adaptation', 'Finance', 'Seminar'],
            image: 'https://images.unsplash.com/photo-1560439513-74b037a25d84?w=800&q=80'
        },
        {
            id: 'adaptation-dialogue-2024',
            title: 'Community-Led Adaptation Dialogue',
            date: 'July 18, 2024',
            time: '2:00 PM - 5:00 PM',
            location: 'Kampala, Uganda',
            type: 'Dialogue',
            excerpt: 'Sharing best practices in locally-led adaptation initiatives.',
            attendees: '120+',
            tags: ['Adaptation', 'Community', 'Dialogue'],
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80'
        }
    ];

    const eventTypes = ['All', 'Conference', 'Workshop', 'Webinar', 'Seminar', 'Dialogue', 'Summit'];

    const currentEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;

    const filteredEvents = currentEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || event.type === selectedType;
        return matchesSearch && matchesType;
    });

    const handleEventClick = (eventId) => {
        console.log('Navigate to event:', eventId);
        alert(`Navigate to event: ${eventId}\n\nIn your Next.js app, use:\nrouter.push(\`/events/${eventId}\`)`);
    };

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-12">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            ARIN{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Events
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Join us at conferences, workshops, and dialogues driving research excellence and policy impact across Africa
                        </p>
                    </div>

                    {/* Tabs for Upcoming/Past Events */}
                    <div className="flex justify-center mb-8">
                        <div className="bg-white rounded-lg p-1 shadow-md border border-gray-200">
                            <button
                                onClick={() => setActiveTab('upcoming')}
                                className={`px-8 py-3 rounded-lg font-semibold transition-all ${activeTab === 'upcoming'
                                    ? 'bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Upcoming Events
                            </button>
                            <button
                                onClick={() => setActiveTab('past')}
                                className={`px-8 py-3 rounded-lg font-semibold transition-all ${activeTab === 'past'
                                    ? 'bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white shadow-md'
                                    : 'text-gray-600 hover:text-gray-900'
                                    }`}
                            >
                                Past Events
                            </button>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="max-w-4xl mx-auto mb-8">
                        <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                            <div className="grid md:grid-cols-2 gap-4">
                                {/* Search Bar */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="text"
                                        placeholder="Search events..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors"
                                    />
                                </div>

                                {/* Type Filter */}
                                <div className="relative">
                                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <select
                                        value={selectedType}
                                        onChange={(e) => setSelectedType(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-[#46a1bb] focus:outline-none transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        {eventTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Events Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-[#46a1bb] cursor-pointer group"
                                onClick={() => handleEventClick(event.id)}
                            >
                                {/* Event Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold text-xs uppercase tracking-wide rounded-full shadow-lg">
                                            {event.type}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#46a1bb] transition-colors leading-tight mb-4">
                                        {event.title}
                                    </h3>

                                    {/* Date, Time, Location */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                            <span>{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="w-4 h-4 text-[#46a1bb]" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 text-[#46a1bb]" />
                                            <span>{event.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Users className="w-4 h-4 text-[#46a1bb]" />
                                            <span>{event.attendees} Expected</span>
                                        </div>
                                    </div>

                                    {/* Excerpt */}
                                    <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                                        {event.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {event.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View Details Button */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleEventClick(event.id); }}
                                        className="w-full px-5 py-2.5 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-semibold rounded-lg shadow-md flex items-center gap-2 justify-center hover:shadow-lg transition-all duration-200"
                                    >
                                        <span>View Details</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* No Results Message */}
                    {filteredEvents.length === 0 && (
                        <div className="text-center py-16">
                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </section>


            </div>

        </>
    );
};

export default EventsPage;