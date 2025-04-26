import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';
import questionRoutes from './routes/Questions.route.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express()
app.use(cors());
app.use(express.json())

app.use("/api/Questions", questionRoutes)

app.listen(PORT, ()=> {
    connectDB()
    console.log("Server started at http://localhost:"+PORT);
});

