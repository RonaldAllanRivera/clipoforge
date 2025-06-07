import React from "react";

export default function CheckoutButton() {
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:8000/api/billing/create_checkout_session/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await response.json();
    if (data.url) {
      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } else {
      alert("Failed to create Stripe Checkout session.");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
    >
      Buy Credits with Stripe
    </button>
  );
}
