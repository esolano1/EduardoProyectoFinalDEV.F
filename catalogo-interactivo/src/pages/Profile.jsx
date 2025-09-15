import { useAuth } from "../auth/AuthContext";

export default function Profile() {
  const { user, token, logout } = useAuth();
  return (
    <main style={{ padding: 24 }}>
      <h1>Perfil</h1>
      <p><b>Usuario:</b> {user?.username}</p>
      <p><b>Token:</b> {token?.slice(0, 24)}...</p>
      <button onClick={logout}>Cerrar sesión</button>
    </main>
  );
}
