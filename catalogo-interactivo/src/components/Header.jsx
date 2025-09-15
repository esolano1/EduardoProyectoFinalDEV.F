import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Header() {
  const { isAuth, logout } = useAuth();
  return (
    <header style={{ display:"flex", gap:16, padding:12, borderBottom:"1px solid #eee" }}>
      <Link to="/">Inicio</Link>
      <Link to="/profile">Perfil</Link>
      {isAuth ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
    </header>
  );
}
