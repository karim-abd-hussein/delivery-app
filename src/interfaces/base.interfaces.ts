import mongoose, { Document } from "mongoose";

 export  interface Payload {

    phone:string;

 }

export interface Address {

   city:string;
   street:string;
   nextTo?:string;
}

export interface ProductItem{

   productId:mongoose.Types.ObjectId;
   quantity:number;

}

 export interface Order {
 
   phone:string;
   address:Address;
   products:ProductItem[];
   totalPrice:number;  
   status:string; 
   createdAt:Date;
}

export interface Product extends Document{

   name: string;
   price: number;
   description: string;
   category:string;
   quantity:number;
   store:mongoose.Types.ObjectId;

}

export interface Store extends Document{

   name:string;
   address:Address;
   phone:string;
}
