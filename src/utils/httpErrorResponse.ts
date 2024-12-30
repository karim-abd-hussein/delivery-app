const httpErrorResponse={

    badRequest:{
        status: 400,
        message: "Missing required field ."
      },
    unauthorized:{
        status: 401,
        message: "Invalid authentication token."
      },
      forbidden:{
        status: 403,
        message: "You do not have permission to access this resource."
      },
      notFound:{
        status: 404,
        message: "Not found."
      },
      unprocessableEntity:{
        status: 422,
        message: "Order quantity cannot be less than 1."
      },
      internalServerError:{
        status: 500,
        message: "An unexpected error occurred. Please try again later."
      },
      conflict:{
        status: 409,
        message: "Conflict to preform this opration."
      } 
}

export default httpErrorResponse;