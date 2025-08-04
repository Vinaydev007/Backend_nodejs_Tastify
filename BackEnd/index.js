const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const vendorRoutes=require("./Routes/vendorRouting")
const bodyparser=require("body-parser")
const firmRoutes=require("./Routes/FirmRoutes")
const productRoutes=require("./Routes/ProductRoutes")
const path=require('path')
const app=express()

const port=5000

dotenv.config()
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("conneted successfully")}).catch((error)=>{console.log(error)})
app.use(bodyparser.json())
app.use('/vendor',vendorRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes)
app.use('/all-vendors',vendorRoutes)
app.use('./uploads',express.static('uploads'));
app.listen(port,()=>{
    console.log(`server running successfully at ${port}`)
})

app.use("/home",(req,res)=>{
   res.send("<h1>WELCOME</h1>")
})