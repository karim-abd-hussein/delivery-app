import { Payload,Address } from '../interfaces/base.interfaces';
import Customer from '../models/customer.model';
import ApiError from '../utils/apiError';
import httpErrorResponse from '../utils/httpErrorResponse';
import bcrypt from 'bcrypt';

export async function signUpHandler(phone: string, password: string):Promise<void> {
  try {

    const existingUser = await Customer.findOne({ phone });
    if (existingUser) {
      throw new ApiError(httpErrorResponse.conflict.message, httpErrorResponse.conflict.status);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const customer = new Customer({ phone, password: hashedPassword });

      customer.save();

  } catch (error) {
    
    throw error;
}
}

export async function logInHandler(phone: string, password: string):Promise<void> {
    try {
  
      const existingUser:any = await Customer.findOne({ phone });
      if (!existingUser) {
        throw new ApiError("User don't signed up ", httpErrorResponse.conflict.status);
      }
      
      const hashedPassword:string = existingUser.password;

      const match:boolean =await bcrypt.compare(hashedPassword,password);
  
      if(!match)
        
        throw new ApiError(httpErrorResponse.unauthorized.message,httpErrorResponse.unauthorized.status);

  
    } catch (error) {
      
      throw error;
  }
  }


  export async function addProfileHandler(payload:Payload,firstName:string,lastName:string,address:Address):Promise<void> {
    try {
  
        const phone:string=payload.phone;    
        // Find the customer and update their profile
        const customer = await Customer.findOneAndUpdate(
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