import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onOpenSignUp: () => void;
};

export default function SignInModal({ open, onClose, onOpenSignUp }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        resetForm();
        onClose();
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-[999]">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1024]/90 backdrop-blur p-8 shadow-2xl">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/50 hover:text-white transition"
            aria-label="Close"
          >
            ✕
          </button>

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-sm">
            <span className="text-white text-lg">⚡</span>
          </div>

          <h2 className="mt-4 text-center text-2xl font-extrabold text-white">
            Welcome Back
          </h2>
          <p className="mt-1 text-center text-sm text-white/55">
            Sign in to continue
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-xs text-white/60 mb-2">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 placeholder:text-white/35 outline-none focus:border-white/20"
              />
            </div>

            <div>
              <label className="block text-xs text-white/60 mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 placeholder:text-white/35 outline-none focus:border-white/20"
              />
            </div>

            <button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-lg py-3 text-sm font-semibold text-white
                         bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500
                         transition shadow-lg shadow-blue-500/15"
            >
              Sign In
            </button>

            <p className="pt-1 text-center text-xs text-white/50">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenSignUp();
                }}
                className="text-blue-400 hover:text-blue-300"
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
