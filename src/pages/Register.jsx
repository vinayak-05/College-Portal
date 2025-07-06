import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post('/auth/register', { name, email, password });
      alert("✅ Registration successful!");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "❌ Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-md bg-white/20 border border-white/30 text-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 drop-shadow">
          📝 Register Now
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 bg-white/10 placeholder-white border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
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
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-white/30 hover:bg-white/50 text-white font-semibold py-2 rounded-lg transition backdrop-blur-xl"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-center text-sm mt-6 text-white/80">
          Already have an account? <a href="/login" className="underline hover:text-white">Login here</a>
        </p>
      </motion.div>
    </div>
  );
}
