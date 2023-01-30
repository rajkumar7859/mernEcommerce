const express =require("express")
const { getProduct, createProduct, updateProduct, deleteProduct } = require("../controller/productController")



const router=express.Router()

router.route("/products").get(getProduct)
router.route("/product/new").post(createProduct)
router.route("/product/:id").put(updateProduct).delete(deleteProduct)
// router.route("/product/:id").delete(deleteProduct)


module.exports=router