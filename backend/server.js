import express from 'express';
import mongoose from 'mongoose';
import noteRoute from './Routes/noteRoute.js'
import cors from 'cors'
import process from 'process';
import dotenv from 'dotenv'
const app = express()

app.use(cors({
    origin: "https://notifyfrontend-cyan.vercel.app", // Your frontend URL
}));
dotenv.config()
app.use(express.json())
const port = process.env.PORT ||4005
const URI=process.env.MongoDbURI
try {
    mongoose.connect(URI)
        console.log('connected to db');
    } catch (error) {
        console.log(error)
    }
app.use('/api/notes',noteRoute)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
