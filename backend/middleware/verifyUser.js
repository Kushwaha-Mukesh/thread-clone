import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.jwtSecret);
    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default isLoggedIn;
