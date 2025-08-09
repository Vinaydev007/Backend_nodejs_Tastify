
const express = require('express');
const ProductController = require("../controllers/ProductController");
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// ✅ Route with multer middleware
router.post(
  '/add-product/:RestaurantId',
  upload.single('image'),
  ProductController.addProduct
);

// ✅ Route to get products
router.get('/:id/products', ProductController.getProductByRestaurant);

// ✅ Serve image
router.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.setHeader('Content-Type', 'image/jpeg');
  res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

// ✅ Delete product
router.delete('/:productId', ProductController.deleteProductById);

module.exports = router;
