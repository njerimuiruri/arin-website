"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, Users, ArrowLeft, Tag, Share2 } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getBlogById } from '@/services/blogsService';

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

    useEffect(() => {
        async function fetchBlog() {
            if (!params.id) return;

            try {
                setLoading(true);
                const data = await getBlogById(params.id as string);
                if (data) {
                    setBlog(data);
                } else {
                    setError('Blog not found');
                }
            } catch (err) {
                setError('Failed to load blog');
                console.error('Error fetching blog:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [params.id]);

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#021d49] border-t-transparent"></div>
                        <p className="mt-4 text-gray-600">Loading blog...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error || !blog) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog Not Found</h1>
                        <p className="text-gray-600 mb-8">{error || 'The blog you are looking for does not exist.'}</p>
                        <button
                            onClick={() => router.push('/press/blog')}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-lg hover:bg-[#032a5e] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Blogs
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            {/* Back Button */}
            <div className="bg-gray-50 py-4 sticky top-0 z-10 border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-6">
                    <button
                        onClick={() => router.push('/press/blog')}
                        className="inline-flex items-center gap-2 text-[#021d49] hover:text-[#032a5e] font-semibold transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Blogs
                    </button>
                </div>
            </div>

            {/* Hero Image */}
            {blog.image && (
                <div className="relative h-96 overflow-hidden">
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                </div>
            )}

            {/* Content */}
            <article className="max-w-5xl mx-auto px-6 py-12">
                {/* Category Badge */}
                {blog.category && (
                    <div className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#021d49] text-white text-sm font-semibold rounded-full">
                            <Tag className="w-4 h-4" />
                            {blog.category}
                        </span>
                    </div>
                )}

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-bold text-[#021d49] mb-6 leading-tight">
                    {blog.title}
                </h1>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-6 pb-6 mb-8 border-b border-gray-200">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <span>
                            {blog.date
                                ? new Date(blog.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })
                                : 'No date available'}
                        </span>
                    </div>

                    {blog.projectTeam && blog.projectTeam.length > 0 && (
                        <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-5 h-5" />
                            <span>{blog.projectTeam.join(', ')}</span>
                        </div>
                    )}

                    <button
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: blog.title,
                                    text: blog.description,
                                    url: window.location.href,
                                });
                            }
                        }}
                        className="ml-auto inline-flex items-center gap-2 px-4 py-2 text-[#021d49] hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Share2 className="w-5 h-5" />
                        <span className="font-semibold">Share</span>
                    </button>
                </div>

                {/* Description/Content */}
                <div
                    className="prose prose-lg max-w-none prose-headings:text-[#021d49] prose-a:text-[#0a4d8f] prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: blog.description }}
                />
            </article>

            {/* Related or CTA Section */}
            <section className="bg-gray-50 py-16 mt-12">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-[#021d49] mb-4">
                        Explore More Insights
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Discover more stories and research from ARIN
                    </p>
                    <button
                        onClick={() => router.push('/press/blog')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] text-white font-semibold rounded-lg hover:bg-[#032a5e] transition-colors"
                    >
                        View All Blogs
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                    </button>
                </div>
            </section>
        </>
    );
}
