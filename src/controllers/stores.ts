import { NextFunction, Request, Response } from "express";
import { Address, Payload, Store } from "../interfaces/base.interfaces";
import { validatePhone } from "../validation/auth.validator";
import { remove, save, updateItemById } from "../services/generic.db";
import storeModel from "../models/store.model";
import {validateId} from "../validation/auth.validator";
import ApiError from "../utils/ApiError";
import httpErrorResponse from "../utils/httpErrorResponse";
import { genToken } from "../utils/token";


export async function insertStore(req:Request,res:Response,next:NextFunction) {

    try {
        
        const name:string=req.body.name;
        const address:Address=req.body.address;
        const phone:string=req.body.phone;

        validatePhone(phone);

        const store:Store= new storeModel({name,address,phone});

        await save(store,storeModel);

        res
        .status(201)
        .json({message:"ok"});

    } catch (error) {
        
        next(error);
    }
    
}



export async function deleteStore(req:Request,res:Response,next:NextFunction) {

    try {
        
        const id:string=req.params.id;
        const preStore:Store|null=await validateId(id,storeModel);
       await remove<Store>(id,storeModel);

       res
        .status(201)
        .json({message:"Deleted"});

    } catch (error) {
        
        next(error);
    }
    
}

export async function getStoresByName(req:Request,res:Response,next:NextFunction) {

    
        
        const name:string=req.params.id;
    
    try {


        const stores:Store[]|null= await storeModel.find({name});

        res
        .status(201)
        .json(stores);

    } catch (error) {
        
        next(error);
    }
    
}


export async function getStoresById(req:Request,res:Response,next:NextFunction) {

    try {
        
        const store:Store= await validateId(req.params.id,storeModel);

        res
        .status(201)
        .json(store);

    } catch (error) {
        
        next(error);
    }
    
}

export async function getStoreByPhone(req:Request,res:Response,next:NextFunction) {

    try {
        
        const phone:string=req.params.phone;

        validatePhone(phone);

        const stores:Store[]|null= await storeModel.find({phone});

        res
        .status(201)
        .json(stores);

    } catch (error) {
        
        next(error);
    }
    
}

export async function getStores(req:Request,res:Response,next:NextFunction) {

   
    try {     
        
        const stores:Store[]= await storeModel.find(); 

        res
        .status(201)
        .json(stores);

    } catch (error) {
        
        next(error);
    }
    
}

export async function updateStore(req:Request,res:Response,next:NextFunction) {

    
        
        const id:string=req.params.id;

        const name:string=req.body.name;
        const address:Address=req.body.address;
        const phone:string=req.body.phone;

        try {
            
        validatePhone(phone);
        const preStore:Store=await validateId(id,storeModel);
        const newStore:object=new Object({name,address,phone});

       await updateItemById<Store>(id,newStore,storeModel);

       res
        .status(201)
        .json({message:"Upate Store sucssecfully"});

    } catch (error) {
        
        next(error);
    }
    
}

export async function logInStore(req:Request,res:Response,next:NextFunction):Promise<void> {
    
    try {
       
        const phone:string=req.body.phone;
        
         validatePhone(phone);

         const store:Store|null=await storeModel.findOne({phone});

            if(!store)
                throw new ApiError(httpErrorResponse.notFound.message,httpErrorResponse.notFound.status);

             const payload:Payload={phone,id:store.id};
             const token:string=await genToken(payload);

            res
            .cookie('token', token, { httpOnly: true })
            .status(201)
            .json({ message: "Successfully loged in." });
          

    } catch (error) {

        next(error);
        
    }
}