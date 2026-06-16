const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const bookRoutes = require('./routes/books');

const app = express();

app.use(express.json()); 

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });


app.use('/api/books', bookRoutes);

app.get('/', (req, res) => {
  res.json({ message: "Welcome to Mugisha's Bookstore API 📚" });
});


app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
