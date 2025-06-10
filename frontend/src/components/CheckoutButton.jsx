import React, { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function CheckoutButton({ creditsToBuy = 10 }) {
  const [loading, setLoading] = useState(false);

  const handleBuyCredits = async () => {
    setLoading(true);
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`${API_BASE_URL}/api/create-stripe-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ credits: creditsToBuy }),
    });
    const data = await res.json();
    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleBuyCredits}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-4 w-full"
      disabled={loading}
    >
      {loading ? "Redirecting to Stripe..." : `Buy ${creditsToBuy} Credits`}
    </button>
  );
}
