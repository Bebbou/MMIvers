import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import styles from "./Dashboard.module.css";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      <div className={styles.page}>
        <h1>Bonjour, {user?.nom} 👋</h1>
        <p className={styles.subtitle}>Groupe {user?.groupe}</p>
        <div className={styles.cards}>
          <div className={styles.card}>
            <span>📚</span>
            <p>Devoirs à venir</p>
          </div>
          <div className={styles.card}>
            <span>📊</span>
            <p>Mes notes</p>
          </div>
          <div className={styles.card}>
            <span>📅</span>
            <p>Emploi du temps</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
