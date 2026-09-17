import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="min-h-[55vh] flex flex-col justify-center items-center bg-gray-950 text-white text-center px-4 py-20">

      <p className="font-mono text-sm md:text-base text-emerald-400 mb-4">
        ~/portfolio $ whoami
      </p>

      <h1 className="text-5xl md:text-7xl font-extrabold mb-5 tracking-tight">
        Patrik Thormodsen
      </h1>

      <p className="text-xl md:text-2xl text-gray-300 mb-3">
        Computer Engineering Student & Developer
      </p>

      <p className="text-base md:text-lg text-gray-500 max-w-2xl leading-relaxed">
        I enjoy building software, exploring new technologies,
        and turning ideas into real projects.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <a
          href="#projects"
          className="bg-emerald-400 text-gray-950 font-semibold px-6 py-3 rounded-md hover:bg-emerald-300 transition"
        >
          View Projects
        </a>

        <Link
          to="/about"
          className="border border-gray-700 text-gray-300 px-6 py-3 rounded-md hover:border-gray-500 hover:text-white transition"
        >
          About Me
        </Link>
      </div>

      <div className="mt-10 font-mono text-sm text-gray-600">
        <span className="text-emerald-400">➜</span>{" "}
        currently building things and breaking them
        <span className="inline-block w-2 h-4 bg-gray-500 ml-2 animate-pulse" />
      </div>
    </section>
  );
}