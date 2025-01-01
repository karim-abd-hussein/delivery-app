import { NextFunction, Request, Response } from "express";
import { genToken, verfiyToken } from "../utils/token";
import { addProfileHandler, logInHandler, signUpHandler } from "../services/auth.db";
import  { Address,Customer,Payload } from "../interfaces/base.interfaces";
import { validatePhone } from "../validation/auth.validator";

export async function signUp(req:Request,res:Response,next:NextFunction):Promise<void> {
    
        const {password,phone}=req.body;

    try {
        
            validatePhone(phone);

            const id:string=await signUpHandler(phone,password);
            const token:string=await genToken({phone,id});
        
            res
            .cookie('token', token, { httpOnly: true })
            .status(201)
            .json({ message: "Successfully signed up." });
          

    } catch (error) {

        next(error);
        
    }
}


export async function logIn(req:Request,res:Response,next:NextFunction):Promise<void> {
    
        const {password,phone}=req.body;
        
    try {

           validatePhone(phone);
       
           const id:string=await logInHandler(phone,password);
            const token:string=await genToken({phone,id});
        
            res
            .cookie('token', token, { httpOnly: true })
            .status(201)
            .json({ message: "Successfully loged in." });
          

    } catch (error) {

        next(error);
        
    }
}

export async function addProfile(req:Request,res:Response,next:NextFunction):Promise<void> {

    try {
        
        const {firstName,lastName}=req.body;
        const address:Address=req.body.address;

       const token:string=req.cookies.token;

       const payload:Payload=await verfiyToken(token);

       await addProfileHandler(payload,firstName,lastName,address);

        res
        .status(201)
        .json({ message: "Successfully update profile." });

    } catch (error) {
        
        next(error);
    }

}



