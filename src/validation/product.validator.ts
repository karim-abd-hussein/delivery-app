import mongoose from "mongoose";
import ApiError from "../utils/apiError";
import httpErrorResponse from "../utils/httpErrorResponse";
import StoreModel from "../models/store.model";
import { Product, Store } from "../interfaces/base.interfaces";
import validateId from "./validateId.validator";
import productModel from "../models/product.model";

export async function validateData(name:string,price:number,description:string,category:string,quantity:number,store:string):Promise<Product> {
    

    try {
    
if(!name||!price||!description||!category||!quantity||!store){

    throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);

}

        const storeId:mongoose.Types.ObjectId=await validateId(store,StoreModel);


        const product:Product=new productModel({name,price,description,category,quantity,store:storeId});
        

        return product;

    } catch (error) {
     
        throw error;
    }

}