"use client";
import { Globe, Lightbulb, ChevronRight } from "lucide-react";

const LatestProjectsSection = ({ latestProjects }: { latestProjects: any[] }) => (
    <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Projects</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Explore our ongoing research initiatives across Africa
            </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestProjects.map((project, index) => (
                <div key={index} className="group relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#021d49] via-[#021d49] to-[#021d49] rounded-3xl opacity-0 group-hover:opacity-75 blur-sm transition duration-700"></div>
                    <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden">
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#021d49]/30 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob"></div>
                            <div className="absolute -top-12 -right-12 w-48 h-48 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-2000"></div>
                            <div className="absolute -bottom-12 left-1/2 w-48 h-48 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000"></div>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-[#021d49] rounded-full animate-pulse"></div>
                                        <div className="absolute inset-0 w-3 h-3 bg-[#021d49] rounded-full animate-ping"></div>
                                    </div>
                                    <span className="px-4 py-2 bg-gradient-to-r from-[#021d49]/10 to-[#021d49]/10 text-[#021d49] text-xs font-bold rounded-full border-2 border-[#021d49]/20 shadow-lg">
                                        {project.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-stone-50 to-gray-50 rounded-full border-2 border-stone-200 shadow-sm group-hover:border-[#021d49] transition-colors">
                                    <Globe className="w-4 h-4 text-[#021d49]" />
                                    <span className="text-xs text-gray-700 font-bold">{project.region}</span>
                                </div>
                            </div>
                            <div className="relative mb-8">
                                <div className="w-20 h-20 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 relative z-10">
                                    <Lightbulb className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute inset-0 w-20 h-20 bg-[#021d49] rounded-2xl opacity-0 group-hover:opacity-40 translate-y-1 translate-x-1 transition-all duration-700"></div>
                                <div className="absolute inset-0 w-20 h-20 bg-[#021d49] rounded-2xl opacity-0 group-hover:opacity-20 translate-y-2 translate-x-2 transition-all duration-700"></div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-[#021d49] transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <div className="h-1.5 w-0 bg-gradient-to-r from-[#021d49] to-[#021d49] rounded-full group-hover:w-24 transition-all duration-700 shadow-lg"></div>
                            </div>
                            <p className="text-gray-600 mb-8 leading-relaxed text-sm min-h-[5rem]">
                                {project.description}
                            </p>
                            <div className="relative h-0.5 mb-8 overflow-hidden rounded-full">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stone-200 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#021d49] via-[#021d49] to-[#021d49] translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                            </div>
                            <a href="#" className="group/btn relative w-full inline-flex items-center justify-between gap-4 p-5 bg-gradient-to-r from-[#021d49]/10 to-[#021d49]/10 rounded-2xl border-2 border-[#021d49]/20 hover:border-[#021d49] overflow-hidden transition-all duration-300 hover:shadow-xl">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#021d49] to-[#021d49] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                                <span className="relative z-10 font-bold text-[#021d49] group-hover/btn:text-white transition-colors">Explore Project</span>
                                <div className="relative z-10 w-10 h-10 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-xl flex items-center justify-center shadow-lg group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-all duration-300">
                                    <ChevronRight className="w-6 h-6 text-white group-hover/btn:translate-x-1 transition-transform" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <style jsx>{`
            @keyframes blob {
                0% { transform: translate(0px, 0px) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0px, 0px) scale(1); }
            }
            .animate-blob {
                animation: blob 7s infinite;
            }
            .animation-delay-2000 {
                animation-delay: 2s;
            }
            .animation-delay-4000 {
                animation-delay: 4s;
            }
        `}</style>
    </section>
);

export default LatestProjectsSection;
