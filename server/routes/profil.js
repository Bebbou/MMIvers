import { Router } from "express";
import bcrypt from "bcryptjs";
import prisma from "../db.js";
import { requireAuth } from "../middlewares/auth.js";

const router = Router();

// PATCH /profil/password — change le mot de passe
router.patch("/password", requireAuth, async (req, res) => {
  const { actuel, nouveau } = req.body;
  if (!actuel || !nouveau) {
    return res.status(400).json({ error: "Les deux champs sont requis." });
  }
  if (nouveau.length < 6) {
    return res.status(400).json({ error: "Le nouveau mot de passe doit faire au moins 6 caractères." });
  }

  const user = await prisma.user.findUnique({ where: { id: req.user.id } });
  const ok = await bcrypt.compare(actuel, user.password);
  if (!ok) return res.status(401).json({ error: "Mot de passe actuel incorrect." });

  const hash = await bcrypt.hash(nouveau, 10);
  await prisma.user.update({ where: { id: req.user.id }, data: { password: hash } });

  res.json({ message: "Mot de passe mis à jour." });
});

export default router;
