const path = require('path'); // ✅ FIX
const Restaurant = require('../models/Restaurant');
const Vendor = require("../models/Vendor");
const multer = require('multer');

// ✅ Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // store in /uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ensure unique file names
  }
});

const upload = multer({ storage: storage });

// ✅ Add Restaurant
const addfirm = async (req, res) => {
  try {
    const { firmname, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    if(vendor.Restaurant.length>0)
     {
      res.status(400).json({message:"vendor should have only one restaurant"})
     }
    const firm = new Restaurant({
      firmname,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id
    });

    const savedFirm = await firm.save();

    const firmid=savedFirm._id
    vendor.Restaurant.push(savedFirm);
    await vendor.save();

    return res.status(200).json({ message: "Firm added successfully",firmid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Restaurant
const deleteRestaurantById = async (req, res) => {
  try {
    const restaurantId = req.params.RestaurantId;
    const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!deletedRestaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Export with multer middleware
module.exports = {
  addfirm: [upload.single('image'), addfirm],
  deleteRestaurantById
};

