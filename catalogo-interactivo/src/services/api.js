// src/services/api.js
const BASE = import.meta.env.VITE_API_BASE || "https://fakestoreapi.com";
const DEFAULT_TIMEOUT_MS = 10000;

function withTimeout(promise, ms = DEFAULT_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("Tiempo de espera agotado")), ms);
    promise
      .then((res) => { clearTimeout(id); resolve(res); })
      .catch((err) => { clearTimeout(id); reject(err); });
  });
}

export async function api(path, init) {
  try {
    const res = await withTimeout(
      fetch(`${BASE}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...init,
      })
    );

    if (!res.ok) {
      let msg = `Error ${res.status}`;
      try {
        const data = await res.json();
        if (data?.error) msg = data.error;
      } catch {}
      throw new Error(msg);
    }

    return res.json();
  } catch (err) {
    // Normaliza mensajes
    if (err?.message?.includes("Failed to fetch")) {
      throw new Error("No se pudo conectar con el servidor.");
    }
    throw err;
  }
}
