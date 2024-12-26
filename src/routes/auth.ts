import express,{ Express, NextFunction, Request, Response } from "express";
import { addProfile, logIn, signUp } from "../controllers/auth";

const router=express.Router();

router.post('/sign-up',(req:Request,res:Response,next:NextFunction)=>{

    signUp(req,res,next);

});

router.post('/log-in',(req:Request,res:Response,next:NextFunction)=>{

    logIn(req,res,next);

});

router.post('/add-profile',(req:Request,res:Response,next:NextFunction)=>{

    addProfile(req,res,next);

});

export default router;