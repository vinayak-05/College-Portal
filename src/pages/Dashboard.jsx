import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4 animate-slide-in">
          Welcome, {name} 👋
        </h2>
        <p className="text-gray-600 text-center mb-6">
          This is your personalized dashboard. You’re logged in successfully and can now explore societies, posts, and more!
        </p>

        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700 transition duration-300"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
