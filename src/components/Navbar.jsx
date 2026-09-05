import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="top-0 left-0 w-full bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

        <Link to="/" className="text-xl font-bold">
          Patrik
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/about">
            About
          </Link>{/* 
          <Link to="/#projects">
            Projects
          </Link>

          <Link to="/#contact">
            Contact
          </Link>
          */}
        </div>
      </div>
    </nav>
  );
}