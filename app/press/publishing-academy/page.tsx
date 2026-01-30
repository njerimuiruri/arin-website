"use client";
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Users, Target, Award, Calendar, Briefcase } from 'lucide-react';
import Navbar from '@/app/navbar/Navbar';
import Footer from '@/app/footer/Footer';

const ARINPublishingAcademy = () => {
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['intro']));

    const toggleSection = (id: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedSections(newExpanded);
    };

    const Section = ({ id, title, children, icon: Icon }: any) => {
        const isExpanded = expandedSections.has(id);
        return (
            <div className="mb-6 bg-white rounded-xl shadow-lg overflow-hidden border-l-4 hover:shadow-xl transition-all duration-300" style={{ borderColor: isExpanded ? '#00c4b3' : '#e5e7eb' }}>
                <button
                    onClick={() => toggleSection(id)}
                    className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        {Icon && (
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300" style={{
                                backgroundColor: isExpanded ? '#00c4b3' : '#f3f4f6'
                            }}>
                                <Icon className="w-6 h-6" style={{ color: isExpanded ? 'white' : '#021d49' }} />
                            </div>
                        )}
                        <h2 className="text-2xl font-bold text-left" style={{ color: '#021d49', borderColor: '#00c4b3' }}>{title}</h2>
                    </div>
                    <div className="flex items-center gap-2">
                        {isExpanded && (
                            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: '#00c4b3', color: 'white' }}>
                                Expanded
                            </span>
                        )}
                        {isExpanded ? (
                            <ChevronDown className="w-6 h-6 transition-transform duration-300" style={{ color: '#00c4b3' }} />
                        ) : (
                            <ChevronRight className="w-6 h-6 transition-transform duration-300" style={{ color: '#021d49', borderColor: '#00c4b3' }} />
                        )}
                    </div>
                </button>
                {isExpanded && (
                    <div className="px-8 py-6 border-t-2 bg-gradient-to-br from-white to-gray-50" style={{ borderColor: '#00c4b3' }}>
                        {children}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">

                {/* Main Content */}
                <div className="container mx-auto px-4 py-8 max-w-6xl">

                    {/* Introduction */}
                    <Section id="intro" title="Introduction" icon={BookOpen}>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.1 About the Africa Research and Impact Network</h3>
                                <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                                    The Africa Research and Impact Network (ARIN) is an international think tank that amplifies African voices and research for impact. ARIN is a platform that brings together over 300 scholars, researchers, policymakers, and practitioners from across 40 National Focal Points in African countries and the diaspora, promoting knowledge sharing, research excellence, and transformative policy action.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4 text-justify">
                                    ARIN's core focus is peer learning and sharing good transformative research and impact practices across Africa. It leverages its deep experience in generating and consolidating evidence on effective interventions across Africa's most critical strategic sectors and themes. Recognizing the continent's wealth of underutilized research, innovation, and best practices, ARIN fosters a unique platform for the science-policy interface. This platform bridges the gap by facilitating the sharing, profiling, and leveraging of the best research and impactful practices from diverse African contexts. Through this peer-to-peer exchange, ARIN empowers stakeholders to inform transformative policy action across the continent. ARIN's vision is to be the catalyst for Africa, where research excellence fuels transformative policy and sustainable development. ARIN envisions becoming Africa's foremost platform for advancing locally driven research, fostering impactful collaborations, and shaping sustainable development policies. By 2030, ARIN aims to address Africa's pressing challenges, leveraging the power of African knowledge systems and evidence-based solutions.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.2 The Case for a Publishing Academy</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Africa is home to a dynamic and expanding community of researchers, early career academics, technical experts, and policy professionals generating critical insights across diverse domains, including climate change, public health, governance, and sustainable development. Despite this rich intellectual capacity, much of the continent's knowledge output remains underutilized or invisible in global arenas. This is largely due to the lack of structured, Africa centered platforms that support effective research writing, scholarly publishing, and policy-oriented communication.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    To bridge this persistent gap, there is a compelling case for establishing a pan African publishing academy, that nurtures homegrown scholarship, builds research communication competencies, and strengthens Africa's voice in global knowledge systems. The Academy would not only serve as a launchpad for high quality academic and policy outputs but also act as a catalyst for increasing African research visibility, fostering regional collaboration, and promoting equitable participation in global scholarly conversations.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    In positioning the Academy for broader and sustained impact, a structured alumni network, mentorship pipelines, and strategic partnerships with universities, research institutions, and publishers will be critical. These linkages will help institutionalize support for emerging researchers, drive long-term capacity building, and ensure the integration of African knowledge into global frameworks for evidence-informed development and policy dialogue.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.3 The Capacity Gap in Africa's Research and Publishing Landscape</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Across Africa, there is a growing number of postgraduate programs and research initiatives housed within universities, think tanks, and policy institutions. This expansion has produced a vibrant community of postgraduate researchers, early career academics, technical experts, and policy professionals who generate valuable insights on pressing development challenges. However, a critical gap persists: most of these individuals lack structured, Africa-specific training in academic writing, publishing processes, and knowledge translation. Many researchers struggle to frame their work for peer-reviewed journals, navigate editorial and peer-review systems, and meet the standards required by international publishing platforms. Despite producing strong academic theses and dissertations, most postgraduate students graduate without exposure to global norms for scholarly publishing, open-access practices, or ethical authorship. As a result, their work often remains unpublished, disconnected from global academic conversations, and inaccessible to broader audiences. This challenge is compounded by weak dissemination channels, limited indexing of African research in high-impact journals, and the absence of institutional platforms that support scholarly communication and policy engagement. Consequently, a vast reservoir of high-potential African research remains invisible, undermining opportunities for knowledge uptake, policy influence, and global impact.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.4 Beyond Academia: Policy and Practice-Oriented Writing Deficits</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Beyond the walls of academia, professionals across government agencies, NGOs, civil society organizations, and the private sector are increasingly expected to engage with and produce evidence-based communication products. These include policy briefs, technical reports, op-eds, working papers, and advocacy memos. These formats demand a distinct set of skills from traditional academic writing. However, the capacity to craft such outputs remains limited. Many professionals lack access to structured training, mentorship, or editorial support to develop high-quality, context-relevant materials aligned with global standards. This gap in policy-oriented communication significantly weakens the ability to translate research and technical evidence into actionable insights. As a result, valuable knowledge often fails to reach decision-makers or influence public discourse in meaningful ways.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    The consequences are far-reaching, including weak communication capacity, which hampers evidence uptake in policymaking, reduces the effectiveness of advocacy, and perpetuates the disconnect between research and real-world impact. It also sidelines context-specific African knowledge that could drive more inclusive, equitable, and responsive development outcomes. Addressing this deficit is critical for strengthening the science-policy-practice interface and ensuring that Africa's research contributions shape both national strategies and global debates.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.5 Structural and Institutional Barriers</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The persistent capacity gap in Africa's research ecosystem is deeply rooted in structural and institutional limitations. Chief among these is the absence of well established platforms that provide systematic training, mentorship, and long term support in academic writing and scholarly publishing. Most existing capacity-building mechanisms are fragmented, sporadic, donor-dependent, or narrowly focused on specific disciplines. As a result, researchers working in critical yet underfunded fields, such as the social sciences, environmental sustainability, climate resilience, and gender, are often left without pathways to publishing success. This challenge is further compounded by the lack of open access publishing infrastructure and the prohibitive costs of article processing charges, which continue to marginalize African authors. At the institutional level, research priorities are frequently skewed towards economically driven and technologically oriented disciplines like medicine, engineering, and business. This leaves limited space and support for multidisciplinary research and teaching, especially in areas that are essential for addressing complex development challenges.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    Moreover, poor data availability, inconsistent standards, fragmented storage formats, and limited open data practices hinder the quality and reach of African research. These constraints restrict researchers' ability to generate, analyze, and disseminate robust evidence. The lack of institutional access to a diverse array of academic journals further isolates scholars from evolving global knowledge systems, weakens teaching quality, and limits opportunities for publication, international engagement, and conference participation. Without sustained investment in inclusive infrastructure, equitable publishing pathways, and data driven research support, African scholars will remain constrained in their ability to participate meaningfully in regional and global academic and policy dialogues.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.6 ARIN's Ongoing Initiatives</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The African Research and Impact Network (ARIN) has laid strong foundations to address the structural and capacity challenges limiting African research visibility and policy engagement. Through its Africa Science-Policy Fellowship Program (AS-PFP), ARIN has created dynamic platforms for early-career researchers and policy practitioners to co-produce knowledge, engage in regional science-policy dialogues, and receive targeted mentorship and training. The program champions evidence-based decision-making and knowledge co-creation while institutionalizing science-policy engagement across the continent.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The AS-PFP is guided by two core goals:
                                </p>
                                <ul className="list-none space-y-2 mb-4 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        (a) to consolidate evidence from diverse African contexts and leverage it for policy support and capacity building, and
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        (b) to promote research excellence and the sharing of best practices for impactful scholarship.
                                    </li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    It has a proven track record of delivering high-level dialogues, regional case studies, and thematic knowledge syntheses that connect research to real-world policy challenges.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    To further advance this agenda, ARIN is leveraging its strategic Memorandum of Understanding with the Taylor & Francis Group, a key partner in enabling equitable access to global publishing platforms. Through this partnership, ARIN seeks to:
                                </p>
                                <ul className="list-none space-y-2 mb-4 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Establish institutional champions to advocate for inclusive journal access.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Nurture future institutional leaders who appreciate the value of equitable knowledge ecosystems; and
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Build stronger bridges between academia, policy, and publishing to harmonize efforts in strengthening Africa's contribution to evidence informed development.
                                    </li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed">
                                    These efforts are part of ARIN's broader mission to democratize knowledge production, support the next generation of African scholars, and amplify African voices in global academic and policy spaces.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.7 ARIN Publishing Academy</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Recognizing the urgent need to enhance the visibility of African research, strengthen scholarly communication, and build lasting capacity among researchers, the African Research and Impact Network (ARIN) proposes the establishment of the ARIN Publishing Academy. This continental initiative will serve as a structured, Africa-specific platform to support both emerging and established scholars in producing and disseminating high-quality academic and policy-relevant outputs. The ARIN Publishing Academy is therefore envisioned as an inclusive, pan-African platform to address this research and publishing gap. It will serve as a continental centre for capacity building in research writing, scholarly publishing, and knowledge translation. It will equip researchers and professionals alike with the competencies, networks, and opportunities they need to contribute meaningfully to academic, policy, and public conversations, whether through peer-reviewed journals, national policy dialogues, or global knowledge exchanges.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Building on ARIN's robust foundation, including its Science-Policy Fellowship Program (AS-PFP) and strategic partnership with Taylor & Francis Group, the Academy will align with ARIN's broader mission of strengthening the science policy-practice interface. It is envisioned as a springboard for African researchers to confidently publish impactful work, navigate the complexities of scholarly publishing, and translate evidence into actionable communication for decision makers. With a strong commitment to equity, openness, and inclusion, the Academy will offer a contextualized and interdisciplinary support system tailored to Africa's diverse research ecosystem. Its core services will include:
                                </p>
                                <ul className="list-none space-y-2 mb-4 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Structured training programs on academic writing, peer-reviewed publishing, and policy-oriented communication.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Thematic writing workshops aligned with pressing development and policy agendas.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Mentorship and coaching, connecting early-career researchers with experienced academics and editors.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Editorial support to improve the quality and readiness of manuscripts.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Capacity development for non-academic stakeholders, including civil society actors, practitioners, and policymakers, to improve evidence based communication.
                                    </li>
                                </ul>

                                <h4 className="text-base font-bold mt-6 mb-3" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.7.1 Driving Research Output and Quality through Targeted Programming</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    To ensure the ARIN Publishing Academy contributes meaningfully to Africa's research productivity, the initiative will embed targeted mechanisms that improve the quality, visibility, and volume of scholarly outputs. Key strategies include:
                                </p>

                                <div className="space-y-4 mb-4">
                                    <div>
                                        <h5 className="font-bold text-gray-800 mb-2">Regular Peer Review Sessions</h5>
                                        <p className="text-gray-700 leading-relaxed">
                                            Participants will engage in structured peer review exercises, allowing them to critique and improve each other's work in a collaborative and supportive environment. This will build confidence and familiarity with editorial standards while enhancing manuscript quality.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800 mb-2">Publication Incentives</h5>
                                        <p className="text-gray-700 leading-relaxed">
                                            The Academy will establish recognition mechanisms, such as awards, fellowships, or visibility campaigns, for participants who successfully publish their work in peer-reviewed journals or contribute to policy-relevant outputs post training.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800 mb-2">Iterative Feedback Mechanisms</h5>
                                        <p className="text-gray-700 leading-relaxed">
                                            Researchers will benefit from continuous, constructive feedback loops throughout their writing process. This approach will support iterative improvement of manuscripts and improve readiness for submission to reputable journals
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800 mb-2">Promotion of Interdisciplinary Research</h5>
                                        <p className="text-gray-700 leading-relaxed">
                                            The Academy will actively encourage cross-disciplinary collaboration across its cohorts, promoting diverse perspectives and fostering innovative, solution oriented research outputs that are relevant to complex development challenges. By embedding these elements into its core programming, and leveraging the editorial, publishing, and review expertise available through its partnership with Taylor & Francis, the Academy will position itself as a catalyst for increased, high quality African scholarship that resonates within both academic and policy spaces.
                                        </p>
                                    </div>
                                </div>

                                <h4 className="text-base font-bold mt-6 mb-3" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.7.2 Collaborative Value and Strategic Partnerships</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The Publishing Academy will strategically leverage ARIN's MoU with Taylor & Francis Group to:
                                </p>
                                <ul className="list-none space-y-2 mb-4 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Launch joint publishing initiatives that amplify African voices and promote open-access knowledge.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Co-design training modules and editorial mentorship pipelines
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Create institutional champions across African universities to promote inclusive journal access and open publishing practices.
                                    </li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    This collaboration offers mutual benefits as it positions Taylor & Francis as a leader in democratizing publishing access in the Global South while enabling ARIN to scale African research outputs and visibility globally.
                                </p>

                                <h4 className="text-base font-bold mt-6 mb-3" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.7.3 Strategic Benefits for Taylor & Francis</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Partnering with ARIN on the establishment and operationalization of the ARIN Publishing Academy offers Taylor & Francis a unique opportunity to strengthen its global presence, foster research equity, and drive impact across the African continent. Key benefits include:
                                </p>

                                <div className="space-y-4 mb-4">
                                    <div>
                                        <h5 className="font-bold text-gray-800 mb-2">Expanded Reach and Influence in Africa</h5>
                                        <p className="text-gray-700 leading-relaxed">
                                            Engaging with ARIN positions Taylor & Francis at the forefront of a rapidly expanding academic and research landscape in Africa. This partnership enhances the publisher's visibility, fosters deeper institutional relationships, and opens access to a growing market of universities, think tanks, and research consortia across the continent.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800 mb-2">Contribution to Global Diversity and Inclusion in Publishing</h5>
                                        <p className="text-gray-700 leading-relaxed">
                                            Supporting the Academy enables Taylor & Francis to play a leading role in advancing inclusive knowledge production by amplifying African voices and supporting underrepresented disciplines. The partnership aligns with global calls for decolonizing academic publishing and broadening the scope of contributors and topics represented in international journals and books.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800 mb-2">Access to Emerging Talent and High-Quality Submissions</h5>
                                        <p className="text-gray-700 leading-relaxed">
                                            Through workshops, mentorship, and editorial support, the Academy will serve as a pipeline for identifying, nurturing, and elevating emerging research talent. This can translate into an increase in high-quality, Africa based manuscript submissions across various disciplines, enhancing the publisher's content diversity and scholarly impact.
                                        </p>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-gray-800 mb-2">Strengthened Reputation as a Socially Responsible Knowledge Partner</h5>
                                        <p className="text-gray-700 leading-relaxed">
                                            By actively investing in capacity development and the science-policy interface, Taylor & Francis reinforces its brand as a socially responsible and forward-thinking publisher. This initiative aligns with the UN SDGs and growing demands for equity in global knowledge ecosystems, offering reputational value and long-term credibility in development-oriented publishing circles.
                                        </p>
                                    </div>
                                </div>

                                <h4 className="text-base font-bold mt-6 mb-3" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.7.4 High-Impact, Low-Cost Engagement for Taylor & Francis</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    In addition to its broader strategic gains, Taylor & Francis can support the ARIN Publishing Academy through a range of non-financial, high-value contributions. These may include:
                                </p>
                                <ul className="list-none space-y-2 mb-4 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Editorial mentorship for early-career researchers;
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Facilitated access to journals and publishing resources;
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Co-hosting of training webinars and knowledge-sharing events;
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Co-branded certification for Academy participants;
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Visibility for T&F through shared communications and branding.
                                    </li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed">
                                    These forms of partnership will significantly enhance the Academy's credibility, impact, and global integration. They will also offer meaningful engagement and visibility across the African research and publishing landscape without necessitating direct funding.
                                </p>

                                <h4 className="text-base font-bold mt-6 mb-3" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.7.5 Metrics for Success and Impact</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    To ensure accountability and sustained value, the Academy will track clear and measurable outcomes, including:
                                </p>
                                <ul className="list-none space-y-2 mb-4 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Number of researchers trained, mentored, and successfully published.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Volume and diversity of policy-relevant outputs (briefs, op-eds, technical reports).
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Institutional partnerships formed and sustained across African universities.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Increased representation of African-authored research in indexed, high impact journals.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Feedback from stakeholders on the influence of communication products in policy processes.
                                    </li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed">
                                    Through the Publishing Academy, ARIN aims to transform Africa's research capacity landscape, moving from fragmented, donor-driven support to a sustainable, strategic, and impact-driven model that empowers scholars and bridges the divide between research and policy.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>1.8 ARIN Infrastructure and Institutional Strength</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    ARIN's capacity rests on its available wide network of Scholars, Research Fellows, Policymakers, and Community of Practices endowed with different skills, as well as its existing research ecosystem-supporting infrastructure, such as Data Centre and Interactive Data Platforms, such as LAMA and CAPCHA, that support its quest for establishing a leading Publishing Academy in Africa. The Academy aims to leverage its pool of researchers equipped with data management, analysis, and visualization skills, alongside its Data Centre and platforms like LAMA and CAPCHA, to advance data-driven research and policy engagement. Through this approach, the Academy will promote the production of high-quality, publishable empirical research by building the capacity of early career researchers in data collection, analysis, and communication. Additionally, it will enhance their ability to disseminate data-informed insights, especially in the era of Big Data and Artificial Intelligence, by facilitating continuous learning, global mentorship, and exposure to emerging tools and techniques in empirical research dissemination.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* Rationale */}
                    <Section id="rationale" title="2.0 Rationale for the ARIN Publishing Academy" icon={Target}>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>2.1. Africa's Research and Development Challenge</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Africa's development is constrained by persistent poverty, climate vulnerabilities, and systemic health and governance challenges. Addressing these issues requires robust, evidence-informed policymaking, yet the continent struggles to translate research into action. According to the 2023 Global Innovation Index, Africa continues to rank low in research impact and commercialization. This is largely due to under investment in R&D (still below the 1% of GDP target set in Agenda 2063 and STISA-2024), heavy reliance on external funding, and limited capacity for research uptake and communication.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    While initiatives like the Science Granting Councils Initiative have attempted to improve evidence use in policymaking, institutional fragilities and fragmented systems hinder long-term impact. African universities and think tanks often lack the autonomy, platforms, and incentives to develop and disseminate Africa-led knowledge. Moreover, the research that is generated frequently remains inaccessible or in formats not tailored for policy use.
                                </p>
                                <p className="text-gray-700 leading-relaxed">
                                    There is also a disconnect between knowledge production and knowledge translation. Researchers, governments, and NGOs lack sustained mechanisms for collaboration, learning, and co-creation. The result is a cycle of underutilized research outputs and missed opportunities for influence in both national and global conversations. To date, there are few dedicated forums in Africa to interrogate the science-policy interface or systematically build capacities for research communication, particularly in emergent fields like climate change, artificial intelligence, and sustainable development.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>2.2. Addressing the Evidence Generation and Communication Gap in African Research</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Bridging the gap between research and policy requires more than producing evidence. It demands the ability to interpret, package, and communicate that evidence effectively. Yet many African professionals, from postgraduate students to senior advisors, receive little or no training in academic publishing or policy communication. Challenges such as poor access to journals, high publication fees, weak mentorship, and inadequate writing skills contribute to low publication rates and reduced policy engagement.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The ARIN Publishing Academy responds to this gap by positioning itself as a transformative capacity-building hub. It aims to equip researchers and practitioners with the skills to publish impactful research and translate findings into actionable knowledge. This is not merely a technical intervention; it is a structural response to build a new generation of African knowledge leaders across sectors.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    The Academy builds on ARIN's strategic partnership with Taylor & Francis Group. Through this collaboration, African scholars gain access to publishing opportunities in globally recognized journals, training sessions by publishing professionals, and mentorship from experienced editors. The Academy serves as a complementary mechanism for increasing research visibility, fostering collaboration, and enhancing the quality and policy relevance of African scholarship.
                                </p>
                                <p className="text-gray-700 leading-relaxed mb-3">Its key interventions include:</p>
                                <ul className="list-none space-y-2 mb-4 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Enhancing academic writing and publishing skills: Through targeted training on manuscript development, peer review navigation, and ethical publishing practices, the Academy will support African scholars in producing high-quality, peer-reviewed research outputs.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Bridging research and policy communication: The Academy will train participants to craft policy briefs, opinion pieces, and strategic reports that translate complex research into usable knowledge for decision-makers and the public.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Providing mentorship and editorial support: By establishing mentorship networks and peer review communities, the Academy will guide early career researchers through the publishing journey, enhancing confidence and success rates.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Expanding access to publishing networks: Through ARIN's partnerships and outreach to additional publishers, the Academy will help reduce publication barriers, facilitate co-authorships, and amplify African research globally.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Promoting open-access and digital dissemination: The Academy will encourage the use of open-access platforms and digital tools to maximize visibility, reach broader audiences, and increase citation impact.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Section>

                    {/* Objectives */}
                    <Section id="objectives" title="3.0 Objectives of the ARIN Publishing Academy" icon={Target}>
                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed mb-3">The Academy seeks to:</p>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#021d49' }}>a</span>
                                    <p className="text-gray-700 leading-relaxed">
                                        Strengthen research and writing capacity for early-career and established African researchers, as well as professionals seeking to produce high quality academic, empirical, and policy-oriented outputs.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#021d49' }}>b</span>
                                    <p className="text-gray-700 leading-relaxed">
                                        Build inclusive mentorship and publishing networks by connecting participants with senior researchers, journal editors, and policy communication experts, and facilitating access to reputable journals through ARIN's publishing partnerships.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#021d49' }}>c</span>
                                    <p className="text-gray-700 leading-relaxed">
                                        Enhance data literacy and research quality through regular training in data management, analysis, visualization, and ethical research practices to improve the rigor and credibility of African scholarship.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#021d49' }}>d</span>
                                    <p className="text-gray-700 leading-relaxed">
                                        Advance knowledge translation and policy engagement by equipping participants with the skills to develop policy briefs, op-eds, technical papers, and advocacy materials that inform decision-making.
                                    </p>
                                </div>
                                <div className="flex gap-3">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#021d49' }}>e</span>
                                    <p className="text-gray-700 leading-relaxed">
                                        Promote innovative and open dissemination pathways by leveraging digital tools, open-access models, artificial intelligence, and ARIN's interactive data platforms to increase research visibility, sharing, and impact.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Structure and Implementation */}
                    <Section id="structure" title="4.0. Structure and Implementation" icon={Briefcase}>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>4.1 Training Modules/Areas of Coverage</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">The Academy will offer structured training modules covering:</p>
                                <div className="space-y-4">
                                    <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                        <h4 className="font-bold text-lg mb-2" style={{ color: '#021d49' }}>Academic Writing Mastery</h4>
                                        <p className="text-gray-700 leading-relaxed">Research design, manuscript preparation, and journal selection strategies.</p>
                                    </div>
                                    <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                        <h4 className="font-bold text-lg mb-2" style={{ color: '#021d49' }}>Navigating the Publishing Process</h4>
                                        <p className="text-gray-700 leading-relaxed">Responding to peer reviews, addressing editorial feedback, and avoiding predatory journals.</p>
                                    </div>
                                    <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                        <h4 className="font-bold text-lg mb-2" style={{ color: '#021d49' }}>Research Impact and Open Science</h4>
                                        <p className="text-gray-700 leading-relaxed">Open-access publishing, research metrics, and increasing global visibility.</p>
                                    </div>
                                    <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                        <h4 className="font-bold text-lg mb-2" style={{ color: '#021d49' }}>Science Communication for Policy Impact</h4>
                                        <p className="text-gray-700 leading-relaxed">Writing policy briefs, media engagement, and storytelling for non-academic audiences.</p>
                                    </div>
                                    <div className="p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                        <h4 className="font-bold text-lg mb-2" style={{ color: '#021d49' }}>Ethical Publishing and Research Integrity</h4>
                                        <p className="text-gray-700 leading-relaxed">Plagiarism prevention, data transparency, and responsible authorship.</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>4.2 Incentives and Continued Engagement</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    To foster sustained engagement, motivation, and long-term value for participants, the ARIN Publishing Academy will integrate a suite of incentive mechanisms and post-training opportunities. These include:
                                </p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Certification and Recognition: Participants will receive certificates upon completion of specific training modules, providing formal recognition of their acquired skills and improving their professional profiles.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Career Development Pathways: The Academy will explore partnerships to connect graduates with relevant funding calls, research fellowships, and academic opportunities to further their research and publishing goals.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Alumni Network: A vibrant alumni community will be established to facilitate peer learning, collaborative research, and continued mentorship among Academy graduates across Africa and beyond.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Research Competitions and Awards: Competitive recognition mechanisms, such as awards for outstanding policy briefs, journal articles, or op-eds, will be introduced to promote excellence and practical application of learning.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>4.3 Training Schedule</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Our proposed training modules will be covered in a period of Two Months for fast paced learning and up to Three Months for part-time learning. We propose 2-hour evening sessions (3-5 pm ET) on Tuesdays with flexibility depending on the availability of candidates (Quorum). The proposed training schedule is presented as follows:
                                </p>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>4.4 Delivery Mechanism</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">The Academy will utilize diverse learning approaches, including:</p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Workshops and Webinars – Virtual and in-person training sessions led by experienced scholars and editors. This will be on a weekly basis.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        One-on-One Mentorship – Personalized support to guide researchers through the publishing process.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Guided Self-Paced Learning: Accessible self-paced learning platforms. This will be reviewed after every chapter.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Periodical Research Fora: Peer-to-peer discussions and evaluations. This will be on a weekly basis.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Publishing Fellowships – Select researchers will receive funding and editorial assistance to enhance their publication success rates.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Hybrid Learning Model – Combining online and in-person formats to accommodate African researchers.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Thematic writing labs and cross-sector mentorship: Tailored labs will focus on policy brief development, opinion writing, and strategy papers. Participants will be matched with mentors from academia, policy, and communications sectors to refine outputs for targeted audiences.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold mb-4 pb-2 border-b-2 inline-block" style={{ color: '#021d49', borderColor: '#00c4b3' }}>4.5 Institutional Partnerships</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">ARIN will collaborate with:</p>
                                <ul className="list-none space-y-2 ml-4">
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Universities and research institutions to integrate the Academy into existing research training programs.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        International publishers and journals to provide publishing opportunities and technical training.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Science-policy networks to ensure research outputs reach policymakers and drive impact.
                                    </li>
                                    <li className="text-gray-700 leading-relaxed">
                                        <span className="inline-block w-2 h-2 rounded-full mr-3" style={{ backgroundColor: '#00c4b3' }}></span>
                                        Funding organizations and philanthropic entities to ensure sustainability and long-term success.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Section>

                    {/* Expected Outcomes */}
                    <Section id="outcomes" title="5.0 Expected Outcomes and Impact" icon={Award}>
                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed mb-4">The Publishing Academy aims to achieve the following outcomes:</p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Increased high-quality and empirically grounded publications by African researchers in reputable journals.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Stronger research-to-policy linkages, ensuring that academic outputs inform policy decisions.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Increased engagement of African scholars with global publishing networks such as Taylor & Francis.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Enhanced global visibility of African research, contributing to decolonizing knowledge production.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Facilitate regular data management, access, and analysis of knowledge sharing capacity among empirical researchers and stakeholders.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Improve data analysis dissemination skills that will help match Africa's dynamic research reporting landscape.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Strengthened mentorship and scholarly networks, fostering long-term collaborations.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl shadow-lg border-l-4 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Institutionalization of evidence-based policymaking, supporting Africa's development agenda.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl shadow-lg border-l-4 md:col-span-2 hover:scale-105 transition-transform duration-300" style={{ borderColor: '#00c4b3', backgroundColor: 'white' }}>
                                    <p className="text-gray-700 leading-relaxed font-medium">
                                        Greater influence of African research on policy and decision-making processes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Funding and Sustainability */}
                    <Section id="funding" title="6.0 Funding and Sustainability" icon={Users}>
                        <div className="space-y-4">
                            <p className="text-gray-700 leading-relaxed mb-4">The Academy will adopt a multi-pronged approach to funding:</p>
                            <div className="space-y-4">
                                <div className="p-6 rounded-xl flex items-start gap-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#00c4b3' }}>1</div>
                                    <p className="text-gray-700 leading-relaxed">
                                        ARIN Mini-grants and Mentorship Scheme will support early-career researchers with funding and mentorship to develop high-quality publications.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl flex items-start gap-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#00c4b3' }}>2</div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Grants from international donors and development agencies support knowledge production in Africa.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl flex items-start gap-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#00c4b3' }}>3</div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Institutional partnerships with universities and research bodies, integrating the Academy into their training programs.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl flex items-start gap-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#00c4b3' }}>4</div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Fee-based training models offering specialized data management, analysis, and publishing workshops for institutions and individuals.
                                    </p>
                                </div>
                                <div className="p-6 rounded-xl flex items-start gap-4 shadow-md hover:shadow-lg transition-all duration-300 border-l-4" style={{ backgroundColor: 'white', borderColor: '#00c4b3' }}>
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#00c4b3' }}>5</div>
                                    <p className="text-gray-700 leading-relaxed">
                                        Corporate and philanthropic sponsorships, leveraging private sector support for research and data analysis capacity-building initiatives.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    {/* Conclusion */}
                    <div className="mt-12 p-8 rounded-2xl shadow-2xl relative overflow-hidden" style={{ backgroundColor: '#021d49' }}>
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'radial-gradient(circle at 20% 50%, #00c4b3 0%, transparent 50%), radial-gradient(circle at 80% 80%, #039e8e 0%, transparent 50%)'
                            }}></div>
                        </div>
                        <div className="relative z-10">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#00c4b3' }}>
                                    <BookOpen className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-white text-center mb-4">Conclusion</h3>
                            <p className="text-gray-100 leading-relaxed text-center text-lg">
                                In conclusion, the ARIN Publishing Academy is a critical intervention to enhance research excellence, strengthen the science-policy interface, and promote Africa-led knowledge production. The Academy will contribute significantly to evidence-informed policymaking, academic growth, and sustainable development across Africa by equipping researchers with the skills and opportunities needed for successful publishing and results dissemination.
                            </p>
                        </div>
                    </div>
                </div>


            </div>
            <Footer />

        </>
    );
};

export default ARINPublishingAcademy;