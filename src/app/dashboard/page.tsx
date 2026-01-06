"use client";

import React, { useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation"; // Next.js router for navigation

const stripePromise = loadStripe("pk_test_51IKgoWIzmnO9qVSdKjNaOryMrs19fv3DJ4goJpKfLxn3e4pTxMPfubhoMUzSiRsqR8RZJX066pF0R43zU0UpgNYs00YDmzMNED"); // Stripe publishable key

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const dummyProducts: Product[] = [
  { id: 1, name: "Laptop", price: 120, description: "High performance laptop" },
  { id: 2, name: "Headphones", price: 150, description: "Noise-cancelling headphones" },
  { id: 3, name: "Smartphone", price: 189, description: "Latest model smartphone" },
  { id: 4, name: "Backpack", price: 60, description: "Durable travel backpack" },
  { id: 5, name: "Watch", price: 200, description: "Stylish smartwatch" },
];

export default function DashboardPage() {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState<number | null>(null);

   const handleBuy = async (product: Product) => {
    setLoadingId(product.id);

  // Prompt for customer info (or use logged-in user info)
  const customerName =  "Guest";
  const customerEmail = "guest@example.com";
  const customerAddress = {
    line1: "123 Street",
    city:  "City",
    postal_code:  "123456",
    country: "IN",
  };

  try {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const res = await fetch(`${apiBaseUrl}/orders/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        productName: product.name, 
        price: product.price, 
        customerName, 
        customerEmail, 
        customerAddress 
      }),
    });

    const data = await res.json();
    const stripe = await stripePromise;

    if (stripe && data.url) {
      window.location.href = data.url;
    }
  } catch (err) {
    console.error("Stripe checkout error:", err);
    alert("Something went wrong. Please try again.");
  }
};

  const handleLogout = () => {
    // Remove JWT token
    localStorage.removeItem("token");

    // Redirect to login page
    router.push("/login");
  };

  return (
    <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px" }}>
     <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px", // space below header
      }}
    >
    <h1 style={{ margin: 0 }}>Dashboard</h1>
    <button
      onClick={handleLogout}
      style={{
        width: "auto",       // ❗ prevents 100% stretch
        padding: "8px 16px",
        backgroundColor: "#ff4d4f",
        color: "#fff",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  </div>
      <p>Here are some products:</p>

      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ fontWeight: "bold" }}>₹{product.price}</p>
            <button
              onClick={() => handleBuy(product)}
              disabled={loadingId === product.id}
              style={{
                marginTop: 10,
                padding: "8px 16px",
                backgroundColor: loadingId === product.id ? "#888" : "#1e90ff",
                color: "#fff",
                border: "none",
                borderRadius: 5,
                cursor: loadingId === product.id ? "not-allowed" : "pointer",

              }}
            >
            {loadingId === product.id ? "Processing…" : "Buy Now"}
            </button>
          </div>
        ))}
      </div>

     
    </div>
  );
}
