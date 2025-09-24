// src/auth/AuthContext.jsx
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  const isAuth = !!token;

  // ✅ Base absoluta con fallback (evita 405 en Vercel)
  const BASE = import.meta.env.VITE_API_BASE || "https://fakestoreapi.com";

  const login = async ({ username, password }) => {
    const res = await fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: String(username).trim(),
        password: String(password)
      })
    });

    // Lee respuesta como texto para mostrar mensaje real si falla
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch {}

    if (!res.ok) {
      const msg = data?.error || data?.message || `Login falló (${res.status})`;
      throw new Error(msg);
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify({ username: String(username).trim() }));
    setToken(data.token);
    setUser({ username: String(username).trim() });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ isAuth, token, user, login, logout }), [isAuth, token, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
