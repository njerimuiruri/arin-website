"use client";
import { ArrowRight } from "lucide-react";

const LatestPostsSection = ({ latestPosts }: { latestPosts: any[] }) => (
    <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="flex items-center justify-between mb-12">
            <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Latest Posts</h2>
                <p className="text-gray-600 text-lg">Stay updated with our recent publications and insights</p>
            </div>
            <a href="/press/blog" className="hidden md:inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#46a1bb] to-[#021d49] text-white font-bold rounded-xl hover:from-[#3a8da5] hover:to-[#011536] transition-all shadow-lg">
                View All Posts
                <ArrowRight className="w-5 h-5" />
            </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post, index) => (
                <article key={index} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-stone-200 hover:border-[#46a1bb] hover:-translate-y-2">
                    <div className="relative h-56 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-[#46a1bb]/90 to-[#021d49]/90 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                            {post.category}
                        </div>
                    </div>
                    <div className="p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#46a1bb] transition-colors duration-300">
                            {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 leading-relaxed text-sm min-h-[3rem]">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 font-semibold">{post.date}</span>
                            <a href="#" className="inline-flex items-center gap-2 text-[#46a1bb] font-bold hover:gap-4 transition-all">
                                Read More <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    </section>
);

export default LatestPostsSection;
