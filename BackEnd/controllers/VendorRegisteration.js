const Vendor=require("../models/Vendor")

const jwt=require("jsonwebtoken")

const bcrypt=require("bcryptjs")

const dotenv=require("dotenv")

dotenv.config();
const JWT_SecretKey=process.env.SecretKey

const vendorRegister=async (req,res)=>{
    const{Name,Email,Password}=req.body;
    try{
          const vendorEmail=await Vendor.findOne({Email})
          if(vendorEmail){
            return res.status(400).json("Email is already exist")
          }
          const hashPassword=await bcrypt.hash(Password,10);
          const newVendor= new Vendor({
            Name,
            Email,
            Password:hashPassword
          });
          await newVendor.save();
          res.status(201).json({message:"new vendor registered successfully"});
          console.log("registered")
    }catch(err){
        console.error(err);
        res.status(501).json({error:"internal server error"})
    }
}

const vendorLogin=async (req,res)=>{
    const {Email,Password}=req.body;
    try {
        const vendor=await Vendor.findOne({Email})
        if(!vendor || !(await bcrypt.compare(Password,vendor.Password))){
            return res.status(401).json({error:"Invalid Details"})
        }
        const token=jwt.sign({vendorid:vendor._id},JWT_SecretKey,{expiresIn:"1h"})
        res.status(200).json({success:"login successfully",token})
        console.log("successful",token)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal server error"})
    }
}
    const getAllVendors=async(req,res)=>{
       try {
        const vendors= await Vendor.find().populate("Restaurant");
        res.json({vendors})
       } catch (error) {
        console.error(error);
        res.status(500).json({message:"internal server errore"});
       }
    }

    const getVenderById=async(req,res)=>{
       const vendorId=req.params.id
       try {
         const vendor=await Vendor.findById(vendorId).populate("Restaurant");
         console.log(vendor);
         if(!vendor){
            return res.status(404).json({message:"Vendor not found"})
         }
         res.status(200).json({mesaage:{vendor}})
       } catch (error) {
        console.error(error)
        res.status(500).json({mesaage:"internal error"})
       }
    }
module.exports={vendorRegister,vendorLogin,getAllVendors,getVenderById}