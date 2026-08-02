import React from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { API_CONFIG } from '@/lib/apiConfig';

interface ProjectSummary {
    _id: string;
    title: string;
    description?: string;
    category?: string;
    date?: string;
    coverImage?: string;
}

interface RelatedProjectsProps {
    allProjects: ProjectSummary[];
    currentId: string;
    category?: string;
    limit?: number;
}

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, '');
const truncate = (text: string, max: number) =>
    text.length <= max ? text : text.slice(0, max).replace(/\s+\S*$/, '') + '…';
const buildImageUrl = (img?: string) => {
    if (!img) return '';
    return img.startsWith('http') ? img : `${API_CONFIG.BASE_URL}${img}`;
};

export default function RelatedProjects({ allProjects, currentId, category, limit = 3 }: RelatedProjectsProps) {
    const candidates = allProjects.filter((p) => p._id !== currentId);

    const sameCategory = category ? candidates.filter((p) => p.category === category) : [];
    const rest = candidates
        .filter((p) => !sameCategory.includes(p))
        .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());

    const related = [...sameCategory, ...rest].slice(0, limit);

    if (related.length === 0) return null;

    return (
        <section>
            <div className="max-w-6xl mx-auto px-6 py-10 sm:py-12">
                <SectionHeading eyebrow="Keep Exploring" title="Related Projects" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {related.map((project) => {
                        const imageUrl = buildImageUrl(project.coverImage);
                        return (
                            <a
                                key={project._id}
                                href={`/programs/research-projects/${project._id}`}
                                className="group flex flex-col h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-blue-200 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                            >
                                {imageUrl ? (
                                    <div className="h-36 w-full overflow-hidden bg-gray-100">
                                        <img src={imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                ) : (
                                    <div className="h-36 w-full bg-linear-to-br from-[#021d49]/5 to-[#021d49]/10 flex items-center justify-center">
                                        <FileText className="w-10 h-10 text-[#021d49]/30" />
                                    </div>
                                )}
                                <div className="p-5 flex flex-col flex-1">
                                    {project.category && (
                                        <span className="inline-block w-fit px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-blue-50 text-[#021d49] mb-2.5">
                                            {project.category}
                                        </span>
                                    )}
                                    <h3 className="font-semibold text-gray-900 leading-snug mb-1.5 line-clamp-2">{project.title}</h3>
                                    {project.description && (
                                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                                            {truncate(stripHtml(project.description), 110)}
                                        </p>
                                    )}
                                    <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-[#021d49] group-hover:gap-2.5 transition-all">
                                        View Project <ArrowRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
