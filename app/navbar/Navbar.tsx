"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [pathname, setPathname] = useState('/');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
                setMobileSubmenuOpen(null);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    const menuItems = [
        {
            name: 'About Us',
            href: '/about-us',
            submenu: [
                { name: "ARIN's Mission", href: '/about-us/mission' },
                { name: 'The Secretariat', href: '/about-us/secretariat' },
                { name: 'Focus Areas', href: '/about-us/focus-areas' },
            ]
        },
        {
            name: 'Programs',
            href: '/programs',
            submenu: [
                { name: 'Research Projects', href: '/programs/research-projects' },
                { name: 'Capacity Building', href: '/programs/capacity-building' },
            ]
        },
        {
            name: 'Convening Platforms',
            href: '/convening-platforms',
            submenu: [
                { name: 'LAMA Platform', href: 'https://lama-arin-africa.org/', external: true },
                { name: 'CAPCHA Platform', href: 'https://capcha-arin-africa.org/', external: true },
                { name: 'Policy Dialogues', href: '/convening-platforms/policy-dialogues' },
                { name: 'Events', href: '/convening-platforms/events' },
                { name: 'Conferences', href: '/convening-platforms/conferences' },
                { name: 'Conference of the Parties', href: '/convening-platforms/cop' },
            ]
        },
        {
            name: 'ARIN Fellowship',
            href: 'https://arin-fellowshiporg.org/',
            external: true
        },
        {
            name: 'Opportunities',
            href: '/opportunities',
            submenu: [
                { name: 'Vacancies', href: '/opportunities/vacancies' },
                { name: 'Corporate Social Responsibility', href: '/opportunities/csr' },
            ]
        },
        {
            name: 'ARIN Press',
            href: '/press',
            submenu: [
                { name: 'About ARIN Press', href: '/press/about' },
                { name: 'Publishing Academy', href: '/press/publishing-academy' },
                { name: 'Annual Reports', href: '/press/annual-reports' },
                { name: 'Books', href: '/press/books' },
                { name: 'Journal Articles', href: '/press/journal-articles' },
                { name: 'Policy Briefs', href: '/press/policy-briefs' },
                { name: 'News Briefs', href: '/press/news-briefs' },
                { name: 'Technical Reports', href: '/press/technical-reports' },
                { name: 'Newsletters', href: '/press/newsletters' },
                { name: 'Call for Book Chapters', href: '/press/call-for-chapters' },
                { name: 'Blog', href: '/press/blog' },
                { name: 'Working Paper Series', href: '/press/working-papers' },
                { name: 'Impact Stories', href: '/press/impact-stories' },
                { name: 'Photo Gallery', href: '/press/photo-gallery' },
                { name: 'Video Gallery', href: '/press/video-gallery' },
            ]
        },
    ];

    const isActive = (href) => {
        return pathname.startsWith(href);
    };

    return (
        <>
            <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white shadow-xl'
                : 'bg-white shadow-md'
                } border-b border-gray-200`}>
                <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6">
                    <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
                        {/* Logo - Better Aligned */}
                        <a
                            href="/"
                            className="flex items-center gap-3 group transition-transform hover:scale-[1.02] duration-300 flex-shrink-0 py-2"
                        >
                            <div className="relative flex-shrink-0">
                                <Image
                                    src="/Arin.png"
                                    alt="ARIN Logo"
                                    width={110}
                                    height={44}
                                    priority
                                    className="object-contain drop-shadow-sm w-[70px] sm:w-[80px] lg:w-[90px] xl:w-[100px] h-auto"
                                    quality={100}
                                    style={{ imageRendering: 'crisp-edges' }}
                                />
                            </div>
                            <span className="text-[#021d49] font-bold text-[10px] sm:text-[11px] lg:text-[12px] xl:text-[13px] tracking-[0.05em] uppercase leading-[1.2] group-hover:text-blue-700 transition-colors">
                                Africa Research &<br />Impact Network
                            </span>
                        </a>

                        {/* Desktop Navigation - Compact */}
                        <div className="hidden xl:flex items-center flex-1 justify-center ml-4">
                            <ul className="flex items-center gap-2 2xl:gap-4">
                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="relative group"
                                        onMouseEnter={() => item.submenu && setActiveMenu(index)}
                                        onMouseLeave={() => item.submenu && setActiveMenu(null)}
                                    >
                                        {item.submenu ? (
                                            <>
                                                <button
                                                    className={`flex items-center gap-0.5 text-[12px] 2xl:text-[13px] font-medium transition-all duration-200 py-1 px-2 rounded-lg whitespace-nowrap ${isActive(item.href)
                                                        ? 'text-[#021d49] font-semibold bg-blue-50'
                                                        : 'text-gray-700 hover:text-[#021d49] hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {item.name}
                                                    <ChevronDown
                                                        className={`w-3 h-3 transition-transform duration-300 ${activeMenu === index ? 'rotate-180' : ''
                                                            }`}
                                                    />
                                                </button>

                                                {/* Elegant underline indicator */}
                                                <div
                                                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#021d49] to-blue-600 transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                                        }`}
                                                />

                                                {/* Dropdown Menu */}
                                                {activeMenu === index && (
                                                    <div
                                                        className={`absolute top-full pt-4 min-w-[450px] 2xl:min-w-[500px] ${index >= menuItems.length - 2 ? 'right-0' : 'left-0'
                                                            }`}
                                                    >
                                                        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 py-3 px-4 2xl:py-4 2xl:px-5 animate-fadeIn">
                                                            <div
                                                                className={`grid gap-1 ${item.submenu.length > 10
                                                                    ? 'grid-cols-3'
                                                                    : item.submenu.length > 4
                                                                        ? 'grid-cols-2'
                                                                        : 'grid-cols-1'
                                                                    }`}
                                                            >
                                                                {item.submenu.map((subItem, subIndex) => (
                                                                    <a
                                                                        key={subIndex}
                                                                        href={subItem.href}
                                                                        target={subItem.external ? "_blank" : undefined}
                                                                        rel={subItem.external ? "noopener noreferrer" : undefined}
                                                                        className={`block px-3 py-2 text-[12px] 2xl:text-[13px] transition-all duration-200 rounded-lg whitespace-nowrap group/item ${pathname === subItem.href
                                                                            ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md'
                                                                            : 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-gray-50 hover:text-[#021d49] font-normal'
                                                                            }`}
                                                                    >
                                                                        <span className="flex items-center gap-1.5">
                                                                            {pathname !== subItem.href && (
                                                                                <span className="w-0 h-0.5 bg-[#021d49] transition-all duration-300 group-hover/item:w-1.5" />
                                                                            )}
                                                                            {subItem.name}
                                                                            {subItem.external && (
                                                                                <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                                </svg>
                                                                            )}
                                                                        </span>
                                                                    </a>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <a
                                                    href={item.href}
                                                    target={item.external ? "_blank" : undefined}
                                                    rel={item.external ? "noopener noreferrer" : undefined}
                                                    className={`flex items-center gap-0.5 text-[12px] 2xl:text-[13px] font-medium transition-all duration-200 py-1 px-2 rounded-lg whitespace-nowrap ${isActive(item.href)
                                                        ? 'text-[#021d49] font-semibold bg-blue-50'
                                                        : 'text-gray-700 hover:text-[#021d49] hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {item.name}
                                                    {item.external && (
                                                        <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    )}
                                                </a>

                                                {/* Elegant underline indicator */}
                                                <div
                                                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#021d49] to-blue-600 transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                                        }`}
                                                />
                                            </>
                                        )}
                                    </li>
                                ))}

                                {/* Contact Us Link */}
                                <li className="relative group">
                                    <a
                                        href="/contact"
                                        className={`text-[12px] 2xl:text-[13px] font-medium transition-all duration-200 py-1 px-2 rounded-lg block whitespace-nowrap ${pathname === '/contact'
                                            ? 'text-[#021d49] font-semibold bg-blue-50'
                                            : 'text-gray-700 hover:text-[#021d49] hover:bg-gray-50'
                                            }`}
                                    >
                                        Contact Us
                                    </a>
                                    <div
                                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#021d49] to-blue-600 transition-all duration-300 ${pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    />
                                </li>
                            </ul>
                        </div>

                        {/* CTA Button - Compact */}
                        <div className="hidden xl:block flex-shrink-0 ml-2">
                            <a
                                href="/join"
                                className="group relative px-4 py-1.5 2xl:px-5 2xl:py-2 bg-gradient-to-r from-[#021d49] to-blue-700 hover:from-[#021d49] hover:to-blue-800 text-white font-semibold text-[12px] 2xl:text-[13px] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg overflow-hidden inline-block"
                            >
                                <span className="relative z-10">Join Us</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#021d49] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="xl:hidden p-1.5 text-[#021d49] hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 touch-manipulation"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 xl:hidden animate-fadeIn"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu - Slide-in Panel */}
            <div
                className={`fixed top-[64px] sm:top-[72px] right-0 bottom-0 w-full sm:w-96 bg-white z-40 xl:hidden transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    } shadow-2xl`}
            >
                <div className="h-full overflow-y-auto overscroll-contain">
                    <div className="px-3 sm:px-4 py-4 sm:py-5 space-y-1.5">
                        {menuItems.map((item, index) => (
                            <div key={index}>
                                {item.submenu ? (
                                    <>
                                        <button
                                            onClick={() =>
                                                setMobileSubmenuOpen(
                                                    mobileSubmenuOpen === index ? null : index
                                                )
                                            }
                                            className={`w-full flex items-center justify-between px-3 py-2.5 text-[14px] sm:text-[15px] font-medium rounded-lg transition-all duration-200 touch-manipulation ${isActive(item.href)
                                                ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50'
                                                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                                                }`}
                                        >
                                            {item.name}
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen === index ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        </button>
                                        {mobileSubmenuOpen === index && (
                                            <div className="ml-2 mt-1 space-y-0.5 animate-fadeIn">
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <a
                                                        key={subIndex}
                                                        href={subItem.href}
                                                        target={subItem.external ? "_blank" : undefined}
                                                        rel={subItem.external ? "noopener noreferrer" : undefined}
                                                        className={`block px-3 py-2.5 text-[13px] sm:text-[14px] rounded-lg transition-all duration-200 touch-manipulation ${pathname === subItem.href
                                                            ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-[#021d49] active:bg-gray-100'
                                                            }`}
                                                    >
                                                        <span className="flex items-center gap-1.5">
                                                            {subItem.name}
                                                            {subItem.external && (
                                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            )}
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noopener noreferrer" : undefined}
                                        className={`block px-3 py-2.5 text-[14px] sm:text-[15px] font-medium rounded-lg transition-all duration-200 touch-manipulation ${pathname === item.href
                                            ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50'
                                            : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                                            }`}
                                    >
                                        <span className="flex items-center gap-1.5">
                                            {item.name}
                                            {item.external && (
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                            )}
                                        </span>
                                    </a>
                                )}
                            </div>
                        ))}

                        {/* Mobile Contact Us */}
                        <a
                            href="/contact"
                            className={`block px-3 py-2.5 text-[14px] sm:text-[15px] font-medium rounded-lg transition-all duration-200 touch-manipulation ${pathname === '/contact'
                                ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50'
                                : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
                                }`}
                        >
                            Contact Us
                        </a>

                        {/* Mobile CTA Button */}
                        <a
                            href="/join"
                            className="block text-center px-5 py-2.5 bg-gradient-to-r from-[#021d49] to-blue-700 hover:from-[#021d49] hover:to-blue-800 active:from-blue-900 active:to-[#021d49] text-white font-semibold text-[14px] sm:text-[15px] rounded-lg transition-all duration-300 shadow-lg mt-4 touch-manipulation"
                        >
                            Join Us
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                
                /* Smooth scrolling for mobile menu */
                .overscroll-contain {
                    overscroll-behavior: contain;
                }
                
                /* Custom scrollbar for mobile menu */
                .overflow-y-auto::-webkit-scrollbar {
                    width: 5px;
                }
                .overflow-y-auto::-webkit-scrollbar-track {
                    background: #f8f9fa;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb {
                    background: #cbd5e0;
                    border-radius: 3px;
                }
                .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                    background: #a0aec0;
                }
                
                /* Touch-friendly tap highlighting */
                .touch-manipulation {
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
                }

                /* Ensure smooth transitions on all devices */
                @media (prefers-reduced-motion: no-preference) {
                    * {
                        scroll-behavior: smooth;
                    }
                }
            `}</style>
        </>
    );
};

export default Navbar;