import { MetadataRoute } from "next";

const BASE_URL = "https://arin-africa.org";

const staticRoutes: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { url: "/", priority: 1.0, changeFrequency: "daily" },
  // About
  { url: "/about-us/mission", priority: 0.9, changeFrequency: "monthly" },
  { url: "/about-us/secretariat", priority: 0.8, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas", priority: 0.8, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas/agriculture-forestry", priority: 0.7, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas/cities-resilience", priority: 0.7, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas/climate-change-energy", priority: 0.7, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas/climate-health", priority: 0.7, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas/forests-ecosystems", priority: 0.7, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas/mining-trade-industry", priority: 0.7, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas/sustainable-development", priority: 0.7, changeFrequency: "monthly" },
  { url: "/about-us/focus-areas/technology-innovation", priority: 0.7, changeFrequency: "monthly" },
  // Programs
  { url: "/programs/research-projects", priority: 0.9, changeFrequency: "weekly" },
  { url: "/programs/capacity-building", priority: 0.9, changeFrequency: "weekly" },
  // Press
  { url: "/press/impact-stories", priority: 0.9, changeFrequency: "weekly" },
  { url: "/press/journal-articles", priority: 0.9, changeFrequency: "weekly" },
  { url: "/press/working-papers", priority: 0.8, changeFrequency: "weekly" },
  { url: "/press/technical-reports", priority: 0.8, changeFrequency: "weekly" },
  { url: "/press/books", priority: 0.8, changeFrequency: "monthly" },
  { url: "/press/policy-briefs", priority: 0.8, changeFrequency: "weekly" },
  { url: "/press/news-briefs", priority: 0.8, changeFrequency: "daily" },
  { url: "/press/newsletters", priority: 0.7, changeFrequency: "weekly" },
  { url: "/press/annual-reports", priority: 0.7, changeFrequency: "yearly" },
  { url: "/press/blog", priority: 0.8, changeFrequency: "daily" },
  // Convening Platforms
  { url: "/convening-platforms/conferences", priority: 0.9, changeFrequency: "weekly" },
  { url: "/convening-platforms/events", priority: 0.9, changeFrequency: "daily" },
  { url: "/convening-platforms/policy-dialogues", priority: 0.8, changeFrequency: "weekly" },
  { url: "/convening-platforms/cop", priority: 0.8, changeFrequency: "weekly" },
  // Opportunities
  { url: "/opportunities/vacancies", priority: 0.9, changeFrequency: "daily" },
  { url: "/opportunities/csr", priority: 0.8, changeFrequency: "weekly" },
  // Other
  { url: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { url: "/media", priority: 0.7, changeFrequency: "weekly" },
  { url: "/fellowship/about", priority: 0.8, changeFrequency: "monthly" },
];

async function fetchIds(endpoint: string): Promise<string[]> {
  try {
    const res = await fetch(`https://api.arin-africa.org/api${endpoint}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const items = Array.isArray(data) ? data : data.data || data.results || [];
    return items.map((item: { _id?: string; id?: string }) => item._id || item.id).filter(Boolean);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Fetch dynamic IDs in parallel
  const [
    researchIds,
    capacityIds,
    impactIds,
    journalIds,
    workingPaperIds,
    technicalReportIds,
    bookIds,
    policyBriefIds,
    newsBriefIds,
    newsletterIds,
    conferenceIds,
    eventIds,
    policyDialogueIds,
    copIds,
    vacancyIds,
    csrIds,
  ] = await Promise.all([
    fetchIds("/research-projects"),
    fetchIds("/capacity-building"),
    fetchIds("/impact-stories"),
    fetchIds("/journal-articles"),
    fetchIds("/working-paper-series"),
    fetchIds("/technical-reports"),
    fetchIds("/books"),
    fetchIds("/policy-briefs"),
    fetchIds("/news-briefs"),
    fetchIds("/newsletters"),
    fetchIds("/conferences"),
    fetchIds("/events"),
    fetchIds("/policy-dialogues"),
    fetchIds("/cop"),
    fetchIds("/vacancies"),
    fetchIds("/csr"),
  ]);

  const dynamicEntries: MetadataRoute.Sitemap = [
    ...researchIds.map((id) => ({ url: `${BASE_URL}/programs/research-projects/${id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...capacityIds.map((id) => ({ url: `${BASE_URL}/programs/capacity-building/${id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...impactIds.map((id) => ({ url: `${BASE_URL}/press/impact-stories/${id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...journalIds.map((id) => ({ url: `${BASE_URL}/press/journal-articles/${id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...workingPaperIds.map((id) => ({ url: `${BASE_URL}/press/working-papers/${id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...technicalReportIds.map((id) => ({ url: `${BASE_URL}/press/technical-reports/${id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...bookIds.map((id) => ({ url: `${BASE_URL}/press/books/${id}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...policyBriefIds.map((id) => ({ url: `${BASE_URL}/press/policy-briefs/${id}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...newsBriefIds.map((id) => ({ url: `${BASE_URL}/press/news-briefs/${id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...newsletterIds.map((id) => ({ url: `${BASE_URL}/press/newsletters/${id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.5 })),
    ...conferenceIds.map((id) => ({ url: `${BASE_URL}/convening-platforms/conferences/${id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...eventIds.map((id) => ({ url: `${BASE_URL}/convening-platforms/events/${id}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.7 })),
    ...policyDialogueIds.map((id) => ({ url: `${BASE_URL}/convening-platforms/policy-dialogues/${id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...copIds.map((id) => ({ url: `${BASE_URL}/convening-platforms/cop/${id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...vacancyIds.map((id) => ({ url: `${BASE_URL}/opportunities/vacancies/${id}`, lastModified: now, changeFrequency: "daily" as const, priority: 0.7 })),
    ...csrIds.map((id) => ({ url: `${BASE_URL}/opportunities/csr/${id}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE_URL}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  return [...staticEntries, ...dynamicEntries];
}
