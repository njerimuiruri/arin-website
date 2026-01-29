"use client";
import React, { useState, useEffect } from 'react';
import { X, BookOpen, Users, ArrowRight, Briefcase } from 'lucide-react';
import { getTeamMembers } from '@/services/teamsService';
import Navbar from '@/app/navbar/Navbar';

type SecretariatMember = {
    _id: string;
    firstName: string;
    lastName: string;
    role: string;
    image?: string;
    bio?: string;
};

const SecretariatPage = () => {
    const [selectedMember, setSelectedMember] = useState<SecretariatMember | null>(null);
    const [members, setMembers] = useState<SecretariatMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMembers = async () => {
            try {
                const data = await getTeamMembers();
                setMembers(data);
            } catch (error) {
                console.error('Failed to load team members:', error);
            } finally {
                setLoading(false);
            }
        };
        loadMembers();
    }, []);

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-gray-50 min-h-screen">
                {/* Hero Section - Minimal padding */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-200 mb-3">
                            <Users className="w-3.5 h-3.5 text-[#021d49]" />
                            <span className="text-xs text-gray-700 font-medium">
                                Leadership Team
                            </span>
                        </div>

                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                            Meet Our{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-[#021d49] to-[#14234d] bg-clip-text text-transparent">
                                    Team
                                </span>
                                <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
                                    <path d="M0 4C50 1 100 1 150 4C150 4 175 6 200 4" stroke="url(#gradient)" strokeWidth="3" fill="none" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#021d49" stopOpacity="0.4" />
                                            <stop offset="100%" stopColor="#14234d" stopOpacity="0.4" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                        </h1>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            Our dedicated team of experts driving research excellence and sustainable development across Africa
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#021d49]"></div>
                            <p className="mt-2 text-gray-600 text-sm">Loading team members...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && members.length === 0 && (
                        <div className="text-center py-8">
                            <Users className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-600 text-sm">No team members found.</p>
                        </div>
                    )}

                    {/* Team Grid - Very compact cards */}
                    {!loading && members.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {members.map((member) => (
                                <div
                                    key={member._id}
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#021d49]/30 cursor-pointer"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    {/* Image - Compact height */}
                                    <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img
                                            src={member.image && member.image.startsWith('http') ? member.image : member.image ? `http://localhost:5001${member.image}` : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'}
                                            alt={`${member.firstName} ${member.lastName}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Content - Minimal padding */}
                                    <div className="p-3">
                                        <h3 className="text-sm font-bold text-gray-900 mb-0.5 group-hover:text-[#021d49] transition-colors leading-tight">
                                            {member.firstName} {member.lastName}
                                        </h3>
                                        <div className="flex items-center gap-1 mb-2">
                                            <Briefcase className="w-3 h-3 text-[#021d49] flex-shrink-0" />
                                            <p className="text-xs text-[#021d49] font-medium truncate">{member.role}</p>
                                        </div>

                                        <div className="flex items-center gap-1.5 text-[#021d49] text-xs font-semibold group-hover:gap-2 transition-all pt-2 border-t border-gray-100">
                                            <span>View</span>
                                            <ArrowRight className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Modal - Compact version */}
                {selectedMember && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 animate-fadeIn"
                        onClick={() => setSelectedMember(null)}
                    >
                        <div
                            className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative bg-gradient-to-br from-[#021d49] to-[#14234d] text-white">
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>

                                <div className="p-4 sm:p-6">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shadow-xl flex-shrink-0 ring-4 ring-white/30">
                                            <img
                                                src={selectedMember.image && selectedMember.image.startsWith('http') ? selectedMember.image : selectedMember.image ? `http://localhost:5001${selectedMember.image}` : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'}
                                                alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                                                className="w-full h-full object-cover"
                                                onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'; }}
                                            />
                                        </div>
                                        <div className="flex-1 text-center sm:text-left">
                                            <h2 className="text-xl sm:text-2xl font-bold mb-1.5">
                                                {selectedMember.firstName} {selectedMember.lastName}
                                            </h2>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                                                <Briefcase className="w-3.5 h-3.5" />
                                                <p className="text-sm font-semibold">
                                                    {selectedMember.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-4 sm:p-6">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <div className="w-8 h-8 bg-[#021d49] rounded-lg flex items-center justify-center shadow-sm">
                                            <BookOpen className="w-4 h-4 text-white" />
                                        </div>
                                        <h3 className="text-base sm:text-lg font-bold text-gray-900">Biography</h3>
                                    </div>
                                    <div
                                        className="text-gray-700 leading-relaxed text-sm prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: selectedMember.bio || '<p class="text-gray-500 italic">No biography available</p>' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { 
                        opacity: 0;
                        transform: translateY(15px) scale(0.98);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
            </div>
        </>
    );
};

export default SecretariatPage;