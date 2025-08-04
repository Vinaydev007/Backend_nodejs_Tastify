const Product=require('../models/Product')
const mongoose = require('mongoose');
const path = require('path');
const multer=require("multer");
const Restaurant = require('../models/Restaurant');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Uploads folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // unique name
    }
  });
  const upload=multer({storage:storage});
  const addProduct=async(req,res)=>{
    try{
       const {ProductName,Price,Category,Bestseller,Description}=req.body;
       const image=req.file? req.file.filename:undefined;

       const restaurantId=req.params.RestaurantId;
       const restaurant=await Restaurant.findById(restaurantId);
       if(!restaurant){
        return res.status(404).json({error:"No firm found"})
       }
       const product =new Product({
        ProductName,Price,Category,Bestseller,Description,image,Restaurant:[restaurant._id]
       })

       const savedProducts= await product.save();
      
       restaurant.Products.push(savedProducts);

       await restaurant.save()

       res.status(200).json({savedProducts})
  }
catch(error){
    console.error(error)
 res.status(500).json({message:"internal server error"});
};
  };

const getProductByRestaurant=async(req,res)=>{
    try {
        const restaurantid=req.params.id;
        console.error(restaurantid)
        const restaurant=await Restaurant.findById(restaurantid)
        
        
    if(!restaurant){
        return res.status(404).json({error:"No Restaurant found"})
    }

    // const products=await Product.find({restaurant:restaurantid})
// const products = await Product.find({ Restaurant: mongoose.Types.ObjectId(restaurantid) });
const products = await Product.find({
  Restaurant: new mongoose.Types.ObjectId(restaurantid)
});


    console.log(products)
    res.status(200).json({products})

    } catch (error) {
        console.error(error)
        res.status(500).json({message:"internal server error"});
    }
}

const deleteProductById=async(req,res)=>{
    try {
        const productId=req.params.productId;
        const deleteProduct=await Product.findByIdAndDelete(productId);
        if(!deleteProduct){
            return res.status(404).json({error:"product not found"})
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"internal server error"});
    }
}

module.exports={addProduct,getProductByRestaurant,deleteProductById};