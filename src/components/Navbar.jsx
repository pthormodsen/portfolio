import { Link, NavLink, useLocation } from "react-router-dom";
import TerminalNav from "./TerminalNav";

const linkBase =
  "inline-flex min-h-11 items-center whitespace-nowrap rounded focus-visible:outline-2 focus-visible:outline-green-400 transition-colors duration-200";

export default function Navbar() {
  const { pathname } = useLocation();

  const navClass = ({ isActive }) =>
    `${linkBase} ${
      isActive
        ? "text-green-400"
        : "text-gray-400 hover:text-white"
    }`;

  // On the home page, scroll smoothly instead of routing to the same hash,
  // which would not re-trigger ScrollToTop when the hash is unchanged.
  const scrollToSection = (sectionId) => (e) => {
    const section = pathname === "/" && document.getElementById(sectionId);
    if (!section) return;

    e.preventDefault();
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b border-gray-800/70 bg-gray-950/90 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-2 md:px-6 md:py-4 lg:flex-row lg:justify-between lg:gap-6">

        <TerminalNav />
        <div className="flex w-full flex-wrap items-center justify-center gap-x-6 text-sm md:gap-x-8 lg:w-auto md:text-base">
          <NavLink to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          end className={navClass}>
            ~/home
          </NavLink>

          <Link to="/#projects"
          onClick={scrollToSection("projects")}
          // Hidden on phones so the links fit on one row; projects are reachable from the home page.
          className={`${linkBase.replace("inline-flex", "hidden sm:inline-flex")} text-gray-400 hover:text-white`}>
            ./projects
          </Link>

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
