import jwt from "jsonwebtoken";
import { Customer } from "../models/customer.model.js"; 

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

    const customer = await Customer.findById(decoded.customerid);
    if (!customer) {
      return res.status(401).json({ 
        status: 401, 
        message: "Unauthorized: customer not found." 
      });
    }
    req.customer = customer;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);

    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ 
        status: 403, 
        message: "Unauthorized: Token expired. user Please login again." 
      });
    }

    return res.status(403).json({ 
      status: 403, 
      message: "Unauthorized: Invalid token." 
    });
  }
};
