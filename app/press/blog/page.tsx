"use client";
import React, { useState, useEffect } from 'react';
import { PenTool, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, Users, X, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getBlogs } from '@/services/blogsService';
import Navbar from '@/app/navbar/Navbar';

interface Blog {
    _id?: string;
    title?: string;
    description?: string;
    image?: string;
    category?: string;
    date?: string;
    projectTeam?: string[];
    createdAt?: string;
}

const BlogsPage = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const blogsPerPage = 9;
    const router = useRouter();

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            const data = await getBlogs();
            setBlogs(data);
            setLoading(false);
        }
        fetchBlogs();
    }, []);

    const categories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category).filter(Boolean)))];

    function stripHtml(html: string) {
        if (!html) return '';
        return html.replace(/<[^>]+>/g, '');
    }

    const truncateText = (text: string, wordLimit: number) => {
        const words = stripHtml(text).split(' ');
        if (words.length <= wordLimit) return stripHtml(text);
        return words.slice(0, wordLimit).join(' ') + '...';
    };

    const filteredBlogs = blogs.filter((blog: Blog) => {
        const title = (blog.title || '').toLowerCase();
        const description = stripHtml(blog.description || '').toLowerCase();
        const team = Array.isArray(blog.projectTeam) ? blog.projectTeam.join(', ').toLowerCase() : '';
        const matchesSearch = title.includes(searchTerm.toLowerCase()) ||
            description.includes(searchTerm.toLowerCase()) ||
            team.includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (blog.category === selectedCategory);
        return matchesSearch && matchesCategory;
    });

    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBlogClick = (blogId: string) => {
        if (blogId) {
            router.push(`/press/blog/${blogId}`);
        }
    };

    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
                            <PenTool className="w-4 h-4" />
                            <span>ARIN Blog</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Insights & Stories
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                            Explore our latest thoughts, research updates, and stories from the field
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Search and Filter Bar */}
                    <div className="mb-12 space-y-6">
                        {/* Search */}
                        <div className="relative max-w-2xl mx-auto">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search blogs by title, content, or team..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#021d49] focus:border-transparent outline-none transition-all"
                            />
                            {searchTerm && (
                                <button
                                    onClick={() => setSearchTerm('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                            <Filter className="w-5 h-5 text-gray-600" />
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-all ${selectedCategory === category
                                        ? 'bg-[#021d49] text-white shadow-lg'
                                        : 'bg-white text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Results Count */}
                        <p className="text-center text-gray-600">
                            Showing <span className="font-semibold text-[#021d49]">{filteredBlogs.length}</span> blog{filteredBlogs.length !== 1 ? 's' : ''}
                        </p>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#021d49] border-t-transparent"></div>
                            <p className="mt-4 text-gray-600">Loading blogs...</p>
                        </div>
                    )}

                    {/* No Results */}
                    {!loading && currentBlogs.length === 0 && (
                        <div className="text-center py-20">
                            <PenTool className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-gray-700 mb-2">No blogs found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Blogs Grid */}
                    {!loading && currentBlogs.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {currentBlogs.map((blog) => (
                                    <div
                                        key={blog._id}
                                        onClick={() => handleBlogClick(blog._id!)}
                                        className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#021d49]"
                                    >
                                        {/* Image */}
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={blog.image || "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80"}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.currentTarget.src = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80";
                                                }}
                                            />
                                            {blog.category && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#021d49] text-white text-xs font-semibold rounded-full">
                                                        <Tag className="w-3 h-3" />
                                                        {blog.category}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {blog.date
                                                            ? new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                                            : 'No date'}
                                                    </span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold text-[#021d49] mb-3 line-clamp-2 group-hover:text-[#0a4d8f] transition-colors">
                                                {blog.title}
                                            </h3>

                                            <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                                                {truncateText(blog.description || '', 30)}
                                            </p>

                                            {blog.projectTeam && blog.projectTeam.length > 0 && (
                                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                                    <Users className="w-4 h-4" />
                                                    <span className="line-clamp-1">
                                                        {blog.projectTeam.slice(0, 2).join(', ')}
                                                        {blog.projectTeam.length > 2 ? ` +${blog.projectTeam.length - 2}` : ''}
                                                    </span>
                                                </div>
                                            )}

                                            <button className="inline-flex items-center gap-2 text-[#021d49] font-semibold hover:gap-3 transition-all">
                                                Read More
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all ${currentPage === page
                                                ? 'bg-[#021d49] text-white'
                                                : 'border border-gray-300 hover:bg-gray-100'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default BlogsPage;
