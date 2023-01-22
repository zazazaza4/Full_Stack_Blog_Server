import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

// Create Comment
export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;

    if (!comment) {
      return res.json({ message: "The comment can not be empty" });
    }

    const newComment = new Comment({ comment });
    await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(newComment);
  } catch (error) {
    return res.status(500).json(error);
  }
};
