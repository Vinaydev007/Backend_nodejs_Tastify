const mongoose=require("mongoose");

const vendorSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    Restaurant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Restaurant'
    }]
})

const Vendor=mongoose.model('Vendor',vendorSchema);

module.exports=Vendor;