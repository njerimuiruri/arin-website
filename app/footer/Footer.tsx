
"use client";
import React, { useEffect, useState } from 'react';

const Footer: React.FC = () => {
    const [year, setYear] = useState<number | null>(null);
    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);
    return (
        <footer className="w-full bg-zinc-900 text-white py-8 px-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-sm">&copy; {year ? year : ''} ARIN. All rights reserved.</div>
                <div className="flex gap-4 text-sm">
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                    <a href="/terms" className="hover:underline">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
