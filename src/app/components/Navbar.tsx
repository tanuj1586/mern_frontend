"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token"); // or "user" etc.
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear login
    setIsLoggedIn(false);
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1e90ff",
        color: "#fff",
      }}
    >
      <h1 style={{ margin: 0 }}>My App</h1>
      <div style={{ display: "flex", gap: 15 }}>
        {!isLoggedIn ? (
          <>
            <Link href="/signup" style={{ color: "#fff", textDecoration: "none" }}>
              Register
            </Link>
            <Link href="/login" style={{ color: "#fff", textDecoration: "none" }}>
              Login
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
