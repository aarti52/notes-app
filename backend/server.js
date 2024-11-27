import express from 'express';
import mongoose from 'mongoose';
import noteRoute from './Routes/noteRoute.js'
import cors from 'cors'
import process from 'process';
import dotenv from 'dotenv'
const app = express()

dotenv.config()
app.use(cors());


app.use(express.json())
const port = process.env.PORT ||4005
const URI=process.env.MongoDbURI
try {
    mongoose.connect(URI)
        console.log('connected to db');
    } catch (error) {
        console.log(error)
    }
app.get('/',(req,res)=>{
    res.send('backend running successfully')
})
app.use('/notes',noteRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
