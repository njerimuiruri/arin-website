import React from 'react';
import { ArrowRight, Target, Users, Award, BookOpen, DollarSign, GraduationCap, Calendar, ExternalLink, Globe, TrendingUp, Heart } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const ARINFellowshipPage = () => {
    const activities = [
        {
            icon: <BookOpen className="w-6 h-6" />,
            title: 'Summer School',
            description: 'Intensive learning program bringing together fellows for collaborative research training, capacity building, and networking opportunities.',
            link: 'https://arin-fellowshiporg.org/summer-school'
        },
        {
            icon: <DollarSign className="w-6 h-6" />,
            title: 'Mini grants',
            description: 'Financial support for fellows to conduct impactful research projects that address critical development challenges across Africa.',
            link: 'https://arin-fellowshiporg.org/mini-grants'
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: 'NDC Fellowship',
            description: 'Specialized fellowship program focused on building capacity for implementing Nationally Determined Contributions (NDCs) across African countries.',
            link: 'https://arin-fellowshiporg.org/ndc-fellowship'
        },
        {
            icon: <GraduationCap className="w-6 h-6" />,
            title: 'NDC Academy',
            description: 'Comprehensive training academy providing knowledge and skills for effective NDC implementation and climate action.',
            link: 'https://arin-fellowshiporg.org/ndc-academy'
        },
        {
            icon: <Calendar className="w-6 h-6" />,
            title: 'Friday Reviews',
            description: 'Regular peer learning sessions where fellows share research findings, discuss methodologies, and exchange best practices.',
            link: 'https://arin-fellowshiporg.org/friday-reviews'
        }
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
                {/* Hero Section */}
                <div className="relative bg-gradient-to-r from-[#021d49] to-[#021d49] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

                    <div className="relative max-w-7xl mx-auto px-6 py-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                                    <Award className="w-5 h-5 text-white" />
                                    <span className="text-white text-sm font-semibold">ARIN Fellowship Program</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                    ARIN{' '}
                                    <span className="text-[#021d49]">Fellowship</span>
                                </h1>

                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                    Africa Science-Policy Fellowship Programme
                                </h2>

                                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                                    Over 200 researchers from thirty-eight countries in Sub-Saharan Africa, working together to transform African research and policy impact.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://arin-fellowshiporg.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-white text-[#021d49] hover:bg-gray-100 font-bold rounded-lg shadow-lg flex items-center gap-3 transition-all hover:shadow-xl"
                                    >
                                        <span>Explore Fellowship Program</span>
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://arin-fellowshiporg.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-lg border-2 border-white/30 flex items-center gap-3 transition-all"
                                    >
                                        <Users className="w-5 h-5" />
                                        <span>Meet the Fellows</span>
                                    </a>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#021d49]/20 to-transparent rounded-2xl"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                                    alt="Group of diverse African researchers and fellows collaborating"
                                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover border-4 border-white/10"
                                />
                                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Empowering African Researchers</h3>
                                    <p className="text-sm text-gray-600">Building networks for research excellence and policy impact</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ARIN Fellowship Announcement Banner with Animation */}
                <div className="bg-white border-b-4 border-[#021d49] shadow-lg relative overflow-hidden">
                    {/* Animated background pulse */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#021d49]/5 via-transparent to-[#021d49]/5 animate-pulse"></div>

                    <div className="max-w-7xl mx-auto px-6 py-8 relative">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-full flex items-center justify-center animate-bounce">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">ARIN Fellowship Program</h3>
                                        <p className="text-sm text-gray-600">200+ Researchers | 38 African Countries</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    The African Research and Impact Network (ARIN) Fellowship Program brings together talented researchers and technocrats across Africa who have been undertaking research in various fields including natural resource management, climate change, agriculture, forestry, energy, water, and cities to leverage their knowledge and experiences in promoting research excellence and impact pathways.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-xl p-6 text-white relative">
                                {/* Animated corner indicator */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#021d49] rounded-full animate-ping"></div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#021d49] rounded-full"></div>

                                <h4 className="text-lg font-bold mb-4">Visit the Fellowship Portal</h4>
                                <p className="text-white/90 text-sm mb-4">
                                    Explore fellowship activities, meet our fellows, access resources, and learn about opportunities to join this transformative network.
                                </p>

                                {/* Animated button with pointer */}
                                <div className="relative">
                                    <a
                                        href="https://arin-fellowshiporg.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] hover:bg-[#3a8ba0] text-white font-bold rounded-lg transition-all hover:scale-105 hover:shadow-xl group"
                                    >
                                        <span className="relative">
                                            Visit Fellowship Portal
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                                        </span>
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>

                                    {/* Animated click indicator */}
                                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block">
                                        <div className="relative">
                                            <div className="animate-bounce">
                                                <svg className="w-10 h-10 text-[#021d49]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V11.5H19V8C19 7.44772 18.5523 7 18 7H13V20C13 20.5523 13.4477 21 14 21H18C18.5523 21 19 20.5523 19 20V17.5H21V20C21 21.6569 19.6569 23 18 23H14C12.3431 23 11 21.6569 11 20V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2Z" />
                                                </svg>
                                            </div>
                                            <div className="absolute top-0 left-0 animate-ping">
                                                <svg className="w-10 h-10 text-[#021d49] opacity-75" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V11.5H19V8C19 7.44772 18.5523 7 18 7H13V20C13 20.5523 13.4477 21 14 21H18C18.5523 21 19 20.5523 19 20V17.5H21V20C21 21.6569 19.6569 23 18 23H14C12.3431 23 11 21.6569 11 20V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-[#021d49] mt-1 animate-pulse">Click here!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    {/* Fellowship Activities - Top Section */}
                    <section className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fellowship Activities</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Explore our comprehensive range of programs and initiatives designed to support fellows in their research and policy impact journey
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activities.map((activity, index) => (
                                <a
                                    key={index}
                                    href={activity.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100 hover:border-[#021d49] transition-all group cursor-pointer hover:shadow-xl"
                                >
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-14 h-14 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {activity.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors mb-2">{activity.title}</h3>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mb-4">{activity.description}</p>
                                    <div className="inline-flex items-center gap-2 text-[#021d49] hover:text-[#021d49] font-semibold transition-colors">
                                        <span>Learn more</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="mb-16">
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
                                <p className="text-gray-600 text-sm">Fellows</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Globe className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">38</div>
                                <p className="text-gray-600 text-sm">African Countries</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <TrendingUp className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">Multiple</div>
                                <p className="text-gray-600 text-sm">Research Sectors</p>
                            </div>
                            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 text-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">Inclusive</div>
                                <p className="text-gray-600 text-sm">Equity & Diversity</p>
                            </div>
                        </div>
                    </section>

                    {/* About Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">About ARIN Fellowship</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Over the last decades, Africa has experienced intense research and policy activities in various sectors especially health, agriculture, energy, science and technology, and lately climate change among others. However, research in the continent remains uncoordinated, with little in-continent learning and poor networking among researchers. The continent lacks impact networks – i.e. dedicated platforms for bringing African researchers and policymakers to engage in periodic dialogue, learning, and capability building towards creating research and policy impact.
                                </p>
                                <p>
                                    Consequently, there is little understanding of best research practices and impact practices taking place in various African contexts and what works or not. It is in this context that the ARIN Network launched the ARIN Fellowship program which brings together over 200 researchers from thirty-eight countries in Sub- Saharan Africa. The fellowship program consists of a network of talented researchers and technocrats across Africa who have been undertaking research in various fields including natural resource management, climate change, agriculture, forestry, energy, water, and cities to leverage their knowledge and experiences in promoting research excellence and impact pathways.
                                </p>
                                <p>
                                    The program is focused on peer learning and sharing good transformative research and impact practices across Africa. The ARIN Fellowship program therefore, seeks to identify, and leverage key research talents to flexibly and innovatively contribute to Africa's research transformation. Additionally, the fellowship program champions inclusion and equity throughout its activities and has largely accommodated and actively involved women and girls, people with disabilities, youth, and several other researchers from the most vulnerable communities in Africa.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Leadership Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Fellowship Leadership</h2>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80"
                                        alt="Akinyi J. Eurallyah - ARIN Fellowship Manager"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Akinyi J. Eurallyah</h3>
                                    <p className="text-[#021d49] font-semibold mb-3">ARIN Fellowship Manager</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">Leading the strategic direction and overall management of the fellowship program</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&q=80"
                                        alt="Atieno Lavender Ochieng - ARIN Fellowship Coordinator"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Atieno Lavender Ochieng</h3>
                                    <p className="text-[#021d49] font-semibold mb-3">ARIN Fellowship Coordinator</p>
                                    <p className="text-gray-600 text-sm leading-relaxed">Coordinating fellowship activities and ensuring smooth program operations</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Vision and Mission */}
                    <section className="mb-16">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-2xl p-8 shadow-lg text-white">
                                <Target className="w-10 h-10 text-[#021d49] mb-4" />
                                <h2 className="text-2xl font-bold mb-4">Mission of ARIN Fellowship</h2>
                                <p className="text-white/90 leading-relaxed">
                                    The ARIN Africa Science-Policy Fellowship Programme seeks to identify and leverage on evidence to flexibly and innovatively contribute to Africa's research transformation, policy analysis and capacity building.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-[#021d49] to-[#3a8ba0] rounded-2xl p-8 shadow-lg text-white">
                                <Award className="w-10 h-10 text-white mb-4" />
                                <h2 className="text-2xl font-bold mb-4">Vision of ARIN Fellowship</h2>
                                <p className="text-white/90 leading-relaxed">
                                    The ARIN Africa Science-Policy Fellowship Program envisions a future where scientific advancements are seamlessly integrated into public policy to address Africa's most pressing development challenges. We aim to cultivate a diverse cadre of emerging leaders who are adept at bridging the gap between scientific research and policy-making.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <p className="text-gray-700 leading-relaxed">
                                By equipping our fellows with the skills to translate complex scientific knowledge and empirically grounded research into actionable policy recommendations, we strive to foster evidence-based decision-making that drives innovation, equity, and sustainable development in Africa. Our program seeks to inspire a new generation of policy influencers who will champion the role of science in shaping a better world. We are committed to creating an inclusive and dynamic learning environment that empowers our fellows to lead with integrity, collaborate across disciplines, and advocate for policies that promote the common good. Through this fellowship program, we aspire to build a future where science and policy work hand-in-hand to create lasting, positive impacts on global health, environmental sustainability, and societal progress.
                            </p>
                        </div>
                    </section>

                    {/* Fellowship Activities */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Fellows</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Our fellowship program comprises three main cohorts of talented researchers and practitioners working across various sectors in Africa.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6">
                            <a
                                href="https://arin-fellowshiporg.org/fellows/arin"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center text-white">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Users className="w-10 h-10 text-[#021d49]" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#021d49] transition-colors">ARIN Fellows</h3>
                                    <p className="text-white/80 mb-4 leading-relaxed">
                                        Our core fellowship cohort bringing together researchers across multiple sectors in Sub-Saharan Africa.
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-[#021d49] font-semibold mt-auto">
                                        <span>View Fellows</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </a>

                            <a
                                href="https://arin-fellowshiporg.org/fellows/accountable-adaptation"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-br from-[#021d49] to-[#3a8ba0] rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center text-white">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Target className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#021d49] transition-colors">Accountable Adaptation</h3>
                                    <p className="text-white/80 mb-4 leading-relaxed">
                                        Fellows focused on ensuring accountability and transparency in climate adaptation initiatives.
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-white font-semibold mt-auto">
                                        <span>View Fellows</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </a>

                            <a
                                href="https://arin-fellowshiporg.org/fellows/sdg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-br from-[#1a3a5c] to-[#021d49] rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all group cursor-pointer"
                            >
                                <div className="flex flex-col items-center text-center text-white">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Globe className="w-10 h-10 text-[#021d49]" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#021d49] transition-colors">SDG Fellows</h3>
                                    <p className="text-white/80 mb-4 leading-relaxed">
                                        Fellows working on achieving the Sustainable Development Goals across African contexts.
                                    </p>
                                    <div className="inline-flex items-center gap-2 text-[#021d49] font-semibold mt-auto">
                                        <span>View Fellows</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </a>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gradient-to-br from-[#021d49] via-[#1a3a5c] to-[#021d49] rounded-2xl p-12 shadow-2xl text-center">
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-[#021d49] rounded-full flex items-center justify-center mx-auto mb-6">
                                <ExternalLink className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Join the ARIN Fellowship Community
                            </h2>
                            <p className="text-white/90 text-lg mb-8">
                                Explore fellowship opportunities, connect with researchers across Africa, and be part of a transformative network driving research excellence and policy impact across the continent.
                            </p>
                            <a
                                href="https://arin-fellowshiporg.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#021d49] hover:bg-gray-100 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
                            >
                                <span>Visit Fellowship Portal</span>
                                <ArrowRight className="w-6 h-6" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

        </>

    );
};

export default ARINFellowshipPage;