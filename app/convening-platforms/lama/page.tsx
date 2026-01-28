import React from 'react';
import { ArrowRight, Target, Users, Database, Wrench, MessageSquare, ExternalLink, Layers, TrendingUp, CheckCircle } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const LAMAPage = () => {
    const components = [
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: 'Interactive dashboard',
            description: 'The LAMA dashboard will serve as a central hub for data visualization, analysis, and interaction. It will incorporate local, sub-national, national, and global indicators related to adaptation, climate, and weather. The platform will facilitate comparative analysis, enabling the co-creation of metrics that align local aspirations with broader adaptation policies and investments. Additionally, the dashboard will showcase impact stories from LLA projects across the continent.'
        },
        {
            icon: <Database className="w-6 h-6" />,
            title: 'LLA Interventions Database',
            description: 'This component will house information on LLA projects and initiatives implemented across Africa. The database will enable the comparison of lessons learned from different interventions.'
        },
        {
            icon: <Wrench className="w-6 h-6" />,
            title: 'Tools and Framework Repository',
            description: 'The platform will provide access to a variety of tools and frameworks employed by different initiatives to assess progress and track indicators.'
        },
        {
            icon: <MessageSquare className="w-6 h-6" />,
            title: 'Stakeholder Engagement Platform',
            description: 'A comprehensive stakeholder database will be maintained, including individuals and organizations involved in adaptation at both project and policy levels. These stakeholders will form the LAMA Engagement Group, convening regularly to share insights on adaptation measurement. The expert group will synthesize these findings into knowledge products and advisories.'
        }
    ];

    const objectives = [
        {
            title: 'Capacity Building',
            description: 'Provide expert support to African countries and researchers to enhance their capacity in developing adaptation indicators that effectively capture local priorities in an inclusive manner.'
        },
        {
            title: 'Knowledge Sharing',
            description: 'Facilitate the sharing of experiences and best practices in adaptation measurement among various projects and initiatives operating at the local level.'
        },
        {
            title: 'Framework Development',
            description: 'Consolidate knowledge and priorities regarding adaptation metrics in Africa, aligning them with national and global frameworks such as National Adaptation Plans (NAPs), Nationally Determined Contributions (NDCs), the GGA, and the GST.'
        }
    ];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
                <div className="relative bg-gradient-to-r from-[#021d49] to-[#021d49] overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />

                    <div className="relative max-w-7xl mx-auto px-6 py-16">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Left Content */}
                            <div>
                                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                                    <CheckCircle className="w-5 h-5 text-white" />
                                    <span className="text-white text-sm font-semibold">An ARIN Convening Platform</span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                    <span className="text-[#021d49]">LAMA Platform</span>
                                </h1>

                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                                    Locally-Led Adaptation Metrics for Africa
                                </h2>

                                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                                    ARIN hosts a comprehensive convening platform dedicated to developing indicators that capture the effectiveness and inclusiveness of adaptation strategies at the community level across Africa.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="https://lama-phi.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-white text-[#021d49] hover:bg-gray-100 font-bold rounded-lg shadow-lg flex items-center gap-3 transition-all hover:shadow-xl"
                                    >
                                        <span>Explore LAMA Platform</span>
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                    <a
                                        href="https://lama-phi.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-bold rounded-lg border-2 border-white/30 flex items-center gap-3 transition-all"
                                    >
                                        <Layers className="w-5 h-5" />
                                        <span>View Dashboard</span>
                                    </a>
                                </div>
                            </div>

                            {/* Right Image */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#021d49]/20 to-transparent rounded-2xl"></div>
                                <img
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                                    alt="Community gathering under a tree in Africa - representing locally-led adaptation"
                                    className="rounded-2xl shadow-2xl w-full h-[400px] object-cover border-4 border-white/10"
                                />
                                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">Community Voices Matter</h3>
                                    <p className="text-sm text-gray-600">Inclusive dialogue for equitable climate solutions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ARIN Platform Announcement Banner with Animation */}
                <div className="bg-white border-b-4 border-[#021d49] shadow-lg relative overflow-hidden">
                    {/* Animated background pulse */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#021d49]/5 via-transparent to-[#021d49]/5 animate-pulse"></div>

                    <div className="max-w-7xl mx-auto px-6 py-8 relative">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-full flex items-center justify-center animate-bounce">
                                        <Layers className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">ARIN's LAMA Platform</h3>
                                        <p className="text-sm text-gray-600">Convening Stakeholders Across Africa</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed">
                                    The African Research and Impact Network (ARIN) has established the LAMA Platform as a dedicated convening space for stakeholders engaged in locally-led adaptation initiatives across the continent. This platform brings together researchers, policymakers, practitioners, and communities to collaboratively develop and share adaptation metrics, tools, and best practices.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-xl p-6 text-white relative">
                                {/* Animated corner indicator */}
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#021d49] rounded-full animate-ping"></div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#021d49] rounded-full"></div>

                                <h4 className="text-lg font-bold mb-4">Access the Full Platform</h4>
                                <p className="text-white/90 text-sm mb-4">
                                    Visit our comprehensive LAMA platform featuring interactive dashboards, databases, tools, and stakeholder engagement resources.
                                </p>

                                {/* Animated button with pointer */}
                                <div className="relative">
                                    <a
                                        href="https://lama-phi.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#021d49] hover:bg-[#3a8ba0] text-white font-bold rounded-lg transition-all hover:scale-105 hover:shadow-xl group"
                                    >
                                        <span className="relative">
                                            Visit LAMA Platform
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
                    {/* About Section */}
                    <section className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">
                                About Locally Led Adaptation Metrics for Africa{' '}
                                <span className="text-[#021d49]">(LAMA)</span>
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto italic">
                                Aim to develop indicators that capture the effectiveness and inclusiveness of adaptation strategies at the community level.
                            </p>
                        </div>
                    </section>

                    {/* Background Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Background</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    African communities are among the most severely impacted by climate change, with about 50% of its 1.5 billion vulnerable people relying on farming, a climatically sensitive sector, for their primary livelihood. Coping strategies include developing local adaptation actions supported by National Adaptation Plans of countries and partners.
                                </p>
                                <p>
                                    Global and national policies and strategies are keen to deploy locally led and inclusive adaptation (LLA) actions to combat vulnerabilities faced by these communities (GEF, 2011). The LLA approaches promote locally embedded climate action, including decision-making, technology adoption, financing, and actions tailored to specific vulnerabilities within communities (Soanes et al., 2017). During COP 26, Parties agreed to increase adaptation funding to US$50 billion annually, to scale up adaptation for the most vulnerable communities, including women and marginalized people.
                                </p>
                                <p>
                                    Despite growing interest in accelerating LLA, evidence on effective interventions, vulnerability-specific approaches, and investment opportunities remains scarce. This gap is primarily due to the absence of dedicated bottom-up indicators or community-led frameworks and metrics. Such tools are essential for: i) aligning the priorities of diverse social groups, particularly the vulnerable and marginalized, with policy and investment opportunities; ii) measuring and reporting the effectiveness of LLAs in addressing intersectional vulnerabilities; and iii) linking lessons learned to national adaptation plans, Nationally Determined Contributions (NDCs), and the Global Goal on Adaptation. Without a clear understanding of key indicators of local resilience, resources may be misallocated, hindering progress towards a more resilient future.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Rationale Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Rationale for LAMA Platform</h2>
                        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    While various frameworks exist for measuring adaptation, including those for business, development, and general LLA principles (such as the International Platform for Adaptation Metrics, or IPAM), these often adopt a broad, top-down approach. Such frameworks may lack the granular detail necessary to address specific vulnerabilities and resilience aspirations through targeted research and investments, or to strengthen local leadership. Although local context is crucial in any metrics framework, there is a compelling case for developing metrics that can aggregate local information to inform national and international priorities and evaluations. This is essential for bridging the gap between adaptation needs and investment.
                                </p>
                                <p>
                                    Africa currently hosts numerous adaptation interventions and projects, each with varying degrees of research and practice focus, including adaptation evaluation. These projects typically develop their own assessment and metrics frameworks, often limited in scope to the project's sector or type. As a result, evaluations are confined to the project period, and findings are rarely shared or integrated into broader national or international frameworks. Furthermore, these interventions and projects operate in isolation, hindered by geographical, linguistic, ethnic, sectoral, and disciplinary disparities, as well as the diverse range of environmental and climate challenges.
                                </p>
                                <p>
                                    Under the IDRC-funded Locally Led Adaptation Metrics for Africa (LAMA) project, ARIN proposes establishing a LAMA Platform. This platform will foster learning and consolidation of locally led adaptation indicators across Africa. By convening stakeholders engaged in LLA initiatives, the platform will facilitate the sharing of experiences, tools, and indicators, ultimately developing locally led and inclusive frameworks and data to inform the Global Goal on Adaptation (GGA) and the Global Stocktake (GST).
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Aim and Objectives */}
                    <section className="mb-16">
                        <div className="bg-gradient-to-br from-[#021d49] to-[#1a3a5c] rounded-2xl p-8 shadow-lg text-white mb-8">
                            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                                <Target className="w-8 h-8 text-[#021d49]" />
                                Aim and Objectives
                            </h2>
                            <p className="text-white/90 leading-relaxed text-lg">
                                The LAMA Platform aims to convene diverse stakeholders engaged in LLA initiatives across Africa, facilitating the exchange of experiences, tools, and indicators. The platform will consolidate locally led and inclusive frameworks and data to inform the Global Goal on Adaptation (GGA) and Global Stocktake (GST).
                            </p>
                        </div>

                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Specific Objectives:</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                            {objectives.map((objective, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{objective.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{objective.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Components Section */}
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Components of the LAMA Platform</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {components.map((component, index) => (
                                <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:border-[#021d49] transition-all group">
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-[#021d49] to-[#021d49] rounded-lg flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                                            {component.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#021d49] transition-colors">{component.title}</h3>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{component.description}</p>
                                    <a
                                        href="https://lama-phi.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-[#021d49] hover:text-[#021d49] font-semibold mt-4 transition-colors"
                                    >
                                        <span className="text-sm">Explore this component</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="bg-gradient-to-br from-[#021d49] via-[#1a3a5c] to-[#021d49] rounded-2xl p-12 shadow-2xl text-center">
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 bg-[#021d49] rounded-full flex items-center justify-center mx-auto mb-6">
                                <ExternalLink className="w-8 h-8 text-white" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Experience the Full LAMA Platform
                            </h2>
                            <p className="text-white/90 text-lg mb-8">
                                Access ARIN's comprehensive convening platform with interactive dashboards, intervention databases, tools repository, and stakeholder engagement resources for locally-led adaptation metrics across Africa.
                            </p>
                            <a
                                href="https://lama-phi.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[#021d49] hover:bg-gray-100 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all text-lg"
                            >
                                <span>Visit LAMA Platform</span>
                                <ArrowRight className="w-6 h-6" />
                            </a>
                        </div>
                    </section>
                </div>
            </div>
        </>

    );
};

export default LAMAPage;