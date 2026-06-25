"use client";
import React, { useState } from 'react';
import { ChevronDown, FileText, ExternalLink, Download, BookOpen, Users } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

/* ─── DATA ─────────────────────────────────────────────────── */

const objectives = [
    'Strengthen research writing and publishing capacity to enable high-quality academic, technical, and policy outputs.',
    'Build inclusive mentorship networks linking participants with senior scholars, editors, reviewers, and policy communication experts.',
    'Enhance data literacy and research rigour through training in data management, analysis, visualisation, and ethical practices.',
    'Advance knowledge translation, transforming evidence into policy briefs, op-eds, technical notes, and advocacy materials.',
    'Promote open dissemination using digital tools, open-access models, AI, and structured publishing workflows.',
];


const modules = [
    {
        code: 'M1', title: 'Academic Writing Mastery', duration: '3 Sessions · 9–12 Hours',
        goal: 'To equip participants with the skills required to develop high-quality scholarly manuscripts that meet international publishing standards.',
        outcomes: ['Structure a publishable academic manuscript', 'Develop clear research arguments', 'Write compelling abstracts and introductions', 'Present findings effectively', 'Select appropriate journals for publication', 'Improve manuscript quality before submission'],
        sessions: [
            { title: 'Foundations of Academic Writing', topics: ['Characteristics of scholarly writing', 'Research-to-publication pathway', 'Understanding journal article structures', 'IMRAD format'], exercise: 'Analyse a published article and identify each section.' },
            { title: 'Building a Strong Manuscript', topics: ['Writing effective abstracts', 'Literature review development', 'Constructing arguments', 'Presenting methods and results'], exercise: 'Draft an abstract from your own research.' },
            { title: 'Journal Selection & Submission Readiness', topics: ['Identifying suitable journals', 'Impact factors and journal rankings', 'Avoiding journal mismatch', 'Submission checklists'], exercise: 'Match manuscripts to appropriate journals.' },
        ],
        assignment: 'Develop a complete manuscript outline for a selected study.',
        output: 'Draft manuscript ready for mentorship review.',
    },
    {
        code: 'M2', title: 'Navigating the Publishing Process', duration: '2 Sessions · 6–8 Hours',
        goal: 'To prepare participants for successful engagement with editors, reviewers, and publishers.',
        outcomes: ['Understand peer review systems', 'Respond effectively to reviewers', 'Manage revisions professionally', 'Recognise predatory journals', 'Understand publication workflows'],
        sessions: [
            { title: 'Understanding the Publishing Ecosystem', topics: ['Types of peer review', 'Editorial decision-making', 'Publishing timelines', 'Rejection and resubmission strategies'], exercise: 'Simulated editorial review process.' },
            { title: 'Managing Revisions & Editorial Feedback', topics: ['Reading reviewer comments', 'Writing response letters', 'Revision strategies', 'Publishing contracts and copyright'], exercise: 'Respond to actual reviewer comments.' },
        ],
        assignment: 'Prepare a reviewer response matrix.',
        output: 'Reviewer response letter and revised manuscript section.',
    },
    {
        code: 'M3', title: 'Research Impact and Open Science', duration: '2 Sessions · 6–8 Hours',
        goal: 'To help researchers maximise visibility, accessibility, and impact of their research.',
        outcomes: ['Understand open science principles', 'Increase citation potential', 'Build researcher profiles', 'Track research impact', 'Use repositories effectively'],
        sessions: [
            { title: 'Open Science and Open Access', topics: ['Open science principles', 'Open-access publishing models', 'Institutional repositories', 'Data sharing practices'], exercise: 'Deposit a paper into a repository.' },
            { title: 'Measuring and Increasing Research Impact', topics: ['Citation metrics', 'H-index and impact indicators', 'Research visibility strategies', 'ORCID, Google Scholar, ResearchGate'], exercise: 'Create and optimise academic profiles.' },
        ],
        assignment: 'Develop a personal research visibility plan.',
        output: 'Research impact enhancement strategy.',
    },
    {
        code: 'M4', title: 'Science Communication for Policy Impact', duration: '3 Sessions · 9–12 Hours',
        goal: "To strengthen participants' ability to translate research into policy and public influence.",
        outcomes: ['Write policy briefs', 'Develop evidence-based narratives', 'Engage media effectively', 'Communicate with non-specialist audiences', 'Use storytelling for impact'],
        sessions: [
            { title: 'Principles of Knowledge Translation', topics: ['Research-to-policy pathways', 'Audience analysis', 'Evidence translation'], exercise: 'Convert a research finding into a policy message.' },
            { title: 'Writing Policy Briefs and Op-Eds', topics: ['Structure of policy briefs', 'Writing executive summaries', 'Op-ed development'], exercise: 'Draft a two-page policy brief.' },
            { title: 'Media Engagement and Storytelling', topics: ['Media interviews', 'Press releases', 'Storytelling techniques', 'Social media for research'], exercise: 'Mock media interview.' },
        ],
        assignment: 'One policy brief, one opinion article, one media release.',
        output: 'Policy communication package.',
    },
    {
        code: 'M5', title: 'Ethical Publishing & Research Integrity', duration: '2 Sessions · 6–8 Hours',
        goal: 'To promote responsible conduct in research and publishing.',
        outcomes: ['Understand research ethics', 'Avoid plagiarism', 'Apply authorship standards', 'Ensure transparency and reproducibility'],
        sessions: [
            { title: 'Research Integrity', topics: ['Research misconduct', 'Fabrication and falsification', 'Authorship ethics', 'Conflicts of interest'], exercise: 'Ethics case study analysis.' },
            { title: 'Responsible Publishing', topics: ['Plagiarism detection', 'Citation ethics', 'Data transparency', 'Reproducibility'], exercise: 'Using plagiarism screening tools.' },
        ],
        assignment: 'Develop an ethical compliance checklist.',
        output: 'Research integrity action plan.',
    },
    {
        code: 'M6', title: 'Responsible Use of AI in Academic Writing', duration: '2 Sessions · 6–8 Hours',
        goal: 'To enable participants to use AI responsibly while maintaining academic integrity.',
        outcomes: ['Use AI tools ethically', 'Understand AI limitations', 'Apply disclosure requirements', 'Protect data privacy', 'Maintain originality'],
        sessions: [
            { title: 'AI for Research and Writing', topics: ['AI tools landscape', 'Literature review support', 'Editing and language enhancement', 'AI-assisted brainstorming'], exercise: 'Compare AI-generated and human-written outputs.' },
            { title: 'Ethics, Transparency and Governance', topics: ['AI disclosure requirements', 'Journal policies on AI', 'Data protection', 'Bias and misinformation'], exercise: 'Develop AI usage statements for manuscripts.' },
        ],
        assignment: 'Prepare an AI-assisted writing workflow.',
        output: 'Responsible AI use protocol.',
    },
    {
        code: 'M7', title: 'Linking Research to the SDGs', duration: '2 Sessions · 6–8 Hours',
        goal: 'To strengthen the alignment of research with global sustainable development priorities.',
        outcomes: ['Map research to SDGs', 'Develop impact pathways', 'Demonstrate policy relevance', 'Frame evidence for donors and policymakers'],
        sessions: [
            { title: 'Understanding the SDG Framework', topics: ['SDGs overview', 'Targets and indicators', 'SDG localisation in Africa', 'Theory of Change'], exercise: 'Map participant research to SDGs.' },
            { title: 'Demonstrating Development Impact', topics: ['Impact pathways', 'Results frameworks', 'Donor reporting', 'Policy influence tracking'], exercise: 'Develop an SDG impact matrix.' },
        ],
        assignment: 'Prepare an SDG alignment and impact statement for a manuscript or policy product.',
        output: 'Research-to-SDG impact framework.',
    },
];

const boardMembers = [
    { name: 'Dr. Joanes Atela', role: 'Founder & Executive Director, ARIN', initials: 'JA', bio: 'Dr. Joanes Atela is a leading African scientist and institution builder with over 15 years of experience in research, climate policy, and technical advisory work. He leads a network of over 200 researchers and policymakers across 36 African countries. Formerly Director of Partnerships and Impact at ACTS, he is Lead Expert for the African Union Green Innovation Framework and serves on the Strategic Advisory Group of UKRI. He holds a PhD from the University of Leeds and has over 1,000 Google Scholar citations.' },
    { name: 'Prof. Idil Boran', role: 'Professor of Philosophy, York University, Canada', initials: 'IB', bio: "Prof. Idil Boran is a Full Professor at York University, Toronto, specialising in political philosophy, applied ethics, and global climate governance. She has participated as an accredited observer in UN Climate Change conferences since 2012 and is the author of Political Theory and Global Climate Action: Recasting the Public Sphere (Routledge, 2019)." },
    { name: 'Dr. J.P. Ochieng Odero', role: 'Scientist & Research Systems Specialist', initials: 'JO', bio: "Dr. J.P.R. Ochieng'-Odero holds a PhD in Zoology from the University of Auckland and has led major research programmes including FCDO's Research and Innovation Systems for Africa (RISA) and the East Africa Research Fund (EARF). He is a Member of the Kenya National Academy of Sciences and has consulted for the World Bank." },
    { name: 'Prof. Dawn Bazley', role: 'University Professor of Biology, York University, Canada', initials: 'DB', bio: "Prof. Dawn Bazley is a University Professor at York University's Faculty of Science. She directed York's Institute for Research and Innovation in Sustainability for seven years. Her research spans ecology, climate change, and science policy. She holds a doctorate from Oxford University and has published over 70 academic works with more than 2,000 citations." },
    { name: 'Prof. George Krhoda', role: 'Professor of Geography & Environmental Studies, University of Nairobi', initials: 'GK', bio: "Prof. George Okoye Krhoda is a Professor at the University of Nairobi specialising in hydrology and water resources. Formerly Permanent Secretary of Kenya's Ministry of Environment and Natural Resources, he has consulted for the World Bank, UNDP, UNICEF, and UNEP. He was awarded the Chief of the Order of the Burning Spear (CBS)." },
];

const trainers = [
    { name: 'Dr. Francis Oloo', role: 'Lead Coordinator · GIS & Remote Sensing', initials: 'FO', bio: 'Dr. Francis Oloo is an expert in Geographic Information Science with over a decade of experience. He holds a PhD from the University of Salzburg and is a Lecturer at the Technical University of Kenya and Adjunct Lecturer at Strathmore University. At ARIN, he serves as AI for Climate Resilience programme lead.' },
    { name: 'Dr. Eurallyah Akinyi', role: 'Advocate, Economist & Policy Specialist', initials: 'EA', bio: 'Dr. Eurallyah Akinyi is an Advocate of the High Court of Kenya and an economist at the intersection of sustainable development, climate finance, energy transition, and public policy. She has published widely on international trade law, climate change, sovereign debt, and artificial intelligence.' },
    { name: 'Dr. Maureen Ngesa', role: 'Academic Writing & Research Capacity', initials: 'MN', bio: 'Dr. Maureen Ngesa is a behavioural systems and programme design leader with a background in clinical psychology and MHPSS across Kenya and East Africa. Her expertise in systems thinking and multi-stakeholder engagement brings a rigorous, evidence-grounded lens to research communication and capacity building.' },
    { name: 'Dr. Fiona Ngarachu', role: 'Research Methods & Policy Communication', initials: 'FN', bio: "Dr. Fiona Ngarachu is an Assistant Professor at USIU-Africa with a PhD from the University of Southampton. She has five years of university teaching experience in research methods and political science. As co-founder of the African Youth Dialogues, she has built knowledge-sharing communities across 17 African countries." },
];

const documents = [
    { title: 'Publishing Academy Brief', description: 'Background, objectives, and programme structure', file: '/documents/ARIN_Publishing_Academy_Brief_Final (1).pdf' },
    { title: 'Training Modules', description: 'All 7 modules, sessions, exercises, and capstone', file: '/documents/Academy Modules.pdf' },
    { title: 'Board Members & Trainers', description: 'Full profiles of board, trainers, and coordinator', file: '/documents/BOARD AND TRAINERS (1).pdf' },
];

/* ─── PAGE ──────────────────────────────────────────────────── */

export default function ARINPublishingAcademy() {
    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

    return (
        <>
            <Navbar />
            <div className="bg-[#f7f8fa] min-h-screen">

                {/* ── Hero ─────────────────────────────────────── */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-6xl mx-auto px-6 py-10">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <div>
                                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.18em] text-white bg-[#021d49] px-3 py-1 rounded-full mb-3">ARIN Press</span>
                                <h1 className="text-3xl md:text-4xl font-bold text-[#021d49] tracking-tight leading-tight">Publishing Academy</h1>
                                <p className="text-gray-500 text-sm mt-1.5 max-w-xl">Research Writing, Publishing, and Policy Communication for African Scholars</p>
                                <a
                                    href="https://elearning.arin-africa.org/arin-publishing-academy"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 bg-[#021d49] text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-[#032566] transition-colors"
                                >
                                    See More Details
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                            <div className="shrink-0 text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Publishing Partner</p>
                                <p className="text-sm font-bold text-[#021d49]">Taylor &amp; Francis Group</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">

                    {/* ── Background ───────────────────────────── */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#021d49] mb-3">Background</p>
                        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                            <p>
                                Africa's research landscape is vibrant yet African scholarship remains structurally
                                under-represented in global knowledge systems. Limited training in research writing,
                                scientific communication, peer-review processes, and translation of scientific evidence
                                into policy means that high-quality, Africa-generated evidence rarely reaches the
                                audiences it could influence.
                            </p>
                            <p>
                                The ARIN Publishing Academy is ARIN's response: a pan-African, Africa-led programme
                                designed to strengthen the full research-to-impact pipeline.
                            </p>
                            <p>
                                Delivered over three months using a blended, flexible model  live webinars, self-paced
                                e-learning, mentorship clinics, peer-review circles, and practical writing labs 
                                designed for working professionals and early-career researchers across all African time zones.
                            </p>
                        </div>
                    </div>

                    {/* ── Training Curriculum ──────────────────── */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-7 h-7 rounded-lg bg-[#021d49] flex items-center justify-center">
                                <BookOpen className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#021d49]">Training Curriculum</span>
                        </div>
                        <p className="text-gray-400 text-xs ml-9 mb-5">7 modules · Click any module to see full details</p>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {modules.map((mod) => {
                                const isOpen = expandedModule === mod.code;
                                const colors: Record<string, string> = { M1: 'bg-blue-50 text-blue-800', M2: 'bg-indigo-50 text-indigo-800', M3: 'bg-violet-50 text-violet-800', M4: 'bg-purple-50 text-purple-800', M5: 'bg-rose-50 text-rose-800', M6: 'bg-amber-50 text-amber-800', M7: 'bg-emerald-50 text-emerald-800' };
                                return (
                                    <div
                                        key={mod.code}
                                        className={`rounded-xl border transition-all duration-200 ${isOpen ? 'border-[#021d49] lg:col-span-3 sm:col-span-2' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}
                                    >
                                        <button
                                            onClick={() => setExpandedModule(isOpen ? null : mod.code)}
                                            className="w-full flex items-center gap-3 p-4 text-left"
                                        >
                                            <span className={`shrink-0 w-9 h-9 rounded-lg text-xs font-bold flex items-center justify-center ${colors[mod.code]}`}>{mod.code}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-[#021d49] text-sm leading-snug">{mod.title}</p>
                                                <p className="text-[11px] text-gray-400 mt-0.5">{mod.duration}</p>
                                            </div>
                                            <ChevronDown className={`shrink-0 w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isOpen && (
                                            <div className="px-4 pb-5 border-t border-gray-100 pt-4">
                                                {/* Goal */}
                                                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                                                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Module Goal</p>
                                                    <p className="text-sm text-gray-700 leading-relaxed">{mod.goal}</p>
                                                </div>

                                                <div className="grid lg:grid-cols-2 gap-5 mb-4">
                                                    {/* Outcomes */}
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Learning Outcomes</p>
                                                        <div className="space-y-1.5">
                                                            {mod.outcomes.map((o, i) => (
                                                                <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#021d49] mt-1.5 opacity-40" />
                                                                    {o}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Sessions */}
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Sessions</p>
                                                        <div className="space-y-2">
                                                            {mod.sessions.map((s, si) => (
                                                                <div key={si} className="rounded-lg bg-gray-50 border border-gray-100 p-3">
                                                                    <p className="font-semibold text-[#021d49] text-xs mb-1.5">Session {si + 1}: {s.title}</p>
                                                                    <ul className="space-y-0.5 mb-2">
                                                                        {s.topics.map((t, ti) => (
                                                                            <li key={ti} className="flex items-start gap-1.5 text-[11px] text-gray-500">
                                                                                <span className="shrink-0 w-1 h-1 rounded-full bg-gray-400 mt-1.5" />{t}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                    <p className="text-[10px] text-gray-400 pt-1.5 border-t border-gray-200">
                                                                        <span className="font-bold uppercase tracking-wide">Exercise  </span>{s.exercise}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Assignment / Output */}
                                                <div className="grid sm:grid-cols-2 gap-3">
                                                    <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Assignment</p>
                                                        <p className="text-sm text-gray-600 leading-relaxed">{mod.assignment}</p>
                                                    </div>
                                                    <div className="rounded-xl bg-[#021d49] p-4">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-1">Expected Output</p>
                                                        <p className="text-sm text-white/80 leading-relaxed italic">{mod.output}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Capstone */}
                        <div className="mt-4 rounded-xl border border-dashed border-gray-300 p-5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Capstone Project  Academy Wide</p>
                            <p className="text-sm text-gray-600 mb-3">Each participant develops one publication product, choosing from four tracks:</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {[{ l: 'Track A', s: 'Academic Journal Manuscript', c: 'bg-blue-50 text-blue-700 border-blue-100' }, { l: 'Track B', s: 'Policy Brief', c: 'bg-violet-50 text-violet-700 border-violet-100' }, { l: 'Track C', s: 'Technical Paper', c: 'bg-amber-50 text-amber-700 border-amber-100' }, { l: 'Track D', s: 'Book Chapter', c: 'bg-emerald-50 text-emerald-700 border-emerald-100' }].map((t) => (
                                    <div key={t.l} className={`rounded-xl border p-3 text-center ${t.c}`}>
                                        <p className="text-[10px] font-bold mb-0.5">{t.l}</p>
                                        <p className="text-[11px] leading-snug font-medium">{t.s}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Academy Team ─────────────────────────── */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-7 h-7 rounded-lg bg-[#021d49] flex items-center justify-center">
                                <Users className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#021d49]">Academy Team</span>
                        </div>

                        {/* Partner + Coordinator + Support  top row */}
                        <div className="grid sm:grid-cols-3 gap-3 mb-6">
                            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Publishing Partner</p>
                                <p className="font-bold text-[#021d49] text-sm">Taylor &amp; Francis Group</p>
                                <p className="text-xs text-gray-400 mt-0.5">Global academic publisher</p>
                            </div>
                            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Coordinator</p>
                                <p className="font-bold text-[#021d49] text-sm">Florence Onyango</p>
                                <p className="text-xs text-gray-400 italic mt-0.5">Senior Manager, Science Communications</p>
                                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">Oversees editorial strategy, heads ARIN Press, and leads policy engagement. MSc in Climate Change Adaptation · ISO 9001 Lead Auditor.</p>
                            </div>
                            <div className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Support Team</p>
                                <div className="space-y-1.5 mt-1">
                                    {['Jerry Ariel', 'Nancy Mutwii', 'Maria Nailantei'].map((name) => (
                                        <div key={name} className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#021d49] opacity-40" />
                                            <p className="text-sm font-medium text-[#021d49]">{name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Board Members */}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Board Members</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
                            {boardMembers.map((p) => {
                                const key = `board-${p.name}`;
                                const isOpen = expandedPerson === key;
                                return (
                                    <div key={key} className={`rounded-xl border transition-all ${isOpen ? 'border-[#021d49] sm:col-span-2 lg:col-span-3' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                                        <button onClick={() => setExpandedPerson(isOpen ? null : key)} className="w-full flex items-center gap-3 p-4 text-left">
                                            <div className="shrink-0 w-9 h-9 rounded-full bg-[#021d49] text-white text-xs font-bold flex items-center justify-center">{p.initials}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-[#021d49] text-sm">{p.name}</p>
                                                <p className="text-[11px] text-gray-400 italic mt-0.5 leading-snug truncate">{p.role}</p>
                                            </div>
                                            <ChevronDown className={`shrink-0 w-4 h-4 text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isOpen && (
                                            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                                                <p className="text-sm text-gray-600 leading-relaxed">{p.bio}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Trainers */}
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Trainers</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {trainers.map((p) => {
                                const key = `trainer-${p.name}`;
                                const isOpen = expandedPerson === key;
                                return (
                                    <div key={key} className={`rounded-xl border transition-all ${isOpen ? 'border-[#021d49] sm:col-span-2 lg:col-span-3' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}`}>
                                        <button onClick={() => setExpandedPerson(isOpen ? null : key)} className="w-full flex items-center gap-3 p-4 text-left">
                                            <div className="shrink-0 w-9 h-9 rounded-full bg-gray-200 text-[#021d49] text-xs font-bold flex items-center justify-center">{p.initials}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-[#021d49] text-sm">{p.name}</p>
                                                <p className="text-[11px] text-gray-400 italic mt-0.5 leading-snug truncate">{p.role}</p>
                                            </div>
                                            <ChevronDown className={`shrink-0 w-4 h-4 text-gray-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                        </button>
                                        {isOpen && (
                                            <div className="px-4 pb-4 border-t border-gray-100 pt-3">
                                                <p className="text-sm text-gray-600 leading-relaxed">{p.bio}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Documents ────────────────────────────── */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-7 h-7 rounded-lg bg-[#021d49] flex items-center justify-center">
                                <FileText className="w-3.5 h-3.5 text-white" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[#021d49]">Programme Documents</span>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                            {documents.map((doc) => (
                                <div key={doc.title} className="rounded-xl border border-gray-200 p-4 flex flex-col justify-between gap-3">
                                    <div>
                                        <p className="font-semibold text-[#021d49] text-sm mb-1">{doc.title}</p>
                                        <p className="text-[11px] text-gray-400 leading-snug">{doc.description}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <a href={doc.file} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-[#021d49] border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors">
                                            <ExternalLink className="w-3 h-3" /> View
                                        </a>
                                        <a href={doc.file} download className="flex items-center gap-1.5 text-xs font-medium text-white bg-[#021d49] rounded-lg px-3 py-1.5 hover:bg-[#032566] transition-colors">
                                            <Download className="w-3 h-3" /> Download
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Contact ──────────────────────────────── */}
                    <div className="text-center pb-4">
                        <p className="text-xs text-gray-400 mb-1">For inquiries, contact the Academy Coordinator</p>
                        <a href="mailto:f.onyango@arin-africa.org" className="text-sm font-semibold text-[#021d49] hover:underline">f.onyango@arin-africa.org</a>
                        <p className="text-[11px] text-gray-300 mt-2">Africa Research and Impact Network · Taylor &amp; Francis Group</p>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    );
}
