import mongoose, { Document } from "mongoose";

 export  interface Payload {

    phone:string;
    id:string;

 }

export interface Address {

   city:string;
   street:string;
   nextTo?:string;
}

export interface ProductItem{

   productId:string;
   quantity:number;

}

 export interface Order extends Document {
 
   phone:string;
   address:Address;
   products:ProductItem[];
   store:string;
   totalPrice:number;  
   status:string; 
   createdAt:Date;
}

export interface Product extends Document{

   name: string;
   price: number;
   description?: string;
   category?:string;
   quantity:number;
   store:mongoose.Types.ObjectId;

}

export interface Store extends Document{

   name:string;
   address:Address;
   phone:string;
}

export interface Customer extends Document{

   phone:string,
  password:string,
  firstName?:string,
  lastName?:string,
  imageURL?:string,
  address?:Address,
  createdAt?: Date
}