import { NextFunction, Request, Response } from "express";
import { validateData } from "../validation/product.validator";
import { Payload, Product } from "../interfaces/base.interfaces";
import { verfiyToken } from "../utils/token";
import ApiError from "../utils/apiError";
import httpErrorResponse from "../utils/httpErrorResponse";
import { getItemsByName, remove, save } from "../services/generic.db";
import productModel from "../models/product.model";

export async function insertProduct(req:Request,res:Response,next:NextFunction):Promise<void> {
    

    try {

        const name:string=req.body.name;
        const price:number=req.body.price;
        const description: string=req.body.description;
        const category:string=req.body.category;
        const quantity:number=req.body.quantity;
        const store:string=req.body.store;

        const product:Product= await validateData(name,price,description,category,quantity,store);

        await save<Product>(product,productModel);

        res
        .status(201)
        .json({message:"Product saved"});

    } catch (error) {
        
        next(error);

    }

}

export async function deleteProduct(req:Request,res:Response,next:NextFunction):Promise<void> {
    

    try {

        const id:string=req.params.id;

       await remove<Product>(id,productModel);

       res
        .status(201)
        .json({message:"Product deleted"});

    } catch (error) {
        
        next(error);

    }

}


export async function getByName(req:Request,res:Response,next:NextFunction):Promise<void> {
    

    try {

        const name:string=req.params.name;
        const token:string=req.cookies.token;
        const payload:Payload=await verfiyToken(token);

        if(!name)

            throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);

            const products:Product[]=await getItemsByName(name,productModel);

       res
        .status(201)
        .json({products});

    } catch (error) {
        
        next(error);

    }

}

