"use client";

const FocusAreasSection = () => (
    <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                    Our Focus Areas
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
                    Among the areas that ARIN has pioneered path-breaking research, are climate
                    change, knowledge management, science technology, and innovation.
                </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    {/* Climate Change */}
                    <h3 className="text-xl font-bold mb-2">Climate Change</h3>
                    <p className="text-gray-100">Research and policy on climate adaptation, mitigation, and resilience for Africa's most vulnerable communities.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    {/* Mining & Trade */}
                    <h3 className="text-xl font-bold mb-2">Mining & Trade</h3>
                    <p className="text-gray-100">Promoting sustainable and transparent mineral resource management and trade practices.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    {/* Agriculture & Food Systems */}
                    <h3 className="text-xl font-bold mb-2">Agriculture & Food Systems</h3>
                    <p className="text-gray-100">Innovative solutions for food security, climate-smart agriculture, and rural livelihoods.</p>
                </div>
            </div>
            <div className="text-center">
                <a
                    href="/about-us/focus-areas"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                    Explore Our Work
                    <span className="inline-block w-5 h-5">→</span>
                </a>
            </div>
        </div>
    </section>
);

export default FocusAreasSection;
