const BASE_URL = "http://localhost:5001/books";

export async function getBooks() {
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export async function getBook(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json();
}
