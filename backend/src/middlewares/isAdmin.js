import jwt from "jsonwebtoken";

export const isAdmin = (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" })
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    if (decoded.role !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Admin only." })
    }

    req.admin = decoded
    next()
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    })
  }
}