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

    res.status(err.statusCode).json({
        success:false,
        // error:err.stack  use this stack for getting more details in error
        error:err.message
    });
};