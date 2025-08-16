// const express = require("express");
// const path = require("path");
// const multer = require("multer");
// const RestaurantController = require("../controllers/RestaurantController");
// const verifyToken = require("../middleware/verifyToken");

// const router = express.Router();

// // ✅ Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });
// const upload = multer({ storage });

// // ✅ Add firm
// router.post(
//   "/add-firm",
//   verifyToken,
//   upload.single("image"),
//   RestaurantController.addfirm
// );

// // ✅ Delete restaurant
// router.delete("/:restaurantId", RestaurantController.deleteRestaurantById);

// module.exports = router;

const express = require("express");
const path = require("path");
const verifyToken = require("../middleware/verifyToken");
const RestaurantController = require("../controllers/RestaurantController");

const router = express.Router();

// POST /firm/add-firm (JWT + file upload)
router.post(
  "/add-firm",
  verifyToken,
  RestaurantController.upload.single("image"),
  RestaurantController.addfirm
);

// DELETE /firm/:restaurantId
router.delete("/:restaurantId", RestaurantController.deleteRestaurantById);

module.exports = router;




