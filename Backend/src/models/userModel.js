const mongoose =require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema({

    userName:{
        type:String,
        required:[true ,"Please Enter Your Name"],
        maxLength:[30 , "Name cannot exceed 30 characters"],
        minLength:[4, "Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true ,"Please Enter Your Email"],
        unique:true,
        validator:[validator.isEmail, "Please Enter Your valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8, "Please should be greater than 8 characters"],
        select:false
    },
    avatar:{    
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
    },
     role:{
            type:String,
            default:"user"
        },
        
    resetPasswordToken:String,
    resetPasswordExpire:Date,

})

// password hash by bcryptjs
userSchema.pre("save" , async function (next){
    if(!this.isModified("password")) {
        next()
    }
    this.password = await bcrypt.hash(this.password , 10)
})


// jwt token 
 userSchema.methods.getJWTToken =function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET , {
        expiresIn:process.env.JWT_EXPIRE,
    })
 }

//  compare password

userSchema.methods.comparePassword= async function (enteredPassword){
 return await bcrypt.compare(enteredPassword , this.password)
}

// reset password methods

userSchema.methods.getResetPasswordToken=function(){
const resetToken = crypto.randomBytes(20).toString("hax");

this.resetPasswordToken= crypto.createHash("sha256").update(resetToken).digest("hex")

return resetToken;

}

module.exports = mongoose.model("user" , userSchema)