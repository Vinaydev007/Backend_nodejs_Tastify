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
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Routes
const vendorRoutes = require("./Routes/vendorRouting");
const firmRoutes = require("./Routes/FirmRoutes");
const productRoutes = require("./Routes/ProductRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Ensure uploads directory exists (important for Render)
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// CORS
const corsOptions = {
  origin: [
    "https://vendor-iu-eight.vercel.app",
    "http://localhost:5173",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token", "Token"],
  credentials: true,
};
app.use(cors(corsOptions));

// Parse JSON (for non-multipart requests)
app.use(bodyparser.json());

// Serve static files (uploaded images)
app.use("/uploads", express.static(uploadsDir));

// Health check (useful for Render)
app.get("/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// API Routes
app.use("/vendor", vendorRoutes);
app.use("/firm", firmRoutes);
app.use("/product", productRoutes);

// Default route
app.get("/", (_req, res) => {
  res.type("text/plain").send("OK");
});

// 404 JSON (prevents HTML error pages)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found", path: req.originalUrl });
});

// Global error handler (always JSON)
app.use((err, _req, res, _next) => {
  console.error("Global error:", err);
  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
});

// Connect DB & start server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((error) => console.error("❌ MongoDB connection error:", error));
