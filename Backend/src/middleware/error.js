const ErrorHandler = require("../utils/errorhandler");
const ErrorHandle=require("../utils/errorhandler");

// this is error handler middleware 
module.exports=(err , req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    // wrong mongoDB id error error name castError
    if(err.name==="CastError"){
        const message= `Resource not found. Invalid ${err.path}`;
        err=new ErrorHandle(message ,400)
    }
// mongoose error code re-arrange
if(err.code===11000){
    const message = `Email is already register ${object.keys(err.keyvalue)} `

    err= new ErrorHandler(message , 400)
}

// wrong Jwt token error
if(err.name==="JsonWebTokenError"){
    const message=`Json Web Token is invalid, try again`;
    err= new ErrorHandler(message, 400)
}
// Token expire error
if(err.name==="TokenExpiredError"){
    const message=`Json Web Token is Expired, try again`;
    err= new ErrorHandler(message, 400)
}

    res.status(err.statusCode).json({
        success:false,
        // error:err.stack  use this stack for getting more details in error
        error:err.message
    });
};