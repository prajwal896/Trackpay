import { useEffect, useState } from "react";

// Fixed launch target: Oct 2, 2026, 11:00 AM IST — does NOT shift on reload.
const LAUNCH_DATE = new Date("2026-10-02T11:00:00+05:30");

function getTimeLeft() {
  const diff = LAUNCH_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

export default function Countdown() {
  const [t, setT] = useState(getTimeLeft());
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );

  useEffect(() => {
    const timer = setInterval(() => setT(getTimeLeft()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile: normal document flow, centered, right after the form —
  // can never overlap anything since it's not floating over other content.
  // Desktop: pinned to the bottom-right corner near the hourglass.
  const wrapperStyle = isMobile
    ? {
        position: "static",
        margin: "24px auto 0",
        display: "block",
      }
    : {
        position: "absolute",
        bottom: "20px",
        right: "48px",
        zIndex: 10,
      };

  return (
    <div
      className="liquid-glass rounded-2xl text-center animate-blur-fade-up"
      style={{
        padding: "12px 16px",
        maxWidth: "200px",
        animationDelay: "480ms",
        ...wrapperStyle,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "8px" }}>
        {[
          { label: "D", value: t.days },
          { label: "H", value: t.hours },
          { label: "M", value: t.minutes },
        ].map(({ label, value }, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ textAlign: "center" }}>
              <div className="font-serif" style={{ fontSize: "20px", color: "#fff", lineHeight: 1 }}>
                {String(value).padStart(2, "0")}
              </div>
              <div className="font-mono" style={{ fontSize: "8px", letterSpacing: "0.15em", color: "#9b6bff", marginTop: "2px" }}>
                {label}
              </div>
            </div>
            {i < 2 && <div style={{ width: "1px", height: "16px", background: "rgba(255,255,255,0.1)" }} />}
          </div>
        ))}
      </div>
      <p className="font-mono" style={{ fontSize: "9px", letterSpacing: "0.02em", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
        to launch — stay tuned, we'll update you
      </p>
    </div>
  );
}