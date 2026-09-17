import { NavLink } from "react-router-dom";
import TerminalNav from "./TerminalNav";

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

        <TerminalNav />
        <div className="flex w-full flex-wrap items-center justify-center gap-x-6 text-sm md:w-auto md:gap-x-8 md:text-base">
          <NavLink to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          end className={navClass}>
            ~/home
          </NavLink>

          <NavLink to="/about"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={navClass}>
            ./about
          </NavLink>

          <NavLink to="/experience"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={navClass}>
            ./experience
          </NavLink>

          <NavLink to="/blog"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className={navClass}>
            ./blog
          </NavLink>
        </div>

      </div>
    </nav>
  );
}
