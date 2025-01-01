import jwt, { Jwt, JwtPayload } from 'jsonwebtoken';
import ApiError from './ApiError';
import dotenv from 'dotenv';
import httpErrorResponse from './httpErrorResponse';
import {Payload} from '../interfaces/base.interfaces';
dotenv.config();

export async function genToken(payload:Payload): Promise<string> {
  try {

    if (!process.env.SECRET_KEY) {
      throw new ApiError("SECRET_KEY is not defined in environment variables.",httpErrorResponse.unauthorized.status);
    }

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "10h" 
    });

    return token;
  } catch (error) {
    throw error;
  }
}



export async function verfiyToken(token: string): Promise<Payload> {
  try {
    if (!process.env.SECRET_KEY) {
      throw new ApiError(
        "SECRET_KEY is not defined in environment variables.",
        httpErrorResponse.unauthorized.status
      );
    }

    if (!token) {
      throw new ApiError(
        httpErrorResponse.unauthorized.message,
        httpErrorResponse.unauthorized.status
      );
    }

    const jwtPayload = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;

    if (typeof jwtPayload !== "object" || !jwtPayload.phone || !jwtPayload.id) {
      throw new ApiError(
        "Invalid token payload structure.",
        httpErrorResponse.unauthorized.status
      );
    }

    const payload: Payload = {
      phone: jwtPayload.phone,
      id: jwtPayload.id,
    };

    return payload;
  } catch (error: any) {
    throw new ApiError(error.message || "Token verification failed", httpErrorResponse.unauthorized.status);
  }
}
