import Comment from '../models/Comment.js';

// Create Comment
export const createComment = async (req, res) => {
  try {
    const { postId } = req.body;

    const newComment = await Comment(req.body);
    const savedComment = await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (error) {
      return res.status(500).json(error);
    }

    return res.status(200).json(savedComment);
  } catch (error) {
    return res.status(500).json(error);
  }
};
