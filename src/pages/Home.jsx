import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-6">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl font-bold text-blue-700 text-center"
      >
        Welcome to the College Community Portal
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-6 text-lg sm:text-xl text-gray-700 text-center max-w-2xl"
      >
        🚀 Connect, share, and grow together. <br />Explore events, post achievements, and collaborate with your peers.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-10 flex gap-4"
      >
        <a
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          Login
        </a>
        <a
          href="/register"
          className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition"
        >
          Register
        </a>
      </motion.div>
    </div>
  );
}
