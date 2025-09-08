const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require("crypto");
const pool = require("./db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Crear nueva ficha: devuelve slug (uuid) para grabar en el NFC
app.post("/api/ficha", async (req, res) => {
  const { nombre, telefono, hospital, condiciones } = req.body;
  const slug = crypto.randomUUID();
  try {
    const [result] = await pool.query(
      "INSERT INTO fichas (slug, nombre, telefono, hospital, condiciones) VALUES (?, ?, ?, ?, ?)",
      [slug, nombre, telefono, hospital, condiciones]
    );
    res.json({ id: result.insertId, slug, nombre, telefono, hospital, condiciones });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener ficha por slug
app.get("/api/ficha/:slug", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM fichas WHERE slug = ?", [req.params.slug]);
    if (rows.length === 0) return res.status(404).json({ error: "Ficha no encontrada" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar ficha por slug
app.put("/api/ficha/:slug", async (req, res) => {
  const { nombre, telefono, hospital, condiciones } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE fichas SET nombre=?, telefono=?, hospital=?, condiciones=? WHERE slug=?",
      [nombre, telefono, hospital, condiciones, req.params.slug]
    );
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Backend FindMe escuchando en http://localhost:${PORT}`);
});
