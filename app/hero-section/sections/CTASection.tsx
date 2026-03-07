"use client";
import { ArrowRight } from "lucide-react";

const CTASection = () => (
    <section className="max-w-[1600px] mx-auto px-6 pb-16">
        <div className="flex items-center justify-between gap-8 bg-[#021d49] rounded-2xl px-10 py-7 shadow-lg flex-wrap">
            <p className="text-white font-semibold text-lg">
                Have a question or want to collaborate with ARIN?
            </p>
            <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 bg-white text-[#021d49] font-bold text-sm rounded-full whitespace-nowrap hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5 shadow-md"
            >
                Contact Us <ArrowRight className="w-4 h-4" />
            </a>
        </div>
    </section>
);

export default CTASection;