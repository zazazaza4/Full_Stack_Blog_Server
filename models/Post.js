import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);
