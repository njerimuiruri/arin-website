const BASE_URL = "http://localhost:5001/api/capacity-building";

export async function getCapacityProjects() {
  const res = await fetch(BASE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch capacity building projects');
  return res.json();
}

export async function getCapacityProject(id: string) {
  const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch capacity building project');
  return res.json();
}
