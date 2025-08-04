const Restaurant=require('../models/Restaurant')
const Vendor=require("../models/Vendor");
const multer =require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads"); // Uploads folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // unique name
    }
  });
  const upload=multer({storage:storage});
const addfirm=async(req,res)=>{
    try {
        const {firmname,area,category,region,offer}=req.body

        const image=req.file? req.file.filename:undefined;
        const vendor=await Vendor.findById(req.vendorId);
        if(!vendor){
            res.status(404).json({message:"vendor not found"})
        }
        const firm= new Restaurant({
           firmname,area,category,region,offer,image,vendor:vendor._id
        })
   
        const Savedfirm=await firm.save();
        vendor.Restaurant.push(Savedfirm)

        await vendor.save()
        return res.status(200).json({message:"firm added successfully"})
    } catch (error) {
        console.error(error)
        res.status(500).json("internal server error")
    }
}

const deleteRestaurantById=async(req,res)=>{
  try {
      const restaurantId=req.params.RestaurantId;
      const deleteRestaurant=await Restaurant.findByIdAndDelete(restaurantId);
      if(!deleteRestaurant){
          return res.status(404).json({error:"product not found"})
      }
  } catch (error) {
      console.error(error)
      res.status(500).json({message:"internal server error"});
  }
}

module.exports={addfirm:[upload.single('image'),addfirm],deleteRestaurantById}