import express from "express";
import {
  signIn,
  signUp,
  signOut,
  followUnfollow,
} from "../controllers/user.js";
import isLoggedIn from "../middleware/verifyUser.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);
router.get("/follow/:id", isLoggedIn, followUnfollow);

export default router;
