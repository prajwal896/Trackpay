import { Timer, Users, LayoutDashboard, ListChecks, FileText, ClipboardCheck } from "lucide-react";
import Reveal from "./Reveal.jsx";

const FEATURES = [
  {
    Icon: Timer,
    title: "Track your work automatically",
    body: "Start a timer when you begin work on a client's project, stop it when done  no manual math, no forgetting hours. Forgot to start it? Log time manually after the fact.",
  },
  {
    Icon: Users,
    title: "Organize everything by client and project",
    body: "Every client gets their own profile with contact and billing info. Under each client, multiple projects  each with its own hourly rate  so different rates for different work are handled automatically.",
  },
  {
    Icon: LayoutDashboard,
    title: "See your work at a glance",
    body: "Your dashboard shows hours logged this week, how much you're owed, and how much you've actually earned this month  no digging through spreadsheets to know where you stand.",
  },
  {
    Icon: ListChecks,
    title: "Review and clean up logged time",
    body: "A full log of every time entry, filterable by client, date, or project  so before billing anyone, you can double-check everything's accurate. Edit or delete entries if something's off.",
  },
  {
    Icon: FileText,
    title: "Generate professional invoices automatically",
    body: "Pick a client, select the time entries to bill, choose a template  it auto-calculates the total, including GST, and produces a clean PDF ready to send. GST-ready, INR-first  unlike most tracking tools built for the US market.",
  },
  {
    Icon: ClipboardCheck,
    title: "Keep a record of all invoices sent",
    body: "Every invoice you've generated lives in one place, with status (paid or unpaid)  so you always know who owes you money instead of losing track in email threads.",
  },
];

export default function Features() {
  return (
    <section className="relative bg-black px-4 sm:px-6 md:px-12 py-20 md:py-28">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-white/50 mb-4 text-center">
            EVERYTHING IN ONE PLACE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-16 text-center">
            What it actually <span className="italic accent-text">does.</span>
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-8 md:gap-10">
          {FEATURES.map(({ Icon, title, body }, i) => (
            <Reveal key={title} delay={(i % 2) * 100}>
              <div className="liquid-glass rounded-2xl p-6 md:p-7 h-full">
                <div className="w-10 h-10 rounded-full bg-[#9b6bff]/15 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#9b6bff]" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">{title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
