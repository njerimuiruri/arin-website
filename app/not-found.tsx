"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Search,
  ArrowLeft,
  BookOpen,
  Users,
  Globe,
  Briefcase,
  ChevronRight,
} from "lucide-react";

const quickLinks = [
  {
    label: "About ARIN",
    href: "/about-us/mission",
    icon: Users,
    description: "Learn about our mission & team",
  },
  {
    label: "Research Projects",
    href: "/programs/research-projects",
    icon: Search,
    description: "Explore our research portfolio",
  },
  {
    label: "ARIN Press",
    href: "/press/impact-stories",
    icon: BookOpen,
    description: "Publications, reports & stories",
  },
  {
    label: "Opportunities",
    href: "/opportunities/vacancies",
    icon: Briefcase,
    description: "Vacancies & CSR opportunities",
  },
  {
    label: "Events",
    href: "/convening-platforms/events",
    icon: Globe,
    description: "Conferences & policy dialogues",
  },
  {
    label: "Capacity Building",
    href: "/programs/capacity-building",
    icon: Users,
    description: "Training & fellowship programs",
  },
];

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#021d49] via-[#032a5e] to-[#021d49] flex flex-col">
      {/* Top bar */}
      <div className="w-full border-b border-white/10 px-6 py-4">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-white/80 font-semibold text-sm tracking-wide group-hover:text-white transition-colors">
            ARIN Africa
          </span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        {/* 404 Visual */}
        <div className="relative mb-8 select-none">
          <span className="text-[140px] md:text-[200px] font-black text-white/5 leading-none tracking-tighter">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                <Search className="w-9 h-9 text-white/60" />
              </div>
              <div className="text-5xl md:text-6xl font-black text-white tracking-tight">
                404
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="text-center mb-10 max-w-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Page Not Found
          </h1>
          <p className="text-blue-200/80 text-base leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or may have been
            moved. Let&apos;s get you back on track.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mb-14">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#021d49] font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 text-sm shadow-lg"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Quick links */}
        <div className="w-full max-w-3xl">
          <p className="text-center text-white/50 text-xs uppercase tracking-widest font-semibold mb-5">
            Explore ARIN
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickLinks.map(({ label, href, icon: Icon, description }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-center gap-3 bg-white/5 hover:bg-white/12 border border-white/10 hover:border-white/25 rounded-xl p-4 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
                  <Icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm leading-tight">
                    {label}
                  </p>
                  <p className="text-white/50 text-xs mt-0.5 truncate">
                    {description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/60 shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer strip */}
      <div className="border-t border-white/10 px-6 py-4 text-center">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} Africa Research & Impact Network · All
          rights reserved
        </p>
      </div>
    </div>
  );
}
