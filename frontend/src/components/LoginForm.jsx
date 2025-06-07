import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // <-- Import context

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth(); // <-- Get login from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/jwt/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        if (data.access) {
          login({ access: data.access, refresh: data.refresh }); // <-- Context-based login
        }
        onSuccess?.(data);
      } else {
        setError(
          data.detail ||
          data.non_field_errors?.[0] ||
          data.email?.[0] ||
          data.password?.[0] ||
          "Login failed."
        );
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-8 p-6 border rounded bg-white shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <input
        type="email"
        className="w-full border mb-3 p-2 rounded"
        placeholder="Email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full border mb-3 p-2 rounded"
        placeholder="Password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
