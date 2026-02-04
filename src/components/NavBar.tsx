import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiX, HiChevronDown } from "react-icons/hi";
type NavBarProps = {
  onOpenSignIn: () => void;
};

const Navbar = ({ onOpenSignIn }: NavBarProps) => {
  const [open, setOpen] = useState(false); // mobile menu
  const [catOpen, setCatOpen] = useState(false); // categories dropdown
  const catRef = useRef<HTMLDivElement | null>(null);

  // close dropdown on outside click + Esc
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!catRef.current) return;
      if (!catRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCatOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="relative z-50 w-full">
      <div className="bg-gradient-to-r from-[#070A1A] via-[#0A0F2A] to-[#070A1A] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4">
          {/* 3-column layout: left (logo) | center (nav) | right (auth) */}
          <div className="grid h-16 grid-cols-2 md:grid-cols-3 items-center">
            {/* Left: Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-white">⚡</span>
                </div>
                <span className="text-white font-bold tracking-wide">
                  CompareSmartly
                </span>
              </Link>
            </div>

            {/* Center: Nav links (DESKTOP) */}
            <nav className="hidden md:flex items-center justify-center gap-4">
              <Link
                to="/"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Home
              </Link>
              {/* Categories dropdown */}

              <div className="relative" ref={catRef}>
                <button
                  type="button"
                  onClick={() => setCatOpen((v) => !v)}
                  className="text-sm text-white/70 hover:text-white transition inline-flex items-center gap-1"
                  aria-haspopup="menu"
                  aria-expanded={catOpen}
                >
                  Categories <HiChevronDown className="text-white/50 w-4 h-4" />
                </button>

                {catOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full mt-3 w-56 rounded-xl border border-white/10 bg-[#070A1A]/95 backdrop-blur shadow-lg p-2 z-50"
                  >
                    <Link
                      to="/categories/mobiles"
                      className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition"
                      onClick={() => setCatOpen(false)}
                      role="menuitem"
                    >
                      Mobiles
                    </Link>
                    <Link
                      to="/categories/laptops"
                      className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition"
                      onClick={() => setCatOpen(false)}
                      role="menuitem"
                    >
                      Laptops
                    </Link>
                    <Link
                      to="/categories/headphones"
                      className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition"
                      onClick={() => setCatOpen(false)}
                      role="menuitem"
                    >
                      Headphones
                    </Link>
                    <Link
                      to="/categories/accessories"
                      className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition"
                      onClick={() => setCatOpen(false)}
                      role="menuitem"
                    >
                      Accessories
                    </Link>

                    <div className="my-2 h-px bg-white/10" />

                    <Link
                      to="/categories"
                      className="block rounded-lg px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition"
                      onClick={() => setCatOpen(false)}
                      role="menuitem"
                    >
                      View all categories →
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/features"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Features
              </Link>
              <Link
                to="/how-it-works"
                className="text-sm text-white/70 hover:text-white transition"
              >
                How it Works
              </Link>
              <Link
                to="/reviews"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Reviews
              </Link>
            </nav>

            {/* Right: Auth buttons (DESKTOP) */}
            <div className="hidden md:flex items-center justify-end gap-4">
              <button
                onClick={() => onOpenSignIn()}
                className="text-sm text-white/70 hover:text-white transition"
              >
                Sign In
              </button>

              <Link
                to="/get-started"
                className="text-sm font-semibold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 transition"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile button (top right) */}
            <div className="md:hidden flex justify-end">
              <button
                onClick={() => setOpen((v) => !v)}
                className="border border-white/10 rounded-lg px-3 py-2 text-white"
                aria-label="Toggle menu"
              >
                {open ? <HiX size={22} /> : <HiOutlineMenu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden pb-4">
              
              <div className="mt-2 rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
              <Link
                  to="/"
                  className="block text-sm text-white/80 hover:text-white transition"
                >
                  Home
                </Link>
                <Link
                  to="/categories"
                  className="block text-sm text-white/80 hover:text-white transition"
                >
                  Categories
                </Link>
                <Link
                  to="/features"
                  className="block text-sm text-white/80 hover:text-white transition"
                >
                  Features
                </Link>
                <Link
                  to="/how-it-works"
                  className="block text-sm text-white/80 hover:text-white transition"
                >
                  How it Works
                </Link>
                <Link
                  to="/reviews"
                  className="block text-sm text-white/80 hover:text-white transition"
                >
                  Reviews
                </Link>

                <div className="h-px bg-white/10 my-2" />
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => onOpenSignIn()}
                    className="text-sm text-white/70 hover:text-white transition"
                  >
                    Sign In
                  </button>

                  <Link
                    to="/get-started"
                    className="block text-center font-semibold text-white px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
