export async function getProtectedData(token) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/some/protected`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error("No autorizado");
  return res.json();
}
