import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Protect middleware: checks JWT token validity and user existence
export const protect = async (req, res, next) => {
  let token = null;

  // Try to get token from Authorization header or cookies
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }

    // Attach user info to request
    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

// ✅ Admin-only access
export const authorizeUsers = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};

// ✅ Police or Admin-only access
export const authorizeReports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  if (!["admin", "police"].includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden: Police or Admin only" });
  }
  next();
};
