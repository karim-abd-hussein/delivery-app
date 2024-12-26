import mongoose, { Document } from "mongoose";
import { Address, Order, Product, ProductItem } from "../interfaces/base.interfaces";
import OrderModel from "../models/order.model"
import ApiError from "../utils/apiError";
import httpErrorResponse from "../utils/httpErrorResponse";
import productModel from "../models/product.model";

export async function create(phone:string,address:Address,products:ProductItem[]):Promise<void> {
    
    try {
        
         let totalPrice:number = 0;

           products.forEach(async (product) => {
           // Check if productId is valid
           if (!mongoose.Types.ObjectId.isValid(product.productId)) {
             throw new ApiError(`Invalid productId: ${product.productId}`, httpErrorResponse.conflict.status);
           }

           const updatedProduct:Product|null = await productModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(product.productId) }, // Filter
            { $set: { quantity: -product.quantity } },                              // Update operation
            { new: true, upsert: false }                                     // Options: return new document, no upsert
          );
         
           if (!updatedProduct) {
             throw new ApiError(`Product not found: ${product.productId}`, httpErrorResponse.notFound.status);
           }
         
           
          //  if(productDetails.quantity<product.quantity)
          //     throw new ApiError('The quantity more then avalible',httpErrorResponse.conflict.status);



           const productTotalPrice:number = product.quantity * updatedProduct.price;
            totalPrice+= productTotalPrice;
         });


         const order:Document=new OrderModel({phone,address,products,totalPrice});

         await order.save();
         

    } catch (error) {
        
      throw error;
    }
}



export async function deleteCompletedOrderById(id:string):Promise<void> {
    
  try {
      
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(`Invalid productId: ${id}`, httpErrorResponse.conflict.status);
    }



      const order:Order|null= await OrderModel.findById(new mongoose.Types.ObjectId(id));

      if(!order)
        throw new ApiError(httpErrorResponse.notFound.message,httpErrorResponse.notFound.status);

      if(order.status!=='Completed')

        throw new ApiError(httpErrorResponse.conflict.message,httpErrorResponse.conflict.status);

      await OrderModel.deleteOne({_id:new mongoose.Types.ObjectId(id)});
       
  } catch (error) {
      
    throw error;
  }
}


export async function canselPendingdOrderById(id:string):Promise<void> {
    
  try {
      
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError(httpErrorResponse.conflict.message, httpErrorResponse.conflict.status);
    }



      const order:Order|null= await OrderModel.findById(new mongoose.Types.ObjectId(id));

      if(!order)
        throw new ApiError(httpErrorResponse.notFound.message,httpErrorResponse.notFound.status);

         await returnQuantityToProducts(order.products);

      await OrderModel.deleteOne({_id:new mongoose.Types.ObjectId(id)});
       
  } catch (error) {
      
    throw error;

  }
}

async function returnQuantityToProducts(products:ProductItem[]) {
  
  products.forEach(async (product)=>{

  await productModel.updateOne(
    { _id: new mongoose.Types.ObjectId(product.productId) }, // Filter
    { $set: { quantity: +product.quantity } },   // Update operation                                  // Options: return new document, no upsert
  );

});


}

export async function getOrdersByPhone(phone: string): Promise<any[]> {
  
  try {
    const orders = await OrderModel.find({ phone });
    return orders;
  } catch (error) {
    throw error;
  }
}

export async function changeOrderStatus(id:string,status: string):Promise<void>{
  
  try {

     await OrderModel.updateOne({_id:new mongoose.Types.ObjectId(id)},{status});
    

  } catch (error) {

    throw error;

  }

}