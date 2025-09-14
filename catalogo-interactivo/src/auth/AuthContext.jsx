import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const isAuth = !!token;

  const login = async ({ username, password }) => {
    // Fake Store API: retorna token con username/password válidos (ej: mor_2314 / 83r5^_)
    // POST https://fakestoreapi.com/auth/login  { username, password }
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) throw new Error("Credenciales inválidas");
    const data = await res.json(); // { token: '...' }
    localStorage.setItem("token", data.token);
    setToken(data.token);

    // (Opcional) setear un “usuario” simple para UI
    const minimalUser = { username };
    localStorage.setItem("user", JSON.stringify(minimalUser));
    setUser(minimalUser);
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
