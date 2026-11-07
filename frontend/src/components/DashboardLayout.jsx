import { Link, NavLink, useNavigate } from "react-router-dom";
import { BriefcaseBusiness, CircleUserRound, LogOut } from "lucide-react";
import { useAuthstore } from "../store/useauthstore.js";

const DashboardLayout = ({ children }) => {
  const { authUser, logout } = useAuthstore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#f7f6fb] text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="grid size-9 place-items-center rounded-xl bg-violet-700 text-white">
              <BriefcaseBusiness className="size-[18px]" />
            </span>
            <span className="text-[15px]">AI Referral</span>
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `hidden rounded-lg px-3 py-2 text-sm font-medium transition sm:block ${
                  isActive ? "bg-violet-50 text-violet-700" : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              Home
            </NavLink>
            <details className="relative">
              <summary
                aria-label="Open profile menu"
                className="flex cursor-pointer list-none items-center gap-2 rounded-full p-1.5 pr-2.5 transition hover:bg-slate-100 [&::-webkit-details-marker]:hidden"
              >
                <span className="grid size-9 place-items-center rounded-full bg-violet-100 text-violet-700">
                  <CircleUserRound className="size-5" />
                </span>
                <span className="hidden max-w-32 truncate text-sm font-medium sm:block">
                  {authUser?.name || "My account"}
                </span>
              </summary>
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-900/10">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                >
                  <CircleUserRound className="size-4" />
                  About me
                </NavLink>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-rose-50 hover:text-rose-700"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              </div>
            </details>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
};

export default DashboardLayout;
