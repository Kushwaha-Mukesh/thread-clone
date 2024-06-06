import Post from "../models/postModel.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, message: posts });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getOnePosts = async (req, res) => {
  const postId = req.params;
  if (!postId) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Request." });
  }
  try {
    const post = await Post.findById(postId);
    res.status(200).json({ success: true, message: post });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const createPost = async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res
      .status(401)
      .json({ success: false, message: "Post content require." });
  }

  if (text.length > 500) {
    return res.status(402).json({
      success: false,
      message: "Post text exceeded the limit of 500 characters",
    });
  }
  try {
    const post = await Post.create({
      postedBy: req.user._id,
      text: text,
    });

    res.status(200).json({ success: true, message: post });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
export const deletePost = async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    return res.status(401).json({ success: false, message: "Invalid Request" });
  }
  try {
    const post = await Post.findById(postId);
    if (req.user._id.toString() !== post.postedBy.toString()) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized to delete post" });
    }
    await Post.findByIdAndDelete(postId);
    res
      .status(200)
      .json({ success: false, message: "Post deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
