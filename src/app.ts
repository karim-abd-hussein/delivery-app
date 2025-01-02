import { Express } from "express";
import expressApp from "./config/expressApp";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import http,{Server} from 'http';
import initSocket from "./config/socket";
dotenv.config();

const app:Express=expressApp();

 const server:Server=http.createServer(app);
 
const PORT=process.env.PORT||5000;

mongoose.connect(process.env.MONGO_URI!)
.then(()=>{

    console.log("connected to databse .");

    initSocket(server);

    server.listen(PORT,()=>{
        console.log(`Running on PORT ${PORT}...`);
    })

})
.catch(error =>{


    console.error("Can't connect to databse .");

}) 



