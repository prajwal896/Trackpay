export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 px-4 sm:px-6 md:px-12 py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
        <span className="font-serif text-lg text-white">TRACKPAY</span>
        <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.15em] uppercase text-white/45">
          <a
            href="https://linkedin.com/in/prajwaladaki"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#9b6bff] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#9b6bff] transition-colors"
          >
            Portfolio
          </a>
        </div>
      </div>
    </footer>
  );
}
