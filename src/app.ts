import { Express } from "express";
import createServer from "./config/server";
import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config();

const app:Express=createServer();

const PORT=process.env.PORT||5000;

mongoose.connect(process.env.MONGO_URI!)
.then(()=>{

    console.log("connected to databse .");

    app.listen(PORT,()=>{

        console.log(`Running on PORT ${PORT}...`);
    })

})
.catch(error =>{


    console.error("Can't connect to databse .");

}) 



