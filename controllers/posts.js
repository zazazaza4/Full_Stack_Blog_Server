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
    const popularPosts = await Post.find().limit(5).sort('-views');

    if (!posts) {
      return res.json({ message: 'There are no posts ' });
    }

    res.json({ posts, popularPosts });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Post By Id
export const getById = async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    console.log(post);

    return res.json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Remove Post
export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.json({ message: 'Post does not exist' });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({ message: 'Success' });
  } catch (error) {
    res.json({ message: 'Something went wrong' });
  }
};

// Update Post
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
};
