const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const itemRoutes = require('./routes/itemRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/items', itemRoutes);
app.use('/api/auth', authRoutes); 

app.use(cors({
  origin: ["http://localhost:5173", "https://warranty-vault-kappa.vercel.app"],
  credentials: true
}));

if (!process.env.MONGO_URI) {
  console.error("FATAL ERROR: MONGO_URI is missing in .env file");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected Successfully'))
    .catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.get('/', (req, res) => {
    res.send('WarrantyVault API is Running');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});