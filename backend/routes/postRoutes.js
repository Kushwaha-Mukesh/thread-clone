import express from "express";
import isLoggedIn from "../middleware/verifyUser.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePosts,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getOnePosts);
router.post("/create", isLoggedIn, createPost);
router.delete("/delete/:postId", isLoggedIn, deletePost);

export default router;
