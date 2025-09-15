// src/pages/Login.jsx
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSchema } from "../validation/schemas";
import { zodErrorsToRecord } from "../validation/utils";

export default function Login() {
  // estado del formulario
  const [username, setUsername] = useState("mor_2314");
  const [password, setPassword] = useState("83r5^_");

  // errores de validación por campo y error global (backend/red)
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/profile";

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFieldErrors({});

    // 1) Validación con Zod ANTES de llamar al backend
    const formData = { username, password };
    const parsed = loginSchema.safeParse(formData);
    if (!parsed.success) {
      setFieldErrors(zodErrorsToRecord(parsed.error));
      return;
    }

    // 2) Si pasa validación, intentar login (llamada al backend)
    try {
      setLoading(true);
      await login(formData);
      navigate(from, { replace: true });
    } catch (err) {
      // error del backend o de red
      setError(err?.message || "Error al iniciar sesión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 24, maxWidth: 420, margin: "0 auto" }}>
      <h1>Inicia sesión</h1>

      {/* Error global (backend/red) */}
      {error && (
        <div style={{ background:"#ffe6e6", border:"1px solid #ffb3b3", borderRadius:6, padding:10, marginTop:12 }}>
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <label>
          Usuario
          <input
            name="username"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            placeholder="username"
            aria-invalid={!!fieldErrors.username}
            aria-describedby={fieldErrors.username ? "err-username" : undefined}
          />
          {fieldErrors.username && (
            <small id="err-username" style={{ color: "crimson" }}>
              {fieldErrors.username}
            </small>
          )}
        </label>

        <label>
          Contraseña
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="password"
            aria-invalid={!!fieldErrors.password}
            aria-describedby={fieldErrors.password ? "err-password" : undefined}
          />
          {fieldErrors.password && (
            <small id="err-password" style={{ color: "crimson" }}>
              {fieldErrors.password}
            </small>
          )}
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
        <p style={{marginTop:8, color:"#666"}}>Demo: mor_2314 / 83r5^_</p>
      </form>
    </main>
  );
}
