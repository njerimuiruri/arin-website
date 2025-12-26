"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
                { name: 'COP', href: '/convening-platforms/cop' },
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
        <nav className="w-full sticky top-0 z-50 backdrop-blur-lg bg-white/95 border-b border-gray-200">
            <div className="max-w-[1600px] mx-auto px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="/" className="flex items-center">
                        <div className="text-[32px] font-bold text-[#021d49] tracking-tight">
                            ARIN
                        </div>
                    </a>

                    {/* Navigation Menu */}
                    <div className="hidden lg:flex items-center flex-1 justify-center">
                        <ul className="flex items-center gap-8">
                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="relative group"
                                    onMouseEnter={() => setActiveMenu(index)}
                                    onMouseLeave={() => setActiveMenu(null)}
                                >
                                    <button
                                        className={`flex items-center gap-1 text-[15px] font-medium transition-colors py-2 ${isActive(item.href)
                                            ? 'text-[#46a1bb]'
                                            : 'text-[#021d49] hover:text-[#46a1bb]'
                                            }`}
                                    >
                                        {item.name}
                                        {item.submenu && (
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === index ? 'rotate-180' : ''
                                                    }`}
                                            />
                                        )}
                                    </button>

                                    {/* Dropdown Menu */}
                                    {item.submenu && activeMenu === index && (
                                        <div className={`absolute top-full pt-4 min-w-[600px] ${index >= menuItems.length - 2 ? 'right-0' : 'left-0'
                                            }`}>
                                            <div className="backdrop-blur-xl bg-white/98 rounded-xl shadow-2xl border border-gray-100 py-8 px-10">
                                                <div className={`grid gap-3 ${item.submenu.length > 10 ? 'grid-cols-3' :
                                                    item.submenu.length > 4 ? 'grid-cols-2' :
                                                        'grid-cols-1'
                                                    }`}>
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <a
                                                            key={subIndex}
                                                            href={subItem.href}
                                                            className={`block px-5 py-3 text-[15px] transition-all rounded-lg whitespace-nowrap ${pathname === subItem.href
                                                                ? 'bg-[#46a1bb] text-white font-medium'
                                                                : 'text-[#021d49] hover:bg-[#46a1bb]/10 hover:text-[#46a1bb] font-normal'
                                                                }`}
                                                        >
                                                            {subItem.name}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}

                            {/* Contact Us Link */}
                            <li>
                                <a
                                    href="/contact"
                                    className={`text-[15px] font-medium transition-colors ${pathname === '/contact'
                                        ? 'text-[#46a1bb]'
                                        : 'text-[#021d49] hover:text-[#46a1bb]'
                                        }`}
                                >
                                    Contact Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <a
                            href="/join"
                            className="px-6 py-2.5 bg-[#46a1bb] hover:bg-[#021d49] text-white font-medium text-[15px] rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Join Us
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-[#021d49]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
                            {menuItems.map((item, index) => (
                                <div key={index}>
                                    {item.submenu ? (
                                        <>
                                            <button
                                                onClick={() => setMobileSubmenuOpen(mobileSubmenuOpen === index ? null : index)}
                                                className={`w-full flex items-center justify-between px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${isActive(item.href) ? 'text-[#46a1bb] bg-[#46a1bb]/10' : 'text-[#021d49] hover:bg-gray-50'
                                                    }`}
                                            >
                                                {item.name}
                                                <ChevronDown
                                                    className={`w-4 h-4 transition-transform duration-200 ${mobileSubmenuOpen === index ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>
                                            {mobileSubmenuOpen === index && (
                                                <div className="ml-4 mt-2 space-y-1">
                                                    {item.submenu.map((subItem, subIndex) => (
                                                        <a
                                                            key={subIndex}
                                                            href={subItem.href}
                                                            className={`block px-4 py-2.5 text-[14px] rounded-lg transition-colors ${pathname === subItem.href
                                                                ? 'bg-[#46a1bb] text-white font-medium'
                                                                : 'text-[#021d49] hover:bg-[#46a1bb]/10 hover:text-[#46a1bb]'
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
                                            className={`block px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${pathname === item.href ? 'text-[#46a1bb] bg-[#46a1bb]/10' : 'text-[#021d49] hover:bg-gray-50'
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
                                className={`block px-4 py-3 text-[15px] font-medium rounded-lg transition-colors ${pathname === '/contact' ? 'text-[#46a1bb] bg-[#46a1bb]/10' : 'text-[#021d49] hover:bg-gray-50'
                                    }`}
                            >
                                Contact Us
                            </a>

                            {/* Mobile CTA Button */}
                            <a
                                href="/join"
                                className="block text-center px-6 py-3 bg-[#46a1bb] hover:bg-[#021d49] text-white font-medium text-[15px] rounded-lg transition-all duration-300 shadow-md mt-4"
                            >
                                Join Us
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;