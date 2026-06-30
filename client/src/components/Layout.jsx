import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Layout.module.css";

const navItems = [
  { to: "/dashboard", label: "Accueil", icon: "🏠" },
  { to: "/devoirs", label: "Devoirs", icon: "📚" },
  { to: "/notes", label: "Notes", icon: "📊" },
  { to: "/edt", label: "EDT", icon: "📅" },
  { to: "/profil", label: "Profil", icon: "👤" },
];

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>MMIvers</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>{user?.nom}</span>
          <span className={styles.userGroupe}>{user?.groupe}</span>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ""}`
              }
            >
              <span>⚙️</span>
              Admin
            </NavLink>
          )}
        </nav>
        <button className={styles.logout} onClick={handleLogout}>
          Déconnexion
        </button>
      </aside>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
