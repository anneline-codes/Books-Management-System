const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bookRoutes = require('./routes/books');

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(express.json()); // parse incoming JSON request bodies

// ── Connect to MongoDB ──────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1); // exit if DB fails — no point running without it
  });

// ── Routes ──────────────────────────────────────────────────
app.use('/api/books', bookRoutes);

// ── Health check ────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: "Welcome to Mugisha's Bookstore API 📚" });
});

// ── 404 handler for unknown routes ─────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// ── Start server ────────────────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
