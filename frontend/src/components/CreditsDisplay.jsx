import React, { useEffect, useState } from "react";

export default function CreditsDisplay() {
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use Vite env variable for backend API base URL
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/billing/my_credits/`, {
      credentials: "include", // Needed for session/cookie auth; remove if using token auth
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch credits");
        return res.json();
      })
      .then(data => {
        setCredits(data.credits);
        setLoading(false);
      })
      .catch(() => {
        setCredits(null);
        setLoading(false);
      });
  }, [API_BASE_URL]);

  if (loading) return <div>Loading credits...</div>;
  if (credits === null) return <div>Could not fetch credits.</div>;

  return (
    <div className="mb-4">
      <span className="font-bold">Your Credits:</span>{" "}
      <span className="text-green-600">{credits}</span>
    </div>
  );
}
