"use client";
import React, { useState } from 'react';
import { X, Mail, Linkedin, Award, BookOpen, Users } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const SecretariatPage = () => {
    const [selectedMember, setSelectedMember] = useState(null);

    const secretariatMembers = [
        {
            id: 1,
            name: "Dr. Jane Muthoni",
            role: "Executive Director",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
            bio: "Dr. Jane Muthoni is a distinguished research leader with over 20 years of experience in sustainable development and climate policy in Africa. She holds a PhD in Environmental Science from the University of Nairobi and has published extensively on climate adaptation strategies.",
            expertise: ["Climate Policy", "Sustainable Development", "Research Leadership"],
            email: "j.muthoni@arin.org",
            linkedin: "#"
        },
        {
            id: 2,
            name: "Prof. Kwame Osei",
            role: "Director of Research",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
            bio: "Prof. Kwame Osei is a renowned expert in agricultural innovation and food security. With a background in Agricultural Economics, he has led numerous research projects across West Africa, focusing on climate-smart agriculture and rural development.",
            expertise: ["Agricultural Economics", "Food Security", "Climate-Smart Agriculture"],
            email: "k.osei@arin.org",
            linkedin: "#"
        },
        {
            id: 3,
            name: "Dr. Amina Hassan",
            role: "Head of Policy & Advocacy",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
            bio: "Dr. Amina Hassan specializes in evidence-based policy formulation and stakeholder engagement. She has worked extensively with African governments and international organizations to translate research into actionable policy recommendations.",
            expertise: ["Policy Analysis", "Advocacy", "Stakeholder Engagement"],
            email: "a.hassan@arin.org",
            linkedin: "#"
        },
        {
            id: 4,
            name: "Mr. David Kamau",
            role: "Finance & Operations Manager",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            bio: "Mr. David Kamau brings over 15 years of financial management experience in the non-profit sector. He ensures ARIN's financial sustainability and operational efficiency while maintaining transparency and accountability in all organizational activities.",
            expertise: ["Financial Management", "Operations", "Grant Management"],
            email: "d.kamau@arin.org",
            linkedin: "#"
        },
        {
            id: 5,
            name: "Dr. Fatima Diallo",
            role: "Senior Research Fellow",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
            bio: "Dr. Fatima Diallo is an expert in urban resilience and disaster risk management. Her research focuses on building adaptive capacity in African cities and developing integrated approaches to climate adaptation and disaster preparedness.",
            expertise: ["Urban Resilience", "Disaster Management", "Climate Adaptation"],
            email: "f.diallo@arin.org",
            linkedin: "#"
        },
        {
            id: 6,
            name: "Mr. John Mensah",
            role: "Communications & Outreach Lead",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
            bio: "Mr. John Mensah leads ARIN's communication strategy, ensuring research findings reach diverse audiences. With a background in journalism and public relations, he excels at translating complex research into accessible content for policymakers and the public.",
            expertise: ["Strategic Communications", "Public Relations", "Digital Media"],
            email: "j.mensah@arin.org",
            linkedin: "#"
        },
        {
            id: 7,
            name: "Dr. Sarah Ochieng",
            role: "Capacity Building Coordinator",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            bio: "Dr. Sarah Ochieng designs and implements capacity building programs for researchers and practitioners across Africa. She is passionate about nurturing the next generation of African researchers and strengthening institutional research capabilities.",
            expertise: ["Training & Development", "Research Mentorship", "Institutional Strengthening"],
            email: "s.ochieng@arin.org",
            linkedin: "#"
        },
        {
            id: 8,
            name: "Mr. Ahmed Ibrahim",
            role: "Partnerships Manager",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            bio: "Mr. Ahmed Ibrahim manages ARIN's partnerships with academic institutions, government agencies, and international organizations. He has successfully established collaborative frameworks that enhance research impact and resource mobilization.",
            expertise: ["Partnership Development", "Resource Mobilization", "Collaboration Management"],
            email: "a.ibrahim@arin.org",
            linkedin: "#"
        },
        {
            id: 9,
            name: "Ms. Grace Ndlovu",
            role: "Monitoring & Evaluation Specialist",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
            bio: "Ms. Grace Ndlovu oversees ARIN's monitoring and evaluation framework, ensuring that all projects meet their objectives and deliver measurable impact. Her expertise in data analysis and impact assessment helps guide strategic decision-making.",
            expertise: ["M&E Framework", "Impact Assessment", "Data Analysis"],
            email: "g.ndlovu@arin.org",
            linkedin: "#"
        }
    ];

    return (
        <>
            <Navbar />
            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50 min-h-screen">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md border border-stone-200 mb-8">
                            <span className="text-[#46a1bb] text-xl">★</span>
                            <span className="text-sm text-gray-700 font-semibold">
                                Our Leadership Team
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                            Meet the{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">
                                Secretariat
                            </span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            Our dedicated team of experts driving research excellence and sustainable development across Africa
                        </p>
                    </div>

                    {/* Secretariat Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {secretariatMembers.map((member) => (
                            <div
                                key={member.id}
                                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-[#46a1bb]/30 hover:-translate-y-2"
                            >
                                {/* Image */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#021d49] via-[#021d49]/50 to-transparent opacity-60"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                        <p className="text-[#46a1bb] font-semibold">{member.role}</p>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <button
                                        onClick={() => setSelectedMember(member)}
                                        className="w-full bg-gradient-to-r from-[#46a1bb] to-[#021d49] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                    >
                                        Read More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Modal */}
                {selectedMember && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
                        <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
                            {/* Modal Header with Image */}
                            <div className="relative h-64 bg-gradient-to-br from-[#46a1bb] to-[#021d49]">
                                <button
                                    onClick={() => setSelectedMember(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
                                >
                                    <X className="w-5 h-5 text-gray-700" />
                                </button>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                                        <img
                                            src={selectedMember.image}
                                            alt={selectedMember.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8 lg:p-12">
                                <div className="text-center mb-8">
                                    <h2 className="text-4xl font-bold text-gray-900 mb-2">
                                        {selectedMember.name}
                                    </h2>
                                    <p className="text-xl text-[#46a1bb] font-semibold mb-4">
                                        {selectedMember.role}
                                    </p>

                                    {/* Contact Info */}
                                    <div className="flex items-center justify-center gap-4">
                                        <a
                                            href={`mailto:${selectedMember.email}`}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-[#46a1bb] hover:text-white transition-colors"
                                        >
                                            <Mail className="w-4 h-4" />
                                            <span className="text-sm font-medium">Email</span>
                                        </a>
                                        <a
                                            href={selectedMember.linkedin}
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-[#021d49] hover:text-white transition-colors"
                                        >
                                            <Linkedin className="w-4 h-4" />
                                            <span className="text-sm font-medium">LinkedIn</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Biography Section */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-[#46a1bb]/10 rounded-xl flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-[#46a1bb]" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Biography</h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {selectedMember.bio}
                                    </p>
                                </div>

                                {/* Expertise Section */}
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 bg-[#021d49]/10 rounded-xl flex items-center justify-center">
                                            <Award className="w-5 h-5 text-[#021d49]" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">Areas of Expertise</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {selectedMember.expertise.map((area, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-gradient-to-r from-[#46a1bb]/10 to-[#021d49]/10 text-gray-800 rounded-full font-semibold border-2 border-[#46a1bb]/20"
                                            >
                                                {area}
                                            </span>
                                        ))}
                                    </div>
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
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                
                .animate-slideUp {
                    animation: slideUp 0.3s ease-out;
                }
            `}</style>
            </div>
        </>

    );
};

export default SecretariatPage;