const mongoose =require("mongoose");

const ProductSchema= mongoose.Schema({
    productName:{
        type:String,
        required:[true , "Please Enter the product name"]
    },
    description:{
        type:String,
        requires:[true , "Please Enter the product description"]
    },
    price:{
        type:Number,
        required:[true , "Please Enter the product price"],
        maxLength:[8 ,"Price cannot be exceed 8 number" ]
    },
    rating :{
        type:Number,
        default:0
    },
    image:[
   {     
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
}
    ],
    category:{
      type:String,
      required:[true , "Please Enter the product category"]
    },
    stock:{
        type:String,
        // required:[ true ,"Please Enter the product stock"],
        maxLength:[4 , "Stock can not exceed 4 Characters"]
    },
    numofReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comments:{
                type:String,
                required:true
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model("Product" , ProductSchema)