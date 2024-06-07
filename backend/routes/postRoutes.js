import express from "express";
import isLoggedIn from "../middleware/verifyUser.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getOnePosts,
  likePost,
  postFeed,
  replyPost,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getOnePosts);
router.post("/create", isLoggedIn, createPost);
router.delete("/delete/:postId", isLoggedIn, deletePost);
router.get("/likePost/:postId", isLoggedIn, likePost);
router.post("/reply/:postId", isLoggedIn, replyPost);
router.post("/postFeed", isLoggedIn, postFeed);

export default router;
