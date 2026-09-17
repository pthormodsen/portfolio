import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const COMMAND_ALIASES = {
  "": "home",
  ".": "home",
  "/": "home",
  "~": "home",
  home: "home",
  index: "home",
  start: "home",
  about: "about",
  me: "about",
  info: "about",
  experience: "experience",
  cv: "experience",
  resume: "experience",
  workhistory: "experience",
  blog: "blog",
  posts: "blog",
  writing: "blog",
  projects: "projects",
  project: "projects",
  work: "projects",
  portfolio: "projects",
  contact: "contact",
  email: "contact",
  mail: "contact",
  socials: "contact",
  social: "contact",
};

const DESTINATIONS = {
  home: { path: "/", sectionId: null },
  about: { path: "/about", sectionId: null },
  experience: { path: "/experience", sectionId: null },
  blog: { path: "/blog", sectionId: null },
  projects: { path: "/", sectionId: "projects" },
  contact: { path: "/", sectionId: "contact" },
};

const HELP_TEXT = "try: /about, cd projects, blog, resume, contact";

const normalizeCommand = (value) => {
  let normalized = value.trim().toLowerCase().replace(/\s+/g, " ");

  if (normalized.startsWith("cd ")) {
    normalized = normalized.slice(3).trim();
  }

  return normalized
    .replace(/^~\//, "")
    .replace(/^\.\//, "")
    .replace(/^\//, "")
    .replace(/\/$/, "");
};

export default function TerminalNav() {
  const [active, setActive] = useState(false);
  const [command, setCommand] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const openTerminal = () => {
    setActive(true);
    setMessage("");

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const closeTerminal = () => {
    setActive(false);
    setCommand("");
  };

  const scrollToSection = (sectionId) => {
    if (!sectionId) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const runCommand = (e) => {
    if (e.key !== "Enter") return;

    const cmd = command.trim().toLowerCase().replace(/\s+/g, " ");
    if (!cmd) return;

    if (cmd === "help" || cmd === "?") {
      setMessage(HELP_TEXT);
      setCommand("");
      return;
    }

    if (cmd === "ls") {
      setMessage("home  about  experience  blog  projects  contact");
      setCommand("");
      return;
    }

    if (cmd === "clear") {
      setMessage("");
      closeTerminal();
      return;
    }

    const normalizedCommand = normalizeCommand(cmd);
    const destinationKey = COMMAND_ALIASES[normalizedCommand];
    const destination = DESTINATIONS[destinationKey];

    if (!destination) {
      setMessage(`command not found: ${cmd}`);
      setCommand("");
      return;
    }

    navigate(destination.path);
    closeTerminal();

    setTimeout(() => {
      scrollToSection(destination.sectionId);
    }, 80);
  };

  return (
    <div
      className="hidden min-h-11 shrink-0 items-center gap-2 font-mono text-sm sm:flex"
      onClick={openTerminal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") openTerminal();
      }}
      role="button"
      tabIndex={0}
      aria-label="Open command line navigation"
    >
      <span className="text-gray-500 transition-colors hover:text-gray-300">
        patrik@portfolio:
      </span>
      <span className="text-green-400">~$</span>

      {active ? (
        <input
          ref={inputRef}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={(e) => {
            e.stopPropagation();
            runCommand(e);

            if (e.key === "Escape") {
              closeTerminal();
            }
          }}
          onBlur={() => {
            if (!command) setActive(false);
          }}
          className="w-36 border-none bg-transparent text-green-400 outline-none caret-green-400 placeholder:text-gray-600"
          placeholder="command..."
          aria-label="Navigation command"
        />
      ) : (
        <>
          <span className="h-5 w-2 animate-pulse bg-green-400" />
          {message && (
            <span className="max-w-64 truncate text-xs text-gray-500">
              {message}
            </span>
          )}
        </>
      )}
    </div>
  );
}
