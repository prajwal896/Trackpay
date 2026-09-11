import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Pain from "./components/Pain.jsx";
import Features from "./components/Features.jsx";
import SignupCTA from "./components/SignupCTA.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSignup(email) {
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navbar />
      <Hero onSubmit={handleSignup} status={status} />
      <Pain />
      <Features />
      <SignupCTA onSubmit={handleSignup} status={status} />
      <Footer />
    </div>
  );
}
