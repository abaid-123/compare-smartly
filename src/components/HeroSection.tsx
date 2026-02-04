import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";

export default function HeroSection() {
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

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/compare"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white
                         bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500
                         transition shadow-lg shadow-blue-500/15"
            >
              Start Comparing <HiArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/how-it-works"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold
                         text-white/85 border border-white/15 hover:bg-white/5 transition"
            >
              See How it Works
            </Link>
          </div>
        </div>

        <div className="mt-12 h-px w-full bg-white/10" />
      </div>
    </section>
  );
}
