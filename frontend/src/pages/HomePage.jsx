import DashboardLayout from "../components/DashboardLayout.jsx";
import { useAuthstore } from "../store/useauthstore.js";

const HomePage = () => {
  const authUser = useAuthstore((state) => state.authUser);

  return (
    <DashboardLayout>
      <main className="mx-auto flex min-h-[calc(100vh-72px)] w-full max-w-7xl items-start px-5 py-12 sm:px-8 sm:py-16">
        <section className="w-full rounded-2xl border border-slate-200 bg-white px-6 py-10 shadow-sm shadow-slate-900/[0.03] sm:px-10 sm:py-12">
          <p className="text-sm font-medium text-violet-700">Your dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Welcome, {authUser?.name || "there"}!
          </h1>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default HomePage;
