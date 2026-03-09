"use client";
import React, { useState, useEffect } from 'react';
import { PenTool, Calendar, Search, Filter, ChevronLeft, ChevronRight, ArrowRight, Users, X, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getBlogs } from '@/services/blogsService';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

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

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filteredBlogs = blogs.filter((blog: Blog) => {
        const title = (blog.title || '').toLowerCase();
        const description = stripHtml(blog.description || '').toLowerCase();
        const team = Array.isArray(blog.projectTeam) ? blog.projectTeam.join(', ').toLowerCase() : '';
        const matchesSearch = title.includes(searchTerm.toLowerCase()) ||
            description.includes(searchTerm.toLowerCase()) ||
            team.includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (blog.category === selectedCategory);
        const matchesDate = !blog.date || new Date(blog.date) <= today;
        return matchesSearch && matchesCategory && matchesDate;
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
            <section className="bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl lg:text-3xl font-bold leading-tight">ARIN Blog</h1>
                            <p className="text-sm text-blue-100 mt-1">Explore our latest thoughts, research updates, and stories from the field</p>
                        </div>
                        <div className="w-full md:max-w-sm">
                            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        placeholder="Search blogs..."
                                        value={searchTerm}
                                        onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#021d49] focus:outline-none transition-all text-gray-800 text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Filter Bar */}
                    <div className="mb-8 flex items-center gap-3 flex-wrap">
                        <Filter className="w-4 h-4 text-gray-500" />
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                                className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${selectedCategory === category
                                    ? 'bg-[#021d49] text-white shadow-md'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                        <span className="ml-auto text-xs text-gray-500">{filteredBlogs.length} blog{filteredBlogs.length !== 1 ? 's' : ''}</span>
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
            <Footer />
        </>
    );
};

export default BlogsPage;
