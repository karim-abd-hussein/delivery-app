import { NextFunction, Request, Response } from "express";
import { Payload, Product } from "../interfaces/base.interfaces";
import { verfiyToken } from "../utils/token";
import ApiError from "../utils/ApiError";
import httpErrorResponse from "../utils/httpErrorResponse";
import { remove, updateItemById } from "../services/generic.db";
import productModel from "../models/product.model";
import {validateId } from "../validation/auth.validator";
import mongoose from "mongoose";

export async function insertProduct(req:Request,res:Response,next:NextFunction):Promise<void> {


    const name:string=req.body.name;
    const price:number=req.body.price;
    const description: string=req.body.description;
    const category:string=req.body.category;
    const quantity:number=req.body.quantity;

        try{

            if(!name||!price||!description||!category||!quantity){

                throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);
       
               }
            const token:string=req.cookies.token; 
            const payload:Payload=await verfiyToken(token);
            const store:mongoose.Types.ObjectId= new mongoose.Types.ObjectId(payload.id);
            await new productModel({name,price,description,category,quantity,store}).save();

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

        const preProduct:Product|null=await validateId(id,productModel);

       await remove<Product>(id,productModel);

       res
        .status(201)
        .json({message:"Product deleted"});

    } catch (error) {
        
        next(error);

    }

}


export async function getProductsByName(req:Request,res:Response,next:NextFunction):Promise<void> {
    
        const name:string=req.params.name;
        const token:string=req.cookies.token;

        try {

        const payload:Payload=await verfiyToken(token);

        if(!name)

            throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);

            const products:Product[]=await productModel.find({name});

       res
        .status(201)
        .json(products);

    } catch (error) {
        
        next(error);

    }
}


export async function getProductById(req:Request,res:Response,next:NextFunction):Promise<void> {
    
    const id:string=req.params.id;
    const token:string=req.cookies.token;

    try {

    const payload:Payload=await verfiyToken(token);

    const preProduct:Product|null=await validateId(id,productModel);


   res
    .status(201)
    .json(preProduct);

} catch (error) {
    
    next(error);

}
}

export async function updateProduct(req:Request,res:Response,next:NextFunction):Promise<void> {
    
       const token:string=req.cookies.token;
       const id:string=req.params.id;

       const name:string=req.body.name;
       const price:number=req.body.price;
       const description: string=req.body.description;
       const category:string=req.body.category;
       const quantity:number=req.body.quantity;
       
    try {
        const preProduct:Product|null=await validateId(id,productModel);

        const payload:Payload=await verfiyToken(token);
        
        if(!name||!price||!description||!category||!quantity){

            throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);
   
           }

        const product= {

            name,
            price,
            description,
            category,
            quantity,
            store:payload.id

        };


        await updateItemById(id,product,productModel);

       res
        .status(201)
        .json({message:"product updated succssafully"});

    } catch (error) {
        
        next(error);

    }

}


export async function getProducts(req:Request,res:Response,next:NextFunction):Promise<void> {
    
    const token:string=req.cookies.token;

 try {

     const payload:Payload=await verfiyToken(token);
     const products:Product[]=await productModel.find({store:payload.id});

    res
     .status(201)
     .json(products);

 } catch (error) {
     
     next(error);

 }

}