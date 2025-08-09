const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const vendorRoutes = require("./Routes/vendorRouting");
const firmRoutes = require("./Routes/FirmRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const bodyparser = require("body-parser");
const cors = require("cors");
const path = require("path");

dotenv.config(); // ✅ Must be before mongoose

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());
const corsOptions = {
  origin: 'https://vendor-iu-eight.vercel.app', // frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // add any custom headers you use
  credentials: true, // if you use cookies or auth headers
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests
// app.options('*', cors(corsOptions));



app.use(bodyparser.json());

// ✅ Static path for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/all-vendors', vendorRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("<h1>WELCOME</h1>");
});

// ✅ Connect DB & start server
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected successfully");
    app.listen(port, () => {
      console.log(`server running successfully at ${port}`);
    });
  })
  .catch((error) => console.log(error));
