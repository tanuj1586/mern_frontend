"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${apiBaseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // Save token in localStorage
        localStorage.setItem("token", data.token); // assuming backend returns { token: "..." }

        router.push("/dashboard");
      } else {
        const err = await res.json();
        setError(err.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "80px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
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

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

        <hr style={{ margin: "20px 0" }} />

      <button
        style={{ width: "100%", marginBottom: 10 }}
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        Login with Google
      </button>
      <button
        style={{ width: "100%" }}
        onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
      >
        Login with Facebook
      </button>
    </div>
  );
}
