import { Link, useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function HeroSection() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function goCompare() {
    const query = q.trim();
    navigate(query ? `/compare?q=${encodeURIComponent(query)}` : "/compare");
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#070A1A] via-[#060818] to-[#050815]" />

      <div className="pointer-events-none absolute left-1/2 top-[-120px] h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute left-[15%] top-[120px] h-[260px] w-[260px] rounded-full bg-indigo-500/15 blur-3xl" />
      <div className="pointer-events-none absolute right-[15%] top-[160px] h-[260px] w-[260px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-12 md:pt-24 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Compare Prices{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Smartly
            </span>
            <br />
            <span className="text-white/85">Save Money Instantly</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm md:text-lg text-white/60 leading-relaxed">
            Find the best deals across hundreds of online stores with AI-
            <br />
            powered recommendations.
          </p>

          {/* Search bar (new) */}
          <div className="mx-auto mt-7 max-w-2xl">
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur px-3 py-3 shadow-lg shadow-blue-500/10">
              <FiSearch className="h-5 w-5 text-white/50" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") goCompare();
                }}
                placeholder="Search a product to compare prices (e.g., iPhone 15 Pro, AirPods Pro)"
                className="w-full bg-transparent text-sm md:text-base text-white placeholder:text-white/35 outline-none"
              />
              <button
                type="button"
                onClick={goCompare}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-xs md:text-sm font-semibold text-white
                           bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500
                           transition shadow-lg shadow-blue-500/15 whitespace-nowrap"
              >
                Search & Compare <HiArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* small link instead of big second button */}
            <div className="mt-3">
              <Link
                to="/how-it-works"
                className="text-xs md:text-sm text-white/55 hover:text-white/80 transition underline underline-offset-4"
              >
                How it works →
              </Link>
            </div>
          </div>

          {/* Optional: keep a single CTA row (if you still want) */}
          {/* If you want the old button too, we can add it back, but this is cleaner. */}
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
