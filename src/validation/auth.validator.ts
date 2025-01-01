import mongoose, { Document, Model }  from "mongoose";
import ApiError from "../utils/ApiError";
import httpErrorResponse from "../utils/httpErrorResponse";



  export  function validatePhone(phone:string):void {
    
    try {
        
        if(!phone)
            throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);


        const phoneRegex = /^09[0-9]{8}$/;

            const match:boolean=phoneRegex.test(phone);
        if(!match)

            throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);

    } catch (error) {
    
        throw error;
    }

}

export  async function validateId<T extends Document>(id:string,model:Model<T>):Promise<T> {
 
    
    try {

        if(!mongoose.Types.ObjectId.isValid(id))
            throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);
        
            
            const exist:T|null=await model.findById(id);
        
            if(!exist)
        
                throw new ApiError(httpErrorResponse.notFound.message,httpErrorResponse.notFound.status);

                return exist;

    } catch (error) {
        
        throw error;
    }


}