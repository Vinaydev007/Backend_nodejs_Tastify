// const express=require('express')
// const RestaurantController=require('../controllers/RestaurantController');
// const verifyToken =require("../middleware/verifyToken")

// const router=express.Router()

// router.post('/add-firm',verifyToken,RestaurantController.addfirm);
// router.get('/uploads/:imageName',(req,res)=>{
//    const imageName=req.params.imageName;
//    res.headersSent('Content-Type','image/jpeg');
//    res.sendFile(path.join(__dirname,'..','uploads',imageName));
// })
// router.delete('/:restaurantId',RestaurantController.deleteRestaurantById)


// module.exports=router;
const express = require("express");
const path = require("path");
const RestaurantController = require("../controllers/RestaurantController");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// ✅ Add firm
router.post("/add-firm", verifyToken, RestaurantController.addfirm);

// ✅ Serve firm images
// router.get("/uploads/:imageName", (req, res) => {
//   const imageName = req.params.imageName;
//   res.setHeader("Content-Type", "image/jpeg");
//   res.sendFile(path.join(__dirname, "..", "uploads", imageName));
// });

// ✅ Delete restaurant by ID
router.delete("/:restaurantId", RestaurantController.deleteRestaurantById);

module.exports = router;
