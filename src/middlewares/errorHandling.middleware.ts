import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import httpErrorResponse from "../utils/httpErrorResponse";

export default function handleApiError(error:ApiError,req:Request,res:Response,next:NextFunction):void{

    const status:number=error.statusCode||httpErrorResponse.internalServerError.status;
    const message:string=error.message||httpErrorResponse.internalServerError.message;
    res
    .status(status)
    .json({message});
}