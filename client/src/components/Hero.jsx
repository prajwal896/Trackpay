import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useRef, useEffect } from "react";
import Countdown from "./Countdown.jsx";

const NOISE_SVG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Hero({ onSubmit, status }) {
  const [email, setEmail] = useState("");
  const videoRef = useRef(null);

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.playbackRate = 0.1; // try 0.5 (half speed) — adjust as you like
  }
}, []);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email);
  }

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden bg-black py-20">
      {/* Background video — contained to this section only */}
            {/* Background video — shrunk and centered so the full hourglass is visible */}
      <video
  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[85%] w-auto max-w-[90%] object-contain z-0 opacity-70"
  style={{
    WebkitMaskImage:
      "radial-gradient(ellipse 60% 65% at 50% 50%, black 55%, transparent 90%)",
    maskImage:
      "radial-gradient(ellipse 60% 65% at 50% 50%, black 55%, transparent 90%)",
  }}
  autoPlay
  muted
  loop
  playsInline
  src="https://zxdefgavgwfxastwmmjm.supabase.co/storage/v1/object/public/assets/hourglass.mp4"
/>

      {/* Smooth fade to solid black at the bottom — no hard seam into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top, #000000 0%, transparent 100%)",
        }}
      />

      {/* Violet glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(130% 75% at 50% 100%, rgba(155,107,255,0.16), transparent 55%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{ backgroundImage: NOISE_SVG, opacity: 0.05, mixBlendMode: "overlay" }}
      />

      <div className="relative z-10 px-4 sm:px-6 md:px-12 max-w-3xl">
        <p
          className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/50 mb-5 animate-blur-fade-up"
          style={{ animationDelay: "150ms" }}
        >
          BUILT FOR INDIAN FREELANCERS
        </p>

        <h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl leading-[0.98] tracking-[-0.01em] text-white mb-5 animate-blur-fade-up"
          style={{ animationDelay: "250ms" }}
        >
          Track hours. Bill clients.
          <br />
          <span className="italic accent-text">Get paid, faster.</span>
        </h1>

        <p
          className="text-base sm:text-lg text-white/60 max-w-xl mb-8 animate-blur-fade-up"
          style={{ animationDelay: "400ms" }}
        >
          Time tracking and invoicing, built around how Indian
          freelancers actually bill  not another US first tool that makes you
          fight the currency and tax fields.
        </p>
        
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md animate-blur-fade-up"
          style={{ animationDelay: "550ms" }}
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your email id "
            className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-[#9b6bff]"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="flex items-center justify-center gap-2 bg-[#9b6bff] hover:bg-[#b18fff] disabled:opacity-60 text-white rounded-full font-medium px-6 py-3 text-sm animate-accent-pulse transition-colors whitespace-nowrap" 
          >
            {status === "loading" ? "Joining…" : "Get pre access"}
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
      </div>
      <Countdown />
    </section>
  );
}
