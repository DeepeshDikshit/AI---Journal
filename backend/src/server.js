import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from "./db/db.js";
import authRoutes from "./routes/authRoutes.js";
import journalRoutes from "./routes/journalRoutes.js"




dotenv.config()
const app = express();

//middlewares
app.use(cors())
app.use(express.json());
app.use('/api/auth',authRoutes)
app.use("/api/journal",journalRoutes)

//connect to mongodb

connectDB()

app.get('/',(req,res)=>{
  res.send("API is running....")
})

//ports where the srevr runs
app.listen(5000,()=>{
  console.log("server is running on port 5000");
})