import Post from "../models/Post.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { title, text, category } = req.body;
    const user = await User.findById(req.userId);

    const file = req.files?.image?.name;
    let fileName = null;

    if (file) {
      fileName = Date.now().toString() + file;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, "..", "uploads", fileName));
    } else {
      fileName = "default.jpg";
    }

    const newPost = new Post({
      username: user.username,
      title,
      text,
      category,
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
  console.log(req.query);
  let { username, category: categoryName, limit, page } = req.query;
  page = page || 1;
  limit = limit || 9;
  let offset = page * limit - limit;

  try {
    let posts = [];
    if (!username && !categoryName) {
      posts = await Post.find().skip(offset).limit(limit).sort("-createdAt");
    } else if (username && !category) {
      posts = await Post.find({ username })
        .skip(offset)
        .limit(limit)
        .sort("-createdAt");
    } else if (!username && categoryName) {
      posts = await Post.find({
        category: categoryName,
      })
        .skip(offset)
        .limit(limit)
        .sort("-createdAt");
    } else if (username && categoryName) {
      posts = await Post.find(
        {
          username,
        },
        { category: categoryName }
      )
        .skip(offset)
        .limit(limit)
        .sort("-createdAt");
    }

    const popularPosts = await Post.find().limit(5).sort("-views");

    return res.json({ posts, popularPosts });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Post By Id
export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });

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
      return res.json({ message: "Post does not exist" });
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });

    res.json({ message: "Success" });
  } catch (error) {
    res.json({ message: "Something went wrong" });
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

export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const list = await Promise.all(
      post.comments?.map((comment) => {
        return Comment.findById(comment);
      })
    );
    return res.status(200).json(list);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Something went wrong" });
  }
};
