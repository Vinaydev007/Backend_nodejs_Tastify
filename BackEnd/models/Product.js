const mongoose=require('mongoose')
const Restaurant = require('./Restaurant')


const produtcSchema=new mongoose.Schema({
    ProductName:{
        type:String,
        required:true
    },
    Price:{
        type:String,
        required:true
    },
    Category:[{
        type:String,
        enum:["veg","non-veg"]
    }],
    image:{
        type:String
    },
    Bestseller:{
        type:Boolean
    },
    Description:{
        type:String
    },
    Restaurant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Restaurant"
    }]
})

const Product=mongoose.model("Product",produtcSchema);

module.exports=Product