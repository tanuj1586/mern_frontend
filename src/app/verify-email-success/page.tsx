"use client";

import { useSearchParams } from "next/navigation";

export default function VerifyEmailSuccess() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message") || "No message provided";

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "100px auto",
        textAlign: "center",
        padding: "40px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h1 style={{ color: "green" }}>Email Verification</h1>
      <p style={{ fontSize: "18px", marginTop: "20px" }}>{message}</p>
      <a
        href="/login"
        style={{
          display: "inline-block",
          marginTop: "30px",
          padding: "10px 20px",
          background: "#0070f3",
          color: "#fff",
          borderRadius: "5px",
          textDecoration: "none",
        }}
      >
        Go to Login
      </a>
    </div>
  );
}
