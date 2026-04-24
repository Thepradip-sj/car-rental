import jwt, { decode } from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "Not Authorized." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    req.user = await User.findById(userId).select("-password");

    next();
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: "Not authorized." });
  }
};