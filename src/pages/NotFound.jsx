import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <title>Page Not Found – Patrik Thormodsen</title>
      <p className="mb-3 font-mono text-sm text-emerald-400">
        ~/portfolio $ cd {pathname}
      </p>

      <h1 className="m-0 mb-5 text-4xl font-extrabold tracking-tight md:text-6xl">
        404
      </h1>

      <p className="mb-8 max-w-xl break-all font-mono text-gray-500">
        bash: cd: {pathname}: No such file or directory
      </p>

      <Link
        to="/"
        className="bg-emerald-400 text-gray-950 font-semibold px-6 py-3 rounded-md hover:bg-emerald-300 transition"
      >
        Back to home
      </Link>
    </main>
  );
}
