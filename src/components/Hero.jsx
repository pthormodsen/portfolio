import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroBackground from "./HeroBackground";

const COMMAND = "whoami";
const STATUS = "currently building things and breaking them";

const prefersReducedMotion = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

// Returns how many characters of `text` to show, ticking up one at a time.
// With reduced motion the full text is shown immediately.
function useTypewriter(text, startDelay, speed) {
  const [count, setCount] = useState(() =>
    prefersReducedMotion() ? text.length : 0
  );

  useEffect(() => {
    if (count >= text.length) return;

    const timer = setTimeout(
      () => setCount((c) => c + 1),
      count === 0 ? startDelay : speed
    );

    return () => clearTimeout(timer);
  }, [count, text.length, startDelay, speed]);

  return count;
}

// Screen readers get the full text right away; the typed copy is visual only.
// The untyped remainder is rendered invisibly so the centered line never shifts;
// `caret` sits between the two so it follows the typing.
function TypedText({ text, count, caret = null }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {caret}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </>
  );
}

export default function Hero() {
  const commandCount = useTypewriter(COMMAND, 300, 90);
  const statusCount = useTypewriter(STATUS, 1200, 35);

  return (
    <section className="relative flex min-h-[55vh] flex-col items-center justify-center overflow-hidden bg-gray-950 px-4 pb-20 pt-16 text-center text-white sm:py-20">

      <HeroBackground />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #34d399 1px, transparent 1px),
            linear-gradient(to bottom, #34d399 1px, transparent 1px)
          `,
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-3 font-mono text-sm text-emerald-400">
          ~/portfolio $ <TypedText text={COMMAND} count={commandCount} />
        </p>

        <h1 className="m-0 mb-5 text-4xl font-extrabold tracking-tight md:text-6xl">
          Patrik Thormodsen
        </h1>

        <p className="mb-3 text-xl text-gray-300 md:text-2xl">
          Computer Engineering Student - Software Developer
        </p>

        <p className="max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg">
          Third year computer engineering student at HVL, focused on software
          development, backend systems and self-hosted applications.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="rounded-md bg-emerald-400 px-6 py-3 font-semibold text-gray-950 transition hover:bg-emerald-300"
          >
            View Projects
          </a>

          <Link
            to="/about"
            className="rounded-md border border-gray-700 px-6 py-3 text-gray-300 transition hover:border-gray-500 hover:text-white"
          >
            About Me
          </Link>

          <a
            href="/PatrikCV.pdf"
            download="Patrik-Thormodsen-CV.pdf"
            className="rounded-md border border-gray-700 px-6 py-3 text-gray-300 transition hover:border-gray-500 hover:text-white"
          >
            Download CV
          </a>
        </div>

        <div className="mt-10 font-mono text-sm text-gray-600">
          <span className="text-emerald-400">➜</span>{" "}
          <TypedText
            text={STATUS}
            count={statusCount}
            caret={<span className="ml-1 inline-block h-4 w-2 animate-pulse bg-gray-500" />}
          />
        </div>
      </div>
    </section>
  );
}
