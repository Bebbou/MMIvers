import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import api from "../api/index.js";
import styles from "./Admin.module.css";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
  }, []);

  async function handleValider(id) {
    await api.patch(`/admin/users/${id}/valider`);
    setUsers(users.map(u => u.id === id ? { ...u, valide: true } : u));
  }

  async function handleRole(id, role) {
    await api.patch(`/admin/users/${id}/role`, { role });
    setUsers(users.map(u => u.id === id ? { ...u, role } : u));
  }

  const enAttente = users.filter(u => !u.valide);
  const valides = users.filter(u => u.valide);

  return (
    <Layout>
      <div className={styles.page}>
        <h1>Panel Admin</h1>

        {enAttente.length > 0 && (
          <section>
            <h2 className={styles.sectionTitle}>En attente de validation ({enAttente.length})</h2>
            <div className={styles.list}>
              {enAttente.map(u => (
                <div key={u.id} className={`${styles.card} ${styles.pending}`}>
                  <div className={styles.info}>
                    <span className={styles.nom}>{u.nom}</span>
                    <span className={styles.email}>{u.email}</span>
                    <span className={styles.groupe}>{u.groupe?.nom}</span>
                  </div>
                  <button className={styles.validateBtn} onClick={() => handleValider(u.id)}>
                    ✓ Valider
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className={styles.sectionTitle}>Utilisateurs actifs ({valides.length})</h2>
          <div className={styles.list}>
            {valides.map(u => (
              <div key={u.id} className={styles.card}>
                <div className={styles.info}>
                  <span className={styles.nom}>{u.nom}</span>
                  <span className={styles.email}>{u.email}</span>
                  <span className={styles.groupe}>{u.groupe?.nom}</span>
                </div>
                <select
                  className={styles.roleSelect}
                  value={u.role}
                  onChange={e => handleRole(u.id, e.target.value)}
                >
                  <option value="etudiant">Étudiant</option>
                  <option value="delegue">Délégué</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
