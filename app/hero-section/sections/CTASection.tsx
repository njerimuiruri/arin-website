"use client";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
    <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Join Africa's Research Revolution?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Become part of a network that's shaping the future of research and policy in Africa
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
                <a
                    href="/join"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#46a1bb] to-[#021d49] text-white font-bold text-lg rounded-xl hover:from-[#3a8da5] hover:to-[#011536] transition-all duration-300 shadow-2xl hover:scale-105"
                >
                    Become a Member
                    <ArrowRight className="w-6 h-6" />
                </a>
                <a
                    href="/contact"
                    className="inline-flex items-center gap-3 px-10 py-5 bg-transparent border-2 border-white text-white font-bold text-lg rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                    Contact Us
                </a>
            </div>
        </div>
    </section>
);

export default CTASection;
