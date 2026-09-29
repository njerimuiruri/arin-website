// Rendered per request so the daily hero rotation (and latest content) stays current.
export const dynamic = "force-dynamic";

import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import HeroSection from "./hero-section/page";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-black font-sans">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}
