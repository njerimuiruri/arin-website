"use client";

const PartnersSection = ({ partners }: { partners: any[] }) => (
    <section className="max-w-[1600px] mx-auto px-6 pb-20">
        <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-gray-600 text-lg">Working together to transform Africa's research landscape</p>
        </div>
        <div className="bg-white rounded-3xl p-12 shadow-xl border-2 border-stone-200">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 items-center">
                {partners.map((partner, index) => (
                    <div key={index} className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100 hover:scale-110">
                        <img src={partner.logo} alt={partner.name} className="max-h-16 w-auto" />
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default PartnersSection;
