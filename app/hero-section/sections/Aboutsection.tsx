"use client";
import { useState } from "react";
import { ArrowRight, Play, X } from "lucide-react";

export default function AboutSection() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <section id="about" className="relative scroll-mt-24 py-12 md:py-16 px-6 bg-linear-to-b from-[#f8faff] to-white overflow-hidden">
                {/* Decorative background — subtle grid texture + a soft colour bloom,
                    matching the treatment used on the Stats/Partners sections. */}
                <div className="sc-lines" />
                <div className="sc-vlines" />
                <div className="sc-line-mask" />
                <div
                    aria-hidden
                    className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
                    style={{ background: "radial-gradient(circle, rgba(0,196,179,0.10) 0%, transparent 70%)" }}
                />

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-16 items-center relative">
                    {/* LEFT — text */}
                    <div>
                        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-teal-600 border border-teal-200 bg-white rounded-full px-4 py-1.5 mb-6 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> What We Do
                        </span>
                        <h2 className="text-3xl md:text-[2.75rem] font-bold text-[#021d49] leading-[1.15] mb-6 tracking-tight">
                            Transforming Research into{' '}
                            <span className="relative inline-block">
                                <span className="relative z-10 text-teal-600">Lasting Impact</span>
                                <span className="absolute left-0 right-0 bottom-1 h-3 bg-teal-100 z-0 rounded-sm" />
                            </span>{' '}
                            Across Africa
                        </h2>
                        <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xl">
                            The Africa Research and Impact Network (ARIN) is a pan-African research organisation that
                            strengthens the capacity of African researchers and policymakers to generate, share, and use evidence
                            for sustainable development. ARIN operates a Science-Policy Fellowship Programme engaging
                            members from 36 African countries, with 30% drawn from government and policy institutions.
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                            <a
                                href="/about-us/focus-areas"
                                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#021d49]/20 hover:bg-[#032d6b] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Explore All Areas <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 text-sm font-semibold rounded-xl hover:border-teal-200 hover:text-[#021d49] hover:-translate-y-0.5 transition-all duration-200"
                            >
                                Get in Touch <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </div>

                    {/* RIGHT — photo card with a layered accent card behind it for depth */}
                    <div className="relative">
                        <div
                            aria-hidden
                            className="absolute -right-4 -bottom-4 w-full h-full rounded-3xl hidden sm:block"
                            style={{ background: "linear-gradient(135deg, #00c4b3 0%, #021d49 100%)" }}
                        />
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="group relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl block ring-1 ring-black/5"
                        >
                            <img
                                src="/images/paafrica.jpg"
                                alt="ARIN Conference"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#021d49]/75 via-[#021d49]/5 to-transparent" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <span className="absolute inset-0 rounded-full bg-white/40 animate-ping" />
                                    <Play className="w-6 h-6 text-[#021d49] ml-1 relative" />
                                </div>
                                <span className="text-white text-sm font-semibold tracking-wide">Watch Our Story</span>
                            </div>
                        </button>
                    </div>
                </div>
            </section>

            {open && (
                <div
                    className="fixed inset-0 z-50 bg-[#021d49]/85 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setOpen(false)}
                >
                    <div className="relative w-full max-w-4xl aspect-video" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute -top-12 right-0 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                        <iframe
                            src="https://www.youtube.com/embed/K1MKlqB0uKk?start=15112&autoplay=1"
                            title="ARIN — 4th Annual Conference"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-xl"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
