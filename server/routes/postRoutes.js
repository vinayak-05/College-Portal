import express from "express";
import multer from "multer";
import Post from "../models/Post.js";
import path from "path";

const router = express.Router();

// Image upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ _id: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// POST create new post with image
router.post("/", upload.single("image"), async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      author,
      image: req.file?.filename || null,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// POST add comment
router.post("/:id/comment", async (req, res) => {
  const { user, text } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.comments.push({ user, text });
    await post.save();
    res.json({ message: "Comment added" });
  } catch {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});


export default router;
