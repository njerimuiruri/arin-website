"use client";
import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Search, Filter, ChevronLeft, ChevronRight, FileText, Users, ArrowRight, Lock } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import { getBooks } from '@/services/booksService';
import Footer from '@/app/footer/Footer';

const BooksPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const booksPerPage = 6;

    useEffect(() => {
        loadBooks();
    }, []);

    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await getBooks();
            const sorted = [...data].sort((a, b) => new Date(b.datePosted || 0).getTime() - new Date(a.datePosted || 0).getTime());
            setBooks(sorted);
            setError(null);
        } catch (err: any) {
            setError(err.message);
            console.error('Failed to load books:', err);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'Publications', 'Books', 'Research'];

    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const filteredBooks = books.filter(book => {
        const authorsStr = Array.isArray(book.authors) ? book.authors.join(', ') : (book.authors || '');
        const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            authorsStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (book.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || (book.category && book.category.includes(selectedCategory));
        const matchesDate = !book.datePosted || new Date(book.datePosted) <= today;
        return matchesSearch && matchesCategory && matchesDate;
    });

    // Pagination logic
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBookClick = (bookId: string) => {
        window.location.href = `/press/books/${bookId}`;
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <BookOpen className="w-16 h-16 text-[#021d49] mx-auto mb-4 animate-pulse" />
                        <p className="text-gray-600">Loading books...</p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <BookOpen className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <p className="text-red-600 mb-2">Failed to load books</p>
                        <p className="text-gray-600 text-sm">{error}</p>
                        <button
                            onClick={loadBooks}
                            className="mt-4 px-6 py-2 bg-[#021d49] text-white rounded-lg hover:bg-[#021d49]"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="w-full bg-linear-to-br from-slate-50 via-white to-stone-50 min-h-screen">

                {/* Compact Dark Navy Hero Banner */}
                <section className="relative overflow-hidden bg-linear-to-br from-[#021d49] via-[#032a5e] to-[#021d49] text-white">
                    <div className="relative max-w-7xl mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h1 className="text-2xl lg:text-3xl font-bold leading-tight">ARIN Books</h1>
                                <p className="text-sm text-blue-100 mt-1">Explore our collection of research publications and books driving evidence-based policy and sustainable development across Africa</p>
                            </div>
                            <div className="w-full md:max-w-sm">
                                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-xl">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="text"
                                            placeholder="Search books and publications..."
                                            value={searchTerm}
                                            onChange={(e) => {
                                                setSearchTerm(e.target.value);
                                                setCurrentPage(1);
                                            }}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#021d49] focus:outline-none transition-all text-gray-800 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Slim Category Filter Bar */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                            <Filter className="w-4 h-4" />
                            <span>Filter by Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => {
                                        setSelectedCategory(category);
                                        setCurrentPage(1);
                                    }}
                                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === category
                                        ? 'bg-[#021d49] text-white shadow-sm'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Books Grid - 3 columns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentBooks.map((book) => {
                            const authorsDisplay = Array.isArray(book.authors)
                                ? book.authors.join(', ')
                                : (book.authors || 'Unknown Author');
                            const dateDisplay = book.datePosted
                                ? new Date(book.datePosted).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                                : 'Date not available';

                            return (
                                <div
                                    key={book._id || book.id}
                                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#021d49] cursor-pointer group flex flex-col"
                                    onClick={() => handleBookClick(book._id || book.id)}
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden shrink-0">
                                        {book.image ? (
                                            <>
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#021d49] to-[#032a5e]">
                                                <BookOpen className="w-16 h-16 text-white/20" />
                                            </div>
                                        )}
                                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                                            <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm text-[#021d49] font-bold text-xs uppercase tracking-wide rounded-lg shadow-lg">
                                                {book.category || 'Book'}
                                            </span>
                                            {book.embargoDate && new Date(book.embargoDate) > new Date() && (
                                                <span className="flex items-center gap-1 px-2.5 py-1 bg-orange-500 text-white font-bold text-xs rounded-lg shadow-lg">
                                                    <Lock className="w-3 h-3" /> Embargoed
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#021d49] transition-colors leading-tight mb-2">
                                            {book.title}
                                        </h3>

                                        {/* Authors */}
                                        <div className="flex items-start gap-2 mb-2">
                                            <Users className="w-4 h-4 text-[#021d49] shrink-0 mt-0.5" />
                                            <p className="text-sm text-gray-600 line-clamp-1">{authorsDisplay}</p>
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 mb-3 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4 text-[#021d49] shrink-0" />
                                            <span>{dateDisplay}</span>
                                        </div>

                                        {/* Description */}
                                        {book.description && (
                                            <div
                                                className="text-sm text-gray-600 leading-relaxed line-clamp-3 flex-1"
                                                dangerouslySetInnerHTML={{ __html: book.description }}
                                            />
                                        )}

                                        <div className="pt-4 mt-4 border-t border-gray-100">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleBookClick(book._id || book.id); }}
                                                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-[#021d49] to-[#032a5e] text-white font-semibold rounded-lg shadow-md text-sm"
                                            >
                                                View Details <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* No Results Message */}
                    {filteredBooks.length === 0 && (
                        <div className="text-center py-16">
                            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No books found</h3>
                            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredBooks.length > 0 && totalPages > 1 && (
                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`p-2 rounded-lg ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white border border-gray-300'} transition-all duration-200`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentPage === index + 1
                                        ? 'bg-linear-to-r from-[#021d49] to-[#032a5e] text-white shadow-md'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`p-2 rounded-lg ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#021d49] hover:text-white border border-gray-300'} transition-all duration-200`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Why Explore ARIN Publications Section */}
                <section className="max-w-7xl mx-auto px-6 pb-16 mt-12">
                    <div className="bg-linear-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-2xl p-10 text-white shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-center">Why Explore ARIN Publications?</h2>
                        <div className="grid md:grid-cols-3 gap-8 mb-8">
                            <div className="text-center">
                                <BookOpen className="w-10 h-10 text-blue-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Cutting-Edge Research</h3>
                                <p className="text-gray-300 text-sm">Access the latest research on climate, governance, and sustainable development</p>
                            </div>
                            <div className="text-center">
                                <Users className="w-10 h-10 text-blue-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Expert Insights</h3>
                                <p className="text-gray-300 text-sm">Learn from leading researchers and policy experts across Africa</p>
                            </div>
                            <div className="text-center">
                                <FileText className="w-10 h-10 text-blue-300 mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-2">Evidence-Based Policy</h3>
                                <p className="text-gray-300 text-sm">Discover research that shapes policy and drives real-world impact</p>
                            </div>
                        </div>
                        <p className="text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                            ARIN's publications represent years of collaborative research and expertise, providing valuable insights into Africa's most pressing challenges and opportunities for sustainable development.
                        </p>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default BooksPage;
