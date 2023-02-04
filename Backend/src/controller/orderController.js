const Order=require("../models/orderModel");
const Product= require("../models/ProductModel");
const tryCatchFunc= require("../middleware/tryCatchErrorMiddleware");
const ErrorHandler= require("../utils/errorhandler");


// create new order
exports.newOrder= tryCatchFunc( async (req, res,next)=>{
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    }= req.body

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    })

    res.status(200).json({
        success:true,
        order,
    })
})

// get single order
exports.getSingleOrder= tryCatchFunc(async (req, res,next)=>{
    const order = await Order.findById(req.params.id).populate(
        "user",
        "userName email"
    );

    if(!order){
        return next(new ErrorHandler("Order not found with this Id" , 404))
    }

    res.status(200).json({
        success:true,
        order,
    })
})

// get logged in user order

exports.getMyOrder= tryCatchFunc(async (req,res,next)=>{
    const orders = await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders
    })

})