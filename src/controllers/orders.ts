import { NextFunction, Request, Response } from "express";
import { Address, Order, Payload,ProductItem } from "../interfaces/base.interfaces";
import { verfiyToken } from "../utils/token";

import { 
    canselPendingdOrderById, 
    changeOrderStatus,
     getOrdersByPhone, 
     insertProducts 
    } 
from "../services/orders.db";

import orderModel from "../models/order.model";

export async function createOrder(req:Request,res:Response,next:NextFunction) {
    

    const address:Address=req.body.address;
    const products:ProductItem[]=req.body.products;
    const token:string=req.cookies.token;
    const store:string=req.body.store

try {
    
     const payload:Payload=await verfiyToken(token);

     const phone:string=payload.phone;
 
      const totalPrice:number=await insertProducts(products);

     await new orderModel({phone,address,products,store,totalPrice}).save();

     res
     .status(201)
     .json({message:"Succssfully order created"});


} catch (error) {
    
    next(error);
}    

}


 

 export async function canselOrder(req:Request,res:Response,next:NextFunction) {
    
            
             const token:string=req.cookies.token;
             const orderId:string=req.params.id;

        try {
            
             const payload:Payload=await verfiyToken(token);
        
        
            await canselPendingdOrderById(orderId);
    
             res
             .status(201)
             .json({message:"Succssfully order canselled"});
        
        
        } catch (error) {
            
            next(error);
        }    
        
        }


    export async function getOrders(req:Request,res:Response,next:NextFunction) {

        try {
            
                const token:string=req.cookies.token;
            
                const payload:Payload=await verfiyToken(token);
        
                const phone:string=payload.phone;
        
                const orders:Order[]= await getOrdersByPhone(phone);
              
                res
                .status(201)
                .json(orders);
        
        
        } catch (error) {
            
            next(error);
        }    
        
        }


        export async function getPendingStoreOrders(req:Request,res:Response,next:NextFunction) {

            try {
                
                    const token:string=req.cookies.token;
                
                    const payload:Payload=await verfiyToken(token);

                    const status:string='Pending';

                    const orders:Order[]= await orderModel.find({status,store:payload.id});
                  
                    res
                    .status(201)
                    .json(orders);
            
            
            } catch (error) {
                
                next(error);
            }    
            
            }

export async function changeStatus(req:Request,res:Response,next:NextFunction) {
    
try {

    const token:string=req.cookies.token;
            
    const payload:Payload=await verfiyToken(token);

    const phone:string=payload.phone;
    const id:string=req.params.id;
    const status:string=req.params.status;

    await changeOrderStatus(id,status);
    
    res
    .status(201)
    .json({message:"Succssfully order status updated"});

} catch (error) {
    
    next(error);

}

}