const BASE_URL = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api/impact-stories` : "http://localhost:5001/api/impact-stories";

export async function getImpactStories() {
  const res = await fetch(BASE_URL, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch impact stories');
  return res.json();
}

export async function getImpactStory(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { credentials: 'include' });
  if (!res.ok) throw new Error('Failed to fetch impact story');
  return res.json();
}
