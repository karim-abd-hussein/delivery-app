const httpErrorResponse={

    badRequest:{
        status: 400,
        error: "Bad Request",
        message: "Missing required field ."
      },
    unauthorized:{
        status: 401,
        error: "Unauthorized",
        message: "Invalid authentication token."
      },
      forbidden:{
        status: 403,
        error: "Forbidden",
        message: "You do not have permission to access this resource."
      },
      notFound:{
        status: 404,
        error: "Not Found",
        message: "Not found."
      },
      unprocessableEntity:{
        status: 422,
        error: "Unprocessable Entity",
        message: "Order quantity cannot be less than 1."
      },
      internalServerError:{
        status: 500,
        error: "Internal Server Error",
        message: "An unexpected error occurred. Please try again later."
      },
      conflict:{
        status: 409,
        error: "Conflict",
        message: "Conflict to preform this opration."
      } 
}

export default httpErrorResponse;