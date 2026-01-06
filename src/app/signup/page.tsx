"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(""); // new state for messages

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // clear previous messages

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${apiBaseUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Signup failed");
      }

      // Success
      setMessage("User registered. Please check your email to verify your account.");
      // ✅ Clear inputs
      setEmail("");
      setPassword("");

      setTimeout(() => {
        setMessage("");
      }, 4000);

    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Sign Up</h2>

      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
        <button
        type="button"
        onClick={() => router.push("/login")}
        style={{
          marginTop: 10,
          background: "transparent",
          color: "#0070f3",
          border: "none",
          cursor: "pointer",
        }}
        >
        Already have an account? Login
      </button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>} {/* show message */}
    </div>
  );
}
