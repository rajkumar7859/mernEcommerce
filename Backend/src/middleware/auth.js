const ErrorHandler = require("../utils/errorhandler");
const tryCatchErrorMiddleware = require("./tryCatchErrorMiddleware");
const jwt= require("jsonwebtoken");
const User = require("../models/userModel");
exports.isAuthenticatedUser= tryCatchErrorMiddleware(async (req, res,next)=>{
    const {token} =req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to access this resource" , 401))
    }
    
    const decodedData= jwt.verify(token , process.env.JWT_SECRET)

    req.user= await User.findById(decodedData.id)
    next()
});