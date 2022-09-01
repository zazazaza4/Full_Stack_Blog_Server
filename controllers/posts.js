import Post from '../models/Post.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import User from '../models/User.js';

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    const file = req.files?.image?.name;
    let fileName = null;

    if (file) {
      fileName = Date.now().toString() + file;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
    } else {
      fileName = 'default.jpg';
    }

    const newPost = new Post({
      username: user.username,
      title,
      text,
      photo: fileName,
      author: req.userId,
    });

    await newPost.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPost },
    });

    return res.status(200).json(newPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Get All Posts
export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    const popuslarPosts = await Post.find().limit(5).sort('-views');

    !posts && res.json({ message: 'There are no posts ' });
    res.json({ posts, popuslarPosts });
  } catch (error) {
    res.status(500).json(error);
  }
};