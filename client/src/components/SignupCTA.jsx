import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function SignupCTA({ onSubmit, status }) {
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email);
  }

  return (
    <section
      id="signup"
      className="relative bg-black px-4 sm:px-6 md:px-12 py-20 md:py-28 border-t border-white/10"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(155,107,255,0.10), transparent 60%)",
        }}
      />
      <div className="relative max-w-xl mx-auto text-center">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4">
            Pre-register now.{" "}
            <span className="italic accent-text">Free until launch.</span>
          </h2>
          <p className="text-white/55 mb-8">
            Simple pricing after  no card required to join the waitlist.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your emailid"
              className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#9b6bff]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="flex items-center justify-center gap-2 bg-[#9b6bff] hover:bg-[#b18fff] disabled:opacity-60 text-white rounded-full font-medium px-6 py-3 text-sm animate-accent-pulse transition-colors whitespace-nowrap"        
               >
              {status === "loading" ? "Joining…" : "Pre-register"}
              {status !== "loading" && <ArrowRight size={16} />}
            </button>
          </form>
          {status === "success" && (
            <p className="mt-3 text-sm text-[#b18fff]">
              You're on the list  we'll email you when it's ready.
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-sm text-red-400">
              Something went wrong  please try again.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
