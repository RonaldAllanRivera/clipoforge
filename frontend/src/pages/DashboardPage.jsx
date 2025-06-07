import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // <-- Import context

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth(); // <-- Get logout from context

  const handleLogout = () => {
    logout(); // <-- Context-based logout (removes tokens, updates auth state)
    navigate("/auth");
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 bg-white border rounded shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to your Dashboard!</h1>
      <p className="mb-6 text-center">You are successfully logged in with JWT authentication.</p>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
