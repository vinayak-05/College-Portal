import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill in all fields");

    try {
      setLoading(true);
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", res.data.name);
      alert("✅ Login successful!");
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || "❌ Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    
<div className="min-h-screen w-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 drop-shadow">
          🚀 College Portal Login
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-white/10 placeholder-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-white/10 placeholder-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-white/30 hover:bg-white/50 text-white font-semibold py-2 rounded-lg transition backdrop-blur-xl"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-white/80">
          Don’t have an account? <a href="/register" className="underline hover:text-white">Register here</a>
        </p>
      </motion.div>
    </div>
  );
} 