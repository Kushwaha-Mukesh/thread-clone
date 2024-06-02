import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import generateTokenAndCookie from "../utils/generateTokenAndCookie.js";

export const signUp = async (req, res) => {
  const { username, name, email, password } = req.body;
  if (!username || !name || !email || !password) {
    return res
      .status(401)
      .json({ success: false, message: "All credentials required!" });
  }
  try {
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (user) {
      return res
        .status(301)
        .json({ success: false, message: "User already exists!" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      username,
      email,
      name,
      password: hashPassword,
    });
    await newUser.save();
    generateTokenAndCookie(newUser._id, res);
    res.status(200).json({
      success: true,
      message: "User Registered Successfully!",
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      name: newUser.name,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
    console.log("Error in signUp: " + error.message);
  }
};

export const signIn = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(401)
      .json({ success: false, message: "All credentials required!" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(301)
        .json({ success: false, message: "User does not exist!" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Credentials!" });
    }
    generateTokenAndCookie(user._id, res);
    res.status(200).json({
      success: true,
      message: "Sign In Successfully!",
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error." });
    console.log("Error in signIn: " + error.message);
  }
};

export const signOut = (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        maxAge: 1,
      })
      .json({ success: true, message: "Sign Out Successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log("Error in logOut: " + error.message);
  }
};
