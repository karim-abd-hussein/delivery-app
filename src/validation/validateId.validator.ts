import mongoose, { Document, Model } from "mongoose";
import httpErrorResponse from "../utils/httpErrorResponse";
import ApiError from "../utils/apiError";


export default async function validateId<T extends Document>(id:string,Model:Model<T>):Promise<mongoose.Types.ObjectId> {
 
    
    try {

        if(!mongoose.Types.ObjectId.isValid(id))
            throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);
        
            const oId:mongoose.Types.ObjectId=new mongoose.Types.ObjectId(id);
            
            const exist:T|null=await Model.findById(oId);
        
            if(!exist)
        
                throw new ApiError(httpErrorResponse.notFound.message,httpErrorResponse.notFound.status);

                return oId;

    } catch (error) {
        
        throw error;
    }


}