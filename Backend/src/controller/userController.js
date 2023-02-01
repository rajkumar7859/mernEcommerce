const ErrorHandler = require("../utils/errorhandler")
const tryCatchFunc = require("../middleware/tryCatchErrorMiddleware");

const User =require("../models/userModel");
const sendToken = require("../utils/jwtToken");


// Register user
exports.registerUser=tryCatchFunc(async (req, res,next)=>{
    const {userName , email , password}=req.body;

    const user = await User.create({
        userName,
        email,
        password,
        avatar:{
        public_id:"this is a simple id",
        url:"Profile url"
        },
    });

    sendToken( user, 201, res)
})


// login user 
exports.loginUser=tryCatchFunc(async (req,res,next)=>{
    const { email, password }=req.body;

    // checking if user has given password and email both

    if(!email || !password){
        return next(new ErrorHandler("Please Enter email & Password" , 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))
    }

    const isPasswordMatched= await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or Password" ,401))
    }

    sendToken(user, 200, res)

})


// logout user
exports.logoutUser=tryCatchFunc(async (req,res,next)=>{
    res.cookie("token" , null ,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"Logged out"
    });
    
})

