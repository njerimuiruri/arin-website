"use client";

import Script from "next/script";
import { Linkedin } from "lucide-react";

export default function SocialConnectSection() {
    return (
        <section className="w-full py-12 md:py-16 px-6 bg-white">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#021d49] mb-3">Follow Our Work</h2>
                    <p className="text-gray-600 leading-relaxed">
                        Stay up to date with Arin Africa across social media.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-[#f8fafc] p-4 min-h-[400px]">
                        <a
                            className="twitter-timeline"
                            data-height="560"
                            data-theme="light"
                            href="https://twitter.com/arin_africa?ref_src=twsrc%5Etfw"
                        >
                            Tweets by @arin_africa
                        </a>
                        <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
                    </div>

                    <div className="border border-gray-200 rounded-xl p-8 flex flex-col items-center text-center gap-4 bg-[#f8fafc] min-h-[400px] justify-center">
                        <div className="w-16 h-16 rounded-full bg-[#0A66C2] flex items-center justify-center">
                            <Linkedin className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-[#021d49]">Arin Africa</h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Follow us on LinkedIn for updates on our research and programs.
                            </p>
                        </div>
                        <a
                            href="https://www.linkedin.com/company/arin-africa/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0A66C2] text-white text-sm font-semibold hover:bg-[#004182] transition-colors"
                        >
                            Follow on LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
