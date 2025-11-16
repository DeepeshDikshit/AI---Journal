import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js";

// ESM Fix for __dirname + path
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/journal', journalRoutes);

// Static Files (Frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Connect to DB
connectDB();

// Default route
app.get('/', (req, res) => {
  res.send("API is running....");
});

// For React/Frontend Routing
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
