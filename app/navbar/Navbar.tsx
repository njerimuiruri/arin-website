"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(null);
    const [pathname, setPathname] = useState('/');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(null);

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
                { name: 'LAMA Platform', href: '/convening-platforms/lama' },
                { name: 'CAPCHA Platform', href: '/convening-platforms/capcha' },
                { name: 'Policy Dialogues', href: '/convening-platforms/policy-dialogues' },
                { name: 'Events', href: '/convening-platforms/events' },
                { name: 'Conferences', href: '/convening-platforms/conferences' },
                { name: 'Conference of the Parties', href: '/convening-platforms/cop' },
            ]
        },
        {
            name: 'ARIN Fellowship',
            href: '/fellowship',
            submenu: [
                { name: 'About Fellowship', href: '/fellowship/about' },
                { name: 'ARIN Fellows', href: '/fellowship/arin-fellows' },
                { name: 'Accountable Adaptation Fellows', href: '/fellowship/accountable-adaptation-fellows' },
                { name: 'SDG Fellows', href: '/fellowship/sdg-fellows' },
                { name: 'Summer School', href: '/fellowship/summer-school' },
                { name: 'Mini Grants', href: '/fellowship/mini-grants' },
                { name: 'Friday Reviews', href: '/fellowship/friday-reviews' },
                { name: 'NDC Fellowship', href: '/fellowship/ndc-fellowship' },
                { name: 'NDC Academy', href: '/fellowship/ndc-academy' },
            ]
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
        <nav className="w-full sticky top-0 z-50 backdrop-blur-xl bg-white/98 border-b border-gray-100 shadow-sm">
            <div className="max-w-[1600px] mx-auto px-6">
                <div className="flex items-center justify-between py-4">
                    {/* Logo with Organization Name */}
                    <a href="/" className="flex flex-col items-start gap-2.5 group transition-transform hover:scale-[1.02] duration-300">
                        <div className="relative">
                            <Image
                                src="/Arin.png"
                                alt="ARIN Logo"
                                width={150}
                                height={60}
                                priority
                                className="object-contain drop-shadow-sm"
                                quality={100}
                                style={{ imageRendering: 'crisp-edges' }}
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#021d49] font-bold text-[13px] tracking-[0.12em] uppercase leading-tight group-hover:text-blue-700 transition-colors">
                                Africa Research & Impact Network
                            </span>
                        </div>
                    </a>

                    {/* Navigation Menu */}
                    <div className="hidden lg:flex items-center flex-1 justify-center ml-8">
                        <ul className="flex items-center gap-7">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative group"
                                    onMouseEnter={() => setActiveMenu(index)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    <button
                                        className={`flex items-center gap-1 text-[15px] font-medium transition-all duration-200 py-2 ${isActive(item.href)
                                            ? 'text-[#021d49] font-semibold'
                                            : 'text-gray-700 hover:text-[#021d49]'
                                            }`}
                                    >
                                        {item.name}
                                        {item.submenu && (
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-300 ${activeMenu === index ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        )}
                                    </button>

                                    {/* Elegant underline indicator */}
                                    <div
                                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#021d49] to-blue-600 transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                                            }`}
                                    />

                                    {/* Dropdown Menu */}
                                    {item.submenu && activeMenu === index && (
                                        <div
                                            className={`absolute top-full pt-6 min-w-[600px] ${index >= menuItems.length - 2 ? 'right-0' : 'left-0'
                                                }`}
                                        >
                                            <div className="backdrop-blur-2xl bg-white/98 rounded-2xl shadow-2xl border border-gray-100 py-6 px-8 animate-fadeIn">
                                                <div
                                                    className={`grid gap-2 ${item.submenu.length > 10
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
                                                            className={`block px-4 py-3 text-[14px] transition-all duration-200 rounded-xl whitespace-nowrap group/item ${pathname === subItem.href
                                                                ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md'
                                                                : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 hover:text-[#021d49] font-normal'
                                                                }`}
                                                        >
                                                            <span className="flex items-center gap-2">
                                                                {pathname !== subItem.href && (
                                                                    <span className="w-0 h-0.5 bg-[#021d49] transition-all duration-300 group-hover/item:w-2" />
                                                                )}
                                                                {subItem.name}
                                                            </span>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}

                            {/* Contact Us Link */}
                            <li className="relative group">
                                <a
                                    href="/contact"
                                    className={`text-[15px] font-medium transition-all duration-200 py-2 block ${pathname === '/contact'
                                        ? 'text-[#021d49] font-semibold'
                                        : 'text-gray-700 hover:text-[#021d49]'
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

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <a
                            href="/join"
                            className="group relative px-6 py-2.5 bg-gradient-to-r from-[#021d49] to-blue-700 hover:from-[#021d49] hover:to-blue-800 text-white font-medium text-[15px] rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
                        >
                            <span className="relative z-10">Join Us</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-[#021d49] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-[#021d49] hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl animate-fadeIn">
                        <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
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
                                                className={`w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-200 ${isActive(item.href)
                                                    ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {item.name}
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform duration-300 ${mobileSubmenuOpen === index ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>
                                            {mobileSubmenuOpen === index && (
                                                <div className="ml-4 mt-2 space-y-1 animate-fadeIn">
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <a
                                                            key={subIndex}
                                                            href={subItem.href}
                                                            className={`block px-4 py-2.5 text-[14px] rounded-lg transition-all duration-200 ${pathname === subItem.href
                                                                ? 'bg-gradient-to-r from-[#021d49] to-blue-700 text-white font-medium shadow-md'
                                                                : 'text-gray-600 hover:bg-gray-50 hover:text-[#021d49]'
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className={`block px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-200 ${pathname === item.href
                                                ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50'
                                                : 'text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {item.name}
                                        </a>
                                    )}
                                </div>
                            ))}

                            {/* Mobile Contact Us */}
                            <a
                                href="/contact"
                                className={`block px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-200 ${pathname === '/contact'
                                    ? 'text-[#021d49] bg-gradient-to-r from-blue-50 to-gray-50'
                                    : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                Contact Us
                            </a>

                            {/* Mobile CTA Button */}
                            <a
                                href="/join"
                                className="block text-center px-6 py-3 bg-gradient-to-r from-[#021d49] to-blue-700 hover:from-[#021d49] hover:to-blue-800 text-white font-medium text-[15px] rounded-xl transition-all duration-300 shadow-lg mt-4"
                            >
                                Join Us
                            </a>
                        </div>
                    </div>
                )}
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
            `}</style>
        </nav>
    );
};

export default Navbar;