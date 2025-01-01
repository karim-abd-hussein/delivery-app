import { Types } from 'mongoose';
import { Payload,Address, Customer } from '../interfaces/base.interfaces';
import CustomerModel from '../models/customer.model';
import ApiError from '../utils/ApiError';
import httpErrorResponse from '../utils/httpErrorResponse';
import bcrypt from 'bcrypt';


export async function hashPassword(password: string):Promise<string> {
  
  try {
    if(!password)

      throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);

     return await bcrypt.hash(password, 10); 

  } catch (error) {
    
    throw error;
}
}

export async function signUpHandler(phone: string, password: string):Promise<string> {
  try {


    const hashedPassword:string=await hashPassword(password);
    
    const existingUser = await CustomerModel.findOne({ phone });
    if (existingUser) {
      throw new ApiError(httpErrorResponse.conflict.message, httpErrorResponse.conflict.status);
    }

      const customer = new CustomerModel({ phone, password: hashedPassword });

      const savedCustomer = await customer.save();

      return  (savedCustomer._id as Types.ObjectId).toString();

  } catch (error) {
    
    throw error;
}
}

export async function logInHandler(phone: string, password: string):Promise<string> {
   
  try {
  
      if(!password)

        throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);
  
      const existingUser:any = await CustomerModel.findOne({ phone });
      if (!existingUser) {
        throw new ApiError("User don't signed up ", httpErrorResponse.conflict.status);
      }
      
      const match:boolean =await bcrypt.compare(password,existingUser.password);
      if(!match)
        
        throw new ApiError("Wrong password",httpErrorResponse.unauthorized.status);

    return (existingUser._id as Types.ObjectId).toString();
  
    } catch (error) {
      
      throw error;
  }
  }


  export async function addProfileHandler(payload:Payload,firstName:string,lastName:string,address:Address):Promise<void> {
    try {
  
        const phone:string=payload.phone;    
        // Find the customer and update their profile
        const customer = await CustomerModel.findOneAndUpdate(
          { phone }, // Find the customer by phone
          {
            $set: {
              firstName,
              lastName,
              address,
            },
          },
          { new: true, upsert: false } // Return the updated document; do not create a new document
        );
    
        if (!customer) {
          throw new ApiError("User don't signed up ", httpErrorResponse.conflict.status);
        }
    
    } catch (error) {
      
      throw error;
  }
  }