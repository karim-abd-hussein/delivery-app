import ApiError from "../utils/apiError";
import httpErrorResponse from "../utils/httpErrorResponse";

export  function validatePhonePassword(phone:string,password:string):boolean {
 
    try {
        
        if(!phone||!password||phone.length!==10){

            throw new ApiError(httpErrorResponse.badRequest.message,httpErrorResponse.badRequest.status);
        }

        if(!validatePhoneNumber(phone))

            throw new ApiError('please check correct phone number',httpErrorResponse.badRequest.status);

            return true;

    } catch (error) {
        
        throw error;
    }

}

const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^09[0-9]{8}$/;
    return phoneRegex.test(phone);
  };