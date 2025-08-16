
// const Vendor = require('../models/Vendor');
// const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

// dotenv.config();
// const JWT_SECRET = process.env.SecretKey;

// const verifyToken = async (req, res, next) => {
//   try {
//     // ✅ Support both "token" header and "Authorization: Bearer <token>"
//     let token = req.headers.token;
//     console.log(token);
//     if (!token && req.headers.authorization) {
//       const parts = req.headers.authorization.split(" ");
//       if (parts.length === 2 && parts[0] === "Bearer") {
//         token = parts[1];
//       }
//     }

//     if (!token) {
//       return res.status(401).json({ error: "Token is required" });
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (!decoded || !decoded.vendorid) {
//       return res.status(401).json({ error: "Invalid token" });
//     }

//     const vendor = await Vendor.findById(decoded.vendorid);
//     if (!vendor) {
//       return res.status(404).json({ error: "Vendor not found" });
//     }

//     req.vendorId = vendor._id;
//     next();
//   } catch (error) {
//     console.error("Token verification error:", error.message);
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// module.exports = verifyToken;


const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.SecretKey;

const verifyToken = async (req, res, next) => {
  try {
    // ✅ Support both "token" header and "Authorization: Bearer <token>"
    let token = req.headers.token;
    if (!token && req.headers.authorization) {
      const parts = req.headers.authorization.split(" ");
      if (parts.length === 2 && parts[0] === "Bearer") {
        token = parts[1];
      }
    }

    if (!token) {
      return res.status(401).json({ error: "Token is required" });
    }

    // ✅ Decode token
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // ✅ Find vendor by decoded.id
    const vendor = await Vendor.findById(decoded.id);
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    req.vendorId = vendor._id; // attach vendorId to request
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
