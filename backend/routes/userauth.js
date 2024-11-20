require("dotenv").config();
const jwt = require("jsonwebtoken");
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication token is required." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid or expired." });
      }
      req.user = user; 
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error("Error during token authentication:", error.message);
    res.status(500).json({ message: "An internal error occurred." });
  }
};

module.exports = { authenticateToken };
