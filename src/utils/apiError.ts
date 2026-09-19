
class ApiError extends Error {
    public statusCode: number;
    public success: boolean;
    public errors: unknown[];
    // public messages: string;

    constructor(statusCode: number, message: string, errors: unknown[] = []){
           super(message);
           this.success = false;
           this.errors = errors;
           this.statusCode = statusCode;

           Error.captureStackTrace(this, this.constructor);
    }
}


export default ApiError;