import Image from "next/image";

export default function StrategicPlanSection() {
    return (
        <section className="w-full py-10 px-4 bg-white">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-teal-600 border border-teal-200 rounded-full px-4 py-1 mb-4">
                        Strategic Direction
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a2e]">
                        ARIN Strategic Plan 2026–2030
                    </h2>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                    <Image
                        src="/images/strategicplan.jpeg"
                        alt="ARIN Strategic Plan 2026–2030"
                        width={1200}
                        height={800}
                        className="w-full h-auto object-contain"
                        priority={false}
                    />
                </div>
            </div>
        </section>
    );
}
