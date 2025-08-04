const Vendor = require('../models/Vendor')
const jwt = require('jsonwebtoken')
const dotEnv = require('dotenv')

dotEnv.config()
const JWT_Secretkey = process.env.SecretKey;
const verifyToken = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.status(401).json({ error: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, JWT_Secretkey); // ← Possible issue here
        console.log(decoded)
        const vendor = await Vendor.findById(decoded.vendorid)
        console.log(vendor)
        if (!vendor) {
            return res.status(404).json({ error: "Vendor Not Found" })
        }

        req.vendorId = vendor._id
        next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({ error: "Invaild Token" }) // ← Typo: "Invalid"
    }
}

module.exports = verifyToken
