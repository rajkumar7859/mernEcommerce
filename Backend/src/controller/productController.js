const ProductCreate=require("../models/ProductModel")
const ErrorHandler = require("../utils/errorhandler")
const tryCatchFunc = require("../middleware/tryCatchErrorMiddleware");
const ApiFeatures = require("../utils/apiFeatures");


// Creating new product only admin can create the new products
exports.createProduct=tryCatchFunc(async( req,res , next)=>{

  req.body.user=req.user.id

 const product = await ProductCreate.create(req.body)
 res.status(201).json({
    success:true,
    product
 })
});


// Get all product 
exports.getProduct= tryCatchFunc(async(req,res)=>{

  const resultPerPage=10
  const productCount= await ProductCreate.countDocuments();


   const apiFeature = new ApiFeatures(ProductCreate.find(),req.query).search().filter().pagination(resultPerPage)
 const allProduct= await apiFeature.query
 res.status(200).json({
   success:true,
   allProduct,
   productCount
})
});

// get product details
exports.getProductDetails= tryCatchFunc(async(req,res,next)=>{

  let product =await ProductCreate.findById(req.params.id)

  if(!product){
    return next(new ErrorHandler("Product not found ", 404))
  }

  res.status(200).json({
    success:true,
    product
  })
});


// update exiting product by admin only

exports.updateProduct= tryCatchFunc(async(req, res , next)=>{
  let product = await ProductCreate.findById(req.params.id)
  if(!product)
  {
   return next(new ErrorHandler("Product not found" , 404))
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
  
});

// delete product only admin
exports.deleteProduct= tryCatchFunc(async (req, res , next)=>{
 let product= await ProductCreate.findById(req.params.id);

 if(!product){
   return next(new ErrorHandler("Product not found " , 404)) // middleware error handling
 }
// { simple error handling method below
// //  if(!product){
// //    return res.status(401).json({
// //       success:false,
// //       message:"Product not found"
// //    })
// //  }
 await product.remove()

 res.status(200).json({
   success:true,
   message:"Product deleted successfully"
 })
});

exports.createProductReview=tryCatchFunc( async (req,res,next)=>{

  const {rating , comment , productId}=req.body;
  const review={
   user:req.user._id,
   userName:req.user.userName,
  rating:Number(rating),
  comment,
  productId
  };

  const product = await ProductCreate.findById(productId);

  const isReviewed =product.reviews.find(rev=>rev.user.toString()===req.user.id.toString())

  if(isReviewed){
product.reviews.forEach(rev => {
  if(rev.user.toString()===req.user._id.toString())
  (rev.rating=rating) , (rev.comment=comment)
});
  }
  else{
    product.reviews.push(review)
    product.numOfReviews = product.reviews.length
  }

  // avg of ratings
  let avgRatings=0;
  product.ratings= product.reviews.forEach(rev=>{
avgRatings+=rev.ratings;
  })
  product.ratings = avgRatings/product.reviews.length;

  await product.save({ validateBeforeSave:false });

  res.status(200).json({
    success:true,
    product,
  })
})

// delete reviews
exports.deleteReview=tryCatchFunc(async (req, res,next)=>{

  const product = await ProductCreate.findById(req.query.productId);

  if(!product){
    return next(new ErrorHandler("Product not found" , 404))
  }

  const reviews= product.reviews.filter((rev)=> rev._id.toString() !==req.query.id.toString());

  let avgRatings=0;
  reviews.forEach((rev)=>{
    avgRatings+=rev.rating;
  })

  const ratings = avgRatings/reviews.length;

  const numOfReviews= reviews.length

  await ProductCreate.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings, 
    numOfReviews
  },{
    new :true,
    runValidators:true,
    useFindAndModify:false
  })

  res.status(200).json({
    success:true
  })

})

// get all product 
exports.getAllProductReviews= tryCatchFunc(async(req,res,next)=>{
  const product = await ProductCreate.findById(req.query.id);

  if(!product){
    return next(new ErrorHandler("Product not found" , 404));
  }

  res.status(200).json({
    success:true,
    reviews:product.reviews,
  })
})