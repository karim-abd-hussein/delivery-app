import express,{  NextFunction, Request, Response } from "express";
import { deleteStore, getStoresByName, insertStore } from "../controllers/stores";
const router=express.Router();


router.post('/insert',insertStore);


router.delete('/delete/:id',deleteStore)


// router.put('/update/:id',(req:Request,res:Response,next:NextFunction)=>{


// })


router.get('/get-by-name/:name',getStoresByName);

export default router;