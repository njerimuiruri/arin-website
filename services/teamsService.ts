const BASE_URL = "http://localhost:5001/api/teams";

export async function getTeamMembers() {
  try {
    const res = await fetch(BASE_URL, { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    return [];
  }
}
