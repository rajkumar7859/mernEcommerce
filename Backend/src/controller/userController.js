const ErrorHandler = require("../utils/errorhandler")
const tryCatchFunc = require("../middleware/tryCatchErrorMiddleware");
const crypto= require("crypto")
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
    // console.log(req.body.email);

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

    return next(new ErrorHandler(error.message , 500))
}

})

// reset password
exports.resetPassword = tryCatchFunc(async (req,res,next)=>{
    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{ $gt:Date.now() },
    });

    if(!user)
    {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired" , 400))
    }
    if(req.body.password!== req.body.confirmPassword)
{
    return next(new ErrorHandler("Password does not password" , 400))
}
user.password = req.body.password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save();
sendToken(user ,200 , res)

})

// Get user Detail own 
exports.getUserDetail=tryCatchFunc(async ( req , res, next)=>{
    console.log(req.user.id);
    const user= await User.findById(req.user.id)

    res.status(200).json({
        success:true,
        user
    })
})

// update user password
exports.updateUserPassword=tryCatchFunc(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched= await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Old Password is incorrect" ,400));
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match" , 400));
    }
    user.password= req.body.newPassword;
    await user.save()
    sendToken(user, 200, res)
})

// update user profile
exports.updateUserProfile=tryCatchFunc(async(req, res,next)=>{
    const newUserData={
        userName:req.body.userName,
        email:req.body.email,
    }

    const user = await User.findByIdAndUpdate(req.user.id , newUserData ,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    })

    res.status(200).json({
        success:true,
        user
    })

})
// get all user Admin
exports.getAllUser=tryCatchFunc(async(req,res,next)=>{
    const users=await User.find();

    if(!users){
        return next(
            new ErrorHandler(`User does not exist with Id:${req.params.id}`)
        )
    }

    res.status(200).json({
        success:true,
        users
    })
})
// get single user (admin)
exports.getSingleUser=tryCatchFunc(async(req,res,next)=>{
    const users=await User.findById(req.params.id)

    if(!users){
        return next(
            new ErrorHandler(`User does not exist with Id:${req.params.id}`)
        )
    }

    res.status(200).json({
        success:true,
        users
    })
})

// Delete user profile --Admin
exports.deleteUser= tryCatchFunc(async (req,res,next)=>{

    const user= await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`User does not exist with Id: ${req.params.id}`))
    }

    await user.remove()

    res.status(200).json({
        success:true,
        message:"User deleted successfully"
    })
})

// update user role
exports.updateUserRole= tryCatchFunc(async (req,res,next)=>{
const newUserDate={
    userName:req.body.userName,
    email:req.body.email,
    role:req.body.role,
}
const user = await User.findByIdAndUpdate(req.params.id , newUserDate ,{
    new:true,
    runValidators:true,
    useFindAndModify:false
})

res.status(200).json({
    success:true,
    message:"User role updated successfully"
})

});