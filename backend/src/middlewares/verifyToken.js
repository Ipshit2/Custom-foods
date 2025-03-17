import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js"; 

export const verifyToken = async (req, res, next) => {
  try {
    
    console.log("Cookies:", req.cookies);

    
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        status: 401, 
        message: "Unauthorized: No token provided." 
      });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        status: 401, 
        message: "Unauthorized: User not found." 
      });
    }
    req.user = user;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ 
        status: 403, 
        message: "Unauthorized: Token expired. Please login again." 
      });
    }

    return res.status(403).json({ 
      status: 403, 
      message: "Unauthorized: Invalid token." 
    });
  }
};
