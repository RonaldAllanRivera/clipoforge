import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function DashboardPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const accessToken = localStorage.getItem("accessToken");
      const res = await fetch(`${API_BASE_URL}/auth/users/me/`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (res.ok) {
        setUser(await res.json());
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 bg-white border rounded shadow">
      <h1 className="text-3xl font-bold mb-4 text-center">Dashboard</h1>
      {user && (
        <>
          <p className="mb-2 text-center text-lg">Welcome, <span className="font-bold">{user.email}</span></p>
          <p className="mb-6 text-center text-xl">Credits: <span className="font-mono text-blue-700">{user.credits}</span></p>
        </>
      )}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
}
