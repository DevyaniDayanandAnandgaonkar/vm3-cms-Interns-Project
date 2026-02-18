// middleware/adminAuthMiddleware.js
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Unauthorized: No token" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains { admin_id, role_id }
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
};

exports.authorizeRoles = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role_id)) {
            return res.status(403).json({ message: "Forbidden: Insufficient role" });
        }
        next();
    };
};
