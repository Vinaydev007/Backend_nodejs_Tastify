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
        const vendorId=vendor._id
        const token=jwt.sign({vendorid:vendor._id},JWT_SecretKey,{expiresIn:"1h"})
        res.status(200).json({success:"login successfully",token,vendorId})
        console.log("successful",token)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"internal server error"})
    }
}
    const getAllVendors=async(req,res)=>{
       try {
        const vendors= await Vendor.find().populate("Restaurant");
        console.log(vendors)
        res.json({vendors})
       } catch (error) {
        console.error(error);
        res.status(500).json({message:"internal server errore"});
       }
    }

    const getVendorById = async (req, res) => {
        const vendorId = req.params.id;
      
        try {
          // Find vendor by ID and populate restaurant details
          const vendor = await Vendor.findById(vendorId).populate("Restaurant");
      
          // If vendor is not found
          if (!vendor) {
            return res.status(404).json({ message: "Vendor Not Found" });
          }
      
          let vendorrestaurantid = null;
      
          // Check if vendor has at least one restaurant
          if (vendor.Restaurant && vendor.Restaurant.length > 0) {
            vendorrestaurantid = vendor.Restaurant[0]._id;
          }
      
          // Send response
          res.status(200).json({
            vendor,
            vendorrestaurantid,
          });
      
          console.log("Vendor Data:", vendor);
          console.log("Restaurant ID:", vendorrestaurantid);
      
        } catch (error) {
          console.error("Error fetching vendor:", error);
          res.status(500).json({ message: "Internal Server Error" });
        }
      };
      
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}