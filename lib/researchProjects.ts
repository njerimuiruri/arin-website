// Shared helpers for grouping research projects by ARIN focus area.
// `category` on a project holds the focus area name (set in the dashboard).

export const FOCUS_AREAS = [
    { name: 'Climate Change & Energy', slug: 'climate-change-energy' },
    { name: 'Climate and Health', slug: 'climate-health' },
    { name: 'Cities & Resilience', slug: 'cities-resilience' },
    { name: 'Technology & Innovation', slug: 'technology-innovation' },
    { name: 'Sustainable Development', slug: 'sustainable-development' },
    { name: 'Agriculture & Forestry', slug: 'agriculture-forestry' },
    { name: 'Forests & Ecosystems', slug: 'forests-ecosystems' },
    { name: 'Mining, Trade & Industry', slug: 'mining-trade-industry' },
] as const;

export const OTHER_AREA = { name: 'Other Projects', slug: 'other' } as const;

export type FocusArea = { name: string; slug: string };

export type ProjectSummary = {
    _id: string;
    title: string;
    category?: string;
    status?: 'ongoing' | 'completed' | string | null;
    date?: string;
    endYear?: number | null;
};

export const isOngoing = (p: ProjectSummary) => p.status === 'ongoing';

export const areaOf = (p: ProjectSummary): FocusArea =>
    FOCUS_AREAS.find((a) => a.name === p.category) ?? OTHER_AREA;

export const areaBySlug = (slug: string | null | undefined): FocusArea | undefined =>
    [...FOCUS_AREAS, OTHER_AREA].find((a) => a.slug === slug);

const startYear = (p: ProjectSummary) => (p.date ? new Date(p.date).getFullYear() : null);

/** "2021 – 2023", "2024 – Present", "2022", or "" when unknown. */
export function projectPeriod(p: ProjectSummary): string {
    const start = startYear(p);
    if (!start) return '';
    // Some older entries store a publish date later than the recorded end year.
    if (p.endYear && p.endYear < start) return `${p.endYear}`;
    if (isOngoing(p)) return p.endYear ? `${start} – ${p.endYear}` : `${start} – Present`;
    if (p.endYear && p.endYear !== start) return `${start} – ${p.endYear}`;
    return `${start}`;
}

/** Ongoing first, then most recent start date. */
export function sortProjects<T extends ProjectSummary>(list: T[]): T[] {
    return [...list].sort((a, b) => {
        if (isOngoing(a) !== isOngoing(b)) return isOngoing(a) ? -1 : 1;
        const da = a.date ? new Date(a.date).getTime() : 0;
        const db = b.date ? new Date(b.date).getTime() : 0;
        return db - da;
    });
}

/** Focus areas that have at least one project, each with its sorted projects. */
export function groupByArea<T extends ProjectSummary>(list: T[]): { area: FocusArea; projects: T[] }[] {
    return [...FOCUS_AREAS, OTHER_AREA]
        .map((area) => ({ area, projects: sortProjects(list.filter((p) => areaOf(p).slug === area.slug)) }))
        .filter((g) => g.projects.length > 0);
}
