import bcrypt from "bcryptjs";
import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.send({
        success: false,
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send({
      success: true,
      message: "User registered successfull",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.send({
        success: false,
        message: "User not exist",
      });
    }
    const isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) {
      return res.send({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.send({
      success: true,
      message: "User login successfull",
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
    });
    res.send({
      success: true,
      message: "User logged out"
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

const verify = async (req, res) => {
  try {
    res.send({
      success: true,
      message: "User logged In",
      user: req.user
    })
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};


export { register, login, logout, verify };
