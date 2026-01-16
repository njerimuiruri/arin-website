"use client";
import { TrendingUp, BookOpen, Lightbulb } from "lucide-react";

const FeaturesSection = () => (
    <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Why Join Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Be part of Africa's transformative research and policy platform
            </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200 hover:border-[#46a1bb] hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-[#46a1bb]/20 to-[#021d49]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <TrendingUp className="w-10 h-10 text-[#46a1bb]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Share Research Trends
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    Develop models and best practices on pathways to research excellence and impact.
                </p>
            </div>
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200 hover:border-amber-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <BookOpen className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Policy Reviews
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    Convene evidence and impact dialogues.
                </p>
            </div>
            <div className="group bg-white rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-stone-200 hover:border-purple-300 hover:-translate-y-2">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Lightbulb className="w-10 h-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Support Knowledge Systems
                </h3>
                <p className="text-gray-600 leading-relaxed">
                    Support capacity of individuals and institutions on transformative research and impact pathways.
                </p>
            </div>
        </div>
    </section>
);

export default FeaturesSection;
