const jwt =require('jsonwebtoken');
import ApiError from './apiError';
import dotenv from 'dotenv';
import httpErrorResponse from './httpErrorResponse';
import {Payload} from '../interfaces/base.interfaces';
dotenv.config();

export async function genToken(phone: string): Promise<string> {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ApiError("SECRET_KEY is not defined in environment variables.",httpErrorResponse.unauthorized.status);
    }

    // Generate token
    const token = jwt.sign({ phone }, process.env.SECRET_KEY, {
      expiresIn: "1h" 
    });

    return token;
  } catch (error) {
    throw error;
  }
}


export async function verfiyToken(token: string):Promise<Payload> {
   
    try {
      if (!process.env.SECRET_KEY) {
        throw new ApiError("SECRET_KEY is not defined in environment variables.",httpErrorResponse.unauthorized.status);
      }

      if(!token)
        throw new ApiError(httpErrorResponse.unauthorized.message,httpErrorResponse.unauthorized.status);

  
      // Verfiy token
      const payload = await jwt.sign(token, process.env.SECRET_KEY);
    
      if(!payload)
        throw new ApiError(httpErrorResponse.unauthorized.message,httpErrorResponse.unauthorized.status);

      return payload;

    } catch (error) {
      throw error;
    }
  }
  