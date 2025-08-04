const express=require('express');
const ProductController=require("../controllers/ProductController");

const router=express.Router();

router.post('/add-product/:RestaurantId',ProductController.addProduct);
router.get('/:id/products',ProductController.getProductByRestaurant);
router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    res.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
 })

 router.delete('/:productId',ProductController.deleteProductById)
module.exports=router;