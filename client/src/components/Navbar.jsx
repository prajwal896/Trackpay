export default function Navbar() {
  return (
    <header className="relative z-50 w-full bg-white border-b border-black/10">
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-5">
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-3">
  <span className="font-serif text-2xl tracking-[0.02em] text-[#0b0a12]">
    TRACKPAY
  </span>
  <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-black/40">
    FOR FREELANCERS
  </span>
</div>
        <a
          href="#signup"
          className="rounded-full bg-[#0b0a12] hover:bg-[#0b0a12]/90 transition-colors px-5 md:px-6 py-2 text-sm text-white"
        >
          Get early access
        </a>
      </nav>
    </header>
  );
}
