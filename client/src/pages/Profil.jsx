import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import api from "../api/index.js";
import styles from "./Profil.module.css";

export default function Profil() {
  const { user } = useAuth();
  const [form, setForm] = useState({ actuel: "", nouveau: "", confirmation: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage(null);

    if (form.nouveau !== form.confirmation) {
      return setError("Les nouveaux mots de passe ne correspondent pas.");
    }

    try {
      const { data } = await api.patch("/profil/password", {
        actuel: form.actuel,
        nouveau: form.nouveau,
      });
      setMessage(data.message);
      setForm({ actuel: "", nouveau: "", confirmation: "" });
    } catch (err) {
      setError(err.response?.data?.error ?? "Erreur lors de la mise à jour.");
    }
  }

  return (
    <Layout>
      <div className={styles.page}>
        <h1>Mon profil</h1>

        <div className={styles.infoCard}>
          <div className={styles.infoRow}>
            <span className={styles.label}>Nom</span>
            <span>{user?.nom}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Groupe</span>
            <span className={styles.groupe}>{user?.groupe}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.label}>Rôle</span>
            <span className={styles.role}>{user?.role}</span>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Changer le mot de passe</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              name="actuel"
              type="password"
              placeholder="Mot de passe actuel"
              value={form.actuel}
              onChange={handleChange}
              required
            />
            <input
              name="nouveau"
              type="password"
              placeholder="Nouveau mot de passe (6 caractères min.)"
              value={form.nouveau}
              onChange={handleChange}
              required
            />
            <input
              name="confirmation"
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              value={form.confirmation}
              onChange={handleChange}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            {message && <p className={styles.success}>{message}</p>}
            <button type="submit">Mettre à jour</button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
