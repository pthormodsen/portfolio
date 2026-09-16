import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "text-green-400"
        : "text-gray-400 hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-800/70 bg-gray-950/90 text-white backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          to="/"
          className="flex items-center gap-2 text-green-400"
        >
          <span className="text-gray-500">patrik@portfolio:</span>
          <span>~$</span>
          <span className="w-2 h-5 bg-green-400 animate-pulse" />
        </Link>

        <div className="flex items-center gap-8">
          <NavLink to="/" end className={navClass}>
            ~/home
          </NavLink>

          <NavLink to="/about" className={navClass}>
            ./about
          </NavLink>

          <NavLink to="/blog" className={navClass}>
            ./blog [in progress]
          </NavLink>
        </div>

      </div>
    </nav>
  );
}