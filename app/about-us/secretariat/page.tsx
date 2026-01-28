"use client";
import React, { useState, useEffect } from 'react';
import { X, BookOpen, Users, ArrowRight } from 'lucide-react';
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
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 mb-6">
                            <Users className="w-4 h-4 text-[#021d49]" />
                            <span className="text-sm text-gray-700 font-medium">
                                Leadership Team
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            Meet Our{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 bg-gradient-to-r from-[#021d49] to-[#14234d] bg-clip-text text-transparent">
                                    Team
                                </span>
                                <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 200 8" fill="none">
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

                        <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            Our dedicated team of experts driving research excellence and sustainable development across Africa
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-12">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#021d49]"></div>
                            <p className="mt-4 text-gray-600">Loading team members...</p>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && members.length === 0 && (
                        <div className="text-center py-12">
                            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-600">No team members found.</p>
                        </div>
                    )}

                    {/* Team Grid */}
                    {!loading && members.length > 0 && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {members.map((member) => (
                                <div
                                    key={member._id}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#021d49]/30 cursor-pointer"
                                    onClick={() => setSelectedMember(member)}
                                >
                                    {/* Image */}
                                    <div className="relative h-80 overflow-hidden bg-gray-100">
                                        <img
                                            src={member.image && member.image.startsWith('http') ? member.image : member.image ? `http://localhost:5001${member.image}` : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'}
                                            alt={`${member.firstName} ${member.lastName}`}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'; }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#021d49] transition-colors">
                                            {member.firstName} {member.lastName}
                                        </h3>
                                        <p className="text-sm text-[#021d49] font-medium mb-4">{member.role}</p>

                                        <div className="text-sm text-gray-600 line-clamp-2 mb-4" dangerouslySetInnerHTML={{ __html: member.bio ? member.bio.substring(0, 100) + (member.bio.length > 100 ? '...' : '') : 'No bio available' }} />

                                        <div className="flex items-center gap-2 text-[#021d49] text-sm font-medium group-hover:gap-3 transition-all">
                                            <span>View Profile</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Modal */}
                {selectedMember && (
                    <div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
                        onClick={() => setSelectedMember(null)}
                    >
                        <div
                            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative p-6 md:p-8 border-b border-gray-100">
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>

                                <div className="flex flex-col sm:flex-row items-start gap-6">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 ring-4 ring-[#021d49]/20">
                                        <img
                                            src={selectedMember.image && selectedMember.image.startsWith('http') ? selectedMember.image : selectedMember.image ? `http://localhost:5001${selectedMember.image}` : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'}
                                            alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
                                            className="w-full h-full object-cover"
                                            onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'; }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                            {selectedMember.firstName} {selectedMember.lastName}
                                        </h2>
                                        <p className="text-lg text-[#021d49] font-semibold mb-4">
                                            {selectedMember.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 md:p-8">
                                {/* Biography Section */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-[#021d49]/10 rounded-xl flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-[#021d49]" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900">Biography</h3>
                                    </div>
                                    <div className="text-gray-600 leading-relaxed pl-13 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: selectedMember.bio || 'No bio available' }} />
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
                        transform: translateY(30px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
            </div >

        </>
    );
};

export default SecretariatPage;