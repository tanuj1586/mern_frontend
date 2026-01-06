"use client";

import Navbar from "./components/Navbar";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <main style={{ textAlign: "center", marginTop: 80 }}>
        <h2>Welcome to My App!</h2>
        <p>This is the home page. Please register or login to continue.</p>
      </main>
    </div>
  );
}
