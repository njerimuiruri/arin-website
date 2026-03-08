"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState<number | null>(null);
    const [pathname, setPathname] = useState('/');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState<number | null>(null);
    const [activeNestedMenu, setActiveNestedMenu] = useState<string | null>(null);
    const [mobileNestedOpen, setMobileNestedOpen] = useState<string | null>(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    useEffect(() => {
        if (activeMenu !== null) {
            const item = menuItems[activeMenu];
            if (item.submenu) {
                const firstSectionsIndex = item.submenu.findIndex(s => (s as { sections?: unknown }).sections);
                if (firstSectionsIndex >= 0) {
                    setActiveNestedMenu(`${activeMenu}-${firstSectionsIndex}`);
                }
            }
        } else {
            setActiveNestedMenu(null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeMenu]);

    const menuItems = [
        {
            name: 'Home',
            href: '/',
            // external: true
        },
        {
            name: 'About Us',
            href: '/about-us',
            submenu: [
                { name: "ARIN's Mission", href: '/about-us/mission' },
                { name: 'The Secretariat', href: '/about-us/secretariat' },
                {
                    name: 'Focus Areas', href: '/about-us/focus-areas',
                    sections: [
                        {
                            items: [
                                { name: 'Sustainable Development', href: '/about-us/focus-areas/sustainable-development' },
                                { name: 'Climate Change & Energy', href: '/about-us/focus-areas/climate-change-energy' },
                                { name: 'Cities & Resilience', href: '/about-us/focus-areas/cities-resilience' },
                                { name: 'Agriculture & Forestry', href: '/about-us/focus-areas/agriculture-forestry' },
                                { name: 'Mining, Trade & Industry', href: '/about-us/focus-areas/mining-trade-industry' },
                                { name: 'Technology & Innovation', href: '/about-us/focus-areas/technology-innovation' },
                                { name: 'Climate and Health', href: '/about-us/focus-areas/climate-health' },
                                { name: 'Forests & Ecosystems', href: '/about-us/focus-areas/forests-ecosystems' },
                            ]
                        }
                    ]
                },
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

    const isActive = (href: string) => {
        return pathname.startsWith(href);
    };

    return (
        <React.Fragment>
            <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-xl' : 'bg-white shadow-md'} border-b border-gray-200`}>
                <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6">
                    <div className="flex items-center justify-between h-20 sm:h-24 lg:h-28">

                        {/* Logo */}
                        <a
                            href="/"
                            className="flex items-center gap-3 group transition-transform hover:scale-[1.02] duration-300 flex-shrink-0 py-2"
                        >
                            <div className="relative flex-shrink-0">
                                <Image
                                    src="/Arin.png"
                                    alt="ARIN Logo"
                                    width={160}
                                    height={64}
                                    priority
                                    className="object-contain w-[100px] sm:w-[120px] lg:w-[140px] xl:w-[160px] h-auto"
                                    quality={100}
                                    style={{
                                        imageRendering: 'crisp-edges',
                                        filter: 'brightness(0) saturate(100%) invert(8%) sepia(64%) saturate(1800%) hue-rotate(202deg) brightness(85%) contrast(105%)'
                                    }}
                                />
                            </div>
                        </a>

                        {/* Desktop Navigation */}
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
                                            <React.Fragment>
                                                <button
                                                    className={`flex items-center gap-0.5 text-[12px] 2xl:text-[13px] font-medium transition-all duration-200 py-1 px-2 rounded-lg whitespace-nowrap ${isActive(item.href) ? 'text-[#021d49] font-semibold bg-blue-50' : 'text-gray-700 hover:text-[#021d49] hover:bg-gray-50'}`}
                                                >
                                                    {item.name}
                                                    <ChevronDown
                                                        className={`w-3 h-3 transition-transform duration-300 ${activeMenu === index ? 'rotate-180' : ''}`}
                                                    />
                                                </button>

                                                <div
                                                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#021d49] to-blue-600 transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                                />

                                                {activeMenu === index && (
                                                    <div className={`absolute top-full pt-4 min-w-[450px] 2xl:min-w-[500px] ${index >= menuItems.length - 2 ? 'right-0' : 'left-0'}`}>
                                                        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 py-3 px-4 2xl:py-4 2xl:px-5 animate-fadeIn">
                                                            {item.submenu.some(s => (s as { sections?: unknown }).sections) ? (
                                                                <div className="flex">
                                                                    {/* Left panel - menu items */}
                                                                    <div className="min-w-[160px] pr-3 border-r border-gray-100">
                                                                        {item.submenu.map((subItem, subIndex) => {
                                                                            const sub = subItem as { name: string; href: string; external?: boolean; sections?: { title: string; items: { name: string; href: string }[] }[] };
                                                                            const nestedKey = `${index}-${subIndex}`;
                                                                            if (sub.sections) {
                                                                                return (
                                                                                    <a
                                                                                        key={subIndex}
                                                                                        href={sub.href}
                                                                                        onMouseEnter={() => setActiveNestedMenu(nestedKey)}
                                                                                        className={`flex items-center justify-between px-3 py-2 text-[12px] 2xl:text-[13px] transition-all duration-200 rounded-lg whitespace-nowrap group/item ${activeNestedMenu === nestedKey || pathname.startsWith(sub.href) ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md' : 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-gray-50 hover:text-[#021d49] font-normal'}`}
                                                                                    >
                                                                                        <span className="flex items-center gap-1.5">
                                                                                            {activeNestedMenu !== nestedKey && !pathname.startsWith(sub.href) && (
                                                                                                <span className="w-0 h-0.5 bg-[#021d49] transition-all duration-300 group-hover/item:w-1.5" />
                                                                                            )}
                                                                                            {sub.name}
                                                                                        </span>
                                                                                        <ChevronRight className="w-3 h-3 ml-2 flex-shrink-0" />
                                                                                    </a>
                                                                                );
                                                                            }
                                                                            return (
                                                                                <a
                                                                                    key={subIndex}
                                                                                    href={sub.href}
                                                                                    target={sub.external ? "_blank" : undefined}
                                                                                    rel={sub.external ? "noopener noreferrer" : undefined}
                                                                                    onMouseEnter={() => setActiveNestedMenu(null)}
                                                                                    className={`block px-3 py-2 text-[12px] 2xl:text-[13px] transition-all duration-200 rounded-lg whitespace-nowrap group/item ${pathname === sub.href ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md' : 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-gray-50 hover:text-[#021d49] font-normal'}`}
                                                                                >
                                                                                    <span className="flex items-center gap-1.5">
                                                                                        {pathname !== sub.href && (
                                                                                            <span className="w-0 h-0.5 bg-[#021d49] transition-all duration-300 group-hover/item:w-1.5" />
                                                                                        )}
                                                                                        {sub.name}
                                                                                        {sub.external && (
                                                                                            <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                                            </svg>
                                                                                        )}
                                                                                    </span>
                                                                                </a>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                    {/* Right panel - sections content */}
                                                                    <div className="pl-3 flex-1 min-w-[240px]">
                                                                        {item.submenu.map((subItem, subIndex) => {
                                                                            const sub = subItem as { name: string; href: string; sections?: { title: string; items: { name: string; href: string }[] }[] };
                                                                            const nestedKey = `${index}-${subIndex}`;
                                                                            if (!sub.sections || activeNestedMenu !== nestedKey) return null;
                                                                            return (
                                                                                <div key={subIndex}>
                                                                                    {sub.sections.map((section, sectionIndex) => (
                                                                                        <div key={sectionIndex}>
                                                                                            <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#021d49] border-b border-gray-100 mb-2">
                                                                                                {section.title}
                                                                                            </div>
                                                                                            <div className="space-y-0.5">
                                                                                                {section.items.map((sectionItem, sectionItemIndex) => (
                                                                                                    <a
                                                                                                        key={sectionItemIndex}
                                                                                                        href={sectionItem.href}
                                                                                                        className={`block px-3 py-2 text-[12px] 2xl:text-[13px] transition-all duration-200 rounded-lg whitespace-nowrap group/nested ${pathname === sectionItem.href ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md' : 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-gray-50 hover:text-[#021d49] font-normal'}`}
                                                                                                    >
                                                                                                        <span className="flex items-center gap-1.5">
                                                                                                            {pathname !== sectionItem.href && (
                                                                                                                <span className="w-0 h-0.5 bg-[#021d49] transition-all duration-300 group-hover/nested:w-1.5" />
                                                                                                            )}
                                                                                                            {sectionItem.name}
                                                                                                        </span>
                                                                                                    </a>
                                                                                                ))}
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className={`grid gap-1 ${item.submenu.length > 10 ? 'grid-cols-3' : item.submenu.length > 4 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                                                    {item.submenu.map((subItem, subIndex) => {
                                                                        const sub = subItem as { name: string; href: string; external?: boolean };
                                                                        return (
                                                                            <a
                                                                                key={subIndex}
                                                                                href={sub.href}
                                                                                target={sub.external ? "_blank" : undefined}
                                                                                rel={sub.external ? "noopener noreferrer" : undefined}
                                                                                className={`block px-3 py-2 text-[12px] 2xl:text-[13px] transition-all duration-200 rounded-lg whitespace-nowrap group/item ${pathname === sub.href ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md' : 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-gray-50 hover:text-[#021d49] font-normal'}`}
                                                                            >
                                                                                <span className="flex items-center gap-1.5">
                                                                                    {pathname !== sub.href && (
                                                                                        <span className="w-0 h-0.5 bg-[#021d49] transition-all duration-300 group-hover/item:w-1.5" />
                                                                                    )}
                                                                                    {sub.name}
                                                                                    {sub.external && (
                                                                                        <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                                        </svg>
                                                                                    )}
                                                                                </span>
                                                                            </a>
                                                                        );
                                                                    })}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                <a
                                                    href={item.href}
                                                    target={item.external ? "_blank" : undefined}
                                                    rel={item.external ? "noopener noreferrer" : undefined}
                                                    className={`flex items-center gap-0.5 text-[12px] 2xl:text-[13px] font-medium transition-all duration-200 py-1 px-2 rounded-lg whitespace-nowrap ${isActive(item.href) ? 'text-[#021d49] font-semibold bg-blue-50' : 'text-gray-700 hover:text-[#021d49] hover:bg-gray-50'}`}
                                                >
                                                    {item.name}
                                                    {item.external && (
                                                        <svg className="w-2.5 h-2.5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                    )}
                                                </a>
                                                <div
                                                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#021d49] to-blue-600 transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                                />
                                            </React.Fragment>
                                        )}
                                    </li>
                                ))}

                                {/* Contact Us */}
                                <li className="relative group">
                                    <a
                                        href="/contact"
                                        className={`text-[12px] 2xl:text-[13px] font-medium transition-all duration-200 py-1 px-2 rounded-lg block whitespace-nowrap ${pathname === '/contact' ? 'text-[#021d49] font-semibold bg-blue-50' : 'text-gray-700 hover:text-[#021d49] hover:bg-gray-50'}`}
                                    >
                                        Contact Us
                                    </a>
                                    <div
                                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#021d49] to-blue-600 transition-all duration-300 ${pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}
                                    />
                                </li>
                            </ul>
                        </div>

                        {/* CTA Button */}
                        <div className="hidden xl:block flex-shrink-0 ml-2">
                            <a
                                href="/join"
                                className="px-4 py-1.5 2xl:px-5 2xl:py-2 bg-[#021d49] hover:bg-[#032a6b] text-white font-semibold text-[12px] 2xl:text-[13px] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg inline-block"
                            >
                                Join Us
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

            {/* Mobile Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 xl:hidden animate-fadeIn"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Slide-in Panel */}
            <div
                className={`fixed top-[80px] sm:top-[96px] right-0 bottom-0 w-full sm:w-96 bg-white z-40 xl:hidden transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}
            >
                <div className="h-full overflow-y-auto overscroll-contain">
                    <div className="px-3 sm:px-4 py-4 sm:py-5 space-y-1.5">
                        {menuItems.map((item, index) => (
                            <div key={index}>
                                {item.submenu ? (
                                    <React.Fragment>
                                        <button
                                            onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index)}
                                            className={`w-full flex items-center justify-between px-3 py-2.5 text-[14px] sm:text-[15px] font-medium rounded-lg transition-all duration-200 touch-manipulation ${isActive(item.href) ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50' : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'}`}
                                        >
                                            {item.name}
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen === index ? 'rotate-180' : ''}`}
                                            />
                                        </button>
                                        {mobileSubmenuOpen === index && (
                                            <div className="ml-2 mt-1 space-y-0.5 animate-fadeIn">
                                                {item.submenu.map((subItem, subIndex) => {
                                                    const sub = subItem as { name: string; href: string; external?: boolean; sections?: { title: string; items: { name: string; href: string }[] }[] };
                                                    const nestedKey = `${index}-${subIndex}`;
                                                    if (sub.sections) {
                                                        return (
                                                            <div key={subIndex}>
                                                                <div className={`flex items-center rounded-lg transition-all duration-200 ${pathname.startsWith(sub.href) ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50' : 'text-gray-700 hover:bg-gray-50'}`}>
                                                                    <a
                                                                        href={sub.href}
                                                                        className="flex-1 px-3 py-2.5 text-[13px] sm:text-[14px] touch-manipulation"
                                                                    >
                                                                        {sub.name}
                                                                    </a>
                                                                    <button
                                                                        onClick={() => setMobileNestedOpen(mobileNestedOpen === nestedKey ? null : nestedKey)}
                                                                        className="px-3 py-2.5 touch-manipulation"
                                                                        aria-label="Toggle submenu"
                                                                    >
                                                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${mobileNestedOpen === nestedKey ? 'rotate-180' : ''}`} />
                                                                    </button>
                                                                </div>
                                                                {mobileNestedOpen === nestedKey && (
                                                                    <div className="ml-3 mt-0.5 animate-fadeIn">
                                                                        {sub.sections.map((section, sectionIndex) => (
                                                                            <div key={sectionIndex}>
                                                                                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#021d49]">
                                                                                    {section.title}
                                                                                </div>
                                                                                <div className="space-y-0.5">
                                                                                    {section.items.map((sectionItem, sectionItemIndex) => (
                                                                                        <a
                                                                                            key={sectionItemIndex}
                                                                                            href={sectionItem.href}
                                                                                            className={`block px-3 py-2 text-[12px] sm:text-[13px] rounded-lg transition-all duration-200 touch-manipulation ${pathname === sectionItem.href ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md' : 'text-gray-700 hover:bg-gray-50 hover:text-[#021d49] active:bg-gray-100'}`}
                                                                                        >
                                                                                            {sectionItem.name}
                                                                                        </a>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    }
                                                    return (
                                                        <a
                                                            key={subIndex}
                                                            href={sub.href}
                                                            target={sub.external ? "_blank" : undefined}
                                                            rel={sub.external ? "noopener noreferrer" : undefined}
                                                            className={`block px-3 py-2.5 text-[13px] sm:text-[14px] rounded-lg transition-all duration-200 touch-manipulation ${pathname === sub.href ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md' : 'text-gray-700 hover:bg-gray-50 hover:text-[#021d49] active:bg-gray-100'}`}
                                                        >
                                                            <span className="flex items-center gap-1.5">
                                                                {sub.name}
                                                                {sub.external && (
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                    </svg>
                                                                )}
                                                            </span>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </React.Fragment>
                                ) : (
                                    <a
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noopener noreferrer" : undefined}
                                        className={`block px-3 py-2.5 text-[14px] sm:text-[15px] font-medium rounded-lg transition-all duration-200 touch-manipulation ${pathname === item.href ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50' : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'}`}
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
                            className={`block px-3 py-2.5 text-[14px] sm:text-[15px] font-medium rounded-lg transition-all duration-200 touch-manipulation ${pathname === '/contact' ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50' : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'}`}
                        >
                            Contact Us
                        </a>

                        {/* Mobile Join Us */}
                        <a
                            href="/join"
                            className="block text-center px-5 py-2.5 bg-[#021d49] hover:bg-[#032a6b] active:bg-[#010f2a] text-white font-semibold text-[14px] sm:text-[15px] rounded-lg transition-all duration-300 shadow-lg mt-4 touch-manipulation"
                        >
                            Join Us
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                .overscroll-contain {
                    overscroll-behavior: contain;
                }
                .overflow-y-auto::-webkit-scrollbar { width: 5px; }
                .overflow-y-auto::-webkit-scrollbar-track { background: #f8f9fa; }
                .overflow-y-auto::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 3px; }
                .overflow-y-auto::-webkit-scrollbar-thumb:hover { background: #a0aec0; }
                .touch-manipulation { -webkit-tap-highlight-color: rgba(0,0,0,0.1); }
                @media (prefers-reduced-motion: no-preference) { * { scroll-behavior: smooth; } }
            `}</style>
        </React.Fragment>
    );
};

export default Navbar;