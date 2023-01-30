const express=require("express")
const app = express()
 const product =require("./src/routes/productRoute") // import product routes
 const errorMiddleware= require("./src/middleware/error")
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/api/v1" , product)

//  error handler middleware 
app.use(errorMiddleware)


module.exports=app