import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navClass = ({ isActive }) =>
    `inline-flex min-h-11 items-center whitespace-nowrap rounded focus-visible:outline-2 focus-visible:outline-green-400 transition-colors duration-200 ${
      isActive
        ? "text-green-400"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b border-gray-800/70 bg-gray-950/90 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-2 md:flex-row md:justify-between md:gap-6 md:px-6 md:py-4">

        <Link
          to="/"
          className="hidden min-h-11 shrink-0 items-center gap-2 whitespace-nowrap text-green-400 sm:flex"
        >
          <span className="text-gray-500">patrik@portfolio:</span>
          <span>~$</span>
          <span className="w-2 h-5 bg-green-400 animate-pulse" />
        </Link>

        <div className="flex w-full flex-wrap items-center justify-center gap-x-6 text-sm md:w-auto md:gap-x-8 md:text-base">
          <NavLink to="/" end className={navClass}>
            ~/home
          </NavLink>

          <NavLink to="/about" className={navClass}>
            ./about
          </NavLink>

          <NavLink to="/experience" className={navClass}>
            ./experience
          </NavLink>

          <NavLink to="/blog" className={navClass}>
            ./blog
          </NavLink>
        </div>

      </div>
    </nav>
  );
}
