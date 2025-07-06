import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String, // or mongoose.Schema.Types.ObjectId if linked to User model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String, // Store the filename of the uploaded image
    default: null,
  },
  comments: [
    {
      user: String,
      text: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);
export default Post;
