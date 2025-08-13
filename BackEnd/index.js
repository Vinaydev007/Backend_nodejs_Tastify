// const express = require("express");
// const dotenv = require("dotenv");
// const mongoose = require("mongoose");
// const vendorRoutes = require("./Routes/vendorRouting");
// const firmRoutes = require("./Routes/FirmRoutes");
// const productRoutes = require("./Routes/ProductRoutes");
// const bodyparser = require("body-parser");
// const cors = require("cors");
// const path = require("path");

// dotenv.config(); // ✅ Must be before mongoose

// const app = express();
// const port = process.env.PORT || 5000;

// const corsOptions = {
//   origin: 'https://vendor-iu-eight.vercel.app',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'token', 'Token'], // explicitly list headers
//   credentials: true
// };

// // Apply to all routes
// app.use(cors(corsOptions));

// // Handle preflight for ALL paths
// app.options('*', (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', 'https://vendor-iu-eight.vercel.app');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, token, Token');
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.sendStatus(204);
// });



// app.use(bodyparser.json());

// // ✅ Static path for uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ✅ Routes
// app.use('/vendor', vendorRoutes);
// app.use('/firm', firmRoutes);
// app.use('/product', productRoutes);
// app.use('/all-vendors', vendorRoutes);

// // ✅ Default route
// app.get("/", (req, res) => {
//   res.send("<h1>WELCOME</h1>");
// });

// // ✅ Connect DB & start server
// mongoose.connect(process.env.MONGO_URL)
//   .then(() => {
//     console.log("connected successfully");
//     app.listen(port, () => {
//       console.log(`server running successfully at ${port}`);
//     });
//   })
//   .catch((error) => console.log(error));

const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./Routes/vendorRouting");
const firmRoutes = require("./Routes/FirmRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// ✅ CORS configuration
const corsOptions = {
  origin: "https://vendor-iu-eight.vercel.app", // frontend domain
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token", "Token"], // lowercase + uppercase
  credentials: true,
};

// ✅ Enable CORS for all routes
app.use(cors(corsOptions));

// ✅ Handle all OPTIONS (preflight) requests
app.options("/", cors(corsOptions));

app.use(bodyparser.json());

// ✅ Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("<h1>WELCOME</h1>");
});

// ✅ Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((error) => console.error("❌ MongoDB connection error:", error));
