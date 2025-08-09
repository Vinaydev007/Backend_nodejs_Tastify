const vendorController=require("../controllers/VendorRegisteration")

const express=require("express")

const router=express.Router();

router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.get('/single-vendor/:id',vendorController.getVendorById)
router.get('/all-vendors',vendorController.getAllVendors)
module.exports=router;