import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { useAuthstore } from "../store/useauthstore.js";

const SingupPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { singup, isSigningUp } = useAuthstore();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await singup(formData);
    if (result.success) navigate("/");
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f4f3f8] p-4 text-slate-900 sm:p-8">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl shadow-slate-900/10 md:min-h-[620px] md:grid-cols-2">
        <div className="flex flex-col justify-center px-7 py-10 sm:px-12 lg:px-16">
          <Link to="/" className="mb-12 flex w-fit items-center gap-2 font-semibold tracking-tight">
            <span className="grid size-8 place-items-center rounded-lg bg-violet-100 text-violet-700">✦</span>
            <span>AI Referral</span>
          </Link>

          <div className="mb-8">
            <p className="mb-3 text-sm font-medium text-violet-700">Get started</p>
            <h1 className="text-3xl font-semibold tracking-tight">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500">
              Sign up to start finding your next opportunity.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
                Full name
              </label>
              <div className="relative">
                <UserRound className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                  placeholder="Your name"
                  required
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  placeholder="you@example.com"
                  required
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-12 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSigningUp}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-violet-700 px-4 text-sm font-semibold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningUp ? "Creating account..." : "Create account"}
              {!isSigningUp && <ArrowRight className="size-4" />}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-violet-700 hover:text-violet-800">
              Log in
            </Link>
          </p>
        </div>

        <aside className="relative hidden flex-col justify-between overflow-hidden bg-violet-800 p-10 text-white md:flex lg:p-12">
          <div className="absolute -right-24 -top-24 size-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-36 -left-20 size-96 rounded-full border border-white/10" />
          <div className="relative flex justify-end">
            <span className="grid size-10 place-items-center rounded-full bg-violet-950/40 text-xl">↗</span>
          </div>

          <div className="relative mx-auto w-full max-w-sm rounded-xl bg-white p-5 text-slate-900 shadow-xl">
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold">Your job search</p>
                <p className="mt-1 text-[11px] text-slate-400">More connections, more opportunities</p>
              </div>
              <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-medium text-violet-700">This year</span>
            </div>
            <div className="relative h-32">
              <div className="absolute inset-0 flex flex-col justify-between">
                <span className="border-t border-slate-100" />
                <span className="border-t border-slate-100" />
                <span className="border-t border-slate-100" />
              </div>
              <svg viewBox="0 0 320 110" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <path d="M0 83 C30 77 34 65 65 70 S100 55 130 62 S162 44 194 51 S230 36 257 44 S294 35 320 22" fill="none" stroke="#c4b5fd" strokeWidth="3" />
                <path d="M0 98 C35 91 40 83 70 87 S105 74 134 79 S169 62 197 70 S230 54 262 61 S294 51 320 44" fill="none" stroke="#7c3aed" strokeWidth="3" />
              </svg>
            </div>
            <div className="mt-4 flex justify-between text-[10px] text-slate-400">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
            <div className="absolute -right-7 top-1/2 grid size-24 -translate-y-1/2 place-items-center rounded-full border-[7px] border-violet-100 bg-white shadow-lg">
              <div className="text-center">
                <p className="text-[9px] text-slate-400">Connections</p>
                <p className="text-lg font-bold text-slate-800">1,000</p>
              </div>
            </div>
          </div>

          <div className="relative text-center">
            <h2 className="text-xl font-semibold">Make your next move</h2>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-violet-100">
              Build meaningful connections and discover opportunities with AI-powered referrals.
            </p>
            <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
              <span className="size-1.5 rounded-full bg-white/40" />
              <span className="size-1.5 rounded-full bg-white" />
              <span className="size-1.5 rounded-full bg-white/40" />
              <span className="size-1.5 rounded-full bg-white/40" />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default SingupPage;
