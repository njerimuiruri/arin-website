"use client";
import React, { useMemo, useState } from 'react';
import {
    ArrowUpRight, Building2, ChevronDown, ChevronRight, Cpu, Factory, FolderOpen,
    Globe2, HeartPulse, Search, Trees, Wheat, X, Zap,
} from 'lucide-react';
import {
    ProjectSummary,
    groupByArea,
    isOngoing,
    projectPeriod,
    sortProjects,
} from '@/lib/researchProjects';

const LIST_HREF = '/programs/research-projects';
const projectHref = (id: string) => `${LIST_HREF}/${id}`;
const areaHref = (slug: string) => `${LIST_HREF}?area=${slug}`;

const AREA_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    'climate-change-energy': Zap,
    'climate-health': HeartPulse,
    'cities-resilience': Building2,
    'technology-innovation': Cpu,
    'sustainable-development': Globe2,
    'agriculture-forestry': Wheat,
    'forests-ecosystems': Trees,
    'mining-trade-industry': Factory,
};

// Max projects shown per focus area in the mobile accordion before "See all".
const MOBILE_AREA_LIMIT = 5;

type Props = { projects: ProjectSummary[]; loading: boolean };

function useProjectSearch(projects: ProjectSummary[]) {
    const [term, setTerm] = useState('');
    const results = useMemo(() => {
        const q = term.trim().toLowerCase();
        return q ? sortProjects(projects.filter((p) => p.title.toLowerCase().includes(q))) : [];
    }, [projects, term]);
    return { term, setTerm, results, searching: term.trim().length > 0 };
}

function StatusBadge({ project }: { project: ProjectSummary }) {
    const period = projectPeriod(project);
    if (isOngoing(project)) {
        return (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {period || 'Ongoing'}
            </span>
        );
    }
    return period ? <span className="text-[11px] text-gray-400">{period}</span> : null;
}

function SearchBox({ term, setTerm, compact }: { term: string; setTerm: (v: string) => void; compact?: boolean }) {
    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search research projects..."
                className={`w-full pl-9 pr-9 ${compact ? 'py-2 text-[13px]' : 'py-2 text-sm'} border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#021d49]/20 focus:border-[#021d49] transition-colors`}
            />
            {term && (
                <button
                    onClick={() => setTerm('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
}

/** Desktop mega-menu: every project at once; each focus area is a full-width row of projects. Search filters in place. */
export function ResearchMegaMenu({ projects, loading }: Props) {
    const [term, setTerm] = useState('');
    const q = term.trim().toLowerCase();
    const groups = useMemo(
        () => groupByArea(q ? projects.filter((p) => p.title.toLowerCase().includes(q)) : projects),
        [projects, q],
    );
    const shown = groups.reduce((n, g) => n + g.projects.length, 0);
    // With a single group (e.g. no focus areas assigned yet) the heading adds nothing.
    const showHeadings = groups.length > 1;
    const ongoingCount = projects.filter(isOngoing).length;

    if (loading) return <div className="py-10 text-center text-sm text-gray-400">Loading projects...</div>;
    if (projects.length === 0) return <div className="py-10 text-center text-sm text-gray-400">No research projects published yet.</div>;

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-gray-100">
                <div>
                    <h3 className="text-lg font-bold text-[#021d49]">All Research Projects</h3>
                    <p className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
                        <span>{projects.length} projects{showHeadings && ` · ${groups.length} focus areas`}</span>
                        {ongoingCount > 0 && (
                            <span className="inline-flex items-center gap-1.5 text-emerald-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {ongoingCount} ongoing
                            </span>
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-80"><SearchBox term={term} setTerm={setTerm} /></div>
                    <a href={LIST_HREF} className="flex items-center gap-1 text-sm font-semibold text-[#021d49] hover:text-blue-700 whitespace-nowrap">
                        Open projects page
                        <ChevronRight className="w-4 h-4" />
                    </a>
                </div>
            </div>

            {shown === 0 ? (
                <p className="py-8 text-center text-sm text-gray-400">No projects match &quot;{term.trim()}&quot;.</p>
            ) : (
                <div className="max-h-[62vh] overflow-y-auto pr-2 space-y-6">
                    {groups.map(({ area, projects: list }) => {
                        const AreaIcon = AREA_ICONS[area.slug] ?? FolderOpen;
                        return (
                            <section key={area.slug}>
                                {showHeadings && (
                                    <div className="flex items-center justify-between gap-4 mb-3">
                                        <h4 className="flex items-center gap-2.5 text-[14px] font-bold text-[#021d49]">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#021d49] text-white">
                                                <AreaIcon className="w-3.5 h-3.5" />
                                            </span>
                                            {area.name}
                                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-500">{list.length}</span>
                                        </h4>
                                        <span className="flex-1 h-px bg-gray-100" />
                                        <a href={areaHref(area.slug)} className="flex items-center gap-0.5 text-xs font-semibold text-[#021d49] hover:text-blue-700 whitespace-nowrap">
                                            View all <ChevronRight className="w-3.5 h-3.5" />
                                        </a>
                                    </div>
                                )}
                                <ul className="grid grid-cols-4 gap-3">
                                    {list.map((p) => {
                                        const period = projectPeriod(p);
                                        return (
                                            <li key={p._id}>
                                                <a
                                                    href={projectHref(p._id)}
                                                    className="group/proj flex h-full flex-col justify-between gap-2 rounded-xl border border-gray-100 bg-gray-50/70 px-3.5 py-3 transition-all hover:border-[#021d49]/25 hover:bg-white hover:shadow-md"
                                                >
                                                    <span className="text-[13px] font-medium text-gray-800 group-hover/proj:text-[#021d49] leading-snug line-clamp-2" title={p.title}>
                                                        {p.title}
                                                    </span>
                                                    <span className="flex items-center justify-between gap-2 text-[11px]">
                                                        <span className="text-gray-400">{period}</span>
                                                        {isOngoing(p) ? (
                                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Ongoing
                                                            </span>
                                                        ) : (
                                                            <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover/proj:text-[#021d49] transition-colors" />
                                                        )}
                                                    </span>
                                                </a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

/** Mobile: search, then focus areas as an accordion. */
export function ResearchMobileMenu({ projects, loading }: Props) {
    const groups = useMemo(() => groupByArea(projects), [projects]);
    const [openSlug, setOpenSlug] = useState<string | null>(null);
    const { term, setTerm, results, searching } = useProjectSearch(projects);

    const linkClass = 'block px-3 py-2 text-[12px] sm:text-[13px] text-gray-700 hover:bg-gray-50 hover:text-[#021d49] rounded-lg touch-manipulation';

    return (
        <div className="ml-2 mt-1 space-y-0.5 animate-fadeIn">
            <a href={LIST_HREF} className="block px-3 py-2 text-[13px] sm:text-[14px] font-semibold text-[#021d49] rounded-lg hover:bg-gray-50">
                View all projects →
            </a>
            <div className="px-3 py-1.5">
                <SearchBox term={term} setTerm={setTerm} compact />
            </div>
            {loading && <div className="px-3 py-2 text-[12px] text-gray-400">Loading projects...</div>}
            {!loading && projects.length === 0 && (
                <div className="px-3 py-2 text-[12px] text-gray-400">No research projects published yet.</div>
            )}
            {!loading && searching && (
                <div className="max-h-[40vh] overflow-y-auto">
                    {results.length === 0 ? (
                        <div className="px-3 py-2 text-[12px] text-gray-400">No projects match &quot;{term.trim()}&quot;.</div>
                    ) : results.map((p) => (
                        <a key={p._id} href={projectHref(p._id)} className={`${linkClass} line-clamp-2`}>{p.title}</a>
                    ))}
                </div>
            )}
            {!loading && !searching && groups.map(({ area, projects: list }) => (
                <div key={area.slug}>
                    <button
                        onClick={() => setOpenSlug(openSlug === area.slug ? null : area.slug)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-[13px] sm:text-[14px] text-gray-700 rounded-lg hover:bg-gray-50 touch-manipulation"
                    >
                        <span>{area.name} <span className="text-gray-400">({list.length})</span></span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${openSlug === area.slug ? 'rotate-180' : ''}`} />
                    </button>
                    {openSlug === area.slug && (
                        <div className="ml-3 mb-1 border-l border-gray-100 animate-fadeIn">
                            {list.slice(0, MOBILE_AREA_LIMIT).map((p) => (
                                <a key={p._id} href={projectHref(p._id)} className={linkClass}>
                                    <span className="line-clamp-2">{p.title}</span>
                                    <StatusBadge project={p} />
                                </a>
                            ))}
                            <a href={areaHref(area.slug)} className="block px-3 py-2 text-[12px] sm:text-[13px] font-semibold text-[#021d49]">
                                {list.length > MOBILE_AREA_LIMIT ? `See all ${list.length} →` : `View ${area.name} →`}
                            </a>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
