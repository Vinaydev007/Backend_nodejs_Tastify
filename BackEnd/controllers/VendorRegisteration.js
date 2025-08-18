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

// const vendorLogin=async (req,res)=>{
//     const {Email,Password}=req.body;
//     try {
//         const vendor=await Vendor.findOne({Email})
//         if(!vendor || !(await bcrypt.compare(Password,vendor.Password))){
//             return res.status(401).json({error:"Invalid Details"})
//         }
//         const vendorId=vendor._id
//         const token=jwt.sign({vendorid:vendor._id},JWT_SecretKey,{expiresIn:"1h"})
//         res.status(200).json({success:"login successfully",token,vendorId})
//         console.log("successful",token)
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({message:"internal server error"})
//     }
// }

const vendorLogin = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const vendor = await Vendor.findOne({ Email });
    if (!vendor) return res.status(401).json({ error: "Invalid Email" });

    const isMatch = await bcrypt.compare(Password, vendor.Password);
    if (!isMatch) return res.status(401).json({ error: "Invalid Password" });

    if (!SecretKey) {
      console.error("❌ SecretKey is missing!");
      return res.status(500).json({ error: "Server config error" });
    }

    const token = jwt.sign({ vendorid: vendor._id }, SecretKey, { expiresIn: "1h" });
    res.status(200).json({ success: "login successfully", token, vendorId: vendor._id });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ message: "internal server error" });
  }
};

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

// const Vendor = require("../models/Vendor");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // ✅ Register Vendor
// const vendorRegister = async (req, res) => {
//   const { Name, Email, Password } = req.body;

//   try {
//     const vendorEmail = await Vendor.findOne({ Email });
//     if (vendorEmail) {
//       return res.status(400).json({ error: "Email already exists" });
//     }

//     const hashPassword = await bcrypt.hash(Password, 10);
//     const newVendor = new Vendor({
//       Name,
//       Email,
//       Password: hashPassword,
//     });

//     await newVendor.save();

//     res.status(201).json({ message: "Vendor registered successfully" });
//     console.log("✅ Vendor registered");
//   } catch (err) {
//     console.error("Vendor Register Error:", err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // ✅ Login Vendor
// const vendorLogin = async (req, res) => {
//   const { Email, Password } = req.body;

//   try {
//     const vendor = await Vendor.findOne({ Email });
//     if (!vendor || !(await bcrypt.compare(Password, vendor.Password))) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // ✅ Consistent payload & secret
//     // const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, {
//     //   expiresIn: "1h",
//     // });
//     const token = jwt.sign({ vendorid: vendor._id }, process.env.SecretKey, {
//   expiresIn: "1h",
// });


//     res.status(200).json({
//       success: "Login successful",
//       token,
//       vendorId: vendor._id,
//     });

//     console.log("✅ Vendor login success:", token);
//   } catch (error) {
//     console.error("Vendor Login Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ✅ Get All Vendors
// const getAllVendors = async (req, res) => {
//   try {
//     const vendors = await Vendor.find().populate("Restaurant");
//     res.json({ vendors });
//   } catch (error) {
//     console.error("Get Vendors Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// // ✅ Get Vendor By Id
// const getVendorById = async (req, res) => {
//   const vendorId = req.params.id;

//   try {
//     const vendor = await Vendor.findById(vendorId).populate("Restaurant");

//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     let vendorrestaurantid = null;
//     if (vendor.Restaurant && vendor.Restaurant.length > 0) {
//       vendorrestaurantid = vendor.Restaurant[0]._id;
//     }

//     res.status(200).json({ vendor, vendorrestaurantid });

//     console.log("✅ Vendor fetched:", vendor._id);
//   } catch (error) {
//     console.error("Get Vendor Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// module.exports = {
//   vendorRegister,
//   vendorLogin,
//   getAllVendors,
//   getVendorById,
// };
