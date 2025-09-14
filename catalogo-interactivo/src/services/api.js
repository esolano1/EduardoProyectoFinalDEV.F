// src/services/api.js
const BASE = import.meta.env.VITE_API_BASE || 'https://fakestoreapi.com';

export async function api(path, init) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status} ${res.statusText}`);
  }
  return res.json();
}
