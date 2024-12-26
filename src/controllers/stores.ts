import { NextFunction, Request, Response } from "express";
import { Address, Store } from "../interfaces/base.interfaces";
import { validatePhone } from "../validation/input.validator";
import { getItemsByName, remove, save } from "../services/generic.db";
import storeModel from "../models/store.model";


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
       
       await remove<Store>(id,storeModel);

       res
        .status(201)
        .json({message:"ok"});

    } catch (error) {
        
        next(error);
    }
    
}

export async function getStoresByName(req:Request,res:Response,next:NextFunction) {

    try {
        
        const name:string=req.params.id;
        
        const stores:Store[]|null= await getItemsByName(name,storeModel);

        res
        .status(201)
        .json({stores});

    } catch (error) {
        
        next(error);
    }
    
}