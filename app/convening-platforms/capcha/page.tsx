import React from 'react';
import { ArrowRight, Target, Users, Activity, BookOpen, Lightbulb, MessageSquare, ExternalLink, Shield, TrendingUp, Award } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const CAPCHAPage = () => {
    const activities = [
        {
            icon: <Lightbulb className="w-6 h-6" />,
            title: 'Research and Innovation',
            description: 'Africa is among the regions that is most affected by climate change; experiencing more frequent and severe extreme weather events, such as droughts, floods, and heat waves. These events exacerbate health issues by increasing the incidence of water-borne and vector-borne diseases, malnutrition, and respiratory problems. Many African countries have fragile health systems that struggle to cope with the additional burden of climate-related health impacts. Improved data collection and sharing are thus key for understanding the health impacts of climate change and facilitates the development effective interventions. CAPCHA will strive to centralize data from various sectors as well as promote joint research for informed decision-making.'
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: 'Policy and Advocacy',
            description: 'CAPCHA will serve as a unified platform to advocate for policies addressing the health impacts of climate change. It will create avenues to influence national and international climate policies, ensuring they incorporate health considerations and support the specific needs of African countries. The platform will also align health strategies with broader climate resilience efforts. Additionally, CAPCHA will provide opportunities for participation in international climate negotiations, advocating for Africa\'s health priorities and ensuring that global climate actions account for the continent\'s unique vulnerabilities.'
        },
        {
            icon: <Award className="w-6 h-6" />,
            title: 'Capacity Enhancement',
            description: 'Raising awareness about the health risks of climate change and engaging communities in adaptation and mitigation efforts are vital. CAPCHA will support educational campaigns and community-based initiatives while empowering local populations to take action. Integration of health in climate change courses in school curriculum will also be advocated for to guarantee that those who graduate from universities have the needed capacity to tackle transdisciplinary research in C &H.',
            methods: [
                'Summer schools',
                'Bootcamps',
                'Webinars',
                'Seminars/Workshops',
                'Short self-paced courses'
            ]
        }
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
                {/* Hero Section with Image */}
                <div className="relative bg-gradient-to-r from-[#021d49] to-[#46a1bb] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

                    <div className="relative max-w-7xl mx-auto px-6 py-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                                    <Shield className="w-5 h-5 text-white" />
                                    <span className="text-white text-sm font-semibold">An ARIN Consultative Platform</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                    Consultative Platform On{' '}
                                    <span className="text-[#46a1bb]">Climate And Health In</span>{' '}
                                    <span className="text-[#46a1bb]">Africa</span>
                                </h1>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    (CAPCHA)
                                </h2>

                                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                                    Building a transdisciplinary community of practice towards enhanced decision support environment on Climate and Health (C & H) research and policy in Africa
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://capcha-arin-africa.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-white text-[#021d49] hover:bg-gray-100 font-bold rounded-lg shadow-lg flex items-center gap-3 transition-all hover:shadow-xl"
                                    >
                                        <span>Explore CAPCHA Platform</span>
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://capcha-arin-africa.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-lg border-2 border-white/30 flex items-center gap-3 transition-all"
                                    >
                                        <Activity className="w-5 h-5" />
                                        <span>View Activities</span>
                                    </a>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#46a1bb]/20 to-transparent rounded-2xl"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                                    alt="Natural stream flowing through rocks and greenery - representing climate and health connection in Africa"
                                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover border-4 border-white/10"
                                />
                                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Transdisciplinary Collaboration</h3>
                                    <p className="text-sm text-gray-600">Nurturing science-policy engagements for resilient health systems</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ARIN Platform Announcement Banner with Animation */}
                <div className="bg-white border-b-4 border-[#46a1bb] shadow-lg relative overflow-hidden">
                    {/* Animated background pulse */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#46a1bb]/5 via-transparent to-[#46a1bb]/5 animate-pulse"></div>

                    <div className="max-w-7xl mx-auto px-6 py-8 relative">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-full flex items-center justify-center animate-bounce">
                                        <Shield className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">ARIN's CAPCHA Platform</h3>
                                        <p className="text-sm text-gray-600">Consultative Platform on Climate and Health in Africa</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    The African Research and Impact Network (ARIN) has established CAPCHA as a dedicated consultative platform bringing together researchers, policymakers, and practitioners to address climate and health challenges across Africa. The platform fosters transdisciplinary collaboration and advocates for resilient, low-carbon health systems.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-xl p-6 text-white relative">
                                {/* Animated corner indicator */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#46a1bb] rounded-full animate-ping"></div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#46a1bb] rounded-full"></div>

                                <h4 className="text-lg font-bold mb-4">Access the Full Platform</h4>
                                <p className="text-white/90 text-sm mb-4">
                                    Visit our comprehensive CAPCHA platform featuring stakeholder databases, research resources, policy briefs, and capacity enhancement programs.
                                </p>

                                {/* Animated button with pointer */}
                                <div className="relative">
                                    <a
                                        href="https://capcha-arin-africa.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#46a1bb] hover:bg-[#3a8ba0] text-white font-bold rounded-lg transition-all hover:scale-105 hover:shadow-xl group"
                                    >
                                        <span className="relative">
                                            Visit CAPCHA Platform
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
                                        </span>
                                        <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </a>

                                    {/* Animated click indicator */}
                                    <div className="absolute -right-12 top-1/2 -translate-y-1/2 hidden lg:block">
                                        <div className="relative">
                                            <div className="animate-bounce">
                                                <svg className="w-10 h-10 text-[#46a1bb]" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V11.5H19V8C19 7.44772 18.5523 7 18 7H13V20C13 20.5523 13.4477 21 14 21H18C18.5523 21 19 20.5523 19 20V17.5H21V20C21 21.6569 19.6569 23 18 23H14C12.3431 23 11 21.6569 11 20V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2Z" />
                                                </svg>
                                            </div>
                                            <div className="absolute top-0 left-0 animate-ping">
                                                <svg className="w-10 h-10 text-[#46a1bb] opacity-75" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.5 2C13.5 2.44425 13.3069 2.84339 13 3.11805V5H18C19.6569 5 21 6.34315 21 8V11.5H19V8C19 7.44772 18.5523 7 18 7H13V20C13 20.5523 13.4477 21 14 21H18C18.5523 21 19 20.5523 19 20V17.5H21V20C21 21.6569 19.6569 23 18 23H14C12.3431 23 11 21.6569 11 20V3.11805C10.6931 2.84339 10.5 2.44425 10.5 2C10.5 1.17157 11.1716 0.5 12 0.5C12.8284 0.5 13.5 1.17157 13.5 2Z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-[#46a1bb] mt-1 animate-pulse">Click here!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    {/* Vision and Mission */}
                    <section className="mb-16">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-2xl p-8 shadow-lg text-white">
                                <Target className="w-10 h-10 text-[#46a1bb] mb-4" />
                                <h2 className="text-2xl font-bold mb-4">Vision Statement</h2>
                                <p className="text-white/90 leading-relaxed text-lg">
                                    Building a transdisciplinary community of practice towards enhanced decision support environment on C & H research and policy in Africa
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-[#46a1bb] to-[#3a8ba0] rounded-2xl p-8 shadow-lg text-white">
                                <Activity className="w-10 h-10 text-white mb-4" />
                                <h2 className="text-2xl font-bold mb-4">Mission Statement</h2>
                                <p className="text-white/90 leading-relaxed text-lg">
                                    Nurturing transdisciplinary science-policy engagements towards advocating for resilient and low-carbon health systems.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Background Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Background</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Climate change is a global crisis with far-reaching implications for public health, and Africa stands out as a region particularly vulnerable to the adverse effects of extreme weather events linked to climate variability. This heightened susceptibility is exacerbated by an already strained healthcare system and the absence of robust early warning systems, factors partly attributed to the region's fragile socio-economic conditions. Despite being a region that is most susceptible to the health effects of climate change and variability, many African countries have failed to effectively adapt to climate change impacts due to lack of context-specific data to inform action. Advancing the climate and health agenda in Africa will, therefore, depend on how well the linkages between research, policy, and society are strengthened in addition to tackling existing inequalities in research. While research evidence has been identified to be key in furthering sustainable development in policy documents like the 2030 United Nations Agenda and the 2063 African Union Agenda, data generated from the Global North may fail to effectively foster the much-needed transformative change in Africa. Though data from the Global North may help inform researchers, policymakers, and communities on how to address C & H issues, they may not be context-relevant, and thus the need to support and augment the capacity of African researchers to enable them to produce context-specific data for action.
                                </p>
                                <p>
                                    At the moment, African countries appear to have national climate change policy and national adaptation plan documents that only alludes to C & H in barely a sentence. Regional adaptation plans for different countries, therefore, have to be co-developed to facilitate policy interventions. Besides, limited funding and inadequate capacity of C & H actors is also another impediment to the advancement of the climate and health agenda in Africa. The noticeable absence of climate change and health courses or fellowships offered within the various African regions further makes it difficult for interested stakeholders to access such courses and enhance their capacity. This inadequacy acts as an obstacle to the effective design and implementation of research and adaptation programs. Compounding the matter is the fact that climate change and health research are often compartmentalized across various disciplines, resulting in a fragmented landscape of specialized discussions. This compartmentalization hinders efforts to synthesize key findings aimed at identifying trends and gaps in the evidence.
                                </p>
                                <p>
                                    Urgent action is imperative if economies are to be decarbonized and more resilient health systems developed. This can be accomplished by providing contextualized evidence to support action, leading in climate advocacy and leadership, guiding sectors that significantly affect health through their actions, and assuming responsibility for climate resilience and the imperative to decarbonize healthcare systems. Transdisciplinary research and action agenda on climate change and health can help inform evidence given the human-environmental system problems being currently experienced by society. Considering the importance of collaboration in advancing the C & H agenda, key role players have to be identified and the process has to be intentional to guarantee that regional adaptation plans can be developed for different countries.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Rationale Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Rationale: Why A C & H Platform</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    The transformation needed to address the health impacts of climate change in Africa will demand innovative approaches of mobilizing resources, working jointly, and applying knowledge. To efficiently address the diverse C & H challenges as well as the varied needs and interests of actors in the different sectors, research must be effectively interlinked with policymaking, planning, and action. The co-generation of data across disciplines is one approach that can foster such transformations. By providing timely and policy-relevant research, researchers can support evidence-based decision-making and effective implementation of climate and health policies. This can be achieved by creating platforms and networks that bring together researchers, policy-makers, and practitioners from various disciplines and sectors. Such platforms facilitate knowledge exchange, sharing of best practices, and collaboration on research and policy development. The platforms can also be used to encourage regular communication channels such as meetings, conferences, and webinars to help foster dialogue and information sharing between different stakeholders. This ensures that C & H stakeholders are up-to-date with the latest research, policy updates, and field experiences. Information on the connection between climate and health will equally be provided on the platform as most people view them separately. This can be done by sharing evidence of how climate change can affect the health sector, and similarly how the health sector can get prepared and minimize the negative effects of climate change.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Distribution Maps Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Climate and Health Distribution Report in Africa</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <p className="text-gray-700 leading-relaxed mb-6">
                                The Climate and Health Stakeholder Distribution Database for Africa, a key outcome of the Consultation on Communities of Practice for Transdisciplinary Research and Action in Climate Change and Health in Africa project, funded by Wellcome. This comprehensive database maps out a diverse network of stakeholders engaged in climate and health initiatives across the continent.
                            </p>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                                    <img
                                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&q=80"
                                        alt="Map showing climate and health initiatives distribution across Africa"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                        <p className="text-white font-semibold text-sm">Mapped climate and health initiatives distribution</p>
                                    </div>
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                                    <img
                                        src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=400&q=80"
                                        alt="Geographical focus of mapped climate and health initiatives"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                        <p className="text-white font-semibold text-sm">Geographical focus of mapped initiatives</p>
                                    </div>
                                </div>
                                <div className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all group">
                                    <img
                                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80"
                                        alt="Sectoral focus of mapped climate and health initiatives"
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                        <p className="text-white font-semibold text-sm">Sectoral focus of mapped initiatives</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CAPCHA Activities */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">CAPCHA Activities</h2>
                        <div className="space-y-6">
                            {activities.map((activity, index) => (
                                <div key={index} className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:border-[#46a1bb] transition-all">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                                            {activity.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900">{activity.title}</h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4">{activity.description}</p>
                                    {activity.methods && (
                                        <div className="mt-4">
                                            <p className="font-semibold text-gray-900 mb-2">This will be done through:</p>
                                            <ul className="grid md:grid-cols-2 gap-2">
                                                {activity.methods.map((method, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-gray-700">
                                                        <div className="w-1.5 h-1.5 bg-[#46a1bb] rounded-full"></div>
                                                        {method}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Advisory Group */}
                    <section className="mb-16">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advisory Group</h2>
                            <p className="text-gray-600 text-lg">
                                CAPCHA is guided by a distinguished advisory group of 8 expert members providing strategic guidance and technical expertise from across Africa
                            </p>
                        </div>

                        {/* First Row - 4 Members */}
                        <div className="grid md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
                                        alt="Advisory Member 1"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-center">Advisory Member</h3>
                                    <p className="text-sm text-gray-600 text-center">Climate & Health Expert</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80"
                                        alt="Advisory Member 2"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-center">Advisory Member</h3>
                                    <p className="text-sm text-gray-600 text-center">Public Health Specialist</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                                        alt="Advisory Member 3"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-center">Advisory Member</h3>
                                    <p className="text-sm text-gray-600 text-center">Policy Advisor</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80"
                                        alt="Advisory Member 4"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-center">Advisory Member</h3>
                                    <p className="text-sm text-gray-600 text-center">Research Director</p>
                                </div>
                            </div>
                        </div>

                        {/* Second Row - 4 Members */}
                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80"
                                        alt="Advisory Member 5"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-center">Advisory Member</h3>
                                    <p className="text-sm text-gray-600 text-center">Environmental Scientist</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
                                        alt="Advisory Member 6"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-center">Advisory Member</h3>
                                    <p className="text-sm text-gray-600 text-center">Healthcare Policy Expert</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
                                        alt="Advisory Member 7"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-center">Advisory Member</h3>
                                    <p className="text-sm text-gray-600 text-center">Climate Adaptation Lead</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group">
                                <div className="aspect-square overflow-hidden bg-gray-100">
                                    <img
                                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80"
                                        alt="Advisory Member 8"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 text-center">Advisory Member</h3>
                                    <p className="text-sm text-gray-600 text-center">Health Systems Specialist</p>
                                </div>
                            </div>
                        </div>

                        {/* View Full Profiles Button */}
                        <div className="text-center mt-8">
                            <a
                                href="https://capcha-arin-africa.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#021d49] to-[#46a1bb] text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                <Users className="w-5 h-5" />
                                <span>View Full Advisory Members Profiles</span>
                                <ArrowRight className="w-5 h-5" />
                            </a>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gradient-to-br from-[#021d49] via-[#1a3a5c] to-[#021d49] rounded-2xl p-12 shadow-2xl text-center">
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-[#46a1bb] rounded-full flex items-center justify-center mx-auto mb-6">
                                <ExternalLink className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Experience the Full CAPCHA Platform
                            </h2>
                            <p className="text-white/90 text-lg mb-8">
                                Access ARIN's comprehensive consultative platform with stakeholder databases, climate and health reports, policy resources, and capacity enhancement programs across Africa.
                            </p>
                            <a
                                href="https://capcha-arin-africa.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#021d49] hover:bg-gray-100 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
                            >
                                <span>Visit CAPCHA Platform</span>
                                <ArrowRight className="w-6 h-6" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>

        </>

    );
};

export default CAPCHAPage;