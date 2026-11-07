import { ArrowLeft, CircleUserRound, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout.jsx";
import ResumeManager from "../components/ResumeManager.jsx";
import { useAuthstore } from "../store/useauthstore.js";

const ProfilePage = () => {
  const authUser = useAuthstore((state) => state.authUser);

  return (
    <DashboardLayout>
      <main className="mx-auto w-full max-w-5xl px-5 pb-12 pt-9 sm:px-8 sm:pt-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
        <div className="mt-6">
          <p className="text-sm font-medium text-violet-700">About me</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">Your profile</h1>
          <p className="mt-2 text-sm text-slate-500">Your account details and saved resume.</p>
        </div>

        <section className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-900/[0.03] sm:p-7">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-full bg-violet-100 text-violet-700">
              <CircleUserRound className="size-7" />
            </span>
            <div className="min-w-0">
              <h2 className="truncate text-lg font-semibold">{authUser?.name || "Your account"}</h2>
              <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-slate-500">
                <Mail className="size-3.5 shrink-0" />
                {authUser?.email}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-6">
          <ResumeManager />
        </div>
      </main>
    </DashboardLayout>
  );
};

export default ProfilePage;
