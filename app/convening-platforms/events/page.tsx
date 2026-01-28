"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, MapPin, Clock } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getEvents } from '@/services/eventsService';

const EventsPage = () => {
	const router = useRouter();
	const [events, setEvents] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [categoryFilter, setCategoryFilter] = useState('All');
	const [statusFilter, setStatusFilter] = useState('All');

	useEffect(() => {
		async function fetchEvents() {
			try {
				const data = await getEvents();
				setEvents(data);
			} catch (error) {
				console.error('Failed to fetch events:', error);
			} finally {
				setLoading(false);
			}
		}
		fetchEvents();
	}, []);

	const filteredEvents = useMemo(() => {
		return events.filter(event => {
			const matchesSearch = event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				event.location?.toLowerCase().includes(searchTerm.toLowerCase());
			const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
			const matchesStatus = statusFilter === 'All' || event.status === statusFilter;
			return matchesSearch && matchesCategory && matchesStatus;
		});
	}, [events, searchTerm, categoryFilter, statusFilter]);

	const formatDate = (dateString: string) => {
		const d = new Date(dateString);
		return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
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
				return 'bg-purple-500';
			case 'Workshop':
				return 'bg-blue-500';
			case 'Webinar':
				return 'bg-green-500';
			case 'Dialogue':
				return 'bg-amber-500';
			case 'Friday Reviews':
				return 'bg-pink-500';
			default:
				return 'bg-gray-500';
		}
	};

	const getStatusColor = (status: string) => {
		return status === 'Upcoming'
			? 'bg-emerald-500'
			: 'bg-gray-500';
	};

	return (
		<>
			<Navbar />
			<div className="w-full bg-gradient-to-br from-slate-50 via-blue-50/30 to-white min-h-screen">
				{/* Hero Section */}
				<div className="bg-gradient-to-r from-[#021d49] to-[#021d49] text-white">
					<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
						<div className="text-center">
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
								Events & Gatherings
							</h1>
							<p className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
								Join us for conferences, workshops, webinars, and dialogues that bring together experts and stakeholders to address critical challenges.
							</p>
						</div>
					</section>
				</div>

				<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
					{/* Filters */}
					<div className="mb-8 space-y-4">
						<div className="flex flex-col md:flex-row gap-4">
							{/* Search */}
							<div className="flex-1 relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									placeholder="Search events by title or location..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021d49] focus:border-transparent outline-none transition-all"
								/>
							</div>

							{/* Category Filter */}
							<select
								value={categoryFilter}
								onChange={(e) => setCategoryFilter(e.target.value)}
								className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021d49] focus:border-transparent outline-none transition-all bg-white"
							>
								<option value="All">All Categories</option>
								<option value="Conference">Conference</option>
								<option value="Workshop">Workshop</option>
								<option value="Webinar">Webinar</option>
								<option value="Dialogue">Dialogue</option>
								<option value="Friday Reviews">Friday Reviews</option>
							</select>

							{/* Status Filter */}
							<select
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
								className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#021d49] focus:border-transparent outline-none transition-all bg-white"
							>
								<option value="All">All Status</option>
								<option value="Upcoming">Upcoming</option>
								<option value="Past">Past</option>
							</select>
						</div>

						<p className="text-gray-600 text-sm">
							Showing <span className="font-semibold text-[#021d49]">{filteredEvents.length}</span> event{filteredEvents.length !== 1 ? 's' : ''}
						</p>
					</div>

					{/* Loading State */}
					{loading && (
						<div className="text-center py-20">
							<div className="animate-spin rounded-full h-16 w-16 border-4 border-[#021d49] border-t-transparent mx-auto"></div>
							<p className="text-gray-600 mt-6 text-lg font-medium">Loading events...</p>
						</div>
					)}

					{/* Empty State */}
					{!loading && filteredEvents.length === 0 && (
						<div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-200">
							<div className="text-6xl mb-4">📅</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-2">No Events Found</h3>
							<p className="text-gray-600">Try adjusting your filters to find more events.</p>
						</div>
					)}

					{/* Events Grid */}
					{!loading && filteredEvents.length > 0 && (
						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{filteredEvents.map((event) => {
								const img = buildImageUrl(event.image);
								return (
									<div
										key={event._id}
										onClick={() => router.push(`/convening-platforms/events/${event._id}`)}
										className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col h-full"
									>
										{/* Image Section */}
										<div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
											{img ? (
												<img
													src={img}
													alt={event.title}
													className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
												/>
											) : (
												<div className="w-full h-full flex items-center justify-center">
													<Calendar className="w-16 h-16 text-gray-400" />
												</div>
											)}
											<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

											{/* Badges on Image */}
											<div className="absolute top-3 left-3 right-3 flex justify-between items-start gap-2">
												<span className={`${getCategoryColor(event.category)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm`}>
													{event.category}
												</span>
												<span className={`${getStatusColor(event.status)} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm`}>
													{event.status}
												</span>
											</div>
										</div>

										{/* Content Section */}
										<div className="p-6 flex-1 flex flex-col">
											<h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#021d49] transition-colors">
												{event.title}
											</h3>

											<div className="space-y-2 mb-4">
												<div className="flex items-center gap-2 text-sm text-gray-600">
													<Calendar className="w-4 h-4 text-[#021d49] flex-shrink-0" />
													<span className="font-medium">{formatDate(event.date)}</span>
												</div>

												{event.time && (
													<div className="flex items-center gap-2 text-sm text-gray-600">
														<Clock className="w-4 h-4 text-green-600 flex-shrink-0" />
														<span>{formatTime(event.time)}</span>
													</div>
												)}

												{event.location && (
													<div className="flex items-center gap-2 text-sm text-gray-600">
														<MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
														<span className="line-clamp-1">{event.location}</span>
													</div>
												)}
											</div>

											{/* Description Preview */}
											{event.description && (
												<div
													className="text-sm text-gray-600 line-clamp-3 mb-4"
													dangerouslySetInnerHTML={{ __html: event.description }}
												/>
											)}

											{/* Read More Link */}
											<div className="mt-auto pt-4 border-t border-gray-100">
												<span className="text-[#021d49] font-semibold text-sm group-hover:gap-2 inline-flex items-center gap-1 transition-all">
													Learn More
													<span className="group-hover:translate-x-1 transition-transform">→</span>
												</span>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</section>
			</div>
		</>
	);
};

export default EventsPage;
