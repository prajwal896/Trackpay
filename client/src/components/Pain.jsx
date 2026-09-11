import Reveal from "./Reveal.jsx";

const PAINS = [
  "Still tracking hours in an Excel sheet that only makes sense to you?",
  "Manually typing out the same invoice format every single month?",
  "Not sure which client still owes you money without scrolling through email?",
];

export default function Pain() {
  return (
    <section className="relative bg-black px-4 sm:px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-10">
            Freelancing shouldn't mean{" "}
            <span className="italic accent-text">running your own admin department.</span>
          </h2>
        </Reveal>

        <div className="space-y-5">
          {PAINS.map((pain, i) => (
            <Reveal key={pain} delay={i * 120}>
              <p className="text-base sm:text-lg text-white/60 border-t border-white/10 pt-5">
                {pain}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
