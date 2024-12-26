import ApiError from "../utils/apiError";
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