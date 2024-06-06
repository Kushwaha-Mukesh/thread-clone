import express from "express";
import {
  signIn,
  signUp,
  signOut,
  followUnfollow,
  updateProfile,
  getProfile,
} from "../controllers/user.js";
import isLoggedIn from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.get("/follow/:id", isLoggedIn, followUnfollow);
router.post("/update/:id", isLoggedIn, updateProfile);
router.get("/profile/:username", getProfile);

export default router;
