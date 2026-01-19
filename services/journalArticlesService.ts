const BASE_URL = "http://localhost:5001/journal-articles";

export async function getJournalArticles() {
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch journal articles');
  return res.json();
}

export async function getJournalArticle(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch journal article');
  return res.json();
}
