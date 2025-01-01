
class ApiError extends Error{

    statusCode:number;

    constructor(massage:string,statusCode:number){

        super(massage);
        this.name='apiError';
        this.statusCode=statusCode;

    }



}

export default ApiError;