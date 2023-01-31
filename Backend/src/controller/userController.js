const ErrorHandler = require("../utils/errorhandler")
const tryCatchFunc = require("../middleware/tryCatchErrorMiddleware");

const User =require("../models/userModel");

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

    const token = user.getJWTToken()

    res.status(201).json({
        success:true,
        token,
    })
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

    const isPasswordMatched=user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or Password" ,401))
    }

    const token = user.getJWTToken()

    res.status(200).json({
        success:true,
        token,
    })
})
