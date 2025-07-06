import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import Societies from "./pages/Societies";
import Layout from "./pages/Layout";
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen  bg-gray-100">
        {/* Navbar */}
        <nav className="bg-white shadow px-8 py-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-2xl font-bold text-blue-600">College Portal</h1>
          <div className="space-x-6 text-base">
            <Link to="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
            <Link to="/register" className="text-gray-700 hover:text-blue-500">Register</Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-500">Dashboard</Link>
              <Link to="/posts" className="text-gray-700 hover:text-blue-500">Posts</Link>
            <Link to="/societies" className="text-gray-700 hover:text-blue-500">Societies</Link>

          </div>
        </nav>

   <main className="flex-1">
  <Routes>
    <Route path="/" element={<Layout><Home /></Layout>} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
    <Route path="/posts" element={<Layout><Posts /></Layout>} />
    <Route path="/societies" element={<Layout><Societies /></Layout>} />
  </Routes>
</main>

      </div>
    </Router>
  );
}
