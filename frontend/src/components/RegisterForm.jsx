import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RegisterForm({ onSuccess }) {
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState(""); // Renamed from password
    const [password2, setPassword2] = useState(""); // Renamed from rePassword
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/users/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: password1, re_password: password2 }), // Correctly uses password1 and password2
      });
      const data = await response.json();
      if (response.ok) {
        onSuccess?.(data);
      } else {
        setError(
          data.non_field_errors?.[0] ||
          data.email?.[0] ||
          data.password?.[0] ||
          data.re_password?.[0] ||
          JSON.stringify(data) ||
          "Registration failed."
        );
      }
    } catch (err) {
      console.error("Registration network error:", err); // Log the actual error
      setError("Network error. Please try again.");
    }
    setLoading(false);
};


  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-8 p-6 border rounded bg-white shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
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
        value={password1} // Uses renamed state variable
        onChange={e => setPassword1(e.target.value)}
      />
      <input
        type="password"
        className="w-full border mb-3 p-2 rounded"
        placeholder="Repeat Password"
        required
        value={password2} // Uses renamed state variable
        onChange={e => setPassword2(e.target.value)} // Uses renamed state setter

      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Registering..." : "Sign Up"}
      </button>
    </form>
  );
}
