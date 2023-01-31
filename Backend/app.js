const express=require("express")
const app = express()
 const product =require("./src/routes/productRoute") // import product routes
 const user=require("./src/routes/userRoute")
 const errorMiddleware= require("./src/middleware/error")
const cookieParser = require("cookie-parser")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1" , product)
app.use("/api/v1" ,user)

//  error handler middleware 
app.use(errorMiddleware)


module.exports=app