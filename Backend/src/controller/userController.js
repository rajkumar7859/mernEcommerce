const ErrorHandler = require("../utils/errorhandler")
const tryCatchFunc = require("../middleware/tryCatchErrorMiddleware");

const User =require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");


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

// forgot password
exports.forgotPassword= tryCatchFunc(async( req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User not Found" , 404))
    }

    // Get ResetPassword Token 
const resetToken=user.getResetPasswordToken();

await user.save({validateBeforeSave:false})

const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

const message=`Your password rest token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then , please ignore it`;

try {
    await sendEmail({
        email:user.email,
        subject:"Ecommerce Password Recovery",
        message
    })

    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully`,
    });

} catch (error) {
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save({validateBeforeSave:false})
}

})