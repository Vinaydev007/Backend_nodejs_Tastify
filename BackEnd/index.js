// const express = require("express");
// const dotEnv = require('dotenv');
// const mongoose = require('mongoose');
// const vendorRoutes = require('./Routes/vendorRouting');
// const bodyParser = require('body-parser');
// const firmRoutes = require('./Routes/FirmRoutes');
// const productRoutes = require('./Routes/ProductRoutes');
// const cors = require('cors');
// const path = require('path');

// const app = express()

// const PORT = process.env.PORT || 5000;

// dotEnv.config();
// app.use(cors())

// mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log("MongoDB connected successfully!"))
//     .catch((error) => console.log(error))

// app.use(bodyParser.json());
// app.use('/vendor', vendorRoutes);
// app.use('/firm', firmRoutes)
// app.use('/product', productRoutes);
// app.use('/uploads', express.static('uploads'));

// app.listen(PORT, () => {
//     console.log(`server started and running at ${PORT}`);
// });

// app.use('/', (req, res) => {
//     res.send("<h1> Welcome to SUBY");
// })

const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./Routes/vendorRouting');
const firmRoutes = require('./Routes/FirmRoutes');
const productRoutes = require('./Routes/ProductRoutes');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

dotEnv.config();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // parse JSON body
app.use(express.urlencoded({ extended: true })); // parse form data

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((error) => console.log(error));

// ✅ Routes
app.use('/vendor', vendorRoutes);
app.use('/firm', firmRoutes);
app.use('/product', productRoutes);
app.use('/uploads', express.static('uploads'));

// ✅ Root route
app.get('/', (req, res) => {
  res.send("<h1>Welcome to SUBY</h1>");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`server started and running at ${PORT}`);
});
