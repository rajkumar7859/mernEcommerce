require("dotenv").config()
const app= require("./app")
const connect = require("./src/config/db")

const port=process.env.PORT
 
connect()
 
app.listen(port , ()=> {console.log(`server is running on http://localhost:${port}`)})