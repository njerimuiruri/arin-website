"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Users, ArrowLeft, Tag, Share2, ZoomIn, X } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getBlogById } from '@/services/blogsService';
import Footer from '@/app/footer/Footer';

interface Blog {
    _id?: string;
    title: string;
    description: string;
    image?: string;
    category?: string;
    date?: string;
    projectTeam?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [imageModalOpen, setImageModalOpen] = useState(false);

    useEffect(() => {
        if (!params.id) return;
        setLoading(true);
        getBlogById(params.id as string)
            .then(data => { if (data) setBlog(data); else setError('Blog not found'); })
            .catch(() => setError('Failed to load blog'))
            .finally(() => setLoading(false));
    }, [params.id]);

    if (loading) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-[#021d49] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading blog...</p>
                </div>
            </div>
        </>
    );

    if (error || !blog) return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="text-center bg-white rounded-2xl shadow-sm border border-gray-200 p-10 max-w-md w-full">
                    <h1 className="text-xl font-bold text-gray-900 mb-2">Blog Not Found</h1>
                    <p className="text-gray-500 text-sm mb-6">{error || 'The blog you are looking for does not exist.'}</p>
                    <button onClick={() => router.push('/press/blog')} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#021d49] text-white text-sm font-semibold rounded-lg hover:bg-[#032a5e] transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Blogs
                    </button>
                </div>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-50">

                {/* Image Modal */}
                {imageModalOpen && blog.image && (
                    <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4" onClick={() => setImageModalOpen(false)}>
                        <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
                            <button onClick={() => setImageModalOpen(false)} className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white rounded-full p-2.5 transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                            <img src={blog.image} alt={blog.title} className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl" />
                            <p className="text-white/60 text-xs text-center mt-3">Click outside to close</p>
                        </div>
                    </div>
                )}

                {/* Compact Hero Banner */}
                <div className="bg-[#021d49] text-white">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-6">
                        {blog.image && (
                            <button onClick={() => setImageModalOpen(true)} className="shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 border-white/20 hover:border-white/60 transition-colors relative group" title="View full-size">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
                                    <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            </button>
                        )}
                        <div className="flex-1 min-w-0">
                            <button onClick={() => router.push('/press/blog')} className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs mb-2 transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" /> All Blogs
                            </button>
                            {blog.category && <span className="inline-block px-2.5 py-0.5 bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-wider rounded-full mb-2 ml-2">{blog.category}</span>}
                            <h1 className="text-lg md:text-2xl font-bold leading-snug mb-2 line-clamp-2">{blog.title}</h1>
                            <div className="flex flex-wrap gap-3 text-xs text-white/70">
                                {blog.date && <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
                                {blog.projectTeam && blog.projectTeam.length > 0 && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{blog.projectTeam.join(', ')}</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="grid lg:grid-cols-4 gap-8 items-start">

                        {/* Main content */}
                        <div className="lg:col-span-3">
                            <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                                <div
                                    className="prose prose-base max-w-none
                                        prose-headings:text-[#021d49] prose-headings:font-bold
                                        prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-5
                                        prose-a:text-[#021d49] prose-a:no-underline hover:prose-a:underline
                                        prose-img:rounded-xl prose-img:shadow-lg prose-img:my-6 prose-img:w-full"
                                    dangerouslySetInnerHTML={{ __html: blog.description }}
                                />
                            </article>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-6">
                            {/* Cover Image Card */}
                            {blog.image && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                                    <button onClick={() => setImageModalOpen(true)} className="relative w-full group block" title="Click to view full-size">
                                        <img src={blog.image} alt={blog.title} className="w-full object-cover max-h-64" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                                            <div className="bg-white/90 rounded-full p-2.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                                                <ZoomIn className="w-5 h-5 text-gray-900" />
                                            </div>
                                        </div>
                                    </button>
                                    <p className="text-xs text-center text-gray-400 py-2 px-3 border-t border-gray-100">Click image to enlarge</p>
                                </div>
                            )}

                            {/* Post Details */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Post Details</h3>
                                <dl className="space-y-3 text-sm">
                                    {blog.category && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5 flex items-center gap-1"><Tag className="w-3 h-3" />Category</dt><dd className="text-gray-900 font-medium">{blog.category}</dd></div>}
                                    {blog.date && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Date</dt><dd className="text-gray-900 font-medium">{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</dd></div>}
                                    {blog.projectTeam && blog.projectTeam.length > 0 && <div><dt className="text-gray-500 text-xs uppercase tracking-wide mb-0.5">Team</dt><dd className="text-gray-900 font-medium">{blog.projectTeam.join(', ')}</dd></div>}
                                </dl>
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-linear-to-br from-[#021d49] to-[#032a5e] rounded-2xl shadow-sm p-6 text-white">
                                <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Quick Actions</h3>
                                <div className="space-y-2">
                                    <button onClick={() => router.push('/press/blog')} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold">
                                        <ArrowLeft className="w-4 h-4" /> All Blogs
                                    </button>
                                    <button onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm font-semibold">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <button onClick={() => router.push('/press/blog')} className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-xl hover:bg-[#032a5e] transition-colors shadow-sm">
                            <ArrowLeft className="w-4 h-4" /> View All Blogs
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
