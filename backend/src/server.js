import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js"
const path = require('path');


dotenv.config()
const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use("/api/journal",journalRoutes)
app.use(express.static(path.join(__dirname, '../public')))

//connect to mongodb

connectDB()

app.get('/',(req,res)=>{
  res.send("API is running....")
})

app.get("*name", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

//ports where the srevr runs
app.listen(5000,()=>{
  console.log("server is running on port 5000");
})