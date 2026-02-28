const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token không hợp lệ" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (error) {
        return res.status(403).json({ message: "Token hết hạn hoặc sai" });
    }
};

module.exports = authMiddleware;