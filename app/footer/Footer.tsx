"use client";
import React, { useEffect, useState } from 'react';
import { MapPin, Mail, Phone, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
    const [year, setYear] = useState<number | null>(null);

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="w-full bg-[#021d49] text-white mt-20">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* About ARIN */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold mb-4">ARIN</h3>
                        <p className="text-gray-300 leading-relaxed">
                            Africa Research and Impact Network - Empowering research and driving sustainable development across Africa.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                                <a href="tel:+254746130873" className="text-gray-300 hover:text-white transition-colors">
                                    +254 746 130 873
                                </a>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                                <a href="mailto:info@arin-africa.org" className="text-gray-300 hover:text-white transition-colors break-all">
                                    info@arin-africa.org
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold mb-4">Our Location</h3>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                            <address className="text-gray-300 not-italic leading-relaxed">
                                ACK Gardens House, Bishop Road,<br />
                                1st Ngong Ave, Upperhill,<br />
                                Nairobi, Kenya<br />
                                P.O Box 53358 - 00200
                            </address>
                        </div>
                    </div>


                </div>

                {/* Social Media Links */}
                <div className="mt-12 pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>

                        {/* <div className="flex gap-6 text-sm">
                            <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-gray-300 hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-300">
                        <p>
                            &copy; {year ? year : ''} ARIN. All rights reserved.
                        </p>
                        <p>
                            Proudly owned by <span className="font-semibold text-white">Africa Research and Impact Network</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;