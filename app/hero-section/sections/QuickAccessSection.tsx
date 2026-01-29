"use client";
import { Newspaper, FileText, BookOpen, PenTool } from "lucide-react";
import React from "react";

const QuickAccessSection = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-[#021d49] mb-4">Quick Access</h2>
                    <p className="text-gray-600">Explore our latest research and publications</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <a href="/news-briefs" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#021d49] text-center transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <Newspaper className="w-8 h-8 text-[#021d49]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">News Brief</h3>
                        <p className="text-sm text-gray-600">Latest updates and announcements</p>
                    </a>

                    <a href="/technical-reports" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#021d49] text-center transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <FileText className="w-8 h-8 text-[#021d49]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Technical Report</h3>
                        <p className="text-sm text-gray-600">In-depth research findings</p>
                    </a>

                    <a href="/policy-briefs" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#021d49] text-center transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <BookOpen className="w-8 h-8 text-[#021d49]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Policy Brief</h3>
                        <p className="text-sm text-gray-600">Policy recommendations and insights</p>
                    </a>

                    <a href="/stories-of-change" className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#021d49] text-center transition-all hover:-translate-y-2">
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                            <PenTool className="w-8 h-8 text-[#021d49]" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Story of Change</h3>
                        <p className="text-sm text-gray-600">Impact stories from the field</p>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default QuickAccessSection;
