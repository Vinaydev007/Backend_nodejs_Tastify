const express=require('express')
const RestaurantController=require('../controllers/RestaurantController');
const verifyToken =require("../middleware/verifyToken")

const router=express.Router()

router.post('/add-firm',verifyToken,RestaurantController.addfirm);
router.get('/uploads/:imageName',(req,res)=>{
   const imageName=req.params.imageName;
   res.headersSent('Content-Type','image/jpeg');
   res.sendFile(path.join(__dirname,'..','uploads',imageName));
})
router.delete('/:restaurantId',RestaurantController.deleteRestaurantById)


module.exports=router;