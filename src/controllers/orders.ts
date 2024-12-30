import { NextFunction, Request, Response } from "express";
import { Address, Order, Payload,ProductItem } from "../interfaces/base.interfaces";
import { verfiyToken } from "../utils/token";

import { 
    canselPendingdOrderById, 
    changeOrderStatus,
    deleteCompletedOrderById,
     getOrdersByPhone, 
     insertProducts 
    } 
from "../services/orders.db";

import orderModel from "../models/order.model";
import { save } from "../services/generic.db";

export async function createOrder(req:Request,res:Response,next:NextFunction) {
    
try {
    
     const token:string=req.cookies.token;
    
     const payload:Payload=await verfiyToken(token);

     const phone:string=payload.phone;
     const address:Address=req.body.address;
     const products:ProductItem[]=req.body.products;

      const totalPrice:number=await insertProducts(products);

     const newOrder:Order=  new orderModel({phone,address,products,totalPrice});

         
        await save(newOrder,orderModel);

     res
     .status(201)
     .json({message:"Succssfully order created"});


} catch (error) {
    
    next(error);
}    

}


export async function deleteOrder(req:Request,res:Response,next:NextFunction) {
    
    try {
        
         const token:string=req.cookies.token;
        
         const payload:Payload=await verfiyToken(token);
    
         const orderId:string=req.params.id;
    
        await deleteCompletedOrderById(orderId);

         res
         .status(201)
         .json({message:"Succssfully order deleted"});
    
    
    } catch (error) {
        
        next(error);
    }    
    
    }

    export async function canselOrder(req:Request,res:Response,next:NextFunction) {
    
        try {
            
             const token:string=req.cookies.token;
            
             const payload:Payload=await verfiyToken(token);
        
             const orderId:string=req.params.id;
        
            await canselPendingdOrderById(orderId);
    
             res
             .status(201)
             .json({message:"Succssfully order canselled"});
        
        
        } catch (error) {
            
            next(error);
        }    
        
        }


    export async function updateOrder(req:Request,res:Response,next:NextFunction) {

        try {
            
                const token:string=req.cookies.token;
            
                const payload:Payload=await verfiyToken(token);
        
                const orderId:string=req.params.id;
                const phone:string=payload.phone;
                const address:Address=req.body.address;
                const products:ProductItem[]=req.body.products;
        
              await canselPendingdOrderById(orderId);

            //    await create(phone,address,products);
              
                res
                .status(201)
                .json({message:"Succssfully order updated"});
        
        
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
                .json({orders});
        
        
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