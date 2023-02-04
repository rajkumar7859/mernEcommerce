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

// get all orders -- admin
exports.getAllOrders= tryCatchFunc(async (req,res,next)=>{
    const orders = await Order.find();

    let totalAmount=0;
    let totalOrdersCounts=orders.length
    orders.forEach((order)=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        totalAmount,
        totalOrdersCounts,
        orders,
    })
})

// update order status - admin
exports.updateOrderStatus=tryCatchFunc(async ( req,res,next)=>{
const order = await Order.find(req.params.id);

if(order.orderStatus==="Delivered")
{
    return next(new ErrorHandler("You have already delivered this order" ,400))
};

order.orderItems.forEach(async (order)=>{
    await updateStock(order.Product , order.quantity)
})

order.orderStatus= req.body.status;

if(req.body.status==="Delivered")
{
    order.deliveredAt= Date.now();
}

await order.save({validateBeforeSave:false})

res.status(200).json({
    success:true
})

})

async function updateStock(id, quantity){
const product = await Product.findById(id);
product.stock -=quantity;
await product.save({validateBeforeSave:false})
};

// delete order

exports.deleteOrder= tryCatchFunc(async (req,res,next)=>{
    const order = await Order.find(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this id"  , 404))
    };

    await order.remove();

    res.status(200).json({
        success:true
    });
})