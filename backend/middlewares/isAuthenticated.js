import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.send({
        success: false,
        message: "No token provided",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decode.id).select("-password");
    if (!user) {
      return res.send("Invalid token");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
};
