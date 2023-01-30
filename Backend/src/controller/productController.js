const { findById } = require("../models/ProductModel")
const ProductCreate=require("../models/ProductModel")

// Creating new product only admin can create the new products
exports.createProduct=async( req,res , next)=>{

 const product = await ProductCreate.create(req.body)
 res.status(201).json({
    success:true,
    product
 })
}


// Get all product 
exports.getProduct= async(req , res , next)=>{
 const allProduct= await ProductCreate.find()
 res.status(200).json({
   success:true,
   allProduct
})
}


// update exiting product by admin only

exports.updateProduct=async(req, res , next)=>{
  let product = await ProductCreate.findById(req.params.id)
  if(!product)
  {
   return res.status(401).json({
      success:false,
      message:"Product not found"
   })
  }

  product = await ProductCreate.findByIdAndUpdate(req.params.id , req.body ,{
 new:true,
 runValidators:true,
 useFindAndModify:false
  })

  res.status(200).json({
   success:true,
   product
  })
  
}

// delete product only admin
exports.deleteProduct= async (req, res , next)=>{
 let product= await ProductCreate.findById(req.params.id);

 if(!product){
   return res.status(401).json({
      success:false,
      message:"Product not found"
   })
 }
 await product.remove()

 res.status(200).json({
   success:true,
   message:"Product deleted successfully"
 })
}