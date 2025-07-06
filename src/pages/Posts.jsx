import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const [image, setImage] = useState(null);
  const [comments, setComments] = useState({});
  const name = localStorage.getItem("user");

  // To store color assigned to each user
  const [colorMap, setColorMap] = useState({});

  const userColors = [
    "text-blue-600",
    "text-green-600",
    "text-purple-600",
    "text-pink-600",
    "text-yellow-600",
    "text-red-600",
    "text-indigo-600",
  ];

  const getUserColor = (user) => {
    if (colorMap[user]) return colorMap[user];

    const newColor = userColors[Object.keys(colorMap).length % userColors.length];
    setColorMap((prev) => ({ ...prev, [user]: newColor }));
    return newColor;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);

      const initialComments = {};
      res.data.forEach((post) => {
        initialComments[post._id] = "";
      });
      setComments(initialComments);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return alert("All fields required");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("author", name);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setForm({ title: "", content: "" });
      setImage(null);
      fetchPosts();
    } catch (err) {
      console.error("Failed to post", err);
      alert("Failed to post");
    }
  };

  const handleAddComment = async (postId) => {
    if (!comments[postId]) return;
    try {
      await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, {
        user: name,
        text: comments[postId],
      });
      fetchPosts();
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      fetchPosts(); // Refresh after deletion
    } catch (err) {
      console.error("Failed to delete post", err);
      alert("Could not delete post");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">📢 Community Wall</h2>

      {/* Create Post Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-xl shadow-lg"
      >
        <input
          type="text"
          name="title"
          placeholder="Post title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
        />
        <textarea
          name="content"
          placeholder="What's on your mind?"
          value={form.content}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md"
          rows="3"
        />
       <label className="block w-full mb-4 cursor-pointer bg-white text-blue-700 border border-blue-500 px-4 py-2 rounded text-center hover:bg-blue-50 transition">
  📷 Choose an image
  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="hidden"
  />
</label>

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Submit Post
        </button>
      </form>

      {/* Posts */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-5 rounded-lg shadow-md relative"
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-700 mt-2">{post.content}</p>

              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt="post"
                  className="w-full max-h-80 object-cover mt-4 rounded"
                />
              )}

              <p className="text-sm text-indigo-600 mt-3">— {post.author}</p>

              {post.author === name && (
                <button
                  onClick={() => handleDelete(post._id)}
                  className="absolute top-2 right-3 text-red-600 hover:text-red-800 text-sm"
                >
                  🗑️ Delete
                </button>
              )}

              {/* Comments */}
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-800 mb-2">💬 Comments</h4>
                {post.comments?.length > 0 ? (
                  post.comments.map((c, i) => {
                    const color = getUserColor(c.user);
                    return (
                      <div
                        key={i}
                        className={`text-sm p-2 rounded-md bg-gray-100`}
                      >
                        <span className={`font-semibold ${color}`}>{c.user}:</span>{" "}
                        {c.text}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400">No comments yet.</p>
                )}
                <div className="flex mt-3">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={comments[post._id]}
                    onChange={(e) =>
                      setComments({ ...comments, [post._id]: e.target.value })
                    }
                    className="flex-grow p-2 border border-gray-300 rounded-l-md"
                  />
                  <button
                    onClick={() => handleAddComment(post._id)}
                    className="bg-blue-600 text-white px-4 rounded-r-md hover:bg-blue-700"
                  >
                    Post
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
