// services/callForBooksService.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.demo.arin-africa.org/api/call-for-books";

export async function getAllCalls() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch calls");
    return res.json();
}

export async function getCallById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch call");
    return res.json();
}
