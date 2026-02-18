// middleware/clientAuthMiddleware.js
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

/**
 * Middleware to verify JWT token from Authorization header.
 * Attaches decoded payload to req.client
 */
const verifyClientToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);

        req.client = decoded; // { client_id, email, client_name, iat, exp }
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired. Please login again." });
        }
        return res.status(401).json({ success: false, message: "Invalid token." });
    }
};

module.exports = verifyClientToken;
