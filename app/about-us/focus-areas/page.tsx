"use client";
import React from 'react';
import { ArrowRight, Users, BookOpen, TrendingUp, Globe, Lightbulb, Award, Target, Layers, Zap, Factory, Leaf, Droplet, Wind, TreePine, Building2, Cpu, Shield, Sprout, Calendar } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';

const ARINFocusAreasPage = () => {
    const focusAreas = [
        {
            title: "Sustainable Development",
            icon: Globe,
            color: "from-[#46a1bb] to-[#021d49]",
            gradient: "from-white to-blue-50",
            border: "border-[#46a1bb]/30 hover:border-[#46a1bb]",
            category: "Africa Sustainability Hub"
        },
        {
            title: "Climate Change and Energy",
            icon: Wind,
            color: "from-green-500 to-emerald-600",
            gradient: "from-white to-green-50",
            border: "border-green-200 hover:border-green-400",
            category: "Environmental Action"
        },
        {
            title: "Agriculture and Forestry",
            icon: Sprout,
            color: "from-lime-500 to-green-600",
            gradient: "from-white to-lime-50",
            border: "border-lime-200 hover:border-lime-400",
            category: "Food Security"
        },
        {
            title: "Cities and Resilience",
            icon: Building2,
            color: "from-purple-500 to-pink-600",
            gradient: "from-white to-purple-50",
            border: "border-purple-200 hover:border-purple-400",
            category: "Urban Development"
        },
        {
            title: "Mining, Trade and Industry",
            icon: Factory,
            color: "from-amber-500 to-orange-600",
            gradient: "from-white to-amber-50",
            border: "border-amber-200 hover:border-amber-400",
            category: "Economic Development"
        },
        {
            title: "Technology and Innovation",
            icon: Cpu,
            color: "from-indigo-500 to-blue-600",
            gradient: "from-white to-indigo-50",
            border: "border-indigo-200 hover:border-indigo-400",
            category: "Digital Transformation"
        }
    ];

    return (

        <>
            <Navbar />

            <div className="w-full bg-gradient-to-br from-slate-50 via-white to-stone-50">
                {/* Hero Section */}
                <section className="max-w-[1600px] mx-auto px-6 py-20">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md border border-stone-200 mb-8">
                            <span className="text-[#46a1bb] text-xl">★</span>
                            <span className="text-sm text-gray-700 font-semibold">
                                Thematic Disciplines
                            </span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8">
                            Focus{' '}
                            <span className="bg-gradient-to-r from-[#46a1bb] to-[#021d49] bg-clip-text text-transparent">Areas</span>
                        </h1>

                        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                            Exploring pathways to sustainable development through strategic research across key thematic areas
                        </p>
                    </div>

                    {/* Focus Areas Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {focusAreas.map((area, index) => {
                            const Icon = area.icon;
                            return (
                                <div key={index} className={`group bg-gradient-to-br ${area.gradient} rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${area.border} hover:-translate-y-2`}>
                                    <div className={`w-20 h-20 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                        <Icon className="w-10 h-10 text-white" />
                                    </div>
                                    <span className="inline-block px-4 py-2 bg-white/80 text-gray-700 text-xs font-bold rounded-full mb-4 border border-stone-200">
                                        {area.category}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {area.title}
                                    </h3>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Sustainable Development Section */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-[#021d49] via-gray-900 to-[#021d49] rounded-3xl p-12 lg:p-16 text-white shadow-2xl">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-[#46a1bb] to-[#021d49] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Globe className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                                    Sustainable Development - Africa Sustainability Hub
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                            <p>
                                Since the 1992 Conference on Environment and Development, Africa has committed to steer its growth towards a sustainable path. The continent actively pursued Millennium Development Goals of 2000 with the main aim of eradicating poverty. In 2001, African heads of state launched the New Partnership for Africa's Development (NEPAD) to provide a framework for sustainable development to be shared by all Africa's people, emphasizing the role of partnerships among African countries and the international community.
                            </p>
                            <p>
                                However, Africa's performance in the pursuit of the MDGs was relatively low compared to other developing regions. The United Nations Sustainable Development Goals launched in 2015 provide a renewed hope for the continent to learn lessons and undertake strategic actions in line with set targets. This area of work aims to provide research evidence on pathways to sustainable development including social, technical and environmental pathways to sustainability. Activities under this theme builds on the strategic research under the Africa Sustainability Hub
                            </p>
                        </div>
                    </div>
                </section>

                {/* Climate Change and Energy */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-white to-green-50 rounded-3xl p-12 lg:p-16 shadow-2xl border-2 border-green-200">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Wind className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    Climate change and Energy
                                </h2>
                                <span className="inline-block px-4 py-2 bg-green-100 text-green-800 text-sm font-bold rounded-full">
                                    Environmental Action
                                </span>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10">
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    Climate change is recognised as one of the threats that drags Africa's effort to alleviate poverty. According to the Intergovernmental Panel on Climate Change (IPCC) reports, Africa is among the most vulnerable continents to climate change. The factors that make Africa vulnerable to climate change include weak adaptive capacity, evolving energy system, high dependency on ecosystem based goods for livelihoods and majorly rain-fed agriculture. Projections by the United Nations Environment Programme (UNEP)estimate that climate change will lead to an equivalent of 2 percent to 4 percent annual loss in GDP in Africa by 2040.
                                </p>
                                <p>
                                    African countries have initiated climate actions by submitting intended Nationally Determined Contributions (INDCs) under the Paris Agreement, which each country is expected to reduce national emissions and adapt to the impacts of climate change. So far, out of 54 IDNCs, 40 African countries have submitted Nationally Determined Contributions (NDCs).
                                </p>
                                <p>
                                    The implementation of the sustainable energy for all initiative (SEforALL) to support sectors of economies to cut emissions and facilitate adaptation of the communities requires concerted efforts by all relevant agencies and experts.
                                </p>
                            </div>

                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    This work area aims to catalyse the achievement of climate change commitments by the African countries through research evidence on low-carbon technologies, policy dialogue, and long-term sustainable capacity building initiatives aimed at creating climate research and policy champions in the continent.
                                </p>
                                <p>
                                    Our work on energy focuses on the role of clean energy for all as catalyst for poverty alleviation and climate action. Here we present research on sustainable options that enhance access to clean energy, including solar, wind, and biomass technologies.
                                </p>
                                <p>
                                    We also identify the main barriers that prevent African countries from adopting these technologies and provide evidence-based recommendations that make it feasible and affordable for them to implement.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
                                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <Target className="w-7 h-7 text-green-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">40/54</p>
                                <p className="text-sm text-gray-600">African countries submitted NDCs</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
                                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <TrendingUp className="w-7 h-7 text-green-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">2-4%</p>
                                <p className="text-sm text-gray-600">Projected GDP loss by 2040</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-100">
                                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                                    <Zap className="w-7 h-7 text-green-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">SEforALL</p>
                                <p className="text-sm text-gray-600">Sustainable Energy Initiative</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Agriculture and Forestry */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-white to-lime-50 rounded-3xl p-12 lg:p-16 shadow-2xl border-2 border-lime-200">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-lime-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Sprout className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    Agriculture and Forestry
                                </h2>
                                <span className="inline-block px-4 py-2 bg-lime-100 text-lime-800 text-sm font-bold rounded-full">
                                    Food Security
                                </span>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10 mb-12">
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    Agriculture contributes directly and indirectly to climate change rendering farmers among the most vulnerable in Africa. Africa' economy is majorly dependant on agriculture, which highly rainfed hence among the most vulnerable areas to climate impacts. Approximately, 60% of Africa' trade and jobs respectively are derived from agricultural. Agricultural practices have impacted on the forestry in Africa. The indigenous agricultural practices like 'slash and burn' and mechanization have continually contributed to the destruction of forests as creation for more land for intense crop and livestock increase in order to produce more for the increasing population in
                                </p>
                                <p>
                                    Africa and international markets. Africa through the African Union (AU) adopted various declarations to reduce hunger in the continent. The AU' Malabo Declaration adopted in 2014, include commitment to end hunger by 2025, reduce poverty through inclusive agricultural transformation agenda, and enhance resilience of livelihoods and production systems.
                                </p>
                            </div>

                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    In line with the Malabo Declaration, the Food and Agriculture Organisation (UN-FAO) has rolled out three regional initiatives on accelerating actions towards fighting hunger, promote sustainable and innovative production practices and building resilience of vulnerable farming and pastoral communities in Africa. Several REDD+ initiatives are being implemented in the region with the objective to contribute to the global effort in increased carbon sequestration and enhancing biodiversity conservation. Africa with support from World Bank (WB) and African Development Bank (AfDB) is operationalizing Climate Smart Agriculture (CSA) aiming at achieving sustainable and resilient transformation of Africa agriculture for food security in the context of climate change. The expected impact include conversion of 5 million hectares of degraded land recovered and forests to sustainable management in Africa. This theme will examine how innovations in agriculture and forestry can be harnessed, within the broader context of sustainable development in Africa.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-lime-500 to-green-600 rounded-2xl p-10 text-white">
                            <h3 className="text-2xl font-bold mb-6">Our Research Focus</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Lightbulb className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Innovation Research</p>
                                        <p className="text-sm text-white/90">We conduct research on innovations that improve food security through increasing agricultural productivity, researching food systems, and supporting agribusiness/entrepreneurship.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Agricultural Transformation</p>
                                        <p className="text-sm text-white/90">We aim to inform Africa's agricultural transformation, through research and policy systems driven by farmers, policymakers, and other key stakeholders in the agricultural value chain.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-lime-100">
                                <div className="w-14 h-14 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                                    <TrendingUp className="w-7 h-7 text-lime-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">60%</p>
                                <p className="text-sm text-gray-600">Trade and jobs from agriculture</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-lime-100">
                                <div className="w-14 h-14 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                                    <Calendar className="w-7 h-7 text-lime-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">2025</p>
                                <p className="text-sm text-gray-600">Target to end hunger (Malabo)</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-lime-100">
                                <div className="w-14 h-14 bg-lime-100 rounded-xl flex items-center justify-center mb-4">
                                    <TreePine className="w-7 h-7 text-lime-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">5M</p>
                                <p className="text-sm text-gray-600">Hectares for sustainable management</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cities and Resilience */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-white to-purple-50 rounded-3xl p-12 lg:p-16 shadow-2xl border-2 border-purple-200">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Building2 className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    Cities and Resilience
                                </h2>
                                <span className="inline-block px-4 py-2 bg-purple-100 text-purple-800 text-sm font-bold rounded-full">
                                    Urban Development
                                </span>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10 mb-12">
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    More than 50% of the world's population live in cities or urban centres and one billion people live in informal settlements and slums worldwide. Cities contribute significantly towards achievement of Sustainable Development Goals (SDGs) especially SDG 11 on sustainable cities and communities. African cities will double in population by 2050 this is because being home to the world's youngest and fast-growing population, the continent is urbanizing more rapidly than any other part of the planet (World Economic Forum). The primary concern is Africa's preparation for the urban explosion in the face of the many threats including climate change and disasters such as floods, fires, heat waves, air pollution among others. African cities and urban areas are already facing environmental related extremes such as floods, fires, and droughts. Africa's low capacity to respond to climate change compounded by poverty, weak economies, and overreliance on ecosystem based goods for livelihoods make African cities and urban areas vulnerable to multiple risks, hazards and disasters.
                                </p>
                            </div>

                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    There is urgency to build resilient of current and emerging cities and urban areas in Africa through integrated multihazard research and policy approach, innovative financing, capacity building and inclusive partnership to transition them from crisis response to integrated disaster management.
                                </p>
                                <p>
                                    This thematic area focuses on pursuing interdisciplinary research to support African cities with the necessary capacity and systems to transition from emergency response to more integrated disaster preparedness. The focus is to understand the linkage between various disasters and their risks and to use science to inform multi-hazard action plans in various African Cities. The work area also involves learning and profiling excellent research on cities and resilience taking place in various African contexts to the continental level.
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-7 h-7 text-purple-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">50%+</p>
                                <p className="text-sm text-gray-600">Global urban population</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <TrendingUp className="w-7 h-7 text-purple-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">2x by 2050</p>
                                <p className="text-sm text-gray-600">African cities population</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-100">
                                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                                    <Shield className="w-7 h-7 text-purple-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">SDG 11</p>
                                <p className="text-sm text-gray-600">Sustainable cities goal</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mining, Trade and Industry */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-white to-amber-50 rounded-3xl p-12 lg:p-16 shadow-2xl border-2 border-amber-200">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Factory className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    Mining, Trade and Industry
                                </h2>
                                <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 text-sm font-bold rounded-full">
                                    Economic Development
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6 text-gray-700 leading-relaxed mb-12">
                            <p>
                                Africa is well endowed with mineral resources harbouring the world's largest mineral reserve of platinum, gold, diamonds, chromite, manganese, and vanadium (UNECA). However, according to the African Review report on Mining, 2009, most of these minerals are exported as ores, concentrates or metals without significant downstream processing to add value leading to low economic benefit to Africa. Africa conceived a mining Vision to advocate for transparent, equitable and optimal exploitation of mineral resources to underpin broad-based sustainable growth and socio-economic development. Therefore, the untapped mineral potential can help African leapfrog to industrialised economy if value added.
                            </p>
                            <p>
                                Africa trade policy has been undergoing transformation. However, the geographical boundaries have overtime hindered efficient intra-trade among the African countries as well as trade with the rest of the world. To open up African for free trade, the African Union (AU) with support from partners like the UN Economic Commission for Africa (UNECA) brokered and mobilized 44 AU member states to sign the African Continental Free Trade Agreement (AfCFTA) in Kigali, Rwanda on March 21, 2018. AfCFTA is the largest in the world in terms of participating countries since the formation of the World Trade Organization (WTO). As of July 2019, out of the 55 AU members, 54 have signed while 22 have ratified the Agreement. AfCFTA is envisioned to boost intra-African trade by 52 percent by 2022. The Agreement was designed with the requirement that members remove tariffs from 90 percent of goods, allow free access to commodities, goods and services across the continent. Progress have been made in the operationalization of the Agreement. In the East African Community (EAC), which is one of the vibrant regional economic blocs, member have initiated One-Stop Border Posts (OSBP) in their borders to facilitate free movement of people and goods.
                            </p>
                            <p>
                                African industry is still underdeveloped because the key industrial sectors like agriculture remain vulnerable to climate change. Even though it is endowed with minerals, there no value addition hence generating little benefit to the continent. Agriculture industry is estimated to employ 60 percent of the workforce in Africa but its full potential is hindered by the continent' low adaptive capacity. The service industry is growing due to penetration of ICT based support like internet and phone penetration in the continent. The services like banking and financial services, communication and information technology and tourism have seen major progress over the past decade. The investment in the linkage between the service industries and productive sectors like agriculture and mining require strategic support in order to boost African industry to transition Africa' economy into middle-income economy. This thematic area will examine the role, impact and potential of the trifecta of mining, trade and industry in Africa's transformation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <Target className="w-7 h-7 text-amber-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">54/55</p>
                                <p className="text-sm text-gray-600">AU members signed AfCFTA</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <TrendingUp className="w-7 h-7 text-amber-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">52%</p>
                                <p className="text-sm text-gray-600">Intra-African trade boost target</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <Award className="w-7 h-7 text-amber-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">90%</p>
                                <p className="text-sm text-gray-600">Goods with removed tariffs</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100">
                                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-7 h-7 text-amber-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-2">60%</p>
                                <p className="text-sm text-gray-600">Workforce in agriculture</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technology and Innovation */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl p-12 lg:p-16 shadow-2xl border-2 border-indigo-200">
                        <div className="flex items-start gap-6 mb-8">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Cpu className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                                    Technology and Innovation
                                </h2>
                                <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-800 text-sm font-bold rounded-full">
                                    Digital Transformation
                                </span>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-10 mb-12">
                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    Technology and innovation are key drivers of economic transformation and sustainable development in Africa. The continent has witnessed rapid technological advancement, particularly in mobile technology, digital finance, and innovative solutions tailored to local challenges. Africa's young and growing population presents enormous potential for technological innovation and entrepreneurship.
                                </p>
                                <p>
                                    Digital transformation is reshaping sectors across the continent, from agriculture and healthcare to education and governance. Mobile penetration has enabled leapfrogging traditional infrastructure, with innovations like mobile money revolutionizing financial inclusion. Kenya's M-Pesa and similar platforms have become global models for digital financial services.
                                </p>
                            </div>

                            <div className="space-y-6 text-gray-700 leading-relaxed">
                                <p>
                                    However, significant challenges remain, including limited internet connectivity in rural areas, inadequate digital infrastructure, skills gaps, and regulatory frameworks that may not keep pace with technological advancement. Bridging the digital divide is essential for ensuring inclusive growth and preventing further marginalization of vulnerable populations.
                                </p>
                                <p>
                                    This thematic area focuses on research that explores how technology and innovation can accelerate sustainable development, enhance productivity, create employment opportunities, and address Africa's unique challenges. We examine emerging technologies, innovation ecosystems, digital policy frameworks, and strategies for building robust technological capabilities across the continent.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl p-10 text-white mb-12">
                            <h3 className="text-2xl font-bold mb-6">Key Research Areas</h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Lightbulb className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Innovation Ecosystems</p>
                                        <p className="text-sm text-white/90">Research on building vibrant innovation hubs, incubators, and technology parks that foster entrepreneurship and technological advancement.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Digital Infrastructure</p>
                                        <p className="text-sm text-white/90">Examining strategies for expanding connectivity, improving digital infrastructure, and ensuring equitable access to technology across the continent.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-100">
                                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                    <Cpu className="w-7 h-7 text-indigo-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">Digital</p>
                                <p className="text-sm text-gray-600">Transformation initiatives</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-100">
                                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                    <Users className="w-7 h-7 text-indigo-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">Youth</p>
                                <p className="text-sm text-gray-600">Driving innovation forward</p>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-100">
                                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                    <Lightbulb className="w-7 h-7 text-indigo-600" />
                                </div>
                                <p className="text-2xl font-bold text-gray-900 mb-2">Innovation</p>
                                <p className="text-sm text-gray-600">Ecosystem development</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="max-w-[1600px] mx-auto px-6 pb-20">
                    <div className="bg-gradient-to-br from-[#021d49] via-[#46a1bb] to-[#021d49] rounded-3xl p-12 lg:p-16 text-center text-white shadow-2xl">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                            Join Us in Shaping Africa's Future
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                            Together, we can drive transformative research and policy solutions that address Africa's most pressing challenges
                        </p>
                        <button className="group bg-white text-[#021d49] px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
                            Explore Our Work
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </section>
            </div>
        </>

    );
};

export default ARINFocusAreasPage;