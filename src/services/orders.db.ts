import {ProductItem } from "../interfaces/base.interfaces";
import OrderModel from "../models/order.model"
import ApiError from "../utils/ApiError";
import httpErrorResponse from "../utils/httpErrorResponse";
import productModel from "../models/product.model";
import { validateId } from "../validation/auth.validator";


export async function insertProducts(products: ProductItem[]): Promise<number> {
  try {
    let totalPrice: number = 0;

    for (const product of products) {
     
      const findProduct = await validateId(product.productId,productModel);
      
    
      if (findProduct.quantity < product.quantity) {
        throw new ApiError(
          `Insufficient quantity for ${findProduct.name}. Available: ${findProduct.quantity}.`,
          httpErrorResponse.conflict.status
        );
      }

      await productModel.findByIdAndUpdate(product.productId, {
        quantity: findProduct.quantity - product.quantity,
      });

      const productTotalPrice: number = product.quantity * findProduct.price;
      totalPrice += productTotalPrice;
    }

    return totalPrice;
  } catch (error) {
    throw error;
  }
}

export async function canselPendingdOrderById(_id:string):Promise<void> {
    
  try {

      const order = await validateId(_id,OrderModel);

  
        if(order.status!=='Pending')

          throw new ApiError(`You can't cansel accepted order`,httpErrorResponse.conflict.status);

         await returnQuantityToProducts(order.products);

      await OrderModel.findByIdAndDelete(_id);
       
  } catch (error) {
      
    throw error;

  }
}

async function returnQuantityToProducts(products:ProductItem[]):Promise<void> {
  
  for (const product of products) {
    
    const findProduct = await productModel.findById(product.productId);
    if (!findProduct) {
      throw new ApiError(
        httpErrorResponse.notFound.message,
        httpErrorResponse.notFound.status
      );
    }

    await productModel.findByIdAndUpdate(product.productId, {
      quantity: findProduct.quantity + product.quantity,
    });

}

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

     await OrderModel.updateOne({_id:id},{status});
    

  } catch (error) {

    throw error;

  }

}