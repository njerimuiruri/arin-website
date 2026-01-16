"use client";
import { Calendar } from "lucide-react";

const UpcomingEventsSection = ({ upcomingEvents }: { upcomingEvents: any[] }) => (
    <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-12">
            <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Upcoming Events</h2>
                <p className="text-gray-600 text-lg">Join us at our upcoming conferences and workshops</p>
            </div>
            <a href="/convening-platforms/events" className="hidden md:inline-flex items-center gap-3 px-6 py-3 border-2 border-[#46a1bb] text-[#46a1bb] font-bold rounded-xl hover:bg-[#46a1bb] hover:text-white transition-all shadow-lg">
                View All Events
                <Calendar className="w-5 h-5" />
            </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
                <div key={index} className="group relative">
                    <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-stone-200 hover:border-[#46a1bb] hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-6">
                            <span className="px-4 py-2 bg-gradient-to-r from-[#46a1bb]/10 to-[#021d49]/10 text-[#021d49] text-xs font-bold rounded-full border-2 border-[#46a1bb]/20 shadow-lg">
                                {event.type}
                            </span>
                            <span className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-stone-50 to-gray-50 rounded-full border-2 border-stone-200 shadow-sm group-hover:border-[#46a1bb] transition-colors">
                                <Calendar className="w-4 h-4 text-[#46a1bb]" />
                                <span className="text-xs text-gray-700 font-bold">{event.date}</span>
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#46a1bb] transition-colors duration-300">
                            {event.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-500 mb-6">
                            <span className="text-xs font-semibold">{event.location}</span>
                        </div>
                        <a href="#" className="inline-flex items-center gap-2 text-[#46a1bb] font-bold hover:gap-4 transition-all">
                            Learn More <Calendar className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default UpcomingEventsSection;
